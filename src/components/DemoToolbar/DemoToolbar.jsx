import React, { useState } from "react";
import { useGiveaway } from "../../context/GiveawayContext";
import {
  Sliders,
  RefreshCw,
  Trophy,
  UserCheck,
  ShieldAlert,
  PlusCircle,
  Zap,
  Gift,
  Briefcase,
  Flame,
  Wallet,
  Users,
  ShieldCheck,
  FileText
} from "lucide-react";
import "./DemoToolbar.css";

export default function DemoToolbar() {
  const {
    userRole,
    setUserRole,
    giveawayStatus,
    setGiveawayStatus,
    currentRoute,
    navigateToRoute,
    setBalances,
    handleResetDemo,
    handleSimulateCreditTask,
    tasks,
    showToast
  } = useGiveaway();

  const [isExpanded, setIsExpanded] = useState(false);

  const addBonusTokens = () => {
    setBalances((prev) => ({
      ...prev,
      VEs: prev.VEs + 500,
      SVEs: prev.SVEs + 500,
      Tokens: prev.Tokens + 1000
    }));
    showToast("Added +500 VEs, +500 SVEs, +1,000 Tokens to your test wallet!", "success");
  };

  const handleQuickApproveTask = () => {
    const pendingTask = tasks.find((t) => t.status === "PENDING_VERIFICATION" || t.status === "STARTED") || tasks[0];
    handleSimulateCreditTask(pendingTask.id);
  };

  return (
    <>
      {/* Floating collapsed launcher button at bottom-right */}
      {!isExpanded && (
        <button
          className="demo-floating-launcher-btn"
          onClick={() => setIsExpanded(true)}
          title="Open Developer & Evaluator Simulation Tools"
        >
          <span className="launcher-pulse-dot" />
          <Sliders size={15} />
          <span>Dev Tools</span>
        </button>
      )}

      {/* Floating expanded modal / panel */}
      {isExpanded && (
        <div className="demo-floating-modal-overlay" onClick={() => setIsExpanded(false)}>
          <div className="demo-floating-panel" onClick={(e) => e.stopPropagation()}>
            <div className="demo-panel-header">
              <div className="demo-header-title-box">
                <span className="live-demo-badge">DEV SIMULATOR</span>
                <span className="demo-status-summary">
                  Role: <strong>{userRole.toUpperCase()}</strong> | Draw: <strong>{giveawayStatus}</strong>
                </span>
              </div>
              <button
                className="demo-close-btn"
                onClick={() => setIsExpanded(false)}
                aria-label="Close Dev Simulator"
              >
                ✕
              </button>
            </div>

            <div className="demo-toolbar-body">
              {/* Quick Page Nav */}
              <div className="demo-control-group">
                <span className="group-label">Direct Page Jump:</span>
                <div className="persona-buttons">
                  <button
                    className={`persona-btn ${currentRoute === "giveaways" ? "active" : ""}`}
                    onClick={() => navigateToRoute("giveaways")}
                  >
                    <Gift size={12} /> Giveaways
                  </button>
                  <button
                    className={`persona-btn ${currentRoute === "earn" ? "active" : ""}`}
                    onClick={() => navigateToRoute("earn")}
                  >
                    <Briefcase size={12} /> Earn Tasks
                  </button>
                  <button
                    className={`persona-btn ${currentRoute === "daily" ? "active" : ""}`}
                    onClick={() => navigateToRoute("daily")}
                  >
                    <Flame size={12} /> Daily & Spin
                  </button>
                  <button
                    className={`persona-btn ${currentRoute === "wallet" ? "active" : ""}`}
                    onClick={() => navigateToRoute("wallet")}
                  >
                    <Wallet size={12} /> Wallet
                  </button>
                  <button
                    className={`persona-btn ${currentRoute === "referrals" ? "active" : ""}`}
                    onClick={() => navigateToRoute("referrals")}
                  >
                    <Users size={12} /> Referrals
                  </button>
                  <button
                    className={`persona-btn ${currentRoute === "trust" ? "active" : ""}`}
                    onClick={() => navigateToRoute("trust")}
                  >
                    <ShieldCheck size={12} /> Trust & Audit
                  </button>
                  <button
                    className={`persona-btn winner-btn ${currentRoute === "research-report" ? "active" : ""}`}
                    onClick={() => navigateToRoute("research-report")}
                  >
                    <FileText size={12} /> Research Report
                  </button>
                </div>
              </div>

              {/* User Persona */}
              <div className="demo-control-group">
                <span className="group-label">User Persona:</span>
                <div className="persona-buttons">
                  <button
                    className={`persona-btn ${userRole === "visitor" ? "active" : ""}`}
                    onClick={() => setUserRole("visitor")}
                    title="Guest without account"
                  >
                    Visitor (Logged Out)
                  </button>
                  <button
                    className={`persona-btn ${userRole === "participant" ? "active" : ""}`}
                    onClick={() => setUserRole("participant")}
                    title="Active participating user"
                  >
                    <UserCheck size={13} /> Participant
                  </button>
                  <button
                    className={`persona-btn winner-btn ${userRole === "winner" ? "active" : ""}`}
                    onClick={() => setUserRole("winner")}
                    title="Winner of Apple Watch"
                  >
                    <Trophy size={13} /> Winner (VE10025)
                  </button>
                  <button
                    className={`persona-btn ${userRole === "nonWinner" ? "active" : ""}`}
                    onClick={() => setUserRole("nonWinner")}
                    title="Participant who didn't win"
                  >
                    Non-Winner
                  </button>
                  <button
                    className={`persona-btn ${userRole === "lowBalance" ? "active" : ""}`}
                    onClick={() => setUserRole("lowBalance")}
                    title="User with insufficient balance"
                  >
                    <ShieldAlert size={13} /> Low Balance
                  </button>
                </div>
              </div>

              {/* Giveaway Lifecycle */}
              <div className="demo-control-group">
                <span className="group-label">Giveaway Lifecycle:</span>
                <div className="lifecycle-buttons">
                  <button
                    className={`status-btn live-btn ${giveawayStatus === "ACTIVE" ? "active" : ""}`}
                    onClick={() => setGiveawayStatus("ACTIVE")}
                  >
                    ● ACTIVE (Live)
                  </button>
                  <button
                    className={`status-btn ended-btn ${giveawayStatus === "ENDED" ? "active" : ""}`}
                    onClick={() => setGiveawayStatus("ENDED")}
                  >
                    ■ ENDED (Winners Out)
                  </button>
                  <button
                    className={`status-btn upcoming-btn ${giveawayStatus === "UPCOMING" ? "active" : ""}`}
                    onClick={() => setGiveawayStatus("UPCOMING")}
                  >
                    ▲ UPCOMING (Preview)
                  </button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="demo-quick-actions">
                <button className="quick-action-btn add-funds" onClick={addBonusTokens} title="Add virtual demo currency">
                  <PlusCircle size={14} /> +500 VEs / SVEs
                </button>
                <button className="quick-action-btn simulate-task" onClick={handleQuickApproveTask} title="Simulate task crediting">
                  <Zap size={14} /> Approve Pending Task
                </button>
                <button className="quick-action-btn reset-btn" onClick={handleResetDemo} title="Reset demo state">
                  <RefreshCw size={14} /> Reset Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
