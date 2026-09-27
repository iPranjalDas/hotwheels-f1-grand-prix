import React, { useState } from 'react';
import { Vehicle } from '../data/vehicles';
import { Check, Flame, Gauge, Zap, Volume2, Info, ArrowUpRight } from 'lucide-react';
import { engineAudio } from '../utils/engineAudio';

interface VehicleShowcaseProps {
  vehicles: Vehicle[];
  activeVehicle: Vehicle;
  onSelectVehicle: (vehicle: Vehicle) => void;
}

export const VehicleShowcase: React.FC<VehicleShowcaseProps> = ({
  vehicles,
  activeVehicle,
  onSelectVehicle,
}) => {
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [modalVehicle, setModalVehicle] = useState<Vehicle | null>(null);

  const filterTabs = ['ALL', 'SPECTRAFLAME', 'SPEED MACHINES', 'REAL RIDERS', 'HERITAGE'];

  const filteredVehicles = vehicles.filter((v) => {
    if (selectedFilter === 'ALL') return true;
    if (selectedFilter === 'SPECTRAFLAME') return v.series.toLowerCase().includes('spectraflame');
    if (selectedFilter === 'SPEED MACHINES') return v.series.toLowerCase().includes('speed machines') || v.series.toLowerCase().includes('track');
    if (selectedFilter === 'REAL RIDERS') return v.series.toLowerCase().includes('real riders');
    if (selectedFilter === 'HERITAGE') return v.series.toLowerCase().includes('heritage') || v.series.toLowerCase().includes('classics');
    return true;
  });

  const handleAudioRev = (e: React.MouseEvent, v: Vehicle) => {
    e.stopPropagation();
    engineAudio.init();
    engineAudio.updateEngineSound(v.audioFreqBase * 38, v.topSpeedKmh, true);
  };

  return (
    <section 
      id="paddock"
      aria-label="Paddock Diecasts"
      className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-[#FF3E00] font-mono text-xs font-bold tracking-widest uppercase mb-1">
            <Flame size={14} /> OFFICIAL 2024 CONSTRUCTOR PADDOCK
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-racing uppercase tracking-tight text-white">
            DIECAST SPEED MACHINES
          </h2>
          <p className="mt-2 text-sm text-slate-400 max-w-xl">
            Ten official Formula 1 constructor chassis re-engineered with legendary Hot Wheels castings, ground-effect aero, and 1:64 collector diecast specifications.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="mt-6 md:mt-0 flex flex-wrap gap-2">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                selectedFilter === tab
                  ? 'bg-[#FF3E00] text-white shadow-[0_0_12px_rgba(255,62,0,0.4)]'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of 10 Collector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVehicles.map((vehicle) => {
          const isActive = activeVehicle.id === vehicle.id;

          return (
            <div
              key={vehicle.id}
              className={`group relative rounded-2xl bg-[#0C0F17]/90 border transition-all duration-300 overflow-hidden flex flex-col justify-between ${
                isActive
                  ? 'border-[#FF3E00] shadow-[0_0_25px_rgba(255,62,0,0.25)] ring-1 ring-[#FF3E00]'
                  : 'border-slate-800 hover:border-slate-600 hover:shadow-xl'
              }`}
            >
              {/* Top Banner: Constructor Logo + Collector Number */}
              <div className="p-4 flex items-center justify-between border-b border-slate-800/80 bg-slate-900/50">
                <div className="flex items-center gap-2.5">
                  <img
                    src={vehicle.officialLogoUrl}
                    alt={vehicle.team}
                    className="h-6 w-auto max-w-[45px] object-contain"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <span className="text-xs font-bold font-racing uppercase tracking-wider text-slate-200">
                    {vehicle.team}
                  </span>
                </div>

                <span className="text-[10px] font-mono text-[#FFD700] bg-[#FFD700]/10 border border-[#FFD700]/30 px-2 py-0.5 rounded font-bold">
                  {vehicle.collectorNumber}
                </span>
              </div>

              {/* High-Resolution Vehicle Visual */}
              <div className="relative h-48 overflow-hidden bg-slate-950 flex items-center justify-center">
                <img
                  src={vehicle.authenticImageUrl}
                  alt={vehicle.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  loading="lazy"
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0F17] via-transparent to-transparent" />

                {/* Color Accent Indicator Pill */}
                <div
                  className="absolute bottom-3 left-4 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase text-white shadow-md"
                  style={{ backgroundColor: vehicle.accentColor || '#FF3E00' }}
                >
                  {vehicle.liveryColor}
                </div>

                {/* Quick Rev Button */}
                <button
                  onClick={(e) => handleAudioRev(e, vehicle)}
                  className="absolute bottom-3 right-4 p-2 rounded-xl bg-black/70 hover:bg-[#FF3E00] text-white border border-slate-700/80 transition-colors shadow-lg cursor-pointer"
                  title="Test Engine Rev"
                >
                  <Volume2 size={14} />
                </button>
              </div>

              {/* Vehicle Specs & Description */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-black font-racing text-white group-hover:text-[#FFD700] transition-colors">
                    {vehicle.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-400 line-clamp-2">
                    {vehicle.description}
                  </p>
                </div>

                {/* Telemetry Metrics */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-3 gap-2 text-center">
                  <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                    <span className="text-[9px] font-mono text-slate-400 uppercase block">SPEED</span>
                    <span className="text-xs font-bold font-racing text-white">{vehicle.topSpeedKmh} KM/H</span>
                  </div>
                  <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                    <span className="text-[9px] font-mono text-slate-400 uppercase block">0-100</span>
                    <span className="text-xs font-bold font-racing text-[#00FF66]">{vehicle.acceleration0to100}s</span>
                  </div>
                  <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                    <span className="text-[9px] font-mono text-slate-400 uppercase block">POWER</span>
                    <span className="text-xs font-bold font-racing text-[#FFD700]">{vehicle.horsepower} HP</span>
                  </div>
                </div>

                {/* Action Buttons: Select for Circuit or Details */}
                <div className="mt-5 flex items-center gap-2">
                  <button
                    onClick={() => onSelectVehicle(vehicle)}
                    className={`flex-1 py-2 rounded-xl text-xs font-racing font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      isActive
                        ? 'bg-[#00FF66]/20 border border-[#00FF66] text-[#00FF66]'
                        : 'bg-[#FF3E00] hover:bg-[#FF5500] text-white shadow-md'
                    }`}
                  >
                    {isActive ? (
                      <>
                        <Check size={14} /> ACTIVE ON TRACK
                      </>
                    ) : (
                      'RACE THIS CAR'
                    )}
                  </button>

                  <button
                    onClick={() => setModalVehicle(vehicle)}
                    className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 cursor-pointer"
                    title="View Technical Specs"
                  >
                    <Info size={16} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Technical Blueprint Modal */}
      {modalVehicle && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setModalVehicle(null)}
        >
          <div 
            className="bg-[#0D1017] border border-slate-700 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-[#FF3E00] uppercase">
                  {modalVehicle.series} • {modalVehicle.collectorNumber}
                </span>
                <h3 className="text-2xl font-black font-racing text-white mt-1">
                  {modalVehicle.name}
                </h3>
                <span className="text-xs font-mono text-slate-400">
                  {modalVehicle.team} | {modalVehicle.driverPairing}
                </span>
              </div>
              <button
                onClick={() => setModalVehicle(null)}
                className="text-slate-400 hover:text-white p-1 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">POWERTRAIN SPEC</span>
                <p className="text-xs font-semibold text-white mt-1">{modalVehicle.engineSpec}</p>
              </div>

              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">SIGNATURE TECH</span>
                <p className="text-xs font-semibold text-[#FFD700] mt-1">{modalVehicle.signatureTech}</p>
              </div>

              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">AERODYNAMIC DOWNFORCE</span>
                <p className="text-xs font-semibold text-[#00E5FF] mt-1">{modalVehicle.downforceKg} kg @ 250 km/h</p>
              </div>

              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">DIECAST DIE SCALE</span>
                <p className="text-xs font-semibold text-white mt-1">{modalVehicle.diecastScale}</p>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  onSelectVehicle(modalVehicle);
                  setModalVehicle(null);
                }}
                className="px-6 py-2.5 rounded-xl bg-[#FF3E00] hover:bg-[#FF5500] text-white font-racing font-bold text-xs uppercase"
              >
                LOAD ONTO CIRCUIT TRACK
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
