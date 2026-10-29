import React from "react";
import { useGiveaway } from "../../context/GiveawayContext";
import BrandLogo from "../BrandLogo/BrandLogo";
import { ShieldCheck, Mail, FileText, CheckCircle2 } from "lucide-react";
import "./Footer.css";

export default function Footer() {
  const { navigateToRoute, setIsRulesModalOpen } = useGiveaway();

  return (
    <footer className="veloop-footer">
      <div className="footer-inner">
        <div className="footer-top-grid">
          <div className="footer-brand-col">
            <BrandLogo onClick={() => navigateToRoute("giveaways")} size="sm" />
            <p className="footer-mission">
              Empowering users with transparent advertiser offers, verified task tracking, instant India UPI payouts,
              and certified premium giveaways.
            </p>
            <div className="author-credit-tag">
              <span>Prepared for: <strong>VELoop Rewards Internship</strong></span>
              <span>Researcher: <strong>MD Nayab Alam</strong></span>
            </div>
          </div>

          <div className="footer-links-col">
            <h4>Ecosystem</h4>
            <ul>
              <li><button onClick={() => navigateToRoute("giveaways")}>Giveaways Hub</button></li>
              <li><button onClick={() => navigateToRoute("earn")}>Earn Tasks & Surveys</button></li>
              <li><button onClick={() => navigateToRoute("daily")}>Daily Streaks & Wheel</button></li>
              <li><button onClick={() => navigateToRoute("wallet")}>Wallet & India Payouts</button></li>
              <li><button onClick={() => navigateToRoute("referrals")}>Referral Program</button></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4>Trust & Research</h4>
            <ul>
              <li><button onClick={() => navigateToRoute("trust")}>Trust & Transparency</button></li>
              <li><button onClick={() => navigateToRoute("research-report")}>Benchmark Research Report</button></li>
              <li><button onClick={() => setIsRulesModalOpen(true)}>Official Rules & Guidelines</button></li>
              <li><button onClick={() => setIsRulesModalOpen(true)}>Anti-Fraud & Privacy Charter</button></li>
            </ul>
          </div>

          <div className="footer-contact-col">
            <h4>Support & Disputes</h4>
            <p className="support-note">Have questions regarding missing credit or payout status?</p>
            <a href="mailto:support@veloop.io" className="support-email-pill">
              <Mail size={14} />
              <span>support@veloop.io</span>
            </a>
            <div className="compliance-tag">
              <ShieldCheck size={14} />
              <span>24/7 Guaranteed Dispute Resolution</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <p>© 2026 VELOOP Rewards Inc. All rights reserved · Benchmarked against JumpTask, Freecash, Swagbucks, TimeBucks, EarnApp, Pawns.app & Idle-Empire.</p>
          <p className="footer-disclaimer">
            Apple, Amazon, and Sony trademarks belong to their respective owners. Non-endorsed product illustrations used for prize demonstration.
          </p>
        </div>
      </div>
    </footer>
  );
}
