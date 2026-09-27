// Web Audio API dynamic Formula 1 V6 Turbo Hybrid Engine Synthesizer
class EngineAudioSynthesizer {
  private ctx: AudioContext | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private subOsc: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private isMuted: boolean = true;
  private isInitialized: boolean = false;

  public init() {
    if (this.isInitialized) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      // Master gain
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0, this.ctx.currentTime);

      // Lowpass filter for throat exhaust roar
      this.filterNode = this.ctx.createBiquadFilter();
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.setValueAtTime(1200, this.ctx.currentTime);
      this.filterNode.Q.setValueAtTime(3.5, this.ctx.currentTime);

      // Primary cylinder oscillator (sawtooth for aggressive V6 growl)
      this.osc1 = this.ctx.createOscillator();
      this.osc1.type = 'sawtooth';
      this.osc1.frequency.setValueAtTime(110, this.ctx.currentTime);

      // Secondary harmonic oscillator (square for turbo whine)
      this.osc2 = this.ctx.createOscillator();
      this.osc2.type = 'triangle';
      this.osc2.frequency.setValueAtTime(220, this.ctx.currentTime);

      // Sub-bass rumble
      this.subOsc = this.ctx.createOscillator();
      this.subOsc.type = 'sine';
      this.subOsc.frequency.setValueAtTime(55, this.ctx.currentTime);

      // Route
      this.osc1.connect(this.filterNode);
      this.osc2.connect(this.filterNode);
      this.subOsc.connect(this.gainNode);
      this.filterNode.connect(this.gainNode);
      this.gainNode.connect(this.ctx.destination);

      this.osc1.start();
      this.osc2.start();
      this.subOsc.start();
      this.isInitialized = true;
    } catch (e) {
      console.warn("Web Audio API not supported or user blocked audio context", e);
    }
  }

  public toggleMute(): boolean {
    if (!this.isInitialized) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isMuted = !this.isMuted;

    if (this.gainNode && this.ctx) {
      const targetGain = this.isMuted ? 0 : 0.08;
      this.gainNode.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.1);
    }
    return !this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public updateEngineSound(rpm: number, speedKmh: number, isBoost: boolean) {
    if (!this.isInitialized || this.isMuted || !this.ctx || !this.osc1 || !this.osc2 || !this.subOsc || !this.filterNode) {
      return;
    }

    const now = this.ctx.currentTime;
    // Map RPM (4000 - 15000) to fundamental engine audio frequency (80Hz to 360Hz)
    const baseFreq = 75 + ((rpm - 4000) / 11000) * 260;
    const turboWhineFreq = 800 + ((rpm - 4000) / 11000) * 2400;

    this.osc1.frequency.setTargetAtTime(baseFreq, now, 0.04);
    this.osc2.frequency.setTargetAtTime(turboWhineFreq, now, 0.04);
    this.subOsc.frequency.setTargetAtTime(baseFreq * 0.5, now, 0.04);

    // Filter frequency opens up at high speed and boost
    const filterFreq = 900 + (speedKmh / 380) * 2800 + (isBoost ? 1200 : 0);
    this.filterNode.frequency.setTargetAtTime(filterFreq, now, 0.05);

    if (this.gainNode) {
      const boostGain = isBoost ? 0.12 : 0.08;
      this.gainNode.gain.setTargetAtTime(boostGain, now, 0.05);
    }
  }
}

export const engineAudio = new EngineAudioSynthesizer();
