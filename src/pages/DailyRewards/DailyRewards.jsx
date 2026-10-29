import React, { useState } from "react";
import { useGiveaway } from "../../context/GiveawayContext";
import {
  Flame,
  Sparkles,
  Trophy,
  Shield,
  Clock,
  Gift,
  CheckCircle2,
  Lock,
  Info,
  RotateCw
} from "lucide-react";
import "./DailyRewards.css";

export default function DailyRewards() {
  const {
    streakState,
    handleClaimDailyStreak,
    luckyWheelSlices,
    handleSpinWheel,
    isSpinning,
    spinResult,
    spinCooldown,
    userXP,
    levelTiersData,
    missions,
    badges
  } = useGiveaway();

  const [activeTab, setActiveTab] = useState("streaks"); // "streaks" | "wheel" | "missions"
  const [showOddsModal, setShowOddsModal] = useState(false);

  // Determine current tier from userXP
  const currentTier =
    levelTiersData.slice().reverse().find((t) => userXP >= t.minXP) || levelTiersData[0];
  const nextTier = levelTiersData.find((t) => t.level === currentTier.level + 1);
  const xpInTier = userXP - currentTier.minXP;
  const xpNeeded = nextTier ? nextTier.minXP - currentTier.minXP : 5000;
  const progressPercent = Math.min(100, Math.floor((xpInTier / xpNeeded) * 100));

  return (
    <div className="daily-rewards-page">
      {/* Hero Banner */}
      <section className="daily-hero-banner">
        <div className="section-container">
          <div className="daily-badge-pill">
            <Flame size={14} className="flame-icon" />
            <span>DAILY ENGAGEMENT & STREAKS</span>
          </div>
          <h1 className="daily-page-title">
            Reward Repeat Engagement.<br />
            <span className="gradient-text">Fair Gamification & Daily Bonuses.</span>
          </h1>
          <p className="daily-page-subtitle">
            Sustainable daily check-ins, transparent spin wheel odds, and milestones designed to boost your earnings
            without confusing points with cash values.
          </p>

          {/* User Level Header Card */}
          <div className="level-progression-card">
            <div className="level-left">
              <div className="tier-badge-icon">
                <Trophy size={24} />
              </div>
              <div className="tier-info">
                <span className="tier-sub">Current Rank</span>
                <strong className="tier-title">{currentTier.name} (Level {currentTier.level})</strong>
                <span className="tier-perk">Perk: {currentTier.perk}</span>
              </div>
            </div>

            <div className="level-right">
              <div className="xp-label-row">
                <span>Tier Experience</span>
                <strong>{userXP.toLocaleString()} / {nextTier ? nextTier.minXP.toLocaleString() : "MAX"} XP</strong>
              </div>
              <div className="xp-bar-bg">
                <div className="xp-bar-fill" style={{ width: `${progressPercent}%` }} />
              </div>
              {nextTier && (
                <span className="next-tier-hint">
                  {nextTier.minXP - userXP} XP to unlock <strong>{nextTier.name}</strong> (+{nextTier.perk.split(",")[0]})
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="daily-main-section">
        <div className="section-container">
          {/* Navigation Sub-Tabs */}
          <div className="daily-nav-tabs">
            <button
              className={`d-nav-btn ${activeTab === "streaks" ? "active" : ""}`}
              onClick={() => setActiveTab("streaks")}
            >
              <Flame size={16} />
              <span>7-Day Daily Streaks</span>
            </button>
            <button
              className={`d-nav-btn ${activeTab === "wheel" ? "active" : ""}`}
              onClick={() => setActiveTab("wheel")}
            >
              <Sparkles size={16} />
              <span>Lucky Prize Wheel</span>
            </button>
            <button
              className={`d-nav-btn ${activeTab === "missions" ? "active" : ""}`}
              onClick={() => setActiveTab("missions")}
            >
              <Trophy size={16} />
              <span>Missions & Badges</span>
            </button>
          </div>

          {/* TAB 1: 7-DAY DAILY STREAKS */}
          {activeTab === "streaks" && (
            <div className="streak-tab-container">
              <div className="streak-header-card">
                <div className="streak-title-col">
                  <div className="streak-counter-pill">
                    <Flame size={18} className="flame-icon-fire" />
                    <strong>{streakState.currentStreak} DAYS STREAK</strong>
                  </div>
                  <h3 className="streak-card-title">Check in daily to build your multiplier</h3>
                  <p className="streak-card-desc">
                    Claim your daily reward before 11:59 PM IST. Reach Day 7 to open the Golden Mega Mystery Chest!
                  </p>
                </div>

                <div className="streak-timer-col">
                  <span className="timer-title">
                    <Clock size={13} /> Next Reset In
                  </span>
                  <div className="reset-digits">
                    <strong>14h : 32m : 18s</strong>
                  </div>
                  <span className="freeze-card-badge" title="Prevents streak loss if you miss 1 day">
                    <Shield size={12} /> {streakState.freezeCards} Streak Freeze Available
                  </span>
                </div>
              </div>

              {/* 7-Days Calendar Grid */}
              <div className="streak-calendar-grid">
                {streakState.days.map((d) => {
                  const isCurrent = d.day === streakState.currentStreak;

                  return (
                    <div
                      key={d.day}
                      className={`streak-day-card ${d.claimed ? "claimed" : ""} ${isCurrent ? "current-today" : ""} ${d.isMega ? "mega-day" : ""}`}
                    >
                      <div className="day-top-bar">
                        <span className="day-label">{d.label}</span>
                        {d.claimed && <CheckCircle2 size={14} className="claimed-check" />}
                        {isCurrent && !d.claimed && <span className="today-badge">TODAY</span>}
                      </div>

                      <div className="day-icon-circle">
                        <span className="day-emoji">{d.icon}</span>
                      </div>

                      <div className="day-reward-info">
                        <strong className="reward-ves">+{d.rewardVEs} VEs</strong>
                        <small className="reward-tokens">+{d.rewardTokens} Tokens</small>
                      </div>

                      {d.isMega && (
                        <div className="mega-pill">
                          <Gift size={11} />
                          <span>MEGA CHEST</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Claim Action Bar */}
              <div className="streak-action-bar">
                <div className="streak-action-text">
                  <h4>
                    {streakState.claimedToday
                      ? "✓ You have claimed today's Day " + streakState.currentStreak + " bonus!"
                      : "Ready to claim Day " + streakState.currentStreak + " Reward?"}
                  </h4>
                  <p>
                    {streakState.claimedToday
                      ? "Great job! Come back tomorrow after midnight IST to unlock Day " + (streakState.currentStreak + 1) + "."
                      : "Click below to immediately credit your wallet with +" +
                        streakState.days[streakState.currentStreak - 1].rewardVEs +
                        " VEs and +" +
                        streakState.days[streakState.currentStreak - 1].rewardTokens +
                        " Tokens."}
                  </p>
                </div>

                <button
                  className="claim-streak-btn"
                  onClick={handleClaimDailyStreak}
                  disabled={streakState.claimedToday}
                >
                  <Flame size={18} />
                  <span>
                    {streakState.claimedToday ? "Claimed for Today" : "Claim Day " + streakState.currentStreak + " Reward"}
                  </span>
                </button>
              </div>

              {/* Fair Rules Accordion */}
              <div className="fair-rules-card">
                <div className="fr-title">
                  <Info size={16} className="info-icon" />
                  <strong>Fair Streak & Reset Rules (Benchmarking Standard)</strong>
                </div>
                <ul className="fr-list">
                  <li>
                    <strong>Daily Cutoff:</strong> The streak day runs from 00:00:00 to 23:59:59 IST.
                  </li>
                  <li>
                    <strong>Streak Freeze Protection:</strong> You have 1 Streak Freeze in reserve. If you miss a calendar day, your freeze card will automatically activate and prevent your streak from resetting to Day 1.
                  </li>
                  <li>
                    <strong>Sustainable Progression:</strong> Rewards scale up from +10 VEs to +150 VEs to maintain long-term platform financial balance and fraud resilience.
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 2: LUCKY SPIN WHEEL */}
          {activeTab === "wheel" && (
            <div className="wheel-tab-container">
              <div className="wheel-layout">
                {/* Visual Wheel Column */}
                <div className="wheel-visual-col">
                  <div className="wheel-canvas-wrapper">
                    <div className="wheel-pointer-arrow" />
                    <div
                      className={`wheel-disc ${isSpinning ? "spinning" : ""}`}
                      style={{
                        transform: spinResult
                          ? `rotate(${360 * 5 + spinResult.id * 45}deg)`
                          : undefined
                      }}
                    >
                      {luckyWheelSlices.map((slice, i) => (
                        <div
                          key={slice.id}
                          className="wheel-slice"
                          style={{
                            transform: `rotate(${i * 45}deg)`,
                            background: slice.color
                          }}
                        >
                          <span className="slice-text">{slice.label}</span>
                        </div>
                      ))}
                      <div className="wheel-center-hub">
                        <Sparkles size={20} />
                      </div>
                    </div>
                  </div>

                  {spinResult && (
                    <div className="spin-result-card">
                      <Sparkles size={18} className="result-sparkle" />
                      <div>
                        <span className="res-kicker">CONGRATULATIONS!</span>
                        <strong className="res-title">You Won {spinResult.label}!</strong>
                      </div>
                    </div>
                  )}

                  <div className="wheel-actions-row">
                    <button
                      className="spin-trigger-btn"
                      onClick={handleSpinWheel}
                      disabled={isSpinning || spinCooldown > 0}
                    >
                      <RotateCw size={18} className={isSpinning ? "spin-icon-anim" : ""} />
                      <span>
                        {isSpinning
                          ? "Spinning Wheel..."
                          : spinCooldown > 0
                          ? `Cooldown (${spinCooldown}s)`
                          : "Spin Free Daily Wheel"}
                      </span>
                    </button>

                    <button
                      className="view-odds-btn"
                      onClick={() => setShowOddsModal(!showOddsModal)}
                    >
                      <Info size={14} />
                      <span>{showOddsModal ? "Hide Odds" : "View Certified Odds"}</span>
                    </button>
                  </div>
                </div>

                {/* Right Info Column */}
                <div className="wheel-info-col">
                  <div className="wheel-principles-card">
                    <div className="wp-header">
                      <Shield size={18} className="shield-icon" />
                      <h4>Chance-Based Transparency Rules</h4>
                    </div>
                    <p>
                      In alignment with the VELOOP research recommendations on Page 6 of the benchmark assignment:
                    </p>
                    <ul>
                      <li>All chance-based prizes disclose exact mathematical probability.</li>
                      <li>No fake "guaranteed jackpot" claims.</li>
                      <li>Free daily ticket granted to all active verified participants.</li>
                      <li>Prizes credit automatically to your live virtual balance.</li>
                    </ul>
                  </div>

                  {showOddsModal && (
                    <div className="odds-table-card">
                      <h5>Certified Wheel Probability Distribution</h5>
                      <table className="odds-table">
                        <thead>
                          <tr>
                            <th>Prize Segment</th>
                            <th>Value</th>
                            <th>Odds</th>
                          </tr>
                        </thead>
                        <tbody>
                          {luckyWheelSlices.map((s) => (
                            <tr key={s.id}>
                              <td>
                                <span className="odd-slice-dot" style={{ background: s.color }} />
                                <strong>{s.label}</strong>
                              </td>
                              <td>{s.value} {s.currency}</td>
                              <td className="odds-pct">{s.odds}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MISSIONS & BADGES */}
          {activeTab === "missions" && (
            <div className="missions-tab-container">
              {/* Active Missions Grid */}
              <div className="missions-sub-section">
                <h3 className="section-sub-title">Active Goals & Bonus Challenges</h3>
                <p className="section-sub-desc">
                  Complete optional milestones to earn bonus VEs and Level XP without wagering any funds.
                </p>

                <div className="missions-grid">
                  {missions.map((m) => (
                    <div key={m.id} className={`mission-card ${m.isCompleted ? "completed" : ""}`}>
                      <div className="mission-card-top">
                        <h4 className="mission-title">{m.title}</h4>
                        <div className="mission-reward-badge">
                          <strong>+{m.rewardVEs} VEs</strong>
                          <small>+{m.rewardXP} XP</small>
                        </div>
                      </div>

                      <p className="mission-desc">{m.desc}</p>

                      <div className="mission-progress-bar-wrap">
                        <div className="mpb-bg">
                          <div className="mpb-fill" style={{ width: `${m.progress}%` }} />
                        </div>
                        <span className="mpb-text">{m.progress}%</span>
                      </div>

                      <div className="mission-footer">
                        {m.isCompleted ? (
                          <span className="mission-done-tag">
                            <CheckCircle2 size={13} /> Completed
                          </span>
                        ) : (
                          <span className="mission-pending-tag">In Progress</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievement Badges Showcase */}
              <div className="badges-sub-section">
                <h3 className="section-sub-title">Achievement Badges Showcase</h3>
                <p className="section-sub-desc">
                  Collect authentic badges that commemorate meaningful engagement on VELOOP Rewards.
                </p>

                <div className="badges-grid">
                  {badges.map((b) => (
                    <div key={b.id} className={`badge-card ${b.unlocked ? "unlocked" : "locked"}`}>
                      <div className="badge-icon-wrap">
                        <span className="badge-emoji">{b.icon}</span>
                        {!b.unlocked && <Lock size={14} className="lock-overlay" />}
                      </div>

                      <h4 className="badge-name">{b.name}</h4>
                      <p className="badge-desc">{b.desc}</p>

                      <div className="badge-status-tag">
                        {b.unlocked ? (
                          <span className="unlocked-text">Unlocked {b.date}</span>
                        ) : (
                          <span className="locked-text">Locked Milestone</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
