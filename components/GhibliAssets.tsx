import React from "react";

// ==========================================
// TYPES & INTERFACES
// ==========================================
export type VehiclePerspective =
  | "rear"
  | "rear-right"
  | "rear-left"
  | "side-right"
  | "side-left"
  | "front-right"
  | "front-left"
  | "front";

export interface VehicleProps {
  perspective: VehiclePerspective;
  className?: string;
  isAccelerating?: boolean;
}

// ==========================================
// 1. GHIBLI SVG FILTERS & ADVANCED DEFS
// ==========================================
export const GhibliDefs: React.FC = () => {
  return (
    <defs>
      {/* Watercolor paper wash texture */}
      <filter id="ghibli-paper" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.035"
          numOctaves="3"
          result="noise"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="noise"
          scale="2.5"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>

      {/* Wheel & object contact drop shadow */}
      <filter id="ghibli-shadow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.08   0 0 0 0 0.16   0 0 0 0 0.09   0 0 0 0.65 0"
        />
        <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
      </filter>

      {/* Soft atmospheric cloud blur */}
      <filter id="soft-mist" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="8" />
      </filter>

      {/* Warm lantern & window glow filter */}
      <filter id="warm-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* Water shimmer effect */}
      <filter id="water-shimmer" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.02 0.05" numOctaves="2" result="noise">
          <animate attributeName="baseFrequency" values="0.02 0.05;0.025 0.06;0.02 0.05" dur="7s" repeatCount="indefinite" />
        </feTurbulence>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
      </filter>

      {/* Sky Gradients */}
      <linearGradient id="grad-sky-ghibli" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1E5283" />
        <stop offset="20%" stopColor="#3C7DB2" />
        <stop offset="45%" stopColor="#7FB7D7" />
        <stop offset="70%" stopColor="#A8D8EA" />
        <stop offset="85%" stopColor="#F6D6A8" />
        <stop offset="100%" stopColor="#FCECD2" />
      </linearGradient>

      {/* Distant Mountain Horizons */}
      <linearGradient id="grad-mountain-far" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#254261" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#5E88AA" stopOpacity="0.8" />
      </linearGradient>

      <linearGradient id="grad-mountain-mid" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1C4B33" />
        <stop offset="100%" stopColor="#3E754C" />
      </linearGradient>

      <linearGradient id="grad-mountain-near" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#24532B" />
        <stop offset="70%" stopColor="#4A8237" />
        <stop offset="100%" stopColor="#75A844" />
      </linearGradient>

      {/* Solid Ground & Terrain Gradients */}
      <linearGradient id="grad-terrain-base" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#4D8A38" />
        <stop offset="35%" stopColor="#3A782E" />
        <stop offset="70%" stopColor="#295D24" />
        <stop offset="100%" stopColor="#1A4518" />
      </linearGradient>

      <linearGradient id="grad-terrain-lowland" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#2E692B" />
        <stop offset="50%" stopColor="#225420" />
        <stop offset="100%" stopColor="#173B16" />
      </linearGradient>

      <linearGradient id="grad-terrain-highland" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#6DB84D" />
        <stop offset="50%" stopColor="#529B3A" />
        <stop offset="100%" stopColor="#3C7B28" />
      </linearGradient>

      <linearGradient id="grad-terrain-plateau" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#76C454" />
        <stop offset="50%" stopColor="#5EAA40" />
        <stop offset="100%" stopColor="#478E2E" />
      </linearGradient>

      {/* Rolling Green Hills & Crest Highlights */}
      <linearGradient id="grad-green-hills" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#75C653" />
        <stop offset="35%" stopColor="#5CAA42" />
        <stop offset="75%" stopColor="#438E32" />
        <stop offset="100%" stopColor="#2D6E23" />
      </linearGradient>

      <linearGradient id="grad-hill-crest" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#8AE064" />
        <stop offset="50%" stopColor="#6CBE48" />
        <stop offset="100%" stopColor="#4E9E35" />
      </linearGradient>

      {/* Radiant Studio Ghibli Green Hills Gradients */}
      <linearGradient id="grad-ghibli-emerald-crest" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#A4F464" />
        <stop offset="30%" stopColor="#7EDB42" />
        <stop offset="70%" stopColor="#4EAE28" />
        <stop offset="100%" stopColor="#2A7316" />
      </linearGradient>

      <linearGradient id="grad-ghibli-golden-hill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#C4F878" />
        <stop offset="35%" stopColor="#92E548" />
        <stop offset="70%" stopColor="#5ABE30" />
        <stop offset="100%" stopColor="#30821A" />
      </linearGradient>

      <linearGradient id="grad-ghibli-pasture-swell" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#9CEE54" />
        <stop offset="45%" stopColor="#68CA38" />
        <stop offset="100%" stopColor="#3C9020" />
      </linearGradient>

      <linearGradient id="grad-ghibli-sunlit-rim" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#CEFA85" />
        <stop offset="50%" stopColor="#E2FFAA" />
        <stop offset="100%" stopColor="#AEF268" />
      </linearGradient>

      <linearGradient id="grad-cliff-face" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#364932" />
        <stop offset="40%" stopColor="#495C44" />
        <stop offset="70%" stopColor="#576952" />
        <stop offset="100%" stopColor="#2A3826" />
      </linearGradient>

      <linearGradient id="grad-laterite-soil" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#8C4428" />
        <stop offset="50%" stopColor="#A85735" />
        <stop offset="100%" stopColor="#73361E" />
      </linearGradient>

      {/* Rushing Mountain Stream */}
      <linearGradient id="grad-river" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#4AA5C9" />
        <stop offset="50%" stopColor="#2F87AB" />
        <stop offset="100%" stopColor="#1C6B8D" />
      </linearGradient>

      <linearGradient id="grad-waterfall" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#C9EDF7" />
        <stop offset="50%" stopColor="#8AD3EA" />
        <stop offset="100%" stopColor="#55B3D4" />
      </linearGradient>

      {/* Serpentine Asphalt Highway */}
      <linearGradient id="grad-asphalt" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#282F36" />
        <stop offset="15%" stopColor="#363F47" />
        <stop offset="50%" stopColor="#48535C" />
        <stop offset="85%" stopColor="#363F47" />
        <stop offset="100%" stopColor="#262C32" />
      </linearGradient>

      <linearGradient id="grad-road-shoulder" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#584C3A" />
        <stop offset="100%" stopColor="#7D705B" />
      </linearGradient>

      {/* Terracotta Chalet Roof */}
      <linearGradient id="grad-terracotta" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#C25A3F" />
        <stop offset="50%" stopColor="#A04229" />
        <stop offset="100%" stopColor="#792D19" />
      </linearGradient>

      {/* Cedar Wood Chalet Wall */}
      <linearGradient id="grad-cedar" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#D98A52" />
        <stop offset="50%" stopColor="#E9A26F" />
        <stop offset="100%" stopColor="#C4733A" />
      </linearGradient>

      {/* Warm Streetlamp / Lantern Glow */}
      <radialGradient id="grad-lantern" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFF7D6" stopOpacity="1" />
        <stop offset="35%" stopColor="#F9D770" stopOpacity="0.85" />
        <stop offset="70%" stopColor="#E5A429" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#E5A429" stopOpacity="0" />
      </radialGradient>

      {/* Natural Grass Pattern */}
      <pattern id="grass-texture" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
        <path d="M 4 24 Q 4 16 5 11" stroke="#255E28" strokeWidth="1.2" fill="none" opacity="0.35" />
        <path d="M 10 24 Q 11 14 9 9" stroke="#377837" strokeWidth="1.2" fill="none" opacity="0.3" />
        <path d="M 16 24 Q 15 17 17 12" stroke="#28632B" strokeWidth="1.2" fill="none" opacity="0.35" />
        <path d="M 21 24 Q 21 18 20 14" stroke="#488E48" strokeWidth="0.9" fill="none" opacity="0.3" />
      </pattern>

      {/* Granite Rock Bed Texture */}
      <pattern id="granite-texture" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <circle cx="8" cy="8" r="3" fill="#4B463C" opacity="0.25" />
        <circle cx="28" cy="16" r="2.5" fill="#585246" opacity="0.2" />
        <circle cx="16" cy="30" r="3.5" fill="#3F3A32" opacity="0.22" />
        <circle cx="34" cy="34" r="2" fill="#5E584B" opacity="0.18" />
      </pattern>
    </defs>
  );
};

// ==========================================
// 2. CONTINUOUS SOLID TERRAIN BASE (NO GAPS!)
// ==========================================
export const FullWorldTerrain: React.FC = () => {
  return (
    <g id="full-world-terrain">
      {/* 100% Solid Global Base Plane: Fills entire canvas from -400 to 2000, -400 to 4200 */}
      <rect
        x="-400"
        y="-400"
        width="2400"
        height="4400"
        fill="url(#grad-terrain-base)"
      />

      {/* Global Ghibli grass texture overlay */}
      <rect
        x="-400"
        y="-400"
        width="2400"
        height="4400"
        fill="url(#grass-texture)"
        opacity="0.45"
      />

      {/* Deep Mountain Contour Ridges across the whole journey */}
      {/* Zone 4 High Summit Plateaus */}
      <path
        d="M -300 200 Q 200 120 700 220 Q 1200 140 1700 240 L 1700 1100 Q 1200 1150 700 1080 Q 200 1140 -300 1080 Z"
        fill="url(#grad-terrain-plateau)"
        opacity="0.75"
      />

      {/* Zone 3 Rolling Highland Pastures */}
      <path
        d="M -300 1100 Q 300 1020 800 1140 Q 1300 1060 1700 1160 L 1700 1950 Q 1200 2000 800 1920 Q 300 2020 -300 1940 Z"
        fill="url(#grad-terrain-highland)"
        opacity="0.7"
      />

      {/* Zone 2 Steep Mountain Slopes & Cliff Gorges */}
      <path
        d="M -300 1950 Q 200 1880 700 1980 Q 1200 1900 1700 2020 L 1700 2950 Q 1300 3020 800 2940 Q 300 3040 -300 2960 Z"
        fill="url(#grad-terrain-lowland)"
        opacity="0.8"
      />

      {/* Zone 1 Tropical Valley Rainforest Base */}
      <path
        d="M -300 2950 Q 300 2880 800 3000 Q 1300 2920 1700 3040 L 1700 3900 L -300 3900 Z"
        fill="#173B16"
        opacity="0.9"
      />

      {/* Rolling hillocks with soft gouache highlights */}
      <ellipse cx="450" cy="550" rx="320" ry="70" fill="#75C653" opacity="0.3" />
      <ellipse cx="1150" cy="620" rx="280" ry="60" fill="#6CB84B" opacity="0.35" />
      <ellipse cx="380" cy="1420" rx="350" ry="80" fill="#66B345" opacity="0.35" />
      <ellipse cx="1220" cy="1540" rx="320" ry="75" fill="#5DA83E" opacity="0.4" />
      <ellipse cx="780" cy="1800" rx="400" ry="90" fill="#589E39" opacity="0.3" />

      {/* Foundational highland contours */}
      <ellipse cx="450" cy="2250" rx="350" ry="90" fill="#4B9A34" opacity="0.3" />
      <ellipse cx="1250" cy="2250" rx="380" ry="95" fill="#4B9A34" opacity="0.3" />
    </g>
  );
};

