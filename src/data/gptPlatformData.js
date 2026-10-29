// VELOOP Rewards – Comprehensive GPT Platform & Benchmark Data
// Prepared for: VELoop Rewards Internship Program
// Prepared by: MD Nayab Alam
// Date: 21 October 2026

// 1. Transparent Offerwall & Task Offers
export const initialTasksData = [
  {
    id: "TSK-84920",
    name: "Fintech Consumer Habits Survey",
    category: "Surveys",
    provider: "CPX Research",
    providerLogo: "CPX",
    rewardVEs: 180,
    rewardTokens: 250,
    rewardINR: "₹18.00",
    estimatedTime: "12 mins",
    difficulty: "Easy",
    rating: 4.8,
    completions: "14.2K",
    countrySupport: "India (Localized)",
    requirements: "Age 18+, Active smartphone user in India, Complete all qualification screening questions honestly.",
    terms: "Credits within 15 minutes of completion. Disqualification during screening yields +5 pity Tokens.",
    status: "AVAILABLE", // AVAILABLE | STARTED | PENDING_VERIFICATION | CREDITED | REJECTED
    isIndiaEligible: true
  },
  {
    id: "TSK-84921",
    name: "Raid: Shadow Legends - Reach Level 15",
    category: "Games",
    provider: "Torox",
    providerLogo: "Torox",
    rewardVEs: 850,
    rewardTokens: 1200,
    rewardINR: "₹85.00",
    estimatedTime: "3 - 5 days",
    difficulty: "Medium",
    rating: 4.7,
    completions: "8.9K",
    countrySupport: "India & Global",
    requirements: "New users only. Install via tracking link, enable app tracking permissions, reach Player Level 15 within 14 days.",
    terms: "Tracked via Torox SDK. Screenshot proof of level completion accepted if automatic tracking delays.",
    status: "PENDING_VERIFICATION",
    startedAt: "2026-10-24T14:30:00Z",
    submittedAt: "2026-10-25T18:00:00Z",
    verificationEta: "Within 24 Hours",
    isIndiaEligible: true
  },
  {
    id: "TSK-84922",
    name: "Daily Digital Payments Study",
    category: "Surveys",
    provider: "BitLabs",
    providerLogo: "BitLabs",
    rewardVEs: 220,
    rewardTokens: 300,
    rewardINR: "₹22.00",
    estimatedTime: "15 mins",
    difficulty: "Easy",
    rating: 4.6,
    completions: "11.1K",
    countrySupport: "India (Tier 1 & 2 Cities)",
    requirements: "Users who actively use UPI apps (PhonePe, Google Pay, Paytm) at least 3 times per week.",
    terms: "Instant crediting upon passing quality validation check.",
    status: "CREDITED",
    completedAt: "2026-10-25T11:20:00Z",
    isIndiaEligible: true
  },
  {
    id: "TSK-84923",
    name: "Watch 5 Short Partner Commercials",
    category: "Videos",
    provider: "TimeWall",
    providerLogo: "TimeWall",
    rewardVEs: 50,
    rewardTokens: 150,
    rewardINR: "₹5.00",
    estimatedTime: "4 mins",
    difficulty: "Very Easy",
    rating: 4.5,
    completions: "32.4K",
    countrySupport: "All India States",
    requirements: "Watch complete 30-second clips without adblockers enabled. Daily cap: 10 video bundles per user.",
    terms: "Credits automatically after each commercial completion.",
    status: "AVAILABLE",
    isIndiaEligible: true
  },
  {
    id: "TSK-84924",
    name: "Flipkart Big Billion Days Cashback",
    category: "Cashback",
    provider: "VELoop Shopping",
    providerLogo: "Cashback",
    rewardVEs: 400,
    rewardTokens: 600,
    rewardINR: "Up to 6.5% Cashback",
    estimatedTime: "Instant click tracking",
    difficulty: "Shopping",
    rating: 4.9,
    completions: "27.5K",
    countrySupport: "India Only",
    requirements: "Click 'Activate Deal', add products to cart and complete payment on Flipkart website/app.",
    terms: "Tracks within 24 hours as Pending. Confirmed 30 days after order delivery without cancellation or return.",
    status: "AVAILABLE",
    isIndiaEligible: true
  },
  {
    id: "TSK-84925",
    name: "AI Image Annotation Microtask",
    category: "Microtasks",
    provider: "Lootably",
    providerLogo: "Lootably",
    rewardVEs: 120,
    rewardTokens: 200,
    rewardINR: "₹12.00",
    estimatedTime: "8 mins",
    difficulty: "Easy",
    rating: 4.4,
    completions: "18.3K",
    countrySupport: "Global / India",
    requirements: "Identify and label objects (cars, pedestrians, traffic signs) across 15 high-res training frames.",
    terms: "Requires 90%+ accuracy score. Automatic review upon submission.",
    status: "STARTED",
    startedAt: "2026-10-26T02:15:00Z",
    isIndiaEligible: true
  },
  {
    id: "TSK-84926",
    name: "Tata Neu App - First Grocery Order",
    category: "Cashback",
    provider: "AdGate Media",
    providerLogo: "AdGate",
    rewardVEs: 650,
    rewardTokens: 900,
    rewardINR: "₹65.00",
    estimatedTime: "1 day tracking",
    difficulty: "Medium",
    rating: 4.8,
    completions: "6.2K",
    countrySupport: "India Only",
    requirements: "Install Tata Neu via link, register with Indian mobile number, and place first BigBasket grocery order min ₹300.",
    terms: "Pending status for 7 days post-delivery. Reversals apply if order is cancelled.",
    status: "AVAILABLE",
    isIndiaEligible: true
  },
  {
    id: "TSK-84927",
    name: "Crypto Trends & Web3 Awareness Quiz",
    category: "Surveys",
    provider: "RevU",
    providerLogo: "RevU",
    rewardVEs: 90,
    rewardTokens: 150,
    rewardINR: "₹9.00",
    estimatedTime: "6 mins",
    difficulty: "Easy",
    rating: 4.3,
    completions: "9.5K",
    countrySupport: "India & Southeast Asia",
    requirements: "Complete a 10-question survey regarding digital asset adoption and Web3 wallet usage.",
    terms: "Instant credit upon completion of the final question.",
    status: "REJECTED",
    startedAt: "2026-10-23T09:10:00Z",
    rejectedReason: "Speeding check failed: survey completed faster than the 4-minute minimum threshold.",
    canDispute: true,
    isIndiaEligible: true
  },
  {
    id: "TSK-84928",
    name: "Monlix Audio Stream Engagement",
    category: "Microtasks",
    provider: "Monlix",
    providerLogo: "Monlix",
    rewardVEs: 70,
    rewardTokens: 100,
    rewardINR: "₹7.00",
    estimatedTime: "10 mins",
    difficulty: "Very Easy",
    rating: 4.5,
    completions: "15.8K",
    countrySupport: "Global",
    requirements: "Listen to indie radio streams with interactive check-in prompt every 5 minutes.",
    terms: "Credits hourly based on listening minutes.",
    status: "AVAILABLE",
    isIndiaEligible: true
  },
  {
    id: "TSK-84929",
    name: "AyeT Studios - Match 3 Puzzle Adventure",
    category: "Games",
    provider: "AyeT Studios",
    providerLogo: "AyeT",
    rewardVEs: 450,
    rewardTokens: 700,
    rewardINR: "₹45.00",
    estimatedTime: "2 days",
    difficulty: "Easy",
    rating: 4.6,
    completions: "12.7K",
    countrySupport: "India (Android Only)",
    requirements: "Download puzzle game, reach Stage 30 within 7 days. In-app purchase not required.",
    terms: "Direct API postback within 2 hours of reaching Stage 30.",
    status: "AVAILABLE",
    isIndiaEligible: true
  },
  {
    id: "TSK-84930",
    name: "AdGem Quick KYC & Account Test",
    category: "Microtasks",
    provider: "AdGem",
    providerLogo: "AdGem",
    rewardVEs: 320,
    rewardTokens: 500,
    rewardINR: "₹32.00",
    estimatedTime: "10 mins",
    difficulty: "Medium",
    rating: 4.2,
    completions: "5.4K",
    countrySupport: "India Only",
    requirements: "Verify email and complete demo account walkthrough on educational trading simulator.",
    terms: "No real money deposit required.",
    status: "AVAILABLE",
    isIndiaEligible: true
  },
  {
    id: "TSK-84931",
    name: "OfferToro Weekly Market Poll",
    category: "Surveys",
    provider: "OfferToro",
    providerLogo: "OfferToro",
    rewardVEs: 110,
    rewardTokens: 180,
    rewardINR: "₹11.00",
    estimatedTime: "7 mins",
    difficulty: "Easy",
    rating: 4.1,
    completions: "8.1K",
    countrySupport: "India Only",
    requirements: "Answer 8 short multiple-choice consumer questions about OTT video subscriptions.",
    terms: "Credits instantly upon submitting the final answer.",
    status: "AVAILABLE",
    isIndiaEligible: true
  }
];

