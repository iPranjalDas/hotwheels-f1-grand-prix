export interface Vehicle {
  id: string;
  name: string;
  team: string;
  constructorCode: string;
  year: number;
  liveryColor: string;
  accentColor: string;
  spectraflameHex: string;
  engineSpec: string;
  horsepower: number;
  topSpeedKmh: number;
  acceleration0to100: number;
  downforceKg: number;
  diecastScale: string;
  collectorNumber: string;
  series: string;
  officialLogoUrl: string;
  authenticImageUrl: string;
  modelViewUrl?: string;
  description: string;
  signatureTech: string;
  driverPairing: string;
  championships: number;
  audioFreqBase: number;
}

export const F1_HOTWHEELS_VEHICLES: Vehicle[] = [
  {
    id: "f1-hw-redbull-twinmill",
    name: "Red Bull RB20 × Twin Mill GT",
    team: "Oracle Red Bull Racing",
    constructorCode: "RBR",
    year: 2024,
    liveryColor: "Matte Midnight Blue",
    accentColor: "#FCD116",
    spectraflameHex: "#0C1938",
    engineSpec: "Honda RBPT 1.6L Turbo Hybrid V6 + Dual Twin-Mill Superchargers",
    horsepower: 1140,
    topSpeedKmh: 382,
    acceleration0to100: 1.85,
    downforceKg: 2680,
    diecastScale: "1:64 Premium Collector",
    collectorNumber: "HW-F1-01/10",
    series: "Spectraflame Grand Prix Series",
    officialLogoUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/5/52/Red_Bull_Racing_logo.svg/320px-Red_Bull_Racing_logo.svg.png",
    authenticImageUrl: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80",
    description: "Adrian Newey ground-effect underfloor venturis merged with the twin exposed chrome blown turbines of the Hot Wheels Twin Mill legend.",
    signatureTech: "Dual Undercut Venturi Inlets + Blown Aero Diffuser",
    driverPairing: "Max Verstappen / Sergio Pérez",
    championships: 6,
    audioFreqBase: 260
  },
  {
    id: "f1-hw-ferrari-rogerdodger",
    name: "Scuderia Ferrari SF-24 × Roger Dodger",
    team: "Scuderia Ferrari HP",
    constructorCode: "FER",
    year: 2024,
    liveryColor: "Rosso Corsa Spectraflame",
    accentColor: "#FFF200",
    spectraflameHex: "#D40000",
    engineSpec: "Ferrari 066/12 1.6L 90° Turbo V6 Hybrid + Hot Wheels Nitro Injectors",
    horsepower: 1115,
    topSpeedKmh: 374,
    acceleration0to100: 1.95,
    downforceKg: 2590,
    diecastScale: "1:64 Redline Real Riders",
    collectorNumber: "HW-F1-02/10",
    series: "Tifosi Heritage Line",
    officialLogoUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d1/Ferrari-Logo.svg/200px-Ferrari-Logo.svg.png",
    authenticImageUrl: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80",
    description: "Maranello racing perfection with pure Hot Wheels muscle: exposed red-head cylinder blocks and high-downforce shark-fin dorsal cooling.",
    signatureTech: "S-Duct Aero Vortex Generator + Nitro Bypass",
    driverPairing: "Charles Leclerc / Carlos Sainz",
    championships: 16,
    audioFreqBase: 290
  },
  {
    id: "f1-hw-mclaren-badtotheblade",
    name: "McLaren MCL38 × Bad To The Blade",
    team: "McLaren Formula 1 Team",
    constructorCode: "MCL",
    year: 2024,
    liveryColor: "Papaya Spark & Anthracite",
    accentColor: "#00E5FF",
    spectraflameHex: "#FF8000",
    engineSpec: "Mercedes-AMG M15 E Performance 1.6L V6 Turbo + Carbon Blade MGU-K",
    horsepower: 1095,
    topSpeedKmh: 371,
    acceleration0to100: 2.05,
    downforceKg: 2640,
    diecastScale: "1:64 Metallic Speed Machines",
    collectorNumber: "HW-F1-03/10",
    series: "Woking Aero Lab",
    officialLogoUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/6/66/McLaren_Racing_logo.svg/320px-McLaren_Racing_logo.svg.png",
    authenticImageUrl: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80",
    description: "Championship-leading downforce efficiency featuring hyper-flexible front wing cascading flaps and Bad To The Blade stabilizer fin.",
    signatureTech: "Morphing Flexible Wing Element + DRS Super-Slot",
    driverPairing: "Lando Norris / Oscar Piastri",
    championships: 8,
    audioFreqBase: 245
  },
  {
    id: "f1-hw-mercedes-nightshifter",
    name: "Mercedes-AMG W15 × Night Shifter GP",
    team: "Mercedes-AMG PETRONAS F1 Team",
    constructorCode: "MER",
    year: 2024,
    liveryColor: "Silver Arrow & Petronas Emerald",
    accentColor: "#00A19B",
    spectraflameHex: "#C0C0C8",
    engineSpec: "Mercedes-AMG F1 M15 E Performance Hybrid + Ceramic Twin Exhaust",
    horsepower: 1085,
    topSpeedKmh: 369,
    acceleration0to100: 2.08,
    downforceKg: 2510,
    diecastScale: "1:64 Elite Real Riders",
    collectorNumber: "HW-F1-04/10",
    series: "Silver Arrow Chronos",
    officialLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg/320px-Mercedes_AMG_Petronas_F1_Logo.svg.png",
    authenticImageUrl: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80",
    description: "Brackley precision engineering in a darkened titanium monocoque with active pushrod front suspension and dual glowing halo rim LEDs.",
    signatureTech: "Dual Pushrod Kinematic Geometry + Zero-Pod Floor",
    driverPairing: "Lewis Hamilton / George Russell",
    championships: 8,
    audioFreqBase: 230
  },
  {
    id: "f1-hw-astonmartin-deoraii",
    name: "Aston Martin AMR24 × Deora II Aero",
    team: "Aston Martin Aramco F1 Team",
    constructorCode: "AMR",
    year: 2024,
    liveryColor: "Aston Martin Racing Green",
    accentColor: "#CEE83D",
    spectraflameHex: "#004830",
    engineSpec: "Mercedes-AMG 1.6L Turbo Hybrid + Deora Dual Ram-Air Pods",
    horsepower: 1070,
    topSpeedKmh: 366,
    acceleration0to100: 2.12,
    downforceKg: 2480,
    diecastScale: "1:64 HW Boulevard Series",
    collectorNumber: "HW-F1-05/10",
    series: "Silverstone Greenworks",
    officialLogoUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/7/72/Aston_Martin_Aramco_Cognizant_F1.svg/320px-Aston_Martin_Aramco_Cognizant_F1.svg.png",
    authenticImageUrl: "https://images.unsplash.com/photo-1600790142055-619df03207e6?auto=format&fit=crop&w=1200&q=80",
    description: "Futuristic aerofoil silhouette inspired by Nathan Proch's 2000 Hot Wheels Hall of Fame Deora II infused with Fernando Alonso's relentless racecraft.",
    signatureTech: "Contoured Sidepod Water-Slide Channels",
    driverPairing: "Fernando Alonso / Lance Stroll",
    championships: 0,
    audioFreqBase: 220
  },
  {
    id: "f1-hw-alpine-boneshaker",
    name: "BWT Alpine A524 × Bone Shaker GP",
    team: "BWT Alpine F1 Team",
    constructorCode: "ALP",
    year: 2024,
    liveryColor: "Alpine Bleue & BWT Neon Pink",
    accentColor: "#FF87BC",
    spectraflameHex: "#0055A4",
    engineSpec: "Renault E-Tech RE24 1.6L V6 Turbo + Larry Wood Skull Diffuser",
    horsepower: 1045,
    topSpeedKmh: 364,
    acceleration0to100: 2.18,
    downforceKg: 2410,
    diecastScale: "1:64 Track Stars Special",
    collectorNumber: "HW-F1-06/10",
    series: "Enstone Aggression Line",
    officialLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Alpine_F1_Team_Logo.svg/320px-Alpine_F1_Team_Logo.svg.png",
    authenticImageUrl: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80",
    description: "Larry Wood's iconic Bone Shaker aggressive grille redesigned as a high-velocity carbon front vortex generator in Alpine livery.",
    signatureTech: "Skull-Intake Aerodynamic Splitter + Flame Boost",
    driverPairing: "Pierre Gasly / Esteban Ocon",
    championships: 2,
    audioFreqBase: 250
  },
  {
    id: "f1-hw-williams-deora",
    name: "Williams FW46 × Rip Rod Aero",
    team: "Williams Racing",
    constructorCode: "WIL",
    year: 2024,
    liveryColor: "Heritage Royal Navy & Duracell Copper",
    accentColor: "#00A0DE",
    spectraflameHex: "#00205B",
    engineSpec: "Mercedes-AMG M15 E Performance + Rip Rod Kinetic Turbo",
    horsepower: 1060,
    topSpeedKmh: 368,
    acceleration0to100: 2.15,
    downforceKg: 2390,
    diecastScale: "1:64 HW Heritage Collection",
    collectorNumber: "HW-F1-07/10",
    series: "Grove Legend Classics",
    officialLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Williams_Racing_2020_Logo.svg/320px-Williams_Racing_2020_Logo.svg.png",
    authenticImageUrl: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80",
    description: "Classic British motor heritage matched with raw straight-line low drag efficiency and Duracell energy recovery system.",
    signatureTech: "Ultra-Low Drag Rear Wing Array + Kinetic ERS",
    driverPairing: "Alexander Albon / Franco Colapinto",
    championships: 9,
    audioFreqBase: 240
  },
  {
    id: "f1-hw-sauber-blades",
    name: "Stake Kick Sauber C44 × Carbon Blade",
    team: "Stake F1 Team KICK Sauber",
    constructorCode: "SAU",
    year: 2024,
    liveryColor: "Fluorescent Acid Green & Obsidian Black",
    accentColor: "#52E252",
    spectraflameHex: "#22FF00",
    engineSpec: "Ferrari 066/12 V6 Turbo Hybrid + High-Voltage Glow Cells",
    horsepower: 1050,
    topSpeedKmh: 362,
    acceleration0to100: 2.22,
    downforceKg: 2360,
    diecastScale: "1:64 Glow-In-The-Dark Special",
    collectorNumber: "HW-F1-08/10",
    series: "Hinwil Cyberpunk Circuit",
    officialLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Stake_F1_Team_Kick_Sauber_logo.svg/320px-Stake_F1_Team_Kick_Sauber_logo.svg.png",
    authenticImageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    description: "High-contrast electric livery designed for midnight street circuits with extreme pullrod front suspension and neon wheel aero covers.",
    signatureTech: "Electroluminescent Aero Covers + High-G Camber",
    driverPairing: "Valtteri Bottas / Zhou Guanyu",
    championships: 0,
    audioFreqBase: 275
  },
  {
    id: "f1-hw-vcarb-torquer",
    name: "Visa Cash App RB01 × Torque Twister",
    team: "Visa Cash App RB F1 Team",
    constructorCode: "VCARB",
    year: 2024,
    liveryColor: "Chameleon Electric Blue & White Bull",
    accentColor: "#FFFFFF",
    spectraflameHex: "#0033CC",
    engineSpec: "Honda RBPT 1.6L V6 Turbo + Hot Wheels Torque Splitter",
    horsepower: 1075,
    topSpeedKmh: 367,
    acceleration0to100: 2.10,
    downforceKg: 2470,
    diecastScale: "1:64 HW Speed Graphics",
    collectorNumber: "HW-F1-09/10",
    series: "Faenza Youth Division",
    officialLogoUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/0/02/Racing_Bulls_logo.svg/320px-Racing_Bulls_logo.svg.png",
    authenticImageUrl: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80",
    description: "Dynamic agility platform featuring Red Bull Technologies rear suspension architecture and Torque Twister twin center exit exhausts.",
    signatureTech: "Torque-Vectoring Differential + Compact Coanda Exhaust",
    driverPairing: "Yuki Tsunoda / Liam Lawson",
    championships: 0,
    audioFreqBase: 255
  },
  {
    id: "f1-hw-haas-shifter",
    name: "MoneyGram Haas VF-24 × Mod Rod GP",
    team: "MoneyGram Haas F1 Team",
    constructorCode: "HAA",
    year: 2024,
    liveryColor: "Monochrome Matte Black & Crimson",
    accentColor: "#E10600",
    spectraflameHex: "#1A1A1A",
    engineSpec: "Ferrari 066/12 1.6L V6 Turbo + Custom American Hot Rod Cam",
    horsepower: 1055,
    topSpeedKmh: 363,
    acceleration0to100: 2.20,
    downforceKg: 2380,
    diecastScale: "1:64 HW Workshop Special",
    collectorNumber: "HW-F1-10/10",
    series: "Kannapolis Precision Division",
    officialLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Haas_F1_Team_Logo.svg/320px-Haas_F1_Team_Logo.svg.png",
    authenticImageUrl: "https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=1200&q=80",
    description: "Raw American grassroots power meets European single-seater finesse, optimized for high tire longevity and relentless tire degradation resistance.",
    signatureTech: "High-Brake Duct Cooling Vent + Tire Thermal Matrix",
    driverPairing: "Nico Hülkenberg / Kevin Magnussen",
    championships: 0,
    audioFreqBase: 235
  }
];

