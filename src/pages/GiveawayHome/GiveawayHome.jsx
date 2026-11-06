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
  Star,
  Cpu,
  HardDrive,
  Shield,
  Radio,
  Heart,
  UserCheck,
  Check,
  HelpCircle,
  Plus,
  Minus,
  Crown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Sparkles,
  Zap,
  Layers,
  Gamepad2,
  MoreHorizontal
} from "lucide-react";
import "./GiveawayHome.css";

export default function GiveawayHome() {
  const {
    currentUser,
    joinedPrizes,
    setConfirmPrize,
    setIsLoginModalOpen,
    setIsRulesModalOpen,
    setIsGiveawayCodeModalOpen,
    setIsClaimModalOpen,
    navigateToGiveaway,
    navigateToRoute,
    showToast
  } = useGiveaway();

  // Active Category State
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [showAllPrizes, setShowAllPrizes] = useState(false);

  // Favorites state for reward cards
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

      const cardWidth = 285;
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

  // Category filter tabs matching Reference Mockup
  const categories = [
    { id: "ALL", label: "All Giveaways", count: 12, sublabel: "12 Active", icon: <Layers size={14} /> },
    { id: "tech", label: "Tech & Gadgets", count: 4, sublabel: "4 Giveaways", icon: <Sparkles size={14} /> },
    { id: "vouchers", label: "Gift Cards", count: 5, sublabel: "5 Giveaways", icon: <Gift size={14} /> },
    { id: "tokens", label: "UPI & Tokens", count: 3, sublabel: "3 Giveaways", icon: <Zap size={14} /> },
    { id: "gaming", label: "Gaming", count: 2, sublabel: "2 Giveaways", icon: <Gamepad2 size={14} /> },
    { id: "more", label: "More", count: null, sublabel: "Explore", icon: <MoreHorizontal size={14} /> }
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

  // Display top 6 prizes matching reference 2x3 grid, or all when expanded
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

  // How It Works - Clean 4 Steps (Minimal text, bold visuals)
  const howSteps = [
    {
      num: 1,
      icon: <UserCheck size={22} />,
      color: "purple",
      title: "Create Account",
      subtitle: "Sign up for free"
    },
    {
      num: 2,
      icon: <Check size={22} />,
      color: "blue",
      title: "Complete Tasks",
      subtitle: "Do simple tasks"
    },
    {
      num: 3,
      icon: <Gift size={22} />,
      color: "pink",
      title: "Earn Entries",
      subtitle: "Get more entries"
    },
    {
      num: 4,
      icon: <Trophy size={22} />,
      color: "gold",
      title: "Win Rewards",
      subtitle: "Be a lucky winner!"
    }
  ];

  // Trusted by Thousands - 4 Clean Trust Items
  const trustFeatures = [
    {
      id: "t1",
      color: "green",
      title: "100% Secure",
      sub: "Your data is safe"
    },
    {
      id: "t2",
      color: "purple",
      title: "Fair & Transparent",
      sub: "Winners are real"
    },
    {
      id: "t3",
      color: "yellow",
      title: "Real Rewards",
      sub: "No fake prizes"
    },
    {
      id: "t4",
      color: "blue",
      title: "Global Community",
      sub: "Join thousands"
    }
  ];

  // Recent Winners - Clean Visuals
  const recentWinners = [
    {
      id: "w1",
      name: "Rahul S.",
      won: "Won iPhone 15",
      time: "2 days ago",
      image: "/assets/iphone.png"
    },
    {
      id: "w2",
      name: "Priya M.",
      won: "Won Apple Watch",
      time: "1 week ago",
      image: "/assets/watch.png"
    },
    {
      id: "w3",
      name: "Aman K.",
      won: "Won AirPods Pro",
      time: "2 weeks ago",
      image: "/assets/airpod.png"
    },
    {
      id: "w4",
      name: "Sneha T.",
      won: "Won Amazon Gift Card",
      time: "3 weeks ago",
      image: "/assets/amazon card.png"
    }
  ];

  // FAQs data - Clean and direct
  const faqs = [
    {
      q: "How do I participate in a giveaway?",
      a: "Select your desired giveaway, complete simple tasks or use your VEs/SVEs entries to register. Each entry increases your winning chances!"
    },
    {
      q: "Are the rewards real?",
      a: "Yes, 100%! All physical rewards are brand-sealed with official manufacturer warranty. Digital vouchers are delivered directly to your verified email within minutes."
    },
    {
      q: "Is it free to join?",
      a: "Absolutely! You can earn VEs and Super VEs for free by completing daily check-ins, app trials, mini-games, and community engagement tasks with zero deposit required."
    },
    {
      q: "How are winners selected?",
      a: "Winners are drawn using cryptographically verifiable random seeds on our smart lottery engine once the countdown expires. All draw proofs are permanently archived."
    }
  ];

  return (
    <div className="giveaway-dashboard-layout">
      {/* Certified Winner Banner (Displays if user is a certified winner) */}
      {currentUser?.wonPrize && (
        <div className="winner-spotlight-top-banner">
          <div className="winner-banner-left">
            <div className="winner-trophy-gold-box">
              <Trophy size={24} />
            </div>
            <div className="winner-banner-texts">
              <span className="winner-banner-kicker">🎉 CONGRATULATIONS! YOU WON!</span>
              <h2 className="winner-banner-title">{currentUser.wonPrize.prizeName}</h2>
              <p className="winner-banner-desc">
                Your ticket was drawn as an official certified winner in the VELOOP Rewards Giveaway!
              </p>
              <div className="winner-banner-chips">
                <span className="winner-chip time">
                  <Clock size={12} /> Claim within {currentUser.wonPrize.deadline || "7 Days Remaining"}
                </span>
                <span className="winner-chip verified">
                  <ShieldCheck size={12} /> Verified Winner Status
                </span>
              </div>
            </div>
          </div>

          <div className="winner-banner-center-img">
            <img src={currentUser.wonPrize.image} alt={currentUser.wonPrize.prizeName} />
          </div>

          <div className="winner-banner-right-action">
            <button
              className="winner-claim-gold-btn"
              onClick={() => setIsClaimModalOpen(true)}
            >
              <Gift size={15} />
              <span>Claim Your Prize</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      )}

      <div className="dashboard-main-container">
        {/* ======================================================== */}
        {/* LEFT COLUMN (Desktop): HERO, STATS, CATEGORIES, FEATURED, HOW, TRUST */}
        {/* On Mobile: Elements are interleaved cleanly via CSS flex order */}
        {/* ======================================================== */}
        <section className="dashboard-left-col" aria-label="Main Giveaway Showcase">
          {/* 1. HERO SHOWCASE CARD */}
          <div className="hero-showcase-card">
            <div className="hero-card-left">
              <div className="hero-badge-group">
                <span className="hero-exclusive-badge">
                  <Flame size={13} className="flame-icon" />
                  <span>EXCLUSIVE GIVEAWAYS</span>
                </span>
                <button
                  className="hero-giveaway-code-btn"
                  onClick={() => setIsGiveawayCodeModalOpen(true)}
                  title="Redeem Promo Code"
                >
                  <Gift size={13} />
                  <span>Giveaway Code</span>
                </button>
              </div>

              <h1 className="hero-win-headline">
                Win Amazing Rewards with <span className="pink-gradient-text">VELoop Rewards</span>
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

          {/* 3. CATEGORY FILTER TABS BAR (Image 2 style) */}
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
                  <span className="cat-primary-title">{cat.label}</span>
                  {cat.count !== null && (
                    <span className={`cat-count-pill ${isActive ? "active-pill" : ""}`}>
                      {cat.count}
                    </span>
                  )}
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

          {/* 5. HOW IT WORKS? SECTION (Clean 4 Cards, minimal text matching Reference Mockup) */}
          <div className="how-it-works-dashboard-card" id="how-it-works-section">
            <div className="how-card-header">
              <div className="how-shield-icon">
                <ShieldCheck size={20} />
              </div>
              <div className="how-title-box">
                <h3>How It Works?</h3>
                <p>It's simple! Follow these steps and start winning amazing rewards.</p>
              </div>
            </div>

            <div className="how-clean-cards-grid">
              {howSteps.map((s) => (
                <div key={s.num} className="how-clean-step-card">
                  <div className={`how-step-circle-icon ${s.color}`}>
                    {s.icon}
                  </div>
                  <h4 className="how-step-title">{s.title}</h4>
                  <span className="how-step-subtitle">{s.subtitle}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 6. TRUSTED BY THOUSANDS (Clean 4 Trust Badges matching Reference Mockup) */}
          <div className="trusted-by-thousands-bar">
            <div className="trust-bar-header">
              <div className="trust-shield-glow">
                <ShieldCheck size={20} className="trust-green-shield" />
              </div>
              <div className="trust-header-text">
                <h3>Trusted by Thousands</h3>
                <p>A safe, secure and trusted platform for giveaways.</p>
              </div>
            </div>

            <div className="trust-clean-badges-grid">
              {trustFeatures.map((feat) => (
                <div key={feat.id} className="trust-clean-pill-item">
                  <span className={`trust-dot-indicator ${feat.color}`} />
                  <div className="trust-pill-text-col">
                    <strong className="trust-pill-main">{feat.title}</strong>
                    <span className="trust-pill-sub">{feat.sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* RIGHT COLUMN (Desktop): ACTIVE GIVEAWAYS, RECENT WINNERS, CTA, FAQ */}
        {/* ======================================================== */}
        <aside className="dashboard-right-col" aria-label="Active Giveaways and Community Feed">
          {/* 1. ACTIVE GIVEAWAYS SECTION (2-Column Grid on Desktop, Swipe Carousel on Mobile) */}
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
                    aria-label="Previous Prize"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    className={`carousel-arrow-btn next ${!canScrollRight ? "disabled" : ""}`}
                    onClick={() => scrollCarousel("right")}
                    disabled={!canScrollRight}
                    aria-label="Next Prize"
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

            {/* Giveaway Cards Grid & Carousel */}
            <div
              className="active-cards-carousel"
              ref={carouselRef}
              onScroll={handleCarouselScroll}
              role="region"
              aria-label="Active Giveaways Cards"
              tabIndex={0}
            >
              {displayedCards.map((prize) => {
                const isJoined = joinedPrizes.has(prize.id);
                const isLiked = likedCardIds.has(prize.id);

                return (
                  <article
                    key={prize.id}
                    className={`active-prize-card ${isJoined ? "joined" : ""}`}
                    onClick={() => navigateToGiveaway(prize.slug)}
                  >
                    {/* Top Row: Prize Badge + Like Counter / Cost */}
                    <div className="card-top-header">
                      <span className={`position-badge ${prize.color || "purple"}`}>
                        {prize.position}
                      </span>

                      <button
                        className={`card-heart-btn ${isLiked ? "liked" : ""}`}
                        onClick={(e) => toggleLike(e, prize.id)}
                        aria-label={`Like ${prize.name}`}
                        title="Add to favorites"
                      >
                        <Heart size={12} fill={isLiked ? "#ec4899" : "#a855f7"} color={isLiked ? "#ec4899" : "#a855f7"} />
                        <span>{prize.likes || "12.3K"}</span>
                      </button>
                    </div>

                    {/* Centered Product Stage with Subtle Radial Glow */}
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

                    {/* Product Name, Value, Spec & Progress */}
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

                      {/* Entries Progress Bar */}
                      <div className="card-entry-progress-wrap">
                        <div className="progress-labels-mini">
                          <span className="card-entry-text">
                            {prize.entriesProgress || "12.3K / 25K Entries"}
                          </span>
                        </div>
                        <div className="card-progress-track">
                          <div
                            className="card-progress-fill"
                            style={{ width: `${prize.progressPercent || 45}%` }}
                          />
                        </div>
                      </div>

                      {/* Join Action Button */}
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

            {/* Mobile Carousel Indicators */}
            <div className="carousel-pagination-row">
              <div className="carousel-dots-list" aria-label="Carousel pagination dots">
                {displayedCards.map((p, dotIdx) => (
                  <button
                    key={p.id || dotIdx}
                    className={`carousel-dot ${dotIdx === carouselIndex ? "active" : ""}`}
                    onClick={() => scrollToIndex(dotIdx)}
                    aria-label={`Go to slide ${dotIdx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* 2. RECENT WINNERS (Clean 4 Cards matching Reference Mockup) */}
          <div className="recent-winners-dashboard-card">
            <div className="recent-winners-header">
              <div className="winners-title-left">
                <div className="winners-title-row">
                  <Crown size={18} className="crown-gold" />
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

            {/* 4 Clean Winner Cards */}
            <div className="recent-winners-clean-grid">
              {recentWinners.map((w) => (
                <article key={w.id} className="winner-clean-card">
                  <div className="winner-thumb-box">
                    <img src={w.image} alt={w.won} className="winner-clean-img" />
                  </div>
                  <strong className="winner-clean-name">{w.name}</strong>
                  <span className="winner-clean-prize">{w.won}</span>
                  <span className="winner-clean-time">{w.time}</span>
                </article>
              ))}
            </div>
          </div>

          {/* 3. CTA BANNER (Join Thousands of Winners Today!) */}
          <div className="join-winners-callout-card">
            <div className="callout-left-group">
              <div className="callout-trophy-gold-circle">
                <Trophy size={24} />
              </div>
              <div className="callout-text-box">
                <h3>Join Thousands of Winners Today!</h3>
                <p>Complete tasks, earn entries and get a chance to win amazing rewards.</p>
              </div>
            </div>

            <div className="callout-right-action">
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
                <ArrowRight size={15} />
              </button>
            </div>
          </div>

          {/* 4. FREQUENTLY ASKED QUESTIONS */}
          <div className="faqs-dashboard-card">
            <div className="faqs-card-header">
              <div className="faqs-title-left">
                <div className="faqs-title-row">
                  <HelpCircle size={18} className="faq-blue-icon" />
                  <h3>Frequently Asked Questions</h3>
                </div>
                <p>Everything you need to know about VELoop Rewards.</p>
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
                      <span className={`faq-toggle-circle ${isOpen ? "is-open" : ""}`}>
                        {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                      </span>
                    </div>

                    {isOpen && (
                      <div className="faq-collapsible-wrapper expanded">
                        <div className="faq-answer-box">
                          <p>{faq.a}</p>
                        </div>
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
