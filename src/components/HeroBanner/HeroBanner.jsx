import React from "react";
import { useGiveaway } from "../../context/GiveawayContext";
import { Gift } from "lucide-react";
import "./HeroBanner.css";

export default function HeroBanner() {
  const { setIsGiveawayCodeModalOpen } = useGiveaway();

  return (
    <section className="veloop-hero-banner" id="hero-section">
      <div className="hero-radial-glow top-left" />
      <div className="hero-radial-glow bottom-right" />

      {/* Decorative 3D floating gift boxes with glowing pedestals from Ref_02.jpeg */}
      <div className="floating-hero-box left-box">
        <div className="pedestal-podium-wrap">
          <div className="podium-beam podium-beam-left" />
          <div className="podium-ellipse podium-ellipse-outer" />
          <div className="podium-ellipse podium-ellipse-inner" />
        </div>
        <img
          src="/assets/gift box 1.png"
          alt="Glowing purple VELOOP reward gift box"
          className="hero-gift-img left-float"
        />
        {/* Floating Sparks */}
        <span className="hero-spark spark-1" />
        <span className="hero-spark spark-2" />
        <span className="hero-spark spark-3" />
      </div>

      <div className="floating-hero-box right-box">
        <div className="podium-podium-wrap">
          <div className="podium-beam podium-beam-right" />
          <div className="podium-ellipse podium-ellipse-outer" />
          <div className="podium-ellipse podium-ellipse-inner" />
        </div>
        <img
          src="/assets/gift box.png"
          alt="Exclusive gold ribbon VELOOP reward gift box"
          className="hero-gift-img right-float"
        />
        {/* Floating Sparks */}
        <span className="hero-spark spark-4" />
        <span className="hero-spark spark-5" />
        <span className="hero-spark spark-6" />
      </div>

      <div className="hero-banner-content">
        {/* Top Badges Row: EXCLUSIVE GIVEAWAYS Pill + Giveaway Code Button shifted side-by-side */}
        <div className="hero-top-badges-row">
          <div className="hero-badge-wrap">
            <Gift size={14} className="hero-badge-gift-icon" />
            <span className="hero-badge-text">EXCLUSIVE GIVEAWAYS</span>
          </div>

          <button
            className="hero-giveaway-code-btn"
            onClick={() => setIsGiveawayCodeModalOpen(true)}
            title="Redeem Promo / Giveaway Code"
          >
            <Gift size={14} />
            <span>Giveaway Code</span>
          </button>
        </div>

        {/* Exact Title from Ref_02.jpeg: Giveaway Section */}
        <h1 className="hero-main-title">
          Giveaway <span className="gradient-text">Section</span>
        </h1>

        {/* Exact Subtitle from Ref_02.jpeg */}
        <p className="hero-subtitle">
          Join exciting giveaways, complete simple tasks and<br />
          win amazing rewards from VELoop Rewards.
        </p>

        {/* Tagline kicker from Ref_02.jpeg */}
        <p className="hero-kicker-tagline">
          ✦ More participation, more chances to win! ✦
        </p>
      </div>
    </section>
  );
}

