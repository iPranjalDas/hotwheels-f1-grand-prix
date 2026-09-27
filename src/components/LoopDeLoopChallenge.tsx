import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Zap, Trophy, RotateCcw, AlertTriangle, Flame } from 'lucide-react';
import { HotWheelsCarSVG } from './HotWheelsCarSVG';
import { Vehicle } from '../data/vehicles';
import { engineAudio } from '../utils/engineAudio';

interface LoopProps {
  activeVehicle: Vehicle;
}

export const LoopDeLoopChallenge: React.FC<LoopProps> = ({ activeVehicle }) => {
  const [chargeSpeed, setChargeSpeed] = useState(220);
  const [isLaunching, setIsLaunching] = useState(false);
  const [loopAngle, setLoopAngle] = useState(0);
  const [result, setResult] = useState<'idle' | 'cleared' | 'stalled'>('idle');

  const handleCharge = () => {
    if (isLaunching) return;
    setChargeSpeed((prev) => Math.min(prev + 25, 380));
  };

  const handleReset = () => {
    setChargeSpeed(220);
    setLoopAngle(0);
    setResult('idle');
    setIsLaunching(false);
  };

  const handleLaunch = () => {
    if (isLaunching) return;
    setIsLaunching(true);
    setResult('idle');
    engineAudio.init();
    engineAudio.updateEngineSound(chargeSpeed * 35, chargeSpeed, true);

    const willClear = chargeSpeed >= 280;
    const duration = 2200; // ms
    const startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);

      if (willClear) {
        // Full 360 rotation
        setLoopAngle(progress * 360);
      } else {
        // Stall at apex (160 deg) and fall back
        if (progress < 0.5) {
          setLoopAngle(progress * 2 * 160);
        } else {
          setLoopAngle(160 - (progress - 0.5) * 2 * 160);
        }
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsLaunching(false);
        if (willClear) {
          setResult('cleared');
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#FF3E00', '#FFD700', '#00FF66', '#00E5FF'],
          });
        } else {
          setResult('stalled');
        }
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <section 
      id="loop"
      aria-label="360 Loop Challenge"
      className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10"
    >
      <div className="flex items-center gap-2 text-[#FF3E00] font-mono text-xs font-bold tracking-widest uppercase mb-1">
        <Flame size={14} /> CENTRIFUGAL GRAVITY TEST
      </div>
      <h2 className="text-3xl sm:text-5xl font-black font-racing uppercase tracking-tight text-white mb-2">
        SPECTRAFLAME 360° BOOSTER LOOP
      </h2>
      <p className="text-sm text-slate-400 max-w-2xl mb-8">
        Hot Wheels legendary vertical orange booster track meets Formula 1 ground-effect downforce. You need at least <strong className="text-[#FFD700]">280 KM/H</strong> entry speed to generate sufficient inverted downforce to clear the apex!
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0C0F17]/95 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
        {/* Left: Interactive 360° Orange Loop Stage */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-8 bg-slate-950 rounded-2xl border border-slate-800 relative min-h-[420px] overflow-hidden">
          {/* SVG 360° Hot Wheels Orange Loop */}
          <div className="relative w-72 h-72 flex items-center justify-center">
            {/* Outer Orange Loop Track Ring */}
            <div className="absolute inset-0 rounded-full border-12 border-[#FF3E00] shadow-[0_0_30px_rgba(255,62,0,0.6)]" />
            <div className="absolute inset-2 rounded-full border-2 border-dashed border-[#FFD700]/70" />
            <div className="absolute inset-4 rounded-full border-4 border-slate-800" />

            {/* Loop Apex Sensor Beacon */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 bg-[#00FF66] text-black font-mono font-bold text-[9px] px-2 py-0.5 rounded shadow-[0_0_10px_#00FF66]">
              APEX: 4.8G
            </div>

            {/* Inverted Car revolving around loop center */}
            <div 
              className="absolute w-full h-full flex items-center justify-center transition-transform duration-75"
              style={{
                transform: `rotate(${loopAngle}deg)`,
              }}
            >
              <div 
                className="absolute"
                style={{
                  top: '10px',
                  transform: 'scale(0.85) rotate(-90deg)',
                }}
              >
                <HotWheelsCarSVG 
                  primaryColor={activeVehicle.accentColor || '#FF3E00'}
                  accentColor={activeVehicle.spectraflameHex || '#FFD700'}
                  speedKmh={chargeSpeed}
                  drsActive={chargeSpeed > 290}
                  boostActive={isLaunching}
                  bankingDeg={0}
                  scale={0.9}
                />
              </div>
            </div>

            {/* Center Speed Readout */}
            <div className="z-10 text-center bg-slate-900/90 border border-slate-800 p-4 rounded-full w-32 h-32 flex flex-col items-center justify-center shadow-inner">
              <span className="text-[9px] font-mono text-slate-400 uppercase">SPEED</span>
              <span className="text-2xl font-black font-racing text-white">
                {chargeSpeed}
              </span>
              <span className="text-[10px] font-mono text-slate-400">KM/H</span>
            </div>
          </div>

          {/* Result Alert Banner */}
          {result === 'cleared' && (
            <div className="mt-6 flex items-center gap-2 bg-[#00FF66]/20 border border-[#00FF66] text-[#00FF66] px-4 py-2 rounded-xl text-xs font-racing font-bold tracking-wider animate-bounce">
              <Trophy size={16} /> 360° LOOP CLEARED! GRAND PRIX PODIUM UNLOCKED!
            </div>
          )}

          {result === 'stalled' && (
            <div className="mt-6 flex items-center gap-2 bg-[#E10600]/20 border border-[#E10600] text-[#E10600] px-4 py-2 rounded-xl text-xs font-racing font-bold tracking-wider animate-shake">
              <AlertTriangle size={16} /> STALLED AT APEX! Charge to 280+ KM/H to beat gravity!
            </div>
          )}
        </div>

        {/* Right: Booster Controls */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase block mb-1">
              NITRO BOOSTER PRESSURE:
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black font-racing text-[#FFD700]">
                {chargeSpeed}
              </span>
              <span className="text-sm font-mono text-slate-400">KM/H</span>
            </div>

            {/* Charge Meter */}
            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden mt-3 p-0.5 border border-slate-700">
              <div 
                className="h-full rounded-full transition-all duration-150"
                style={{
                  width: `${Math.min(((chargeSpeed - 180) / 200) * 100, 100)}%`,
                  background: chargeSpeed >= 280 
                    ? 'linear-gradient(90deg, #FFD700 0%, #00FF66 100%)' 
                    : 'linear-gradient(90deg, #FF3E00 0%, #FF8500 100%)',
                }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1.5">
              <span>Min: 220 km/h</span>
              <span className="text-[#00FF66] font-bold">Escape Velocity: 280+ km/h</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleCharge}
              disabled={isLaunching}
              className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-[#FFD700] text-slate-200 font-racing font-bold text-xs uppercase flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
            >
              <Zap size={14} className="text-[#FFD700]" />
              <span>CHARGE (+25)</span>
            </button>

            <button
              onClick={handleReset}
              disabled={isLaunching}
              className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-white font-racing font-bold text-xs uppercase flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
            >
              <RotateCcw size={14} />
              <span>RESET</span>
            </button>
          </div>

          <button
            onClick={handleLaunch}
            disabled={isLaunching}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-[#FF3E00] via-[#FF8500] to-[#FFD700] hover:opacity-95 text-white font-racing font-black text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(255,62,0,0.5)] cursor-pointer transition-all disabled:opacity-50"
          >
            {isLaunching ? 'LAUNCHING LOOP SPEED RUN...' : 'LAUNCH THROUGH 360° LOOP!'}
          </button>
        </div>
      </div>
    </section>
  );
};
