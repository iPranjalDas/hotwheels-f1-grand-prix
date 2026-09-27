import React from 'react';
import { Vehicle } from '../data/vehicles';
import { Trophy, Award, ChevronRight, Flame } from 'lucide-react';

interface StandingsProps {
  vehicles: Vehicle[];
  activeVehicle: Vehicle;
  onSelectVehicle: (vehicle: Vehicle) => void;
}

export const ConstructorStandings: React.FC<StandingsProps> = ({
  vehicles,
  activeVehicle,
  onSelectVehicle,
}) => {
  // Sort standings by points/championships
  const standings = [
    { rank: 1, team: "McLaren Formula 1 Team", points: 666, wins: 5, diecastGrade: "Mythic Platinum" },
    { rank: 2, team: "Scuderia Ferrari HP", points: 652, wins: 5, diecastGrade: "Legendary Gold" },
    { rank: 3, team: "Oracle Red Bull Racing", points: 589, wins: 8, diecastGrade: "Legendary Gold" },
    { rank: 4, team: "Mercedes-AMG PETRONAS F1 Team", points: 468, wins: 3, diecastGrade: "Super Treasure" },
    { rank: 5, team: "Aston Martin Aramco F1 Team", points: 94, wins: 0, diecastGrade: "Treasure Hunt" },
    { rank: 6, team: "BWT Alpine F1 Team", points: 53, wins: 0, diecastGrade: "Real Riders" },
    { rank: 7, team: "Haas F1 Team", points: 54, wins: 0, diecastGrade: "Track Stars" },
    { rank: 8, team: "Visa Cash App RB F1 Team", points: 46, wins: 0, diecastGrade: "Track Stars" },
    { rank: 9, team: "Williams Racing", points: 17, wins: 0, diecastGrade: "Heritage Edition" },
    { rank: 10, team: "Stake F1 Team KICK Sauber", points: 4, wins: 0, diecastGrade: "Cyber Special" },
  ];

  return (
    <section 
      id="standings"
      aria-label="Constructor Standings"
      className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10"
    >
      <div className="flex items-center gap-2 text-[#FFD700] font-mono text-xs font-bold tracking-widest uppercase mb-1">
        <Trophy size={14} /> 2024 FIA WORLD CONSTRUCTORS' CHAMPIONSHIP
      </div>
      <h2 className="text-3xl sm:text-5xl font-black font-racing uppercase tracking-tight text-white mb-2">
        GRAND PRIX LEADERBOARD
      </h2>
      <p className="text-sm text-slate-400 max-w-2xl mb-8">
        Real-world Formula 1 team championship points integrated with Hot Wheels diecast collector rarity ratings and casting series status.
      </p>

      {/* Standings Table Container */}
      <div className="bg-[#0C0F17]/95 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/80 text-[10px] font-mono uppercase text-slate-400">
                <th className="py-3 px-4 text-center">POS</th>
                <th className="py-3 px-4">CONSTRUCTOR</th>
                <th className="py-3 px-4">DIECAST CONCEPT CAR</th>
                <th className="py-3 px-4 text-center">WINS</th>
                <th className="py-3 px-4 text-right">POINTS</th>
                <th className="py-3 px-4 text-center">DIECAST GRADE</th>
                <th className="py-3 px-4 text-center">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs font-mono">
              {standings.map((item) => {
                const vehicle = vehicles.find((v) => v.team.toLowerCase().includes(item.team.split(' ')[0].toLowerCase())) || vehicles[0];
                const isSelected = activeVehicle.id === vehicle.id;

                return (
                  <tr 
                    key={item.rank}
                    className={`transition-colors hover:bg-slate-900/60 ${
                      isSelected ? 'bg-[#FF3E00]/10 border-l-4 border-l-[#FF3E00]' : ''
                    }`}
                  >
                    {/* Rank */}
                    <td className="py-3.5 px-4 text-center font-racing font-bold text-sm">
                      {item.rank === 1 && <span className="text-[#FFD700]">🥇 1</span>}
                      {item.rank === 2 && <span className="text-slate-300">🥈 2</span>}
                      {item.rank === 3 && <span className="text-amber-600">🥉 3</span>}
                      {item.rank > 3 && <span className="text-slate-400">{item.rank}</span>}
                    </td>

                    {/* Team & Logo */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={vehicle.officialLogoUrl} 
                          alt={vehicle.team} 
                          className="h-5 w-auto max-w-[35px] object-contain"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        <span className="font-racing font-bold text-white uppercase text-xs">
                          {item.team}
                        </span>
                      </div>
                    </td>

                    {/* Hot Wheels Concept Car */}
                    <td className="py-3.5 px-4 text-slate-300">
                      <span className="font-semibold text-white">{vehicle.name}</span>
                      <span className="block text-[10px] text-slate-500">{vehicle.signatureTech}</span>
                    </td>

                    {/* Wins */}
                    <td className="py-3.5 px-4 text-center font-bold text-slate-300">
                      {item.wins}
                    </td>

                    {/* Points */}
                    <td className="py-3.5 px-4 text-right font-racing font-black text-sm text-[#FFD700]">
                      {item.points} <span className="text-[10px] font-mono text-slate-400 font-normal">PTS</span>
                    </td>

                    {/* Collector Grade */}
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-200 border border-slate-700">
                        <Flame size={10} className="text-[#FF3E00]" />
                        {item.diecastGrade}
                      </span>
                    </td>

                    {/* Race Car Button */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => onSelectVehicle(vehicle)}
                        className={`px-3 py-1 rounded-lg text-[10px] font-racing font-bold tracking-wider uppercase transition-all cursor-pointer ${
                          isSelected 
                            ? 'bg-[#00FF66]/20 text-[#00FF66] border border-[#00FF66]' 
                            : 'bg-slate-800 hover:bg-[#FF3E00] text-slate-300 hover:text-white'
                        }`}
                      >
                        {isSelected ? 'ACTIVE' : 'SELECT'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
