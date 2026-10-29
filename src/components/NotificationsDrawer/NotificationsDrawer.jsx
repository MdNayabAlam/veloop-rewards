import React, { useState } from "react";
import { useGiveaway } from "../../context/GiveawayContext";
import { Bell, X, CheckCheck, Sliders, Shield, Zap, Sparkles } from "lucide-react";
import "./NotificationsDrawer.css";

export default function NotificationsDrawer() {
  const {
    isNotificationsOpen,
    setIsNotificationsOpen,
    notifications,
    markAllNotificationsAsRead
  } = useGiveaway();

  const [activeTab, setActiveTab] = useState("all"); // "all" | "settings"
  const [prefs, setPrefs] = useState({
    taskCredited: true,
    streakReminders: true,
    giveawayDraws: true,
    marketingPromos: false
  });

  if (!isNotificationsOpen) return null;

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="drawer-overlay" onClick={() => setIsNotificationsOpen(false)}>
      <div className="notifications-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div className="dh-title-wrap">
            <Bell size={20} className="bell-icon" />
            <h3 className="drawer-title">Activity & Alerts</h3>
            {unreadCount > 0 && <span className="unread-badge">{unreadCount} New</span>}
          </div>
          <button
            className="drawer-close-btn"
            onClick={() => setIsNotificationsOpen(false)}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="drawer-tabs-bar">
          <button
            className={`d-tab-btn ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            Notifications ({notifications.length})
          </button>
          <button
            className={`d-tab-btn ${activeTab === "settings" ? "active" : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            <Sliders size={13} />
            <span>Preferences</span>
          </button>
        </div>

        {activeTab === "all" ? (
          <div className="drawer-body">
            {unreadCount > 0 && (
              <div className="mark-read-bar">
                <span>Unread notifications</span>
                <button className="mark-read-btn" onClick={markAllNotificationsAsRead}>
                  <CheckCheck size={14} />
                  <span>Mark all as read</span>
                </button>
              </div>
            )}

            <div className="notif-items-list">
              {notifications.map((n) => (
                <div key={n.id} className={`notif-item-card ${n.isRead ? "read" : "unread"}`}>
                  <div className="notif-icon-col">
                    {n.type === "EARNING" && <Zap size={16} className="notif-icon green" />}
                    {n.type === "STREAK" && <Sparkles size={16} className="notif-icon purple" />}
                    {n.type === "GIVEAWAY" && <Bell size={16} className="notif-icon orange" />}
                  </div>
                  <div className="notif-content-col">
                    <div className="notif-top">
                      <strong className="notif-title">{n.title}</strong>
                      <span className="notif-time">{n.timestamp}</span>
                    </div>
                    <p className="notif-body">{n.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="drawer-body prefs-body">
            <div className="pref-section-intro">
              <Shield size={18} className="shield-icn" />
              <div>
                <strong>User-Controlled Notifications</strong>
                <p>As recommended in the benchmarking audit, you have 100% control over which notifications you receive.</p>
              </div>
            </div>

            <div className="prefs-toggles-list">
              <label className="pref-toggle-item">
                <div className="toggle-info">
                  <strong>Task & Survey Credits</strong>
                  <small>Receive instant alerts when an offerwall task is approved or credited.</small>
                </div>
                <input
                  type="checkbox"
                  checked={prefs.taskCredited}
                  onChange={(e) => setPrefs({ ...prefs, taskCredited: e.target.checked })}
                />
              </label>

              <label className="pref-toggle-item">
                <div className="toggle-info">
                  <strong>Daily Streak Reminders</strong>
                  <small>Alert 2 hours before midnight if today's check-in hasn't been claimed.</small>
                </div>
                <input
                  type="checkbox"
                  checked={prefs.streakReminders}
                  onChange={(e) => setPrefs({ ...prefs, streakReminders: e.target.checked })}
                />
              </label>

              <label className="pref-toggle-item">
                <div className="toggle-info">
                  <strong>Giveaway Draw Alerts</strong>
                  <small>Live notification when winners are announced for draws you entered.</small>
                </div>
                <input
                  type="checkbox"
                  checked={prefs.giveawayDraws}
                  onChange={(e) => setPrefs({ ...prefs, giveawayDraws: e.target.checked })}
                />
              </label>

              <label className="pref-toggle-item">
                <div className="toggle-info">
                  <strong>Marketing & Promo Boosters</strong>
                  <small>Limited-time multiplier codes and bonus task notifications.</small>
                </div>
                <input
                  type="checkbox"
                  checked={prefs.marketingPromos}
                  onChange={(e) => setPrefs({ ...prefs, marketingPromos: e.target.checked })}
                />
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
