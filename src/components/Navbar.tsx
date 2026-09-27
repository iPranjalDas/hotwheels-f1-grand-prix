import React, { useState, useEffect } from 'react';
import { Vehicle } from '../data/vehicles';
import { Timer, Zap, Trophy, Wrench, Flame, Menu, X } from 'lucide-react';

interface NavbarProps {
  activeVehicle: Vehicle;
  onSelectVehicle: (vehicle: Vehicle) => void;
  vehicles: Vehicle[];
}

export const Navbar: React.FC<NavbarProps> = ({
  activeVehicle,
  onSelectVehicle,
  vehicles,
}) => {
  const [lapTime, setLapTime] = useState(74.286);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Live racing lap timer simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLapTime((prev) => +(prev + 0.016).toFixed(3));
    }, 16);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatLapTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = (time % 60).toFixed(3).padStart(6, '0');
    return `${mins}:${secs}`;
  };

  const navLinks = [
    { label: 'CIRCUIT TRACK', href: '#track' },
    { label: 'PADDOCK DIECASTS', href: '#paddock' },
    { label: 'DYNO LAB', href: '#dyno' },
    { label: '360° LOOP', href: '#loop' },
    { label: 'STANDINGS', href: '#standings' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#08090C]/95 backdrop-blur-md border-b border-slate-800 shadow-xl py-2.5' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Lockup: Hot Wheels Flame × Formula 1 */}
        <a href="#" className="flex items-center gap-3 group">
          {/* Hot Wheels Flame Badge */}
          <div className="flex items-center bg-gradient-to-r from-[#FF3E00] to-[#FF8500] text-white px-2.5 py-1 rounded-lg font-black font-bebas text-lg tracking-wider shadow-[0_0_15px_rgba(255,62,0,0.5)] group-hover:scale-105 transition-transform">
            <Flame size={18} className="mr-1 fill-white" />
            <span>HOT WHEELS</span>
          </div>

          <span className="text-slate-500 font-racing font-bold text-sm">×</span>

          {/* F1 Grand Prix Typography */}
          <div className="flex items-center">
            <span className="font-racing font-black text-lg tracking-tighter text-white">
              F1<span className="text-[#E10600]">®</span>
            </span>
            <span className="hidden sm:inline-block ml-2 text-[10px] font-mono tracking-widest text-slate-400 uppercase border-l border-slate-700 pl-2">
              GRAND PRIX
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-racing font-bold tracking-wider text-slate-300 hover:text-[#FF3E00] transition-colors relative py-1 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF3E00] transition-all group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right Section: Active Paddock Selector & Live Lap Time */}
        <div className="hidden sm:flex items-center gap-4">
          {/* Live Lap Timer */}
          <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 px-3 py-1 rounded-xl">
            <Timer size={13} className="text-[#00FF66] animate-pulse" />
            <span className="text-[11px] font-mono font-bold text-[#00FF66] tracking-tight">
              {formatLapTime(lapTime)}
            </span>
          </div>

          {/* Constructor Selector Dropdown */}
          <div className="relative">
            <select
              value={activeVehicle.id}
              onChange={(e) => {
                const found = vehicles.find((v) => v.id === e.target.value);
                if (found) onSelectVehicle(found);
              }}
              className="bg-slate-900 border border-slate-700 hover:border-[#FF3E00] text-slate-200 text-xs font-mono font-bold rounded-xl px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#FF3E00] cursor-pointer"
            >
              {vehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.team} ({v.constructorCode})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0B0E14] border-b border-slate-800 px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-sm font-racing font-bold text-slate-300 hover:text-[#FF3E00]"
            >
              {link.label}
            </a>
          ))}

          <div className="pt-3 border-t border-slate-800">
            <label className="text-[10px] font-mono text-slate-400 block mb-1">
              SELECT CONSTRUCTOR:
            </label>
            <select
              value={activeVehicle.id}
              onChange={(e) => {
                const found = vehicles.find((v) => v.id === e.target.value);
                if (found) onSelectVehicle(found);
                setIsMobileMenuOpen(false);
              }}
              className="w-full bg-slate-900 border border-slate-700 text-slate-200 text-xs font-mono font-bold rounded-lg p-2"
            >
              {vehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.team}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </header>
  );
};
