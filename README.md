# 🎁 VELOOP Rewards – Premium Giveaway Section

A production-grade, fintech-inspired, highly responsive **Giveaway Section** for **VELOOP Rewards**. Built with React 19, Vite, custom responsive CSS design tokens, dynamic countdown cycles, atomic virtual balance verification, and a live state simulator.

---

## 🌟 Key Features

1. **Full-Featured Giveaway Home & Dedicated Individual Pages (`/giveaway/:slug`)**
   - High-impact hero banner with floating 3D gift illustrations (`gift box 1.png`, `gift box.png`) matching the design direction of `Ref_01.jpeg` and `Ref_02.jpeg`.
   - Real-time live countdown timer (Days, Hours, Minutes, Seconds) that automatically transitions the UI into the `ENDED` state upon hitting zero.
   - Every "Join Now" CTA navigates to an individual details page (`/giveaway/iphone-15-pro`, `/giveaway/apple-watch-series-9`, `/giveaway/airpods-pro-2`, `/giveaway/amazon-2000`, `/giveaway/amazon-500`, `/giveaway/amazon-20`).

2. **Accurate Currency & Joining Fee Engine**
   - **iPhone 15 Pro**: 250 VEs (1 Certified Winner)
   - **Apple Watch Series 9**: 200 VEs (3 Certified Winners)
   - **AirPods Pro 2**: 500 SVEs (5 Certified Winners)
   - **₹2,000 Amazon Voucher**: 500 VEs (10 Certified Winners)
   - **₹500 Amazon Voucher**: 300 VEs (15 Certified Winners)
   - **₹20 Voucher**: 2,000 Tokens (50 Certified Winners)

3. **Live Virtual Balance Verification & Atomic Entry**
   - Live check against the user's wallet balances (`VEs`, `SVEs`, `Tokens`).
   - If sufficient: displays positive balance delta and opens the confirmation modal.
   - If insufficient: highlights balance deficit warning and changes CTA to `Earn More [Currency] →`.
   - Confirmation modal calculates `Balance Before - Entry Fee = Balance After`.

4. **Certified Winner Hall & Previous Winners History**
   - **Active State**: In accordance with compliance standards, active draws do not falsely show winners; instead, it presents a transparent draw countdown and certified distribution table.
   - **Ended State**: Unlocks verified winner cards with masked IDs (`VE****72`, `VE****25`, etc.).
   - **Previous Winners Hall**: Displays historical completed events (*August Reward Rush*, *Monsoon Super Draw*, *Summer Rewards Fest*) with verified delivery tags.

5. **Personalized Winner Spotlight & Smart Prize Claim Flow**
   - When a logged-in user's ID matches a winner (`VE10025`), a golden celebratory banner appears.
   - **Physical Prize Form** (*iPhone, Watch, AirPods*): Collects Full Legal Name, Phone, Complete Address, City, State, PIN Code.
   - **Digital Voucher Form** (*Amazon Gift Cards*): Collects verified Email Address only (no delivery address requested).
   - Lifecycle simulation: `NOT_SUBMITTED` ➔ `SUBMITTED` ➔ `PROCESSING` ➔ `COMPLETED` (Tracking #VEL-982104).

6. **Continuous Auto-Scrolling Winner Ticker**
   - Smooth horizontal announcement marquee featuring masked winner IDs and prizes.
   - Pauses on hover, fully readable on mobile.

7. **Custom VELOOP Giveaway-Themed Loader**
   - 3D-styled animated gift vault with concentric pulsing glow rings, floating sparkle particles, and rotating messages (*"Preparing today's verified rewards...", "Verifying participant entries..."*).

8. **Live Dev Simulator Toolbar**
   - A sticky toolbar at the top that lets evaluators effortlessly test all 5 user roles (*Visitor, Participant, Winner VE10025, Non-Winner, Low-Balance*) and 3 giveaway lifecycles (*ACTIVE, ENDED, UPCOMING*) with 1 click.

---

## 🛠️ Technology Stack

- **Framework**: React 19 + Vite
- **Styling**: Vanilla CSS Modules & Custom Tokens (Fintech dark theme, HSL glows, glassmorphism)
- **Icons**: `lucide-react`
- **Celebration Effects**: `canvas-confetti`
- **Typography**: Google Fonts (*Plus Jakarta Sans*)

---

## 📁 Component Architecture

```
src/
├── assets/                  # Hero illustrations, product assets, and gift boxes
├── components/
│   ├── ConfirmationModal/   # Balance breakdown and entry confirmation
│   ├── DemoToolbar/         # Sticky developer simulator toolbar
│   ├── FAQSection/          # Accordion FAQ
│   ├── FeaturedGiveaways/   # 6-prize grid with badges, glows, and CTAs
│   ├── Footer/              # Brand footer with legal and support links
│   ├── GiveawayLoader/      # Custom branded gift vault loading animation
│   ├── GiveawayStats/       # 4-column live statistics bar
│   ├── GiveawayRulesModal/  # Official terms & anti-fraud drawer
│   ├── HeroBanner/          # Banner with 3D gifts, live timer, and value pills
│   ├── HowToParticipate/    # 4-step interactive timeline
│   ├── LoginModal/          # Visitor authentication & demo login prompt
│   ├── Navbar/              # Brand header with live wallet balances pill
│   ├── PrizeClaimModal/     # Smart claim forms (Physical vs Digital)
│   ├── Toast/               # Instant floating user feedback
│   ├── TrustSection/        # 4 trust pillars (100% Transparent, Secure, Fair)
│   ├── WinnerSlider/        # Infinite horizontal announcement marquee
│   ├── WinnersSection/      # Tabbed current vs historical winners
│   └── WinnerSpotlight/     # Personalized winner congratulations card
├── context/
│   └── GiveawayContext.jsx  # Central state management & mock API service
├── data/
│   └── giveawayData.js      # Structured mock API schemas
├── pages/
│   ├── GiveawayHome/        # Landing page
│   └── IndividualGiveaway/  # Dedicated details page per prize slug
├── App.jsx                  # Root router & modal orchestrator
├── App.css                  # Container & base styling
├── index.css                # Global typography and dark reset
└── main.jsx                 # Vite entry point
```

---

## 🚀 Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the local Vite development server:
   ```bash
   npm run dev
   ```

3. Build production bundle:
   ```bash
   npm run build
   ```

---

## 🔌 Future Backend Integration

The frontend state and data models (`src/data/giveawayData.js`) are architected to connect directly to the upcoming Express/MongoDB REST API:

- `GET /api/giveaways/current` ➔ Load active event, prizes, entry fees, and closing time.
- `GET /api/giveaways/:id` ➔ Load individual giveaway details, specs, and status.
- `GET /api/giveaways/:id/winners` ➔ Load certified winners list once closed.
- `GET /api/giveaways/previous` ➔ Load historical completed draws.
- `GET /api/giveaways/:id/my-status` ➔ Check if user is participating, eligible, or has won.
- `POST /api/giveaways/:id/join` ➔ Atomic balance deduction with idempotency key.
- `POST /api/giveaways/:id/claim` ➔ Submit verified physical address or digital email.