// 2. Partner Audit Table (All 11 named partners from assignment PDF Page 7)
export const partnerAuditData = [
  {
    network: "CPX Research",
    status: "Confirmed Integration",
    tasksOffered: "Online surveys, demographic profiling, opinion polls",
    countrySupport: "India & 120+ countries (high India inventory)",
    trackingMechanism: "Server-to-Server Postback API (Instant to 15m)",
    missingCreditRoute: "Built-in ticket link on survey completion screen",
    rating: "9.6/10",
    verifiedDate: "21 Oct 2026",
    safetyBadge: "Verified Secure"
  },
  {
    network: "Torox",
    status: "Confirmed Integration",
    tasksOffered: "Mobile game milestones, app installs, multi-tiered rewards",
    countrySupport: "Global with active campaigns for India Android users",
    trackingMechanism: "Device Fingerprint & Torox SDK Postback (2h - 24h)",
    missingCreditRoute: "Torox in-app support tab with screenshot upload",
    rating: "9.2/10",
    verifiedDate: "21 Oct 2026",
    safetyBadge: "Verified Secure"
  },
  {
    network: "AdGate Media",
    status: "Confirmed Integration",
    tasksOffered: "Free trials, eCommerce cashback, app installs, quick surveys",
    countrySupport: "Tier 1 & India (selected offers)",
    trackingMechanism: "Webhook Callback on advertiser confirmation",
    missingCreditRoute: "AdGate Help Desk with 48h SLA",
    rating: "8.8/10",
    verifiedDate: "21 Oct 2026",
    safetyBadge: "Verified Secure"
  },
  {
    network: "Lootably",
    status: "Confirmed Integration",
    tasksOffered: "Video streams, microtasks, quiz challenges, gaming",
    countrySupport: "Global / India supported",
    trackingMechanism: "Real-time Postback JSON payload",
    missingCreditRoute: "Lootably user dashboard support ticket",
    rating: "8.9/10",
    verifiedDate: "21 Oct 2026",
    safetyBadge: "Verified Secure"
  },
  {
    network: "BitLabs",
    status: "Confirmed Integration",
    tasksOffered: "High-paying surveys, profile-matched questions, short polls",
    countrySupport: "Excellent India coverage in English & regional dialects",
    trackingMechanism: "Direct REST API with dynamic reward postback",
    missingCreditRoute: "Instant ticket escalation via survey history page",
    rating: "9.5/10",
    verifiedDate: "21 Oct 2026",
    safetyBadge: "Verified Secure"
  },
  {
    network: "RevU (Revenue Universe)",
    status: "Confirmed Integration",
    tasksOffered: "Financial services, survey routers, app registrations",
    countrySupport: "India & worldwide",
    trackingMechanism: "Postback IPN with transaction ID validation",
    missingCreditRoute: "RevU Support icon beside each offer card",
    rating: "8.7/10",
    verifiedDate: "21 Oct 2026",
    safetyBadge: "Verified Secure"
  },
  {
    network: "AyeT Studios",
    status: "Confirmed Integration",
    tasksOffered: "Rewarded gaming, level-up milestones, rewarded videos",
    countrySupport: "India (Android heavily favored, iOS limited)",
    trackingMechanism: "S2S Postback with sub-ID hashing",
    missingCreditRoute: "In-offerwall status checker with dispute form",
    rating: "9.0/10",
    verifiedDate: "21 Oct 2026",
    safetyBadge: "Verified Secure"
  },
  {
    network: "AdGem",
    status: "Confirmed Integration",
    tasksOffered: "Mobile games, utility apps, interactive video ads",
    countrySupport: "Worldwide including India",
    trackingMechanism: "Real-time AdGem Postback API",
    missingCreditRoute: "AdGem User Support Portal",
    rating: "8.6/10",
    verifiedDate: "21 Oct 2026",
    safetyBadge: "Verified Secure"
  },
  {
    network: "TimeWall",
    status: "Confirmed Integration",
    tasksOffered: "Clicks, viewing ads, web searches, micro engagement",
    countrySupport: "All India states without restriction",
    trackingMechanism: "Internal points synced every 24h to VELOOP wallet",
    missingCreditRoute: "TimeWall automated task review ticket",
    rating: "9.1/10",
    verifiedDate: "21 Oct 2026",
    safetyBadge: "Verified Secure"
  },
  {
    network: "Monlix",
    status: "Confirmed Integration",
    tasksOffered: "Surveys, web tasks, radio stream listening, video ads",
    countrySupport: "Global with India availability",
    trackingMechanism: "Instant webhook on qualifying action",
    missingCreditRoute: "Monlix support widget",
    rating: "8.5/10",
    verifiedDate: "21 Oct 2026",
    safetyBadge: "Verified Secure"
  },
  {
    network: "OfferToro",
    status: "Confirmed Integration",
    tasksOffered: "App downloads, surveys, lead generation, free trials",
    countrySupport: "India & 80+ countries",
    trackingMechanism: "S2S Postback notification",
    missingCreditRoute: "OfferToro Missing Credit claim form",
    rating: "8.4/10",
    verifiedDate: "21 Oct 2026",
    safetyBadge: "Verified Secure"
  }
];

