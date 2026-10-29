import React from "react";
import { useGiveaway } from "../../context/GiveawayContext";
import { currentWinnersData, previousGiveawaysData } from "../../data/giveawayData";
import { Trophy, History, ShieldCheck, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import "./WinnersSection.css";

export default function WinnersSection() {
  const { activeTab, setActiveTab, giveawayStatus, formatTimer } = useGiveaway();
  const timer = formatTimer();

  return (
    <section className="veloop-winners-section" id="winners-section">
      <div className="section-container">
        <div className="winners-section-header">
          <span className="section-kicker">VERIFIED TRANSPARENCY</span>
          <h2 className="section-title">🏆 Giveaway Winners Hall</h2>
          <p className="section-desc">
            All VELOOP Giveaway draws are cryptographically certified and verified for 100% fair winner distribution.
          </p>

          <div className="winners-tab-switcher">
            <button
              className={`tab-btn ${activeTab === "winners" ? "active" : ""}`}
              onClick={() => setActiveTab("winners")}
            >
              <Trophy size={15} />
              <span>Current Giveaway Draw</span>
            </button>
            <button
              className={`tab-btn ${activeTab === "previous" ? "active" : ""}`}
              onClick={() => setActiveTab("previous")}
            >
              <History size={15} />
              <span>Previous Winners Hall</span>
            </button>
          </div>
        </div>

        {/* TAB 1: CURRENT GIVEAWAY */}
        {activeTab === "winners" && (
          <div className="tab-content current-winners-tab">
            {giveawayStatus === "ACTIVE" ? (
              <div className="live-giveaway-notice-card">
                <div className="notice-icon-circle">
                  <Clock size={32} className="pulsing-clock" />
                </div>
                <div className="notice-content">
                  <span className="live-badge">STATUS: LIVE GIVEAWAY</span>
                  <h3>Winners will be announced once the draw closes</h3>
                  <p>
                    This giveaway is currently active. In accordance with VELOOP transparency standards,
                    no winners are finalized or displayed prior to the scheduled draw closing time.
                  </p>

                  <div className="closing-in-box">
                    <span>Official Automated Selection Starts In:</span>
                    <strong>{timer.days}d : {timer.hours}h : {timer.minutes}m : {timer.seconds}s</strong>
                  </div>
                </div>

                <div className="prize-distribution-summary">
                  <h4>Configured Winner Distribution</h4>
                  <ul className="distribution-list">
                    <li>
                      <span className="dist-pos">1st Prize: iPhone 15 Pro</span>
                      <strong className="dist-count">1 Certified Winner</strong>
                    </li>
                    <li>
                      <span className="dist-pos">2nd Prize: Apple Watch Series 9</span>
                      <strong className="dist-count">3 Certified Winners</strong>
                    </li>
                    <li>
                      <span className="dist-pos">3rd Prize: AirPods Pro 2</span>
                      <strong className="dist-count">5 Certified Winners</strong>
                    </li>
                    <li>
                      <span className="dist-pos">Lucky Draw: Amazon ₹2,000 Voucher</span>
                      <strong className="dist-count">10 Certified Winners</strong>
                    </li>
                  </ul>
                </div>
              </div>
            ) : giveawayStatus === "ENDED" ? (
              <div className="ended-winners-grid">
                <div className="winner-announcement-banner">
                  <Trophy size={28} className="trophy-gold" />
                  <div>
                    <h3>Official Draw Results Confirmed</h3>
                    <p>Congratulations to all winners! Claim notifications have been dispatched.</p>
                  </div>
                </div>

                <div className="winner-categories-container">
                  {currentWinnersData.map((category) => (
                    <div className={`winner-cat-card ${category.color}`} key={category.prizeId}>
                      <div className="winner-cat-header">
                        <div className="cat-badge-wrap">
                          <span className="cat-rank">{category.prizePosition}</span>
                          <span className="cat-count">{category.winnerCount} {category.winnerCount === 1 ? "Winner" : "Winners"}</span>
                        </div>
                        <h4 className="cat-prize-name">{category.prizeName}</h4>
                      </div>

                      <div className="winner-asset-preview">
                        <img src={category.image} alt={category.prizeName} className="cat-img" />
                      </div>

                      <div className="winners-masked-list">
                        {category.winners.map((w) => (
                          <div className="winner-row" key={w.userId}>
                            <div className="winner-id-col">
                              <span className="verified-shield">
                                <ShieldCheck size={14} />
                              </span>
                              <strong className="winner-masked-id">{w.displayName}</strong>
                            </div>
                            <div className="winner-ticket-col">
                              <small>{w.city}</small>
                              <span className="ticket-tag">{w.ticketNumber}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="upcoming-empty-card">
                <AlertCircle size={32} />
                <h3>Next Giveaway Draw In Preparation</h3>
                <p>New reward tiers will open shortly. Check the featured prizes to prepare your entries.</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PREVIOUS WINNERS */}
        {activeTab === "previous" && (
          <div className="tab-content previous-winners-tab">
            <div className="previous-giveaways-list">
              {previousGiveawaysData.map((event) => (
                <div className="previous-event-card" key={event.id}>
                  <div className="event-meta-header">
                    <div>
                      <span className="event-label">COMPLETED EVENT</span>
                      <h3 className="event-title">{event.name}</h3>
                    </div>
                    <div className="event-stats-pill">
                      <span>{event.participants} Participants</span>
                      <span className="sep">•</span>
                      <span>{event.date}</span>
                    </div>
                  </div>

                  <div className="previous-winners-table">
                    {event.winners.map((win, idx) => (
                      <div className="prev-winner-row" key={idx}>
                        <div className="col-user">
                          <span className="user-avatar-tiny">VE</span>
                          <strong>{win.maskedId}</strong>
                          <span className="winner-city">({win.city})</span>
                        </div>
                        <div className="col-prize">
                          <span className="prize-cat-pill">{win.category}</span>
                          <span className="prize-name-text">{win.prize}</span>
                        </div>
                        <div className="col-status">
                          <span className="claim-delivered-tag">
                            <CheckCircle2 size={13} />
                            {win.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
