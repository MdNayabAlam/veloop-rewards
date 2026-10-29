import React from "react";
import { useGiveaway } from "../../context/GiveawayContext";
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  PieChart,
  FileText
} from "lucide-react";
import "./TrustDashboard.css";

export default function TrustDashboard() {
  const { partnerAuditData, trustMetricsData, navigateToRoute } = useGiveaway();

  return (
    <div className="trust-dashboard-page">
      {/* Hero Banner */}
      <section className="trust-hero-banner">
        <div className="section-container">
          <div className="trust-badge-pill">
            <ShieldCheck size={14} />
            <span>TRANSPARENCY & INTEGRITY DASHBOARD</span>
          </div>
          <h1 className="trust-page-title">
            Trust First.<br />
            <span className="gradient-text">Complete Openness in Rewards & Payouts.</span>
          </h1>
          <p className="trust-page-subtitle">
            As highlighted in our benchmark research: a sustainable GPT platform must publish exact payout rules,
            verified partner audits, anti-fraud standards, and a transparent explanation of how rewards are funded.
          </p>

          {/* Key Trust Metrics */}
          <div className="trust-metrics-grid">
            <div className="trust-metric-box">
              <span className="metric-label">Payout Success Rate</span>
              <strong className="green-txt">{trustMetricsData.payoutSuccessRate}</strong>
              <small>Across 18,200+ cashouts</small>
            </div>
            <div className="trust-metric-box">
              <span className="metric-label">Avg Payout Speed</span>
              <strong className="blue-txt">{trustMetricsData.averagePayoutSpeed}</strong>
              <small>Direct to India UPI</small>
            </div>
            <div className="trust-metric-box">
              <span className="metric-label">Total Rewards Dispatched</span>
              <strong className="purple-txt">{trustMetricsData.totalRewardsPaidINR}</strong>
              <small>Certified bank settlements</small>
            </div>
            <div className="trust-metric-box">
              <span className="metric-label">Verified Giveaway Winners</span>
              <strong className="gold-txt">{trustMetricsData.verifiedWinnersCount}</strong>
              <small>Public audit ledger</small>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="trust-main-section">
        <div className="section-container">
          {/* Revenue Split & Business Model Disclosure (PDF Page 8) */}
          <div className="revenue-model-card">
            <div className="rm-left">
              <div className="rm-title-row">
                <PieChart size={20} className="purple-txt" />
                <h3>How Rewards Are Funded (Revenue Split Model)</h3>
              </div>
              <p>
                GPT platforms connect advertisers with active users. Advertisers pay VELOOP for verified survey completions,
                app milestones, and shopping conversions. Here is exactly how that revenue is split:
              </p>

              <div className="split-bars-list">
                <div className="split-item">
                  <div className="split-info">
                    <strong>Direct User Reward Pool</strong>
                    <span className="green-txt">{trustMetricsData.revenueDistributionModel.userRewardPool}</span>
                  </div>
                  <div className="split-bar-bg">
                    <div className="split-bar-fill green" style={{ width: trustMetricsData.revenueDistributionModel.userRewardPool }} />
                  </div>
                </div>

                <div className="split-item">
                  <div className="split-info">
                    <strong>Fraud Loss Buffer & 24h User Support</strong>
                    <span className="orange-txt">{trustMetricsData.revenueDistributionModel.fraudBufferAndSupport}</span>
                  </div>
                  <div className="split-bar-bg">
                    <div className="split-bar-fill orange" style={{ width: trustMetricsData.revenueDistributionModel.fraudBufferAndSupport }} />
                  </div>
                </div>

                <div className="split-item">
                  <div className="split-info">
                    <strong>Operating Costs, Cloud Servers & Banking Fees</strong>
                    <span className="blue-txt">{trustMetricsData.revenueDistributionModel.operatingCostsAndTaxes}</span>
                  </div>
                  <div className="split-bar-bg">
                    <div className="split-bar-fill blue" style={{ width: trustMetricsData.revenueDistributionModel.operatingCostsAndTaxes }} />
                  </div>
                </div>

                <div className="split-item">
                  <div className="split-info">
                    <strong>Platform Development Margin</strong>
                    <span className="purple-txt">{trustMetricsData.revenueDistributionModel.platformMargin}</span>
                  </div>
                  <div className="split-bar-bg">
                    <div className="split-bar-fill purple" style={{ width: trustMetricsData.revenueDistributionModel.platformMargin }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="rm-right">
              <div className="guarantee-box">
                <CheckCircle2 size={24} className="green-txt" />
                <h4>Our Zero-Cut Guarantee</h4>
                <p>
                  User reward amounts displayed on task cards are 100% net: we never deduct undisclosed handling fees
                  or hidden rollover penalties upon cash-out.
                </p>
                <button
                  className="read-report-btn"
                  onClick={() => navigateToRoute("research-report")}
                >
                  <FileText size={15} />
                  <span>Read Full Benchmark Report</span>
                </button>
              </div>
            </div>
          </div>

          {/* Complete 11 Partner Audit Table (PDF Page 7) */}
          <div className="partner-audit-section">
            <div className="pas-header">
              <div>
                <h3 className="section-title-sm">11-Partner Offerwall Audit & Verification Matrix</h3>
                <p className="section-desc-sm">
                  Independent audit table of the 11 named offerwall networks evaluated in our research assignment.
                </p>
              </div>
            </div>

            <div className="pas-table-wrap">
              <table className="pas-table">
                <thead>
                  <tr>
                    <th>Network</th>
                    <th>Audit Status</th>
                    <th>Tasks & Inventory</th>
                    <th>India Support</th>
                    <th>Tracking Mechanism</th>
                    <th>Missing Credit Route</th>
                    <th>Safety Score</th>
                  </tr>
                </thead>
                <tbody>
                  {partnerAuditData.map((p) => (
                    <tr key={p.network}>
                      <td>
                        <strong className="net-name">{p.network}</strong>
                      </td>
                      <td>
                        <span className="audit-status-badge confirmed">
                          <CheckCircle2 size={12} />
                          <span>{p.status}</span>
                        </span>
                      </td>
                      <td>
                        <span className="tasks-desc">{p.tasksOffered}</span>
                      </td>
                      <td>
                        <span className="country-desc">{p.countrySupport}</span>
                      </td>
                      <td>
                        <span className="tracking-desc">{p.trackingMechanism}</span>
                      </td>
                      <td>
                        <span className="support-desc">{p.missingCreditRoute}</span>
                      </td>
                      <td>
                        <strong className="rating-txt">{p.rating}</strong>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Anti-Fraud Charter */}
          <div className="anti-fraud-charter-card">
            <div className="afc-header">
              <Lock size={20} className="gold-txt" />
              <h4>Anti-Fraud Without Unfairness (Recommendation #10)</h4>
            </div>
            <p className="afc-intro">
              Many competitor platforms arbitrarily ban users when they request withdrawals. VELOOP enforces proportionate
              risk checks and guaranteed human reviews so legitimate users are never blocked unfairly.
            </p>

            <div className="charter-points-grid">
              <div className="cp-box">
                <strong>1. Transparent Disqualification Logs</strong>
                <p>If an advertiser rejects a milestone, the exact machine reason (speeding, device mismatch, duplicate IP) is displayed to the user.</p>
              </div>
              <div className="cp-box">
                <strong>2. Human Appeal Route</strong>
                <p>Users can dispute flags via our built-in dispute desk with screenshot proof. Appeals are resolved within 24 to 48 hours.</p>
              </div>
              <div className="cp-box">
                <strong>3. Privacy-First Verification</strong>
                <p>We do not demand invasive phone permissions or monitor device traffic. Only essential verification data is retained.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