// 3. Daily Streaks & Rewards (7-Day Cycle)
export const initialStreakData = {
  currentStreak: 4,
  claimedToday: false,
  resetHoursRemaining: 14,
  freezeCards: 1,
  streakRules: "Check in daily to build your streak. Claim before midnight IST. If you miss a day without a Freeze Card, streak resets to Day 1. Day 7 unlocks the Golden Mega Mystery Chest!",
  days: [
    { day: 1, label: "Day 1", rewardVEs: 10, rewardTokens: 50, claimed: true, icon: "⚡" },
    { day: 2, label: "Day 2", rewardVEs: 15, rewardTokens: 75, claimed: true, icon: "⚡" },
    { day: 3, label: "Day 3", rewardVEs: 25, rewardTokens: 100, claimed: true, icon: "🔥" },
    { day: 4, label: "Day 4", rewardVEs: 35, rewardTokens: 150, claimed: true, icon: "🔥" },
    { day: 5, label: "Day 5", rewardVEs: 50, rewardTokens: 200, claimed: false, icon: "💎" },
    { day: 6, label: "Day 6", rewardVEs: 75, rewardTokens: 300, claimed: false, icon: "⭐" },
    { day: 7, label: "Day 7", rewardVEs: 150, rewardTokens: 800, isMega: true, claimed: false, icon: "👑" }
  ]
};

