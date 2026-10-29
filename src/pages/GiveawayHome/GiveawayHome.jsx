import React from "react";
import HeroBanner from "../../components/HeroBanner/HeroBanner";
import GiveawayStats from "../../components/GiveawayStats/GiveawayStats";
import MainGiveawaySection from "../../components/MainGiveawaySection/MainGiveawaySection";
import TrustSection from "../../components/TrustSection/TrustSection";
import ExclusiveRewardsBanner from "../../components/ExclusiveRewardsBanner/ExclusiveRewardsBanner";
import WinnerSpotlight from "../../components/WinnerSpotlight/WinnerSpotlight";
import WinnerSlider from "../../components/WinnerSlider/WinnerSlider";
import WinnersSection from "../../components/WinnersSection/WinnersSection";
import FAQSection from "../../components/FAQSection/FAQSection";

export default function GiveawayHome() {
  return (
    <div className="giveaway-home-page">
      {/* 1. Hero Banner matching Ref_02.jpeg */}
      <HeroBanner />

      {/* 2. 4-Stat Bar matching Ref_02.jpeg */}
      <GiveawayStats />

      {/* 3. Main 2-Column Section (Featured Giveaways + How to Participate) matching Ref_02.jpeg */}
      <MainGiveawaySection />

      {/* 4. 4-Pill Trust Section matching Ref_02.jpeg */}
      <TrustSection />

      {/* 5. Exclusive Giveaway Rewards Banner matching Ref_01.jpeg */}
      <ExclusiveRewardsBanner />

      {/* 6. Winner Spotlight (Displays for winning persona or draw conclusions) */}
      <WinnerSpotlight />

      {/* 7. Real-Time Live Winners Ticker */}
      <WinnerSlider />

      {/* 8. Past Winners & Provably Fair Audit Trail */}
      <WinnersSection />

      {/* 9. Comprehensive FAQs */}
      <FAQSection />
    </div>
  );
}

