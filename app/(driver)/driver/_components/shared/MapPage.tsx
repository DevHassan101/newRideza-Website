// app/driver/_components/shared/MapPage.tsx

export default function DesktopMap() {
  return (
    <div className="absolute inset-0">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <defs>
          {/* Map background gradient */}
          <linearGradient id="mapBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#eef0f3"/>
            <stop offset="100%" stopColor="#e4e8ed"/>
          </linearGradient>
          {/* Block fill gradient */}
          <linearGradient id="blockGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#dde2e8"/>
            <stop offset="100%" stopColor="#d4dae0"/>
          </linearGradient>
          {/* Glow filter for vehicles */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="0.4" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          {/* Shadow filter */}
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0.3" stdDeviation="0.5" floodColor="#00000030"/>
          </filter>
          {/* Heatspot gradient */}
          <radialGradient id="heat1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4ade80" stopOpacity="0.55"/>
            <stop offset="100%" stopColor="#4ade80" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="heat2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4ade80" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#4ade80" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="heat3" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#86efac" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#86efac" stopOpacity="0"/>
          </radialGradient>
          {/* Location pulse */}
          <radialGradient id="locPulse" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0"/>
          </radialGradient>
        </defs>

        {/* ── Background ── */}
        <rect width="100" height="100" fill="url(#mapBg)"/>

        {/* ── City blocks (subtle rectangles between roads) ── */}
        {[
          [0,0,20,28],[21,0,20,28],[42,0,22,28],[65,0,19,28],[85,0,15,28],
          [0,29,20,22],[21,29,20,22],[42,29,22,22],[65,29,19,22],[85,29,15,22],
          [0,53,20,20],[21,53,20,20],[42,53,22,20],[65,53,19,20],[85,53,15,20],
          [0,75,20,25],[21,75,20,25],[42,75,22,25],[65,75,19,25],[85,75,15,25],
        ].map(([x,y,w,h],i) => (
          <rect key={i} x={x+0.5} y={y+0.5} width={w-1} height={h-1} rx="0.5" fill="url(#blockGrad)" opacity="0.6"/>
        ))}

        {/* ── Major roads (thick) ── */}
        <line x1="0" y1="28" x2="100" y2="28" stroke="white" strokeWidth="1.8"/>
        <line x1="0" y1="51" x2="100" y2="51" stroke="white" strokeWidth="1.5"/>
        <line x1="0" y1="74" x2="100" y2="74" stroke="white" strokeWidth="1.2"/>
        <line x1="20" y1="0" x2="20" y2="100" stroke="white" strokeWidth="1.8"/>
        <line x1="42" y1="0" x2="42" y2="100" stroke="white" strokeWidth="1.5"/>
        <line x1="65" y1="0" x2="65" y2="100" stroke="white" strokeWidth="1.8"/>
        <line x1="85" y1="0" x2="85" y2="100" stroke="white" strokeWidth="1.2"/>

        {/* ── Minor roads ── */}
        <line x1="0" y1="38" x2="100" y2="38" stroke="white" strokeWidth="0.6" opacity="0.6"/>
        <line x1="0" y1="63" x2="100" y2="63" stroke="white" strokeWidth="0.6" opacity="0.6"/>
        <line x1="31" y1="0" x2="31" y2="100" stroke="white" strokeWidth="0.6" opacity="0.6"/>
        <line x1="53" y1="0" x2="53" y2="100" stroke="white" strokeWidth="0.6" opacity="0.6"/>
        <line x1="75" y1="0" x2="75" y2="100" stroke="white" strokeWidth="0.6" opacity="0.6"/>

        {/* ── Curved/diagonal roads ── */}
        <path d="M0 10 Q 25 18 50 14 Q 75 10 100 17" stroke="white" strokeWidth="1.2" fill="none"/>
        <path d="M0 88 Q 35 82 65 89 Q 82 93 100 88" stroke="white" strokeWidth="0.9" fill="none"/>
        <path d="M10 0 Q 22 20 18 42" stroke="white" strokeWidth="0.7" fill="none" opacity="0.5"/>

        {/* ── Road dashes on major roads ── */}
        <line x1="0" y1="28" x2="100" y2="28" stroke="#f0f0f0" strokeWidth="0.3" strokeDasharray="3 4"/>
        <line x1="42" y1="0" x2="42" y2="100" stroke="#f0f0f0" strokeWidth="0.3" strokeDasharray="3 4"/>

        {/* ── Green demand heatspots ── */}
        {[
          { x:8,  y:14, r:8,  g:"heat3" },
          { x:22, y:8,  r:6,  g:"heat2" },
          { x:55, y:10, r:10, g:"heat1" },
          { x:80, y:10, r:7,  g:"heat3" },
          { x:92, y:28, r:9,  g:"heat2" },
          { x:12, y:50, r:7,  g:"heat3" },
          { x:30, y:45, r:6,  g:"heat2" },
          { x:72, y:48, r:11, g:"heat1" },
          { x:90, y:55, r:8,  g:"heat2" },
          { x:8,  y:68, r:7,  g:"heat3" },
          { x:25, y:76, r:9,  g:"heat1" },
          { x:62, y:80, r:8,  g:"heat2" },
          { x:78, y:66, r:10, g:"heat1" },
          { x:38, y:88, r:7,  g:"heat3" },
          { x:55, y:83, r:9,  g:"heat2" },
        ].map((h,i) => (
          <circle key={i} cx={h.x} cy={h.y} r={h.r} fill={`url(#${h.g})`}/>
        ))}

        {/* ── Parked / moving vehicles (bike icon) ── */}
        {/* Vehicle 1 — top right area */}
        <g filter="url(#shadow)" transform="translate(72, 20)">
          <rect x="-3" y="-3" width="6" height="6" rx="1.5" fill="white"/>
          <circle cx="0" cy="0" r="1.5" fill="#06b6d4"/>
          <circle cx="-1.2" cy="0.8" r="0.7" fill="none" stroke="#06b6d4" strokeWidth="0.4"/>
          <circle cx="1.2" cy="0.8" r="0.7" fill="none" stroke="#06b6d4" strokeWidth="0.4"/>
        </g>

        {/* Vehicle 2 — left area */}
        <g filter="url(#shadow)" transform="translate(10, 60)">
          <rect x="-3" y="-3" width="6" height="6" rx="1.5" fill="white"/>
          <circle cx="0" cy="0" r="1.5" fill="#06b6d4"/>
          <circle cx="-1.2" cy="0.8" r="0.7" fill="none" stroke="#06b6d4" strokeWidth="0.4"/>
          <circle cx="1.2" cy="0.8" r="0.7" fill="none" stroke="#06b6d4" strokeWidth="0.4"/>
        </g>

        {/* Vehicle 3 — bottom right */}
        <g filter="url(#shadow)" transform="translate(80, 80)">
          <rect x="-3" y="-3" width="6" height="6" rx="1.5" fill="white"/>
          <circle cx="0" cy="0" r="1.5" fill="#06b6d4"/>
          <circle cx="-1.2" cy="0.8" r="0.7" fill="none" stroke="#06b6d4" strokeWidth="0.4"/>
          <circle cx="1.2" cy="0.8" r="0.7" fill="none" stroke="#06b6d4" strokeWidth="0.4"/>
        </g>

        {/* Vehicle 4 — center top */}
        <g filter="url(#shadow)" transform="translate(50, 35)">
          <rect x="-3" y="-3" width="6" height="6" rx="1.5" fill="white"/>
          <circle cx="0" cy="0" r="1.5" fill="#8b5cf6"/>
          <circle cx="-1.2" cy="0.8" r="0.7" fill="none" stroke="#8b5cf6" strokeWidth="0.4"/>
          <circle cx="1.2" cy="0.8" r="0.7" fill="none" stroke="#8b5cf6" strokeWidth="0.4"/>
        </g>

        {/* ── Location pulse rings ── */}
        <circle cx="42" cy="52" r="6" fill="url(#locPulse)"/>
        <circle cx="42" cy="52" r="3.5" fill="url(#locPulse)"/>

        {/* ── Current location dot ── */}
        <circle cx="42" cy="52" r="2" fill="#0e7490" stroke="white" strokeWidth="0.8" filter="url(#glow)"/>
        <circle cx="42" cy="52" r="0.8" fill="white"/>

        {/* ── "Current Location" label ── */}
        <g filter="url(#shadow)">
          <rect x="27" y="43.5" width="30" height="6.5" rx="3" fill="#06b6d4"/>
          {/* arrow down */}
          <polygon points="42,51 39.5,49 44.5,49" fill="#06b6d4"/>
          <text x="42" y="48.4" textAnchor="middle" fill="white" fontSize="2.6" fontWeight="bold" fontFamily="system-ui">
            Current Location
          </text>
        </g>

      </svg>
    </div>
  );
}