// 4. Lucky Spin Wheel Config
export const luckyWheelSlices = [
  { id: 1, label: "50 VEs", value: 50, currency: "VEs", color: "#8b5cf6", odds: "25%" },
  { id: 2, label: "200 Tokens", value: 200, currency: "Tokens", color: "#f59e0b", odds: "30%" },
  { id: 3, label: "10 SVEs", value: 10, currency: "SVEs", color: "#10b981", odds: "10%" },
  { id: 4, label: "100 VEs", value: 100, currency: "VEs", color: "#ec4899", odds: "12%" },
  { id: 5, label: "500 Tokens", value: 500, currency: "Tokens", color: "#3b82f6", odds: "15%" },
  { id: 6, label: "25 SVEs", value: 25, currency: "SVEs", color: "#06b6d4", odds: "5%" },
  { id: 7, label: "250 VEs", value: 250, currency: "VEs", color: "#f43f5e", odds: "2.5%" },
  { id: 8, label: "JACKPOT 1,000 VEs", value: 1000, currency: "VEs", color: "#eab308", odds: "0.5%" }
];

// 5. Missions & Level System (Bronze -> Diamond)
export const levelTiersData = [
  { level: 1, name: "Bronze Pioneer", minXP: 0, maxXP: 1000, perk: "Standard task rewards, daily streak access" },
  { level: 2, name: "Silver Achiever", minXP: 1000, maxXP: 2500, perk: "+3% bonus on all completed surveys" },
  { level: 3, name: "Gold Striker", minXP: 2500, maxXP: 5000, perk: "+5% bonus earnings, priority withdrawal queue" },
  { level: 4, name: "Platinum Elite", minXP: 5000, maxXP: 10000, perk: "+8% bonus, exclusive SVE giveaway pools" },
  { level: 5, name: "Diamond Legend", minXP: 10000, maxXP: 25000, perk: "+12% bonus, zero withdrawal fee, VIP concierge" }
];

