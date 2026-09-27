import React, { useState } from 'react';
import { HotWheelsCarSVG } from './HotWheelsCarSVG';
import { Wrench, Sliders, Flame, Gauge, Sparkles, Volume2 } from 'lucide-react';
import { engineAudio } from '../utils/engineAudio';

interface DynoCustomizerProps {
  onApplyCustomization: (colors: { primary: string; accent: string; tireColor: string }) => void;
}

export const DynoLabCustomizer: React.FC<DynoCustomizerProps> = ({ onApplyCustomization }) => {
  const [selectedColor, setSelectedColor] = useState('#FF3E00');
  const [selectedAccent, setSelectedAccent] = useState('#FFD700');
  const [selectedTire, setSelectedTire] = useState('#E10600'); // Soft red
  const [aeroAngle, setAeroAngle] = useState(18); // Downforce wing degrees (5 to 35)
  const [isDynoTesting, setIsDynoTesting] = useState(false);
  const [dynoSpeed, setDynoSpeed] = useState(160);

  const spectraflameColors = [
    { name: 'Flame Orange', hex: '#FF3E00', accent: '#FFD700' },
    { name: 'Maranello Rosso', hex: '#E10600', accent: '#FFF200' },
    { name: 'Papaya Gold', hex: '#FF8000', accent: '#00E5FF' },
    { name: 'Silver Arrow', hex: '#CBD5E1', accent: '#00A19B' },
    { name: 'British Racing Green', hex: '#004225', accent: '#CEE83D' },
    { name: 'Acid Green', hex: '#39FF14', accent: '#0B0C10' },
    { name: 'Midnight Nitro', hex: '#6366F1', accent: '#EC4899' },
  ];

  const tireCompounds = [
    { name: 'Soft (C5)', code: 'RED', color: '#E10600', grip: '100% Grip', wear: 'Fast' },
    { name: 'Medium (C3)', code: 'YELLOW', color: '#FACC15', grip: '88% Grip', wear: 'Balanced' },
    { name: 'Hard (C1)', code: 'WHITE', color: '#FFFFFF', grip: '74% Grip', wear: 'Durable' },
    { name: 'Wet Inter', code: 'GREEN', color: '#00FF66', grip: '92% Wet', wear: 'Variable' },
  ];

  // Calculated dyno metrics based on aero slider
  // High aero = higher downforce, slightly lower top speed, higher cornering speed
  const calculatedTopSpeed = Math.round(390 - (aeroAngle - 5) * 1.8);
  const calculatedDownforce = Math.round(1800 + (aeroAngle - 5) * 45);

  const handleTestDyno = () => {
    setIsDynoTesting(true);
    engineAudio.init();
    engineAudio.toggleMute();
    
    // Rev curve
    let curSpeed = 160;
    const interval = setInterval(() => {
      curSpeed += 15;
      if (curSpeed >= calculatedTopSpeed) {
        curSpeed = calculatedTopSpeed;
        clearInterval(interval);
        setTimeout(() => {
          setIsDynoTesting(false);
          setDynoSpeed(160);
        }, 1200);
      }
      setDynoSpeed(curSpeed);
      engineAudio.updateEngineSound(7000 + (curSpeed / 390) * 8000, curSpeed, true);
    }, 60);
  };

  const handleApply = () => {
    onApplyCustomization({
      primary: selectedColor,
      accent: selectedAccent,
      tireColor: selectedTire,
    });
  };

  return (
    <section 
      id="dyno"
      aria-label="Dyno Lab"
      className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10"
    >
      <div className="flex items-center gap-2 text-[#00E5FF] font-mono text-xs font-bold tracking-widest uppercase mb-1">
        <Wrench size={14} /> DIECAST WORKSHOP & WIND TUNNEL
      </div>
      <h2 className="text-3xl sm:text-5xl font-black font-racing uppercase tracking-tight text-white mb-8">
        DYNO TUNING & SPECTRAFLAME LAB
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0C0F17]/95 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
        {/* Left: Interactive 3D/Vector Dyno Platform */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center p-8 bg-slate-950/80 rounded-2xl border border-slate-800 relative overflow-hidden">
          {/* Dyno Rollers Animation */}
          <div className="absolute inset-0 bg-carbon-pattern opacity-50" />
          
          <div className="relative z-10 flex flex-col items-center">
            <div className={`transition-transform duration-200 ${isDynoTesting ? 'scale-110' : ''}`}>
              <HotWheelsCarSVG 
                primaryColor={selectedColor}
                accentColor={selectedAccent}
                tireCompoundColor={selectedTire}
                speedKmh={isDynoTesting ? dynoSpeed : 160}
                drsActive={isDynoTesting && dynoSpeed > 300}
                boostActive={isDynoTesting}
                bankingDeg={0}
                scale={1.3}
              />
            </div>

            {/* Glowing Dyno Rollers under tires */}
            <div className="mt-4 flex gap-16">
              <div className="w-16 h-2 rounded-full bg-slate-700 animate-pulse" />
              <div className="w-16 h-2 rounded-full bg-slate-700 animate-pulse" />
            </div>

            {/* Dyno Readout */}
            <div className="mt-6 flex items-center gap-6 bg-slate-900/90 border border-slate-800 px-6 py-2 rounded-xl">
              <div>
                <span className="text-[9px] font-mono text-slate-400 uppercase block">SIMULATED VELOCITY</span>
                <span className="text-2xl font-black font-racing text-white">
                  {isDynoTesting ? dynoSpeed : calculatedTopSpeed} <span className="text-xs font-mono text-slate-400">KM/H</span>
                </span>
              </div>
              <div className="border-l border-slate-800 pl-6">
                <span className="text-[9px] font-mono text-slate-400 uppercase block">DOWNFORCE LOAD</span>
                <span className="text-2xl font-black font-racing text-[#00E5FF]">
                  {calculatedDownforce} <span className="text-xs font-mono text-slate-400">KG</span>
                </span>
              </div>
            </div>

            {/* Trigger Dyno Pull */}
            <button
              onClick={handleTestDyno}
              disabled={isDynoTesting}
              className="mt-6 flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#0077FF] hover:opacity-90 text-white font-racing font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(0,229,255,0.4)] cursor-pointer disabled:opacity-50"
            >
              <Volume2 size={14} />
              <span>{isDynoTesting ? 'DYNO RUNNING...' : 'START DYNO PULL'}</span>
            </button>
          </div>
        </div>

        {/* Right: Customization Controls */}
        <div className="lg:col-span-6 space-y-6">
          {/* Spectraflame Color Selector */}
          <div>
            <label className="text-xs font-mono font-bold uppercase text-slate-300 flex items-center gap-1.5 mb-3">
              <Sparkles size={14} className="text-[#FFD700]" />
              SPECTRAFLAME METALLIC LIVERY:
            </label>
            <div className="flex flex-wrap gap-2.5">
              {spectraflameColors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => {
                    setSelectedColor(color.hex);
                    setSelectedAccent(color.accent);
                  }}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                    selectedColor === color.hex
                      ? 'border-white bg-slate-800 text-white shadow-lg'
                      : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span 
                    className="w-3.5 h-3.5 rounded-full shadow-xs"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span>{color.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Pirelli Compound Selector */}
          <div>
            <label className="text-xs font-mono font-bold uppercase text-slate-300 flex items-center gap-1.5 mb-3">
              <Gauge size={14} className="text-[#FF3E00]" />
              PIRELLI TIRE COMPOUND:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {tireCompounds.map((tire) => (
                <button
                  key={tire.name}
                  onClick={() => setSelectedTire(tire.color)}
                  className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    selectedTire === tire.color
                      ? 'border-[#00FF66] bg-[#00FF66]/10 text-white'
                      : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span 
                    className="w-3 h-3 rounded-full mx-auto block mb-1"
                    style={{ backgroundColor: tire.color }}
                  />
                  <div className="text-xs font-bold font-racing text-white">{tire.name}</div>
                  <div className="text-[10px] font-mono text-slate-400">{tire.grip}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Wind Tunnel Aero Downforce Slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-mono font-bold uppercase text-slate-300 mb-2">
              <span className="flex items-center gap-1.5">
                <Sliders size={14} className="text-[#00FF66]" />
                REAR WING ANGLE OF ATTACK:
              </span>
              <span className="text-[#00FF66]">{aeroAngle}° ({aeroAngle > 22 ? 'HIGH DOWNFORCE' : 'LOW DRAG'})</span>
            </div>
            <input 
              type="range"
              min="5"
              max="35"
              value={aeroAngle}
              onChange={(e) => setAeroAngle(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#FF3E00]"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
              <span>5° (Max 390 KM/H Speed)</span>
              <span>35° (Max 3,150 KG Downforce)</span>
            </div>
          </div>

          {/* Apply to Track Car Button */}
          <div className="pt-2">
            <button
              onClick={handleApply}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF3E00] to-[#FF8500] hover:from-[#FF5500] hover:to-[#FFA000] text-white font-racing font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(255,62,0,0.4)] cursor-pointer"
            >
              APPLY CUSTOM SETUP TO CIRCUIT CAR
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
