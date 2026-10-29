import React, { useState, useEffect } from "react";
import { useGiveaway } from "../../context/GiveawayContext";
import { X, UploadCloud, ShieldAlert, CheckCircle2, Clock } from "lucide-react";
import "./DisputeModal.css";

export default function DisputeModal() {
  const { isDisputeModalOpen, setIsDisputeModalOpen, disputingTask, handleSubmitDispute } = useGiveaway();

  const [reason, setReason] = useState("COMPLETED_NOT_CREDITED");
  const [description, setDescription] = useState("");
  const [fileName, setFileName] = useState("screenshot_proof.png");
  const [error, setError] = useState("");

  useEffect(() => {
    if (disputingTask) {
      if (disputingTask.rejectedReason) {
        setReason("UNFAIR_REJECTION");
        setDescription(`Challenging rejection: "${disputingTask.rejectedReason}". I completed all advertiser milestones legitimately with genuine attention.`);
      } else {
        setReason("COMPLETED_NOT_CREDITED");
        setDescription(`Completed ${disputingTask.name} on ${disputingTask.provider}. Waiting for credit beyond expected time.`);
      }
    }
  }, [disputingTask]);

  if (!isDisputeModalOpen || !disputingTask) return null;

  const onSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) {
      setError("Please describe what occurred.");
      return;
    }
    setError("");
    handleSubmitDispute({
      taskId: disputingTask.id,
      taskName: disputingTask.name,
      provider: disputingTask.provider,
      reason,
      subject: `Dispute: ${disputingTask.name} (${disputingTask.id})`,
      description,
      fileName
    });
  };

  return (
    <div className="modal-backdrop">
      <div className="dispute-modal-card">
        <button
          className="modal-close-btn"
          onClick={() => setIsDisputeModalOpen(false)}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="dispute-modal-header">
          <div className="dispute-icon-badge">
            <ShieldAlert size={28} />
          </div>
          <span className="dispute-kicker">FAIR PLAY PROTECTION DESK</span>
          <h2 className="dispute-title">Report Missing Task Credit</h2>
          <p className="dispute-subtitle">
            VELOOP protects genuine users against tracking dropouts and advertiser false flags.
          </p>
        </div>

        {/* Task Details Summary Card */}
        <div className="disputed-task-summary">
          <div className="task-summary-row">
            <span className="summary-label">Task Reference ID:</span>
            <code className="task-id-code">{disputingTask.id}</code>
          </div>
          <div className="task-summary-row">
            <span className="summary-label">Offer Name:</span>
            <strong>{disputingTask.name}</strong>
          </div>
          <div className="task-summary-row">
            <span className="summary-label">Offerwall Partner:</span>
            <span className="provider-pill">{disputingTask.provider}</span>
          </div>
          <div className="task-summary-row">
            <span className="summary-label">Expected Reward:</span>
            <strong className="reward-glow">+{disputingTask.rewardVEs} VEs ({disputingTask.rewardINR})</strong>
          </div>
        </div>

        <form onSubmit={onSubmit} className="dispute-form">
          <div className="form-group">
            <label htmlFor="dispute-reason">Reason for Dispute</label>
            <select
              id="dispute-reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="dispute-select"
            >
              <option value="COMPLETED_NOT_CREDITED">Completed all steps, but credit never arrived</option>
              <option value="UNFAIR_REJECTION">Unfair disqualification / False flag appeal</option>
              <option value="APP_TRACKING_FAILED">App milestone reached, SDK tracking stalled</option>
              <option value="SURVEY_DROPPED_AT_END">Screened out at the very final question</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="dispute-desc">Provide Details / What happened?</label>
            <textarea
              id="dispute-desc"
              rows={3}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setError("");
              }}
              placeholder="Describe your device, time completed, or error messages encountered..."
              className="dispute-textarea"
            />
            {error && <span className="input-error-text">{error}</span>}
          </div>

          {/* Proof Upload Simulation */}
          <div className="proof-upload-box">
            <UploadCloud size={24} className="upload-icon" />
            <div className="upload-text">
              <span className="upload-main">Proof Attached: <strong>{fileName}</strong></span>
              <small className="upload-sub">Screenshot of completed milestone or survey finish page</small>
            </div>
            <button
              type="button"
              className="change-proof-btn"
              onClick={() => setFileName(`proof_attachment_${Date.now().toString().slice(-4)}.jpg`)}
            >
              Simulate File
            </button>
          </div>

          <div className="dispute-sla-box">
            <Clock size={16} className="clock-icon" />
            <span>Guaranteed Resolution SLA: <strong>24 to 48 Hours</strong>. If advertiser fails to respond, VELOOP courtesy credits apply.</span>
          </div>

          <div className="modal-actions-bar">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => setIsDisputeModalOpen(false)}
            >
              Cancel
            </button>
            <button type="submit" className="submit-dispute-btn">
              <CheckCircle2 size={16} />
              <span>Submit Dispute Ticket</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
