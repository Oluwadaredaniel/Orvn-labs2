import React from 'react';

export default function EngineArchitectureIllustration() {
  return (
    <svg viewBox="0 0 540 280" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
      <defs>
        <linearGradient id="engBg" x1="0" y1="0" x2="540" y2="280" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F7F5FF" />
          <stop offset="1" stopColor="#FAFBFC" />
        </linearGradient>
        <linearGradient id="engLine" x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#5B3FD4" stopOpacity="0.15" />
          <stop offset="0.5" stopColor="#7B5FEA" stopOpacity="0.5" />
          <stop offset="1" stopColor="#0D9E6E" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id="engFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5B3FD4" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#5B3FD4" stopOpacity="0" />
        </linearGradient>
        <filter id="engShadow">
          <feDropShadow dx="0" dy="5" stdDeviation="8" floodColor="#0F172A" floodOpacity="0.05" />
        </filter>
        <filter id="engGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id="engClip">
          <rect width="540" height="280" rx="20" />
        </clipPath>
      </defs>

      <g clipPath="url(#engClip)">
        {/* Background */}
        <rect width="540" height="280" fill="url(#engBg)" />
        <rect width="540" height="280" rx="20" stroke="#E5E8F0" strokeWidth="1" />

        {/* Grid dots */}
        {Array.from({ length: 14 }).map((_, i) =>
          Array.from({ length: 8 }).map((_, j) => (
            <circle key={`${i}-${j}`} cx={i * 40 + 10} cy={j * 40 + 10} r="1" fill="#5B3FD4" opacity="0.05" />
          ))
        )}

        {/* === LAYER LABELS (left side) === */}
        <text x="28" y="68" textAnchor="middle" fontSize="7" fontWeight="700" fill="#94A3B8" fontFamily="'JetBrains Mono',monospace" letterSpacing="0.1em" transform="rotate(-90 28 68)">LAYER 01</text>
        <text x="28" y="140" textAnchor="middle" fontSize="7" fontWeight="700" fill="#94A3B8" fontFamily="'JetBrains Mono',monospace" letterSpacing="0.1em" transform="rotate(-90 28 140)">LAYER 02</text>
        <text x="28" y="212" textAnchor="middle" fontSize="7" fontWeight="700" fill="#94A3B8" fontFamily="'JetBrains Mono',monospace" letterSpacing="0.1em" transform="rotate(-90 28 212)">LAYER 03</text>

        {/* Vertical separator lines */}
        <line x1="48" y1="20" x2="48" y2="260" stroke="#E5E8F0" strokeWidth="1" strokeDasharray="3 3" />

        {/* === MAIN FLOW PATH === */}
        <path
          d="M 60 68 C 130 68 150 140 200 140 S 270 68 330 68 S 390 140 440 140"
          stroke="url(#engLine)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="6 3"
          opacity="0.6"
        >
          <animate attributeName="stroke-dashoffset" from="0" to="9" dur="5s" repeatCount="indefinite" />
        </path>

        {/* === NODE 1: STATE MACHINE === */}
        <g filter="url(#engShadow)">
          <rect x="55" y="40" width="160" height="76" rx="14" fill="#fff" stroke="#E5E8F0" strokeWidth="1.5" />
          {/* Accent bar */}
          <rect x="55" y="40" width="160" height="4" rx="2" fill="#5B3FD4" />
          {/* Icon */}
          <circle cx="82" cy="74" r="14" fill="#F0EEFF" />
          <rect x="76" y="68" width="12" height="12" rx="2" fill="none" stroke="#5B3FD4" strokeWidth="1.8" />
          <line x1="79" y1="71" x2="85" y2="77" stroke="#5B3FD4" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="85" y1="71" x2="79" y2="77" stroke="#5B3FD4" strokeWidth="1.5" strokeLinecap="round" />
          {/* Text */}
          <text x="108" y="66" fontSize="7.5" fontWeight="700" fill="#94A3B8" fontFamily="'JetBrains Mono',monospace" letterSpacing="0.08em">ENGINE LAYER</text>
          <text x="108" y="82" fontSize="12.5" fontWeight="800" fill="#0F172A" fontFamily="'Plus Jakarta Sans',sans-serif">State Machine</text>
          <text x="108" y="96" fontSize="8.5" fontWeight="600" fill="#5B3FD4" fontFamily="'Plus Jakarta Sans',sans-serif">Deterministic transitions</text>
        </g>

        {/* === NODE 2: ASYNC ROUTER === */}
        <g filter="url(#engShadow)">
          <rect x="240" y="108" width="160" height="76" rx="14" fill="#fff" stroke="#E5E8F0" strokeWidth="1.5" />
          <rect x="240" y="108" width="160" height="4" rx="2" fill="#7B5FEA" />
          {/* Icon */}
          <circle cx="267" cy="142" r="14" fill="#F0EEFF" />
          {/* Router icon: branching paths */}
          <circle cx="267" cy="142" r="6" fill="none" stroke="#7B5FEA" strokeWidth="1.8" />
          <line x1="267" y1="136" x2="267" y2="130" stroke="#7B5FEA" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="273" y1="142" x2="279" y2="142" stroke="#7B5FEA" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="267" y1="148" x2="267" y2="154" stroke="#7B5FEA" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="267" cy="130" r="2" fill="#7B5FEA" />
          <circle cx="279" cy="142" r="2" fill="#7B5FEA" />
          <circle cx="267" cy="154" r="2" fill="#7B5FEA" />
          {/* Text */}
          <text x="293" y="134" fontSize="7.5" fontWeight="700" fill="#94A3B8" fontFamily="'JetBrains Mono',monospace" letterSpacing="0.08em">SIMULATION</text>
          <text x="293" y="150" fontSize="12.5" fontWeight="800" fill="#0F172A" fontFamily="'Plus Jakarta Sans',sans-serif">Async Router</text>
          <text x="293" y="164" fontSize="8.5" fontWeight="600" fill="#7B5FEA" fontFamily="'Plus Jakarta Sans',sans-serif">Queued notifications</text>
        </g>

        {/* === NODE 3: FULL TEST SUITE === */}
        <g filter="url(#engShadow)">
          <rect x="325" y="180" width="160" height="76" rx="14" fill="#fff" stroke="#E5E8F0" strokeWidth="1.5" />
          <rect x="325" y="180" width="160" height="4" rx="2" fill="#0D9E6E" />
          {/* Icon */}
          <circle cx="352" cy="214" r="14" fill="#ECFDF5" />
          {/* Shield/check icon */}
          <path d="M 352 206 L 348 210 L 348 218 L 352 222 L 356 218 L 356 210 Z" fill="none" stroke="#0D9E6E" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M 350 214 L 352 216 L 355 212" stroke="#0D9E6E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          {/* Text */}
          <text x="378" y="206" fontSize="7.5" fontWeight="700" fill="#94A3B8" fontFamily="'JetBrains Mono',monospace" letterSpacing="0.08em">QUALITY ASSURED</text>
          <text x="378" y="222" fontSize="12.5" fontWeight="800" fill="#0F172A" fontFamily="'Plus Jakarta Sans',sans-serif">Full Test Suite</text>
          <text x="378" y="236" fontSize="8.5" fontWeight="600" fill="#0D9E6E" fontFamily="'Plus Jakarta Sans',sans-serif">140+ unit checks</text>
        </g>

        {/* === FLOATING LABELS === */}
        <g transform="translate(55, 248)">
          <rect width="120" height="24" rx="12" fill="#F0EEFF" stroke="#D4CBF9" strokeWidth="1" />
          <text x="60" y="15.5" textAnchor="middle" fontSize="8" fontWeight="700" fill="#5B3FD4" fontFamily="'JetBrains Mono',monospace">DETERMINISTIC</text>
        </g>
        <g transform="translate(200, 248)">
          <rect width="116" height="24" rx="12" fill="#F5F3FF" stroke="#D4CBF9" strokeWidth="1" />
          <text x="58" y="15.5" textAnchor="middle" fontSize="8" fontWeight="700" fill="#7B5FEA" fontFamily="'JetBrains Mono',monospace">SIMULATED</text>
        </g>
        <g transform="translate(330, 248)">
          <rect width="120" height="24" rx="12" fill="#ECFDF5" stroke="#A7F3D0" strokeWidth="1" />
          <text x="60" y="15.5" textAnchor="middle" fontSize="8" fontWeight="700" fill="#0D9E6E" fontFamily="'JetBrains Mono',monospace">VERIFIED ✓</text>
        </g>

        {/* === ANIMATED PARTICLES === */}
        <g filter="url(#engGlow)">
          <circle r="4" fill="#5B3FD4">
            <animateMotion dur="5s" repeatCount="indefinite" path="M 60 68 C 130 68 150 140 200 140 S 270 68 330 68 S 390 140 440 140" />
          </circle>
          <circle r="3" fill="#5B3FD4" opacity="0.35">
            <animateMotion dur="5s" repeatCount="indefinite" path="M 60 68 C 130 68 150 140 200 140 S 270 68 330 68 S 390 140 440 140" begin="0.5s" />
          </circle>
        </g>
      </g>
    </svg>
  );
}
