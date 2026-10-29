import React, { useState } from "react";
import { useGiveaway } from "../../context/GiveawayContext";
import {
  Sparkles,
  Clock,
  CheckCircle2,
  AlertCircle,
  Filter,
  Play,
  Zap
} from "lucide-react";
import "./EarnOffers.css";

export default function EarnOffers() {
  const {
    tasks,
    handleStartTask,
    handleOpenDispute,
    handleSimulateCreditTask,
    supportTickets,
    balances
  } = useGiveaway();

  const [activeCategory, setActiveCategory] = useState("All");
  const [activePartner, setActivePartner] = useState("All");
  const [viewTab, setViewTab] = useState("available"); // "available" | "my-tasks" | "disputes"

  const categories = ["All", "Surveys", "Games", "Videos", "Microtasks", "Cashback"];
  const partners = ["All", "CPX Research", "Torox", "BitLabs", "TimeWall", "Lootably", "AdGate Media"];

  const filteredTasks = tasks.filter((task) => {
    const matchesCat = activeCategory === "All" || task.category === activeCategory;
    const matchesPartner = activePartner === "All" || task.provider === activePartner;
    return matchesCat && matchesPartner;
  });

  const activeOrTrackedTasks = tasks.filter((t) => t.status !== "AVAILABLE");

  return (
    <div className="earn-offers-page">
      {/* Top Banner */}
      <section className="earn-hero-banner">
        <div className="section-container">
          <div className="earn-badge-pill">
            <Sparkles size={14} />
            <span>TRANSPARENT REWARDS HUB</span>
          </div>
          <h1 className="earn-page-title">
            Complete Simple Tasks.<br />
            <span className="gradient-text">Earn Real Velocity Entries & INR.</span>
          </h1>
          <p className="earn-page-subtitle">
            Every task clearly reveals the exact reward value, estimated completion time, tracking status,
            eligibility rules, and cash-out value before you begin.
          </p>

          {/* Quick Metrics Bar */}
          <div className="earn-stats-bar">
            <div className="earn-stat-box">
              <span className="stat-label">Active Partners</span>
              <strong>11 Verified Offerwalls</strong>
            </div>
            <div className="earn-stat-box">
              <span className="stat-label">Wallet Balance</span>
              <strong className="purple-text">{balances.VEs.toLocaleString()} VEs (≈ ₹{(balances.VEs / 10).toFixed(2)})</strong>
            </div>
            <div className="earn-stat-box">
              <span className="stat-label">Tracking SLA</span>
              <strong className="green-text">100% Postback Guarantee</strong>
            </div>
            <div className="earn-stat-box">
              <span className="stat-label">Missing Credit Protection</span>
              <strong className="blue-text">24h Dispute Desk</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="earn-main-section">
        <div className="section-container">
          {/* View Mode Tabs */}
          <div className="view-mode-tabs-bar">
            <button
              className={`vm-tab ${viewTab === "available" ? "active" : ""}`}
              onClick={() => setViewTab("available")}
            >
              <span>Explore All Tasks</span>
              <span className="count-pill">{tasks.length}</span>
            </button>
            <button
              className={`vm-tab ${viewTab === "my-tasks" ? "active" : ""}`}
              onClick={() => setViewTab("my-tasks")}
            >
              <span>My Active Tracking & Pipeline</span>
              <span className="count-pill green">{activeOrTrackedTasks.length}</span>
            </button>
            <button
              className={`vm-tab ${viewTab === "disputes" ? "active" : ""}`}
              onClick={() => setViewTab("disputes")}
            >
              <span>Dispute & Support Tickets</span>
              <span className="count-pill orange">{supportTickets.length}</span>
            </button>
          </div>

          {viewTab === "available" && (
            <>
              {/* Category & Filter Bar */}
              <div className="filters-container">
                <div className="category-chips">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      className={`cat-chip ${activeCategory === cat ? "active" : ""}`}
                      onClick={() => setActiveCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="partner-dropdown-wrap">
                  <Filter size={14} className="filter-icon" />
                  <select
                    value={activePartner}
                    onChange={(e) => setActivePartner(e.target.value)}
                    className="partner-select"
                  >
                    {partners.map((p) => (
                      <option key={p} value={p}>
                        {p === "All" ? "All Offerwall Networks" : p}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Task Cards Grid */}
              <div className="task-cards-grid">
                {filteredTasks.map((task) => (
                  <div key={task.id} className="task-card">
                    <div className="task-card-header">
                      <div className="provider-info">
                        <span className="provider-name">{task.provider}</span>
                        <span className="category-pill">{task.category}</span>
                      </div>
                      <div className="reward-badge-col">
                        <strong className="reward-ves">+{task.rewardVEs} VEs</strong>
                        <small className="reward-inr">{task.rewardINR}</small>
                      </div>
                    </div>

                    <h3 className="task-name">{task.name}</h3>

                    <div className="task-specs-row">
                      <div className="spec-item">
                        <Clock size={13} />
                        <span>{task.estimatedTime}</span>
                      </div>
                      <div className="spec-item">
                        <span className={`diff-dot ${task.difficulty.toLowerCase().replace(" ", "-")}`} />
                        <span>{task.difficulty}</span>
                      </div>
                      <div className="spec-item">
                        <CheckCircle2 size={13} className="green-txt" />
                        <span>{task.completions} Done</span>
                      </div>
                    </div>

                    <div className="task-reqs-box">
                      <strong>Eligibility & Terms:</strong>
                      <p>{task.requirements}</p>
                    </div>

                    <div className="task-status-row">
                      <span className="tracking-status-label">Tracking Status:</span>
                      <span className={`status-tag ${task.status.toLowerCase()}`}>
                        {task.status.replace("_", " ")}
                      </span>
                    </div>

                    <div className="task-card-actions">
                      {task.status === "AVAILABLE" ? (
                        <button
                          className="start-task-btn"
                          onClick={() => handleStartTask(task.id)}
                        >
                          <Play size={14} />
                          <span>Start Task</span>
                        </button>
                      ) : task.status === "STARTED" ? (
                        <div className="active-action-group">
                          <button
                            className="simulate-credit-btn"
                            onClick={() => handleSimulateCreditTask(task.id)}
                            title="Simulate passing advertiser verification"
                          >
                            <Zap size={14} />
                            <span>Quick Complete (Test)</span>
                          </button>
                        </div>
                      ) : task.status === "PENDING_VERIFICATION" ? (
                        <div className="pending-cta-row">
                          <span className="pending-note">Under Review</span>
                          <button
                            className="simulate-credit-btn"
                            onClick={() => handleSimulateCreditTask(task.id)}
                          >
                            <Zap size={13} />
                            <span>Approve Now</span>
                          </button>
                        </div>
                      ) : task.status === "REJECTED" ? (
                        <button
                          className="dispute-action-btn"
                          onClick={() => handleOpenDispute(task)}
                        >
                          <AlertCircle size={14} />
                          <span>Dispute Rejection</span>
                        </button>
                      ) : (
                        <div className="credited-notice">
                          <CheckCircle2 size={16} className="green-txt" />
                          <span>Credited to Wallet</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {viewTab === "my-tasks" && (
            <div className="pipeline-container">
              <div className="pipeline-header">
                <div>
                  <h3 className="pipeline-title">Task Verification Pipeline</h3>
                  <p className="pipeline-subtitle">
                    Transparent tracking of all tasks you started, submitted, or are waiting for postback credit.
                  </p>
                </div>
                <div className="pipeline-summary-tags">
                  <span className="summary-pill green">
                    Approved & Credited: {tasks.filter((t) => t.status === "CREDITED").length}
                  </span>
                  <span className="summary-pill orange">
                    Pending Review: {tasks.filter((t) => t.status === "PENDING_VERIFICATION").length}
                  </span>
                  <span className="summary-pill red">
                    Flagged: {tasks.filter((t) => t.status === "REJECTED").length}
                  </span>
                </div>
              </div>

              <div className="pipeline-table-card">
                <table className="pipeline-table">
                  <thead>
                    <tr>
                      <th>Task ID & Offer</th>
                      <th>Partner</th>
                      <th>Reward</th>
                      <th>Lifecycle State</th>
                      <th>Resolution / Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeOrTrackedTasks.map((t) => (
                      <tr key={t.id}>
                        <td>
                          <div className="table-task-info">
                            <span className="task-code">{t.id}</span>
                            <strong>{t.name}</strong>
                          </div>
                        </td>
                        <td>
                          <span className="table-provider">{t.provider}</span>
                        </td>
                        <td>
                          <span className="table-reward">+{t.rewardVEs} VEs</span>
                          <small className="table-inr">{t.rewardINR}</small>
                        </td>
                        <td>
                          <span className={`status-pill-badge ${t.status.toLowerCase()}`}>
                            {t.status.replace("_", " ")}
                          </span>
                        </td>
                        <td>
                          <div className="table-action-cell">
                            {t.status === "REJECTED" && (
                              <button
                                className="table-dispute-btn"
                                onClick={() => handleOpenDispute(t)}
                              >
                                <AlertCircle size={13} />
                                <span>Report Missing Credit</span>
                              </button>
                            )}
                            {(t.status === "STARTED" || t.status === "PENDING_VERIFICATION") && (
                              <button
                                className="table-approve-btn"
                                onClick={() => handleSimulateCreditTask(t.id)}
                              >
                                <Zap size={13} />
                                <span>Simulate Credit</span>
                              </button>
                            )}
                            {t.status === "CREDITED" && (
                              <span className="completed-check">✓ Credited</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {viewTab === "disputes" && (
            <div className="disputes-tickets-container">
              <div className="tickets-header">
                <div>
                  <h3 className="tickets-title">User Support & Dispute Tickets</h3>
                  <p className="tickets-subtitle">
                    Track the real-time status of your missing-credit appeals with transparent audit timelines.
                  </p>
                </div>
              </div>

              <div className="tickets-grid">
                {supportTickets.map((ticket) => (
                  <div key={ticket.ticketId} className="ticket-card">
                    <div className="ticket-top">
                      <span className="ticket-code">{ticket.ticketId}</span>
                      <span className={`ticket-status ${ticket.status.toLowerCase()}`}>
                        {ticket.status}
                      </span>
                    </div>

                    <h4 className="ticket-subject">{ticket.subject}</h4>
                    <span className="ticket-task-ref">Reference: <code>{ticket.taskId}</code></span>

                    <div className="ticket-timeline-box">
                      <span className="timeline-label">Latest Auditor Log:</span>
                      <p>{ticket.lastUpdate}</p>
                    </div>

                    <div className="ticket-meta-footer">
                      <span>Submitted: <strong>{ticket.dateSubmitted}</strong></span>
                      <span>Target ETA: <strong className="green-txt">{ticket.resolutionEta}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
