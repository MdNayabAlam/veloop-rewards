import React from "react";
import { useGiveaway } from "../../context/GiveawayContext";
import BrandLogo from "../BrandLogo/BrandLogo";
import {
  Coins,
  Sparkles,
  User,
  LogIn,
  ChevronRight,
  Gift,
  Bell,
  Wallet,
  ShieldCheck,
  Flame,
  FileText,
  Briefcase
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

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <header className="veloop-navbar">
      <div className="navbar-inner">
        <BrandLogo onClick={navigateToHome} size="md" />

        {/* Global Primary Navigation Links */}
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
        </div>
      </div>
    </header>
  );
}
