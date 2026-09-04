import React from 'react';

export default function NocDashboardIllustration() {
  return (
    <svg viewBox="0 0 540 320" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
      <defs>
        <linearGradient id="nocBg" x1="0" y1="0" x2="540" y2="320" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0F172A" />
          <stop offset="1" stopColor="#1E293B" />
        </linearGradient>
        <linearGradient id="nocChart" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7B5FEA" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#7B5FEA" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="nocGreenChart" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0D9E6E" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#0D9E6E" stopOpacity="0" />
        </linearGradient>
        <filter id="nocShadow">
          <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000" floodOpacity="0.3" />
        </filter>
        <filter id="nocGlow">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="nocGlowGreen">
          <feDropShadow dx="0" dy="1" stdDeviation="4" floodColor="#10B981" floodOpacity="0.4" />
        </filter>
        <clipPath id="nocClip">
          <rect width="540" height="320" rx="20" />
        </clipPath>
      </defs>

      <g clipPath="url(#nocClip)">
        {/* Background */}
        <rect width="540" height="320" fill="url(#nocBg)" />
        <rect width="540" height="320" rx="20" stroke="#334155" strokeWidth="1" />

        {/* Subtle grid dots */}
        {Array.from({ length: 14 }).map((_, i) =>
          Array.from({ length: 9 }).map((_, j) => (
            <circle key={`${i}-${j}`} cx={i * 40 + 10} cy={j * 36 + 12} r="0.8" fill="#FFF" opacity="0.03" />
          ))
        )}

        {/* === SIDEBAR === */}
        <g opacity="0.5">
          <rect x="0" y="0" width="52" height="320" fill="#1E293B" />
          <line x1="52" y1="0" x2="52" y2="320" stroke="#334155" strokeWidth="1" />
          {/* Nav dots */}
          {[24, 52, 80, 108].map(y => (
            <g key={y}>
              <circle cx="26" cy={y} r="5" fill="#334155" />
              <circle cx="26" cy={y} r="2" fill="#64748B" />
            </g>
          ))}
          {/* Active indicator */}
          <circle cx="26" cy="24" r="5" fill="#5B3FD4" opacity="0.6" />
          <circle cx="26" cy="24" r="2" fill="#A78BFA" />
        </g>

        {/* === TOP STAT CARDS === */}
        <g filter="url(#nocShadow)" transform="translate(68, 16)">
          {/* Card 1: Active Runtime */}
          <g>
            <rect width="120" height="64" rx="12" fill="#1E293B" stroke="#334155" strokeWidth="1" />
            <rect x="12" y="14" width="6" height="6" rx="1.5" fill="#10B981" />
            <text x="24" y="20" fontSize="7" fontWeight="700" fill="#64748B" fontFamily="'JetBrains Mono',monospace">ACTIVE RUNTIME</text>
            <text x="12" y="44" fontSize="22" fontWeight="800" fill="#A78BFA" fontFamily="'Plus Jakarta Sans',sans-serif">99.98%</text>
            <text x="12" y="56" fontSize="7" fill="#475569" fontFamily="'JetBrains Mono',monospace">▲ 0.02%</text>
          </g>

          {/* Card 2: Routed Leads */}
          <g transform="translate(132, 0)">
            <rect width="120" height="64" rx="12" fill="#1E293B" stroke="#334155" strokeWidth="1" />
            <rect x="12" y="14" width="6" height="6" rx="1.5" fill="#5B3FD4" />
            <text x="24" y="20" fontSize="7" fontWeight="700" fill="#64748B" fontFamily="'JetBrains Mono',monospace">ROUTED LEADS</text>
            <text x="12" y="44" fontSize="22" fontWeight="800" fill="#E0E7FF" fontFamily="'Plus Jakarta Sans',sans-serif">842</text>
            <text x="12" y="56" fontSize="7" fill="#475569" fontFamily="'JetBrains Mono',monospace">THIS WEEK</text>
          </g>

          {/* Card 3: Response Rate */}
          <g transform="translate(264, 0)">
            <rect width="140" height="64" rx="12" fill="#1E293B" stroke="#334155" strokeWidth="1" />
            <rect x="12" y="14" width="6" height="6" rx="1.5" fill="#0D9E6E" />
            <text x="24" y="20" fontSize="7" fontWeight="700" fill="#64748B" fontFamily="'JetBrains Mono',monospace">AVG RESPONSE</text>
            <text x="12" y="44" fontSize="22" fontWeight="800" fill="#6EE7B7" fontFamily="'Plus Jakarta Sans',sans-serif">&lt; 3.2s</text>
            <text x="12" y="56" fontSize="7" fill="#475569" fontFamily="'JetBrains Mono',monospace">FIRST CONTACT</text>
          </g>
        </g>

        {/* === MAIN CHART AREA === */}
        <g filter="url(#nocShadow)" transform="translate(68, 96)">
          <rect width="404" height="200" rx="14" fill="#1E293B" fillOpacity="0.7" stroke="#334155" strokeWidth="1" />
          {/* Chart header */}
          <text x="18" y="26" fontSize="8" fontWeight="700" fill="#64748B" fontFamily="'JetBrains Mono',monospace" letterSpacing="0.06em">CONVERSION SPIKE OVER TIME</text>
          {/* Live indicator */}
          <circle cx="386" cy="22" r="3" fill="#10B981">
            <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
          </circle>
          <text x="372" y="26" fontSize="7" fill="#475569" fontFamily="'JetBrains Mono',monospace" textAnchor="end">LIVE</text>

          {/* Chart grid lines */}
          {[40, 72, 104, 136, 168].map(y => (
            <line key={y} x1="18" y1={y} x2="386" y2={y} stroke="#334155" strokeWidth="0.5" strokeDasharray="2 3" />
          ))}

          {/* Y-axis labels */}
          {['100%', '80%', '60%', '40%', '20%'].map((label, i) => (
            <text key={label} x="12" y={44 + i * 32} fontSize="6" fill="#475569" fontFamily="'JetBrains Mono',monospace" textAnchor="end">{label}</text>
          ))}

          {/* Chart fill - primary */}
          <path
            d="M 18 168 Q 60 140 100 148 T 180 100 T 260 60 T 340 44 L 386 44 L 386 168 Z"
            fill="url(#nocChart)"
          />
          {/* Chart line - primary */}
          <path
            d="M 18 168 Q 60 140 100 148 T 180 100 T 260 60 T 340 44"
            stroke="#7B5FEA"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Chart fill - secondary (green) */}
          <path
            d="M 18 168 Q 80 155 140 140 T 260 120 T 340 90 L 386 90 L 386 168 Z"
            fill="url(#nocGreenChart)"
          />
          {/* Chart line - secondary */}
          <path
            d="M 18 168 Q 80 155 140 140 T 260 120 T 340 90"
            stroke="#0D9E6E"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeDasharray="4 2"
            opacity="0.7"
          />

          {/* Chart data points */}
          <g filter="url(#nocGlow)">
            <circle cx="180" cy="100" r="4" fill="#7B5FEA" stroke="#1E293B" strokeWidth="2" />
            <circle cx="260" cy="60" r="4" fill="#7B5FEA" stroke="#1E293B" strokeWidth="2" />
            <circle cx="340" cy="44" r="5" fill="#10B981" stroke="#1E293B" strokeWidth="2" />
          </g>

          {/* Pulse on latest point */}
          <circle cx="340" cy="44" r="8" fill="none" stroke="#10B981" strokeWidth="1.5" opacity="0">
            <animate attributeName="r" values="5;12" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0" dur="2s" repeatCount="indefinite" />
          </circle>

          {/* Chart legend */}
          <g transform="translate(18, 184)">
            <rect width="8" height="3" rx="1.5" fill="#7B5FEA" />
            <text x="14" y="4" fontSize="7" fill="#64748B" fontFamily="'JetBrains Mono',monospace">CONTACT RATE</text>
            <rect x="110" width="8" height="3" rx="1.5" fill="#0D9E6E" />
            <text x="124" y="4" fontSize="7" fill="#64748B" fontFamily="'JetBrains Mono',monospace">BOOKING RATE</text>
          </g>
        </g>

        {/* Corner accents */}
        <g stroke="#5B3FD4" strokeWidth="1.5" opacity="0.2" strokeLinecap="round">
          <line x1="12" y1="12" x2="32" y2="12" />
          <line x1="12" y1="12" x2="12" y2="32" />
          <line x1="528" y1="308" x2="508" y2="308" />
          <line x1="528" y1="308" x2="528" y2="288" />
        </g>
      </g>
    </svg>
  );
}
