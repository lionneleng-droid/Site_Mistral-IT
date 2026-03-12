"use client";

/**
 * CyberBackground
 * Fond décoratif cybersécurité : réseau de nœuds interconnectés + flux de données animés.
 * Rendu entièrement en SVG + CSS — pas de canvas, pas de lib externe.
 * Sobre et lumineux, conçu pour rester en arrière-plan.
 */
export default function CyberBackground() {
  // Nœuds du réseau (x%, y%, taille, délai d'animation)
  const nodes = [
    { x: 8,  y: 15, r: 4, d: 0 },
    { x: 22, y: 8,  r: 5, d: 0.4 },
    { x: 38, y: 18, r: 3, d: 0.8 },
    { x: 52, y: 6,  r: 6, d: 0.2 },
    { x: 67, y: 14, r: 4, d: 1.1 },
    { x: 80, y: 5,  r: 3, d: 0.6 },
    { x: 92, y: 20, r: 5, d: 0.3 },

    { x: 5,  y: 40, r: 3, d: 1.2 },
    { x: 18, y: 35, r: 6, d: 0.5 },
    { x: 32, y: 45, r: 4, d: 0.9 },
    { x: 47, y: 32, r: 3, d: 0.1 },
    { x: 60, y: 42, r: 5, d: 0.7 },
    { x: 74, y: 30, r: 4, d: 1.3 },
    { x: 88, y: 44, r: 3, d: 0.4 },
    { x: 95, y: 35, r: 5, d: 1.0 },

    { x: 10, y: 65, r: 5, d: 0.6 },
    { x: 25, y: 72, r: 3, d: 1.4 },
    { x: 40, y: 60, r: 4, d: 0.2 },
    { x: 55, y: 70, r: 6, d: 0.8 },
    { x: 70, y: 62, r: 3, d: 0.5 },
    { x: 83, y: 74, r: 5, d: 1.1 },
    { x: 93, y: 65, r: 4, d: 0.3 },

    { x: 15, y: 88, r: 4, d: 0.9 },
    { x: 30, y: 92, r: 3, d: 0.1 },
    { x: 48, y: 86, r: 5, d: 0.7 },
    { x: 63, y: 94, r: 4, d: 1.2 },
    { x: 78, y: 88, r: 3, d: 0.4 },
    { x: 90, y: 92, r: 5, d: 1.5 },
  ];

  // Arêtes du réseau (index des nœuds à relier)
  const edges = [
    [0,1],[1,2],[2,3],[3,4],[4,5],[5,6],
    [0,8],[1,8],[2,9],[3,10],[4,11],[5,12],[6,13],[6,14],
    [7,8],[8,9],[9,10],[10,11],[11,12],[12,13],[13,14],
    [7,15],[8,16],[9,17],[10,18],[11,19],[12,20],[13,21],[14,21],
    [15,16],[16,17],[17,18],[18,19],[19,20],[20,21],
    [15,22],[16,23],[17,24],[18,25],[19,26],[20,27],[21,27],
    [22,23],[23,24],[24,25],[25,26],[26,27],
    // cross connections
    [1,9],[3,11],[5,13],[8,17],[10,19],[12,20],[18,24],[20,26],
  ];

  // Particules animées qui voyagent sur certaines arêtes
  const flowEdges = [
    [0,1],[1,8],[3,10],[5,12],[8,17],[10,18],[18,25],[19,26],
    [2,9],[4,11],[6,13],[11,19],[12,20],[17,24],[24,25],
  ];

  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradient global */}
          <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#f0f6ff" />
            <stop offset="50%"  stopColor="#f7f5f2" />
            <stop offset="100%" stopColor="#eef2fb" />
          </linearGradient>

          {/* Glow filter pour nœuds */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Particule animée */}
          <circle id="particle" r="0.35" fill="#3b82f6" opacity="0.9" />

          {/* Clip pour rester dans le viewBox */}
          <clipPath id="clip">
            <rect width="100" height="100" />
          </clipPath>
        </defs>

        {/* Fond dégradé */}
        <rect width="100" height="100" fill="url(#bgGrad)" />

        {/* Hexagone décoratif très subtil en haut à droite */}
        <g opacity="0.04" stroke="#1a2235" strokeWidth="0.3" fill="none">
          {[0,1,2,3].map(i => (
            <polygon
              key={i}
              points="85,2 92,6 92,14 85,18 78,14 78,6"
              transform={`translate(${i * 4}, ${i * 3}) scale(${1 + i * 0.4})`}
              style={{ transformOrigin: "85px 10px" }}
            />
          ))}
        </g>

        {/* ── Arêtes ── */}
        <g clipPath="url(#clip)">
          {edges.map(([a, b], i) => {
            const na = nodes[a], nb = nodes[b];
            const dist = Math.hypot(nb.x - na.x, nb.y - na.y);
            // Opacité inversement proportionnelle à la distance
            const opacity = Math.max(0.04, 0.14 - dist * 0.0015);
            return (
              <line
                key={i}
                x1={na.x} y1={na.y}
                x2={nb.x} y2={nb.y}
                stroke="#3b82f6"
                strokeWidth="0.18"
                opacity={opacity}
              />
            );
          })}

          {/* ── Nœuds ── */}
          {nodes.map((n, i) => (
            <g key={i} filter="url(#glow)">
              {/* Halo pulsant */}
              <circle
                cx={n.x} cy={n.y} r={n.r * 2.2}
                fill="#3b82f6"
                opacity="0"
              >
                <animate
                  attributeName="opacity"
                  values="0;0.06;0"
                  dur={`${3 + n.d}s`}
                  begin={`${n.d}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="r"
                  values={`${n.r * 1.5};${n.r * 3};${n.r * 1.5}`}
                  dur={`${3 + n.d}s`}
                  begin={`${n.d}s`}
                  repeatCount="indefinite"
                />
              </circle>
              {/* Nœud principal */}
              <circle
                cx={n.x} cy={n.y} r={n.r * 0.55}
                fill="white"
                stroke="#3b82f6"
                strokeWidth="0.25"
                opacity="0.7"
              />
              {/* Point central */}
              <circle
                cx={n.x} cy={n.y} r={n.r * 0.22}
                fill="#3b82f6"
                opacity="0.8"
              />
            </g>
          ))}

          {/* ── Particules animées sur les arêtes ── */}
          {flowEdges.map(([a, b], i) => {
            const na = nodes[a], nb = nodes[b];
            const dur = 2.5 + (i % 5) * 0.6;
            const begin = (i * 0.37) % 3;
            return (
              <circle
                key={i}
                r="0.38"
                fill="#3b82f6"
                opacity="0"
              >
                <animateMotion
                  dur={`${dur}s`}
                  begin={`${begin}s`}
                  repeatCount="indefinite"
                  path={`M ${na.x} ${na.y} L ${nb.x} ${nb.y}`}
                />
                <animate
                  attributeName="opacity"
                  values="0;0.7;0.7;0"
                  keyTimes="0;0.1;0.9;1"
                  dur={`${dur}s`}
                  begin={`${begin}s`}
                  repeatCount="indefinite"
                />
              </circle>
            );
          })}

          {/* ── Labels binaires / hex décoratifs ── */}
          {[
            { x: 3,  y: 28, text: "0x4A2F" },
            { x: 62, y: 52, text: "10110" },
            { x: 42, y: 80, text: "0xFF3C" },
            { x: 82, y: 58, text: "01001" },
            { x: 20, y: 55, text: "0xA9D1" },
            { x: 70, y: 82, text: "11010" },
          ].map(({ x, y, text }, i) => (
            <text
              key={i}
              x={x} y={y}
              fontSize="1.6"
              fill="#1a2235"
              opacity="0.07"
              fontFamily="monospace"
              letterSpacing="0.3"
            >
              {text}
            </text>
          ))}

          {/* ── Cadenas SVG décoratif (cybersécurité) ── */}
          <g transform="translate(44, 43) scale(0.08)" opacity="0.06" fill="#1a2235">
            <rect x="10" y="30" width="60" height="45" rx="6" />
            <path d="M20 30 V20 Q40 5 60 20 V30" strokeWidth="6" stroke="#1a2235" fill="none" />
            <circle cx="40" cy="52" r="6" fill="white" />
            <rect x="37" y="52" width="6" height="10" fill="white" />
          </g>

          {/* ── Bouclier SVG décoratif ── */}
          <g transform="translate(72, 20) scale(0.07)" opacity="0.06" fill="#1a2235">
            <path d="M40 5 L75 18 L75 45 Q75 70 40 80 Q5 70 5 45 L5 18 Z" />
            <path d="M25 42 L36 53 L57 32" stroke="white" strokeWidth="7" fill="none" strokeLinecap="round" />
          </g>
        </g>
      </svg>

      <style>{`
        @keyframes nodePulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
