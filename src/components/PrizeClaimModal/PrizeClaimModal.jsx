import React, { useState } from "react";
import { useGiveaway } from "../../context/GiveawayContext";
import { X, Gift, Mail, MapPin, Phone, User, ShieldCheck } from "lucide-react";
import "./PrizeClaimModal.css";

export default function PrizeClaimModal() {
  const { currentUser, isClaimModalOpen, setIsClaimModalOpen, handleSubmitClaim, isLoading } = useGiveaway();

  const prize = currentUser.wonPrize;

  const [formData, setFormData] = useState({
    fullName: currentUser.name || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    email: ""
  });

  const [formErrors, setFormErrors] = useState({});

  if (!isClaimModalOpen || !prize) return null;

  const isPhysical = prize.type === "PHYSICAL";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const errors = {};
    if (isPhysical) {
      if (!formData.fullName.trim()) errors.fullName = "Full Name is required";
      if (!formData.phone.trim() || formData.phone.length < 10) errors.phone = "Valid 10-digit phone number is required";
      if (!formData.address.trim()) errors.address = "Complete delivery address is required";
      if (!formData.city.trim()) errors.city = "City is required";
      if (!formData.state.trim()) errors.state = "State is required";
      if (!formData.pinCode.trim() || formData.pinCode.length < 6) errors.pinCode = "Valid 6-digit PIN code is required";
    } else {
      if (!formData.email.trim() || !formData.email.includes("@")) {
        errors.email = "Valid email address is required to receive gift card";
      }
    }
    return errors;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    handleSubmitClaim(prize.prizeId, formData);
  };

  return (
    <div className="modal-backdrop" onClick={() => setIsClaimModalOpen(false)}>
      <div className="claim-modal-card" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button
          className="modal-close-icon"
          onClick={() => setIsClaimModalOpen(false)}
          aria-label="Close claim dialog"
        >
          <X size={20} />
        </button>

        <div className="claim-modal-header">
          <div className="claim-modal-icon-wrap">
            <Gift size={24} />
          </div>
          <div>
            <span className="modal-kicker">WINNER VERIFICATION</span>
            <h2 className="modal-title">Claim Your Prize</h2>
          </div>
        </div>

        {/* Prize summary pill */}
        <div className="claimed-prize-summary">
          <img src={prize.image} alt={prize.prizeName} className="summary-img" />
          <div className="summary-info">
            <span className="summary-pos">{prize.prizePosition} WINNER</span>
            <strong className="summary-name">{prize.prizeName}</strong>
            <span className="summary-val">Value: {prize.value}</span>
          </div>
        </div>

        {isPhysical ? (
          <form className="claim-form" onSubmit={onSubmit}>
            <div className="form-info-callout">
              <ShieldCheck size={16} />
              <span>Please provide insured courier delivery details. Tracking will be SMS notified.</span>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="fullName">Full Legal Name *</label>
                <div className="input-wrap">
                  <User size={15} className="input-icon" />
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="e.g. Rahul Sharma"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>
                {formErrors.fullName && <span className="error-text">{formErrors.fullName}</span>}
              </div>

              <div className="form-field">
                <label htmlFor="phone">Mobile Number *</label>
                <div className="input-wrap">
                  <Phone size={15} className="input-icon" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                {formErrors.phone && <span className="error-text">{formErrors.phone}</span>}
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="address">Delivery Street Address *</label>
              <div className="input-wrap">
                <MapPin size={15} className="input-icon" />
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="House / Flat No., Building, Street Name, Area"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              {formErrors.address && <span className="error-text">{formErrors.address}</span>}
            </div>

            <div className="form-row three-col">
              <div className="form-field">
                <label htmlFor="city">City *</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                />
                {formErrors.city && <span className="error-text">{formErrors.city}</span>}
              </div>

              <div className="form-field">
                <label htmlFor="state">State *</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                />
                {formErrors.state && <span className="error-text">{formErrors.state}</span>}
              </div>

              <div className="form-field">
                <label htmlFor="pinCode">PIN Code *</label>
                <input
                  type="text"
                  id="pinCode"
                  name="pinCode"
                  placeholder="6-digit PIN"
                  value={formData.pinCode}
                  onChange={handleChange}
                />
                {formErrors.pinCode && <span className="error-text">{formErrors.pinCode}</span>}
              </div>
            </div>

            <button type="submit" className="submit-claim-btn" disabled={isLoading}>
              {isLoading ? "Validating & Submitting..." : "Submit Prize Claim →"}
            </button>
          </form>
        ) : (
          <form className="claim-form" onSubmit={onSubmit}>
            <div className="form-info-callout digital">
              <Mail size={16} />
              <span>Digital voucher fulfillment. No physical address required. Delivered to your email.</span>
            </div>

            <div className="form-field">
              <label htmlFor="email">Amazon Pay / Account Email Address *</label>
              <div className="input-wrap">
                <Mail size={15} className="input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your-email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {formErrors.email && <span className="error-text">{formErrors.email}</span>}
            </div>

            <button type="submit" className="submit-claim-btn" disabled={isLoading}>
              {isLoading ? "Generating Voucher..." : "Claim Digital Voucher →"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
