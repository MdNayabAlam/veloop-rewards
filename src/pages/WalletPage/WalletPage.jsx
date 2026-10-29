import React, { useState } from "react";
import { useGiveaway } from "../../context/GiveawayContext";
import {
  Wallet,
  ArrowUpRight,
  Clock,
  Zap,
  AlertTriangle,
  CheckCircle2,
  Calculator,
  ArrowRight
} from "lucide-react";
import "./WalletPage.css";

export default function WalletPage() {
  const {
    balances,
    withdrawalMethodsData,
    transactions,
    setIsWithdrawalModalOpen,
    setSelectedWithdrawalMethod
  } = useGiveaway();

  const [calcInput, setCalcInput] = useState(balances.VEs || 850);
  const [selectedFilter, setSelectedFilter] = useState("ALL");

  const availableVEs = balances.VEs || 0;
  const availableINR = availableVEs / 10;
  const pendingINR = 85.0; // from pending Torox task
  const paidINR = 50.0; // historical UPI cashout
  const reversedINR = 9.0; // RevU speeding check

  // Minimum payout threshold is ₹50 (UPI)
  const minThreshold = 50;
  const thresholdProgress = Math.min(100, Math.floor((availableINR / minThreshold) * 100));

  const filteredTransactions = transactions.filter((txn) => {
    if (selectedFilter === "ALL") return true;
    if (selectedFilter === "EARNING") return txn.type === "EARNING";
    if (selectedFilter === "WITHDRAWAL") return txn.type === "WITHDRAWAL";
    if (selectedFilter === "GIVEAWAY") return txn.type === "GIVEAWAY_ENTRY";
    if (selectedFilter === "BONUS") return txn.type === "BONUS";
    return true;
  });

  const handleOpenCashout = (method) => {
    setSelectedWithdrawalMethod(method);
    setIsWithdrawalModalOpen(true);
  };

  return (
    <div className="wallet-page">
      {/* Hero Banner */}
      <section className="wallet-hero-banner">
        <div className="section-container">
          <div className="wallet-badge-pill">
            <Wallet size={14} />
            <span>TRANSPARENT FINTECH WALLET</span>
          </div>
          <h1 className="wallet-page-title">
            Simple, Honest Balances.<br />
            <span className="gradient-text">Instant Localized India Payouts.</span>
          </h1>
          <p className="wallet-page-subtitle">
            As recommended in our benchmark research: complete separation of available, pending, paid,
            and reversed balances with transparent 10 VEs = ₹1.00 conversion.
          </p>

          {/* 4-Way Balance Overview Grid */}
          <div className="four-balance-grid">
            {/* 1. Available Balance */}
            <div className="bal-card available">
              <div className="bal-top">
                <span className="bal-tag">AVAILABLE FOR CASHOUT</span>
                <span className="bal-dot green" />
              </div>
              <strong className="bal-main-value">₹{availableINR.toFixed(2)}</strong>
              <div className="bal-breakdown">
                <span>{availableVEs.toLocaleString()} VEs</span> ·
                <span>{balances.SVEs.toLocaleString()} SVEs</span> ·
                <span>{balances.Tokens.toLocaleString()} Tokens</span>
              </div>
              <div className="bal-status-note green">
                <CheckCircle2 size={13} />
                <span>100% Verified & Liquid</span>
              </div>
            </div>

            {/* 2. Pending Balance */}
            <div className="bal-card pending">
              <div className="bal-top">
                <span className="bal-tag">PENDING VERIFICATION</span>
                <span className="bal-dot orange" />
              </div>
              <strong className="bal-main-value">₹{pendingINR.toFixed(2)}</strong>
              <div className="bal-breakdown">
                <span>850 VEs (Torox Gaming Offer)</span>
              </div>
              <div className="bal-status-note orange">
                <Clock size={13} />
                <span>Advertiser review within 24h</span>
              </div>
            </div>

            {/* 3. Total Paid / Withdrawn */}
            <div className="bal-card paid">
              <div className="bal-top">
                <span className="bal-tag">TOTAL PAID OUT</span>
                <span className="bal-dot blue" />
              </div>
              <strong className="bal-main-value">₹{paidINR.toFixed(2)}</strong>
              <div className="bal-breakdown">
                <span>500 VEs sent to UPI ID</span>
              </div>
              <div className="bal-status-note blue">
                <CheckCircle2 size={13} />
                <span>Bank UTR Settled</span>
              </div>
            </div>

            {/* 4. Reversed / Disqualified */}
            <div className="bal-card reversed">
              <div className="bal-top">
                <span className="bal-tag">REVERSED / DISQUALIFIED</span>
                <span className="bal-dot red" />
              </div>
              <strong className="bal-main-value">₹{reversedINR.toFixed(2)}</strong>
              <div className="bal-breakdown">
                <span>90 VEs (RevU Speeding Flag)</span>
              </div>
              <div className="bal-status-note red">
                <AlertTriangle size={13} />
                <span>Dispute ticket submitted</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Section */}
      <section className="wallet-main-section">
        <div className="section-container">
          {/* Cash-Out Readiness Progress Bar */}
          <div className="threshold-progress-card">
            <div className="tpc-left">
              <div className="tpc-header">
                <Zap size={18} className="zap-green" />
                <h4>Minimum Withdrawal Threshold Progress</h4>
              </div>
              <p>
                Minimum cash-out for India UPI is <strong>₹50.00 (500 VEs)</strong>. You have <strong>₹{availableINR.toFixed(2)}</strong> available.
              </p>
              <div className="t-bar-bg">
                <div className="t-bar-fill" style={{ width: `${thresholdProgress}%` }} />
              </div>
              <span className="t-status-text">
                {thresholdProgress >= 100
                  ? "✓ You have met the minimum threshold! Ready to cash out immediately."
                  : `Need ₹${(minThreshold - availableINR).toFixed(2)} more to reach minimum cash-out.`}
              </span>
            </div>

            <div className="tpc-right">
              <button
                className="wth-cta-big"
                disabled={availableINR < minThreshold}
                onClick={() => handleOpenCashout(withdrawalMethodsData[0])}
              >
                <ArrowUpRight size={18} />
                <span>Request Cashout Now</span>
              </button>
            </div>
          </div>

          {/* India Payment Methods Grid */}
          <div className="payout-methods-sub">
            <div className="pms-header">
              <div>
                <h3 className="section-title-sm">Verified India Payout Methods</h3>
                <p className="section-desc-sm">
                  100% tested and verified payment gateways with transparent speed and zero surprise deductions.
                </p>
              </div>
            </div>

            <div className="payout-methods-grid">
              {withdrawalMethodsData.map((m) => {
                const canAfford = availableVEs >= m.minWithdrawalVEs;
                return (
                  <div key={m.id} className="payout-method-card">
                    <div className="pm-top">
                      <span className="pm-badge">{m.badge}</span>
                      <span className="pm-fee">Fee: <strong>{m.fee}</strong></span>
                    </div>

                    <h4 className="pm-name">{m.name}</h4>

                    <div className="pm-meta-rows">
                      <div className="pm-row">
                        <span>Minimum Payout:</span>
                        <strong>₹{m.minWithdrawalINR} ({m.minWithdrawalVEs} VEs)</strong>
                      </div>
                      <div className="pm-row">
                        <span>Expected Arrival:</span>
                        <strong className="green-txt">{m.processingTime}</strong>
                      </div>
                      <div className="pm-row">
                        <span>Conversion:</span>
                        <small>{m.conversionRatio}</small>
                      </div>
                    </div>

                    <button
                      className="pm-action-btn"
                      onClick={() => handleOpenCashout(m)}
                    >
                      <span>{canAfford ? "Cash Out via " + m.name.split(" ")[0] : "Check Terms & Payout"}</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Live Converter */}
          <div className="converter-card">
            <div className="conv-header">
              <Calculator size={18} className="calc-icon" />
              <div>
                <h4>Live Currency & Points Conversion Calculator</h4>
                <p>Verify exact value before completing offers or requesting cash-outs.</p>
              </div>
            </div>

            <div className="conv-grid">
              <div className="conv-input-group">
                <label htmlFor="ve-input">Velocity Entries (VEs)</label>
                <input
                  id="ve-input"
                  type="number"
                  value={calcInput}
                  onChange={(e) => setCalcInput(Math.max(0, parseInt(e.target.value) || 0))}
                  className="conv-input"
                />
              </div>

              <div className="conv-equals">=</div>

              <div className="conv-output-box">
                <span className="conv-res-label">Indian Rupee (₹ INR)</span>
                <strong className="conv-res-value">₹{(calcInput / 10).toFixed(2)}</strong>
                <small className="conv-res-sub">Direct Bank / UPI Value</small>
              </div>

              <div className="conv-output-box">
                <span className="conv-res-label">US Dollar ($ USD)</span>
                <strong className="conv-res-value">${(calcInput / 840).toFixed(2)}</strong>
                <small className="conv-res-sub">Crypto / International</small>
              </div>
            </div>
          </div>

          {/* Transaction & Withdrawal Ledger */}
          <div className="ledger-section">
            <div className="ledger-header">
              <div>
                <h3 className="section-title-sm">Complete Transaction Ledger</h3>
                <p className="section-desc-sm">
                  Timestamped, immutable record of every earning, giveaway entry, daily bonus, and payout.
                </p>
              </div>

              <div className="ledger-filters">
                {["ALL", "EARNING", "WITHDRAWAL", "GIVEAWAY", "BONUS"].map((f) => (
                  <button
                    key={f}
                    className={`l-filter-btn ${selectedFilter === f ? "active" : ""}`}
                    onClick={() => setSelectedFilter(f)}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="ledger-table-wrap">
              <table className="ledger-table">
                <thead>
                  <tr>
                    <th>Transaction ID</th>
                    <th>Activity & Category</th>
                    <th>Provider / Channel</th>
                    <th>Amount & Value</th>
                    <th>Date & Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((txn) => (
                    <tr key={txn.id}>
                      <td>
                        <code className="txn-id-code">{txn.id}</code>
                      </td>
                      <td>
                        <strong>{txn.title}</strong>
                        <span className="txn-cat-pill">{txn.category}</span>
                      </td>
                      <td>
                        <span className="txn-provider">{txn.provider}</span>
                      </td>
                      <td>
                        <strong className={`txn-amount ${txn.amount.startsWith("+") ? "positive" : "negative"}`}>
                          {txn.amount} {txn.currency}
                        </strong>
                        <small className="txn-inr-equiv">{txn.amountINR}</small>
                      </td>
                      <td>
                        <span className="txn-date">{txn.date}</span>
                      </td>
                      <td>
                        <span className={`txn-status-badge ${txn.status.toLowerCase()}`}>
                          {txn.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
