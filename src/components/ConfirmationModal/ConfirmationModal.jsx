import React, { useState } from "react";
import { useGiveaway } from "../../context/GiveawayContext";
import { X, Zap, AlertTriangle } from "lucide-react";
import "./ConfirmationModal.css";

export default function ConfirmationModal() {
  const { confirmPrize, setConfirmPrize, balances, handleConfirmJoin, isLoading } = useGiveaway();
  const [agreed, setAgreed] = useState(true);

  if (!confirmPrize) return null;

  const currentBalance = balances[confirmPrize.currency] || 0;
  const balanceAfter = currentBalance - confirmPrize.entryFee;
  const isSufficient = balanceAfter >= 0;

  return (
    <div className="modal-backdrop" onClick={() => setConfirmPrize(null)}>
      <div className="confirm-modal-card" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button
          className="modal-close-icon"
          onClick={() => setConfirmPrize(null)}
          aria-label="Close confirmation dialog"
        >
          <X size={20} />
        </button>

        <div className="confirm-modal-header">
          <span className="modal-kicker">CONFIRM ENTRY</span>
          <h2 className="modal-title">Confirm Participation</h2>
        </div>

        {/* Prize card item preview */}
        <div className="confirm-prize-card">
          <img src={confirmPrize.image} alt={confirmPrize.name} className="confirm-prize-img" />
          <div className="confirm-prize-details">
            <span className="confirm-pos">{confirmPrize.position}</span>
            <strong className="confirm-name">{confirmPrize.name}</strong>
            <span className="confirm-spec">{confirmPrize.spec}</span>
          </div>
        </div>

        {/* Financial calculation breakdown */}
        <div className="balance-breakdown-card">
          <div className="breakdown-row">
            <span className="row-label">Entry Fee</span>
            <strong className="row-val fee">
              <Zap size={14} /> {confirmPrize.entryFee} {confirmPrize.currency}
            </strong>
          </div>

          <div className="breakdown-row">
            <span className="row-label">Your Current Balance</span>
            <strong className="row-val">
              {currentBalance.toLocaleString()} {confirmPrize.currency}
            </strong>
          </div>

          <div className="breakdown-divider" />

          <div className="breakdown-row total-row">
            <span className="row-label">Balance After Joining</span>
            <strong className={`row-val ${isSufficient ? "positive" : "negative"}`}>
              {balanceAfter.toLocaleString()} {confirmPrize.currency}
            </strong>
          </div>
        </div>

        {!isSufficient && (
          <div className="insufficient-alert">
            <AlertTriangle size={16} />
            <span>
              Insufficient balance! You need {Math.abs(balanceAfter)} more {confirmPrize.currency}.
            </span>
          </div>
        )}

        <label className="terms-checkbox-wrap">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <span className="checkbox-label">
            I confirm that I have reviewed the official VELOOP Giveaway Rules, Terms & Conditions.
          </span>
        </label>

        <div className="modal-button-row">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => setConfirmPrize(null)}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="button"
            className="confirm-join-btn"
            disabled={!isSufficient || !agreed || isLoading}
            onClick={() => handleConfirmJoin(confirmPrize)}
          >
            {isLoading ? "Confirming Entry..." : `Confirm & Join – ${confirmPrize.entryFee} ${confirmPrize.currency}`}
          </button>
        </div>
      </div>
    </div>
  );
}
