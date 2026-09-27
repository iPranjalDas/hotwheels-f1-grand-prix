import React, { useRef, useEffect } from 'react';

interface HotWheelsCarProps {
  primaryColor?: string;
  accentColor?: string;
  speedKmh: number;
  drsActive: boolean;
  boostActive: boolean;
  bankingDeg: number;
  tireCompoundColor?: string; // red, yellow, white, green
  scale?: number;
  showSparks?: boolean;
}

export const HotWheelsCarSVG: React.FC<HotWheelsCarProps> = ({
  primaryColor = '#FF3E00',
  accentColor = '#FFD700',
  speedKmh = 140,
  drsActive = false,
  boostActive = false,
  bankingDeg = 0,
  tireCompoundColor = '#E10600', // Default Soft red
  scale = 1,
  showSparks = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Array<{ x: number; y: number; vx: number; vy: number; life: number; color: string; size: number }>>([]);

  // Particle sparks and smoke simulation on HTML5 Canvas
  useEffect(() => {
    if (!showSparks) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const isHighSpeed = speedKmh > 260 || boostActive;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn particles behind rear tires and exhaust
      if (isHighSpeed) {
        for (let i = 0; i < (boostActive ? 5 : 2); i++) {
          particlesRef.current.push({
            x: 40 + (Math.random() - 0.5) * 20,
            y: 110 + Math.random() * 10,
            vx: (Math.random() - 0.5) * 3,
            vy: 4 + Math.random() * 6,
            life: 1.0,
            color: Math.random() > 0.4 ? '#FFD700' : '#FF4500',
            size: 2 + Math.random() * 3,
          });
        }
      }

      // Update and draw particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.04;
        p.size *= 0.95;

        if (p.life <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
      }

      ctx.globalAlpha = 1.0;
      ctx.shadowBlur = 0;
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [speedKmh, boostActive, showSparks]);

  return (
    <div 
      className="relative select-none pointer-events-none transition-transform duration-100 ease-out"
      style={{
        transform: `perspective(700px) rotateY(${bankingDeg * 0.9}deg) rotateZ(${bankingDeg * 0.4}deg) scale(${scale})`,
        transformOrigin: 'center center',
      }}
    >
      {/* Particle Canvas for Sparks & Smoke */}
      <canvas 
        ref={canvasRef} 
        width={160} 
        height={180} 
        className="absolute top-10 left-1/2 -translate-x-1/2 z-0 pointer-events-none"
      />

      {/* High-Definition Vector SVG Race Car (Formula 1 x Hot Wheels Hybrid) */}
      <svg
        viewBox="0 0 160 220"
        className="w-36 h-48 drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)] z-10 relative overflow-visible"
      >
        <defs>
          {/* Carbon Fiber pattern */}
          <pattern id="carbonF1" width="6" height="6" patternUnits="userSpaceOnUse">
            <rect width="6" height="6" fill="#11141A" />
            <path d="M 0 0 L 3 3 M 3 0 L 0 3 M 3 3 L 6 6 M 6 3 L 3 6" stroke="#222834" strokeWidth="1" />
          </pattern>

          {/* Car body gradient */}
          <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={primaryColor} />
            <stop offset="60%" stopColor={primaryColor} />
            <stop offset="100%" stopColor="#0B0C10" />
          </linearGradient>

          {/* Hot Wheels Flame Gradient */}
          <linearGradient id="hwFlameGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#FFF200" />
            <stop offset="60%" stopColor="#FF3E00" />
            <stop offset="100%" stopColor="#990000" />
          </linearGradient>

          {/* Titanium Chrome Exhaust */}
          <linearGradient id="chromeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8899A6" />
            <stop offset="40%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>

          {/* Tire Tread texture */}
          <linearGradient id="tireGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0F1115" />
            <stop offset="50%" stopColor="#252A34" />
            <stop offset="100%" stopColor="#0F1115" />
          </linearGradient>
        </defs>

        {/* ================= REAR WING ASSEMBLY ================= */}
        {/* Rear Wing Endplates */}
        <path d="M 24 165 L 34 165 L 34 205 L 24 205 Z" fill="#0A0C10" stroke="#333" strokeWidth="1" />
        <path d="M 126 165 L 136 165 L 136 205 L 126 205 Z" fill="#0A0C10" stroke="#333" strokeWidth="1" />

        {/* Rear Wing Lower Mainplane */}
        <rect x="28" y="186" width="104" height="12" rx="3" fill="url(#carbonF1)" stroke={accentColor} strokeWidth="1.5" />

        {/* DRS Actuator Wing Flap (Opens when DRS active!) */}
        <g 
          className="transition-transform duration-200 ease-out origin-center"
          style={{
            transform: drsActive ? 'translateY(-7px) scaleY(0.55)' : 'translateY(0)',
          }}
        >
          <rect x="30" y="174" width="100" height="9" rx="2" fill={primaryColor} stroke="#FFF" strokeWidth="1" />
          {/* DRS Logo / Stripe */}
          <rect x="68" y="176" width="24" height="5" rx="1" fill={drsActive ? '#00FF66' : '#FFD700'} />
          <text x="80" y="180.5" fill="#000" fontSize="4" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            {drsActive ? 'DRS' : 'HW-F1'}
          </text>
        </g>

        {/* Rear Diffuser Venturi Strakes */}
        <path d="M 52 198 L 56 214 L 62 214 L 58 198 Z" fill="#181B22" />
        <path d="M 76 198 L 77 215 L 83 215 L 84 198 Z" fill="#181B22" />
        <path d="M 98 198 L 94 214 L 100 214 L 104 198 Z" fill="#181B22" />
        {/* FIA Rain Light / Hot Wheels Beacon */}
        <rect x="76" y="206" width="8" height="6" rx="1" fill="#FF0000" className={speedKmh > 240 ? "animate-pulse" : ""} />

        {/* ================= WHEELS & TIRES (PIRELLI x REAL RIDERS) ================= */}
        {/* Left Front Tire */}
        <g>
          <rect x="8" y="32" width="20" height="42" rx="5" fill="url(#tireGrad)" stroke="#111" strokeWidth="1" />
          {/* Soft/Medium/Hard compound ring */}
          <rect x="11" y="35" width="3" height="36" rx="1" fill={tireCompoundColor} />
          {/* Rim spokes */}
          <circle cx="18" cy="53" r="7" fill="#1A1F2B" stroke="#4B5563" strokeWidth="1.5" />
          <circle cx="18" cy="53" r="3" fill="#D1D5DB" />
        </g>

        {/* Right Front Tire */}
        <g>
          <rect x="132" y="32" width="20" height="42" rx="5" fill="url(#tireGrad)" stroke="#111" strokeWidth="1" />
          <rect x="146" y="35" width="3" height="36" rx="1" fill={tireCompoundColor} />
          <circle cx="142" cy="53" r="7" fill="#1A1F2B" stroke="#4B5563" strokeWidth="1.5" />
          <circle cx="142" cy="53" r="3" fill="#D1D5DB" />
        </g>

        {/* Left Rear Tire (Wider) */}
        <g>
          <rect x="4" y="145" width="26" height="50" rx="6" fill="url(#tireGrad)" stroke="#111" strokeWidth="1" />
          <rect x="7" y="148" width="4" height="44" rx="1" fill={tireCompoundColor} />
          <circle cx="17" cy="170" r="9" fill="#1A1F2B" stroke="#4B5563" strokeWidth="2" />
          <circle cx="17" cy="170" r="4" fill="#D1D5DB" />
        </g>

        {/* Right Rear Tire (Wider) */}
        <g>
          <rect x="130" y="145" width="26" height="50" rx="6" fill="url(#tireGrad)" stroke="#111" strokeWidth="1" />
          <rect x="149" y="148" width="4" height="44" rx="1" fill={tireCompoundColor} />
          <circle cx="143" cy="170" r="9" fill="#1A1F2B" stroke="#4B5563" strokeWidth="2" />
          <circle cx="143" cy="170" r="4" fill="#D1D5DB" />
        </g>

        {/* Front Suspension Wishbones (Carbon pushrod) */}
        <line x1="28" y1="46" x2="62" y2="58" stroke="#374151" strokeWidth="2.5" />
        <line x1="28" y1="60" x2="60" y2="68" stroke="#374151" strokeWidth="2.5" />
        <line x1="132" y1="46" x2="98" y2="58" stroke="#374151" strokeWidth="2.5" />
        <line x1="132" y1="60" x2="100" y2="68" stroke="#374151" strokeWidth="2.5" />

        {/* Rear Suspension Wishbones */}
        <line x1="30" y1="165" x2="55" y2="168" stroke="#374151" strokeWidth="3" />
        <line x1="130" y1="165" x2="105" y2="168" stroke="#374151" strokeWidth="3" />

        {/* ================= AERODYNAMIC CHASSIS MONOCOQUE ================= */}
        {/* Floor Plank Edge Underbody */}
        <path d="M 38 78 L 122 78 L 118 175 L 42 175 Z" fill="#0D0F14" stroke="#1F2937" strokeWidth="1.5" />

        {/* Main Aerodynamic Monocoque Bodywork */}
        <path
          d="M 80 8 
             C 85 8, 88 28, 92 48 
             C 95 62, 102 78, 112 92
             C 120 104, 122 135, 116 160
             C 112 175, 102 184, 80 184
             C 58 184, 48 175, 44 160
             C 38 135, 40 104, 48 92
             C 58 78, 65 62, 68 48
             C 72 28, 75 8, 80 8 Z"
          fill="url(#bodyGrad)"
          stroke="#1F2430"
          strokeWidth="1.5"
        />

        {/* Hot Wheels Flame Center Stripe */}
        <path
          d="M 80 14
             C 83 28, 86 50, 86 78
             C 86 92, 88 115, 84 135
             L 80 148
             L 76 135
             C 72 115, 74 92, 74 78
             C 74 50, 77 28, 80 14 Z"
          fill="url(#hwFlameGrad)"
        />

        {/* Sidepod Air Inlets (Downforce tunnels) */}
        <path d="M 52 88 C 50 96, 52 118, 54 130 L 46 126 C 44 112, 44 96, 48 88 Z" fill="#0A0C10" />
        <path d="M 108 88 C 110 96, 108 118, 106 130 L 114 126 C 116 112, 116 96, 112 88 Z" fill="#0A0C10" />

        {/* Exposed Hot Wheels Twin Chrome Turbines */}
        <g>
          {/* Left turbine stack */}
          <rect x="48" y="132" width="8" height="14" rx="2" fill="url(#chromeGrad)" stroke="#111" strokeWidth="0.8" />
          <circle cx="52" cy="132" r="3" fill="#111" />
          {/* Right turbine stack */}
          <rect x="104" y="132" width="8" height="14" rx="2" fill="url(#chromeGrad)" stroke="#111" strokeWidth="0.8" />
          <circle cx="108" cy="132" r="3" fill="#111" />
        </g>

        {/* Nitro Exhaust Flame Jet (Fires when accelerating or boosting!) */}
        {(boostActive || speedKmh > 290) && (
          <g className="animate-pulse">
            <path d="M 50 146 Q 52 165, 52 175 Q 52 165, 54 146 Z" fill="url(#hwFlameGrad)" />
            <path d="M 106 146 Q 108 165, 108 175 Q 108 165, 110 146 Z" fill="url(#hwFlameGrad)" />
          </g>
        )}

        {/* Cockpit Opening & Carbon Halo Ring */}
        <ellipse cx="80" cy="102" rx="13" ry="24" fill="#07080A" stroke="#222" strokeWidth="1" />
        {/* Halo Cockpit Protection Structure */}
        <path 
          d="M 80 84 L 80 94 M 71 108 C 73 98, 77 92, 80 92 C 83 92, 87 98, 89 108" 
          stroke="#1E232F" 
          strokeWidth="3.5" 
          strokeLinecap="round" 
          fill="none" 
        />
        {/* Glowing Halo LED strip */}
        <path 
          d="M 72 106 C 74 99, 77 94, 80 94 C 83 94, 86 99, 88 106" 
          stroke={accentColor} 
          strokeWidth="1.2" 
          fill="none" 
        />

        {/* Driver Helmet (Gold Visor) */}
        <circle cx="80" cy="106" r="6" fill="#111" />
        <ellipse cx="80" cy="105" rx="4.5" ry="2.5" fill="#FFD700" />

        {/* Airbox Camera / Engine Scoop */}
        <polygon points="76,122 84,122 82,132 78,132" fill="#161922" stroke="#333" strokeWidth="1" />
        <rect x="79" y="122" width="2" height="4" fill="#E10600" />

        {/* Engine Shark Fin dorsal spine */}
        <line x1="80" y1="134" x2="80" y2="170" stroke="#0D0F14" strokeWidth="2.5" />
        <line x1="80" y1="134" x2="80" y2="170" stroke={accentColor} strokeWidth="1" strokeDasharray="3 2" />

        {/* ================= FRONT WING ASSEMBLY ================= */}
        {/* Front Wing Cascades */}
        <path
          d="M 16 18 
             C 45 10, 75 14, 80 16 
             C 85 14, 115 10, 144 18 
             L 142 28 
             C 115 22, 85 24, 80 26 
             C 75 24, 45 22, 18 28 Z"
          fill="url(#carbonF1)"
          stroke={primaryColor}
          strokeWidth="1.5"
        />
        {/* Front Wing Flap 2 */}
        <path
          d="M 22 22 
             C 48 16, 75 18, 80 20 
             C 85 18, 112 16, 138 22 
             L 136 26 
             C 112 21, 85 23, 80 24 
             C 75 23, 48 21, 24 26 Z"
          fill={accentColor}
        />
        {/* Front Wing Endplates */}
        <rect x="14" y="12" width="4" height="24" rx="1.5" fill="#0B0C10" stroke={primaryColor} strokeWidth="1" />
        <rect x="142" y="12" width="4" height="24" rx="1.5" fill="#0B0C10" stroke={primaryColor} strokeWidth="1" />
        {/* Nose Cone Tip */}
        <ellipse cx="80" cy="14" rx="6" ry="7" fill={primaryColor} stroke="#FFF" strokeWidth="0.8" />
        <text x="80" y="16" fill="#FFF" fontSize="4.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
          1
        </text>
      </svg>
    </div>
  );
};