// ==========================================
// 2B. VISIBLE ROLLING GREEN HILLS BEFORE RANCH ENTRANCE
// ==========================================
export const PreEntranceGreenHills: React.FC = () => {
  return (
    <g id="pre-entrance-green-hills">
      {/* ======================================================== */}
      {/* 1. DISTANT ROLLING GREEN HIGHLAND RIDGES (Y: 2040..2520) */}
      {/* ======================================================== */}
      {/* Distant East Emerald Ridge */}
      <path
        d="M 840 2480 Q 1080 2160 1340 2210 Q 1600 2120 1960 2240 L 1960 2560 L 840 2560 Z"
        fill="url(#grad-ghibli-emerald-crest)"
      />
      {/* Sunlit golden crest edge */}
      <path
        d="M 850 2460 Q 1080 2160 1340 2210 Q 1600 2120 1940 2230"
        fill="none"
        stroke="url(#grad-ghibli-sunlit-rim)"
        strokeWidth="9"
        strokeLinecap="round"
        opacity="0.9"
      />

      {/* Distant West Emerald Ridge */}
      <path
        d="M -300 2460 Q 30 2160 340 2230 Q 580 2130 750 2260 L 750 2560 L -300 2560 Z"
        fill="url(#grad-ghibli-golden-hill)"
      />
      {/* Sunlit golden crest edge */}
      <path
        d="M -280 2440 Q 30 2160 340 2230 Q 580 2130 730 2250"
        fill="none"
        stroke="url(#grad-ghibli-sunlit-rim)"
        strokeWidth="9"
        strokeLinecap="round"
        opacity="0.9"
      />

      {/* ======================================================== */}
      {/* 2. MIDGROUND SCULPTED ROLLING KNOLLS (CLEAR 3D RELIEF)  */}
      {/* ======================================================== */}

      {/* --- EAST SIDE HILL RANGE (Right of the road approach) --- */}
      {/* Lower East Swelling Hill (y=2380) */}
      <g id="east-hill-lower">
        <ellipse cx="1340" cy="2380" rx="330" ry="90" fill="url(#grad-ghibli-emerald-crest)" />
        <path d="M 1040 2360 Q 1340 2295 1640 2360" fill="none" stroke="url(#grad-ghibli-sunlit-rim)" strokeWidth="7" strokeLinecap="round" />
        <ellipse cx="1280" cy="2345" rx="110" ry="34" fill="#B6F876" opacity="0.4" />
        <ellipse cx="1440" cy="2370" rx="80" ry="26" fill="#8EE446" opacity="0.35" />
      </g>

      {/* Main East Scenic Hill Knoll (y=2250) */}
      <g id="east-hill-main">
        <ellipse cx="1240" cy="2250" rx="310" ry="88" fill="url(#grad-ghibli-golden-hill)" />
        <path d="M 960 2230 Q 1240 2165 1520 2230" fill="none" stroke="url(#grad-ghibli-sunlit-rim)" strokeWidth="8" strokeLinecap="round" />
        {/* Sun-dappled pasture clearings */}
        <ellipse cx="1180" cy="2215" rx="100" ry="32" fill="#CEFA85" opacity="0.5" />
        <ellipse cx="1320" cy="2235" rx="85" ry="28" fill="#B4F56E" opacity="0.45" />
      </g>

      {/* Upper East Hill Knoll (y=2120) */}
      <g id="east-hill-upper">
        <ellipse cx="1120" cy="2120" rx="270" ry="75" fill="url(#grad-ghibli-pasture-swell)" />
        <path d="M 880 2105 Q 1120 2045 1360 2105" fill="none" stroke="#D2FFA0" strokeWidth="7" strokeLinecap="round" />
        <ellipse cx="1080" cy="2090" rx="85" ry="26" fill="#D8FF9E" opacity="0.5" />
      </g>

      {/* East Gateway Flanking Hillock (y=2015, framing the gate) */}
      <g id="east-gate-flank">
        <ellipse cx="1040" cy="2010" rx="190" ry="52" fill="url(#grad-ghibli-emerald-crest)" />
        <path d="M 890 2000 Q 1040 1958 1190 2000" fill="none" stroke="#D2FFA0" strokeWidth="6" strokeLinecap="round" />
        <ellipse cx="1020" cy="1990" rx="65" ry="20" fill="#CEFA85" opacity="0.5" />
      </g>

      {/* --- WEST SIDE HILL RANGE (Left of road approach & inside curve) --- */}
      {/* West Hairpin Shoulder Hill (y=2160, x=180) */}
      <g id="west-hill-shoulder">
        <ellipse cx="180" cy="2160" rx="270" ry="78" fill="url(#grad-ghibli-emerald-crest)" />
        <path d="M -50 2145 Q 180 2085 410 2145" fill="none" stroke="url(#grad-ghibli-sunlit-rim)" strokeWidth="7" strokeLinecap="round" />
        <ellipse cx="160" cy="2130" rx="90" ry="30" fill="#B6F876" opacity="0.45" />
      </g>

      {/* The Central Basin Emerald Knoll (Nestled inside the horseshoe curve: y=2250, x=520) */}
      <g id="west-horseshoe-basin-hill">
        <ellipse cx="520" cy="2250" rx="240" ry="80" fill="url(#grad-ghibli-golden-hill)" />
        <path d="M 310 2235 Q 520 2170 730 2235" fill="none" stroke="url(#grad-ghibli-sunlit-rim)" strokeWidth="7.5" strokeLinecap="round" />
        <ellipse cx="500" cy="2215" rx="85" ry="28" fill="#CEFA85" opacity="0.5" />
        <ellipse cx="590" cy="2235" rx="60" ry="22" fill="#B4F56E" opacity="0.4" />
      </g>

      {/* West Gateway Flanking Hillock (y=2015, x=560, framing the gate) */}
      <g id="west-gate-flank">
        <ellipse cx="560" cy="2010" rx="190" ry="52" fill="url(#grad-ghibli-pasture-swell)" />
        <path d="M 410 2000 Q 560 1958 710 2000" fill="none" stroke="#D2FFA0" strokeWidth="6" strokeLinecap="round" />
        <ellipse cx="540" cy="1990" rx="65" ry="20" fill="#CEFA85" opacity="0.5" />
      </g>

      {/* ======================================================== */}
      {/* 3. PASTORAL CATTLE TRAILS & HILLSIDE FOOTPATHS           */}
      {/* ======================================================== */}
      <path
        d="M 1480 2310 Q 1340 2260 1200 2280 Q 1080 2210 980 2180"
        fill="none"
        stroke="#826F52"
        strokeWidth="3"
        strokeDasharray="9 5"
        opacity="0.55"
      />
      <path
        d="M 120 2210 Q 280 2170 420 2220 Q 540 2170 620 2140"
        fill="none"
        stroke="#826F52"
        strokeWidth="2.8"
        strokeDasharray="8 5"
        opacity="0.55"
      />

      {/* ======================================================== */}
      {/* 4. GRAZING WHITE FULANI HIGHLAND CATTLE ON THE HILLS     */}
      {/* ======================================================== */}
      {/* East Hill Grazing Cow & Resting Calf */}
      <g id="pre-gate-cattle-east" transform="translate(1200, 2220) scale(1.05)">
        <ellipse cx="26" cy="30" rx="30" ry="8" fill="#1A3B18" opacity="0.38" />
        <rect x="10" y="16" width="5" height="15" rx="2" fill="#D6CFBD" />
        <rect x="18" y="18" width="5" height="13" rx="2" fill="#FAF6EC" />
        <rect x="38" y="16" width="5" height="15" rx="2" fill="#D6CFBD" />
        <rect x="46" y="18" width="5" height="13" rx="2" fill="#FAF6EC" />
        <ellipse cx="30" cy="12" rx="24" ry="14" fill="#FAF7EE" stroke="#CEC2A6" strokeWidth="1.5" />
        <ellipse cx="16" cy="2" rx="7" ry="5" fill="#EDE4D0" />
        <ellipse cx="4" cy="18" rx="10" ry="7" fill="#FAF7EE" stroke="#CEC2A6" strokeWidth="1.5" />
        <path d="M 6 13 C 2 6 -6 4 -12 2" fill="none" stroke="#63513C" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 8 14 C 4 8 -4 6 -10 4" fill="none" stroke="#63513C" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M 52 10 Q 56 20 54 28" fill="none" stroke="#FAF7EE" strokeWidth="2" strokeLinecap="round" />

        <g transform="translate(64, 14)">
          <ellipse cx="12" cy="14" rx="16" ry="6" fill="#1A3B18" opacity="0.32" />
          <ellipse cx="12" cy="9" rx="14" ry="8" fill="#F0E8D5" stroke="#CEC2A6" strokeWidth="1.2" />
          <circle cx="4" cy="4" r="4.5" fill="#FAF7EE" />
          <path d="M 4 2 Q 1 -2 0 -3" stroke="#5E4C38" strokeWidth="1.5" fill="none" />
        </g>
      </g>

      {/* West Basin Grazing Bull */}
      <g id="pre-gate-cattle-west" transform="translate(490, 2215) scale(0.95)">
        <ellipse cx="26" cy="30" rx="30" ry="8" fill="#1A3B18" opacity="0.38" />
        <rect x="8" y="14" width="5" height="17" rx="2" fill="#D6CFBD" />
        <rect x="18" y="16" width="5" height="15" rx="2" fill="#FAF6EC" />
        <rect x="36" y="14" width="5" height="17" rx="2" fill="#D6CFBD" />
        <rect x="46" y="16" width="5" height="15" rx="2" fill="#FAF6EC" />
        <ellipse cx="28" cy="10" rx="23" ry="13" fill="#F7F3E9" stroke="#CEC2A6" strokeWidth="1.5" />
        <ellipse cx="14" cy="1" rx="8" ry="5.5" fill="#E8DEC5" />
        <circle cx="6" cy="3" r="7.5" fill="#FAF7EE" stroke="#CEC2A6" strokeWidth="1.5" />
        <path d="M 6 -1 C 2 -12 -7 -16 -12 -19" fill="none" stroke="#594734" strokeWidth="2.8" strokeLinecap="round" />
        <path d="M 9 -1 C 13 -12 22 -16 27 -19" fill="none" stroke="#594734" strokeWidth="2.8" strokeLinecap="round" />
      </g>

      {/* ======================================================== */}
      {/* 5. VIBRANT HIGHLAND WILDFLOWER BLANKETS                  */}
      {/* ======================================================== */}
      {[
        { x: 1120, y: 2210, c: "#FFE853" },
        { x: 1140, y: 2215, c: "#FFFFFF" },
        { x: 1130, y: 2225, c: "#FBCFE8" },
        { x: 1260, y: 2240, c: "#FFE853" },
        { x: 1275, y: 2235, c: "#FED7AA" },
        { x: 1290, y: 2250, c: "#FFFFFF" },
        { x: 1040, y: 2110, c: "#FFE853" },
        { x: 1060, y: 2105, c: "#FFFFFF" },
        { x: 1160, y: 2130, c: "#FBCFE8" },
        { x: 1380, y: 2360, c: "#FFE853" },
        { x: 1400, y: 2370, c: "#FFFFFF" },
        { x: 440, y: 2230, c: "#FFE853" },
        { x: 460, y: 2225, c: "#FFFFFF" },
        { x: 450, y: 2240, c: "#FED7AA" },
        { x: 560, y: 2240, c: "#FBCFE8" },
        { x: 580, y: 2230, c: "#FFE853" },
        { x: 600, y: 2245, c: "#FFFFFF" },
        { x: 220, y: 2150, c: "#FFE853" },
        { x: 240, y: 2145, c: "#FFFFFF" },
      ].map((fl, idx) => (
        <circle key={`pre-gate-flower-${idx}`} cx={fl.x} cy={fl.y} r="2.8" fill={fl.c} />
      ))}

      {/* ======================================================== */}
      {/* 6. ALPINE PINE & CEDAR GROVES ON THE HILLCRESTS          */}
      {/* ======================================================== */}
      {[
        { x: 1350, y: 2200, s: 1.25, v: 0 },
        { x: 1450, y: 2170, s: 1.35, v: 1 },
        { x: 1550, y: 2220, s: 1.15, v: 2 },
        { x: 1220, y: 2070, s: 1.2, v: 1 },
        { x: 1320, y: 2090, s: 1.1, v: 0 },
        { x: 80, y: 2230, s: 1.2, v: 2 },
        { x: 40, y: 2170, s: 1.3, v: 0 },
        { x: 260, y: 2050, s: 1.15, v: 1 },
        { x: 420, y: 1990, s: 1.2, v: 2 },
        { x: 550, y: 1975, s: 1.15, v: 0 },
        { x: 1050, y: 1975, s: 1.15, v: 1 },
      ].map((tr, idx) => (
        <GhibliTree key={`pre-gate-crest-tree-${idx}`} x={tr.x} y={tr.y} scale={tr.s} variant={tr.v} />
      ))}

      {/* ======================================================== */}
      {/* 7. LUSH HIGHLAND GRASS TUFTS ON HILL SLOPES              */}
      {/* ======================================================== */}
      {[
        { x: 1080, y: 2230 },
        { x: 1240, y: 2170 },
        { x: 1010, y: 2120 },
        { x: 1190, y: 2050 },
        { x: 470, y: 2220 },
        { x: 340, y: 2160 },
        { x: 530, y: 2100 },
        { x: 610, y: 2025 },
        { x: 990, y: 2025 },
      ].map((gt, idx) => (
        <g key={`pre-gate-tuft-${idx}`} transform={`translate(${gt.x}, ${gt.y})`}>
          <path d="M -9 0 Q -7 -15 -3 -21" stroke="#8AE064" strokeWidth="1.8" fill="none" />
          <path d="M 0 0 Q 2 -17 6 -23" stroke="#A8F462" strokeWidth="1.8" fill="none" />
          <path d="M 9 0 Q 11 -13 13 -19" stroke="#6CBE48" strokeWidth="1.8" fill="none" />
        </g>
      ))}
    </g>
  );
};

// Aliases for backward compatibility
export const TerrainZone1Lowland = () => null;
export const TerrainZone2Switchbacks = () => null;
export const TerrainZone3Highland = () => null;
export const TerrainZone4Summit = () => null;

