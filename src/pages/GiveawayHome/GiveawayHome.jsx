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
  Check,
  Globe,
  Award
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

  // How It Works - 4 Connected Steps with Numbering & Enhanced Visuals
  const howSteps = [
    {
      step: "01",
      badge: "STEP 01",
      icon: <UserCheck size={20} />,
      color: "purple",
      title: "Create Account",
      subtitle: "Instant & Free",
      desc: "Sign up in 30 seconds and receive 100 Welcome VEs automatically."
    },
    {
      step: "02",
      badge: "STEP 02",
      icon: <CheckCircle2 size={20} />,
      color: "blue",
      title: "Complete Tasks",
      subtitle: "Daily Fun",
      desc: "Try new games, complete surveys, or check in daily to collect points."
    },
    {
      step: "03",
      badge: "STEP 03",
      icon: <Gift size={20} />,
      color: "pink",
      title: "Earn Entries",
      subtitle: "Multiple Chances",
      desc: "Use your VEs to get tickets for gadgets, consoles & gift cards."
    },
    {
      step: "04",
      badge: "STEP 04",
      icon: <Trophy size={20} />,
      color: "gold",
      title: "Win Rewards",
      subtitle: "Doorstep Delivery",
      desc: "Winners drawn live on-chain with free, insured brand warranty shipping."
    }
  ];

  // Trusted by Thousands - 4 Premium Feature Cards
  const trustFeatures = [
    {
      id: "t1",
      icon: <ShieldCheck size={22} />,
      color: "green",
      badge: "100% SECURE",
      title: "Bank-Grade Encryption",
      desc: "Military-grade 256-bit SSL encryption protects your account and data privacy."
    },
    {
      id: "t2",
      icon: <Sparkles size={22} />,
      color: "purple",
      badge: "PROVABLY FAIR",
      title: "Verifiable Draws",
      desc: "Cryptographic RNG seeds guarantee 100% tamper-proof winner selection."
    },
    {
      id: "t3",
      icon: <Award size={22} />,
      color: "gold",
      badge: "OFFICIAL PRIZES",
      title: "Real Brand Rewards",
      desc: "Sealed authentic products with full manufacturer brand warranty & fast dispatch."
    },
    {
      id: "t4",
      icon: <Globe size={22} />,
      color: "blue",
      badge: "WORLDWIDE",
      title: "Global Community",
      desc: "Active community of 100,000+ members enjoying transparent weekly rewards."
    }
  ];

  // Recent Winners with rich information hierarchy & larger visuals
  const recentWinners = [
    {
      id: "w1",
      name: "Rahul S.",
      location: "Delhi, IN",
      prize: "iPhone 15 Pro",
      prizeSpec: "128GB Titanium",
      value: "₹1,19,900",
      time: "2 days ago",
      image: "/assets/iphone.png",
      status: "Delivered ✓",
      ticketId: "#VR-8842"
    },
    {
      id: "w2",
      name: "Priya M.",
      location: "Mumbai, IN",
      prize: "Apple Watch Series 9",
      prizeSpec: "GPS 45mm",
      value: "₹41,900",
      time: "1 week ago",
      image: "/assets/watch.png",
      status: "Delivered ✓",
      ticketId: "#VR-7731"
    },
    {
      id: "w3",
      name: "Aman K.",
      location: "Bangalore, IN",
      prize: "AirPods Pro 2",
      prizeSpec: "Active Noise Cancel",
      value: "₹24,900",
      time: "2 weeks ago",
      image: "/assets/airpod.png",
      status: "Delivered ✓",
      ticketId: "#VR-6619"
    },
    {
      id: "w4",
      name: "Sneha T.",
      location: "Pune, IN",
      prize: "Amazon Gift Card",
      prizeSpec: "₹2,000 Digital Code",
      value: "₹2,000",
      time: "3 weeks ago",
      image: "/assets/amazon card.png",
      status: "Claimed ✓",
      ticketId: "#VR-5502"
    }
  ];

  // FAQs data with category tags
  const faqs = [
    {
      q: "How do I participate in a giveaway?",
      a: "Select your desired giveaway, complete simple tasks or use your VEs/SVEs entries to register. Each entry increases your winning chances!",
      category: "Participation"
    },
    {
      q: "Are the rewards real and authentic?",
      a: "Yes, 100%! All physical rewards are brand-sealed with official manufacturer warranty. Digital vouchers are delivered directly to your verified email within minutes.",
      category: "Rewards"
    },
    {
      q: "Is it completely free to join?",
      a: "Absolutely! You can earn VEs and Super VEs for free by completing daily check-ins, app trials, mini-games, and community engagement tasks with zero deposit required.",
      category: "Cost & VEs"
    },
    {
      q: "How are winners selected fairly?",
      a: "Winners are drawn using cryptographically verifiable random seeds on our smart lottery engine once the countdown expires. All draw proofs are permanently archived.",
      category: "Fairness"
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

          {/* 5. HOW IT WORKS? SECTION (CONNECTED ROADMAP WITH NUMBERING) */}
          <div className="how-it-works-dashboard-card" id="how-it-works-section">
            <div className="how-card-header">
              <div className="how-shield-icon">
                <ShieldCheck size={20} />
              </div>
              <div className="how-title-box">
                <div className="how-title-line">
                  <h3>How It Works</h3>
                  <span className="how-badge-pill">4 SIMPLE STEPS</span>
                </div>
                <p>Follow these quick steps and start winning verified rewards today.</p>
              </div>
            </div>

            {/* Connected Steps Pathway */}
            <div className="how-connected-track-container">
              {/* Laser Connector Line */}
              <div className="how-connecting-laser-line" aria-hidden="true" />

              <div className="how-connected-steps-grid">
                {howSteps.map((s) => (
                  <div key={s.step} className={`how-step-card step-${s.color}`}>
                    {/* Top Row: Futuristic Step Number Badge & Watermark */}
                    <div className="step-card-top">
                      <span className={`step-pill-badge ${s.color}`}>{s.badge}</span>
                      <span className="step-number-watermark">{s.step}</span>
                    </div>

                    {/* Glowing Icon Hub */}
                    <div className={`step-icon-stage ${s.color}`}>
                      <div className="step-stage-glow" />
                      <div className="step-icon-symbol">{s.icon}</div>
                    </div>

                    {/* Step Content */}
                    <div className="step-content-box">
                      <h4 className="step-title">{s.title}</h4>
                      <span className="step-subtitle-tag">{s.subtitle}</span>
                      <p className="step-desc-text">{s.desc}</p>
                    </div>

                    {/* Bottom Connecting Node Dot */}
                    <div className="step-card-footer-node">
                      <span className={`node-dot ${s.color}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 6. TRUSTED BY THOUSANDS (PREMIUM FEATURE CARDS) */}
          <div className="trusted-by-thousands-bar">
            <div className="trust-bar-header">
              <div className="trust-shield-glow">
                <ShieldCheck size={22} className="trust-green-shield" />
              </div>
              <div className="trust-header-text">
                <div className="trust-title-row">
                  <h3>Trusted by Thousands</h3>
                  <span className="trust-guarantee-badge">100% VERIFIED PLATFORM</span>
                </div>
                <p>Industry-standard security, provably fair transparency, and authentic brand partnerships.</p>
              </div>
            </div>

            {/* 4 Premium Feature Cards */}
            <div className="trust-premium-cards-grid">
              {trustFeatures.map((feat) => (
                <div key={feat.id} className={`trust-feature-card ${feat.color}`}>
                  <div className="trust-card-top">
                    <div className={`trust-icon-box ${feat.color}`}>
                      {feat.icon}
                    </div>
                    <span className={`trust-mini-tag ${feat.color}`}>{feat.badge}</span>
                  </div>
                  <h4 className="trust-card-title">{feat.title}</h4>
                  <p className="trust-card-desc">{feat.desc}</p>
                </div>
              ))}
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

                    {/* 3D Product Stage with Larger Visuals, Glowing Neon Pedestal, and Countdown Badge */}
                    <div className="card-image-stage">
                      <div className={`stage-radial-glow ${prize.color || "purple"}`} />
                      <div className="stage-pedestal-ellipse" />
                      <img
                        src={prize.image}
                        alt={prize.name}
                        className="card-product-img"
                        loading="lazy"
                      />

                      {/* Prominent Floating Countdown Badge on Stage */}
                      <div className="card-stage-countdown-badge">
                        <Clock size={11} className="clock-tick-icon" />
                        <span>{prize.daysLeft || 12}d left</span>
                      </div>
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

                      {/* Social Metrics: Participants & Winners Count */}
                      <div className="card-meta-chips-row">
                        <span className="meta-chip participants">
                          <Users size={11} />
                          <span>{prize.participants || "8.5K"} entries</span>
                        </span>
                        <span className="meta-chip winners-count">
                          <Trophy size={11} />
                          <span>{prize.winnerCount || 1} Winner{(prize.winnerCount || 1) > 1 ? "s" : ""}</span>
                        </span>
                      </div>

                      {/* Animated Entries Progress Bar */}
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
                            className="card-progress-fill animated-shimmer"
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
                            <span>Join Giveaway</span>
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

          {/* 2. RECENT WINNERS CARD (LARGER IMAGES & RICH HIERARCHY) */}
          <div className="recent-winners-dashboard-card">
            <div className="recent-winners-header">
              <div className="winners-title-left">
                <div className="winners-title-row">
                  <Crown size={18} className="crown-gold" />
                  <h3>Recent Winners</h3>
                  <span className="winners-live-pill">LIVE PROOFS</span>
                </div>
                <p>Real winners, verified rewards. Draw proofs published instantly.</p>
              </div>

              <button
                className="view-winners-link-btn"
                onClick={() => navigateToRoute("trust")}
              >
                <span>Audit Trail</span>
                <ArrowRight size={12} />
              </button>
            </div>

            {/* 4 Winners Showcase Cards with larger images & information hierarchy */}
            <div className="recent-winners-showcase-grid">
              {recentWinners.map((w) => (
                <article key={w.id} className="winner-showcase-card">
                  {/* Top Badge: Verified Tag & Time */}
                  <div className="winner-card-header">
                    <span className="winner-verified-chip">
                      <CheckCircle2 size={10} /> Verified
                    </span>
                    <span className="winner-time-badge">{w.time}</span>
                  </div>

                  {/* Product Stage with Glow */}
                  <div className="winner-product-stage">
                    <div className="winner-stage-radial-glow" />
                    <img src={w.image} alt={w.prize} className="winner-product-img" />
                    <span className="winner-prize-val-tag">{w.value}</span>
                  </div>

                  {/* Winner Information Hierarchy */}
                  <div className="winner-info-body">
                    <div className="winner-person-row">
                      <div className="winner-avatar-initial">
                        {w.name.charAt(0)}
                      </div>
                      <div className="winner-name-location">
                        <strong className="winner-person-name">{w.name}</strong>
                        <span className="winner-location-txt">{w.location}</span>
                      </div>
                    </div>

                    <div className="winner-prize-details">
                      <h4 className="winner-prize-title">{w.prize}</h4>
                      <p className="winner-prize-spec-txt">{w.prizeSpec}</p>
                    </div>

                    <div className="winner-card-bottom-proof">
                      <span className="winner-proof-id">{w.ticketId}</span>
                      <span className="winner-status-delivered">{w.status}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* 3. CALLOUT BANNER: Join Thousands of Winners Today! */}
          <div className="join-winners-callout-card">
            {/* Ambient Background Cosmic Nebulas */}
            <div className="callout-cosmic-glow glow-left" />
            <div className="callout-cosmic-glow glow-right" />
            <div className="callout-cyber-grid-overlay" aria-hidden="true" />

            <div className="callout-inner-flex">
              <div className="callout-left-content">
                {/* 3D Glowing Trophy Showcase Stage */}
                <div className="callout-trophy-showcase">
                  <div className="trophy-pulse-halo" />
                  <div className="trophy-stage-disc" />
                  <div className="trophy-gold-symbol">
                    <Trophy size={28} className="trophy-3d-icon" />
                  </div>
                  <span className="sparkle-star s1">✦</span>
                  <span className="sparkle-star s2">✦</span>
                </div>

                <div className="callout-text-box">
                  <div className="callout-hot-badge">
                    <Sparkles size={11} />
                    <span>OVER ₹25 LAKHS+ REWARDS DISTRIBUTED</span>
                  </div>
                  <h3>Join Thousands of Winners Today!</h3>
                  <p>Complete simple daily tasks, earn entries and get a chance to win verified prizes from VELoop Rewards.</p>
                  
                  {/* 3 Value Perks */}
                  <div className="callout-perks-row">
                    <span className="callout-perk-item">⚡ 100% Free Entry</span>
                    <span className="callout-perk-item">🎁 Sealed Brand Prizes</span>
                    <span className="callout-perk-item">🛡️ Direct Home Delivery</span>
                  </div>
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
                  <span>Start Winning Now</span>
                  <ArrowRight size={15} />
                </button>
                <span className="callout-subtext">No deposit required • Free to play</span>
              </div>
            </div>
          </div>

          {/* 4. FREQUENTLY ASKED QUESTIONS */}
          <div className="faqs-dashboard-card">
            <div className="faqs-card-header">
              <div className="faqs-title-left">
                <div className="faqs-title-row">
                  <HelpCircle size={18} className="faq-blue-icon" />
                  <h3>Frequently Asked Questions</h3>
                  <span className="faq-count-badge">4 TOP ANSWERS</span>
                </div>
                <p>Everything you need to know about VELoop Rewards & prize distribution.</p>
              </div>

              <button
                className="view-faqs-link-btn"
                onClick={() => setIsRulesModalOpen(true)}
              >
                <span>Platform Rules</span>
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
                      <div className="faq-q-left">
                        <span className="faq-category-tag">{faq.category}</span>
                        <span className="faq-question-text">{faq.q}</span>
                      </div>
                      <span className={`faq-toggle-circle ${isOpen ? "is-open" : ""}`}>
                        {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                      </span>
                    </div>

                    <div className={`faq-collapsible-wrapper ${isOpen ? "expanded" : ""}`}>
                      <div className="faq-answer-box">
                        <p>{faq.a}</p>
                      </div>
                    </div>
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
