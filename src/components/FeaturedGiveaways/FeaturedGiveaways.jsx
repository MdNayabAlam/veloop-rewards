import React from "react";
import { useGiveaway } from "../../context/GiveawayContext";
import { currentGiveawayData } from "../../data/giveawayData";
import { Users, Clock, Zap, ArrowUpRight, CheckCircle2 } from "lucide-react";
import "./FeaturedGiveaways.css";

export default function FeaturedGiveaways() {
  const { navigateToGiveaway, joinedPrizes, giveawayStatus } = useGiveaway();

  return (
    <section className="featured-giveaways-section" id="featured-giveaways">
      <div className="section-container">
        <div className="section-header">
          <div className="section-header-left">
            <span className="section-kicker">HANDPICKED FOR YOU</span>
            <h2 className="section-title">✦ Featured Giveaways</h2>
            <p className="section-desc">
              Good things happen when you participate. Each giveaway features certified, guaranteed prize rewards.
            </p>
          </div>

          <button
            className="explore-all-btn"
            onClick={() => {
              const el = document.getElementById("featured-giveaways");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span>Explore All</span>
            <ArrowUpRight size={16} />
          </button>
        </div>

        <div className="giveaway-cards-grid">
          {currentGiveawayData.prizes.map((prize) => {
            const isJoined = joinedPrizes.has(prize.id);

            return (
              <article
                className={`reward-card ${prize.color} ${isJoined ? "card-joined" : ""}`}
                key={prize.id}
                onClick={() => navigateToGiveaway(prize.slug)}
              >
                {/* Top Badge & Direct Details Button */}
                <div className="reward-card-top">
                  <span className="rank-badge">{prize.position}</span>
                  <button
                    className="card-icon-link"
                    aria-label={`Open details for ${prize.name}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateToGiveaway(prize.slug);
                    }}
                  >
                    <ArrowUpRight size={17} />
                  </button>
                </div>

                {/* Prize Image Visual with Ambient Radial Glow */}
                <div className="prize-visual-box">
                  <div className="prize-asset-wrap">
                    <img
                      src={prize.image}
                      alt={prize.name}
                      className="prize-product-img"
                      loading="lazy"
                    />
                  </div>
                  <span className="estimated-value-pill">{prize.value}</span>
                </div>

                {/* Card Body Content */}
                <div className="reward-card-body">
                  <h3 className="prize-card-title">{prize.name}</h3>
                  <p className="prize-card-spec">{prize.spec}</p>

                  <div className="prize-meta-row">
                    <span className="meta-item">
                      <Users size={12} /> {prize.participants}
                    </span>
                    <span className="meta-item">
                      <Clock size={12} /> {prize.daysLeft}d left
                    </span>
                    <span className="meta-item fee-item">
                      <Zap size={12} /> {prize.entryFee} {prize.currency}
                    </span>
                  </div>

                  <button
                    className={`card-action-btn ${isJoined ? "joined" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateToGiveaway(prize.slug);
                    }}
                  >
                    {isJoined ? (
                      <>
                        <CheckCircle2 size={15} />
                        <span>Participating</span>
                      </>
                    ) : giveawayStatus === "ENDED" ? (
                      <>
                        <span>View Draw Result</span>
                        <ArrowUpRight size={15} />
                      </>
                    ) : (
                      <>
                        <span>Join for {prize.entryFee} {prize.currency}</span>
                        <ArrowUpRight size={15} />
                      </>
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <p className="giveaways-footnote">
          ✦ Every giveaway is independently audited. Prize fulfillment is handled directly by VELOOP Rewards.
        </p>
      </div>
    </section>
  );
}
