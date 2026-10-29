import React from "react";
import { useGiveaway } from "../../context/GiveawayContext";
import { currentGiveawayData } from "../../data/giveawayData";
import {
  Users,
  Clock,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  UserCheck,
  CheckSquare,
  Gift,
  Trophy,
  Star
} from "lucide-react";
import "./MainGiveawaySection.css";

export default function MainGiveawaySection() {
  const {
    navigateToGiveaway,
    joinedPrizes,
    giveawayStatus,
    setIsRulesModalOpen,
    setConfirmPrize,
    setIsLoginModalOpen,
    currentUser
  } = useGiveaway();

  // Take the primary 4 featured prizes matching Ref_02.jpeg
  const featuredPrizes = currentGiveawayData.prizes.slice(0, 4);

  const handleJoinClick = (e, prize) => {
    e.stopPropagation();
    if (!currentUser.isLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }
    setConfirmPrize(prize);
  };

  const steps = [
    {
      num: 1,
      color: "purple",
      icon: <UserCheck size={18} />,
      title: "1. Sign Up / Login",
      desc: "Create your account or login to get started."
    },
    {
      num: 2,
      color: "blue",
      icon: <CheckSquare size={18} />,
      title: "2. Complete Tasks",
      desc: "Complete simple tasks and earn more entries."
    },
    {
      num: 3,
      color: "green",
      icon: <Gift size={18} />,
      title: "3. Get Entries",
      desc: "Each task gives you entries for the giveaway."
    },
    {
      num: 4,
      color: "orange",
      icon: <Trophy size={18} />,
      title: "4. Win Rewards",
      desc: "Winners are selected randomly after the giveaway ends."
    }
  ];

  return (
    <section className="main-giveaways-split-section" id="featured-giveaways">
      <div className="section-container">
        <div className="split-layout-grid">
          {/* ======================================================== */}
          {/* LEFT COLUMN: Featured Giveaways (4 Cards matching Ref_02) */}
          {/* ======================================================== */}
          <div className="giveaways-left-col">
            <div className="col-header-bar">
              <div className="col-header-title-wrap">
                <h2 className="featured-section-title">
                  <Star size={20} className="star-gold-icon" />
                  <span>Featured Giveaways</span>
                </h2>
                <p className="featured-section-subtitle">
                  Participate in our handpicked giveaways and win exciting rewards.
                </p>
              </div>

              <button
                className="view-all-giveaways-btn"
                onClick={() => {
                  const el = document.getElementById("featured-giveaways");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span>View All Giveaways</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* 4 Cards Grid */}
            <div className="four-cards-row-grid">
              {featuredPrizes.map((prize) => {
                const isJoined = joinedPrizes.has(prize.id);

                return (
                  <article
                    key={prize.id}
                    className={`exact-prize-card ${prize.color} ${isJoined ? "is-joined" : ""}`}
                    onClick={() => navigateToGiveaway(prize.slug)}
                  >
                    {/* Top Prize Position Badge */}
                    <div className="card-top-tag-wrap">
                      <span className={`prize-pos-tag ${prize.color}`}>
                        {prize.position}
                      </span>
                    </div>

                    {/* Image on Glow Pedestal */}
                    <div className="prize-pedestal-box">
                      <div className={`pedestal-glow-ring ${prize.color}`} />
                      <img
                        src={prize.image}
                        alt={prize.name}
                        className="prize-center-img"
                        loading="lazy"
                      />
                    </div>

                    {/* Content */}
                    <div className="card-info-content">
                      <h3 className="exact-prize-title">{prize.name}</h3>
                      <p className="exact-prize-spec">{prize.spec}</p>

                      <div className="exact-meta-bar">
                        <div className="meta-cell">
                          <Users size={12} className="meta-icon" />
                          <span>{prize.participants} Participants</span>
                        </div>
                        <div className="meta-cell">
                          <Clock size={12} className="meta-icon" />
                          <span>
                            {prize.slug === "iphone-15-pro" && "12d : 08h : 45m left"}
                            {prize.slug === "apple-watch-series-9" && "9d : 06h : 30m left"}
                            {prize.slug === "airpods-pro-2" && "7d : 08h : 20m left"}
                            {prize.slug === "amazon-2000" && "5d : 02h : 15m left"}
                            {!["iphone-15-pro", "apple-watch-series-9", "airpods-pro-2", "amazon-2000"].includes(prize.slug) && `${prize.daysLeft}d left`}
                          </span>
                        </div>
                      </div>

                      {/* Vibrant CTA Button */}
                      <button
                        className={`join-now-cta-btn ${prize.color} ${isJoined ? "joined" : ""}`}
                        onClick={(e) => handleJoinClick(e, prize)}
                      >
                        {isJoined ? (
                          <>
                            <CheckCircle2 size={15} />
                            <span>Participating</span>
                          </>
                        ) : giveawayStatus === "ENDED" ? (
                          <>
                            <span>Draw Result</span>
                            <ArrowRight size={14} />
                          </>
                        ) : (
                          <>
                            <span>Join Now</span>
                            <ArrowRight size={14} />
                          </>
                        )}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* ======================================================== */}
          {/* RIGHT COLUMN: How to Participate? (Matching Ref_02)      */}
          {/* ======================================================== */}
          <div className="how-to-right-col" id="how-to-participate">
            <div className="how-card-box">
              <div className="how-header-row">
                <span className="how-rocket-emoji">🚀</span>
                <div>
                  <h3 className="how-main-title">How to Participate?</h3>
                  <p className="how-sub-title">Follow these simple steps to join and win.</p>
                </div>
              </div>

              {/* 4 Steps Timeline */}
              <div className="how-steps-timeline">
                {steps.map((step, idx) => (
                  <div key={step.num} className="timeline-step-row">
                    <div className="step-bullet-col">
                      <div className={`step-circle-icon ${step.color}`}>
                        {step.icon}
                      </div>
                      {idx < steps.length - 1 && <div className="step-line-connector" />}
                    </div>

                    <div className="step-text-col">
                      <h4 className="step-title-text">{step.title}</h4>
                      <p className="step-desc-text">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* View Rules Button */}
              <button
                className="view-rules-action-btn"
                onClick={() => setIsRulesModalOpen(true)}
              >
                <BookOpen size={16} />
                <span>View Rules & Guidelines</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
