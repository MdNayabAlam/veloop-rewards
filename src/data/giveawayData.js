// VELOOP Rewards – Giveaway Section Data Model
// Designed to match future backend API endpoints:
// GET /api/giveaways/current
// GET /api/giveaways/:id
// GET /api/giveaways/:id/winners
// GET /api/giveaways/previous

export const currentGiveawayData = {
  id: "GW-2026-08",
  slug: "mega-summer-rewards-2026",
  title: "Mega Summer Rewards Giveaway",
  label: "EXCLUSIVE GIVEAWAY",
  status: "ACTIVE", // ACTIVE | ENDED | UPCOMING
  startDate: "2026-08-01T00:00:00Z",
  endDate: "2026-08-31T23:59:59Z",
  timeRemainingSeconds: 12 * 86400 + 8 * 3600 + 45 * 60, // 12d 8h 45m
  participantsCount: "8.5K+",
  totalGiveawaysCount: 24,
  prizesWonCount: "1.2K+",
  prizes: [
    {
      id: "PRIZE-001",
      slug: "iphone-15-pro",
      position: "1ST PRIZE",
      name: "iPhone 15 Pro",
      spec: "Latest iPhone 15 Pro 128GB",
      value: "₹1,19,900",
      image: "/assets/iphone.png",
      color: "purple",
      category: "tech",
      type: "PHYSICAL",
      winnerCount: 1,
      entryFee: 250,
      currency: "VEs",
      participants: "2.3K+",
      daysLeft: 12,
      shortDesc: "Experience aerospace-grade titanium craftsmanship, A17 Pro chip power, and professional optical cameras.",
      about: "The iPhone 15 Pro features a strong and light aerospace-grade titanium design with textured matte-glass back. Powered by the groundbreaking A17 Pro chip, next-generation portraits with Focus and Depth Control, and customizable Action button.",
      highlights: [
        "Aerospace-grade natural titanium finish",
        "6.1-inch Super Retina XDR display with ProMotion 120Hz",
        "A17 Pro industry-leading 3nm chip with 6-core GPU",
        "48MP Pro camera system with 3x optical zoom",
        "USB-C connector with USB 3 speeds up to 10Gb/s",
        "All-day battery life with up to 23 hours video playback"
      ],
      claimDetails: {
        type: "PHYSICAL",
        instructions: "Requires full shipping address and phone number for insured courier delivery."
      }
    },
    {
      id: "PRIZE-002",
      slug: "apple-watch-series-9",
      position: "2ND PRIZE",
      name: "Apple Watch Series 9",
      spec: "Latest Apple Watch Series 9",
      value: "₹41,900",
      image: "/assets/watch.png",
      color: "blue",
      category: "tech",
      type: "PHYSICAL",
      winnerCount: 3,
      entryFee: 200,
      currency: "VEs",
      participants: "1.8K+",
      daysLeft: 9,
      shortDesc: "Smarter, brighter, and mightier with the S9 SiP and revolutionary Double Tap one-handed gesture.",
      about: "Apple Watch Series 9 helps you stay connected, active, healthy, and safe. Featuring Double Tap gesture, a display twice as bright, and precision finding for iPhone.",
      highlights: [
        "Apple S9 SiP with 64-bit dual-core processor",
        "Magic Double Tap gesture control without touching screen",
        "Always-On Retina display up to 2000 nits brightness",
        "Advanced ECG, Blood Oxygen & Temperature sensors",
        "50m water resistance (swimproof)",
        "Crash Detection and Fall Detection emergency SOS"
      ],
      claimDetails: {
        type: "PHYSICAL",
        instructions: "Requires residential address for door-step verified package delivery."
      }
    },
    {
      id: "PRIZE-003",
      slug: "airpods-pro-2",
      position: "3RD PRIZE",
      name: "AirPods Pro 2",
      spec: "Active Noise Cancellation",
      value: "₹24,900",
      image: "/assets/airpod.png",
      color: "green",
      category: "tech",
      type: "PHYSICAL",
      winnerCount: 5,
      entryFee: 500,
      currency: "SVEs",
      participants: "3.1K+",
      daysLeft: 7,
      shortDesc: "Up to 2x more active noise cancellation, adaptive transparency, and immersive personalized spatial audio.",
      about: "AirPods Pro (2nd generation) with USB-C deliver up to 2x more Active Noise Cancellation than the previous generation, with Transparency mode that lets you hear the world around you.",
      highlights: [
        "Apple H2 headphone chip with computational audio",
        "Adaptive Audio dynamically blends ANC and Transparency",
        "Personalized Spatial Audio with dynamic head tracking",
        "MagSafe Case (USB-C) with Precision Finding speaker",
        "Up to 6 hours listening time on single charge",
        "IP54 dust, sweat, and water resistance"
      ],
      claimDetails: {
        type: "PHYSICAL",
        instructions: "Shipped in sealed official retail box with 1-year brand warranty."
      }
    },
    {
      id: "PRIZE-004",
      slug: "amazon-2000",
      position: "LUCKY DRAW",
      name: "Amazon Gift Card",
      spec: "₹2,000 Amazon Gift Card",
      value: "₹2,000",
      image: "/assets/amazon card.png",
      color: "orange",
      category: "vouchers",
      type: "GIFT_CARD",
      winnerCount: 10,
      entryFee: 500,
      currency: "VEs",
      participants: "1.3K+",
      daysLeft: 5,
      shortDesc: "Shop millions of products on Amazon with an instant e-gift card credited directly to your Amazon account.",
      about: "Use your ₹2,000 Amazon Gift Card balance across Electronics, Fashion, Grocery, Bill Payments and more. Digital voucher with 1-year validity and zero processing fee.",
      highlights: [
        "100% digital code delivered to your verified email",
        "Valid on Amazon India across all categories & Prime deals",
        "No expiration pressure – 365 days validity",
        "Can be merged with existing Amazon Pay balance",
        "Zero convenience charges or hidden deductions"
      ],
      claimDetails: {
        type: "GIFT_CARD",
        instructions: "Requires only your verified email address. No physical delivery needed."
      }
    },
    {
      id: "PRIZE-005",
      slug: "amazon-500",
      position: "BONUS DRAW",
      name: "Amazon Gift Card ₹500",
      spec: "₹500 Shopping Voucher",
      value: "₹500",
      image: "/assets/amazon card 2.png",
      color: "orange",
      category: "vouchers",
      type: "GIFT_CARD",
      winnerCount: 15,
      entryFee: 300,
      currency: "VEs",
      participants: "980+",
      daysLeft: 4,
      shortDesc: "Instant Amazon voucher for quick purchases, book orders, and everyday shopping rewards.",
      about: "Ideal for swift top-ups, grocery purchases, or quick checkout discounts. Delivered directly to your inbox.",
      highlights: [
        "Digital voucher code sent within 24 hours of verification",
        "Usable for mobile recharges and bill payments",
        "Seamless one-click redemption on Amazon Pay"
      ],
      claimDetails: {
        type: "GIFT_CARD",
        instructions: "Instant email delivery to winner's registered email address."
      }
    },
    {
      id: "PRIZE-006",
      slug: "amazon-20",
      position: "COMMUNITY REWARD",
      name: "Token Flash Voucher",
      spec: "₹20 Quick Reward",
      value: "₹20",
      image: "/assets/amazon card 3.png",
      color: "purple",
      category: "tokens",
      type: "GIFT_CARD",
      winnerCount: 50,
      entryFee: 2000,
      currency: "Tokens",
      participants: "4.2K+",
      daysLeft: 3,
      shortDesc: "Redeem your accumulated VELOOP community tokens for fast digital vouchers with zero VEs required.",
      about: "Exclusive token-burn giveaway designed for active community members to convert daily activity tokens into real shopping rewards.",
      highlights: [
        "Pay solely using VELOOP engagement Tokens",
        "High winner frequency (50 Winners selected per round)",
        "Instant code redemption with zero lock-in period"
      ],
      claimDetails: {
        type: "GIFT_CARD",
        instructions: "Auto-credited via email within 48 hours."
      }
    },
    {
      id: "PRIZE-007",
      slug: "ps5-slim-console",
      position: "GAMING JACKPOT",
      name: "PlayStation 5 Slim",
      spec: "1TB SSD Next-Gen Console",
      value: "₹44,990",
      image: "/assets/gift box 1.png",
      color: "blue",
      category: "tech",
      type: "PHYSICAL",
      winnerCount: 2,
      entryFee: 400,
      currency: "VEs",
      participants: "2.1K+",
      daysLeft: 11,
      shortDesc: "Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion with haptic feedback, and 3D Audio.",
      about: "The PlayStation 5 Slim console delivers next-generation gaming performance in a sleek, compact design. Includes DualSense wireless controller with dynamic adaptive triggers and integrated microphone.",
      highlights: [
        "1TB ultra-high speed internal SSD storage",
        "4K 120Hz display output with HDR support",
        "Tempest 3D AudioTech immersion engine",
        "DualSense wireless controller included",
        "1-year official Sony India warranty"
      ],
      claimDetails: {
        type: "PHYSICAL",
        instructions: "Requires complete postal address and phone number for insured courier shipping."
      }
    },
    {
      id: "PRIZE-008",
      slug: "amazon-5000",
      position: "MEGA VOUCHER",
      name: "Amazon Pay ₹5,000",
      spec: "₹5,000 Direct Balance Top-Up",
      value: "₹5,000",
      image: "/assets/amazon card.png",
      color: "orange",
      category: "vouchers",
      type: "GIFT_CARD",
      winnerCount: 5,
      entryFee: 350,
      currency: "VEs",
      participants: "1.9K+",
      daysLeft: 8,
      shortDesc: "High-value digital Amazon Pay voucher credited directly to your Amazon account for shopping, travel, and recharges.",
      about: "Instant ₹5,000 Amazon Pay Gift Card applicable across all categories on Amazon India. Redeemable for electronics, fashion, bill payments, and flight/hotel bookings.",
      highlights: [
        "16-digit voucher code delivered directly to your email",
        "Valid for 365 days across all Amazon India services",
        "Can be merged with existing Amazon Pay wallet balance",
        "Zero convenience charges or transaction deductions"
      ],
      claimDetails: {
        type: "GIFT_CARD",
        instructions: "100% digital code delivered to winner's registered email address."
      }
    },
    {
      id: "PRIZE-009",
      slug: "flipkart-1000",
      position: "SHOPPING SPREE",
      name: "Flipkart ₹1,000 Gift Card",
      spec: "₹1,000 Instant E-Gift Voucher",
      value: "₹1,000",
      image: "/assets/giveaway card.png",
      color: "purple",
      category: "vouchers",
      type: "GIFT_CARD",
      winnerCount: 20,
      entryFee: 150,
      currency: "VEs",
      participants: "3.4K+",
      daysLeft: 6,
      shortDesc: "Shop top fashion, electronics, and daily essentials across Flipkart India with instant digital credit.",
      about: "Enjoy shopping on Flipkart with a ₹1,000 digital voucher. Seamlessly stacks with Flipkart SuperCoins, sale events, and bank promotions.",
      highlights: [
        "Valid across all products and categories on Flipkart",
        "Stacks with ongoing festival discounts and promo codes",
        "Delivered directly to inbox with PIN protection"
      ],
      claimDetails: {
        type: "GIFT_CARD",
        instructions: "Digital e-card code delivered to verified email address."
      }
    },
    {
      id: "PRIZE-010",
      slug: "google-play-500",
      position: "GAMER SPECIAL",
      name: "Google Play ₹500 Code",
      spec: "₹500 Play Store Redeem Code",
      value: "₹500",
      image: "/assets/giveaway card.png",
      color: "green",
      category: "vouchers",
      type: "GIFT_CARD",
      winnerCount: 25,
      entryFee: 250,
      currency: "SVEs",
      participants: "2.7K+",
      daysLeft: 4,
      shortDesc: "Top up your Google Play balance for mobile games, BGMI UC, Free Fire Diamonds, premium apps, and books.",
      about: "Redeem directly inside Google Play Store on Android to unlock premium games, in-game subscriptions, diamond packs, movies, and cloud services.",
      highlights: [
        "Instant code redemption directly inside Google Play Store",
        "Works for all Android games, in-app purchases, and apps",
        "Official certified Google Play digital redemption voucher"
      ],
      claimDetails: {
        type: "GIFT_CARD",
        instructions: "Instant email delivery with 1-click redemption instructions."
      }
    },
    {
      id: "PRIZE-011",
      slug: "upi-cash-100",
      position: "INSTANT CASH",
      name: "₹100 Instant UPI Cash",
      spec: "Direct UPI Bank Transfer ₹100",
      value: "₹100",
      image: "/assets/giveaway card.png",
      color: "green",
      category: "instant",
      type: "GIFT_CARD",
      winnerCount: 50,
      entryFee: 100,
      currency: "VEs",
      participants: "5.6K+",
      daysLeft: 2,
      shortDesc: "Instant direct bank transfer to any UPI ID (PhonePe, Google Pay, Paytm, BHIM) with zero processing fees.",
      about: "India-first real cash reward! Win and receive ₹100 transferred directly to your bank account via instant National Payments Corporation of India (NPCI) UPI rails.",
      highlights: [
        "Direct UPI transfer to any active Indian bank account",
        "Zero conversion fee – full ₹100 credited in minutes",
        "Supports PhonePe, GPay, Paytm, BHIM, and bank UPIs"
      ],
      claimDetails: {
        type: "GIFT_CARD",
        instructions: "Requires only your verified UPI ID (e.g., username@upi). Zero address needed."
      }
    },
    {
      id: "PRIZE-012",
      slug: "token-jackpot-100",
      position: "TOKEN SPECIAL",
      name: "Token Mega Voucher ₹100",
      spec: "₹100 Community Cash Voucher",
      value: "₹100",
      image: "/assets/amazon card 3.png",
      color: "purple",
      category: "tokens",
      type: "GIFT_CARD",
      winnerCount: 100,
      entryFee: 3500,
      currency: "Tokens",
      participants: "6.8K+",
      daysLeft: 2,
      shortDesc: "Convert your earned community engagement Tokens into real spending rewards with zero VEs or SVEs needed.",
      about: "Designed specifically for daily active users who complete microtasks, streak check-ins, and opinion polls to redeem accumulated community Tokens into real spending power.",
      highlights: [
        "Pay 100% using community engagement Tokens",
        "Huge winner pool: 100 verified winners selected per round",
        "Instant delivery via Amazon Pay or UPI cash"
      ],
      claimDetails: {
        type: "GIFT_CARD",
        instructions: "Delivered via registered email within 24 hours of draw completion."
      }
    }
  ]
};

