export default function SkylineRouteMap() {
  return (
    <svg viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
      {/* Cable lines */}
      <line x1="100" y1="200" x2="400" y2="150" stroke="#b2bec3" strokeWidth="3" strokeDasharray="8,4"/>
      <line x1="400" y1="150" x2="650" y2="80" stroke="#b2bec3" strokeWidth="3" strokeDasharray="8,4"/>
      <line x1="400" y1="150" x2="700" y2="240" stroke="#b2bec3" strokeWidth="3" strokeDasharray="8,4"/>

      {/* Stations */}
      {/* Pop Century */}
      <circle cx="100" cy="200" r="18" fill="#FF6B6B" stroke="white" strokeWidth="3"/>
      <text x="100" y="240" textAnchor="middle" fontFamily="Nunito, sans-serif" fontWeight="800" fontSize="13" fill="#2D3436">Pop Century</text>
      <text x="100" y="255" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill="#636e72">Our Hotel!</text>

      {/* Caribbean Beach Hub */}
      <circle cx="400" cy="150" r="22" fill="#1E90FF" stroke="white" strokeWidth="3"/>
      <text x="400" y="195" textAnchor="middle" fontFamily="Nunito, sans-serif" fontWeight="800" fontSize="13" fill="#2D3436">Caribbean Beach</text>
      <text x="400" y="210" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill="#636e72">Transfer Hub</text>

      {/* EPCOT */}
      <circle cx="650" cy="80" r="18" fill="#FFD700" stroke="white" strokeWidth="3"/>
      <text x="650" y="60" textAnchor="middle" fontFamily="Nunito, sans-serif" fontWeight="800" fontSize="13" fill="#2D3436">EPCOT</text>
      <text x="650" y="44" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill="#636e72">International Gateway</text>

      {/* Hollywood Studios */}
      <circle cx="700" cy="240" r="18" fill="#4ECDC4" stroke="white" strokeWidth="3"/>
      <text x="700" y="275" textAnchor="middle" fontFamily="Nunito, sans-serif" fontWeight="800" fontSize="13" fill="#2D3436">Hollywood Studios</text>

      {/* Animated Gondola: Pop → Caribbean */}
      <g>
        <rect x="-12" y="-8" width="24" height="16" rx="4" fill="#2D3436"/>
        <line x1="-8" y1="-8" x2="-8" y2="-14" stroke="#2D3436" strokeWidth="2"/>
        <line x1="8" y1="-8" x2="8" y2="-14" stroke="#2D3436" strokeWidth="2"/>
        <line x1="-8" y1="-14" x2="8" y2="-14" stroke="#2D3436" strokeWidth="2"/>
        <animateMotion dur="4s" repeatCount="indefinite" path="M100,200 L400,150" rotate="auto"/>
      </g>

      {/* Animated Gondola: Caribbean → EPCOT */}
      <g>
        <rect x="-12" y="-8" width="24" height="16" rx="4" fill="#FFD700"/>
        <line x1="-8" y1="-8" x2="-8" y2="-14" stroke="#FFD700" strokeWidth="2"/>
        <line x1="8" y1="-8" x2="8" y2="-14" stroke="#FFD700" strokeWidth="2"/>
        <line x1="-8" y1="-14" x2="8" y2="-14" stroke="#FFD700" strokeWidth="2"/>
        <animateMotion dur="3.5s" repeatCount="indefinite" begin="1s" path="M400,150 L650,80" rotate="auto"/>
      </g>

      {/* Animated Gondola: Caribbean → HS */}
      <g>
        <rect x="-12" y="-8" width="24" height="16" rx="4" fill="#4ECDC4"/>
        <line x1="-8" y1="-8" x2="-8" y2="-14" stroke="#4ECDC4" strokeWidth="2"/>
        <line x1="8" y1="-8" x2="8" y2="-14" stroke="#4ECDC4" strokeWidth="2"/>
        <line x1="-8" y1="-14" x2="8" y2="-14" stroke="#4ECDC4" strokeWidth="2"/>
        <animateMotion dur="4s" repeatCount="indefinite" begin="0.5s" path="M400,150 L700,240" rotate="auto"/>
      </g>

      {/* Path labels */}
      <text x="230" y="162" fontFamily="Inter, sans-serif" fontSize="10" fill="#636e72" transform="rotate(-9, 230, 162)">~5 min</text>
      <text x="540" y="100" fontFamily="Inter, sans-serif" fontSize="10" fill="#636e72" transform="rotate(-16, 540, 100)">~8 min</text>
      <text x="560" y="210" fontFamily="Inter, sans-serif" fontSize="10" fill="#636e72" transform="rotate(17, 560, 210)">~7 min</text>
    </svg>
  );
}
