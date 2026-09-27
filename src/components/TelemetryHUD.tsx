import React, { useState } from 'react';
import { Volume2, VolumeX, Gauge, Zap, Wind, Shield, ChevronRight } from 'lucide-react';
import { TelemetryState } from '../hooks/useScrollCarPhysics';
import { Vehicle } from '../data/vehicles';
import { engineAudio } from '../utils/engineAudio';

interface TelemetryHUDProps {
  telemetry: TelemetryState;
  activeVehicle: Vehicle;
}

export const TelemetryHUD: React.FC<TelemetryHUDProps> = ({ telemetry, activeVehicle }) => {
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [unit, setUnit] = useState<'kmh' | 'mph'>('kmh');

  const handleAudioToggle = () => {
    const unmuted = engineAudio.toggleMute();
    setIsAudioMuted(!unmuted);
  };

  // Sync engine sound with telemetry in effect or render
  React.useEffect(() => {
    engineAudio.updateEngineSound(telemetry.rpm, telemetry.speedKmh, telemetry.boostActive);
  }, [telemetry.rpm, telemetry.speedKmh, telemetry.boostActive]);

  const displaySpeed = unit === 'kmh' 
    ? telemetry.speedKmh 
    : Math.round(telemetry.speedKmh * 0.621371);

  // Sector computation
  let sector = 'SECTOR 1 - STRAIGHT';
  if (telemetry.progress > 0.66) sector = 'SECTOR 3 - ASCARI / PODIUM';
  else if (telemetry.progress > 0.33) sector = 'SECTOR 2 - 360° BOOSTER LOOP';

  // RPM LEDs (15 LEDs total: 5 Green, 5 Red, 5 Purple)
  const rpmPct = Math.min(Math.max((telemetry.rpm - 5000) / 9500, 0), 1);
  const activeLeds = Math.round(rpmPct * 15);

  return (
    <aside 
      aria-label="F1 Cockpit Telemetry HUD"
      className="fixed bottom-6 right-6 z-40 bg-[#0B0E14]/90 backdrop-blur-md border border-slate-700/60 rounded-2xl p-4 shadow-[0_16px_40px_rgba(0,0,0,0.85)] max-w-sm w-full transition-all duration-300 hover:border-[#FF3E00]/60"
    >
      {/* Top Header: Team & Status */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
        <div className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full animate-ping"
            style={{ backgroundColor: activeVehicle.accentColor || '#FF3E00' }}
          />
          <span className="text-xs font-bold font-racing uppercase tracking-wider text-slate-300 truncate max-w-[170px]">
            {activeVehicle.team}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Audio Engine Rev Toggle */}
          <button
            onClick={handleAudioToggle}
            className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition-colors cursor-pointer ${
              !isAudioMuted 
                ? 'bg-[#FF3E00]/20 border-[#FF3E00] text-[#FF3E00]' 
                : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white'
            }`}
            title="Toggle Formula 1 Hybrid V6 Engine Sound"
          >
            {!isAudioMuted ? <Volume2 size={14} className="animate-pulse" /> : <VolumeX size={14} />}
            <span className="text-[10px] font-mono uppercase font-bold">
              {!isAudioMuted ? 'REV ON' : 'AUDIO'}
            </span>
          </button>

          {/* Unit Toggle */}
          <button
            onClick={() => setUnit(unit === 'kmh' ? 'mph' : 'kmh')}
            className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer"
          >
            {unit.toUpperCase()}
          </button>
        </div>
      </div>

      {/* Main Gauges: Speedometer + Gear Display */}
      <div className="grid grid-cols-12 gap-3 items-center">
        {/* Speedometer */}
        <div className="col-span-7 flex flex-col">
          <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase flex items-center gap-1">
            <Gauge size={12} className="text-[#FF3E00]" /> VELOCITY
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-extrabold font-racing tracking-tight text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.3)]">
              {displaySpeed}
            </span>
            <span className="text-xs font-mono font-semibold text-slate-400">
              {unit === 'kmh' ? 'KM/H' : 'MPH'}
            </span>
          </div>
          {/* Speed Progress Bar */}
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mt-1">
            <div 
              className="h-full transition-all duration-100 ease-out"
              style={{
                width: `${Math.min((telemetry.speedKmh / 380) * 100, 100)}%`,
                background: telemetry.speedKmh > 300 
                  ? 'linear-gradient(90deg, #FFD700 0%, #FF3E00 100%)' 
                  : 'linear-gradient(90deg, #00E5FF 0%, #00FF66 100%)',
              }}
            />
          </div>
        </div>

        {/* Gear Indicator */}
        <div className="col-span-5 flex flex-col items-center justify-center bg-slate-900/90 border border-slate-800 rounded-xl py-1.5 px-3">
          <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400">
            GEAR
          </span>
          <span className="text-3xl font-black font-racing text-[#FFD700] drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]">
            {telemetry.gear}
          </span>
        </div>
      </div>

      {/* RPM Shift Lights Bar */}
      <div className="mt-3">
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
          <span>RPM {telemetry.rpm.toLocaleString()}</span>
          <span className="text-[9px] text-[#FF3E00] font-bold">15,000 MAX</span>
        </div>
        <div className="flex gap-1 h-2 bg-slate-900/90 p-0.5 rounded border border-slate-800">
          {Array.from({ length: 15 }).map((_, i) => {
            const isActive = i < activeLeds;
            let ledColor = 'bg-emerald-500 shadow-[0_0_6px_#10B981]';
            if (i >= 10) ledColor = 'bg-purple-500 shadow-[0_0_8px_#A855F7] animate-pulse';
            else if (i >= 5) ledColor = 'bg-rose-500 shadow-[0_0_6px_#F43F5E]';

            return (
              <div
                key={i}
                className={`flex-1 rounded-xs transition-colors duration-75 ${
                  isActive ? ledColor : 'bg-slate-800/80'
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Dynamic Indicators: DRS + Lateral G-Force + Boost */}
      <div className="grid grid-cols-3 gap-2 mt-3 pt-2 border-t border-slate-800/80">
        {/* DRS Beacon */}
        <div 
          className={`flex flex-col items-center justify-center py-1 rounded-lg border text-center transition-all ${
            telemetry.drsActive
              ? 'bg-[#00FF66]/20 border-[#00FF66] text-[#00FF66] shadow-[0_0_12px_rgba(0,255,102,0.3)] animate-pulse'
              : 'bg-slate-900/60 border-slate-800 text-slate-500'
          }`}
        >
          <Wind size={12} className={telemetry.drsActive ? 'animate-bounce' : ''} />
          <span className="text-[9px] font-bold font-mono tracking-tighter">
            DRS {telemetry.drsActive ? 'OPEN' : 'CLOSED'}
          </span>
        </div>

        {/* G-Force */}
        <div className="flex flex-col items-center justify-center py-1 rounded-lg border border-slate-800 bg-slate-900/60 text-slate-300">
          <Shield size={12} className="text-[#00E5FF]" />
          <span className="text-[9px] font-bold font-mono">
            {telemetry.gForce}G LAT
          </span>
        </div>

        {/* Nitro Booster */}
        <div 
          className={`flex flex-col items-center justify-center py-1 rounded-lg border text-center transition-all ${
            telemetry.boostActive
              ? 'bg-[#FF3E00]/25 border-[#FF3E00] text-[#FF3E00] shadow-[0_0_12px_rgba(255,62,0,0.4)] animate-pulse'
              : 'bg-slate-900/60 border-slate-800 text-slate-500'
          }`}
        >
          <Zap size={12} />
          <span className="text-[9px] font-bold font-mono">
            {telemetry.boostActive ? 'NITRO ON' : 'STANDBY'}
          </span>
        </div>
      </div>

      {/* Track Sector Breadcrumb */}
      <div className="mt-2.5 flex items-center justify-between text-[9px] font-mono text-slate-400 bg-black/40 px-2 py-1 rounded">
        <span className="flex items-center gap-1 text-slate-300">
          <ChevronRight size={10} className="text-[#FF3E00]" />
          {sector}
        </span>
        <span className="font-bold text-[#FFD700]">
          {Math.round(telemetry.progress * 100)}% LAP
        </span>
      </div>
    </aside>
  );
};