// ==========================================
// 3. LOWLAND MOUNTAIN STREAM & STONE ARCH BRIDGE
// ==========================================
export const MountainRiverAndBridge: React.FC = () => {
  return (
    <g id="mountain-river-and-bridge">
      {/* Deep Rocky Gorge Riverbed */}
      <path
        d="M -50 3420 Q 220 3380 480 3410 Q 750 3450 800 3400 Q 860 3350 1150 3390 Q 1400 3440 1700 3380"
        fill="none"
        stroke="#2E3C2B"
        strokeWidth="48"
        strokeLinecap="round"
      />
      {/* Wet River Granite Stones */}
      <path
        d="M -50 3420 Q 220 3380 480 3410 Q 750 3450 800 3400 Q 860 3350 1150 3390 Q 1400 3440 1700 3380"
        fill="none"
        stroke="#485344"
        strokeWidth="38"
        strokeLinecap="round"
      />
      {/* Crystal Clear River Water */}
      <path
        d="M -50 3420 Q 220 3380 480 3410 Q 750 3450 800 3400 Q 860 3350 1150 3390 Q 1400 3440 1700 3380"
        fill="none"
        stroke="url(#grad-river)"
        strokeWidth="24"
        strokeLinecap="round"
      />
      {/* Shimmering Whitewater Rapids & Foaming Water */}
      <path
        d="M -50 3420 Q 220 3380 480 3410 Q 750 3450 800 3400 Q 860 3350 1150 3390 Q 1400 3440 1700 3380"
        fill="none"
        stroke="#A5E2F5"
        strokeWidth="8"
        strokeLinecap="round"
        opacity="0.85"
      />

      {/* Riverbed Boulder Rocks */}
      {[
        { x: 180, y: 3410, r: 16 },
        { x: 380, y: 3390, r: 20 },
        { x: 620, y: 3430, r: 18 },
        { x: 960, y: 3380, r: 22 },
        { x: 1300, y: 3420, r: 19 },
      ].map((b, i) => (
        <g key={`boulder-${i}`} transform={`translate(${b.x}, ${b.y})`}>
          <ellipse cx="0" cy="4" rx={b.r + 3} ry={b.r * 0.45} fill="#182416" opacity="0.4" />
          <circle cx="0" cy="0" r={b.r} fill="#5A564A" stroke="#3D3A31" strokeWidth="1.5" />
          <circle cx="-3" cy="-4" r={b.r * 0.6} fill="#726E60" opacity="0.6" />
          {/* Moss on rock */}
          <ellipse cx="2" cy="-6" rx={b.r * 0.4} ry={b.r * 0.25} fill="#4E8A3A" opacity="0.6" />
        </g>
      ))}

      {/* Stone Arch Bridge Underpass (where the road at x=800 crosses the stream) */}
      <g id="stone-culvert-bridge" transform="translate(800, 3395)">
        {/* Bridge stone abutments below the road */}
        <rect x="-60" y="-18" width="120" height="36" rx="4" fill="#696357" stroke="#484338" strokeWidth="2" />
        {/* Arch culvert opening for river */}
        <path d="M -30 18 Q 0 -6 30 18 Z" fill="#1C241B" />
        {/* Rustic stone masonry lines */}
        {[-45, -20, 10, 35].map((sx, idx) => (
          <line key={idx} x1={sx} y1="-18" x2={sx} y2="18" stroke="#484338" strokeWidth="1.5" />
        ))}
      </g>
    </g>
  );
};

export const MountainStream = MountainRiverAndBridge;

// ==========================================
// 4. CLIFF FACES, ROCK CUTS & 22-HAIRPIN OVERLOOKS
// ==========================================
export const CliffSideEcosystem: React.FC = () => {
  return (
    <g id="cliffside-ecosystem">
      {/* Massive Uphill Granite Rock Cut (Zone 1 into Zone 2) */}
      <path
        d="M -200 3250 Q -50 3100 120 3020 Q 280 2950 380 2980 L 380 3380 Q 180 3320 0 3300 L -200 3350 Z"
        fill="url(#grad-cliff-face)"
        stroke="#2E3C29"
        strokeWidth="2.5"
      />
      {/* Geological rock strata lines */}
      <path d="M -150 3180 Q 50 3080 320 3050" fill="none" stroke="#253121" strokeWidth="2" />
      <path d="M -100 3240 Q 80 3140 350 3110" fill="none" stroke="#253121" strokeWidth="2" />

      {/* East Sheer Mountain Wall along Hairpins (Zone 2) */}
      <path
        d="M 1800 2850 Q 1650 2700 1480 2620 Q 1320 2550 1260 2600 L 1260 2900 Q 1450 2860 1650 2880 L 1800 2950 Z"
        fill="url(#grad-cliff-face)"
        stroke="#2E3C29"
        strokeWidth="2.5"
      />
      <path d="M 1750 2760 Q 1550 2680 1320 2650" fill="none" stroke="#253121" strokeWidth="2" />

      {/* Mid-Hairpin Rock Cut (Zone 2 switchbacks below y=2600) */}
      <path
        d="M -200 2750 Q 0 2620 180 2580 Q 280 2560 340 2620 L 340 2820 Q 150 2780 -50 2820 L -200 2850 Z"
        fill="url(#grad-cliff-face)"
        stroke="#2E3C29"
        strokeWidth="2.5"
      />

      {/* Creeping Mountain Ivy on Cliffs */}
      {[
        { x: 100, y: 3060 },
        { x: 260, y: 3020 },
        { x: 1420, y: 2660 },
        { x: 1350, y: 2720 },
        { x: 180, y: 2640 },
      ].map((ivy, i) => (
        <g key={`ivy-${i}`} transform={`translate(${ivy.x}, ${ivy.y})`}>
          <path d="M 0 0 Q 10 25 5 45 Q -5 65 2 85" fill="none" stroke="#2D6325" strokeWidth="3" />
          <circle cx="6" cy="18" r="5" fill="#3D7D32" />
          <circle cx="-3" cy="38" r="6" fill="#4B943E" />
          <circle cx="8" cy="58" r="5" fill="#3D7D32" />
          <circle cx="0" cy="78" r="4.5" fill="#58A848" />
        </g>
      ))}

      {/* Exposed Laterite Red Earth Roadside Banks */}
      <path
        d="M 400 3200 Q 550 3180 700 3240 L 700 3270 Q 550 3220 400 3230 Z"
        fill="url(#grad-laterite-soil)"
        opacity="0.85"
      />
      <path
        d="M 1200 2820 Q 1320 2780 1440 2840 L 1440 2865 Q 1320 2810 1200 2845 Z"
        fill="url(#grad-laterite-soil)"
        opacity="0.85"
      />
    </g>
  );
};

// ==========================================
// 5. CATTLE HEAD GATEWAY (SPLIT ARCHITECTURE)
// ==========================================
// Ground Plaza & Flanking Stone Pillars (Under Road)
export const IconicObuduEntranceBase: React.FC<{
  x?: number;
  y?: number;
  scale?: number;
}> = ({ x = 800, y = 1950, scale = 1 }) => {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      {/* Broad Flagstone Arrival Plaza Base beneath Road */}
      <ellipse cx="0" cy="0" rx="340" ry="80" fill="#3A6332" opacity="0.6" />
      <ellipse cx="0" cy="0" rx="320" ry="60" fill="#6B665A" opacity="0.45" />

      {/* Flagstone Cobblestones Plaza */}
      <rect x="-240" y="-45" width="480" height="90" rx="12" fill="#756E61" stroke="#4E483D" strokeWidth="2" opacity="0.75" />

      {/* Decorative Welcome Flowerbeds flanking the approach */}
      <ellipse cx="-180" cy="20" rx="40" ry="16" fill="#254F22" />
      <ellipse cx="180" cy="20" rx="40" ry="16" fill="#254F22" />
      {[-195, -180, -165].map((fx, idx) => (
        <circle key={`fl-${idx}`} cx={fx} cy={16} r="4" fill="#E85A5A" />
      ))}
      {[165, 180, 195].map((fx, idx) => (
        <circle key={`fr-${idx}`} cx={fx} cy={16} r="4" fill="#F5B73B" />
      ))}

      {/* LEFT STONE PILLAR (Flanks the road on West side at x = -130 from center road) */}
      <g id="entrance-pillar-left" transform="translate(-160, -60)">
        <rect x="0" y="0" width="80" height="120" rx="4" fill="#5F594D" stroke="#3D372E" strokeWidth="2.5" />
        {/* Ashlar Stone Masonry Courses */}
        {[
          { x: 4, y: 6, w: 34, h: 20, c: "#7C7567" },
          { x: 42, y: 6, w: 34, h: 20, c: "#6A6356" },
          { x: 4, y: 30, w: 44, h: 22, c: "#8C8474" },
          { x: 52, y: 30, w: 24, h: 22, c: "#6A6356" },
          { x: 4, y: 56, w: 32, h: 22, c: "#7C7567" },
          { x: 40, y: 56, w: 36, h: 22, c: "#5A5448" },
          { x: 4, y: 82, w: 40, h: 24, c: "#8C8474" },
          { x: 48, y: 82, w: 28, h: 24, c: "#6A6356" },
        ].map((s, idx) => (
          <rect key={idx} x={s.x} y={s.y} width={s.w} height={s.h} rx="2" fill={s.c} stroke="#443E33" strokeWidth="1" />
        ))}
        {/* Pillar Stone Capital Header */}
        <rect x="-8" y="-8" width="96" height="12" rx="2" fill="#8F8778" stroke="#484236" strokeWidth="2" />
        {/* Foundation Plinth */}
        <rect x="-6" y="114" width="92" height="10" rx="2" fill="#4B453A" />
      </g>

      {/* RIGHT STONE PILLAR (Flanks the road on East side at x = +80 from center road) */}
      <g id="entrance-pillar-right" transform="translate(80, -60)">
        <rect x="0" y="0" width="80" height="120" rx="4" fill="#5F594D" stroke="#3D372E" strokeWidth="2.5" />
        {[
          { x: 4, y: 6, w: 38, h: 20, c: "#6A6356" },
          { x: 46, y: 6, w: 30, h: 20, c: "#7C7567" },
          { x: 4, y: 30, w: 28, h: 22, c: "#8C8474" },
          { x: 36, y: 30, w: 40, h: 22, c: "#6A6356" },
          { x: 4, y: 56, w: 44, h: 22, c: "#7C7567" },
          { x: 52, y: 56, w: 24, h: 22, c: "#5A5448" },
          { x: 4, y: 82, w: 32, h: 24, c: "#8C8474" },
          { x: 40, y: 82, w: 36, h: 24, c: "#6A6356" },
        ].map((s, idx) => (
          <rect key={idx} x={s.x} y={s.y} width={s.w} height={s.h} rx="2" fill={s.c} stroke="#443E33" strokeWidth="1" />
        ))}
        <rect x="-8" y="-8" width="96" height="12" rx="2" fill="#8F8778" stroke="#484236" strokeWidth="2" />
        <rect x="-6" y="114" width="92" height="10" rx="2" fill="#4B453A" />
      </g>
    </g>
  );
};

