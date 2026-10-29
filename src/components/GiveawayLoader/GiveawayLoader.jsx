import React, { useState, useEffect } from "react";
import { Sparkles, Gift } from "lucide-react";
import "./GiveawayLoader.css";

const loaderMessages = [
  "Preparing today's verified rewards...",
  "Checking active giveaway contracts...",
  "Loading certified brand prizes...",
  "Verifying participant entries...",
  "Bringing your rewards closer..."
];

export default function GiveawayLoader() {
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIdx((prev) => (prev + 1) % loaderMessages.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="giveaway-loader-overlay">
      <div className="loader-vault-card">
        <div className="loader-icon-stage">
          <div className="pulse-glow-ring ring-outer" />
          <div className="pulse-glow-ring ring-inner" />
          <div className="loader-gift-icon">
            <Gift size={38} className="gift-bounce" />
          </div>
          <Sparkles size={16} className="sparkle-particle p1" />
          <Sparkles size={14} className="sparkle-particle p2" />
          <Sparkles size={18} className="sparkle-particle p3" />
        </div>

        <div className="loader-text-wrap">
          <span className="loader-brand-kicker">VELOOP REWARDS</span>
          <h3 className="loader-status-text">{loaderMessages[msgIdx]}</h3>
          <div className="loader-dots-bar">
            <span className="dot d1" />
            <span className="dot d2" />
            <span className="dot d3" />
            <span className="dot d4" />
          </div>
        </div>
      </div>
    </div>
  );
}
