import { useState, useEffect, useRef } from 'react';

export interface TelemetryState {
  progress: number;       // 0 to 1 smooth
  rawProgress: number;    // 0 to 1 immediate
  speedKmh: number;       // 0 to 382 km/h
  gear: number;           // 1 to 8
  rpm: number;            // 4000 to 15000
  drsActive: boolean;     // DRS wing opened/closed
  gForce: number;         // 0.8G to 5.2G
  bankingDeg: number;     // -32 to +32 roll angle
  boostActive: boolean;   // Nitro booster active
  carX: number;           // Track SVG X coordinate
  carY: number;           // Track SVG Y coordinate
  headingDeg: number;     // Direction car is pointing
}

export function useScrollCarPhysics(trackPathRef: React.RefObject<SVGPathElement | null>) {
  const [telemetry, setTelemetry] = useState<TelemetryState>({
    progress: 0,
    rawProgress: 0,
    speedKmh: 120,
    gear: 3,
    rpm: 8200,
    drsActive: false,
    gForce: 1.2,
    bankingDeg: 0,
    boostActive: false,
    carX: 100,
    carY: 100,
    headingDeg: 90,
  });

  const stateRef = useRef({
    smoothProgress: 0,
    targetProgress: 0,
    lastScrollY: 0,
    lastTime: performance.now(),
    scrollVelocity: 0,
    smoothVelocity: 0,
    prevAngle: 0,
  });

  useEffect(() => {
    let animId: number;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      const raw = Math.min(Math.max(scrollY / maxScroll, 0), 1);
      
      const now = performance.now();
      const dt = Math.max((now - stateRef.current.lastTime) / 1000, 0.008);
      const dy = Math.abs(scrollY - stateRef.current.lastScrollY);
      const instantVelocity = dy / dt; // pixels per sec

      stateRef.current.targetProgress = raw;
      stateRef.current.scrollVelocity = instantVelocity;
      stateRef.current.lastScrollY = scrollY;
      stateRef.current.lastTime = now;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // 60FPS critically damped spring simulation
    const loop = () => {
      const s = stateRef.current;
      
      // Spring follow
      const diff = s.targetProgress - s.smoothProgress;
      s.smoothProgress += diff * 0.085; // smooth critically damped follow
      
      // Velocity decay
      s.smoothVelocity = s.smoothVelocity * 0.88 + s.scrollVelocity * 0.12;
      s.scrollVelocity *= 0.85; // decay instant velocity

      // Calculate speed (base 140km/h idle cruise + up to 215km/h from scroll velocity)
      const velocityRatio = Math.min(s.smoothVelocity / 2500, 1);
      const targetSpeed = Math.round(140 + velocityRatio * 215);
      
      // Gear determination
      let gear = 3;
      if (targetSpeed < 100) gear = 2;
      else if (targetSpeed < 155) gear = 3;
      else if (targetSpeed < 205) gear = 4;
      else if (targetSpeed < 255) gear = 5;
      else if (targetSpeed < 295) gear = 6;
      else if (targetSpeed < 330) gear = 7;
      else gear = 8;

      // RPM determination with simulated gear ratio step
      const gearMinSpeed = [0, 50, 90, 140, 190, 240, 280, 320][gear - 1] || 100;
      const gearMaxSpeed = [0, 95, 145, 195, 245, 285, 325, 385][gear - 1] || 350;
      const gearPercent = Math.min(Math.max((targetSpeed - gearMinSpeed) / (gearMaxSpeed - gearMinSpeed), 0), 1);
      const rpm = Math.round(7500 + gearPercent * 6800);

      // DRS & Nitro Boost active on high velocity or straights
      const isHighSpeed = targetSpeed > 280;
      const isFastScroll = s.smoothVelocity > 1200;
      const drsActive = isHighSpeed || (isFastScroll && s.smoothProgress > 0.4 && s.smoothProgress < 0.65);
      const boostActive = isFastScroll;
      const gForce = parseFloat((1.1 + velocityRatio * 3.8).toFixed(1));

      // Calculate car coordinates from SVG track path
      let carX = 100;
      let carY = 100;
      let headingDeg = 0;
      let bankingDeg = 0;

      if (trackPathRef.current) {
        try {
          const path = trackPathRef.current;
          const totalLength = path.getTotalLength();
          const currentDist = s.smoothProgress * totalLength;
          const pt = path.getPointAtLength(currentDist);
          
          // Tangent sample 3px ahead for smooth heading angle
          const lookAhead = Math.min(currentDist + 3, totalLength);
          const ptAhead = path.getPointAtLength(lookAhead);

          carX = pt.x;
          carY = pt.y;

          const dx = ptAhead.x - pt.x;
          const dy = ptAhead.y - pt.y;
          const angleRad = Math.atan2(dy, dx);
          headingDeg = (angleRad * 180) / Math.PI;

          // Angular curvature derivative for banking angle
          let angleDelta = headingDeg - s.prevAngle;
          if (angleDelta > 180) angleDelta -= 360;
          if (angleDelta < -180) angleDelta += 360;
          
          bankingDeg = Math.min(Math.max(angleDelta * 4.5, -30), 30);
          s.prevAngle = headingDeg;
        } catch (e) {
          // Fallback if path not yet mounted
        }
      }

      setTelemetry({
        progress: s.smoothProgress,
        rawProgress: s.targetProgress,
        speedKmh: targetSpeed,
        gear,
        rpm,
        drsActive,
        gForce,
        bankingDeg,
        boostActive,
        carX,
        carY,
        headingDeg,
      });

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animId);
    };
  }, [trackPathRef]);

  return telemetry;
}
