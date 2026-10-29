import React, { useState } from "react";
import { useGiveaway } from "../../context/GiveawayContext";
import { X, Zap, AlertTriangle, CheckCircle2 } from "lucide-react";
import "./WithdrawalModal.css";

export default function WithdrawalModal() {
  const {
    isWithdrawalModalOpen,
    setIsWithdrawalModalOpen,
    selectedWithdrawalMethod,
    setSelectedWithdrawalMethod,
    withdrawalMethodsData,
    balances,
    handleRequestWithdrawal
  } = useGiveaway();

  const [destination, setDestination] = useState("");
  const [selectedAmount, setSelectedAmount] = useState(selectedWithdrawalMethod?.minWithdrawalINR || 50);
  const [error, setError] = useState("");

  if (!isWithdrawalModalOpen || !selectedWithdrawalMethod) return null;

  const currentVEs = balances.VEs || 0;
  const maxAvailableINR = Math.floor(currentVEs / 10);
  const requiredVEs = selectedAmount * 10;
  const isBalanceSufficient = currentVEs >= requiredVEs;

  const handleMethodChange = (m) => {
    setSelectedWithdrawalMethod(m);
    setSelectedAmount(m.minWithdrawalINR);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!destination.trim()) {
      setError(`Please provide your ${selectedWithdrawalMethod.inputLabel}.`);
      return;
    }
    if (!isBalanceSufficient) {
      setError(`Insufficient VEs. You need ${requiredVEs} VEs for ₹${selectedAmount}.`);
      return;
    }
    setError("");
    const ok = await handleRequestWithdrawal(selectedWithdrawalMethod, selectedAmount, destination.trim());
    if (ok) {
      setDestination("");
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="withdrawal-modal-card">
        <button
          className="modal-close-btn"
          onClick={() => setIsWithdrawalModalOpen(false)}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="wth-modal-header">
          <div className="wth-icon-badge">
            <Zap size={28} />
          </div>
          <span className="wth-kicker">FINTECH INSTANT CASHOUT</span>
          <h2 className="wth-title">Request India Cashout</h2>
          <p className="wth-subtitle">
            Convert your earned Velocity Entries directly into real money with zero hidden deductions.
          </p>
        </div>

        {/* Method selector tabs */}
        <div className="wth-methods-selector">
          {withdrawalMethodsData.map((m) => (
            <button
              key={m.id}
              type="button"
              className={`method-select-btn ${selectedWithdrawalMethod.id === m.id ? "active" : ""}`}
              onClick={() => handleMethodChange(m)}
            >
              <span className="m-name">{m.name.split(" ")[0]}</span>
              <span className="m-min">Min ₹{m.minWithdrawalINR}</span>
            </button>
          ))}
        </div>

        {/* Selected method details pill */}
        <div className="selected-method-banner">
          <div className="sm-left">
            <strong>{selectedWithdrawalMethod.name}</strong>
            <div className="sm-meta">
              <span>Fee: <strong className="green-txt">{selectedWithdrawalMethod.fee}</strong></span>
              <span>Speed: <strong>{selectedWithdrawalMethod.processingTime}</strong></span>
            </div>
          </div>
          <span className="sm-badge">{selectedWithdrawalMethod.badge}</span>
        </div>

        <form onSubmit={handleSubmit} className="wth-form">
          {/* Amount selector */}
          <div className="form-group">
            <label className="amount-label-row">
              <span>Select Withdrawal Amount (₹ INR)</span>
              <span className="bal-hint">
                Your Balance: <strong>{currentVEs.toLocaleString()} VEs</strong> (≈ ₹{maxAvailableINR})
              </span>
            </label>

            <div className="amount-presets-row">
              {[selectedWithdrawalMethod.minWithdrawalINR, 100, 250, 500, 1000].map((amt) => {
                if (amt < selectedWithdrawalMethod.minWithdrawalINR) return null;
                const canAfford = currentVEs >= amt * 10;
                return (
                  <button
                    key={amt}
                    type="button"
                    className={`amt-preset-chip ${selectedAmount === amt ? "selected" : ""} ${!canAfford ? "disabled" : ""}`}
                    onClick={() => {
                      setSelectedAmount(amt);
                      setError("");
                    }}
                  >
                    ₹{amt}
                    <small>{(amt * 10).toLocaleString()} VEs</small>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Destination input */}
          <div className="form-group">
            <label htmlFor="wth-dest">{selectedWithdrawalMethod.inputLabel}</label>
            <input
              id="wth-dest"
              type="text"
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                setError("");
              }}
              placeholder={selectedWithdrawalMethod.inputPlaceholder}
              className="wth-input"
            />
            {error && <span className="input-error-text">{error}</span>}
          </div>

          {/* Atomic Calculation Card */}
          <div className="atomic-calculation-card">
            <div className="calc-row">
              <span>VEs Deducted from Wallet:</span>
              <strong>{requiredVEs.toLocaleString()} VEs</strong>
            </div>
            <div className="calc-row">
              <span>Net Cash Dispatched:</span>
              <strong className="payout-amount">₹{selectedAmount.toFixed(2)}</strong>
            </div>
            <div className="calc-row balance-after">
              <span>Balance After Withdrawal:</span>
              <strong>{Math.max(0, currentVEs - requiredVEs).toLocaleString()} VEs</strong>
            </div>
          </div>

          {!isBalanceSufficient && (
            <div className="insufficient-warning">
              <AlertTriangle size={16} />
              <span>
                You need <strong>{requiredVEs - currentVEs} more VEs</strong> to cash out ₹{selectedAmount}. Complete surveys or daily tasks to earn more!
              </span>
            </div>
          )}

          <div className="modal-actions-bar">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => setIsWithdrawalModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-wth-btn"
              disabled={!isBalanceSufficient}
            >
              <CheckCircle2 size={16} />
              <span>Confirm & Dispatch ₹{selectedAmount}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
