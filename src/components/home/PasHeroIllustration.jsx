import React from 'react';

export default function PasHeroIllustration() {
  return (
    <svg viewBox="0 0 540 400" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
      <defs>
        <linearGradient id="heroBg" x1="0" y1="0" x2="540" y2="400" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F7F5FF" />
          <stop offset="1" stopColor="#F0FDFA" />
        </linearGradient>
        <linearGradient id="heroFlow" x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#5B3FD4" />
          <stop offset="0.5" stopColor="#7B5FEA" />
          <stop offset="1" stopColor="#0D9E6E" />
        </linearGradient>
        <linearGradient id="heroFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5B3FD4" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#5B3FD4" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="heroGreenFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0D9E6E" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#0D9E6E" stopOpacity="0" />
        </linearGradient>
        <filter id="heroShadow">
          <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#0F172A" floodOpacity="0.06" />
        </filter>
        <filter id="heroGlow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="heroGlowGreen">
          <feDropShadow dx="0" dy="2" stdDeviation="6" floodColor="#0D9E6E" floodOpacity="0.25" />
        </filter>
        <clipPath id="heroClip">
          <rect width="540" height="400" rx="24" />
        </clipPath>
      </defs>

      <g clipPath="url(#heroClip)">
        {/* Background */}
        <rect width="540" height="400" fill="url(#heroBg)" />
        <rect width="540" height="400" rx="24" stroke="#E5E8F0" strokeWidth="1" />

        {/* Grid dots */}
        {Array.from({ length: 14 }).map((_, i) =>
          Array.from({ length: 10 }).map((_, j) => (
            <circle
              key={`${i}-${j}`}
              cx={i * 40 + 10}
              cy={j * 40 + 10}
              r="1"
              fill="#5B3FD4"
              opacity="0.06"
            />
          ))
        )}

        {/* === FLOW PIPELINE === */}
        {/* Main curved flow path */}
        <path
          d="M 70 200 C 130 200 160 140 220 140 C 260 140 270 180 270 200 C 270 220 260 260 320 260 C 360 260 380 220 440 200"
          stroke="url(#heroFlow)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="8 4"
          opacity="0.5"
        >
          <animate attributeName="stroke-dashoffset" from="0" to="12" dur="4s" repeatCount="indefinite" />
        </path>

        {/* Flow fill area */}
        <path
          d="M 70 200 C 130 200 160 140 220 140 C 260 140 270 180 270 200 C 270 220 260 260 320 260 C 360 260 380 220 440 200 L 440 320 L 70 320 Z"
          fill="url(#heroFill)"
          opacity="0.5"
        />

        {/* === NODE 1: INBOUND LEAD === */}
        <g filter="url(#heroShadow)">
          <rect x="20" y="148" width="120" height="104" rx="18" fill="#fff" stroke="#E5E8F0" strokeWidth="1.5" />
          {/* Top accent */}
          <rect x="20" y="148" width="120" height="5" rx="2.5" fill="#5B3FD4" />
          {/* Icon container */}
          <circle cx="80" cy="182" r="20" fill="#F0EEFF" />
          {/* Phone icon */}
          <rect x="73" y="174" width="14" height="18" rx="3" fill="none" stroke="#5B3FD4" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="79" y1="188" x2="81" y2="188" stroke="#5B3FD4" strokeWidth="1.5" strokeLinecap="round" />
          {/* Pulse ring */}
          <circle cx="80" cy="182" r="24" fill="none" stroke="#5B3FD4" strokeWidth="1.5" opacity="0">
            <animate attributeName="r" values="22;34" dur="2.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.35;0" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <text x="80" y="218" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0F172A" fontFamily="'Plus Jakarta Sans',sans-serif">Inbound Lead</text>
          <text x="80" y="232" textAnchor="middle" fontSize="8" fill="#94A3B8" fontFamily="'JetBrains Mono',monospace" fontWeight="600">UNFILTERED</text>
        </g>

        {/* === NODE 2: PAS ENGINE (center) === */}
        <g filter="url(#heroShadow)">
          <rect x="175" y="108" width="190" height="144" rx="22" fill="#fff" stroke="#D4CBF9" strokeWidth="2" />
          {/* Top accent */}
          <rect x="175" y="108" width="190" height="6" rx="3" fill="#5B3FD4" />
          {/* Decorative orbit rings */}
          <circle cx="270" cy="168" r="28" fill="none" stroke="#5B3FD4" strokeWidth="1" opacity="0.15" strokeDasharray="4 3">
            <animateTransform attributeName="transform" type="rotate" from="0 270 168" to="360 270 168" dur="12s" repeatCount="indefinite" />
          </circle>
          <circle cx="270" cy="168" r="38" fill="none" stroke="#7B5FEA" strokeWidth="0.8" opacity="0.1" strokeDasharray="3 4">
            <animateTransform attributeName="transform" type="rotate" from="360 270 168" to="0 270 168" dur="16s" repeatCount="indefinite" />
          </circle>
          {/* Core circle */}
          <circle cx="270" cy="168" r="22" fill="#5B3FD4" filter="url(#heroGlow)">
            <animate attributeName="opacity" values="0.85;1;0.85" dur="3s" repeatCount="indefinite" />
          </circle>
          {/* Lightning bolt */}
          <path d="M 265 158 L 272 168 L 266 168 L 273 180 L 267 170 L 273 170 L 266 158 Z" fill="#fff" />
          {/* Label */}
          <text x="270" y="214" textAnchor="middle" fontSize="13" fontWeight="800" fill="#3A2899" fontFamily="'Plus Jakarta Sans',sans-serif">PAS Engine</text>
          <text x="270" y="228" textAnchor="middle" fontSize="8" fill="#7B5FEA" fontFamily="'JetBrains Mono',monospace" fontWeight="700">STATE MACHINE</text>
        </g>

        {/* === NODE 3: BOOKED AGENT === */}
        <g filter="url(#heroShadow)">
          <rect x="400" y="148" width="120" height="104" rx="18" fill="#fff" stroke="#A7F3D0" strokeWidth="1.5" />
          {/* Top accent */}
          <rect x="400" y="148" width="120" height="5" rx="2.5" fill="#0D9E6E" />
          {/* Icon container */}
          <circle cx="460" cy="182" r="20" fill="#ECFDF5" />
          {/* Calendar check */}
          <rect x="451" y="174" width="18" height="16" rx="3" fill="none" stroke="#0D9E6E" strokeWidth="1.8" />
          <path d="M 454 180 L 458 184 L 466 176" stroke="#0D9E6E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          {/* Success pulse */}
          <circle cx="460" cy="182" r="24" fill="none" stroke="#0D9E6E" strokeWidth="1.5" opacity="0">
            <animate attributeName="r" values="22;34" dur="3s" repeatCount="indefinite" begin="1s" />
            <animate attributeName="opacity" values="0.25;0" dur="3s" repeatCount="indefinite" begin="1s" />
          </circle>
          <text x="460" y="218" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065F46" fontFamily="'Plus Jakarta Sans',sans-serif">Booked Agent</text>
          <text x="460" y="232" textAnchor="middle" fontSize="8" fill="#0D9E6E" fontFamily="'JetBrains Mono',monospace" fontWeight="600">CALENDAR ✓</text>
        </g>

        {/* === NODE 4: CRM LOG (bottom) === */}
        <g filter="url(#heroShadow)">
          <rect x="200" y="290" width="140" height="64" rx="14" fill="#F8FAFC" stroke="#E5E8F0" strokeWidth="1" />
          {/* Tiny green dot */}
          <circle cx="218" cy="310" r="4" fill="#0D9E6E" />
          <text x="280" y="314" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#475569" fontFamily="'Plus Jakarta Sans',sans-serif">Logged Clean</text>
          <text x="280" y="330" textAnchor="middle" fontSize="8" fill="#94A3B8" fontFamily="'JetBrains Mono',monospace">CRM + SLACK + COMPLIANCE</text>
        </g>

        {/* === CONNECTIONS === */}
        {/* Lead → Engine */}
        <path d="M 140 200 L 175 180" stroke="#5B3FD4" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
        {/* Engine → Agent */}
        <path d="M 365 180 L 400 200" stroke="#0D9E6E" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
        {/* Engine → CRM */}
        <path d="M 270 252 L 270 290" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 3" opacity="0.4" />

        {/* === ANIMATED PARTICLES === */}
        <g filter="url(#heroGlow)">
          {/* Particle: Lead → Engine */}
          <circle r="5" fill="#5B3FD4">
            <animateMotion dur="2.5s" repeatCount="indefinite" path="M 140 200 L 175 180" />
          </circle>
          <circle r="3" fill="#5B3FD4" opacity="0.4">
            <animateMotion dur="2.5s" repeatCount="indefinite" path="M 140 200 L 175 180" begin="0.3s" />
          </circle>
        </g>
        <g filter="url(#heroGlowGreen)">
          {/* Particle: Engine → Agent */}
          <circle r="5" fill="#0D9E6E">
            <animateMotion dur="2s" repeatCount="indefinite" begin="0.8s" path="M 365 180 L 400 200" />
          </circle>
          <circle r="3" fill="#0D9E6E" opacity="0.4">
            <animateMotion dur="2s" repeatCount="indefinite" begin="1.1s" path="M 365 180 L 400 200" />
          </circle>
        </g>
        <g>
          {/* Particle: Engine → CRM */}
          <circle r="3.5" fill="#94A3B8">
            <animateMotion dur="1.8s" repeatCount="indefinite" begin="1.5s" path="M 270 252 L 270 290" />
          </circle>
        </g>

        {/* === FLOATING TAGS === */}
        <g transform="translate(95, 80)">
          <rect width="96" height="28" rx="14" fill="#FFFBEB" stroke="#FDE68A" strokeWidth="1" filter="url(#heroShadow)" />
          <text x="48" y="17.5" textAnchor="middle" fontSize="9" fontWeight="700" fill="#92400E" fontFamily="'Plus Jakarta Sans',sans-serif">Delay deleted</text>
        </g>
        <g transform="translate(340, 88)">
          <rect width="100" height="28" rx="14" fill="#ECFDF5" stroke="#A7F3D0" strokeWidth="1" filter="url(#heroShadow)" />
          <text x="50" y="17.5" textAnchor="middle" fontSize="9" fontWeight="700" fill="#065F46" fontFamily="'Plus Jakarta Sans',sans-serif">+38% response</text>
        </g>

        {/* === BOTTOM METRIC BAR === */}
        <g filter="url(#heroShadow)">
          <rect x="60" y="340" width="420" height="48" rx="12" fill="#fff" stroke="#E5E8F0" strokeWidth="1" />
          <g>
            <text x="160" y="362" textAnchor="middle" fontSize="14" fontWeight="800" fill="#0F172A" fontFamily="'Plus Jakarta Sans',sans-serif">94%</text>
            <text x="160" y="376" textAnchor="middle" fontSize="7" fill="#94A3B8" fontFamily="'JetBrains Mono',monospace" fontWeight="600">CONTACT RATE</text>
          </g>
          <line x1="230" y1="348" x2="230" y2="380" stroke="#E5E8F0" strokeWidth="1" />
          <g>
            <text x="280" y="362" textAnchor="middle" fontSize="14" fontWeight="800" fill="#5B3FD4" fontFamily="'Plus Jakarta Sans',sans-serif">24/7</text>
            <text x="280" y="376" textAnchor="middle" fontSize="7" fill="#94A3B8" fontFamily="'JetBrains Mono',monospace" fontWeight="600">AVAILABILITY</text>
          </g>
          <line x1="330" y1="348" x2="330" y2="380" stroke="#E5E8F0" strokeWidth="1" />
          <g>
            <text x="400" y="362" textAnchor="middle" fontSize="14" fontWeight="800" fill="#0D9E6E" fontFamily="'Plus Jakarta Sans',sans-serif">0</text>
            <text x="400" y="376" textAnchor="middle" fontSize="7" fill="#94A3B8" fontFamily="'JetBrains Mono',monospace" fontWeight="600">LEADS LOST</text>
          </g>
        </g>

        {/* Corner accents */}
        <g stroke="#5B3FD4" strokeWidth="2" opacity="0.15" strokeLinecap="round">
          <line x1="20" y1="20" x2="50" y2="20" />
          <line x1="20" y1="20" x2="20" y2="50" />
          <line x1="520" y1="380" x2="490" y2="380" />
          <line x1="520" y1="380" x2="520" y2="350" />
        </g>
      </g>
    </svg>
  );
}
