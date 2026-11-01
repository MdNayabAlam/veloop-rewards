import React, { useState } from "react";
import { useGiveaway } from "../../context/GiveawayContext";
import BrandLogo from "../BrandLogo/BrandLogo";
import {
  Gift,
  Bell,
  Wallet,
  ShieldCheck,
  Flame,
  FileText,
  Briefcase,
  Menu,
  X,
  Search,
  Sparkles,
  ChevronRight
} from "lucide-react";
import "./Navbar.css";

export default function Navbar() {
  const {
    currentRoute,
    navigateToHome,
    navigateToRoute,
    currentUser,
    balances,
    setIsRulesModalOpen,
    setIsLoginModalOpen,
    setIsGiveawayCodeModalOpen,
    setIsNotificationsOpen,
    notifications
  } = useGiveaway();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMobileNav = (route) => {
    navigateToRoute(route);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="veloop-navbar">
      <div className="navbar-inner">
        <BrandLogo onClick={navigateToHome} size="md" />

        {/* Global Primary Navigation Links matching media_1793407830512_ba630f92.jpg */}
        <nav className="navbar-nav-links">
          <button
            className={`nav-link-btn ${currentRoute === "home" ? "active" : ""}`}
            onClick={() => navigateToRoute("giveaways")}
          >
            <span>Home</span>
          </button>

          <button
            className={`nav-link-btn ${currentRoute === "giveaways" ? "active" : ""}`}
            onClick={() => navigateToRoute("giveaways")}
          >
            <span>Giveaways</span>
          </button>

          <button
            className={`nav-link-btn ${currentRoute === "daily" || currentRoute === "earn" ? "active" : ""}`}
            onClick={() => navigateToRoute("daily")}
          >
            <span>Rewards</span>
          </button>

          <button
            className={`nav-link-btn ${currentRoute === "trust" ? "active" : ""}`}
            onClick={() => navigateToRoute("trust")}
          >
            <span>Leaderboard</span>
          </button>

          <button
            className="nav-link-btn"
            onClick={() => {
              const el = document.getElementById("how-it-works-section");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span>How It Works</span>
          </button>
        </nav>

        {/* Right Action Icons & Wallet matching media_1793407830512_ba630f92.jpg */}
        <div className="navbar-actions">
          {/* Search Bar Input */}
          <div className="navbar-search-box hide-mobile-search">
            <Search size={14} className="navbar-search-icon" />
            <input
              type="text"
              placeholder="Search giveaways..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="navbar-search-input"
            />
          </div>

          {/* Quick Notifications Bell */}
          <button
            className="notif-bell-btn"
            onClick={() => setIsNotificationsOpen(true)}
            aria-label="View notifications"
          >
            <Bell size={17} />
            {unreadCount > 0 && <span className="bell-badge-dot" />}
          </button>

          {/* Single Diamond Balance Pill */}
          <div
            className="navbar-balance-pill"
            onClick={() => navigateToRoute("wallet")}
            title="Click to view detailed Wallet & Cashout"
          >
            <Sparkles size={13} className="balance-gem-icon" />
            <span>{balances.VEs.toLocaleString()}</span>
          </div>

          {/* User Profile Avatar */}
          <div
            className="navbar-user-avatar-wrap"
            onClick={() => setIsLoginModalOpen(true)}
            title={currentUser.name || "User Account"}
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              alt="User Profile"
              className="navbar-user-avatar-img"
            />
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button
            className="mobile-hamburger-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close navigation" : "Open navigation"}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-nav-drawer" role="dialog" aria-modal="true">
          <div className="mobile-drawer-backdrop" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="mobile-drawer-content">
            <div className="mobile-drawer-header">
              <BrandLogo size="sm" onClick={() => handleMobileNav("giveaways")} />
              <button
                className="close-drawer-btn"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close navigation"
              >
                <X size={18} />
              </button>
            </div>

            {/* Quick Balances Row in Drawer */}
            <div className="mobile-drawer-wallet-box" onClick={() => handleMobileNav("wallet")}>
              <div className="m-wallet-item">
                <span className="currency-dot purple" />
                <span>VEs: <strong>{balances.VEs.toLocaleString()}</strong></span>
              </div>
              <div className="m-wallet-item">
                <span className="currency-dot green" />
                <span>SVEs: <strong>{balances.SVEs.toLocaleString()}</strong></span>
              </div>
              <div className="m-wallet-item">
                <span className="currency-dot orange" />
                <span>Tokens: <strong>{balances.Tokens.toLocaleString()}</strong></span>
              </div>
            </div>

            <nav className="mobile-drawer-links">
              <button
                className={`m-nav-btn ${currentRoute === "giveaways" ? "active" : ""}`}
                onClick={() => handleMobileNav("giveaways")}
              >
                <Gift size={18} />
                <span>🎁 Giveaways</span>
                <ChevronRight size={15} className="m-arrow" />
              </button>

              <button
                className={`m-nav-btn ${currentRoute === "earn" ? "active" : ""}`}
                onClick={() => handleMobileNav("earn")}
              >
                <Briefcase size={18} />
                <span>💼 Earn Tasks & Surveys</span>
                <ChevronRight size={15} className="m-arrow" />
              </button>

              <button
                className={`m-nav-btn ${currentRoute === "daily" ? "active" : ""}`}
                onClick={() => handleMobileNav("daily")}
              >
                <Flame size={18} />
                <span>🔥 Daily Streaks & Lucky Spin</span>
                <ChevronRight size={15} className="m-arrow" />
              </button>

              <button
                className={`m-nav-btn ${currentRoute === "wallet" ? "active" : ""}`}
                onClick={() => handleMobileNav("wallet")}
              >
                <Wallet size={18} />
                <span>💳 Wallet & Instant Payouts</span>
                <ChevronRight size={15} className="m-arrow" />
              </button>

              <button
                className={`m-nav-btn ${currentRoute === "referrals" ? "active" : ""}`}
                onClick={() => handleMobileNav("referrals")}
              >
                <Gift size={18} />
                <span>👥 Refer & Earn (10% Lifetime)</span>
                <ChevronRight size={15} className="m-arrow" />
              </button>

              <button
                className={`m-nav-btn ${currentRoute === "trust" ? "active" : ""}`}
                onClick={() => handleMobileNav("trust")}
              >
                <ShieldCheck size={18} />
                <span>🛡️ Trust & Partner Networks</span>
                <ChevronRight size={15} className="m-arrow" />
              </button>

              <button
                className={`m-nav-btn report ${currentRoute === "research-report" ? "active" : ""}`}
                onClick={() => handleMobileNav("research-report")}
              >
                <FileText size={18} />
                <span>📄 Research Assignment Report</span>
                <ChevronRight size={15} className="m-arrow" />
              </button>
            </nav>

            <div className="mobile-drawer-footer">
              <button
                className="m-redeem-code-btn"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsGiveawayCodeModalOpen(true);
                }}
              >
                <Gift size={16} />
                <span>Redeem Giveaway Code</span>
              </button>
              <button
                className="m-rules-btn"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsRulesModalOpen(true);
                }}
              >
                <ShieldCheck size={16} />
                <span>Official Rules & Transparency</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