export const userMissionsData = [
  {
    id: "MIS-01",
    title: "Complete Profile Screening",
    rewardVEs: 100,
    rewardXP: 150,
    progress: 100,
    isCompleted: true,
    desc: "Fill in age, location, and device preferences to unlock high-paying surveys."
  },
  {
    id: "MIS-02",
    title: "Complete 3 Offerwall Tasks",
    rewardVEs: 200,
    rewardXP: 300,
    progress: 66,
    isCompleted: false,
    desc: "Complete any 3 offers from CPX, Torox, or BitLabs. (2/3 completed)"
  },
  {
    id: "MIS-03",
    title: "Maintain a 5-Day Streak",
    rewardVEs: 150,
    rewardXP: 250,
    progress: 80,
    isCompleted: false,
    desc: "Check in 5 consecutive days without breaking your streak. (4/5 days)"
  },
  {
    id: "MIS-04",
    title: "Enter Any Tech Giveaway",
    rewardVEs: 50,
    rewardXP: 100,
    progress: 100,
    isCompleted: true,
    desc: "Participate in iPhone 15 Pro or Apple Watch draw using your VEs."
  },
  {
    id: "MIS-05",
    title: "Invite 2 Verified Friends",
    rewardVEs: 300,
    rewardXP: 400,
    progress: 50,
    isCompleted: false,
    desc: "Share your referral code and have 2 friends complete their first task. (1/2 friends)"
  }
];

export const achievementBadgesData = [
  { id: "BDG-01", name: "Early Pioneer", icon: "🚀", unlocked: true, date: "15 Oct 2026", desc: "Joined VELOOP Rewards during beta launch." },
  { id: "BDG-02", name: "Task Master", icon: "🎯", unlocked: true, date: "22 Oct 2026", desc: "Successfully completed 10 verified offer tasks." },
  { id: "BDG-03", name: "Streak Samurai", icon: "🔥", unlocked: true, date: "24 Oct 2026", desc: "Maintained a continuous 4-day check-in streak." },
  { id: "BDG-04", name: "High Roller", icon: "💎", unlocked: false, date: null, desc: "Accumulate 2,500+ VEs in your verified wallet." },
  { id: "BDG-05", name: "Referral Champion", icon: "👥", unlocked: false, date: null, desc: "Invite 10 friends who complete at least one offer." },
  { id: "BDG-06", name: "Giveaway Victor", icon: "🏆", unlocked: true, date: "31 Aug 2026", desc: "Won a certified prize in official VELOOP draw." }
];

// 6. Referral Program Data
export const referralProgramData = {
  referralCode: "NAYAB2026",
  referralLink: "https://veloop-rewards.in/join?ref=NAYAB2026",
  totalInvited: 14,
  activeEarners: 9,
  pendingVerification: 5,
  totalVEsEarned: 1450,
  tier: "10% Lifetime Commission",
  rules: [
    "Earn +50 VEs instantly when your referred friend signs up and verifies their phone number.",
    "Earn +100 VEs bonus when they complete their first survey or app offer.",
    "Receive 10% passive commission on all eligible offerwall earnings generated by your referrals for lifetime.",
    "Strict Anti-Fraud: Self-referrals, emulator bots, or temporary disposable emails will result in account ban and forfeiture of all balances."
  ],
  referralsList: [
    { id: "REF-101", maskedName: "Aman K. (VE****12)", joinedDate: "24 Oct 2026", status: "Active Earner", earnedVEs: 280, offersCompleted: 4 },
    { id: "REF-102", maskedName: "Sneha P. (VE****89)", joinedDate: "23 Oct 2026", status: "Active Earner", earnedVEs: 410, offersCompleted: 7 },
    { id: "REF-103", maskedName: "Vikram S. (VE****45)", joinedDate: "22 Oct 2026", status: "Active Earner", earnedVEs: 190, offersCompleted: 3 },
    { id: "REF-104", maskedName: "Rohan M. (VE****67)", joinedDate: "25 Oct 2026", status: "Pending Task", earnedVEs: 50, offersCompleted: 0 },
    { id: "REF-105", maskedName: "Deepak G. (VE****33)", joinedDate: "26 Oct 2026", status: "Pending Task", earnedVEs: 50, offersCompleted: 0 }
  ]
};

