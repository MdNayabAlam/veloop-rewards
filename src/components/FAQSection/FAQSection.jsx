import React, { useState } from "react";
import { faqData } from "../../data/giveawayData";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import "./FAQSection.css";

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(0);

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="veloop-faq-section" id="faq-section">
      <div className="section-container">
        <div className="faq-header">
          <span className="section-kicker">GOT QUESTIONS?</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-desc">
            Everything you need to know about VELOOP Rewards Giveaways, currencies, and prize claims.
          </p>
        </div>

        <div className="faq-accordion-list">
          {faqData.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div className={`faq-item ${isOpen ? "open" : ""}`} key={idx}>
                <button
                  className="faq-question-btn"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                >
                  <div className="faq-question-text">
                    <HelpCircle size={17} className="faq-icon" />
                    <span>{item.question}</span>
                  </div>
                  <div className="faq-toggle-icon">
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </button>

                {isOpen && (
                  <div className="faq-answer-panel">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
