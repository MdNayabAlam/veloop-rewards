import React, { useState } from "react";
import { useGiveaway } from "../../context/GiveawayContext";
import {
  Users,
  Copy,
  Check,
  Share2,
  ShieldAlert
} from "lucide-react";
import "./ReferralPage.css";

export default function ReferralPage() {
  const { referralState, showToast } = useGiveaway();
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralState.referralCode);
    setCopiedCode(true);
    showToast("Referral code copied to clipboard!", "success");
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralState.referralLink);
    setCopiedLink(true);
    showToast("Referral link copied to clipboard!", "success");
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="referral-page">
      {/* Hero Banner */}
      <section className="ref-hero-banner">
        <div className="section-container">
          <div className="ref-badge-pill">
            <Users size={14} />
            <span>RESPONSIBLE REFERRAL PROGRAM</span>
          </div>
          <h1 className="ref-page-title">
            Invite Friends.<br />
            <span className="gradient-text">Earn Lifetime 10% Commission.</span>
          </h1>
          <p className="ref-page-subtitle">
            Transparent qualifying events, immediate verification logs, and anti-fraud protections designed to reward
            authentic recommendations.
          </p>

          {/* Share Code & Link Card */}
          <div className="ref-share-card">
            <div className="share-box">
              <span className="share-label">Your Unique Referral Code</span>
              <div className="share-code-row">
                <span className="code-text">{referralState.referralCode}</span>
                <button className="copy-btn" onClick={handleCopyCode}>
                  {copiedCode ? <Check size={16} className="green-txt" /> : <Copy size={16} />}
                  <span>{copiedCode ? "Copied" : "Copy Code"}</span>
                </button>
              </div>
            </div>

            <div className="share-box">
              <span className="share-label">Your Direct Invitation Link</span>
              <div className="share-code-row">
                <span className="link-text">{referralState.referralLink}</span>
                <button className="copy-btn link-style" onClick={handleCopyLink}>
                  {copiedLink ? <Check size={16} className="green-txt" /> : <Share2 size={16} />}
                  <span>{copiedLink ? "Copied" : "Copy Link"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="ref-stats-bar">
            <div className="ref-stat-box">
              <span className="stat-label">Total Friends Invited</span>
              <strong>{referralState.totalInvited} Members</strong>
            </div>
            <div className="ref-stat-box">
              <span className="stat-label">Active Verified Earners</span>
              <strong className="green-txt">{referralState.activeEarners} Active</strong>
            </div>
            <div className="ref-stat-box">
              <span className="stat-label">Total Commission Earned</span>
              <strong className="purple-txt">+{referralState.totalVEsEarned} VEs (≈ ₹{(referralState.totalVEsEarned / 10).toFixed(2)})</strong>
            </div>
            <div className="ref-stat-box">
              <span className="stat-label">Commission Tier</span>
              <strong className="blue-txt">{referralState.tier}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="ref-main-section">
        <div className="section-container">
          {/* How Referrals Pay You */}
          <div className="tiers-breakdown-card">
            <h3 className="section-title-sm">How Referral Rewards Work</h3>
            <p className="section-desc-sm">
              Clear, transparent milestones so you know exactly when bonuses are credited.
            </p>

            <div className="tiers-grid">
              <div className="tier-step-card">
                <div className="step-num-badge">01</div>
                <h4 className="step-title">Friend Signs Up & Verifies</h4>
                <div className="step-reward-pill">+50 VEs Instant</div>
                <p className="step-desc">
                  When your invited friend creates an account and completes basic profile verification, you receive +50 VEs.
                </p>
              </div>

              <div className="tier-step-card">
                <div className="step-num-badge">02</div>
                <h4 className="step-title">Friend Completes 1st Offer</h4>
                <div className="step-reward-pill green">+100 VEs Milestone</div>
                <p className="step-desc">
                  When they complete their first survey, mobile game, or microtask on any partner offerwall.
                </p>
              </div>

              <div className="tier-step-card">
                <div className="step-num-badge">03</div>
                <h4 className="step-title">Lifetime 10% Commission</h4>
                <div className="step-reward-pill purple">10% Forever</div>
                <p className="step-desc">
                  You automatically receive 10% of whatever your friend earns on offerwall tasks, funded directly from VELOOP's operating pool without deducting from your friend.
                </p>
              </div>
            </div>
          </div>

          {/* Invited Friends Ledger */}
          <div className="friends-ledger-section">
            <div className="friends-header">
              <div>
                <h3 className="section-title-sm">Your Invited Friends & Activity Ledger</h3>
                <p className="section-desc-sm">
                  Masked IDs protect participant privacy while giving you full transparency over qualifying actions.
                </p>
              </div>
            </div>

            <div className="friends-table-card">
              <table className="friends-table">
                <thead>
                  <tr>
                    <th>Friend & User ID</th>
                    <th>Date Joined</th>
                    <th>Status</th>
                    <th>Offers Completed</th>
                    <th>Your Commission</th>
                  </tr>
                </thead>
                <tbody>
                  {referralState.referralsList.map((ref) => (
                    <tr key={ref.id}>
                      <td>
                        <strong>{ref.maskedName}</strong>
                      </td>
                      <td>
                        <span className="date-txt">{ref.joinedDate}</span>
                      </td>
                      <td>
                        <span className={`ref-status-pill ${ref.status.toLowerCase().replace(" ", "-")}`}>
                          {ref.status}
                        </span>
                      </td>
                      <td>
                        <span className="offers-count">{ref.offersCompleted} Tasks</span>
                      </td>
                      <td>
                        <strong className="earned-ves">+{ref.earnedVEs} VEs</strong>
                        <small className="inr-sub">≈ ₹{(ref.earnedVEs / 10).toFixed(2)}</small>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Anti-Fraud & Compliance Callout */}
          <div className="anti-fraud-card">
            <div className="af-header">
              <ShieldAlert size={20} className="red-icon" />
              <h4>Responsible Referral Guidelines & Anti-Fraud Rules</h4>
            </div>
            <ul className="af-list">
              <li>
                <strong>No Self-Referral:</strong> Creating multiple accounts from the same household or IP address will trigger automatic fraud flags.
              </li>
              <li>
                <strong>No Misleading Claims:</strong> Never promise guaranteed salaries, investments, or lottery payouts in advertisements.
              </li>
              <li>
                <strong>No Spam / Bot Networks:</strong> Automated clicking or fake emulators result in immediate balance forfeiture and permanent bans.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