// OVERHEAD ARCHWAY & SCULPTED CATTLE HEAD (Rendered OVER Road and OVER Vehicle!)
export const IconicObuduEntranceOverhead: React.FC<{
  x?: number;
  y?: number;
  scale?: number;
}> = ({ x = 800, y = 1950, scale = 1 }) => {
  return (
    <g id="entrance-overhead-archway" transform={`translate(${x}, ${y}) scale(${scale})`}>
      {/* Heavy Timber Crossbeam spanning OVER the roadway from left to right pillar */}
      <rect x="-170" y="-76" width="340" height="24" rx="6" fill="#4E311B" stroke="#2B1A0E" strokeWidth="2.5" />
      <rect x="-160" y="-56" width="320" height="16" rx="4" fill="#3D2514" stroke="#24150A" strokeWidth="2" />

      {/* Cedar Shingle Canopy Roof */}
      <polygon points="0,-115 -190,-76 190,-76" fill="#693B1F" stroke="#3D2110" strokeWidth="2" />
      <polygon points="0,-118 -180,-82 180,-82" fill="#844B27" />

      {/* THE ICONIC SCULPTED CATTLE HEAD WITH MAGNIFICENT HORNS */}
      <g id="sacred-bull-head" transform="translate(0, -96)">
        {/* Left Sweeping Long Horn */}
        <path
          d="M -16 -6 C -55 -45 -115 -75 -155 -105 C -135 -85 -80 -35 -14 6 Z"
          fill="#47321F"
          stroke="#271A10"
          strokeWidth="2.5"
        />
        <path
          d="M -20 -4 C -60 -40 -110 -68 -150 -98"
          fill="none"
          stroke="#7A593B"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Right Sweeping Long Horn */}
        <path
          d="M 16 -6 C 55 -45 115 -75 155 -105 C 135 -85 80 -35 14 6 Z"
          fill="#47321F"
          stroke="#271A10"
          strokeWidth="2.5"
        />
        <path
          d="M 20 -4 C 60 -40 110 -68 150 -98"
          fill="none"
          stroke="#7A593B"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Flared Cattle Ears */}
        <ellipse cx="-38" cy="8" rx="18" ry="9" fill="#583C25" transform="rotate(-15, -38, 8)" stroke="#2B1C10" strokeWidth="1.5" />
        <ellipse cx="38" cy="8" rx="18" ry="9" fill="#583C25" transform="rotate(15, 38, 8)" stroke="#2B1C10" strokeWidth="1.5" />

        {/* Sculpted Head Skull */}
        <path
          d="M -30 -10 C -15 -18 15 -18 30 -10 C 34 16 26 44 18 68 C 10 76 -10 76 -18 68 C -26 44 -34 16 -30 -10 Z"
          fill="#5D4026"
          stroke="#2B1B0F"
          strokeWidth="2.5"
        />
        {/* Forehead Ochre Carved Marking */}
        <path d="M -18 -4 Q 0 -10 18 -4 L 14 30 Q 0 36 -14 30 Z" fill="#785535" />

        {/* Cattle Muzzle & Nostrils */}
        <ellipse cx="0" cy="62" rx="16" ry="10" fill="#362214" />
        <ellipse cx="-6" cy="64" rx="3.5" ry="2.5" fill="#180F08" />
        <ellipse cx="6" cy="64" rx="3.5" ry="2.5" fill="#180F08" />

        {/* Expressive Sculpted Eyes */}
        <ellipse cx="-15" cy="14" rx="4.5" ry="3.5" fill="#1E120A" />
        <circle cx="-14" cy="13" r="1.5" fill="#FFE2B8" />
        <ellipse cx="15" cy="14" rx="4.5" ry="3.5" fill="#1E120A" />
        <circle cx="16" cy="13" r="1.5" fill="#FFE2B8" />
      </g>

      {/* The Carved Welcome Signboard Plaque */}
      <rect x="-140" y="-36" width="280" height="30" rx="4" fill="#FAF5E8" stroke="#50351E" strokeWidth="2.5" />
      <text
        x="0"
        y="-20"
        fill="#1C2E19"
        fontSize="11"
        fontFamily="serif"
        fontWeight="bold"
        textAnchor="middle"
        letterSpacing="2"
      >
        WELCOME TO OBUDU MOUNTAIN RESORT
      </text>
      <text
        x="0"
        y="-10"
        fill="#7A4E1E"
        fontSize="7.5"
        fontFamily="sans-serif"
        fontWeight="bold"
        textAnchor="middle"
        letterSpacing="1.2"
      >
        ELEVATION 1,576 METERS • CROSS RIVER HIGHLANDS
      </text>

      {/* Hanging Wrought-Iron Bronze Lanterns on Chains */}
      {[-120, 120].map((lx, idx) => (
        <g key={`lantern-${idx}`} transform={`translate(${lx}, -36)`}>
          <line x1="0" y1="0" x2="0" y2="18" stroke="#2E1C0F" strokeWidth="2" />
          <polygon points="-6,18 6,18 8,30 -8,30" fill="#422915" stroke="#25160A" strokeWidth="1" />
          <circle cx="0" cy="24" r="9" fill="url(#grad-lantern)" />
        </g>
      ))}
    </g>
  );
};

// Backward-compatible single entrance component
export const IconicObuduEntrance: React.FC<{
  x?: number;
  y?: number;
  scale?: number;
}> = (props) => {
  return (
    <g>
      <IconicObuduEntranceBase {...props} />
      <IconicObuduEntranceOverhead {...props} />
    </g>
  );
};

// ==========================================
// 6. OBUDU CABLE CAR AERIAL SYSTEM (ABOVE ROAD!)
// ==========================================
export const ObuduCableCarAerialSystem: React.FC<{ scrollProgress: number }> = ({
  scrollProgress,
}) => {
  // Gondola positions that glide smoothly across the mountain
  const gondola1Prog = (scrollProgress * 2.2 + 0.15) % 1;
  const gondola2Prog = (1 - ((scrollProgress * 2.2 + 0.55) % 1));

  // Pylon 1 (West mountain crag) at (220, 760)
  // Pylon 2 (East summit ridge) at (1380, 560)
  // Cable Bezier curve: M 220 735 Q 800 660 1380 535
  const getCablePoint = (t: number) => {
    const p0x = 220, p0y = 735;
    const p1x = 800, p1y = 660;
    const p2x = 1380, p2y = 535;
    const oneMinusT = 1 - t;
    const x = oneMinusT * oneMinusT * p0x + 2 * oneMinusT * t * p1x + t * t * p2x;
    const y = oneMinusT * oneMinusT * p0y + 2 * oneMinusT * t * p1y + t * t * p2y;
    return { x, y };
  };

  const g1 = getCablePoint(gondola1Prog);
  const g2 = getCablePoint(gondola2Prog);

  return (
    <g id="aerial-cable-car-system" className="pointer-events-none">
      {/* WEST PYLON TOWER (Anchored on rock ledge at 220, 760) */}
      <g id="pylon-west" transform="translate(220, 760)">
        {/* Concrete Foundation Block */}
        <rect x="-18" y="150" width="36" height="14" rx="2" fill="#585246" stroke="#3A352B" strokeWidth="1.5" />
        {/* Lattice Truss Legs */}
        <line x1="-12" y1="150" x2="-4" y2="-25" stroke="#374854" strokeWidth="4" />
        <line x1="12" y1="150" x2="4" y2="-25" stroke="#374854" strokeWidth="4" />
        {/* Truss Cross Bracing */}
        {[20, 60, 100].map((ly, idx) => (
          <React.Fragment key={idx}>
            <line x1="-10" y1={ly} x2="10" y2={ly} stroke="#485D6C" strokeWidth="2.5" />
            <line x1="-10" y1={ly} x2="10" y2={ly + 35} stroke="#597182" strokeWidth="1.8" />
            <line x1="10" y1={ly} x2="-10" y2={ly + 35} stroke="#597182" strokeWidth="1.8" />
          </React.Fragment>
        ))}
        {/* Cable Sheave Head & Guide Bullwheels */}
        <rect x="-24" y="-32" width="48" height="10" rx="2" fill="#D99B35" stroke="#8A5E1A" strokeWidth="1.5" />
        <circle cx="-16" cy="-27" r="6" fill="#242E35" stroke="#485D6C" strokeWidth="1.5" />
        <circle cx="16" cy="-27" r="6" fill="#242E35" stroke="#485D6C" strokeWidth="1.5" />
      </g>

      {/* EAST PYLON TOWER (Anchored on ridge at 1380, 560) */}
      <g id="pylon-east" transform="translate(1380, 560)">
        <rect x="-18" y="160" width="36" height="14" rx="2" fill="#585246" stroke="#3A352B" strokeWidth="1.5" />
        <line x1="-12" y1="160" x2="-4" y2="-25" stroke="#374854" strokeWidth="4" />
        <line x1="12" y1="160" x2="4" y2="-25" stroke="#374854" strokeWidth="4" />
        {[20, 65, 110].map((ly, idx) => (
          <React.Fragment key={idx}>
            <line x1="-10" y1={ly} x2="10" y2={ly} stroke="#485D6C" strokeWidth="2.5" />
            <line x1="-10" y1={ly} x2="10" y2={ly + 40} stroke="#597182" strokeWidth="1.8" />
            <line x1="10" y1={ly} x2="-10" y2={ly + 40} stroke="#597182" strokeWidth="1.8" />
          </React.Fragment>
        ))}
        <rect x="-24" y="-32" width="48" height="10" rx="2" fill="#D99B35" stroke="#8A5E1A" strokeWidth="1.5" />
        <circle cx="-16" cy="-27" r="6" fill="#242E35" stroke="#485D6C" strokeWidth="1.5" />
        <circle cx="16" cy="-27" r="6" fill="#242E35" stroke="#485D6C" strokeWidth="1.5" />
      </g>

      {/* HEAVY TENSION STEEL CABLES (Soaring high across the sky and OVER THE ROAD!) */}
      {/* Lower Track Cable */}
      <path d="M 220 735 Q 800 660 1380 535" fill="none" stroke="#222B30" strokeWidth="4.5" />
      {/* Upper Haul Cable */}
      <path d="M 220 727 Q 800 652 1380 527" fill="none" stroke="#627887" strokeWidth="2.5" />

      {/* GONDOLA 1 (Vibrant Sunflower Gold Cabin) */}
      <g transform={`translate(${g1.x}, ${g1.y})`}>
        {/* Soft Drop Shadow on mountain below */}
        <ellipse cx="0" cy="85" rx="22" ry="6" fill="#142618" opacity="0.35" filter="url(#soft-mist)" />
        {/* Suspension Arm & Roller Wheel */}
        <line x1="0" y1="0" x2="0" y2="30" stroke="#374854" strokeWidth="3" />
        <circle cx="0" cy="0" r="4.5" fill="#D99B35" stroke="#202A30" strokeWidth="1.5" />
        {/* Cabin Body */}
        <rect x="-20" y="30" width="40" height="34" rx="8" fill="#E8B83A" stroke="#9E6E18" strokeWidth="2" />
        {/* Panoramic Glass Window */}
        <rect x="-16" y="34" width="32" height="18" rx="4" fill="#294A5C" stroke="#1B323E" strokeWidth="1.5" />
        <line x1="-8" y1="36" x2="6" y2="50" stroke="#A8E2FF" strokeWidth="2" opacity="0.75" />
        {/* Lower Crimson Stripe */}
        <rect x="-18" y="54" width="36" height="7" rx="2" fill="#C23E2A" />
      </g>

      {/* GONDOLA 2 (Vibrant Highland Crimson Red Cabin) */}
      <g transform={`translate(${g2.x}, ${g2.y})`}>
        <ellipse cx="0" cy="85" rx="22" ry="6" fill="#142618" opacity="0.35" filter="url(#soft-mist)" />
        <line x1="0" y1="0" x2="0" y2="30" stroke="#374854" strokeWidth="3" />
        <circle cx="0" cy="0" r="4.5" fill="#D99B35" stroke="#202A30" strokeWidth="1.5" />
        <rect x="-20" y="30" width="40" height="34" rx="8" fill="#C23E2A" stroke="#7A1E10" strokeWidth="2" />
        <rect x="-16" y="34" width="32" height="18" rx="4" fill="#294A5C" stroke="#1B323E" strokeWidth="1.5" />
        <line x1="-8" y1="36" x2="6" y2="50" stroke="#A8E2FF" strokeWidth="2" opacity="0.75" />
        <rect x="-18" y="54" width="36" height="7" rx="2" fill="#E8B83A" />
      </g>
    </g>
  );
};

export const ObuduCableCarSystem = ObuduCableCarAerialSystem;