// Current winners announced when giveaway status is ENDED
export const currentWinnersData = [
  {
    prizeId: "PRIZE-001",
    prizeName: "iPhone 15 Pro",
    prizePosition: "1ST PRIZE",
    winnerCount: 1,
    image: "/assets/iphone.png",
    color: "purple",
    winners: [
      {
        userId: "VE78942",
        displayName: "VE****72",
        city: "Mumbai, MH",
        wonAt: "2026-08-31T20:00:00Z",
        ticketNumber: "TK-94021"
      }
    ]
  },
  {
    prizeId: "PRIZE-002",
    prizeName: "Apple Watch Series 9",
    prizePosition: "2ND PRIZE",
    winnerCount: 3,
    image: "/assets/watch.png",
    color: "blue",
    winners: [
      {
        userId: "VE10025", // Demo winner ID!
        displayName: "VE****25 (You!)",
        city: "Bengaluru, KA",
        wonAt: "2026-08-31T20:00:00Z",
        ticketNumber: "TK-10025"
      },
      {
        userId: "VE88431",
        displayName: "VE****31",
        city: "Delhi, DL",
        wonAt: "2026-08-31T20:00:00Z",
        ticketNumber: "TK-88431"
      },
      {
        userId: "VE93194",
        displayName: "VE****94",
        city: "Pune, MH",
        wonAt: "2026-08-31T20:00:00Z",
        ticketNumber: "TK-93194"
      }
    ]
  },
  {
    prizeId: "PRIZE-003",
    prizeName: "AirPods Pro 2",
    prizePosition: "3RD PRIZE",
    winnerCount: 5,
    image: "/assets/airpod.png",
    color: "green",
    winners: [
      { userId: "VE12901", displayName: "VE****01", city: "Hyderabad, TS", wonAt: "2026-08-31T20:00:00Z", ticketNumber: "TK-12901" },
      { userId: "VE54198", displayName: "VE****98", city: "Jaipur, RJ", wonAt: "2026-08-31T20:00:00Z", ticketNumber: "TK-54198" },
      { userId: "VE88219", displayName: "VE****19", city: "Kolkata, WB", wonAt: "2026-08-31T20:00:00Z", ticketNumber: "TK-88219" },
      { userId: "VE03784", displayName: "VE****84", city: "Ahmedabad, GJ", wonAt: "2026-08-31T20:00:00Z", ticketNumber: "TK-03784" },
      { userId: "VE47302", displayName: "VE****02", city: "Chandigarh, CH", wonAt: "2026-08-31T20:00:00Z", ticketNumber: "TK-47302" }
    ]
  },
  {
    prizeId: "PRIZE-004",
    prizeName: "Amazon Gift Card ₹2,000",
    prizePosition: "LUCKY DRAW",
    winnerCount: 10,
    image: "/assets/amazon card.png",
    color: "orange",
    winners: [
      { userId: "VE20311", displayName: "VE****11", city: "Chennai, TN", wonAt: "2026-08-31T20:00:00Z", ticketNumber: "TK-20311" },
      { userId: "VE92843", displayName: "VE****43", city: "Lucknow, UP", wonAt: "2026-08-31T20:00:00Z", ticketNumber: "TK-92843" },
      { userId: "VE61902", displayName: "VE****02", city: "Indore, MP", wonAt: "2026-08-31T20:00:00Z", ticketNumber: "TK-61902" },
      { userId: "VE33419", displayName: "VE****19", city: "Surat, GJ", wonAt: "2026-08-31T20:00:00Z", ticketNumber: "TK-33419" },
      { userId: "VE77209", displayName: "VE****09", city: "Nagpur, MH", wonAt: "2026-08-31T20:00:00Z", ticketNumber: "TK-77209" }
    ]
  }
];

