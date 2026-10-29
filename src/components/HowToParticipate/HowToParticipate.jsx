import React from "react";
import { useGiveaway } from "../../context/GiveawayContext";
import { UserCheck, CheckSquare, Coins, Trophy, ArrowRight, BookOpen } from "lucide-react";
import "./HowToParticipate.css";

export default function HowToParticipate() {
  const { setIsRulesModalOpen } = useGiveaway();

  const steps = [
    {
      num: "01",
      icon: <UserCheck size={22} />,
      color: "purple",
      title: "Sign Up / Login",
      desc: "Create your verified VELOOP account to access the reward ecosystem and connect your wallet."
    },
    {
      num: "02",
      icon: <CheckSquare size={22} />,
      color: "blue",
      title: "Complete Tasks",
      desc: "Complete simple daily activities, referrals, and challenges to earn VEs, SVEs, and community Tokens."
    },
    {
      num: "03",
      icon: <Coins size={22} />,
      color: "green",
      title: "Enter Giveaways",
      desc: "Select your preferred prize, review the required entry currency, and confirm your verified participation."
    },
    {
      num: "04",
      icon: <Trophy size={22} />,
      color: "orange",
      title: "Win & Claim",
      desc: "Winners are selected transparently after the draw closes. Fill in your claim details to receive your reward."
    }
  ];

  return (
    <section className="how-to-participate-section" id="how-to-participate">
      <div className="section-container">
        <div className="how-header">
          <span className="section-kicker">SIMPLE · EXCITING · REWARDING</span>
          <h2 className="section-title">How to Participate?</h2>
          <p className="section-desc">
            Four simple steps stand between you and certified premium rewards.
          </p>
        </div>

        <div className="timeline-grid">
          {steps.map((step, index) => (
            <div className={`timeline-card ${step.color}`} key={step.num}>
              <div className="timeline-card-header">
                <div className="timeline-icon-box">
                  {step.icon}
                </div>
                <span className="timeline-num">{step.num}</span>
              </div>

              <div className="timeline-card-content">
                <h3 className="timeline-title">{step.title}</h3>
                <p className="timeline-desc">{step.desc}</p>
              </div>

              {index < steps.length - 1 && (
                <div className="timeline-connector">
                  <ArrowRight size={16} />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="rules-cta-bar">
          <div className="rules-cta-text">
            <h4>Need more details on eligibility and terms?</h4>
            <p>Review the full official VELOOP Giveaway Rules & Guidelines.</p>
          </div>
          <button className="open-rules-btn" onClick={() => setIsRulesModalOpen(true)}>
            <BookOpen size={16} />
            <span>View Rules & Guidelines</span>
          </button>
        </div>
      </div>
    </section>
  );
}
