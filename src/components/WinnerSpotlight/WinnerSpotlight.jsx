import React from "react";
import { useGiveaway } from "../../context/GiveawayContext";
import { Trophy, Gift, Clock, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";
import "./WinnerSpotlight.css";

export default function WinnerSpotlight() {
  const { currentUser, claimStatus, setIsClaimModalOpen } = useGiveaway();

  // Certified Winner Spotlight Banner (Always visible with fallback to Apple Watch Series 9)
  const defaultPrize = {
    prizeId: "PRIZE-002",
    prizeName: "Apple Watch Series 9",
    prizePosition: "2ND PRIZE",
    image: "/assets/watch.png",
    value: "₹41,900",
    type: "PHYSICAL",
    deadline: "7 Days Remaining"
  };

  const prize = currentUser?.wonPrize || defaultPrize;
  const currentClaimStatus = claimStatus || "NOT_SUBMITTED";

  return (
    <div className="winner-spotlight-banner" id="winner-spotlight">
      <div className="spotlight-inner">
        <div className="spotlight-left">
          <div className="trophy-badge">
            <Trophy size={28} />
          </div>
          <div className="spotlight-text">
            <span className="congrats-kicker">🎉 CONGRATULATIONS! YOU WON!</span>
            <h2 className="spotlight-prize-title">{prize.prizeName}</h2>
            <p className="spotlight-desc">
              Your ticket was drawn as an official certified winner in the VELOOP Rewards Giveaway!
            </p>

            <div className="spotlight-meta-tags">
              <span className="meta-tag deadline">
                <Clock size={13} /> Claim within {prize.deadline}
              </span>
              <span className="meta-tag verified">
                <ShieldCheck size={13} /> Verified Winner Status
              </span>
            </div>
          </div>
        </div>

        <div className="spotlight-prize-preview">
          <img src={prize.image} alt={prize.prizeName} className="spotlight-img" />
        </div>

        <div className="spotlight-action-col">
          {currentClaimStatus === "NOT_SUBMITTED" && (
            <button className="claim-now-cta" onClick={() => setIsClaimModalOpen(true)}>
              <Gift size={16} />
              <span>Claim Your Prize</span>
              <ArrowRight size={16} />
            </button>
          )}

          {currentClaimStatus === "SUBMITTED" && (
            <div className="claim-status-pill submitted">
              <CheckCircle2 size={16} />
              <div>
                <strong>Claim Submitted</strong>
                <small>Address verification in progress</small>
              </div>
            </div>
          )}

          {currentClaimStatus === "PROCESSING" && (
            <div className="claim-status-pill processing">
              <Clock size={16} />
              <div>
                <strong>Fulfillment In Progress</strong>
                <small>Courier tracking ID pending</small>
              </div>
            </div>
          )}

          {currentClaimStatus === "COMPLETED" && (
            <div className="claim-status-pill completed">
              <CheckCircle2 size={16} />
              <div>
                <strong>Prize Delivered ✓</strong>
                <small>Tracking #VEL-982104</small>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
