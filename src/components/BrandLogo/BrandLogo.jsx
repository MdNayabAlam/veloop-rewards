import React, { useState } from "react";
import "./BrandLogo.css";

/**
 * VELOOP Rewards - Ultra-Premium "VR" Emblem & Brand Monogram
 * 
 * Aesthetic Specs:
 * - Dual-Tone High-End Monogram: Solar Flare Gold + Electric Cyber Violet
 * - Geometric Interlocking V & R matching official brand assets (Ref_02)
 * - Multi-layered Ambient Backglow (Amber + Neon Purple)
 * - Periodic Metallic Glint Sweep + 3D Spring Tilt physics on hover
 * - Specular Light Bevels for realistic depth
 * - Sound / Haptic Micro-interaction feedback on click
 */
export default function BrandLogo({
  size = "md",
  showText = true,
  withBadge = false,
  className = "",
  onClick
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (e) => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
    if (onClick) onClick(e);
  };

  return (
    <div
      className={`veloop-brand-logo size-${size} ${withBadge ? "with-badge" : ""} ${
        isHovered ? "is-hovered" : ""
      } ${isClicked ? "is-active" : ""} ${className}`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role={onClick ? "button" : "presentation"}
      tabIndex={onClick ? 0 : undefined}
      aria-label="VELOOP Rewards Home"
    >
      {/* Dynamic Ambient Neon Aura */}
      <div className="logo-ambient-aura" aria-hidden="true">
        <span className="aura-core gold" />
        <span className="aura-core purple" />
      </div>

      {/* VR Emblem Frame */}
      <div className="vr-emblem-container">
        <svg
          className="vr-vector-svg"
          viewBox="0 0 100 86"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            {/* Radiant Solar Gold Gradient for V Left Wing & Upper R */}
            <linearGradient id="vrGoldLinear" x1="0%" y1="0%" x2="100%" y2="85%">
              <stop offset="0%" stopColor="#FFF085" />
              <stop offset="28%" stopColor="#FFB703" />
              <stop offset="65%" stopColor="#FB8500" />
              <stop offset="100%" stopColor="#E05700" />
            </linearGradient>

            {/* Electric Cyber Violet Gradient for Interlock & R Kick */}
            <linearGradient id="vrVioletLinear" x1="10%" y1="0%" x2="95%" y2="100%">
              <stop offset="0%" stopColor="#E9D5FF" />
              <stop offset="30%" stopColor="#C084FC" />
              <stop offset="70%" stopColor="#9333EA" />
              <stop offset="100%" stopColor="#6B21A8" />
            </linearGradient>

            {/* Specular Bevel Highlights */}
            <linearGradient id="vrSpecularLight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>

            {/* Metallic Edge Sheen */}
            <linearGradient id="vrSheenGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#FFE066" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#9333EA" stopOpacity="0" />
            </linearGradient>

            {/* Neon Drop Shadow Filter */}
            <filter id="vrEmblemGlow" x="-25%" y="-25%" width="150%" height="150%">
              <feDropShadow dx="0" dy="2" stdDeviation="3.5" floodColor="#FFB703" floodOpacity="0.5" />
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#9333EA" floodOpacity="0.45" />
            </filter>
          </defs>

          <g filter="url(#vrEmblemGlow)" className="vr-svg-artwork">
            {/* 1. LEFT WING OF 'V' (Solar Gold Slanted Bar) */}
            <polygon
              points="8,14 28,14 47,74 31,74 6,19"
              fill="url(#vrGoldLinear)"
            />
            {/* V Wing Specular Top Bevel */}
            <polygon
              points="8,14 28,14 25,20 10,20"
              fill="url(#vrSpecularLight)"
              opacity="0.95"
            />
            {/* V Wing Inner Highlight Edge */}
            <line
              x1="9"
              y1="15"
              x2="31"
              y2="73"
              stroke="#FFF"
              strokeWidth="0.8"
              opacity="0.4"
            />

            {/* 2. UPPER LOOP OF 'R' (Solar Gold Tech Chamfered Arch) */}
            <path
              d="M 37,14 L 72,14 L 88,30 L 88,40 L 75,50 L 46,50 L 49,41 L 68,41 L 76,34 L 76,32 L 68,23 L 42,23 Z"
              fill="url(#vrGoldLinear)"
            />
            {/* R Upper Loop Specular Highlight */}
            <path
              d="M 37,14 L 72,14 L 88,30 L 82,30 L 69,18 L 40,18 Z"
              fill="url(#vrSpecularLight)"
              opacity="0.9"
            />
            {/* R Inner Loop Chamfer Edge */}
            <path
              d="M 42,23 L 68,23 L 76,32"
              stroke="#FFF"
              strokeWidth="0.75"
              opacity="0.35"
              fill="none"
            />

            {/* 3. CENTER INTERLOCKING STRIPE (Neon Purple Diagonal Stem) */}
            {/* Upper angled chip */}
            <polygon
              points="33,26 49,26 45,33 29,33"
              fill="#D8B4FE"
            />
            {/* Main slanted purple torso */}
            <polygon
              points="27,37 44,37 36,74 21,74"
              fill="url(#vrVioletLinear)"
            />
            {/* Specular glint on purple torso */}
            <line
              x1="28"
              y1="38"
              x2="22"
              y2="73"
              stroke="#FFF"
              strokeWidth="0.8"
              opacity="0.45"
            />

            {/* 4. LOWER ACCENT CHIP (Bottom Apex Accent) */}
            <polygon
              points="42,62 52,62 48,73 38,73"
              fill="#C084FC"
            />

            {/* 5. RIGHT LEG / KICK OF 'R' (Electric Violet to Deep Purple) */}
            <polygon
              points="53,46 68,46 88,74 68,74"
              fill="url(#vrVioletLinear)"
            />
            {/* R Leg Specular Edge */}
            <polygon
              points="53,46 59,46 76,71 70,71"
              fill="url(#vrSpecularLight)"
              opacity="0.4"
            />
          </g>
        </svg>

        {/* Dynamic Sweeping Sheen */}
        <span className="emblem-laser-sheen" aria-hidden="true" />
      </div>

      {/* Typography: VELOOP + REWARDS */}
      {showText && (
        <div className="brand-lockup-copy">
          <div className="brand-headline-wrap">
            <span className="brand-headline-text">VELOOP</span>
            <span className="brand-dot-pulse" />
          </div>
          <div className="brand-tagline-wrap">
            <span className="brand-tagline-text">REWARDS</span>
          </div>
        </div>
      )}
    </div>
  );
}
