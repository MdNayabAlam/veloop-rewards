import React, { useState } from "react";
import { useGiveaway } from "../../context/GiveawayContext";
import { currentGiveawayData } from "../../data/giveawayData";
import {
  ArrowLeft,
  Clock,
  Users,
  Trophy,
  Zap,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Gift,
  HelpCircle,
  ExternalLink
} from "lucide-react";
import "./IndividualGiveaway.css";

export default function IndividualGiveaway() {
  const {
    selectedSlug,
    navigateToHome,
    giveawayStatus,
    formatTimer,
    currentUser,
    balances,
    joinedPrizes,
    setConfirmPrize,
    setIsLoginModalOpen,
    setIsRulesModalOpen
  } = useGiveaway();

  const [openTerms, setOpenTerms] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);

  // Lookup prize by slug or fallback to first prize
  const prize =
    currentGiveawayData.prizes.find((p) => p.slug === selectedSlug) ||
    currentGiveawayData.prizes[0];

  const timer = formatTimer();
  const isJoined = joinedPrizes.has(prize.id);
  const currentBalance = balances[prize.currency] || 0;
  const isSufficient = currentBalance >= prize.entryFee;
  const deficit = Math.max(0, prize.entryFee - currentBalance);

  const handleJoinClick = () => {
    if (!currentUser.isLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }
    if (isJoined) return;
    if (!isSufficient) return;

    setConfirmPrize(prize);
  };

  return (
    <div className="individual-giveaway-page">
      {/* Back Navigation Bar */}
      <div className="sub-navbar-bar">
        <div className="section-container">
          <button className="back-nav-btn" onClick={navigateToHome}>
            <ArrowLeft size={16} />
            <span>← Giveaway Home</span>
          </button>
          <span className="giveaway-id-tag">ID: {currentGiveawayData.id} • {prize.position}</span>
        </div>
      </div>

      <div className="section-container giveaway-detail-body">
        {/* Top 2-Column Hero */}
        <div className="detail-hero-grid">
          {/* Left Column: Visual Asset Display */}
          <div className={`detail-visual-card ${prize.color}`}>
            <div className="visual-top-badge">
              <span className="rank-badge">{prize.position}</span>
              <span className="value-badge">{prize.value} Value</span>
            </div>

            <div className="detail-img-stage">
              <img src={prize.image} alt={prize.name} className="detail-hero-img" />
            </div>

            <div className="visual-bottom-info">
              <div className="v-stat">
                <Trophy size={14} />
                <span>{prize.winnerCount} Certified Winner{prize.winnerCount > 1 ? "s" : ""}</span>
              </div>
              <div className="v-stat">
                <Users size={14} />
                <span>{prize.participants} Participants</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Information & Balance Verification Card */}
          <div className="detail-info-card">
            <div className="detail-header-tags">
              <span className="hero-kicker">✦ EXCLUSIVE GIVEAWAY</span>
              <div className={`status-pill small ${giveawayStatus.toLowerCase()}`}>
                <span className="status-dot" />
                <span>{giveawayStatus === "ACTIVE" ? "GIVEAWAY LIVE" : giveawayStatus}</span>
              </div>
            </div>

            <h1 className="detail-title">{prize.name}</h1>
            <p className="detail-spec-line">{prize.spec}</p>
            <p className="detail-short-desc">{prize.shortDesc}</p>

            {/* Countdown bar */}
            <div className="detail-timer-bar">
              <div className="timer-icon-wrap">
                <Clock size={16} />
              </div>
              <div className="timer-body">
                <span className="timer-sub">Draw Ends In:</span>
                <strong>{timer.days} Days : {timer.hours} Hours : {timer.minutes} Mins : {timer.seconds} Secs</strong>
              </div>
            </div>

            {/* Joining Fee & Balance Verification Card */}
            <div className="entry-balance-verification-card">
              <div className="verification-row">
                <div className="req-col">
                  <span className="row-kicker">ENTRY FEE</span>
                  <div className="fee-display">
                    <Zap size={20} className="fee-icon" />
                    <strong>{prize.entryFee} {prize.currency}</strong>
                  </div>
                </div>

                <div className="balance-col">
                  <span className="row-kicker">YOUR {prize.currency} BALANCE</span>
                  <strong className="user-bal-display">
                    {currentUser.isLoggedIn ? `${currentBalance.toLocaleString()} ${prize.currency}` : "Login to view"}
                  </strong>
                </div>
              </div>

              {/* Eligibility Message Box */}
              {currentUser.isLoggedIn && (
                <div className={`balance-status-box ${isSufficient ? "eligible" : "insufficient"}`}>
                  {isSufficient ? (
                    <>
                      <CheckCircle2 size={16} className="status-ico green" />
                      <span>✓ You have enough {prize.currency} balance to participate.</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle size={16} className="status-ico amber" />
                      <span>⚠️ Insufficient balance! You need {deficit} more {prize.currency} to participate.</span>
                    </>
                  )}
                </div>
              )}

              {/* Dynamic Action Button */}
              {!currentUser.isLoggedIn ? (
                <button className="primary-join-btn" onClick={() => setIsLoginModalOpen(true)}>
                  <span>Sign In to Participate</span>
                </button>
              ) : isJoined ? (
                <div className="already-joined-pill">
                  <CheckCircle2 size={18} />
                  <span>✓ You're Already Participating in this Draw</span>
                </div>
              ) : giveawayStatus === "ENDED" ? (
                <button className="primary-join-btn ended" onClick={navigateToHome}>
                  <span>Giveaway Ended · View Winners</span>
                </button>
              ) : isSufficient ? (
                <button className="primary-join-btn" onClick={handleJoinClick}>
                  <span>Join Giveaway – {prize.entryFee} {prize.currency}</span>
                </button>
              ) : (
                <button
                  className="primary-join-btn earn-btn"
                  onClick={() => {
                    const el = document.getElementById("how-to-participate-details");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <span>Earn More {prize.currency} (Need {deficit}) →</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Section: About the Prize Details */}
        <section className="detail-section-block">
          <h2 className="block-heading">About the Prize</h2>
          <p className="block-intro">{prize.about}</p>

          <div className="specs-feature-grid">
            {prize.highlights.map((item, idx) => (
              <div className="spec-item-card" key={idx}>
                <CheckCircle2 size={16} className="spec-check-icon" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section: How This Giveaway Works */}
        <section className="detail-section-block" id="how-to-participate-details">
          <h2 className="block-heading">How This Giveaway Works</h2>
          <div className="detail-timeline-strip">
            <div className="step-pill">
              <span className="step-no">01</span>
              <div>
                <strong>Review Prize</strong>
                <small>Check specs & rules</small>
              </div>
            </div>
            <div className="step-pill">
              <span className="step-no">02</span>
              <div>
                <strong>Check Balance</strong>
                <small>Verify {prize.entryFee} {prize.currency}</small>
              </div>
            </div>
            <div className="step-pill">
              <span className="step-no">03</span>
              <div>
                <strong>Pay Entry Fee</strong>
                <small>Atomic deduction</small>
              </div>
            </div>
            <div className="step-pill">
              <span className="step-no">04</span>
              <div>
                <strong>Draw Closes</strong>
                <small>Countdown hits 0</small>
              </div>
            </div>
            <div className="step-pill">
              <span className="step-no">05</span>
              <div>
                <strong>Winner Claims</strong>
                <small>7 days fulfillment</small>
              </div>
            </div>
          </div>
        </section>

        {/* Expandable Terms & Conditions */}
        <div className="expandable-panel">
          <button className="expandable-header-btn" onClick={() => setOpenTerms(!openTerms)}>
            <div className="exp-title-wrap">
              <ShieldCheck size={18} className="exp-icon" />
              <strong>Official Terms & Conditions</strong>
            </div>
            {openTerms ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          {openTerms && (
            <div className="expandable-body">
              <p>
                <strong>Eligibility:</strong> Open to verified VELOOP account holders. One participation per user
                for this giveaway event.
              </p>
              <p>
                <strong>Entry Fee:</strong> {prize.entryFee} {prize.currency} is atomically deducted from your account.
                Confirmed entries are permanent for this event cycle.
              </p>
              <p>
                <strong>Winner Selection:</strong> The {prize.winnerCount} certified winner(s) will be selected automatically
                at the conclusion of the countdown timer using a cryptographically randomized audit algorithm.
              </p>
              <p>
                <strong>Prize Claim Policy:</strong> Physical prizes will be delivered directly to the winner's verified residential
                address with tracking. Digital cards are dispatched immediately via email. Unclaimed prizes after 7 days roll over
                to the community reserve pool.
              </p>
            </div>
          )}
        </div>

        {/* Expandable Important Information */}
        <div className="expandable-panel">
          <button className="expandable-header-btn" onClick={() => setOpenInfo(!openInfo)}>
            <div className="exp-title-wrap">
              <HelpCircle size={18} className="exp-icon" />
              <strong>Important Participation & Anti-Fraud Information</strong>
            </div>
            {openInfo ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          {openInfo && (
            <div className="expandable-body">
              <p>
                VELOOP enforces rigorous bot detection, IP rate-limiting, and device fingerprinting to prevent automated
                or duplicate participation attempts. Any detected violation will result in disqualification.
              </p>
              <p>
                All giveaways are backed by authentic inventory procured directly from authorized regional distributors.
                VELOOP covers all shipping and import charges.
              </p>
            </div>
          )}
        </div>

        {/* Bottom Back Button */}
        <div className="bottom-nav-row">
          <button className="back-to-home-btn" onClick={navigateToHome}>
            <ArrowLeft size={16} />
            <span>Return to All Giveaways</span>
          </button>
        </div>
      </div>
    </div>
  );
}