export interface TrackSection {
  id: string;
  name: string;
  type: 'straight' | 'hairpin' | 'loop' | 'chicane' | 'finish';
  targetSpeed: number;
  drsActive: boolean;
  recommendedGear: number;
  description: string;
  scrollPercentage: number;
}

export const GRAND_PRIX_TRACK_SECTIONS: TrackSection[] = [
  {
    id: "sec-start",
    name: "Main Straight & Launch Grid",
    type: "straight",
    targetSpeed: 335,
    drsActive: true,
    recommendedGear: 8,
    description: "Full throttle boost out of the starting blocks onto the iconic orange launch strip.",
    scrollPercentage: 0
  },
  {
    id: "sec-turn1",
    name: "Curva Grande Apex",
    type: "hairpin",
    targetSpeed: 165,
    drsActive: false,
    recommendedGear: 4,
    description: "Heavy braking zone from 335 down to 165 km/h. High downforce banking in effect.",
    scrollPercentage: 0.25
  },
  {
    id: "sec-loop",
    name: "Spectraflame 360° Booster Loop",
    type: "loop",
    targetSpeed: 355,
    drsActive: true,
    recommendedGear: 7,
    description: "Hot Wheels signature vertical acceleration loop! Centrifugal gravity defying velocity.",
    scrollPercentage: 0.50
  },
  {
    id: "sec-chicane",
    name: "Ascari Carbon Chicane",
    type: "chicane",
    targetSpeed: 210,
    drsActive: false,
    recommendedGear: 5,
    description: "Rapid left-right weight transfer across high curbings with Sparks and tire smoke.",
    scrollPercentage: 0.75
  },
  {
    id: "sec-podium",
    name: "Chequered Flag Podium Finish",
    type: "finish",
    targetSpeed: 310,
    drsActive: false,
    recommendedGear: 8,
    description: "Final sprint to the timing beams and Grand Prix podium celebration!",
    scrollPercentage: 1.0
  }
];