// Historical Previous Giveaways and their Winners
export const previousGiveawaysData = [
  {
    id: "GW-2026-07",
    name: "August Reward Rush",
    date: "15 Aug 2026",
    participants: "12,450",
    prizesAwarded: 18,
    winners: [
      {
        maskedId: "VE****82",
        prize: "iPhone 15 Pro (Titanium)",
        category: "1st Prize",
        date: "15 Aug 2026",
        status: "Claim Delivered ✓",
        city: "Bengaluru"
      },
      {
        maskedId: "VE****44",
        prize: "Apple Watch Series 9",
        category: "2nd Prize",
        date: "15 Aug 2026",
        status: "Claim Delivered ✓",
        city: "Delhi"
      },
      {
        maskedId: "VE****90",
        prize: "AirPods Pro 2",
        category: "3rd Prize",
        date: "15 Aug 2026",
        status: "Claim Delivered ✓",
        city: "Mumbai"
      },
      {
        maskedId: "VE****15",
        prize: "Amazon Gift Card ₹2,000",
        category: "Lucky Draw",
        date: "15 Aug 2026",
        status: "Voucher Dispatched ✓",
        city: "Hyderabad"
      }
    ]
  },
  {
    id: "GW-2026-06",
    name: "Monsoon Super Draw",
    date: "25 Jul 2026",
    participants: "9,820",
    prizesAwarded: 15,
    winners: [
      {
        maskedId: "VE****42",
        prize: "Apple Watch Series 9",
        category: "1st Prize",
        date: "25 Jul 2026",
        status: "Claim Delivered ✓",
        city: "Pune"
      },
      {
        maskedId: "VE****91",
        prize: "AirPods Pro 2",
        category: "2nd Prize",
        date: "25 Jul 2026",
        status: "Claim Delivered ✓",
        city: "Ahmedabad"
      },
      {
        maskedId: "VE****27",
        prize: "Amazon Gift Card ₹2,000",
        category: "Lucky Draw",
        date: "25 Jul 2026",
        status: "Voucher Dispatched ✓",
        city: "Kolkata"
      }
    ]
  },
  {
    id: "GW-2026-05",
    name: "Summer Rewards Fest",
    date: "10 Jul 2026",
    participants: "15,100",
    prizesAwarded: 22,
    winners: [
      {
        maskedId: "VE****19",
        prize: "iPhone 15 Pro",
        category: "1st Prize",
        date: "10 Jul 2026",
        status: "Claim Delivered ✓",
        city: "Chandigarh"
      },
      {
        maskedId: "VE****63",
        prize: "Sony WH-1000XM5",
        category: "Audio Prize",
        date: "10 Jul 2026",
        status: "Claim Delivered ✓",
        city: "Jaipur"
      }
    ]
  }
];

