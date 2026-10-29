import React from "react";
import { useGiveaway } from "../../context/GiveawayContext";
import { Gift, ShieldCheck, Zap, ArrowRight, Sparkles } from "lucide-react";
import "./ExclusiveRewardsBanner.css";

export default function ExclusiveRewardsBanner() {
  const { setIsGiveawayCodeModalOpen } = useGiveaway();

  const handleEnterGiveaway = () => {
    // Open the promo code redemption modal or scroll down to featured prizes
    const el = document.getElementById("featured-giveaways");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="exclusive-banner-section" aria-label="Exclusive Giveaway Rewards Banner">
      <div className="section-container">
        <div className="exclusive-reward-card">
          {/* Background Ambient Glows */}
          <div className="card-ambient-glow glow-left" />
          <div className="card-ambient-glow glow-right" />

          {/* Top-Left Giveaway Code Button from Ref_01.jpeg */}
          <button
            className="exclusive-code-badge-btn"
            onClick={() => setIsGiveawayCodeModalOpen(true)}
            title="Redeem your exclusive giveaway promo code"
          >
            <Gift size={16} className="gift-code-icon" />
            <span>Giveaway Code</span>
          </button>

          {/* Left: 3D Purple Gift Box on Glowing Pedestal */}
          <div className="exclusive-art-col left-art">
            <div className="pedestal-neon-glow" />
            <img
              src="/assets/gift box.png"
              alt="Exclusive VELOOP Gift Box with gold ribbon"
              className="floating-gift-box-img"
            />
            {/* Confetti Sparkles */}
            <span className="confetti-dot dot-1" />
            <span className="confetti-dot dot-2" />
            <span className="confetti-dot dot-3" />
            <span className="confetti-dot dot-4" />
          </div>

          {/* Center: Main Banner Content matching Ref_01.jpeg */}
          <div className="exclusive-center-content">
            <div className="kicker-sparkle-row">
              <Sparkles size={14} className="sparkle-star" />
              <span className="kicker-text">Unlock Amazing Rewards</span>
              <Sparkles size={14} className="sparkle-star" />
            </div>

            <h2 className="exclusive-headline">
              Exclusive Giveaway <span className="headline-gradient">Rewards</span>
            </h2>

            <p className="exclusive-description">
              Enter special giveaway codes and unlock exciting VEs rewards instantly.
            </p>

            {/* 3 Trust Badges from Ref_01.jpeg */}
            <div className="exclusive-badges-row">
              <div className="exclusive-badge-item">
                <div className="badge-icon-box purple">
                  <ShieldCheck size={16} />
                </div>
                <div className="badge-text-col">
                  <strong>100% Safe</strong>
                  <small>Secure & Trusted</small>
                </div>
              </div>

              <div className="exclusive-badge-item">
                <div className="badge-icon-box yellow">
                  <Zap size={16} />
                </div>
                <div className="badge-text-col">
                  <strong>Instant Rewards</strong>
                  <small>Get Rewards Fast</small>
                </div>
              </div>

              <div className="exclusive-badge-item">
                <div className="badge-icon-box gold">
                  <Gift size={16} />
                </div>
                <div className="badge-text-col">
                  <strong>Exclusive VEs</strong>
                  <small>Special for You</small>
                </div>
              </div>
            </div>

            {/* Main CTA Button from Ref_01.jpeg */}
            <div className="exclusive-cta-wrap">
              <button className="exclusive-enter-cta" onClick={handleEnterGiveaway}>
                <span>Enter Giveaway</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* Right: Hand Holding Ticket from Ref_01.jpeg */}
          <div className="exclusive-art-col right-art">
            <img
              src="/assets/giveaway card.png"
              alt="Hand holding gold & black VELOOP giveaway ticket"
              className="floating-ticket-hand-img"
            />
            {/* Confetti Ribbon Sprinkles */}
            <span className="ribbon-sparkle ribbon-1" />
            <span className="ribbon-sparkle ribbon-2" />
            <span className="ribbon-sparkle ribbon-3" />
          </div>
        </div>
      </div>
    </section>
  );
}