// ==========================================
// 7. ANIMATED WILDLIFE: MONKEYS (CROSS RIVER DRILL & COLOBUS)
// ==========================================
export const LivingWildlifeMonkeys: React.FC<{ scrollProgress: number }> = ({
  scrollProgress,
}) => {
  // Monkeys located in realistic ecological spots
  const monkeys = [
    // Monkey 1: Lowland Tree Branch eating fruit (Zone 1)
    { x: 220, y: 3310, type: "eating", scale: 1.15, label: "Lowland Drill Monkey" },
    // Monkey 2: Hanging from liana vine (Zone 1)
    { x: 1380, y: 3120, type: "swinging", scale: 1.1, label: "Liana Vine Monkey" },
    // Monkey 3: Sitting on roadside cliff rock (Zone 2)
    { x: 210, y: 2740, type: "sitting", scale: 1.1, label: "Rock Ledge Monkey" },
    // Monkey 4: Perched on Devil's Elbow lookout railing (Zone 2)
    { x: 1320, y: 2480, type: "waving", scale: 1.05, label: "Lookout Railing Monkey" },
    // Monkey 5: Cedar Tree in Highland Ranch (Zone 3)
    { x: 320, y: 1680, type: "colobus", scale: 1.1, label: "Black-and-White Colobus" },
  ];

  return (
    <g id="living-wildlife-monkeys" className="pointer-events-none">
      {monkeys.map((m, idx) => {
        const anim = Math.sin(scrollProgress * 15 + idx * 2);
        return (
          <g key={`monkey-${idx}`} transform={`translate(${m.x}, ${m.y}) scale(${m.scale})`}>
            {/* Ground / Perch shadow */}
            <ellipse cx="0" cy="18" rx="14" ry="4" fill="#142618" opacity="0.35" />

            {/* MONKEY BODY */}
            {m.type === "swinging" ? (
              // Hanging and swinging from vine
              <g transform={`rotate(${anim * 18}, 0, -40)`}>
                {/* Liana Vine */}
                <path d="M 0 -80 Q 8 -40 0 0" fill="none" stroke="#482F1B" strokeWidth="3" />
                {/* Tail curling around vine */}
                <path d="M 0 0 Q 14 -15 0 -30" fill="none" stroke="#664326" strokeWidth="3" strokeLinecap="round" />
                {/* Torso */}
                <ellipse cx="0" cy="12" rx="9" ry="14" fill="#7A5232" stroke="#4F321C" strokeWidth="1.2" />
                {/* Head */}
                <circle cx="0" cy="30" r="8" fill="#8E633F" stroke="#4F321C" strokeWidth="1.2" />
                <ellipse cx="0" cy="32" rx="5" ry="4" fill="#DEB887" />
                <circle cx="-2" cy="31" r="1.5" fill="#1A1008" />
                <circle cx="2" cy="31" r="1.5" fill="#1A1008" />
                {/* Hanging arms */}
                <path d="M -8 16 Q -14 0 -4 -10" fill="none" stroke="#7A5232" strokeWidth="3" strokeLinecap="round" />
                <path d="M 8 16 Q 14 0 4 -10" fill="none" stroke="#7A5232" strokeWidth="3" strokeLinecap="round" />
              </g>
            ) : m.type === "colobus" ? (
              // Colobus Monkey with silky white cape
              <g>
                <path d="M -4 14 Q -16 28 -8 40" fill="none" stroke="#EDE8DC" strokeWidth="3.5" strokeLinecap="round" />
                <ellipse cx="0" cy="4" rx="10" ry="12" fill="#24211D" stroke="#151311" strokeWidth="1.5" />
                <path d="M -8 -2 Q 0 14 8 -2 Q 0 6 -8 -2" fill="#FFFFFF" />
                <circle cx="0" cy="-8" r="7.5" fill="#24211D" stroke="#151311" strokeWidth="1.5" />
                <circle cx="0" cy="-7" r="5" fill="#E8E2D5" />
                <circle cx="-2" cy="-8" r="1.5" fill="#0D0B09" />
                <circle cx="2" cy="-8" r="1.5" fill="#0D0B09" />
              </g>
            ) : (
              // Sitting & eating / waving monkey
              <g>
                {/* Tail */}
                <path d={`M 8 10 Q ${18 + anim * 3} 4 ${14 + anim * 3} -12`} fill="none" stroke="#5E3C20" strokeWidth="3" strokeLinecap="round" />
                {/* Body */}
                <ellipse cx="0" cy="2" rx="9" ry="12" fill="#754E2E" stroke="#4D3019" strokeWidth="1.2" />
                {/* Head */}
                <circle cx="0" cy="-12" r="7.5" fill="#8C603A" stroke="#4D3019" strokeWidth="1.2" />
                <ellipse cx="0" cy="-10" rx="5" ry="4" fill="#D9AC7E" />
                {/* Expressive eyes */}
                <circle cx="-2" cy="-12" r="1.5" fill="#1C1108" />
                <circle cx="2" cy="-12" r="1.5" fill="#1C1108" />
                <circle cx="-1.5" cy="-12.5" r="0.5" fill="#FFF" />
                <circle cx="2.5" cy="-12.5" r="0.5" fill="#FFF" />
                {/* Ears */}
                <circle cx="-6" cy="-14" r="2.5" fill="#754E2E" />
                <circle cx="6" cy="-14" r="2.5" fill="#754E2E" />

                {m.type === "eating" ? (
                  // Eating wild red mango
                  <g>
                    <path d="M -6 0 Q -2 -6 0 -7" fill="none" stroke="#754E2E" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="0" cy="-7" r="3.5" fill="#E85A3A" />
                  </g>
                ) : (
                  // Waving arm
                  <path d={`M 6 0 Q 14 ${-8 + anim * 4} 12 ${-16 + anim * 5}`} fill="none" stroke="#754E2E" strokeWidth="2.5" strokeLinecap="round" />
                )}
              </g>
            )}
          </g>
        );
      })}
    </g>
  );
};

export const TreeMonkeys = LivingWildlifeMonkeys;

// ==========================================
// 8. ANIMATED WILDLIFE: BIRDS (SOARING & PERCHED)
// ==========================================
export const LivingWildlifeBirds: React.FC<{ scrollProgress: number }> = ({
  scrollProgress,
}) => {
  // Soaring flocks and perched birds
  const soaringFlock = [
    { x: 380, y: 2850, size: 1.1, phase: 0 },
    { x: 420, y: 2820, size: 1.0, phase: 0.2 },
    { x: 400, y: 2880, size: 0.9, phase: 0.4 },
    { x: 460, y: 2800, size: 1.2, phase: 0.6 },
    { x: 480, y: 2860, size: 0.85, phase: 0.8 },
  ];

  const perchedBirds = [
    { x: 780, y: 2020, label: "Pillar Sentinel" },
    { x: 540, y: 1650, label: "Fence Post Swallow" },
    { x: 1040, y: 1220, label: "Lamppost Finch" },
  ];

  return (
    <g id="living-wildlife-birds" className="pointer-events-none">
      {/* Soaring V-Formation in Mountain Thermals */}
      {soaringFlock.map((bird, idx) => {
        const t = (scrollProgress * 8 + bird.phase) % 1;
        const driftX = bird.x + Math.sin(t * Math.PI * 2) * 50;
        const driftY = bird.y - Math.cos(t * Math.PI * 2) * 30;
        const wingFlap = Math.sin(t * Math.PI * 8) * 4;

        return (
          <g key={`bird-soar-${idx}`} transform={`translate(${driftX}, ${driftY}) scale(${bird.size})`} opacity="0.9">
            <path
              d={`M -9 0 Q -4 ${-5 - wingFlap} 0 0 Q 4 ${-5 - wingFlap} 9 0`}
              fill="none"
              stroke="#1C2E24"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </g>
        );
      })}

      {/* Perched Birds resting on posts & lamps */}
      {perchedBirds.map((pb, idx) => (
        <g key={`bird-perch-${idx}`} transform={`translate(${pb.x}, ${pb.y})`}>
          <ellipse cx="0" cy="0" rx="4" ry="6" fill="#3D5E43" transform="rotate(30)" />
          <circle cx="2" cy="-5" r="2.5" fill="#4E7856" />
          <line x1="4" y1="-5" x2="7" y2="-4" stroke="#D99B35" strokeWidth="1" />
          <line x1="-3" y1="5" x2="-6" y2="10" stroke="#253829" strokeWidth="1.5" />
        </g>
      ))}
    </g>
  );
};

export const FlyingBirds = LivingWildlifeBirds;

// ==========================================
// 9. NOBLE WHITE FULANI HIGHLAND CATTLE HERDS
// ==========================================
export const LivingWildlifeCattle: React.FC<{ scrollProgress: number }> = ({
  scrollProgress,
}) => {
  const tailSwish = Math.sin(scrollProgress * 20) * 4;

  return (
    <g id="living-wildlife-cattle">
      {/* HERD 1: Grazing in West Highland Meadow (x: 320, y: 1560) */}
      <g id="cattle-group-west" transform="translate(320, 1560) scale(1.15)">
        {/* Cow 1: Head down grazing on fresh clover */}
        <g id="cow-grazing">
          <ellipse cx="26" cy="30" rx="30" ry="8" fill="#1A331E" opacity="0.4" />
          {/* Sturdy Hooves */}
          <rect x="10" y="16" width="5" height="16" rx="2" fill="#D6CFBD" />
          <rect x="18" y="18" width="5" height="14" rx="2" fill="#FAF6EC" />
          <rect x="38" y="16" width="5" height="16" rx="2" fill="#D6CFBD" />
          <rect x="46" y="18" width="5" height="14" rx="2" fill="#FAF6EC" />
          {/* Body */}
          <ellipse cx="30" cy="12" rx="24" ry="14" fill="#FAF7EE" stroke="#CEC2A6" strokeWidth="1.5" />
          {/* Distinctive Shoulder Hump */}
          <ellipse cx="16" cy="2" rx="7" ry="5" fill="#EDE4D0" />
          {/* Grazing Neck & Head */}
          <ellipse cx="4" cy="18" rx="10" ry="7" fill="#FAF7EE" stroke="#CEC2A6" strokeWidth="1.5" />
          {/* Lyre-Shaped Horns */}
          <path d="M 6 13 C 2 6 -6 4 -12 2" fill="none" stroke="#63513C" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 8 14 C 4 8 -4 6 -10 4" fill="none" stroke="#63513C" strokeWidth="2.2" strokeLinecap="round" />
          {/* Swishing Tail */}
          <path d={`M 52 10 Q ${58 + tailSwish} 20 ${56 + tailSwish} 28`} fill="none" stroke="#FAF7EE" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Resting Calf nearby */}
        <g id="calf-resting" transform="translate(68, 12)">
          <ellipse cx="14" cy="16" rx="18" ry="6" fill="#1A331E" opacity="0.35" />
          <ellipse cx="14" cy="10" rx="15" ry="9" fill="#F0E8D5" stroke="#CEC2A6" strokeWidth="1.2" />
          <circle cx="5" cy="5" r="5" fill="#FAF7EE" />
          <path d="M 5 2 Q 2 -3 0 -4" stroke="#5E4C38" strokeWidth="1.5" fill="none" />
        </g>
      </g>

      {/* HERD 2: Village Green Pasture (x: 1220, y: 1380) */}
      <g id="cattle-group-east" transform="translate(1220, 1380) scale(1.1)">
        {/* Noble Lead Bull standing proudly */}
        <g id="standing-bull">
          <ellipse cx="26" cy="30" rx="32" ry="8" fill="#1A331E" opacity="0.4" />
          <rect x="8" y="14" width="5" height="18" rx="2" fill="#D6CFBD" />
          <rect x="18" y="16" width="5" height="16" rx="2" fill="#FAF6EC" />
          <rect x="36" y="14" width="5" height="18" rx="2" fill="#D6CFBD" />
          <rect x="46" y="16" width="5" height="16" rx="2" fill="#FAF6EC" />
          <ellipse cx="28" cy="10" rx="24" ry="14" fill="#F7F3E9" stroke="#CEC2A6" strokeWidth="1.5" />
          {/* Prominent Bull Hump */}
          <ellipse cx="14" cy="0" rx="8" ry="6" fill="#E8DEC5" />
          {/* Proud Head */}
          <circle cx="6" cy="2" r="8" fill="#FAF7EE" stroke="#CEC2A6" strokeWidth="1.5" />
          {/* Giant Lyre Horns */}
          <path d="M 6 -2 C 2 -14 -8 -18 -14 -22" fill="none" stroke="#594734" strokeWidth="3" strokeLinecap="round" />
          <path d="M 10 -2 C 14 -14 24 -18 30 -22" fill="none" stroke="#594734" strokeWidth="3" strokeLinecap="round" />
        </g>
      </g>
    </g>
  );
};

export const HighlandCattleGroup = LivingWildlifeCattle;

// ==========================================
// 10. ANIMATED WILDLIFE: BUTTERFLIES
// ==========================================
export const LivingWildlifeButterflies: React.FC<{ scrollProgress: number }> = ({
  scrollProgress,
}) => {
  const butterflies = [
    { x: 340, y: 3260, color: "#E05575", size: 1.1 },
    { x: 620, y: 2940, color: "#F5C242", size: 0.9 },
    { x: 1260, y: 2520, color: "#54C7EC", size: 1.0 },
    { x: 480, y: 1780, color: "#BA68C8", size: 1.15 },
    { x: 1140, y: 1420, color: "#F5C242", size: 0.95 },
    { x: 680, y: 680, color: "#54C7EC", size: 1.05 },
  ];

  return (
    <g id="living-wildlife-butterflies" className="pointer-events-none">
      {butterflies.map((b, i) => {
        const t = (scrollProgress * 9 + i * 0.8) % 1;
        const bx = b.x + Math.sin(t * Math.PI * 4) * 25;
        const by = b.y + Math.cos(t * Math.PI * 3) * 15;
        const wingAngle = Math.sin(t * Math.PI * 14) * 28;

        return (
          <g key={`butterfly-${i}`} transform={`translate(${bx}, ${by}) scale(${b.size})`} opacity="0.85">
            <ellipse
              cx="-4"
              cy="0"
              rx="5.5"
              ry="3.5"
              fill={b.color}
              transform={`rotate(${wingAngle})`}
              opacity="0.9"
            />
            <ellipse
              cx="4"
              cy="0"
              rx="5.5"
              ry="3.5"
              fill={b.color}
              transform={`rotate(${-wingAngle})`}
              opacity="0.9"
            />
            <ellipse cx="0" cy="0" rx="1.2" ry="3.5" fill="#241508" />
          </g>
        );
      })}
    </g>
  );
};

export const Butterflies = LivingWildlifeButterflies;