// Live ticker messages for social proof
export const winnerTickerMessages = [
  { id: 1, icon: "🏆", text: "User VE****72 won an iPhone 15 Pro!" },
  { id: 2, icon: "⌚", text: "Lucky participant VE****25 won Apple Watch Series 9!" },
  { id: 3, icon: "🎧", text: "User VE****54 won AirPods Pro 2 with Active Noise Cancellation!" },
  { id: 4, icon: "💳", text: "Participant VE****92 claimed ₹2,000 Amazon Gift Card!" },
  { id: 5, icon: "🎉", text: "User VE****82 received iPhone 15 Pro in Bengaluru!" },
  { id: 6, icon: "⚡", text: "Member VE****11 just redeemed ₹500 Amazon Voucher!" },
  { id: 7, icon: "🎁", text: "Participant VE****31 verified Apple Watch prize shipment!" }
];

// Frequently Asked Questions
export const faqData = [
  {
    question: "How do I participate in VELOOP Giveaways?",
    answer: "Participating is simple: (1) Sign in with your VELOOP account, (2) Choose the giveaway you wish to enter, (3) Check the required entry currency (VEs, SVEs, or Tokens), and (4) Confirm your entry. Your entry will be recorded in your dashboard with an encrypted transaction ID."
  },
  {
    question: "What is the difference between VEs, SVEs, and Tokens?",
    answer: "VEs (Velocity Entries) are earned by completing active rewards tasks and challenges. SVEs (Super Velocity Entries) are exclusive rewards from high-tier milestones. Tokens are platform engagement credits accumulated through daily app check-ins and community interactions."
  },
  {
    question: "How are winners selected?",
    answer: "Winners are chosen through a cryptographically secure, verifiable automated random selection algorithm executed once the countdown reaches zero. Each eligible entry represents an equal chance in the pool."
  },
  {
    question: "What happens if I win a prize?",
    answer: "If your user ID is selected, you'll see a prominent winner banner upon logging in. You have 7 days to complete the Prize Claim Form. Physical prizes (iPhone, Apple Watch, AirPods) require shipping address verification, while digital Amazon vouchers are dispatched immediately to your email."
  },
  {
    question: "Can I enter multiple giveaways simultaneously?",
    answer: "Yes! You can participate in each giveaway once per event cycle as long as you maintain sufficient VEs, SVEs, or Tokens balance. Multiple entries for the exact same prize depend on specific event tier rules."
  },
  {
    question: "Is there any hidden cost or delivery fee?",
    answer: "None! VELOOP covers 100% of shipping, insurance, customs, and delivery fees for physical prizes. Digital gift cards are issued at their exact face value without deduction."
  }
];

