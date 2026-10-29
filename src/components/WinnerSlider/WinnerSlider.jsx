import React from "react";
import { winnerTickerMessages } from "../../data/giveawayData";
import { Sparkles, Trophy } from "lucide-react";
import "./WinnerSlider.css";

export default function WinnerSlider() {
  // Duplicate array so it creates an infinite seamless loop
  const messages = [...winnerTickerMessages, ...winnerTickerMessages];

  return (
    <div className="winner-ticker-wrapper" aria-label="Recent winner updates">
      <div className="ticker-badge">
        <Trophy size={14} className="ticker-icon" />
        <span>RECENT WINNERS</span>
      </div>

      <div className="ticker-track-container">
        <div className="ticker-track">
          {messages.map((item, index) => (
            <div className="ticker-item" key={`${item.id}-${index}`}>
              <span className="ticker-item-icon">{item.icon}</span>
              <span className="ticker-item-text">{item.text}</span>
              <span className="ticker-separator">✦</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
