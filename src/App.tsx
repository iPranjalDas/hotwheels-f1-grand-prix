import React, { useState } from 'react';
import { F1_HOTWHEELS_VEHICLES, Vehicle } from './data/vehicles';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { InteractiveTrackOverlay } from './components/InteractiveTrackOverlay';
import { TelemetryHUD } from './components/TelemetryHUD';
import { VehicleShowcase } from './components/VehicleShowcase';
import { DynoLabCustomizer } from './components/DynoLabCustomizer';
import { LoopDeLoopChallenge } from './components/LoopDeLoopChallenge';
import { ConstructorStandings } from './components/ConstructorStandings';
import { Footer } from './components/Footer';
import { TelemetryState } from './hooks/useScrollCarPhysics';

export const App: React.FC = () => {
  const [vehicles] = useState<Vehicle[]>(F1_HOTWHEELS_VEHICLES);
  const [activeVehicle, setActiveVehicle] = useState<Vehicle>(F1_HOTWHEELS_VEHICLES[0]);
  const [telemetry, setTelemetry] = useState<TelemetryState>({
    progress: 0,
    rawProgress: 0,
    speedKmh: 140,
    gear: 3,
    rpm: 8200,
    drsActive: false,
    gForce: 1.2,
    bankingDeg: 0,
    boostActive: false,
    carX: 500,
    carY: 180,
    headingDeg: 90,
  });

  const handleLaunchCircuit = () => {
    const paddockElement = document.getElementById('paddock');
    if (paddockElement) {
      paddockElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApplyCustomization = (customSetup: { primary: string; accent: string; tireColor: string }) => {
    setActiveVehicle((prev) => ({
      ...prev,
      accentColor: customSetup.primary,
      spectraflameHex: customSetup.accent,
      liveryColor: 'Custom Spectraflame Spec',
    }));
  };

  return (
    <div className="min-h-screen bg-[#08090C] text-slate-100 relative selection:bg-[#FF3E00] selection:text-white">
      {/* Sticky Racing Navigation */}
      <Navbar 
        activeVehicle={activeVehicle}
        onSelectVehicle={setActiveVehicle}
        vehicles={vehicles}
      />

      {/* Hero Entrance Stage */}
      <HeroSection 
        activeVehicle={activeVehicle}
        onLaunchCircuit={handleLaunchCircuit}
      />

      {/* 
        Full-Page Interactive Race Track with the Smooth Vector Moving Car 
        Positioned as an absolute overlay reacting to user scrolling 
      */}
      <InteractiveTrackOverlay 
        activeVehicle={activeVehicle}
        onTelemetryUpdate={setTelemetry}
      />

      {/* Floating Cockpit Telemetry HUD */}
      <TelemetryHUD 
        telemetry={telemetry}
        activeVehicle={activeVehicle}
      />

      {/* Official 2024 Paddock Diecast Collection */}
      <VehicleShowcase 
        vehicles={vehicles}
        activeVehicle={activeVehicle}
        onSelectVehicle={setActiveVehicle}
      />

      {/* Interactive Dyno Lab & Wind Tunnel Customizer */}
      <DynoLabCustomizer 
        onApplyCustomization={handleApplyCustomization}
      />

      {/* Hot Wheels 360° Booster Loop Speed Challenge */}
      <LoopDeLoopChallenge 
        activeVehicle={activeVehicle}
      />

      {/* Official Constructors Championship Standings */}
      <ConstructorStandings 
        vehicles={vehicles}
        activeVehicle={activeVehicle}
        onSelectVehicle={setActiveVehicle}
      />

      {/* Grand Prix Motorsport Footer */}
      <Footer />
    </div>
  );
};

export default App;