// 7. Localized India Withdrawal Methods
export const withdrawalMethodsData = [
  {
    id: "WTH-UPI",
    name: "Instant UPI Transfer",
    icon: "UPI",
    badge: "Most Popular in India",
    minWithdrawalINR: 50,
    minWithdrawalVEs: 500,
    conversionRatio: "10 VEs = ₹1.00",
    processingTime: "Instant (Within 5 - 15 Mins)",
    fee: "₹0 (Zero Fee)",
    inputLabel: "Enter UPI ID (e.g. mobile@upi, name@okaxis)",
    inputPlaceholder: "9876543210@paytm",
    isIndiaFast: true
  },
  {
    id: "WTH-PAYTM",
    name: "Paytm Wallet",
    icon: "Paytm",
    badge: "Instant Top-up",
    minWithdrawalINR: 100,
    minWithdrawalVEs: 1000,
    conversionRatio: "10 VEs = ₹1.00",
    processingTime: "Instant (Within 10 Mins)",
    fee: "₹0 (Zero Fee)",
    inputLabel: "Enter Registered Paytm Mobile Number",
    inputPlaceholder: "9876543210",
    isIndiaFast: true
  },
  {
    id: "WTH-AMAZON",
    name: "Amazon Pay Gift Card",
    icon: "Amazon",
    badge: "100% Face Value",
    minWithdrawalINR: 250,
    minWithdrawalVEs: 2500,
    conversionRatio: "10 VEs = ₹1.00",
    processingTime: "Within 2 - 4 Hours",
    fee: "₹0 (Zero Fee)",
    inputLabel: "Enter Recipient Email Address",
    inputPlaceholder: "name@example.com",
    isIndiaFast: true
  },
  {
    id: "WTH-BANK",
    name: "Direct Bank Transfer (IMPS / NEFT)",
    icon: "Bank",
    badge: "High Limits",
    minWithdrawalINR: 500,
    minWithdrawalVEs: 5000,
    conversionRatio: "10 VEs = ₹1.00",
    processingTime: "Same Day (1 - 4 Business Hours)",
    fee: "₹5 (Bank processing fee)",
    inputLabel: "Enter Account Number & IFSC Code",
    inputPlaceholder: "Account #, IFSC (e.g. HDFC0001234)",
    isIndiaFast: false
  },
  {
    id: "WTH-CRYPTO",
    name: "USDT (BEP-20 / Polygon)",
    icon: "Crypto",
    badge: "Global Users",
    minWithdrawalINR: 420,
    minWithdrawalVEs: 4200,
    conversionRatio: "420 VEs = $1.00 USDT (₹84.00)",
    processingTime: "Within 30 Mins (On-chain)",
    fee: "$0.30 network fee",
    inputLabel: "Enter BEP-20 / Polygon USDT Address",
    inputPlaceholder: "0x71C...394A",
    isIndiaFast: false
  }
];

// 8. Transaction & Payout Ledger
export const initialTransactionsLedger = [
  {
    id: "TXN-9021",
    title: "BitLabs Daily Payments Survey",
    type: "EARNING",
    currency: "VEs",
    amount: "+220",
    amountINR: "+₹22.00",
    date: "25 Oct 2026, 11:20 AM",
    status: "Credited",
    provider: "BitLabs",
    category: "Survey"
  },
  {
    id: "TXN-9020",
    title: "Day 4 Daily Streak Reward",
    type: "BONUS",
    currency: "VEs",
    amount: "+35",
    amountINR: "+₹3.50",
    date: "25 Oct 2026, 09:15 AM",
    status: "Credited",
    provider: "VELOOP System",
    category: "Streak"
  },
  {
    id: "TXN-9019",
    title: "iPhone 15 Pro Giveaway Entry",
    type: "GIVEAWAY_ENTRY",
    currency: "VEs",
    amount: "-250",
    amountINR: "-₹25.00",
    date: "24 Oct 2026, 03:40 PM",
    status: "Completed",
    provider: "Giveaway Section",
    category: "Giveaway"
  },
  {
    id: "TXN-9018",
    title: "Instant UPI Withdrawal to 9876543210@paytm",
    type: "WITHDRAWAL",
    currency: "VEs",
    amount: "-500",
    amountINR: "-₹50.00",
    date: "23 Oct 2026, 07:10 PM",
    status: "Paid",
    provider: "UPI Payout",
    category: "Cashout"
  },
  {
    id: "TXN-9017",
    title: "Torox Raid: Shadow Legends (Pending Review)",
    type: "EARNING",
    currency: "VEs",
    amount: "+850",
    amountINR: "+₹85.00",
    date: "25 Oct 2026, 06:00 PM",
    status: "Pending",
    provider: "Torox",
    category: "Gaming"
  }
];