// ==========================================
// 10B. ANIMATED WILDLIFE: HIGHLAND SHEEP FLOCKS
// ==========================================
export const LivingWildlifeSheep: React.FC<{ scrollProgress: number }> = ({
  scrollProgress,
}) => {
  const sheepFlocks = [
    // Flocks on the rolling green hills before the ranch entrance (Zone 2)
    { x: 1080, y: 2260, variant: "grazing" as const, scale: 1.1 },
    { x: 1140, y: 2240, variant: "lamb" as const, scale: 0.8 },
    { x: 1240, y: 2190, variant: "standing" as const, scale: 1.15 },
    { x: 420, y: 2240, variant: "grazing" as const, scale: 1.05 },
    { x: 460, y: 2270, variant: "resting" as const, scale: 1.0 },

    // Flocks in the highland village pastures near chalets (Zone 3)
    { x: 740, y: 1540, variant: "grazing" as const, scale: 1.1 },
    { x: 790, y: 1520, variant: "lamb" as const, scale: 0.85 },
    { x: 830, y: 1560, variant: "standing" as const, scale: 1.15 },
    { x: 1320, y: 1440, variant: "resting" as const, scale: 1.05 },

    // Flocks on summit sanctuary meadows (Zone 4)
    { x: 1120, y: 640, variant: "standing" as const, scale: 1.1 },
    { x: 1180, y: 620, variant: "grazing" as const, scale: 1.1 },
    { x: 1220, y: 650, variant: "lamb" as const, scale: 0.8 },
  ];

  return (
    <g id="living-wildlife-sheep">
      {sheepFlocks.map((s, idx) => {
        const headBob = Math.sin(scrollProgress * 26 + idx * 1.5) * 2.5;
        const tailTwitch = Math.sin(scrollProgress * 34 + idx * 2) * 2.5;

        return (
          <g key={`sheep-${idx}`} transform={`translate(${s.x}, ${s.y}) scale(${s.scale})`}>
            {/* Ground shadow */}
            <ellipse cx="0" cy="14" rx="18" ry="5" fill="#142616" opacity="0.32" />

            {/* Hooves & Legs */}
            {s.variant !== "resting" && (
              <>
                <rect x="-9" y="4" width="3" height="11" rx="1.5" fill="#25201A" />
                <rect x="-3" y="6" width="3" height="9" rx="1.5" fill="#3D342C" />
                <rect x="5" y="4" width="3" height="11" rx="1.5" fill="#25201A" />
                <rect x="11" y="6" width="3" height="9" rx="1.5" fill="#3D342C" />
              </>
            )}

            {/* Fluffy Ghibli cloud-fleece body */}
            <ellipse cx="0" cy="0" rx="16" ry="11" fill="#FAF8F2" stroke="#DFD7C2" strokeWidth="1.2" />
            <circle cx="-8" cy="-3" r="6.5" fill="#FFFDF8" />
            <circle cx="0" cy="-5" r="7.5" fill="#FAF8F2" />
            <circle cx="8" cy="-3" r="6.5" fill="#F5EFE0" />
            <circle cx="-11" cy="2" r="5.5" fill="#FAF8F2" />
            <circle cx="11" cy="2" r="5.5" fill="#EFE8D6" />

            {/* Tail */}
            <path
              d={`M 14 0 Q ${18 + tailTwitch} 2 16 6`}
              fill="none"
              stroke="#FAF8F2"
              strokeWidth="2.8"
              strokeLinecap="round"
            />

            {/* Head & Face Variants */}
            {s.variant === "grazing" ? (
              // Grazing sheep: Head dipped to grass
              <g id="sheep-grazing-head" transform={`translate(-14, ${5 + headBob})`}>
                <ellipse cx="0" cy="0" rx="6" ry="4.5" fill="#2D241D" />
                <ellipse cx="2" cy="-3" rx="2" ry="4" fill="#2D241D" transform="rotate(-30 2 -3)" />
                <circle cx="-3" cy="-1" r="0.9" fill="#FAF8F2" />
                <circle cx="-3" cy="-1" r="0.5" fill="#0E0C09" />
              </g>
            ) : s.variant === "standing" ? (
              // Alert sheep: Head held proud looking around
              <g id="sheep-standing-head" transform={`translate(-12, ${-6 + headBob * 0.5})`}>
                <ellipse cx="0" cy="0" rx="6" ry="5" fill="#2D241D" />
                <ellipse cx="3" cy="-3" rx="2" ry="4.5" fill="#2D241D" transform="rotate(35 3 -3)" />
                <ellipse cx="-1" cy="-4" rx="1.8" ry="4" fill="#3D342C" transform="rotate(-20 -1 -4)" />
                <circle cx="-2" cy="-1" r="0.9" fill="#FAF8F2" />
                <circle cx="-2" cy="-1" r="0.5" fill="#0E0C09" />
                {/* Subtle curved horns for highland ram */}
                <path d="M 1 -3 Q 6 -7 3 -10 Q 0 -9 2 -5" fill="none" stroke="#7A6852" strokeWidth="1.2" />
              </g>
            ) : s.variant === "resting" ? (
              // Resting sheep: Head curled in warm wool
              <g id="sheep-resting-head" transform="translate(-10, -1)">
                <ellipse cx="0" cy="0" rx="5" ry="4" fill="#2D241D" />
                <ellipse cx="2" cy="-2" rx="1.8" ry="3.5" fill="#2D241D" transform="rotate(25 2 -2)" />
                <circle cx="-2" cy="0" r="0.7" fill="#FAF8F2" />
              </g>
            ) : (
              // Cute Little Lamb: Extra soft, bright fleece
              <g id="sheep-lamb-head" transform={`translate(-9, ${-4 + headBob})`}>
                <ellipse cx="0" cy="4.5" rx="4.5" ry="3.8" fill="#2D241D" />
                <ellipse cx="2" cy="2" rx="1.5" ry="3" fill="#2D241D" transform="rotate(30 2 2)" />
                <circle cx="-1.5" cy="4" r="0.8" fill="#FAF8F2" />
                <circle cx="-1.5" cy="4" r="0.4" fill="#0E0C09" />
              </g>
            )}
          </g>
        );
      })}
    </g>
  );
};

// ==========================================
// 11. OBUDU CHALET VILLAS ON STILTS
// ==========================================
export const ChaletVilla: React.FC<{
  x: number;
  y: number;
  scale?: number;
  label?: string;
}> = ({ x, y, scale = 1, label }) => {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      {/* Hillside Grass & Stone Terrace Mound (Grounds the Chalet firmly!) */}
      <ellipse cx="70" cy="130" rx="90" ry="24" fill="#4B8C3A" opacity="0.6" />
      <ellipse cx="70" cy="126" rx="78" ry="18" fill="#1C3818" opacity="0.35" />
      {/* Stone Foundation Footing Pads under Stilts */}
      <rect x="18" y="116" width="18" height="6" rx="2" fill="#696357" stroke="#484236" strokeWidth="1" />
      <rect x="48" y="116" width="18" height="6" rx="2" fill="#696357" stroke="#484236" strokeWidth="1" />
      <rect x="78" y="116" width="18" height="6" rx="2" fill="#696357" stroke="#484236" strokeWidth="1" />
      <rect x="108" y="116" width="18" height="6" rx="2" fill="#696357" stroke="#484236" strokeWidth="1" />

      {/* Sturdy Black Wooden Stilts */}
      <g id="stilts">
        <rect x="24" y="86" width="6" height="32" fill="#24211D" />
        <rect x="54" y="86" width="6" height="32" fill="#24211D" />
        <rect x="84" y="86" width="6" height="32" fill="#24211D" />
        <rect x="114" y="86" width="6" height="32" fill="#24211D" />
        <line x1="24" y1="88" x2="60" y2="116" stroke="#38332D" strokeWidth="2" />
        <line x1="60" y1="88" x2="24" y2="116" stroke="#38332D" strokeWidth="2" />
        <line x1="84" y1="88" x2="120" y2="116" stroke="#38332D" strokeWidth="2" />
        <line x1="120" y1="88" x2="84" y2="116" stroke="#38332D" strokeWidth="2" />
      </g>

      {/* Wooden Deck & Observation Balcony */}
      <rect x="12" y="82" width="120" height="8" rx="2" fill="#824626" stroke="#592C14" strokeWidth="1.5" />
      <line x1="14" y1="74" x2="130" y2="74" stroke="#D99B35" strokeWidth="2" />
      {[22, 38, 54, 70, 86, 102, 118].map((rx) => (
        <line key={rx} x1={rx} y1="74" x2={rx} y2="82" stroke="#C2872A" strokeWidth="1.5" />
      ))}

      {/* Main Cedar Wood Cabin Body */}
      <rect x="22" y="46" width="100" height="38" rx="2" fill="url(#grad-cedar)" stroke="#8C4E28" strokeWidth="2" />
      <line x1="22" y1="54" x2="122" y2="54" stroke="#AB6337" strokeWidth="1" />
      <line x1="22" y1="62" x2="122" y2="62" stroke="#AB6337" strokeWidth="1" />
      <line x1="22" y1="70" x2="122" y2="70" stroke="#AB6337" strokeWidth="1" />
      <line x1="22" y1="78" x2="122" y2="78" stroke="#AB6337" strokeWidth="1" />

      {/* Warm Illuminated Windows */}
      <rect x="32" y="52" width="18" height="18" rx="2" fill="#FFF2B8" stroke="#592C14" strokeWidth="1.5" />
      <line x1="41" y1="52" x2="41" y2="70" stroke="#7E4724" strokeWidth="1" />
      <line x1="32" y1="61" x2="50" y2="61" stroke="#7E4724" strokeWidth="1" />
      <rect x="94" y="52" width="18" height="18" rx="2" fill="#FFF2B8" stroke="#592C14" strokeWidth="1.5" />
      <line x1="103" y1="52" x2="103" y2="70" stroke="#7E4724" strokeWidth="1" />
      <line x1="94" y1="61" x2="112" y2="61" stroke="#7E4724" strokeWidth="1" />

      {/* Cabin Doorway */}
      <rect x="63" y="50" width="18" height="32" rx="1" fill="#4A6578" stroke="#592C14" strokeWidth="1.5" />
      <rect x="65" y="52" width="14" height="16" fill="#FCE9AF" opacity="0.85" />

      {/* Stone Chimney with Animated Curling Smoke */}
      <rect x="100" y="8" width="14" height="26" fill="#6B6456" stroke="#484236" strokeWidth="1.5" />
      <ellipse cx="107" cy="-2" rx="6" ry="3" fill="#EDEBE6" opacity="0.6" filter="url(#soft-mist)">
        <animate attributeName="cy" values="-2;-16;-32" dur="4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0.3;0" dur="4s" repeatCount="indefinite" />
        <animate attributeName="rx" values="6;12;20" dur="4s" repeatCount="indefinite" />
      </ellipse>

      {/* Lower Main Tier Hipped Terracotta Roof */}
      <polygon points="72,26 138,48 6,48" fill="url(#grad-terracotta)" stroke="#591E10" strokeWidth="2" />
      <line x1="72" y1="26" x2="26" y2="48" stroke="#8A321E" strokeWidth="1" />
      <line x1="72" y1="26" x2="48" y2="48" stroke="#8A321E" strokeWidth="1" />
      <line x1="72" y1="26" x2="96" y2="48" stroke="#8A321E" strokeWidth="1" />
      <line x1="72" y1="26" x2="118" y2="48" stroke="#8A321E" strokeWidth="1" />

      {/* Upper Clerestory Attic Tier */}
      <rect x="50" y="14" width="44" height="14" rx="1" fill="url(#grad-cedar)" stroke="#8C4E28" strokeWidth="1.5" />
      <rect x="62" y="17" width="20" height="8" rx="1" fill="#FFF2B8" stroke="#7E4724" strokeWidth="1" />

      {/* Upper Tier Pyramid Roof */}
      <polygon points="72,0 102,15 42,15" fill="url(#grad-terracotta)" stroke="#591E10" strokeWidth="2" />

      {/* Stone Steps descending to the grass */}
      <rect x="60" y="90" width="24" height="6" fill="#878074" stroke="#544E45" strokeWidth="1" />
      <rect x="58" y="96" width="28" height="6" fill="#756E63" stroke="#544E45" strokeWidth="1" />
      <rect x="56" y="102" width="32" height="6" fill="#696257" stroke="#544E45" strokeWidth="1" />
      <rect x="54" y="108" width="36" height="6" fill="#595248" stroke="#544E45" strokeWidth="1" />

      {/* Connecting Gravel Walkway towards Road */}
      <path d="M 72 114 Q 72 135 60 148" fill="none" stroke="#827663" strokeWidth="14" strokeLinecap="round" opacity="0.6" />

      {label && (
        <text
          x="72"
          y="160"
          fill="#FFF9E6"
          fontSize="10"
          fontFamily="serif"
          fontWeight="bold"
          textAnchor="middle"
          filter="drop-shadow(0 1px 2px rgba(0,0,0,0.85))"
        >
          {label}
        </text>
      )}
    </g>
  );
};

// ==========================================
// 12. GHIBLI TREES & FOREGROUND CANOPY
// ==========================================
export const GhibliTree: React.FC<{
  x: number;
  y: number;
  scale?: number;
  variant?: number;
}> = ({ x, y, scale = 1, variant = 0 }) => {
  const colors = [
    { trunk: "#3D2817", canopy: ["#1A3B1F", "#244F2A", "#2E5E35"], highlight: "#4A8237" },
    { trunk: "#4A3020", canopy: ["#1E4820", "#2D5E2E", "#3D733F"], highlight: "#5B9945" },
    { trunk: "#362015", canopy: ["#1C4222", "#275928", "#367033"], highlight: "#4D9238" },
  ];
  const c = colors[variant % colors.length];

  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <ellipse cx="0" cy="5" rx="18" ry="5" fill="#132617" opacity="0.4" />
      <rect x="-4" y="-50" width="8" height="55" rx="2" fill={c.trunk} />
      <polygon points="0,-30 -22,5 22,5" fill={c.canopy[2]} stroke="#112614" strokeWidth="1" />
      <polygon points="0,-55 -18,-15 18,-15" fill={c.canopy[1]} stroke="#112614" strokeWidth="1" />
      <polygon points="0,-78 -14,-35 14,-35" fill={c.canopy[0]} stroke="#112614" strokeWidth="1" />
      <polygon points="0,-78 -6,-50 6,-50" fill={c.highlight} opacity="0.4" />
    </g>
  );
};

