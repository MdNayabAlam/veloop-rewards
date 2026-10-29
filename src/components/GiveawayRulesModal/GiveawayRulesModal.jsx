import React from "react";
import { useGiveaway } from "../../context/GiveawayContext";
import { giveawayRulesData } from "../../data/giveawayData";
import { X, BookOpen, ShieldCheck, Check } from "lucide-react";
import "./GiveawayRulesModal.css";

export default function GiveawayRulesModal() {
  const { isRulesModalOpen, setIsRulesModalOpen } = useGiveaway();

  if (!isRulesModalOpen) return null;

  return (
    <div className="modal-backdrop" onClick={() => setIsRulesModalOpen(false)}>
      <div className="rules-modal-card" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button
          className="modal-close-icon"
          onClick={() => setIsRulesModalOpen(false)}
          aria-label="Close rules dialog"
        >
          <X size={20} />
        </button>

        <div className="rules-modal-header">
          <div className="rules-icon-wrap">
            <BookOpen size={24} />
          </div>
          <div>
            <span className="modal-kicker">OFFICIAL TERMS</span>
            <h2 className="modal-title">Giveaway Rules & Guidelines</h2>
          </div>
        </div>

        <div className="rules-scroll-area">
          <p className="rules-intro">
            Please read these guidelines carefully. All VELOOP Giveaways are conducted under strict
            compliance with our community reward terms to guarantee fair, legitimate participant experiences.
          </p>

          <div className="rules-sections-list">
            {giveawayRulesData.map((section, idx) => (
              <div className="rule-section-block" key={idx}>
                <h3 className="rule-section-title">{section.title}</h3>
                <ul className="rule-points-list">
                  {section.points.map((pt, pIdx) => (
                    <li key={pIdx}>
                      <ShieldCheck size={14} className="point-bullet" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="rules-modal-footer">
          <button className="rules-confirm-btn" onClick={() => setIsRulesModalOpen(false)}>
            <Check size={16} />
            <span>I Understand & Agree</span>
          </button>
        </div>
      </div>
    </div>
  );
}