// Official Rules & Guidelines
export const giveawayRulesData = [
  {
    title: "1. Eligibility & Account Verification",
    points: [
      "Participants must possess an active, verified VELOOP Rewards account in good standing.",
      "One account per individual. Using multiple dummy accounts or spoofing IPs will trigger fraud detection and result in immediate disqualification.",
      "Participants must be at least 18 years of age or possess parental consent where legally applicable."
    ]
  },
  {
    title: "2. Entry Requirements & Currencies",
    points: [
      "Joining requirements are strictly deducted from the user's authentic virtual balance (VEs, SVEs, or Tokens) at the time of entry.",
      "Entries cannot be cancelled or reversed once confirmed.",
      "Balances are deducted atomically upon confirmation and recorded with a timestamped transaction reference."
    ]
  },
  {
    title: "3. Winner Selection & Fairness",
    points: [
      "All draws occur automatically upon the scheduled closing time.",
      "The 1st prize (iPhone 15 Pro) has exactly 1 certified winner per event.",
      "Apple Watch, AirPods, and Amazon vouchers have multiple configured winners as indicated.",
      "Selection records are permanently logged in the public blockchain/audit ledger with masked privacy IDs."
    ]
  },
  {
    title: "4. Prize Fulfillment & Claim Window",
    points: [
      "Winners must submit their verified claim details within 7 calendar days of the announcement.",
      "Unclaimed prizes after 7 days will roll over into the next community reserve draw.",
      "Physical prizes are dispatched via tracked courier within 5-10 business days.",
      "Digital vouchers are delivered to the registered email within 24-48 hours."
    ]
  },
  {
    title: "5. Anti-Fraud & Abuse Policy",
    points: [
      "VELOOP employs device fingerprinting and velocity rate-limiting to prevent bot participation.",
      "Any account exhibiting suspicious automation or exploiting vulnerabilities will be permanently banned.",
      "All decisions made by VELOOP compliance auditors regarding draw validity are final."
    ]
  }
];

