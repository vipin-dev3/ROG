import React, { useId } from 'react';

/**
 * RogVLogo - Custom Cybernetic "V" Gaming Emblem
 * 
 * Inspired by ASUS Republic of Gamers geometric aesthetic:
 * - Dual swept outer wings with aggressive speed cuts
 * - Negative-space faceted vents
 * - High-contrast inner tech chevron
 * - Glowing lower vertex keel
 */
export default function RogVLogo({ 
  className = "w-6 h-6", 
  isLight = false, 
  glow = true,
  accentColor = "#ff0033",
  ...props 
}) {
  const reactId = useId().replace(/:/g, '');
  const redGradLeftId = `rog-v-red-l-${reactId}`;
  const redGradRightId = `rog-v-red-r-${reactId}`;

  const chevronFill = isLight ? "#0f172a" : "#ffffff";
  const glowClass = glow ? "drop-shadow-[0_0_10px_rgba(255,0,51,0.75)]" : "";

  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${glowClass} select-none transition-transform duration-300`}
      {...props}
    >
      <defs>
        {/* Left Wing Gradient */}
        <linearGradient id={redGradLeftId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff2a55" />
          <stop offset="55%" stopColor={accentColor} />
          <stop offset="100%" stopColor="#a30020" />
        </linearGradient>

        {/* Right Wing Gradient */}
        <linearGradient id={redGradRightId} x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ff406a" />
          <stop offset="50%" stopColor={accentColor} />
          <stop offset="100%" stopColor="#8a001a" />
        </linearGradient>
      </defs>

      {/* Left Upper Wing Blade */}
      <path 
        d="M 14 18 L 38 12 L 47 46 L 29 50 L 19 32 Z" 
        fill={`url(#${redGradLeftId})`} 
      />

      {/* Right Upper Wing Blade */}
      <path 
        d="M 86 18 L 62 12 L 53 46 L 71 50 L 81 32 Z" 
        fill={`url(#${redGradRightId})`} 
      />

      {/* Inner High-Contrast Tech Chevron */}
      <path 
        d="M 34 26 L 50 56 L 66 26 L 50 38 Z" 
        fill={chevronFill}
        className="transition-colors duration-200"
      />

      {/* Left Lower Keel (Meeting at Vertex) */}
      <path 
        d="M 27 56 L 46 52 L 49.5 92 L 40 76 Z" 
        fill={`url(#${redGradLeftId})`} 
      />

      {/* Right Lower Keel (Meeting at Vertex) */}
      <path 
        d="M 73 56 L 54 52 L 50.5 92 L 60 76 Z" 
        fill={`url(#${redGradRightId})`} 
      />

      {/* Central Glowing Apex Diamond */}
      <polygon 
        points="50,62 55,74 50,86 45,74" 
        fill={accentColor}
      />
    </svg>
  );
}
