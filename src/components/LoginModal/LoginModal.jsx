import React from "react";
import { useGiveaway } from "../../context/GiveawayContext";
import { X, LogIn, UserCheck, Shield } from "lucide-react";
import "./LoginModal.css";

export default function LoginModal() {
  const { isLoginModalOpen, setIsLoginModalOpen, setUserRole, showToast } = useGiveaway();

  if (!isLoginModalOpen) return null;

  const handleSimulateLogin = (role) => {
    setUserRole(role);
    setIsLoginModalOpen(false);
    showToast(`✓ Logged in as ${role === "participant" ? "Rahul (Participant)" : "Alex (Winner)"}`, "success");
  };

  const [customName, setCustomName] = React.useState("");

  const handleCustomLogin = (e) => {
    e.preventDefault();
    const name = customName.trim() || "User";
    setUserRole("participant");
    setIsLoginModalOpen(false);
    showToast(`✓ Welcome to VELOOP Rewards, ${name}! Your wallet is ready.`, "success");
  };

  return (
    <div className="modal-backdrop" onClick={() => setIsLoginModalOpen(false)}>
      <div className="login-modal-card" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button
          className="modal-close-icon"
          onClick={() => setIsLoginModalOpen(false)}
          aria-label="Close login dialog"
        >
          <X size={20} />
        </button>

        <div className="login-modal-header">
          <div className="login-icon-box">
            <LogIn size={26} />
          </div>
          <div>
            <span className="modal-kicker">AUTHENTICATION REQUIRED</span>
            <h2 className="modal-title">Sign In to VELOOP</h2>
          </div>
        </div>

        <p className="login-info-text">
          Enter your name or email to access your VELOOP Rewards wallet, join giveaways, and complete earn tasks.
        </p>

        {/* Real User Form */}
        <form onSubmit={handleCustomLogin} className="custom-login-form">
          <div className="login-input-group">
            <input
              type="text"
              placeholder="Enter your name or email (e.g. Nayab Alam)"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              className="login-text-input"
            />
            <button type="submit" className="login-submit-btn">
              Continue
            </button>
          </div>
        </form>

        <div className="login-divider-row">
          <span>OR QUICK SIGN IN AS DEMO</span>
        </div>

        <div className="login-options-list">
          <button
            type="button"
            className="simulate-login-btn primary"
            onClick={() => handleSimulateLogin("participant")}
          >
            <UserCheck size={16} />
            <span>Sign In as Rahul (Active Participant · 1,250 VEs)</span>
          </button>

          <button
            type="button"
            className="simulate-login-btn gold"
            onClick={() => handleSimulateLogin("winner")}
          >
            <Shield size={16} />
            <span>Sign In as Alex (Apple Watch Winner · Claim Ready)</span>
          </button>
        </div>

        <p className="demo-login-note">
          ✦ Every user receives 1,250 VEs + 500 SVEs + 1,000 Tokens on sign-in.
        </p>
      </div>
    </div>
  );
}