// 9. Initial Support Tickets
export const initialSupportTickets = [
  {
    ticketId: "TCK-2026-9041",
    taskId: "TSK-84927",
    subject: "Speeding disqualification on RevU Web3 Survey",
    dateSubmitted: "24 Oct 2026",
    status: "INVESTIGATING",
    lastUpdate: "Auditor reviewed server timing. Verification team contacting RevU API support.",
    resolutionEta: "Within 24 Hours",
    category: "Missing Credit Dispute"
  },
  {
    ticketId: "TCK-2026-8812",
    taskId: "WTH-UPI-1092",
    subject: "UPI Payout Confirmation Reference Query",
    dateSubmitted: "20 Oct 2026",
    status: "RESOLVED",
    lastUpdate: "Bank UTR #429810482910 confirmed successfully credited to recipient account.",
    resolutionEta: "Completed",
    category: "Withdrawal Assistance"
  }
];

// 10. Valid Promo / Giveaway Codes (from Ref_01.jpeg)
export const validGiveawayCodes = {
  VELOOP2026: {
    code: "VELOOP2026",
    rewardVEs: 250,
    rewardTokens: 500,
    desc: "Official VELOOP 2026 Launch Promo Pack"
  },
  NAYABVIP: {
    code: "NAYABVIP",
    rewardVEs: 500,
    rewardTokens: 1000,
    desc: "MD Nayab Alam VIP Research Exclusive Credit"
  },
  BONUS100: {
    code: "BONUS100",
    rewardVEs: 100,
    rewardTokens: 250,
    desc: "Community Flash Welcome Bonus"
  },
  FESTIVE500: {
    code: "FESTIVE500",
    rewardVEs: 300,
    rewardTokens: 750,
    desc: "Diwali & Seasonal Rewards Booster"
  }
};

// 11. Platform Trust Metrics (From PDF Page 10)
export const trustMetricsData = {
  payoutSuccessRate: "99.4%",
  averagePayoutSpeed: "3.2 Hours",
  totalRewardsPaidINR: "₹14,82,450",
  verifiedWinnersCount: "1,240+",
  activeSurveyPartners: 11,
  revenueDistributionModel: {
    userRewardPool: "65%",
    fraudBufferAndSupport: "15%",
    operatingCostsAndTaxes: "12%",
    platformMargin: "8%"
  }
};

// 12. Weekly Leaderboard
export const leaderboardData = {
  period: "Week 43 · Oct 2026",
  endsInSeconds: 3 * 86400 + 7 * 3600,
  topPrize: "2,500 VEs + 5,000 Tokens + Gold Champion Badge",
  userRank: 14,
  userEarnedThisWeek: 820,
  leaders: [
    { rank: 1, maskedId: "VE****92", name: "Kunal M.", city: "Pune", earnedVEs: 4850, tasksDone: 34, badge: "👑 1st" },
    { rank: 2, maskedId: "VE****11", name: "Pooja S.", city: "Mumbai", earnedVEs: 4120, tasksDone: 29, badge: "🥈 2nd" },
    { rank: 3, maskedId: "VE****84", name: "Arjun R.", city: "Bengaluru", earnedVEs: 3790, tasksDone: 27, badge: "🥉 3rd" },
    { rank: 4, maskedId: "VE****53", name: "Meera D.", city: "Delhi", earnedVEs: 2980, tasksDone: 21, badge: "Top 5" },
    { rank: 5, maskedId: "VE****29", name: "Harsh V.", city: "Jaipur", earnedVEs: 2640, tasksDone: 19, badge: "Top 5" }
  ]
};
