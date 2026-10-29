import React, { useState } from "react";
import { useGiveaway } from "../../context/GiveawayContext";
import { Gift, X, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import "./GiveawayCodeModal.css";

export default function GiveawayCodeModal() {
  const { isGiveawayCodeModalOpen, setIsGiveawayCodeModalOpen, handleRedeemGiveawayCode } = useGiveaway();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  if (!isGiveawayCodeModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!code.trim()) {
      setError("Please enter a giveaway code.");
      return;
    }
    setError("");
    const success = handleRedeemGiveawayCode(code.trim());
    if (success) {
      setCode("");
    }
  };

  const handleQuickCode = (preset) => {
    setCode(preset);
    setError("");
  };

  return (
    <div className="modal-backdrop">
      <div className="giveaway-code-modal-card">
        <button
          className="modal-close-btn"
          onClick={() => setIsGiveawayCodeModalOpen(false)}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="code-modal-header">
          <div className="code-icon-badge">
            <Gift size={28} />
          </div>
          <span className="code-sub-kicker">✦ UNLOCK AMAZING REWARDS ✦</span>
          <h2 className="code-modal-title">Redeem Giveaway Code</h2>
          <p className="code-modal-desc">
            Enter your special creator, event, or newsletter promo code to unlock instant VEs and Tokens into your verified wallet.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="code-input-form">
          <div className="input-group">
            <label htmlFor="promo-input">Special Giveaway Code</label>
            <div className="input-field-wrap">
              <input
                id="promo-input"
                type="text"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value.toUpperCase());
                  setError("");
                }}
                placeholder="e.g. VELOOP2026, NAYABVIP"
                autoComplete="off"
                spellCheck="false"
              />
              <button type="submit" className="redeem-submit-btn">
                <span>Redeem</span>
                <ArrowRight size={16} />
              </button>
            </div>
            {error && <span className="input-error-text">{error}</span>}
          </div>

          <div className="quick-presets-section">
            <span className="preset-label">Available Promo Codes (Click to test):</span>
            <div className="presets-list">
              <button
                type="button"
                className="preset-chip"
                onClick={() => handleQuickCode("VELOOP2026")}
              >
                <Sparkles size={13} />
                <strong>VELOOP2026</strong>
                <small>+250 VEs</small>
              </button>
              <button
                type="button"
                className="preset-chip gold"
                onClick={() => handleQuickCode("NAYABVIP")}
              >
                <Sparkles size={13} />
                <strong>NAYABVIP</strong>
                <small>+500 VEs</small>
              </button>
              <button
                type="button"
                className="preset-chip"
                onClick={() => handleQuickCode("BONUS100")}
              >
                <Sparkles size={13} />
                <strong>BONUS100</strong>
                <small>+100 VEs</small>
              </button>
            </div>
          </div>

          <div className="code-trust-footer">
            <div className="trust-item">
              <CheckCircle2 size={14} className="green-icon" />
              <span>100% Safe & Instant</span>
            </div>
            <div className="trust-item">
              <CheckCircle2 size={14} className="green-icon" />
              <span>Zero Rollover Fees</span>
            </div>
            <div className="trust-item">
              <CheckCircle2 size={14} className="green-icon" />
              <span>Usable in all Giveaways</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