export const ForegroundCanopy: React.FC = () => {
  return (
    <g id="foreground-canopy" className="pointer-events-none select-none">
      {/* Top-Left Overhanging Canopy */}
      <g>
        <path d="M -10 -20 C 140 30 280 80 420 40 C 380 90 240 140 -10 110 Z" fill="#3B2618" stroke="#26180E" strokeWidth="3" />
        <circle cx="160" cy="50" r="54" fill="#1D401F" opacity="0.95" />
        <circle cx="210" cy="70" r="62" fill="#29592B" opacity="0.9" />
        <circle cx="270" cy="55" r="48" fill="#3D753E" opacity="0.9" />
        <circle cx="340" cy="50" r="44" fill="#4C8C4E" opacity="0.85" />
        <circle cx="390" cy="40" r="32" fill="#6EA86F" opacity="0.8" />
      </g>

      {/* Top-Right Overhanging Branch */}
      <g transform="translate(1620, 0) scale(-1, 1)">
        <path d="M -10 -20 C 120 40 240 70 380 30 C 320 80 200 120 -10 90 Z" fill="#362215" stroke="#24150C" strokeWidth="3" />
        <circle cx="140" cy="40" r="48" fill="#1A3B1C" opacity="0.95" />
        <circle cx="190" cy="55" r="54" fill="#244F27" opacity="0.9" />
        <circle cx="260" cy="45" r="42" fill="#386E3C" opacity="0.85" />
      </g>
    </g>
  );
};

// ==========================================
// 13. LANDMARK ACCENTS (OVERLOOK, WATERFALL, LAMPS, STONES)
// ==========================================
export const SerpentineCliffOverlook: React.FC<{
  x: number;
  y: number;
  title?: string;
  altitude?: string;
  scale?: number;
}> = ({ x, y, title = "DEVIL'S ELBOW PASS", altitude = "1,240m", scale = 1 }) => {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      {/* Stone Viewing Platform Plaza */}
      <ellipse cx="0" cy="30" rx="160" ry="32" fill="#5E584B" stroke="#3D372E" strokeWidth="2" opacity="0.75" />

      {/* Observation Timber Railing */}
      <rect x="-140" y="20" width="280" height="7" rx="2" fill="#5E3E26" stroke="#3D2514" strokeWidth="1.5" />
      <line x1="-120" y1="27" x2="-120" y2="55" stroke="#5E3E26" strokeWidth="3.5" />
      <line x1="-50" y1="27" x2="-50" y2="55" stroke="#5E3E26" strokeWidth="3.5" />
      <line x1="20" y1="27" x2="20" y2="55" stroke="#5E3E26" strokeWidth="3.5" />
      <line x1="90" y1="27" x2="90" y2="55" stroke="#5E3E26" strokeWidth="3.5" />

      {/* Brass Observation Telescope */}
      <g transform="translate(-40, 15)">
        <line x1="0" y1="0" x2="0" y2="15" stroke="#8C6E2D" strokeWidth="2.5" />
        <line x1="-8" y1="-6" x2="8" y2="-2" stroke="#D99B35" strokeWidth="3.5" strokeLinecap="round" />
      </g>

      {/* Rustic Milestone Plaque */}
      <rect x="60" y="-35" width="135" height="30" rx="4" fill="#FAF6EC" stroke="#5E3E26" strokeWidth="2" />
      <line x1="127" y1="-5" x2="127" y2="38" stroke="#4A2E19" strokeWidth="4" />
      <text x="127" y="-20" fill="#1C381E" fontSize="7.5" fontFamily="serif" fontWeight="bold" textAnchor="middle">
        {title}
      </text>
      <text x="127" y="-9" fill="#8C5E28" fontSize="6.5" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
        ALTITUDE {altitude}
      </text>
    </g>
  );
};

export const VillageLamppost: React.FC<{
  x: number;
  y: number;
  scale?: number;
}> = ({ x, y, scale = 1 }) => {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <ellipse cx="0" cy="34" rx="7" ry="3" fill="#122416" opacity="0.4" />
      <rect x="-2.5" y="-22" width="5" height="56" rx="1.5" fill="#28382C" stroke="#17241A" strokeWidth="1" />
      <path d="M 0 -20 Q 9 -28 16 -20 L 16 -12" fill="none" stroke="#28382C" strokeWidth="2.5" />
      <polygon points="11,-12 21,-12 19,-2 13,-2" fill="#E8BC58" stroke="#17241A" strokeWidth="1" />
      <circle cx="16" cy="-7" r="12" fill="url(#grad-lantern)" opacity="0.85" />
    </g>
  );
};

export const CataractWaterfall: React.FC<{
  x: number;
  y: number;
  height?: number;
}> = ({ x, y, height = 240 }) => {
  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Dark Granite Chasm Gorge */}
      <path
        d={`M -30 0 Q 40 ${height * 0.45} 10 ${height} L 55 ${height} Q 80 ${height * 0.45} 40 0 Z`}
        fill="#263127"
      />
      {/* Cascading Whitewater Torrent */}
      <path
        d={`M -8 0 Q 42 ${height * 0.4} 20 ${height} L 32 ${height} Q 54 ${height * 0.4} 24 0 Z`}
        fill="url(#grad-waterfall)"
        opacity="0.95"
      />
      {/* Sparkling Whitewater Mist Foam */}
      <ellipse cx="26" cy={height} rx="38" ry="14" fill="#FFFFFF" opacity="0.75" filter="url(#soft-mist)" />
      <circle cx="18" cy={height - 6} r="10" fill="#E8F6FC" opacity="0.8" />
      <circle cx="34" cy={height - 4} r="8" fill="#E8F6FC" opacity="0.8" />
      {/* Mountain Plunge Pool */}
      <ellipse cx="26" cy={height + 10} rx="46" ry="12" fill="#2E7E9E" opacity="0.5" />
    </g>
  );
};

export const RoadMarkerStone: React.FC<{
  x: number;
  y: number;
  km: string;
  label: string;
}> = ({ x, y, km, label }) => {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <ellipse cx="14" cy="22" rx="18" ry="6" fill="#142618" opacity="0.4" />
      <path d="M 0 20 L 0 8 Q 14 -4 28 8 L 28 20 Z" fill="#E8E2D5" stroke="#5C5346" strokeWidth="1.5" />
      <text x="14" y="8" fill="#1C381E" fontSize="6.5" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
        {km}
      </text>
      <text x="14" y="16" fill="#8C5E28" fontSize="5" fontFamily="serif" fontWeight="bold" textAnchor="middle">
        {label}
      </text>
    </g>
  );
};

export const DriftingMistVeil: React.FC<{
  y: number;
  direction?: "left" | "right";
  opacity?: number;
}> = ({ y, direction = "left", opacity = 0.4 }) => {
  return (
    <g
      transform={`translate(0, ${y})`}
      className={direction === "left" ? "animate-cloud-drift" : "animate-mist-pulse"}
      opacity={opacity}
      pointerEvents="none"
    >
      <path
        d="M -100 0 Q 300 -60 700 0 Q 1100 60 1500 -20 Q 1800 40 2000 0 L 2000 120 Q 1500 180 1100 120 Q 700 60 300 140 L -100 120 Z"
        fill="url(#grad-sky-ghibli)"
        filter="url(#soft-mist)"
        opacity="0.35"
      />
    </g>
  );
};

// ==========================================
// 13B. MAJESTIC STUDIO GHIBLI MOUNTAINS (CROSS-ELEVATION)
// ==========================================
export const MajesticGhibliMountains: React.FC = () => {
  return (
    <g id="majestic-ghibli-mountains" className="pointer-events-none">
      {/* ======================================================== */}
      {/* 1. ULTRA-DISTANT CERULEAN SUMMITS (Cameroon Border)      */}
      {/* ======================================================== */}
      {/* Far Horizon Peaks - High Summit (y=80..650) */}
      <path
        d="M -300 320 Q 80 140 420 230 Q 750 90 1150 200 Q 1520 110 1950 240 L 1950 750 L -300 750 Z"
        fill="url(#grad-mountain-far)"
        opacity="0.88"
      />
      {/* Sunlit peak highlights on high summits */}
      <path
        d="M -280 310 Q 80 140 420 230 Q 750 90 1150 200 Q 1520 110 1930 230"
        fill="none"
        stroke="#80B8DE"
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Mid Horizon Peaks - Layer 2 (y=240..780) */}
      <path
        d="M -300 440 Q 180 260 580 360 Q 940 220 1380 340 Q 1720 240 2000 360 L 2000 850 L -300 850 Z"
        fill="url(#grad-mountain-mid)"
        opacity="0.9"
      />
      <path
        d="M -280 430 Q 180 260 580 360 Q 940 220 1380 340 Q 1720 240 1980 350"
        fill="none"
        stroke="#68A57A"
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Near Highland Ridges - Layer 3 (y=400..950) */}
      <path
        d="M -300 580 Q 240 410 680 500 Q 1120 380 1560 480 Q 1820 400 2000 510 L 2000 950 L -300 950 Z"
        fill="url(#grad-mountain-near)"
        opacity="0.8"
      />

      {/* ======================================================== */}
      {/* 2. SERPENTINE PASS OVERLOOK MOUNTAINS (y=2200..3200)      */}
      {/* Visible from the 22-hairpin cliffside looking down & out */}
      {/* ======================================================== */}
      {/* Deep Valley Misty Mountain Vista */}
      <g opacity="0.75">
        <path
          d="M 980 2850 Q 1320 2580 1620 2680 Q 1850 2520 2000 2620 L 2000 3200 L 980 3200 Z"
          fill="url(#grad-mountain-far)"
        />
        <path
          d="M -300 3050 Q 0 2820 320 2920 Q 640 2780 920 2880 L 920 3350 L -300 3350 Z"
          fill="url(#grad-mountain-mid)"
        />
      </g>

      {/* Floating valley mist ribbons between mountain folds */}
      <path
        d="M -200 620 Q 300 540 800 610 Q 1300 530 1800 620 L 1800 690 Q 1300 610 800 680 Q 300 610 -200 690 Z"
        fill="#D6EEF8"
        opacity="0.32"
        filter="url(#soft-mist)"
      />
      <path
        d="M 200 2800 Q 700 2720 1200 2790 Q 1600 2710 1950 2800 L 1950 2860 Q 1600 2780 1200 2850 Q 700 2780 200 2860 Z"
        fill="#D6EEF8"
        opacity="0.28"
        filter="url(#soft-mist)"
      />
    </g>
  );
};

export const GhibliClouds: React.FC = () => (
  <g id="ghibli-clouds" className="pointer-events-none">
    <g transform="translate(200, 150)" className="animate-cloud-drift" opacity="0.9">
      <ellipse cx="0" cy="0" rx="80" ry="35" fill="#FFFFFF" />
      <ellipse cx="-40" cy="10" rx="60" ry="30" fill="#F5F5F5" />
      <ellipse cx="50" cy="5" rx="65" ry="32" fill="#FAFAFA" />
      <ellipse cx="10" cy="-20" rx="55" ry="28" fill="#FFFFFF" />
    </g>
    <g transform="translate(900, 100)" className="animate-mist-pulse" opacity="0.85">
      <ellipse cx="0" cy="0" rx="90" ry="38" fill="#FEFEFE" />
      <ellipse cx="-50" cy="8" rx="55" ry="28" fill="#F8F8F8" />
      <ellipse cx="60" cy="5" rx="70" ry="35" fill="#FFFFFF" />
    </g>
  </g>
);

