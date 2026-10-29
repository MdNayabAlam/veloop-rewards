import React from "react";
import { GiveawayProvider, useGiveaway } from "./context/GiveawayContext";
import DemoToolbar from "./components/DemoToolbar/DemoToolbar";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

// Pages
import GiveawayHome from "./pages/GiveawayHome/GiveawayHome";
import IndividualGiveaway from "./pages/IndividualGiveaway/IndividualGiveaway";
import EarnOffers from "./pages/EarnOffers/EarnOffers";
import DailyRewards from "./pages/DailyRewards/DailyRewards";
import WalletPage from "./pages/WalletPage/WalletPage";
import ReferralPage from "./pages/ReferralPage/ReferralPage";
import TrustDashboard from "./pages/TrustDashboard/TrustDashboard";
import ResearchReport from "./pages/ResearchReport/ResearchReport";

// Modals & Overlays
import ConfirmationModal from "./components/ConfirmationModal/ConfirmationModal";
import PrizeClaimModal from "./components/PrizeClaimModal/PrizeClaimModal";
import GiveawayRulesModal from "./components/GiveawayRulesModal/GiveawayRulesModal";
import LoginModal from "./components/LoginModal/LoginModal";
import GiveawayCodeModal from "./components/GiveawayCodeModal/GiveawayCodeModal";
import DisputeModal from "./components/DisputeModal/DisputeModal";
import WithdrawalModal from "./components/WithdrawalModal/WithdrawalModal";
import NotificationsDrawer from "./components/NotificationsDrawer/NotificationsDrawer";
import GiveawayLoader from "./components/GiveawayLoader/GiveawayLoader";
import Toast from "./components/Toast/Toast";
import "./App.css";

function AppContent() {
  const { currentRoute, isLoading } = useGiveaway();

  return (
    <div className="veloop-rewards-app">
      {/* Live Dev Simulator Toolbar to test all states & personas */}
      <DemoToolbar />

      {/* Main Navbar with Balances Pill & Navigation */}
      <Navbar />

      {/* Dynamic Page Router */}
      <main>
        {currentRoute === "giveaways" && <GiveawayHome />}
        {currentRoute === "details" && <IndividualGiveaway />}
        {currentRoute === "earn" && <EarnOffers />}
        {currentRoute === "daily" && <DailyRewards />}
        {currentRoute === "wallet" && <WalletPage />}
        {currentRoute === "referrals" && <ReferralPage />}
        {currentRoute === "trust" && <TrustDashboard />}
        {currentRoute === "research-report" && <ResearchReport />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Interactive Modals & Drawers */}
      <ConfirmationModal />
      <PrizeClaimModal />
      <GiveawayRulesModal />
      <LoginModal />
      <GiveawayCodeModal />
      <DisputeModal />
      <WithdrawalModal />
      <NotificationsDrawer />
      {isLoading && <GiveawayLoader />}
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <GiveawayProvider>
      <AppContent />
    </GiveawayProvider>
  );
}
