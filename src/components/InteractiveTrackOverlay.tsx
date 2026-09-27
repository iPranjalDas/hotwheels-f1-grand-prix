import React, { useRef } from 'react';
import { HotWheelsCarSVG } from './HotWheelsCarSVG';
import { useScrollCarPhysics, TelemetryState } from '../hooks/useScrollCarPhysics';
import { Vehicle } from '../data/vehicles';
import { Flag, Compass } from 'lucide-react';

interface InteractiveTrackOverlayProps {
  activeVehicle: Vehicle;
  onTelemetryUpdate?: (telemetry: TelemetryState) => void;
}

export const InteractiveTrackOverlay: React.FC<InteractiveTrackOverlayProps> = ({
  activeVehicle,
  onTelemetryUpdate,
}) => {
  const pathRef = useRef<SVGPathElement | null>(null);
  const telemetry = useScrollCarPhysics(pathRef);

  // Bubble up telemetry to parent for HUD
  React.useEffect(() => {
    if (onTelemetryUpdate) {
      onTelemetryUpdate(telemetry);
    }
  }, [telemetry, onTelemetryUpdate]);

  // Track milestones
  const checkpoints = [
    { label: "GRID START", scrollYTarget: 0, pct: 0 },
    { label: "CURVA GRANDE", scrollYTarget: 0.28, pct: 28 },
    { label: "360° BOOSTER LOOP", scrollYTarget: 0.52, pct: 52 },
    { label: "ASCARI CHICANE", scrollYTarget: 0.76, pct: 76 },
    { label: "PODIUM FINISH", scrollYTarget: 1.0, pct: 100 },
  ];

  const handleJumpToCheckpoint = (pctTarget: number) => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: maxScroll * pctTarget,
      behavior: 'smooth',
    });
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-visible">
      {/* Fixed Mini Race Track Navigator on Left Screen */}
      <div className="fixed top-28 left-6 z-40 hidden lg:flex flex-col bg-[#0B0E14]/85 backdrop-blur-md border border-slate-800 rounded-2xl p-3 shadow-2xl pointer-events-auto">
        <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-slate-400 mb-2 border-b border-slate-800 pb-1.5">
          <Compass size={12} className="text-[#FF3E00]" />
          <span>CIRCUIT MINI-MAP</span>
        </div>

        {/* Vertical Track Progress Bar */}
        <div className="relative h-44 w-12 mx-auto flex justify-center py-2">
          {/* Orange Hot Wheels Track Lane */}
          <div className="w-2.5 h-full bg-slate-800 rounded-full overflow-hidden relative border border-slate-700">
            {/* Hot Wheels Track Center Groove */}
            <div 
              className="w-full bg-gradient-to-b from-[#FF3E00] via-[#FFD700] to-[#FF3E00] transition-all duration-75"
              style={{ height: `${telemetry.progress * 100}%` }}
            />
          </div>

          {/* Checkpoint Markers */}
          {checkpoints.map((cp, idx) => (
            <button
              key={idx}
              onClick={() => handleJumpToCheckpoint(cp.scrollYTarget)}
              className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border border-slate-600 bg-slate-900 hover:border-[#FF3E00] hover:scale-125 transition-all flex items-center justify-center cursor-pointer group"
              style={{ top: `${cp.scrollYTarget * 88 + 4}%` }}
              title={`Jump to ${cp.label}`}
            >
              <div 
                className={`w-1.5 h-1.5 rounded-full ${
                  telemetry.progress >= cp.scrollYTarget ? 'bg-[#FF3E00]' : 'bg-slate-500'
                }`}
              />
              {/* Tooltip on Hover */}
              <span className="absolute left-6 whitespace-nowrap bg-black/90 text-white font-racing text-[9px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-slate-700">
                {cp.label}
              </span>
            </button>
          ))}

          {/* Mini Car Indicator Dot */}
          <div 
            className="absolute left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#FFD700] shadow-[0_0_10px_#FFD700] border-2 border-white transition-all duration-75 pointer-events-none"
            style={{ top: `${telemetry.progress * 88 + 4}%` }}
          />
        </div>

        <div className="text-center mt-2 pt-1 border-t border-slate-800">
          <span className="text-[10px] font-mono text-[#00FF66] font-bold">
            {Math.round(telemetry.progress * 100)}% COMPLETE
          </span>
        </div>
      </div>

      {/* SVG Canvas Spanning Document for Full Track Path */}
      <svg 
        className="w-full h-full absolute inset-0 overflow-visible"
        preserveAspectRatio="none"
        viewBox="0 0 1000 4800"
      >
        <defs>
          {/* Double Orange Hot Wheels Track Glow */}
          <filter id="trackNeonGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#FF3E00" floodOpacity="0.8" />
            <feDropShadow dx="0" dy="0" stdDeviation="14" floodColor="#FF8500" floodOpacity="0.5" />
          </filter>

          {/* Asphalt Texture */}
          <linearGradient id="asphaltGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF3E00" />
            <stop offset="6%" stopColor="#1E232E" />
            <stop offset="50%" stopColor="#12151C" />
            <stop offset="94%" stopColor="#1E232E" />
            <stop offset="100%" stopColor="#FF3E00" />
          </linearGradient>

          {/* Chequered Curb Pattern */}
          <pattern id="curbRedWhite" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect width="10" height="20" fill="#E10600" />
            <rect x="10" width="10" height="20" fill="#FFFFFF" />
          </pattern>
        </defs>

        {/* 
          GRAND PRIX RACE TRACK VECTOR PATH:
          Starts at top center (500, 180), swoops left into Turn 1 (220, 900),
          banks right through high-speed curves (780, 1800),
          enters the 360° Booster Loop zone (500, 2700),
          carves the Ascari Chicane (250, 3600),
          and powers down the final straight to Podium (500, 4650).
        */}
        <path
          ref={pathRef}
          id="grand-prix-track-path"
          d="M 500 180 
             C 500 450, 220 650, 200 950
             C 180 1250, 400 1500, 680 1700
             C 860 1850, 880 2200, 750 2500
             C 620 2800, 340 2950, 320 3300
             C 300 3650, 720 3800, 680 4150
             C 640 4400, 500 4500, 500 4720"
          fill="none"
          stroke="transparent"
          strokeWidth="1"
        />

        {/* Visual Wide Track Asphalt Bed */}
        <path
          d="M 500 180 
             C 500 450, 220 650, 200 950
             C 180 1250, 400 1500, 680 1700
             C 860 1850, 880 2200, 750 2500
             C 620 2800, 340 2950, 320 3300
             C 300 3650, 720 3800, 680 4150
             C 640 4400, 500 4500, 500 4720"
          fill="none"
          stroke="url(#asphaltGrad)"
          strokeWidth="74"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.85"
        />

        {/* Hot Wheels Signature Twin Orange Guide Rails */}
        <path
          d="M 500 180 
             C 500 450, 220 650, 200 950
             C 180 1250, 400 1500, 680 1700
             C 860 1850, 880 2200, 750 2500
             C 620 2800, 340 2950, 320 3300
             C 300 3650, 720 3800, 680 4150
             C 640 4400, 500 4500, 500 4720"
          fill="none"
          stroke="#FF3E00"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#trackNeonGlow)"
        />

        {/* Center Dashed Speedguide Lane */}
        <path
          d="M 500 180 
             C 500 450, 220 650, 200 950
             C 180 1250, 400 1500, 680 1700
             C 860 1850, 880 2200, 750 2500
             C 620 2800, 340 2950, 320 3300
             C 300 3650, 720 3800, 680 4150
             C 640 4400, 500 4500, 500 4720"
          fill="none"
          stroke="#FFD700"
          strokeWidth="2.5"
          strokeDasharray="14 18"
          opacity="0.75"
        />

        {/* Start Line Chequered Grid */}
        <line x1="450" y1="180" x2="550" y2="180" stroke="#FFF" strokeWidth="8" strokeDasharray="10 10" />

        {/* Finish Line Chequered Grid */}
        <line x1="450" y1="4720" x2="550" y2="4720" stroke="#FFF" strokeWidth="8" strokeDasharray="10 10" />
      </svg>

      {/* 
        THE MOVING HOT WHEELS CAR ON TRACK:
        Smoothly positioned along the track path coordinates (carX, carY)
        with rotation (headingDeg + 90 for proper front orientation)
      */}
      <div 
        className="absolute z-30 transition-transform duration-75 ease-out will-change-transform"
        style={{
          left: `${(telemetry.carX / 1000) * 100}%`,
          top: `${telemetry.carY}px`,
          transform: `translate(-50%, -50%) rotate(${telemetry.headingDeg + 90}deg)`,
        }}
      >
        <HotWheelsCarSVG 
          primaryColor={activeVehicle.accentColor || '#FF3E00'}
          accentColor={activeVehicle.spectraflameHex || '#FFD700'}
          speedKmh={telemetry.speedKmh}
          drsActive={telemetry.drsActive}
          boostActive={telemetry.boostActive}
          bankingDeg={telemetry.bankingDeg}
          scale={0.95}
        />
      </div>
    </div>
  );
};
