import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import confetti from "canvas-confetti";
import { currentGiveawayData, demoUserProfiles } from "../data/giveawayData";
import {
  initialTasksData,
  partnerAuditData,
  initialStreakData,
  luckyWheelSlices,
  levelTiersData,
  userMissionsData,
  achievementBadgesData,
  referralProgramData,
  withdrawalMethodsData,
  initialTransactionsLedger,
  initialSupportTickets,
  validGiveawayCodes,
  trustMetricsData,
  leaderboardData
} from "../data/gptPlatformData";

const GiveawayContext = createContext(null);

export function GiveawayProvider({ children }) {
  // Navigation / Route state:
  // "giveaways" | "details" | "earn" | "daily" | "wallet" | "referrals" | "trust" | "research-report"
  const [currentRoute, setCurrentRoute] = useState("giveaways");
  const [selectedSlug, setSelectedSlug] = useState("iphone-15-pro");

  // Giveaway status state: "ACTIVE" | "ENDED" | "UPCOMING"
  const [giveawayStatus, setGiveawayStatus] = useState("ACTIVE");

  // User persona role for demo & state verification:
  // "visitor" | "participant" | "winner" | "nonWinner" | "lowBalance"
  const [userRole, setUserRole] = useState("participant");

  // User Balances & Joined Prizes Set
  const [balances, setBalances] = useState(demoUserProfiles.participant.balances);
  const [joinedPrizes, setJoinedPrizes] = useState(new Set(["PRIZE-001"]));

  // Winner claim status: "NOT_SUBMITTED" | "SUBMITTED" | "PROCESSING" | "COMPLETED"
  const [claimStatus, setClaimStatus] = useState("NOT_SUBMITTED");
  const [claimData, setClaimData] = useState(null);

  // Active sub-tab inside pages
  const [activeTab, setActiveTab] = useState("giveaways");

  // Modals state
  const [confirmPrize, setConfirmPrize] = useState(null);
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isGiveawayCodeModalOpen, setIsGiveawayCodeModalOpen] = useState(false);
  const [isDisputeModalOpen, setIsDisputeModalOpen] = useState(false);
  const [disputingTask, setDisputingTask] = useState(null);
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);
  const [selectedWithdrawalMethod, setSelectedWithdrawalMethod] = useState(withdrawalMethodsData[0]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Global Page / Component Loader State
  const [isLoading, setIsLoading] = useState(false);

  // Feedback Toast
  const [toast, setToast] = useState(null);

  // Countdown timer state for active giveaway
  const [timeLeft, setTimeLeft] = useState(currentGiveawayData.timeRemainingSeconds);

  // Task & Offerwall State
  const [tasks, setTasks] = useState(initialTasksData);
  const [supportTickets, setSupportTickets] = useState(initialSupportTickets);
  const [transactions, setTransactions] = useState(initialTransactionsLedger);

  // Daily Streak State
  const [streakState, setStreakState] = useState(initialStreakData);

  // Lucky Wheel State
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState(null);
  const [spinCooldown, setSpinCooldown] = useState(0);

  // Level & XP State
  const [userXP, setUserXP] = useState(3400); // Level 3 Gold
  const [missions, setMissions] = useState(userMissionsData);
  const [badges, setBadges] = useState(achievementBadgesData);

  // Referral State
  const [referralState, setReferralState] = useState(referralProgramData);

  // Notifications State
  const [notifications, setNotifications] = useState([
    {
      id: "NOTIF-01",
      title: "🎉 BitLabs Survey Credited",
      body: "You earned 220 VEs (₹22.00) for completing the Daily Digital Payments Study.",
      timestamp: "10 mins ago",
      type: "EARNING",
      isRead: false
    },
    {
      id: "NOTIF-02",
      title: "🔥 Day 4 Streak Active!",
      body: "Check in today before midnight IST to preserve your 4-day streak.",
      timestamp: "2 hours ago",
      type: "STREAK",
      isRead: false
    },
    {
      id: "NOTIF-03",
      title: "🎁 Mega Summer Draw Closing Soon",
      body: "Only 12 days left to enter the iPhone 15 Pro Titanium draw with your VEs.",
      timestamp: "1 day ago",
      type: "GIVEAWAY",
      isRead: true
    }
  ]);

  // Sync balances and joined state when userRole is switched via the toolbar
  useEffect(() => {
    const profile = demoUserProfiles[userRole];
    if (profile) {
      setBalances({ ...profile.balances });
      setJoinedPrizes(new Set(profile.joinedPrizeIds || []));
      if (profile.claimStatus) {
        setClaimStatus(profile.claimStatus);
      } else {
        setClaimStatus("NOT_SUBMITTED");
      }
    }
  }, [userRole]);

  // Live countdown timer countdown logic
  useEffect(() => {
    if (giveawayStatus !== "ACTIVE") return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGiveawayStatus("ENDED");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [giveawayStatus]);

  // Spin cooldown interval
  useEffect(() => {
    if (spinCooldown <= 0) return;
    const interval = setInterval(() => {
      setSpinCooldown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [spinCooldown]);

  // Compute Days, Hours, Minutes, Seconds from timeLeft
  const formatTimer = useCallback(() => {
    const days = Math.floor(timeLeft / (3600 * 24));
    const hours = Math.floor((timeLeft % (3600 * 24)) / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;
    return {
      days,
      hours: String(hours).padStart(2, "0"),
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(seconds).padStart(2, "0")
    };
  }, [timeLeft]);

  // Toast helper
  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  }, []);

  // Confetti celebration helper
  const triggerConfetti = useCallback(() => {
    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ["#a855f7", "#6366f1", "#3b82f6", "#10b981", "#f59e0b", "#ec4899"]
      });
    } catch {
      // fallback
    }
  }, []);

  // Navigation handlers
  const navigateToHome = useCallback(() => {
    setCurrentRoute("giveaways");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const navigateToRoute = useCallback((route) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const navigateToGiveaway = useCallback((slug) => {
    setSelectedSlug(slug);
    setCurrentRoute("details");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Balance checking utility for Giveaways
  const checkBalanceEligibility = useCallback(
    (prize) => {
      const required = prize.entryFee;
      const available = balances[prize.currency] || 0;
      return {
        isEligible: available >= required,
        available,
        required,
        currency: prize.currency,
        deficit: Math.max(0, required - available)
      };
    },
    [balances]
  );

  // Join Giveaway Handler
  const handleConfirmJoin = useCallback(
    async (prize) => {
      if (userRole === "visitor") {
        setConfirmPrize(null);
        setIsLoginModalOpen(true);
        return;
      }

      const { isEligible, required, currency, deficit } = checkBalanceEligibility(prize);
      if (!isEligible) {
        showToast(`Insufficient ${currency}. You need ${deficit} more ${currency} to participate.`, "error");
        return;
      }

      // Simulate atomic backend deduction
      setIsLoading(true);
      await new Promise((res) => setTimeout(res, 600));

      setBalances((prev) => ({
        ...prev,
        [currency]: prev[currency] - required
      }));

      setJoinedPrizes((prev) => new Set([...prev, prize.id]));

      // Add to transaction ledger
      setTransactions((prev) => [
        {
          id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
          title: `${prize.name} Entry Ticket`,
          type: "GIVEAWAY_ENTRY",
          currency: currency,
          amount: `-${required}`,
          amountINR: `-${currency === "VEs" ? "₹" + (required / 10).toFixed(2) : required + " " + currency}`,
          date: "Just now",
          status: "Completed",
          provider: "Giveaway Draw",
          category: "Giveaway"
        },
        ...prev
      ]);

      setIsLoading(false);
      setConfirmPrize(null);

      triggerConfetti();
      showToast(`🎉 You're in! Entry confirmed for ${prize.name}. ${required} ${currency} deducted.`, "success");
    },
    [userRole, checkBalanceEligibility, showToast, triggerConfetti]
  );

  // Submit Prize Claim Handler
  const handleSubmitClaim = useCallback(
    async (prizeId, formData) => {
      setIsLoading(true);
      await new Promise((res) => setTimeout(res, 750));
      setClaimData(formData);
      setClaimStatus("SUBMITTED");
      setIsLoading(false);
      setIsClaimModalOpen(false);
      triggerConfetti();
      showToast("✓ Claim submitted! Our verification team is processing your verified reward.", "success");
    },
    [triggerConfetti, showToast]
  );

  // -------------------------------------------------------------
  // GPT TASK & OFFERWALL HANDLERS
  // -------------------------------------------------------------

  // Start an offer
  const handleStartTask = useCallback((taskId) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          return {
            ...t,
            status: "STARTED",
            startedAt: new Date().toISOString()
          };
        }
        return t;
      })
    );
    showToast("Task initialized! Complete all required advertiser steps to receive credit.", "info");
  }, [showToast]);

  // Open Dispute Modal for missing credit
  const handleOpenDispute = useCallback((task) => {
    setDisputingTask(task);
    setIsDisputeModalOpen(true);
  }, []);

  // Submit Dispute / Missing Credit Ticket
  const handleSubmitDispute = useCallback((disputeData) => {
    setIsLoading(true);
    setTimeout(() => {
      const ticketId = `TCK-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const newTicket = {
        ticketId,
        taskId: disputeData.taskId,
        subject: disputeData.subject || `Missing Credit: ${disputeData.taskName}`,
        dateSubmitted: "Today",
        status: "INVESTIGATING",
        lastUpdate: "Dispute submitted with verification logs. Escalated to advertiser audit desk.",
        resolutionEta: "Within 24 - 48 Hours",
        category: "Missing Credit Dispute"
      };

      setSupportTickets((prev) => [newTicket, ...prev]);

      // Update task status if it was rejected
      setTasks((prev) =>
        prev.map((t) =>
          t.id === disputeData.taskId ? { ...t, status: "PENDING_VERIFICATION", canDispute: false } : t
        )
      );

      setIsLoading(false);
      setIsDisputeModalOpen(false);
      setDisputingTask(null);
      showToast(`Dispute Ticket ${ticketId} created! Our auditor desk will review within 24-48 hours.`, "success");
    }, 600);
  }, [showToast]);

  // Simulate Instant Task Crediting (For evaluators / testing)
  const handleSimulateCreditTask = useCallback((taskId) => {
    const task = tasks.find((t) => t.id === taskId) || tasks[0];
    if (!task) return;

    setIsLoading(true);
    setTimeout(() => {
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? { ...t, status: "CREDITED", completedAt: new Date().toISOString() } : t))
      );

      // Add balance
      setBalances((prev) => ({
        ...prev,
        VEs: prev.VEs + task.rewardVEs,
        Tokens: prev.Tokens + task.rewardTokens
      }));

      // Add transaction
      setTransactions((prev) => [
        {
          id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
          title: `${task.provider}: ${task.name}`,
          type: "EARNING",
          currency: "VEs",
          amount: `+${task.rewardVEs}`,
          amountINR: `+₹${(task.rewardVEs / 10).toFixed(2)}`,
          date: "Just now",
          status: "Credited",
          provider: task.provider,
          category: task.category
        },
        ...prev
      ]);

      // Add notification
      setNotifications((prev) => [
        {
          id: `NOTIF-${Date.now()}`,
          title: `✅ ${task.provider} Task Credited`,
          body: `You received +${task.rewardVEs} VEs & +${task.rewardTokens} Tokens for "${task.name}".`,
          timestamp: "Just now",
          type: "EARNING",
          isRead: false
        },
        ...prev
      ]);

      setUserXP((prev) => prev + 150);
      setIsLoading(false);
      triggerConfetti();
      showToast(`🎉 Credited! Received +${task.rewardVEs} VEs and +${task.rewardTokens} Tokens.`, "success");
    }, 600);
  }, [tasks, showToast, triggerConfetti]);

  // -------------------------------------------------------------
  // DAILY CHECK-IN STREAK HANDLERS
  // -------------------------------------------------------------

  const handleClaimDailyStreak = useCallback(() => {
    if (streakState.claimedToday) {
      showToast("You have already claimed today's daily streak reward! Next reset in 14 hours.", "info");
      return;
    }

    const todayDay = streakState.days[streakState.currentStreak - 1] || streakState.days[0];
    const rewardVEs = todayDay.rewardVEs;
    const rewardTokens = todayDay.rewardTokens;

    setStreakState((prev) => ({
      ...prev,
      claimedToday: true,
      days: prev.days.map((d, idx) => (idx === prev.currentStreak - 1 ? { ...d, claimed: true } : d))
    }));

    setBalances((prev) => ({
      ...prev,
      VEs: prev.VEs + rewardVEs,
      Tokens: prev.Tokens + rewardTokens
    }));

    setTransactions((prev) => [
      {
        id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
        title: `Day ${streakState.currentStreak} Check-in Streak Bonus`,
        type: "BONUS",
        currency: "VEs",
        amount: `+${rewardVEs}`,
        amountINR: `+₹${(rewardVEs / 10).toFixed(2)}`,
        date: "Just now",
        status: "Credited",
        provider: "VELOOP Streak",
        category: "Streak"
      },
      ...prev
    ]);

    setUserXP((prev) => prev + 100);
    triggerConfetti();
    showToast(`🔥 Streak Day ${streakState.currentStreak} claimed! +${rewardVEs} VEs & +${rewardTokens} Tokens added.`, "success");
  }, [streakState, showToast, triggerConfetti]);

  // -------------------------------------------------------------
  // LUCKY SPIN WHEEL HANDLERS
  // -------------------------------------------------------------

  const handleSpinWheel = useCallback(() => {
    if (isSpinning) return;
    if (spinCooldown > 0) {
      showToast(`Wheel on cooldown! Next free spin available in ${spinCooldown} seconds.`, "info");
      return;
    }

    setIsSpinning(true);
    setSpinResult(null);

    // Pick a random slice weighted towards fair probabilities
    const randomIndex = Math.floor(Math.random() * luckyWheelSlices.length);
    const winningSlice = luckyWheelSlices[randomIndex];

    // Simulate 3.5s spin rotation
    setTimeout(() => {
      setIsSpinning(false);
      setSpinResult(winningSlice);
      setSpinCooldown(30); // 30s demo cooldown

      setBalances((prev) => ({
        ...prev,
        [winningSlice.currency]: (prev[winningSlice.currency] || 0) + winningSlice.value
      }));

      setTransactions((prev) => [
        {
          id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
          title: `Lucky Wheel Prize: ${winningSlice.label}`,
          type: "BONUS",
          currency: winningSlice.currency,
          amount: `+${winningSlice.value}`,
          amountINR: winningSlice.currency === "VEs" ? `+₹${(winningSlice.value / 10).toFixed(2)}` : `+${winningSlice.value} ${winningSlice.currency}`,
          date: "Just now",
          status: "Credited",
          provider: "Lucky Spin Wheel",
          category: "Gamification"
        },
        ...prev
      ]);

      triggerConfetti();
      showToast(`🎡 Jackpot Spin! You won ${winningSlice.label}! Credited immediately.`, "success");
    }, 3600);
  }, [isSpinning, spinCooldown, showToast, triggerConfetti]);

  // -------------------------------------------------------------
  // PROMO / GIVEAWAY CODE REDEMPTION (from Ref_01.jpeg)
  // -------------------------------------------------------------

  const handleRedeemGiveawayCode = useCallback(
    (inputCode) => {
      const codeUpper = (inputCode || "").trim().toUpperCase();
      const match = validGiveawayCodes[codeUpper];

      if (!match) {
        showToast("Invalid giveaway code. Try VELOOP2026, NAYABVIP, or BONUS100.", "error");
        return false;
      }

      setIsLoading(true);
      setTimeout(() => {
        setBalances((prev) => ({
          ...prev,
          VEs: prev.VEs + match.rewardVEs,
          Tokens: prev.Tokens + match.rewardTokens
        }));

        setTransactions((prev) => [
          {
            id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
            title: `Giveaway Code Redeemed: ${match.code}`,
            type: "BONUS",
            currency: "VEs",
            amount: `+${match.rewardVEs}`,
            amountINR: `+₹${(match.rewardVEs / 10).toFixed(2)}`,
            date: "Just now",
            status: "Credited",
            provider: "Code Redemption",
            category: "Promo"
          },
          ...prev
        ]);

        setIsLoading(false);
        setIsGiveawayCodeModalOpen(false);
        triggerConfetti();
        showToast(`🎁 Code '${match.code}' redeemed! +${match.rewardVEs} VEs & +${match.rewardTokens} Tokens added to your wallet!`, "success");
      }, 700);

      return true;
    },
    [showToast, triggerConfetti]
  );

  // -------------------------------------------------------------
  // WITHDRAWAL HANDLERS
  // -------------------------------------------------------------

  const handleRequestWithdrawal = useCallback(
    async (method, amountINR, destinationDetail) => {
      const requiredVEs = amountINR * 10;
      if (balances.VEs < requiredVEs) {
        showToast(`Insufficient VEs. You need ${requiredVEs} VEs for a ₹${amountINR} cash-out.`, "error");
        return false;
      }

      if (amountINR < method.minWithdrawalINR) {
        showToast(`Minimum cash-out for ${method.name} is ₹${method.minWithdrawalINR}.`, "error");
        return false;
      }

      setIsLoading(true);
      await new Promise((res) => setTimeout(res, 800));

      setBalances((prev) => ({
        ...prev,
        VEs: prev.VEs - requiredVEs
      }));

      const txnId = `TXN-${Math.floor(1000 + Math.random() * 9000)}`;
      setTransactions((prev) => [
        {
          id: txnId,
          title: `${method.name} to ${destinationDetail}`,
          type: "WITHDRAWAL",
          currency: "VEs",
          amount: `-${requiredVEs}`,
          amountINR: `-₹${amountINR.toFixed(2)}`,
          date: "Processing now",
          status: "Processing",
          provider: method.name,
          category: "Cashout"
        },
        ...prev
      ]);

      setIsLoading(false);
      setIsWithdrawalModalOpen(false);
      triggerConfetti();
      showToast(`💸 Withdrawal initiated! ₹${amountINR} via ${method.name} will arrive ${method.processingTime}.`, "success");
      return true;
    },
    [balances.VEs, showToast, triggerConfetti]
  );

  // -------------------------------------------------------------
  // NOTIFICATIONS HANDLERS
  // -------------------------------------------------------------

  const markAllNotificationsAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    showToast("All notifications marked as read.", "info");
  }, [showToast]);

  // -------------------------------------------------------------
  // RESET DEMO TO FRESH STATE
  // -------------------------------------------------------------

  const handleResetDemo = useCallback(() => {
    setUserRole("participant");
    setGiveawayStatus("ACTIVE");
    setTimeLeft(currentGiveawayData.timeRemainingSeconds);
    setBalances({ ...demoUserProfiles.participant.balances });
    setJoinedPrizes(new Set(["PRIZE-001"]));
    setClaimStatus("NOT_SUBMITTED");
    setClaimData(null);
    setCurrentRoute("giveaways");
    setTasks(initialTasksData);
    setStreakState(initialStreakData);
    setTransactions(initialTransactionsLedger);
    setSupportTickets(initialSupportTickets);
    showToast("Demo environment reset to initial Participant state.", "info");
  }, [showToast]);

  const value = {
    // Routing
    currentRoute,
    setCurrentRoute,
    selectedSlug,
    navigateToHome,
    navigateToRoute,
    navigateToGiveaway,
    activeTab,
    setActiveTab,

    // Giveaway & User State
    giveawayStatus,
    setGiveawayStatus,
    userRole,
    setUserRole,
    currentUser: demoUserProfiles[userRole] || demoUserProfiles.visitor,
    balances,
    setBalances,
    joinedPrizes,
    claimStatus,
    setClaimStatus,
    claimData,
    timeLeft,
    formatTimer,
    checkBalanceEligibility,
    handleConfirmJoin,
    handleSubmitClaim,

    // Tasks & Offerwalls
    tasks,
    setTasks,
    partnerAuditData,
    handleStartTask,
    handleOpenDispute,
    handleSubmitDispute,
    handleSimulateCreditTask,
    supportTickets,
    disputingTask,

    // Streaks & Wheel
    streakState,
    handleClaimDailyStreak,
    luckyWheelSlices,
    handleSpinWheel,
    isSpinning,
    spinResult,
    spinCooldown,

    // Levels, Missions & Badges
    userXP,
    setUserXP,
    levelTiersData,
    missions,
    badges,

    // Referrals
    referralState,
    setReferralState,

    // Wallet & Withdrawals
    withdrawalMethodsData,
    transactions,
    handleRequestWithdrawal,
    selectedWithdrawalMethod,
    setSelectedWithdrawalMethod,

    // Promo Codes
    validGiveawayCodes,
    handleRedeemGiveawayCode,

    // Modals
    confirmPrize,
    setConfirmPrize,
    isClaimModalOpen,
    setIsClaimModalOpen,
    isRulesModalOpen,
    setIsRulesModalOpen,
    isLoginModalOpen,
    setIsLoginModalOpen,
    isGiveawayCodeModalOpen,
    setIsGiveawayCodeModalOpen,
    isDisputeModalOpen,
    setIsDisputeModalOpen,
    isWithdrawalModalOpen,
    setIsWithdrawalModalOpen,
    isNotificationsOpen,
    setIsNotificationsOpen,

    // Notifications
    notifications,
    markAllNotificationsAsRead,

    // Trust & Leaderboard
    trustMetricsData,
    leaderboardData,

    // Global UI
    isLoading,
    setIsLoading,
    toast,
    showToast,
    triggerConfetti,
    handleResetDemo
  };

  return <GiveawayContext.Provider value={value}>{children}</GiveawayContext.Provider>;
}

export function useGiveaway() {
  const context = useContext(GiveawayContext);
  if (!context) {
    throw new Error("useGiveaway must be used within a GiveawayProvider");
  }
  return context;
}