// Demo user profiles for testing all states effortlessly
export const demoUserProfiles = {
  visitor: {
    id: null,
    name: "Guest Visitor",
    role: "VISITOR",
    isLoggedIn: false,
    balances: { VEs: 0, SVEs: 0, Tokens: 0 },
    joinedPrizeIds: [],
    wonPrize: null,
    claimStatus: null
  },
  participant: {
    id: "VE98321",
    name: "Rahul Sharma",
    maskedId: "VE****21",
    role: "PARTICIPANT",
    isLoggedIn: true,
    balances: { VEs: 850, SVEs: 1200, Tokens: 4500 },
    joinedPrizeIds: ["PRIZE-001"], // already joined iPhone
    wonPrize: null,
    claimStatus: null
  },
  winner: {
    id: "VE10025",
    name: "Alex Kumar",
    maskedId: "VE****25",
    role: "WINNER",
    isLoggedIn: true,
    balances: { VEs: 620, SVEs: 900, Tokens: 3800 },
    joinedPrizeIds: ["PRIZE-002"],
    wonPrize: {
      prizeId: "PRIZE-002",
      prizeName: "Apple Watch Series 9",
      prizePosition: "2ND PRIZE",
      image: "/assets/watch.png",
      value: "₹41,900",
      type: "PHYSICAL",
      deadline: "7 Days Remaining"
    },
    claimStatus: "NOT_SUBMITTED" // NOT_SUBMITTED | SUBMITTED | PROCESSING | COMPLETED
  },
  nonWinner: {
    id: "VE44190",
    name: "Priya Menon",
    maskedId: "VE****90",
    role: "NON_WINNER",
    isLoggedIn: true,
    balances: { VEs: 400, SVEs: 600, Tokens: 2100 },
    joinedPrizeIds: ["PRIZE-001"],
    wonPrize: null,
    claimStatus: null
  },
  lowBalance: {
    id: "VE22108",
    name: "Ankit Verma",
    maskedId: "VE****08",
    role: "LOW_BALANCE",
    isLoggedIn: true,
    balances: { VEs: 80, SVEs: 150, Tokens: 500 }, // Not enough for iPhone (250) or Watch (200)
    joinedPrizeIds: [],
    wonPrize: null,
    claimStatus: null
  }
};
