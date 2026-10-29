import React from "react";
import { ShieldCheck, Lock, Award, Headphones } from "lucide-react";
import "./TrustSection.css";

export default function TrustSection() {
  const pillars = [
    {
      icon: <ShieldCheck size={22} />,
      color: "purple",
      title: "100% Fair & Transparent",
      desc: "All giveaways are conducted fairly and transparently."
    },
    {
      icon: <Lock size={22} />,
      color: "blue",
      title: "Secure & Safe",
      desc: "Your data and privacy are our top priority."
    },
    {
      icon: <Award size={22} />,
      color: "green",
      title: "Trusted by 10K+ Users",
      desc: "Join thousands of happy users who trust VELoop Rewards."
    },
    {
      icon: <Headphones size={22} />,
      color: "orange",
      title: "24/7 Customer Support",
      desc: "We're here to help you anytime, anywhere."
    }
  ];

  return (
    <section className="veloop-trust-section">
      <div className="section-container">
        <div className="trust-grid">
          {pillars.map((item, idx) => (
            <div className={`trust-card ${item.color}`} key={idx}>
              <div className="trust-icon-wrap">
                {item.icon}
              </div>
              <div className="trust-body">
                <h3 className="trust-title">{item.title}</h3>
                <p className="trust-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
