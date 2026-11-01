import React, { useState, useEffect, useRef } from "react";
import { useGiveaway } from "../../context/GiveawayContext";
import { currentGiveawayData } from "../../data/giveawayData";
import {
  Flame,
  ArrowRight,
  Play,
  Gift,
  Users,
  Trophy,
  ShieldCheck,
  Headphones,
  CreditCard,
  Coins,
  Gamepad2,
  MoreHorizontal,
  Star,
  Cpu,
  HardDrive,
  Shield,
  Radio,
  Heart,
  UserCheck,
  CheckCircle2,
  HelpCircle,
  Plus,
  Minus,
  Crown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Sparkles,
  Zap,
  Check
} from "lucide-react";
import "./GiveawayHome.css";

export default function GiveawayHome() {
  const {
    currentUser,
    joinedPrizes,
    setConfirmPrize,
    setIsLoginModalOpen,
    setIsRulesModalOpen,
    navigateToGiveaway,
    navigateToRoute,
    showToast
  } = useGiveaway();

  // Active Category State: ALL | tech | vouchers | instant | gaming
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [showAllPrizes, setShowAllPrizes] = useState(false);

  // Likes state for reward cards
  const [likedCardIds, setLikedCardIds] = useState(new Set());

  // Horizontal Carousel Reference & Navigation State
  const carouselRef = useRef(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Update carousel scroll buttons and active slide index
  const handleCarouselScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 15);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15);

      const cardWidth = 296; // card (280) + gap (16)
      const idx = Math.round(scrollLeft / cardWidth);
      setCarouselIndex(Math.min(Math.max(0, idx), displayedCards.length - 1));
    }
  };

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setTimeout(handleCarouselScroll, 350);
    }
  };

  const scrollToIndex = (idx) => {
    if (carouselRef.current) {
      const cards = carouselRef.current.children;
      if (cards && cards[idx]) {
        cards[idx].scrollIntoView({
          behavior: "smooth",
          inline: "start",
          block: "nearest"
        });
        setCarouselIndex(idx);
        setTimeout(handleCarouselScroll, 350);
      }
    }
  };

  // FAQ Accordion Open State
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Live Countdown Timer (12 Days, 18 Hours, 44 Minutes, 32 Seconds)
  const [countdown, setCountdown] = useState({
    days: 12,
    hours: 18,
    minutes: 44,
    seconds: 32
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleLike = (e, prizeId) => {
    e.stopPropagation();
    setLikedCardIds((prev) => {
      const next = new Set(prev);
      if (next.has(prizeId)) {
        next.delete(prizeId);
        showToast("Removed from your favorites", "info");
      } else {
        next.add(prizeId);
        showToast("Added to your favorites!", "success");
      }
      return next;
    });
  };

  const handleJoinClick = (e, prize) => {
    e.stopPropagation();
    if (!currentUser.isLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }
    setConfirmPrize(prize);
  };

  // Category filter tabs matching media_1793407830512_ba630f92.jpg
  const categories = [
    { id: "ALL", label: "All Giveaways", sublabel: "12 Active", icon: <Gift size={16} /> },
    { id: "tech", label: "Tech & Gadgets", sublabel: "4 Giveaways", icon: <Headphones size={16} /> },
    { id: "vouchers", label: "Gift Cards", sublabel: "5 Giveaways", icon: <CreditCard size={16} /> },
    { id: "tokens", label: "UPI & Tokens", sublabel: "3 Giveaways", icon: <Coins size={16} /> },
    { id: "gaming", label: "Gaming", sublabel: "2 Giveaways", icon: <Gamepad2 size={16} /> },
    { id: "more", label: "More", sublabel: "Explore", icon: <MoreHorizontal size={16} /> }
  ];

  // All prizes from giveawayData
  const allPrizes = currentGiveawayData.prizes;

  // Filter based on active category
  const filteredPrizes = allPrizes.filter((prize) => {
    if (activeCategory === "ALL" || activeCategory === "more") return true;
    if (activeCategory === "tech") return prize.category === "tech";
    if (activeCategory === "vouchers") return prize.category === "vouchers";
    if (activeCategory === "tokens") return prize.category === "tokens" || prize.category === "instant";
    if (activeCategory === "gaming") return prize.category === "gaming" || prize.slug.includes("ps5");
    return true;
  });

  // Display top 6 prizes matching reference image grid, or all when expanded
  const displayedCards = showAllPrizes ? filteredPrizes : filteredPrizes.slice(0, 6);

  // Reset carousel scroll when category or view mode changes
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
      setCarouselIndex(0);
      setCanScrollLeft(false);
      setCanScrollRight(true);
    }
  }, [activeCategory, showAllPrizes]);

  // Recent winners data matching media_1793407830512_ba630f92.jpg
  const recentWinners = [
    {
      id: "w1",
      name: "Rahul S.",
      prize: "Won iPhone 15",
      time: "2 days ago",
      image: "/assets/iphone.png"
    },
    {
      id: "w2",
      name: "Priya M.",
      prize: "Won Apple Watch",
      time: "1 week ago",
      image: "/assets/watch.png"
    },
    {
      id: "w3",
      name: "Aman K.",
      prize: "Won AirPods Pro",
      time: "2 weeks ago",
      image: "/assets/airpod.png"
    },
    {
      id: "w4",
      name: "Sneha T.",
      prize: "Won Amazon Gift Card",
      time: "3 weeks ago",
      image: "/assets/amazon card.png"
    }
  ];

  // FAQs data matching media_1793407830512_ba630f92.jpg
  const faqs = [
    {
      q: "How do I participate in a giveaway?",
      a: "Select your desired giveaway, complete simple tasks or use your VEs/SVEs entries to register. Each entry increases your winning chances!"
    },
    {
      q: "Are the rewards real?",
      a: "Yes! 100% of our rewards are authentic and provably fair. Winners receive official retail brand-sealed products or instant verified gift codes."
    },
    {
      q: "Is it free to join?",
      a: "Absolutely! You can earn VEs and Super VEs for free by completing daily check-ins, app trials, and community engagement tasks."
    },
    {
      q: "How are winners selected?",
      a: "Winners are drawn using cryptographically verifiable random seeds on our smart lottery engine once the countdown expires."
    }
  ];

  return (
    <div className="giveaway-dashboard-layout">
      <div className="dashboard-main-container">
        {/* ======================================================== */}
        {/* LEFT COLUMN: HERO, STATS, CATEGORIES, FEATURED, HOW, TRUST*/}
        {/* ======================================================== */}
        <section className="dashboard-left-col" aria-label="Main Giveaway Showcase">
          {/* 1. HERO SHOWCASE CARD */}
          <div className="hero-showcase-card">
            <div className="hero-card-left">
              <div className="hero-exclusive-badge">
                <Flame size={13} className="flame-icon" />
                <span>EXCLUSIVE GIVEAWAYS</span>
              </div>

              <h1 className="hero-win-headline">
                Win Amazing Rewards with <span className="pink-gradient-text">VELOOP Rewards</span>
              </h1>

              <p className="hero-win-description">
                Complete simple tasks, earn entries and get a chance to win premium rewards like iPhone, Apple Watch, AirPods, Gift Cards and more.
              </p>

              <div className="hero-actions-row">
                <button
                  className="explore-giveaways-cta-btn"
                  onClick={() => {
                    const el = document.getElementById("active-giveaways-section");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <span>Explore Giveaways</span>
                  <ArrowRight size={15} />
                </button>

                <button
                  className="how-it-works-pill-btn"
                  onClick={() => {
                    const el = document.getElementById("how-it-works-section");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <Play size={13} fill="currentColor" />
                  <span>How It Works</span>
                </button>
              </div>
            </div>

            {/* Right: 3D Visual Cluster with Glowing Pedestal */}
            <div className="hero-card-right-3d" aria-hidden="true">
              <div className="win-badge-tilted">
                <span>WIN iPHONE 15 PRO</span>
              </div>

              <div className="hero-pedestal-stage">
                <div className="podium-neon-circle" />
                <div className="podium-radial-glow" />

                {/* iPhone 15 Pro */}
                <img
                  src="/assets/iphone.png"
                  alt="iPhone 15 Pro"
                  className="hero-dev-img dev-iphone"
                />

                {/* Apple Watch */}
                <img
                  src="/assets/watch.png"
                  alt="Apple Watch Series 9"
                  className="hero-dev-img dev-watch"
                />

                {/* AirPods Pro */}
                <img
                  src="/assets/airpod.png"
                  alt="AirPods Pro 2"
                  className="hero-dev-img dev-airpods"
                />

                {/* 3D Gift Box floating on left */}
                <img
                  src="/assets/gift box.png"
                  alt="Gift Box"
                  className="floating-hero-gift gift-left"
                />

                {/* 3D Gift Box floating on right */}
                <img
                  src="/assets/gift box 1.png"
                  alt="Gift Box"
                  className="floating-hero-gift gift-right"
                />

                {/* Confetti & Particle Sparks */}
                <span className="hero-sparkle-dot sp-1" />
                <span className="hero-sparkle-dot sp-2" />
                <span className="hero-sparkle-dot sp-3" />
                <span className="hero-sparkle-dot sp-4" />
              </div>

              {/* Real Rewards Badge on right */}
              <div className="real-rewards-floating-badge">
                <Crown size={15} className="crown-gold-icon" />
                <div className="real-rewards-text">
                  <strong>Real Rewards</strong>
                  <span>Real Winners</span>
                  <small>Trusted Platform</small>
                </div>
              </div>
            </div>
          </div>

          {/* 2. STATS ROW BAR */}
          <div className="stats-glass-row" aria-label="Giveaway Platform Statistics">
            <div className="stat-glass-item">
              <div className="stat-icon-square purple">
                <Gift size={18} />
              </div>
              <div className="stat-number-col">
                <strong>24</strong>
                <span>Active Giveaways</span>
              </div>
            </div>

            <div className="stat-glass-item">
              <div className="stat-icon-square blue">
                <Users size={18} />
              </div>
              <div className="stat-number-col">
                <strong>8.5K+</strong>
                <span>Total Participants</span>
              </div>
            </div>

            <div className="stat-glass-item">
              <div className="stat-icon-square gold">
                <Trophy size={18} />
              </div>
              <div className="stat-number-col">
                <strong>1.2K+</strong>
                <span>Rewards Given</span>
              </div>
            </div>

            <div className="stat-glass-item">
              <div className="stat-icon-square green">
                <ShieldCheck size={18} />
              </div>
              <div className="stat-number-col">
                <strong>100%</strong>
                <span>Secure & Trusted</span>
              </div>
            </div>
          </div>

          {/* 3. CATEGORY FILTER TABS BAR */}
          <div className="category-filter-tabs-bar" role="tablist" aria-label="Giveaway Categories">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  className={`category-tab-btn ${isActive ? "active" : ""}`}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    if (cat.id === "more") setShowAllPrizes(!showAllPrizes);
                  }}
                  role="tab"
                  aria-selected={isActive}
                >
                  <span className="cat-icon-wrap">{cat.icon}</span>
                  <div className="cat-text-wrap">
                    <span className="cat-primary-title">{cat.label}</span>
                    <span className="cat-count-sub">{cat.sublabel}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* 4. FEATURED GIVEAWAY SPOTLIGHT CARD */}
          <div className="featured-spotlight-card" id="featured-giveaway-spotlight">
            <div className="spotlight-header-top">
              <span className="featured-gold-tag">
                <Star size={12} fill="currentColor" />
                <span>FEATURED GIVEAWAY</span>
              </span>
            </div>

            <div className="spotlight-body-layout">
              {/* Left Details */}
              <div className="spotlight-left-details">
                <h2 className="spotlight-model-title">iPhone 15 Pro</h2>
                <p className="spotlight-model-sub">Latest iPhone 15 Pro (128GB)</p>

                {/* Specs Pills */}
                <div className="spotlight-specs-pills">
                  <span className="spec-pill">
                    <Cpu size={12} /> A17 Pro Chip
                  </span>
                  <span className="spec-pill">
                    <HardDrive size={12} /> 128GB Storage
                  </span>
                  <span className="spec-pill">
                    <Shield size={12} /> Titanium Design
                  </span>
                  <span className="spec-pill">
                    <Radio size={12} /> 5G Ready
                  </span>
                </div>

                {/* Countdown Timer Row */}
                <div className="spotlight-timer-boxes-row">
                  <div className="timer-unit-box">
                    <strong>{String(countdown.days).padStart(2, "0")}</strong>
                    <span>Days</span>
                  </div>
                  <div className="timer-unit-box">
                    <strong>{String(countdown.hours).padStart(2, "0")}</strong>
                    <span>Hours</span>
                  </div>
                  <div className="timer-unit-box">
                    <strong>{String(countdown.minutes).padStart(2, "0")}</strong>
                    <span>Minutes</span>
                  </div>
                  <div className="timer-unit-box">
                    <strong>{String(countdown.seconds).padStart(2, "0")}</strong>
                    <span>Seconds</span>
                  </div>
                </div>

                {/* Entries Progress Bar */}
                <div className="spotlight-entries-progress-wrap">
                  <div className="progress-labels-row">
                    <span>12.3K / 25K Entries</span>
                  </div>
                  <div className="progress-bar-track">
                    <div className="progress-bar-fill" style={{ width: "49.2%" }} />
                  </div>
                </div>
              </div>

              {/* Center 3D Visual with 1st Prize Badge */}
              <div className="spotlight-center-visual">
                <div className="first-prize-gold-badge">
                  <span>1st</span>
                  <small>PRIZE</small>
                </div>
                <div className="dual-phone-composite">
                  <img
                    src="/assets/iphone.png"
                    alt="iPhone 15 Pro Titanium"
                    className="dual-phone-img phone-front"
                  />
                  <img
                    src="/assets/iphone.png"
                    alt="iPhone 15 Pro Back"
                    className="dual-phone-img phone-back"
                  />
                </div>
              </div>

              {/* Right Action Column */}
              <div className="spotlight-right-actions">
                <button
                  className="spotlight-join-btn"
                  onClick={(e) => handleJoinClick(e, allPrizes[0])}
                >
                  <span>{joinedPrizes.has(allPrizes[0].id) ? "Participating ✓" : "Join Now"}</span>
                  <ArrowRight size={15} />
                </button>

                <button
                  className="spotlight-details-btn"
                  onClick={() => navigateToGiveaway("iphone-15-pro")}
                >
                  <span>View Details</span>
                </button>

                {/* Avatars Participation Stack */}
                <div className="spotlight-social-proof">
                  <div className="stacked-avatars">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&auto=format&fit=crop&q=80" alt="user" />
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&auto=format&fit=crop&q=80" alt="user" />
                    <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=50&auto=format&fit=crop&q=80" alt="user" />
                  </div>
                  <span>12.3K people participating</span>
                </div>
              </div>
            </div>
          </div>

          {/* 5. HOW IT WORKS? SECTION */}
          <div className="how-it-works-dashboard-card" id="how-it-works-section">
            <div className="how-card-header">
              <div className="how-shield-icon">
                <ShieldCheck size={18} />
              </div>
              <div className="how-title-box">
                <h3>How It Works?</h3>
                <p>It's simple! Follow these steps and start winning amazing rewards.</p>
              </div>
            </div>

            <div className="how-four-steps-grid">
              <div className="how-step-card step-purple">
                <div className="step-circle-icon purple">
                  <UserCheck size={18} />
                </div>
                <div className="step-info">
                  <h4>Create Account</h4>
                  <p>Sign up for free</p>
                </div>
              </div>

              <div className="how-step-card step-blue">
                <div className="step-circle-icon blue">
                  <CheckCircle2 size={18} />
                </div>
                <div className="step-info">
                  <h4>Complete Tasks</h4>
                  <p>Do simple tasks</p>
                </div>
              </div>

              <div className="how-step-card step-pink">
                <div className="step-circle-icon pink">
                  <Gift size={18} />
                </div>
                <div className="step-info">
                  <h4>Earn Entries</h4>
                  <p>Get more entries</p>
                </div>
              </div>

              <div className="how-step-card step-gold">
                <div className="step-circle-icon gold">
                  <Trophy size={18} />
                </div>
                <div className="step-info">
                  <h4>Win Rewards</h4>
                  <p>Be a lucky winner!</p>
                </div>
              </div>
            </div>
          </div>

          {/* 6. TRUSTED BY THOUSANDS FOOTER BAR */}
          <div className="trusted-by-thousands-bar">
            <div className="trust-bar-header">
              <ShieldCheck size={20} className="trust-green-shield" />
              <div className="trust-header-text">
                <h3>Trusted by Thousands</h3>
                <p>A safe, secure and trusted platform for giveaways.</p>
              </div>
            </div>

            <div className="trust-four-badges-row">
              <div className="trust-badge-pill">
                <span className="dot-green" />
                <div className="trust-pill-txt">
                  <strong>100% Secure</strong>
                  <small>Your data is safe</small>
                </div>
              </div>

              <div className="trust-badge-pill">
                <span className="dot-purple" />
                <div className="trust-pill-txt">
                  <strong>Fair & Transparent</strong>
                  <small>Winners are real</small>
                </div>
              </div>

              <div className="trust-badge-pill">
                <span className="dot-gold" />
                <div className="trust-pill-txt">
                  <strong>Real Rewards</strong>
                  <small>No fake prizes</small>
                </div>
              </div>

              <div className="trust-badge-pill">
                <span className="dot-blue" />
                <div className="trust-pill-txt">
                  <strong>Global Community</strong>
                  <small>Join thousands</small>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* RIGHT COLUMN: ACTIVE GIVEAWAYS, RECENT WINNERS, CTA, FAQ */}
        {/* ======================================================== */}
        <aside className="dashboard-right-col" aria-label="Active Giveaways and Community Feed">
          {/* 1. ACTIVE GIVEAWAYS SECTION (HORIZONTAL SCROLLING CAROUSEL) */}
          <div className="active-giveaways-container" id="active-giveaways-section">
            <div className="active-section-header">
              <div className="active-header-left">
                <div className="active-title-flame">
                  <Flame size={19} className="flame-orange" />
                  <h2>Active Giveaways</h2>
                  <span className="live-pulse-badge">LIVE</span>
                </div>
                <p>Participate in exciting giveaways and win amazing rewards</p>
              </div>

              <div className="active-header-controls">
                {/* Carousel Nav Arrows */}
                <div className="carousel-nav-arrows" aria-label="Carousel navigation">
                  <button
                    className={`carousel-arrow-btn prev ${!canScrollLeft ? "disabled" : ""}`}
                    onClick={() => scrollCarousel("left")}
                    disabled={!canScrollLeft}
                    aria-label="Previous Prize Card"
                    title="Previous Prize"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    className={`carousel-arrow-btn next ${!canScrollRight ? "disabled" : ""}`}
                    onClick={() => scrollCarousel("right")}
                    disabled={!canScrollRight}
                    aria-label="Next Prize Card"
                    title="Next Prize"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>

                <button
                  className="active-view-all-btn"
                  onClick={() => setShowAllPrizes(!showAllPrizes)}
                >
                  <span>{showAllPrizes ? "Show Top 6" : "View All"}</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>

            {/* Horizontal Scrolling Carousel Track */}
            <div
              className="active-cards-carousel"
              ref={carouselRef}
              onScroll={handleCarouselScroll}
              role="region"
              aria-label="Active Giveaways Carousel"
              tabIndex={0}
            >
              {displayedCards.map((prize) => {
                const isJoined = joinedPrizes.has(prize.id);
                const isLiked = likedCardIds.has(prize.id);

                // Specific theme per prize
                const themeClass =
                  prize.slug.includes("iphone")
                    ? "theme-iphone"
                    : prize.slug.includes("watch")
                    ? "theme-watch"
                    : prize.slug.includes("airpod")
                    ? "theme-airpod"
                    : prize.slug.includes("amazon")
                    ? "theme-amazon"
                    : prize.slug.includes("flipkart")
                    ? "theme-flipkart"
                    : prize.slug.includes("ps5") || prize.slug.includes("playstation")
                    ? "theme-ps5"
                    : `theme-${prize.color || "purple"}`;

                return (
                  <article
                    key={prize.id}
                    className={`active-prize-card ${themeClass} ${isJoined ? "joined" : ""}`}
                    onClick={() => navigateToGiveaway(prize.slug)}
                  >
                    {/* Top Row: Prize Badge + Cost Chip + Heart Likes */}
                    <div className="card-top-header">
                      <div className="card-badge-group">
                        <span className={`position-badge ${prize.color || "purple"}`}>
                          {prize.slug.includes("ps5") ? (
                            <Gamepad2 size={11} />
                          ) : prize.position === "1ST PRIZE" ? (
                            <Crown size={11} />
                          ) : (
                            <Sparkles size={11} />
                          )}
                          <span>{prize.position}</span>
                        </span>

                        <span className="card-cost-chip" title={`Entry fee: ${prize.entryFee} ${prize.currency}`}>
                          <Zap size={10} className="zap-icon" />
                          <span>{prize.entryFee} {prize.currency}</span>
                        </span>
                      </div>

                      <button
                        className={`card-heart-btn ${isLiked ? "liked" : ""}`}
                        onClick={(e) => toggleLike(e, prize.id)}
                        aria-label={`Like ${prize.name}`}
                        title="Add to favorites"
                      >
                        <Heart size={12} fill={isLiked ? "#ec4899" : "none"} />
                        <span>{prize.likes || "12.3K"}</span>
                      </button>
                    </div>

                    {/* 3D Product Stage with Glowing Neon Pedestal */}
                    <div className="card-image-stage">
                      <div className={`stage-radial-glow ${prize.color || "purple"}`} />
                      <div className="stage-pedestal-ellipse" />
                      <img
                        src={prize.image}
                        alt={prize.name}
                        className="card-product-img"
                        loading="lazy"
                      />
                    </div>

                    {/* Card Content & Metrics */}
                    <div className="card-details-box">
                      <div className="card-name-val-row">
                        <h3 className="card-product-name" title={prize.name}>
                          {prize.name}
                        </h3>
                        <span className="card-inr-badge">{prize.value}</span>
                      </div>

                      <p className="card-product-spec" title={prize.spec}>
                        {prize.spec}
                      </p>

                      {/* Social Metrics: Participants & Days Left */}
                      <div className="card-meta-chips-row">
                        <span className="meta-chip participants">
                          <Users size={11} />
                          <span>{prize.participants || "8.5K"}</span>
                        </span>
                        <span className="meta-chip time-left">
                          <Clock size={11} />
                          <span>{prize.daysLeft || 12}d left</span>
                        </span>
                      </div>

                      {/* Entries Progress Bar */}
                      <div className="card-entry-progress-wrap">
                        <div className="progress-labels-mini">
                          <span className="card-entry-text">
                            {prize.entriesProgress || "12.3K / 25K Entries"}
                          </span>
                          <span className="progress-pct-text">
                            {prize.progressPercent || 45}%
                          </span>
                        </div>
                        <div className="card-progress-track">
                          <div
                            className="card-progress-fill"
                            style={{ width: `${prize.progressPercent || 45}%` }}
                          />
                        </div>
                      </div>

                      {/* Vibrant CTA Join Button */}
                      <button
                        className={`card-join-cta-btn ${isJoined ? "is-joined" : ""}`}
                        onClick={(e) => handleJoinClick(e, prize)}
                      >
                        {isJoined ? (
                          <>
                            <Check size={14} className="check-joined-icon" />
                            <span>Participating ✓</span>
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

            {/* Carousel Pagination Dots & Navigation Indicators */}
            <div className="carousel-pagination-row">
              <div className="carousel-dots-list" aria-label="Carousel pagination dots">
                {displayedCards.map((p, dotIdx) => (
                  <button
                    key={p.id || dotIdx}
                    className={`carousel-dot ${dotIdx === carouselIndex ? "active" : ""}`}
                    onClick={() => scrollToIndex(dotIdx)}
                    aria-label={`Go to slide ${dotIdx + 1} (${p.name})`}
                  />
                ))}
              </div>
              <div className="carousel-counter-text">
                <span>Swipe or use arrows to view all <strong>{displayedCards.length}</strong> rewards</span>
              </div>
            </div>
          </div>

          {/* 2. RECENT WINNERS CARD */}
          <div className="recent-winners-dashboard-card">
            <div className="recent-winners-header">
              <div className="winners-title-left">
                <div className="winners-title-row">
                  <Crown size={16} className="crown-gold" />
                  <h3>Recent Winners</h3>
                </div>
                <p>Real people, real rewards. Be the next winner!</p>
              </div>

              <button
                className="view-winners-link-btn"
                onClick={() => navigateToRoute("trust")}
              >
                <span>View All Winners</span>
                <ArrowRight size={12} />
              </button>
            </div>

            {/* 4 Winners Mini Cards in a Row */}
            <div className="recent-winners-row-grid">
              {recentWinners.map((w) => (
                <div key={w.id} className="winner-mini-card">
                  <div className="winner-img-thumb-wrap">
                    <img src={w.image} alt={w.prize} className="winner-prize-thumb" />
                  </div>
                  <div className="winner-mini-info">
                    <strong className="winner-name">{w.name}</strong>
                    <span className="winner-prize-txt">{w.prize}</span>
                    <small className="winner-time-txt">{w.time}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. CALLOUT BANNER: Join Thousands of Winners Today! */}
          <div className="join-winners-callout-card">
            <div className="callout-left-content">
              <div className="callout-trophy-circle">
                <Trophy size={20} />
              </div>
              <div className="callout-text-box">
                <h3>Join Thousands of Winners Today!</h3>
                <p>Complete tasks, earn entries and get a chance to win amazing rewards.</p>
              </div>
            </div>

            <button
              className="callout-start-now-btn"
              onClick={() => {
                if (!currentUser.isLoggedIn) {
                  setIsLoginModalOpen(true);
                } else {
                  navigateToRoute("earn");
                }
              }}
            >
              <span>Start Now</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* 4. FREQUENTLY ASKED QUESTIONS */}
          <div className="faqs-dashboard-card">
            <div className="faqs-card-header">
              <div className="faqs-title-left">
                <div className="faqs-title-row">
                  <HelpCircle size={16} className="faq-blue-icon" />
                  <h3>Frequently Asked Questions</h3>
                </div>
                <p>Everything you need to know about VELOOP Rewards.</p>
              </div>

              <button
                className="view-faqs-link-btn"
                onClick={() => setIsRulesModalOpen(true)}
              >
                <span>View All FAQs</span>
                <ArrowRight size={12} />
              </button>
            </div>

            <div className="faqs-accordion-list">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className={`faq-accordion-item ${isOpen ? "open" : ""}`}
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                  >
                    <div className="faq-question-row">
                      <span className="faq-question-text">{faq.q}</span>
                      <span className="faq-toggle-icon">
                        {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                      </span>
                    </div>
                    {isOpen && (
                      <div className="faq-answer-box">
                        <p>{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
