import React, { useState } from "react";
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
  Star,
  Sparkles,
  Zap,
  Layers
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

  const [activeCategory, setActiveCategory] = useState("ALL");
  const [showAllCards, setShowAllCards] = useState(true);

  // All 12 prizes
  const allPrizes = currentGiveawayData.prizes;

  // Filter based on active category
  const filteredPrizes = allPrizes.filter((prize) => {
    if (activeCategory === "ALL") return true;
    if (activeCategory === "tech") return prize.category === "tech";
    if (activeCategory === "vouchers") return prize.category === "vouchers";
    if (activeCategory === "instant") return prize.category === "instant" || prize.category === "tokens";
    return true;
  });

  const displayedPrizes = showAllCards ? filteredPrizes : filteredPrizes.slice(0, 4);

  const handleJoinClick = (e, prize) => {
    e.stopPropagation();
    if (!currentUser.isLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }
    setConfirmPrize(prize);
  };

  const categories = [
    { id: "ALL", label: "All Giveaways", count: allPrizes.length, icon: <Layers size={14} /> },
    { id: "tech", label: "Tech & Gadgets", count: allPrizes.filter(p => p.category === "tech").length, icon: <Sparkles size={14} /> },
    { id: "vouchers", label: "Gift Cards", count: allPrizes.filter(p => p.category === "vouchers").length, icon: <Gift size={14} /> },
    { id: "instant", label: "UPI & Tokens", count: allPrizes.filter(p => p.category === "instant" || p.category === "tokens").length, icon: <Zap size={14} /> }
  ];

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
          {/* LEFT COLUMN: Featured Giveaways Cards Grid               */}
          {/* ======================================================== */}
          <div className="giveaways-left-col">
            <div className="col-header-bar">
              <div className="col-header-title-wrap">
                <h2 className="featured-section-title">
                  <Star size={20} className="star-gold-icon" />
                  <span>Featured Giveaways</span>
                  <span className="giveaways-count-badge">{displayedPrizes.length} Active</span>
                </h2>
                <p className="featured-section-subtitle">
                  Participate in our certified giveaways, complete simple tasks and win amazing rewards.
                </p>
              </div>

              <button
                className="view-all-giveaways-btn"
                onClick={() => {
                  if (activeCategory !== "ALL") setActiveCategory("ALL");
                  setShowAllCards(!showAllCards);
                }}
              >
                <span>{showAllCards ? "Show Top 4" : `View All (${allPrizes.length})`}</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Filter Category Tabs */}
            <div className="giveaways-cat-tabs-row" role="tablist" aria-label="Giveaway Categories">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`cat-tab-btn ${activeCategory === cat.id ? "active" : ""}`}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setShowAllCards(true);
                  }}
                  role="tab"
                  aria-selected={activeCategory === cat.id}
                  title={cat.label}
                >
                  {cat.icon}
                  <span className="cat-label-text">{cat.label}</span>
                  <span className="cat-count-pill">{cat.count}</span>
                </button>
              ))}
            </div>

            {/* Responsive Cards Grid: Desktop 3-4 cards/row, Tablet 2-3 cards/row, Mobile 2 cards/row */}
            <div className="giveaways-cards-responsive-grid">
              {displayedPrizes.map((prize) => {
                const isJoined = joinedPrizes.has(prize.id);

                return (
                  <article
                    key={prize.id}
                    className={`exact-prize-card ${prize.color} ${isJoined ? "is-joined" : ""}`}
                    onClick={() => navigateToGiveaway(prize.slug)}
                  >
                    {/* Top Prize Position & Fee Badge */}
                    <div className="card-top-tag-wrap">
                      <span className={`prize-pos-tag ${prize.color}`}>
                        {prize.position}
                      </span>
                      <span className="prize-entry-fee-tag" title={`Entry Fee: ${prize.entryFee} ${prize.currency}`}>
                        <Zap size={10} />
                        <span>{prize.entryFee} {prize.currency}</span>
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
                      <div className="title-value-row">
                        <h3 className="exact-prize-title" title={prize.name}>{prize.name}</h3>
                        <span className="prize-inr-value">{prize.value}</span>
                      </div>
                      <p className="exact-prize-spec" title={prize.spec}>{prize.spec}</p>

                      <div className="exact-meta-bar">
                        <div className="meta-cell">
                          <Users size={11} className="meta-icon" />
                          <span>{prize.participants}</span>
                        </div>
                        <div className="meta-cell">
                          <Clock size={11} className="meta-icon" />
                          <span>
                            {prize.daysLeft ? `${prize.daysLeft}d left` : "Ending soon"}
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
                            <CheckCircle2 size={13} />
                            <span>Participating</span>
                          </>
                        ) : giveawayStatus === "ENDED" ? (
                          <>
                            <span>Draw Result</span>
                            <ArrowRight size={13} />
                          </>
                        ) : (
                          <>
                            <span>Join Now</span>
                            <ArrowRight size={13} />
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
