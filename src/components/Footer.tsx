import React from 'react';
import { Flame, ShieldCheck, Cpu, Terminal, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#06070A] border-t border-slate-800 text-slate-400 py-16 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand identity */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center bg-gradient-to-r from-[#FF3E00] to-[#FF8500] text-white px-3 py-1 rounded-lg font-black font-bebas text-lg tracking-wider">
              <Flame size={18} className="mr-1 fill-white" />
              HOT WHEELS
            </div>
            <span className="text-slate-600 font-bold">×</span>
            <div className="font-racing font-black text-xl text-white tracking-tighter">
              FORMULA 1<span className="text-[#E10600]">®</span>
            </div>
          </div>
          <p className="text-xs text-slate-500 max-w-md">
            Diecast Precision Engineering × Formula 1 Grand Prix Aerodynamics. Real constructor telemetry, vector-physics scroll car tracking, and synthesized V6 hybrid audio.
          </p>
        </div>

        {/* Engineering Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] font-mono">
          <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-xl">
            <Cpu size={12} className="text-[#00E5FF]" />
            <span>60FPS SVG PATH LERP</span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-xl">
            <Terminal size={12} className="text-[#00FF66]" />
            <span>WEB AUDIO V6 SYNTH</span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-xl">
            <ShieldCheck size={12} className="text-[#FFD700]" />
            <span>DRIVE D VERIFIED</span>
          </div>
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="p-3 rounded-2xl bg-slate-900 hover:bg-[#FF3E00] text-slate-300 hover:text-white border border-slate-800 hover:border-[#FF3E00] transition-all cursor-pointer shadow-lg group"
          title="Back to Starting Grid"
        >
          <ArrowUp size={18} className="group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>

      <div className="mt-12 pt-6 border-t border-slate-900 text-center text-[10px] font-mono text-slate-600">
        © 2024–2026 Hot Wheels × Formula 1 Grand Prix Collector Experience. All constructor trademarks and vehicle profiles are properties of their respective racing teams and Mattel.
      </div>
    </footer>
  );
};