// ==========================================
// 14. VEHICLE ARTWORK: SAFARI 4x4 & TOUR BUS
// ==========================================
export const VintageSafariCar: React.FC<VehicleProps> = ({
  perspective,
  className = "",
}) => {
  return (
    <g
      className={`transition-transform duration-200 ${className}`}
      transform="translate(-80, -114)"
      style={{ willChange: "transform" }}
    >
      <ellipse
        cx="80"
        cy="114"
        rx="52"
        ry="14"
        fill="#141E15"
        opacity="0.55"
        filter="url(#ghibli-shadow)"
      />

      {/* REAR VIEW ASCENDING */}
      {perspective === "rear" && (
        <g id="car-rear" transform="translate(0, -6)">
          <rect x="36" y="94" width="18" height="24" rx="5" fill="#1C1F22" />
          <rect x="38" y="98" width="14" height="18" rx="3" fill="#2E3339" />
          <rect x="106" y="94" width="18" height="24" rx="5" fill="#1C1F22" />
          <rect x="108" y="98" width="14" height="18" rx="3" fill="#2E3339" />

          <rect x="42" y="102" width="76" height="6" fill="#151719" />
          <rect x="34" y="105" width="20" height="12" fill="#1A1C1D" />
          <rect x="106" y="105" width="20" height="12" fill="#1A1C1D" />

          <path
            d="M 34 50 L 126 50 Q 132 50 132 56 L 132 98 Q 132 102 126 102 L 34 102 Q 28 102 28 98 L 28 56 Q 28 50 34 50 Z"
            fill="#527048"
            stroke="#2B3D26"
            strokeWidth="3.5"
          />

          <rect x="32" y="96" width="96" height="10" rx="3" fill="#6A8D5F" />
          <rect x="30" y="100" width="100" height="7" rx="3" fill="#3D4548" stroke="#1D2224" strokeWidth="2" />

          <rect x="32" y="94" width="10" height="6" rx="2" fill="#C23927" stroke="#66190E" strokeWidth="1" />
          <rect x="118" y="94" width="10" height="6" rx="2" fill="#C23927" stroke="#66190E" strokeWidth="1" />

          <path
            d="M 44 26 L 116 26 Q 124 26 122 36 L 120 50 L 40 50 L 38 36 Q 36 26 44 26 Z"
            fill="#FAF6EC"
            stroke="#344830"
            strokeWidth="3"
          />

          <path
            d="M 46 32 L 114 32 Q 118 32 116 40 L 114 48 L 46 48 L 44 40 Q 42 32 46 32 Z"
            fill="#1E384D"
            stroke="#11222E"
            strokeWidth="2"
          />
          <line x1="80" y1="32" x2="80" y2="48" stroke="#FAF6EC" strokeWidth="2.5" />

          <g transform="translate(80, 76)">
            <circle cx="0" cy="0" r="20" fill="#1C1F22" stroke="#0F1112" strokeWidth="3" />
            <circle cx="0" cy="0" r="14" fill="#383D42" />
            <circle cx="0" cy="0" r="7" fill="#527048" stroke="#2B3D26" strokeWidth="1.5" />
          </g>

          <rect x="42" y="20" width="76" height="6" rx="2" fill="#2E3339" stroke="#151719" strokeWidth="1.5" />
          <rect x="48" y="14" width="28" height="8" rx="2" fill="#8C5E28" stroke="#523512" strokeWidth="1.5" />
          <rect x="80" y="14" width="32" height="8" rx="2" fill="#2E536B" stroke="#172D3D" strokeWidth="1.5" />
        </g>
      )}

      {/* FRONT VIEW DESCENDING */}
      {perspective === "front" && (
        <g id="car-front" transform="translate(0, -6)">
          <rect x="36" y="94" width="18" height="24" rx="5" fill="#1C1F22" />
          <rect x="106" y="94" width="18" height="24" rx="5" fill="#1C1F22" />

          <path
            d="M 34 50 L 126 50 Q 132 50 132 56 L 132 98 Q 132 102 126 102 L 34 102 Q 28 102 28 98 L 28 56 Q 28 50 34 50 Z"
            fill="#527048"
            stroke="#2B3D26"
            strokeWidth="3.5"
          />

          <path
            d="M 44 26 L 116 26 Q 124 26 122 36 L 120 50 L 40 50 L 38 36 Q 36 26 44 26 Z"
            fill="#FAF6EC"
            stroke="#344830"
            strokeWidth="3"
          />

          <path
            d="M 46 32 L 114 32 Q 118 32 116 40 L 114 48 L 46 48 L 44 40 Q 42 32 46 32 Z"
            fill="#1E384D"
            stroke="#11222E"
            strokeWidth="2"
          />
          <line x1="56" y1="34" x2="84" y2="46" stroke="#9FD3F5" strokeWidth="2.5" opacity="0.6" />

          <circle cx="58" cy="40" r="4.5" fill="#FCE4C8" />
          <circle cx="102" cy="40" r="4.5" fill="#FCE4C8" />

          <rect x="52" y="66" width="56" height="26" rx="4" fill="#2E3339" stroke="#181B1C" strokeWidth="2" />
          {[58, 66, 74, 82, 90, 98].map((gx) => (
            <line key={gx} x1={gx} y1="70" x2={gx} y2="88" stroke="#FAF6EC" strokeWidth="2" />
          ))}

          <circle cx="42" cy="78" r="8" fill="#FFF9E6" stroke="#A89255" strokeWidth="2" />
          <circle cx="118" cy="78" r="8" fill="#FFF9E6" stroke="#A89255" strokeWidth="2" />
          <circle cx="42" cy="78" r="3" fill="#FFFFFF" />
          <circle cx="118" cy="78" r="3" fill="#FFFFFF" />

          <rect x="28" y="96" width="104" height="9" rx="3" fill="#3D4548" stroke="#1D2224" strokeWidth="2" />
        </g>
      )}

      {/* SIDE RIGHT (EAST) */}
      {(perspective === "side-right" || perspective === "front-right" || perspective === "rear-right") && (
        <g id="car-side-right" transform="translate(0, -6)">
          <rect x="24" y="90" width="28" height="24" rx="6" fill="#1C1F22" stroke="#0E1012" strokeWidth="2" />
          <circle cx="38" cy="102" r="7" fill="#697682" />
          <rect x="108" y="90" width="28" height="24" rx="6" fill="#1C1F22" stroke="#0E1012" strokeWidth="2" />
          <circle cx="122" cy="102" r="7" fill="#697682" />

          <path
            d="M 18 84 L 20 54 Q 24 48 34 46 L 68 46 L 82 26 L 132 26 Q 140 26 142 36 L 144 84 Z"
            fill="#527048"
            stroke="#2B3D26"
            strokeWidth="3.5"
          />

          <polygon points="86,44 110,44 108,30 84,30" fill="#1E384D" stroke="#11222E" strokeWidth="1.5" />
          <polygon points="114,44 136,44 134,30 112,30" fill="#1E384D" stroke="#11222E" strokeWidth="1.5" />

          <circle cx="98" cy="38" r="4.5" fill="#FCE4C8" />

          <rect x="16" y="82" width="130" height="7" rx="3" fill="#3D4548" stroke="#1D2224" strokeWidth="1.5" />
          <rect x="14" y="70" width="6" height="10" rx="2" fill="#FFE58F" stroke="#7A6830" strokeWidth="1" />
        </g>
      )}

      {/* SIDE LEFT (WEST) */}
      {(perspective === "side-left" || perspective === "front-left" || perspective === "rear-left") && (
        <g id="car-side-left" transform="translate(160, -6) scale(-1, 1)">
          <rect x="24" y="90" width="28" height="24" rx="6" fill="#1C1F22" stroke="#0E1012" strokeWidth="2" />
          <circle cx="38" cy="102" r="7" fill="#697682" />
          <rect x="108" y="90" width="28" height="24" rx="6" fill="#1C1F22" stroke="#0E1012" strokeWidth="2" />
          <circle cx="122" cy="102" r="7" fill="#697682" />

          <path
            d="M 18 84 L 20 54 Q 24 48 34 46 L 68 46 L 82 26 L 132 26 Q 140 26 142 36 L 144 84 Z"
            fill="#527048"
            stroke="#2B3D26"
            strokeWidth="3.5"
          />

          <polygon points="86,44 110,44 108,30 84,30" fill="#1E384D" stroke="#11222E" strokeWidth="1.5" />
          <polygon points="114,44 136,44 134,30 112,30" fill="#1E384D" stroke="#11222E" strokeWidth="1.5" />

          <circle cx="98" cy="38" r="4.5" fill="#FCE4C8" />

          <rect x="16" y="82" width="130" height="7" rx="3" fill="#3D4548" stroke="#1D2224" strokeWidth="1.5" />
          <rect x="14" y="70" width="6" height="10" rx="2" fill="#FFE58F" stroke="#7A6830" strokeWidth="1" />
        </g>
      )}
    </g>
  );
};

export const RanchTourBus: React.FC<VehicleProps> = ({
  perspective,
  className = "",
}) => {
  return (
    <g
      className={`transition-transform duration-200 ${className}`}
      transform="translate(-84, -122)"
      style={{ willChange: "transform" }}
    >
      <ellipse
        cx="84"
        cy="122"
        rx="60"
        ry="16"
        fill="#141E15"
        opacity="0.6"
        filter="url(#ghibli-shadow)"
      />

      {/* REAR VIEW ASCENDING */}
      {perspective === "rear" && (
        <g id="bus-rear" transform="translate(0, -4)">
          <rect x="30" y="102" width="20" height="24" rx="5" fill="#1C1F22" />
          <rect x="118" y="102" width="20" height="24" rx="5" fill="#1C1F22" />

          <path
            d="M 28 36 L 140 36 Q 146 36 146 42 L 146 108 L 22 108 L 22 42 Q 22 36 28 36 Z"
            fill="#D99B35"
            stroke="#7A5212"
            strokeWidth="3.5"
          />

          <rect x="22" y="82" width="124" height="16" fill="#FAF6EC" stroke="#664512" strokeWidth="2" />

          <rect x="34" y="44" width="100" height="28" rx="4" fill="#1E384D" stroke="#10202C" strokeWidth="2.5" />
          <line x1="84" y1="44" x2="84" y2="72" stroke="#D99B35" strokeWidth="3" />

          <rect x="20" y="106" width="128" height="9" rx="3" fill="#2E3339" stroke="#141719" strokeWidth="2" />
        </g>
      )}

      {/* FRONT VIEW DESCENDING */}
      {perspective === "front" && (
        <g id="bus-front" transform="translate(0, -4)">
          <rect x="30" y="102" width="20" height="24" rx="5" fill="#1C1F22" />
          <rect x="118" y="102" width="20" height="24" rx="5" fill="#1C1F22" />

          <path
            d="M 28 36 L 140 36 Q 146 36 146 42 L 146 108 L 22 108 L 22 42 Q 22 36 28 36 Z"
            fill="#D99B35"
            stroke="#7A5212"
            strokeWidth="3.5"
          />

          <rect x="22" y="82" width="124" height="16" fill="#FAF6EC" stroke="#664512" strokeWidth="2" />

          <path
            d="M 32 44 L 136 44 Q 140 44 140 50 L 138 72 L 30 72 L 28 50 Q 28 44 32 44 Z"
            fill="#1E384D"
            stroke="#10202C"
            strokeWidth="2.5"
          />

          <circle cx="56" cy="58" r="5" fill="#FCE4C8" />
          <circle cx="84" cy="58" r="5" fill="#FCE4C8" />
          <circle cx="112" cy="58" r="5" fill="#FCE4C8" />

          <circle cx="38" cy="90" r="8" fill="#FFF9E6" stroke="#9E782A" strokeWidth="2" />
          <circle cx="130" cy="90" r="8" fill="#FFF9E6" stroke="#9E782A" strokeWidth="2" />

          <rect x="20" y="106" width="128" height="9" rx="3" fill="#2E3339" stroke="#141719" strokeWidth="2" />
        </g>
      )}

      {/* SIDE VIEWS */}
      {(perspective.includes("side") || perspective.includes("right") || perspective.includes("left")) && (
        <g id="bus-side" transform={perspective.includes("left") ? "translate(168, -4) scale(-1, 1)" : "translate(0, -4)"}>
          <rect x="26" y="98" width="26" height="26" rx="6" fill="#1C1F22" />
          <rect x="116" y="98" width="26" height="26" rx="6" fill="#1C1F22" />

          <path
            d="M 16 98 L 18 42 Q 22 36 34 36 L 140 36 Q 152 36 152 46 L 152 98 Z"
            fill="#D99B35"
            stroke="#7A5212"
            strokeWidth="3.5"
          />

          <rect x="16" y="78" width="136" height="14" fill="#FAF6EC" stroke="#664512" strokeWidth="1.5" />

          <rect x="26" y="44" width="22" height="24" rx="2" fill="#1E384D" />
          <rect x="54" y="44" width="26" height="24" rx="2" fill="#1E384D" />
          <rect x="86" y="44" width="26" height="24" rx="2" fill="#1E384D" />
          <rect x="118" y="44" width="26" height="24" rx="2" fill="#1E384D" />

          <circle cx="67" cy="54" r="4.5" fill="#FCE4C8" />
          <circle cx="99" cy="54" r="4.5" fill="#FCE4C8" />

          <rect x="12" y="96" width="144" height="8" rx="2" fill="#2E3339" stroke="#141719" strokeWidth="2" />
        </g>
      )}
    </g>
  );
};

export const GhibliCloudPuff: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <g transform="translate(0, 0)">
      <circle cx="-20" cy="-10" r={20 + progress * 25} fill="#FFFFFF" opacity={1 - progress * 0.8} />
      <circle cx="20" cy="-15" r={24 + progress * 28} fill="#FAF5E8" opacity={1 - progress * 0.8} />
      <circle cx="0" cy="-25" r={28 + progress * 30} fill="#FFF9EE" opacity={1 - progress * 0.7} />
      <circle cx="-35" cy="5" r={16 + progress * 20} fill="#F0ECE0" opacity={1 - progress * 0.9} />
      <circle cx="35" cy="5" r={18 + progress * 22} fill="#F0ECE0" opacity={1 - progress * 0.9} />
    </g>
  );
};
