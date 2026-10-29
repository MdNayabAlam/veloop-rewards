import React from "react";
import { useGiveaway } from "../../context/GiveawayContext";
import { Gift, Users, Trophy, Clock } from "lucide-react";
import "./GiveawayStats.css";

export default function GiveawayStats() {
  const { formatTimer, giveawayStatus } = useGiveaway();
  const timer = formatTimer();

  return (
    <section className="veloop-stats-section" aria-label="Giveaway statistics">
      <div className="section-container">
        <div className="stats-grid-container">
          {/* 1. Total Giveaways */}
          <div className="stat-card">
            <div className="stat-icon-box purple">
              <Gift size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-subtext">Total Giveaways</span>
              <div className="stat-number-wrap">
                <span className="stat-value">24</span>
                <span className="stat-pill-label purple">Active</span>
              </div>
            </div>
          </div>

          {/* 2. Total Participants */}
          <div className="stat-card">
            <div className="stat-icon-box blue">
              <Users size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-subtext">Total Participants</span>
              <div className="stat-number-wrap">
                <span className="stat-value">8.5K+</span>
                <span className="stat-pill-label blue">Users</span>
              </div>
            </div>
          </div>

          {/* 3. Prizes Won */}
          <div className="stat-card">
            <div className="stat-icon-box green">
              <Trophy size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-subtext">Prizes Won</span>
              <div className="stat-number-wrap">
                <span className="stat-value">1.2K+</span>
                <span className="stat-pill-label green">Rewards</span>
              </div>
            </div>
          </div>

          {/* 4. Ends In */}
          <div className="stat-card countdown-stat-card">
            <div className="stat-icon-box orange">
              <Clock size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-subtext">Ends In</span>
              <div className="stat-number-wrap">
                {giveawayStatus === "ACTIVE" ? (
                  <>
                    <span className="stat-value timer-text">
                      {timer.days}d : {timer.hours}h : {timer.minutes}m
                    </span>
                    <span className="stat-pill-label orange">Remaining</span>
                  </>
                ) : giveawayStatus === "ENDED" ? (
                  <>
                    <span className="stat-value ended-text">Draw Completed</span>
                    <span className="stat-pill-label red">Official</span>
                  </>
                ) : (
                  <>
                    <span className="stat-value timer-text">03d : 12h : 00m</span>
                    <span className="stat-pill-label blue">Upcoming</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
