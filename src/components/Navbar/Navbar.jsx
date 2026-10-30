import React, { useState } from "react";
import { useGiveaway } from "../../context/GiveawayContext";
import BrandLogo from "../BrandLogo/BrandLogo";
import {
  User,
  LogIn,
  ChevronRight,
  Gift,
  Bell,
  Wallet,
  ShieldCheck,
  Flame,
  FileText,
  Briefcase,
  Menu,
  X
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
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMobileNav = (route) => {
    navigateToRoute(route);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="veloop-navbar">
      <div className="navbar-inner">
        <BrandLogo onClick={navigateToHome} size="md" />

        {/* Global Primary Navigation Links for Desktop */}
        <nav className="navbar-nav-links">
          <button
            className={`nav-link-btn ${currentRoute === "giveaways" ? "active" : ""}`}
            onClick={() => navigateToRoute("giveaways")}
          >
            <Gift size={15} />
            <span>Giveaways</span>
          </button>

          <button
            className={`nav-link-btn ${currentRoute === "earn" ? "active" : ""}`}
            onClick={() => navigateToRoute("earn")}
          >
            <Briefcase size={15} />
            <span>Earn Tasks</span>
          </button>

          <button
            className={`nav-link-btn ${currentRoute === "daily" ? "active" : ""}`}
            onClick={() => navigateToRoute("daily")}
          >
            <Flame size={15} />
            <span>Daily & Spin</span>
          </button>

          <button
            className={`nav-link-btn ${currentRoute === "wallet" ? "active" : ""}`}
            onClick={() => navigateToRoute("wallet")}
          >
            <Wallet size={15} />
            <span>Wallet & Payouts</span>
          </button>

          <button
            className={`nav-link-btn ${currentRoute === "referrals" ? "active" : ""}`}
            onClick={() => navigateToRoute("referrals")}
          >
            <Gift size={15} />
            <span>Refer & Earn</span>
          </button>

          <button
            className={`nav-link-btn ${currentRoute === "trust" ? "active" : ""}`}
            onClick={() => navigateToRoute("trust")}
          >
            <ShieldCheck size={15} />
            <span>Trust & Partners</span>
          </button>

          <button
            className={`nav-link-btn report-pill-btn ${currentRoute === "research-report" ? "active" : ""}`}
            onClick={() => navigateToRoute("research-report")}
          >
            <FileText size={15} />
            <span>Research Report</span>
          </button>
        </nav>

        {/* Right Action Icons & Wallet */}
        <div className="navbar-actions">
          {/* Quick Redeem Code Button (from Ref_01.jpeg) */}
          <button
            className="redeem-code-nav-btn"
            onClick={() => setIsGiveawayCodeModalOpen(true)}
            title="Redeem Promo / Giveaway Code for instant VEs"
          >
            <Gift size={15} />
            <span>Redeem Code</span>
          </button>

          {/* Notifications Bell */}
          <button
            className="notif-bell-btn"
            onClick={() => setIsNotificationsOpen(true)}
            aria-label="View notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && <span className="bell-badge-dot" />}
          </button>

          {/* User Wallet Pill */}
          {currentUser.isLoggedIn ? (
            <div
              className="user-wallet-pill"
              onClick={() => navigateToRoute("wallet")}
              title="Click to view detailed Wallet & Cashout"
            >
              <div className="wallet-stat" title="Velocity Entries balance">
                <span className="currency-dot purple" />
                <span className="stat-label">VEs:</span>
                <strong>{balances.VEs.toLocaleString()}</strong>
              </div>
              <div className="wallet-stat" title="Super Velocity Entries balance">
                <span className="currency-dot green" />
                <span className="stat-label">SVEs:</span>
                <strong>{balances.SVEs.toLocaleString()}</strong>
              </div>
              <div className="wallet-stat hide-mobile" title="Community Tokens balance">
                <span className="currency-dot orange" />
                <span className="stat-label">Tokens:</span>
                <strong>{balances.Tokens.toLocaleString()}</strong>
              </div>
              <div className="user-avatar-tag" title={currentUser.name}>
                <User size={13} />
                <span>{currentUser.maskedId}</span>
              </div>
            </div>
          ) : (
            <button className="signin-btn" onClick={() => setIsLoginModalOpen(true)}>
              <LogIn size={14} />
              <span>Sign In</span>
              <ChevronRight size={14} />
            </button>
          )}

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
