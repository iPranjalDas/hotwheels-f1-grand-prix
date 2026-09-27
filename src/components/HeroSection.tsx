import React from 'react';
import { Vehicle } from '../data/vehicles';
import { HotWheelsCarSVG } from './HotWheelsCarSVG';
import { Zap, Play, ChevronDown, Sparkles, Shield, Gauge } from 'lucide-react';
import { engineAudio } from '../utils/engineAudio';

interface HeroSectionProps {
  activeVehicle: Vehicle;
  onLaunchCircuit: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  activeVehicle,
  onLaunchCircuit,
}) => {
  const handleIgniteRevs = () => {
    engineAudio.toggleMute();
    engineAudio.updateEngineSound(12500, 310, true);
  };

  return (
    <section 
      id="hero"
      aria-label="Hero Section"
      className="relative min-h-screen flex flex-col justify-center items-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-carbon-pattern"
    >
      {/* Background Radial Glow */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none opacity-25"
        style={{ backgroundColor: activeVehicle.accentColor || '#FF3E00' }}
      />

      {/* Top Tagline / Category Eyebrow */}
      <div className="z-10 flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700/80 mb-6 shadow-lg">
        <Sparkles size={14} className="text-[#FFD700]" />
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
          OFFICIAL DIECAST RACING LAB × FORMULA 1
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-ping" />
      </div>

      {/* Main Punchy Typography Thesis */}
      <div className="z-10 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black font-racing uppercase tracking-tight text-white leading-none">
          SPECTRAFLAME
          <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-[#FF3E00] via-[#FFD700] to-[#FF3E00]">
            GRAND PRIX
          </span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-400 font-sans max-w-2xl mx-auto leading-relaxed">
          The ultimate crossover of <strong className="text-white">Formula 1 aerodynamic ground-effect precision</strong> and <strong className="text-[#FF3E00]">Hot Wheels diecast adrenaline</strong>. Scroll to drive through live high-speed telemetry down the circuit.
        </p>
      </div>

      {/* Center Interactive Car Hero Stage */}
      <div className="z-10 mt-8 relative flex flex-col items-center">
        {/* Floating Car Stage Platform with Glow */}
        <div className="relative p-8 rounded-3xl bg-radial from-slate-800/40 via-transparent to-transparent flex items-center justify-center">
          <div className="hover:scale-105 transition-transform duration-300 cursor-pointer">
            <HotWheelsCarSVG 
              primaryColor={activeVehicle.accentColor || '#FF3E00'}
              accentColor={activeVehicle.spectraflameHex || '#FFD700'}
              speedKmh={290}
              drsActive={true}
              boostActive={true}
              bankingDeg={-6}
              scale={1.25}
            />
          </div>

          {/* Underglow Ground Effect Shadow */}
          <div 
            className="absolute bottom-6 w-48 h-8 rounded-full blur-md opacity-80"
            style={{ backgroundColor: activeVehicle.accentColor || '#FF3E00' }}
          />
        </div>

        {/* Selected Vehicle Badge */}
        <div className="mt-4 flex items-center gap-3 bg-[#0B0E14]/90 border border-slate-700/80 px-4 py-2 rounded-2xl shadow-xl">
          <img 
            src={activeVehicle.officialLogoUrl} 
            alt={activeVehicle.team} 
            className="h-6 w-auto max-w-[50px] object-contain"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="text-left">
            <div className="text-sm font-bold font-racing text-white">
              {activeVehicle.name}
            </div>
            <div className="text-[10px] font-mono text-slate-400 uppercase">
              {activeVehicle.series} • {activeVehicle.collectorNumber}
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Telemetry Spec Badges */}
      <div className="z-10 mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl w-full">
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-center">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-0.5">
            TOP VELOCITY
          </span>
          <span className="text-xl sm:text-2xl font-black font-racing text-[#FFD700]">
            {activeVehicle.topSpeedKmh} <span className="text-xs font-mono font-normal text-slate-400">KM/H</span>
          </span>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-center">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-0.5">
            0-100 ACCELERATION
          </span>
          <span className="text-xl sm:text-2xl font-black font-racing text-[#00FF66]">
            {activeVehicle.acceleration0to100}s
          </span>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-center">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-0.5">
            AERO DOWNFORCE
          </span>
          <span className="text-xl sm:text-2xl font-black font-racing text-[#00E5FF]">
            {activeVehicle.downforceKg} <span className="text-xs font-mono font-normal text-slate-400">KG</span>
          </span>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-center">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-0.5">
            HORSEPOWER
          </span>
          <span className="text-xl sm:text-2xl font-black font-racing text-[#FF3E00]">
            {activeVehicle.horsepower} <span className="text-xs font-mono font-normal text-slate-400">HP</span>
          </span>
        </div>
      </div>

      {/* Primary Action Buttons */}
      <div className="z-10 mt-8 flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={onLaunchCircuit}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF3E00] to-[#FF8500] hover:from-[#FF5500] hover:to-[#FFA000] text-white font-racing font-bold text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(255,62,0,0.5)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <Play size={16} className="fill-white" />
          <span>DRIVE THE CIRCUIT</span>
        </button>

        <button
          onClick={handleIgniteRevs}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 font-racing font-bold text-sm tracking-wider uppercase hover:border-[#FFD700] hover:text-[#FFD700] transition-all cursor-pointer"
        >
          <Zap size={16} className="text-[#FFD700]" />
          <span>FIRE TURBO REVS</span>
        </button>
      </div>

      {/* Scroll Down Prompt */}
      <div className="z-10 mt-12 flex flex-col items-center gap-2 text-slate-500 animate-bounce">
        <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400">
          SCROLL TO DRIVE CAR
        </span>
        <ChevronDown size={18} className="text-[#FF3E00]" />
      </div>
    </section>
  );
};
