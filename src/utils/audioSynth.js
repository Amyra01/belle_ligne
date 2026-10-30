// Chic Runway Ambient Web Audio Synthesizer
// Generates a sophisticated catwalk house/downtempo fashion groove using native Web Audio API

class RunwayAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.interval = null;
    this.step = 0;
    this.tempo = 116; // Catwalk pace: 116 BPM
    this.volume = 0.25;
    this.masterGain = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
  }

  playKick(time) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.frequency.setValueAtTime(120, time);
    osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.35);
    
    gain.gain.setValueAtTime(0.7, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.35);
    
    osc.connect(gain);
    gain.connect(this.masterGain);
    
    osc.start(time);
    osc.stop(time + 0.35);
  }

  playHiHat(time, open = false) {
    if (!this.ctx) return;
    // Metallic noise buffer
    const bufferSize = this.ctx.sampleRate * (open ? 0.2 : 0.05);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.3;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    // Highpass filter for crisp fashion hihat
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(7000, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(open ? 0.25 : 0.15, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + (open ? 0.2 : 0.05));

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(time);
    noise.stop(time + (open ? 0.2 : 0.05));
  }

  playSynthChord(time, noteIndex) {
    if (!this.ctx) return;
    // Elegant minor chords (Fm9 / Cm9 / Bbm7 luxury fashion vibes)
    const chords = [
      [174.61, 207.65, 261.63, 311.13], // F min
      [155.56, 196.00, 233.08, 293.66], // Eb maj
      [130.81, 155.56, 196.00, 233.08], // C min
      [116.54, 138.59, 174.61, 207.65], // Bb min
    ];
    const freqs = chords[noteIndex % chords.length];

    freqs.forEach(freq => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, time);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, time);
      filter.frequency.exponentialRampToValueAtTime(350, time + 1.2);

      gain.gain.setValueAtTime(0.08, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 1.2);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(time);
      osc.stop(time + 1.2);
    });
  }

  playSubBass(time, freq) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);
    
    gain.gain.setValueAtTime(0.35, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.45);
    
    osc.connect(gain);
    gain.connect(this.masterGain);
    
    osc.start(time);
    osc.stop(time + 0.45);
  }

  start() {
    this.init();
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isPlaying = true;
    this.step = 0;
    
    const stepDuration = (60 / this.tempo) / 4; // 16th notes
    
    this.interval = setInterval(() => {
      if (!this.isPlaying || !this.ctx) return;
      const t = this.ctx.currentTime + 0.05;
      const s = this.step % 16;
      
      // Kick on 1, 5, 9, 13 (four-on-the-floor runway pulse)
      if (s === 0 || s === 4 || s === 8 || s === 12) {
        this.playKick(t);
      }
      
      // Hi-hats
      if (s % 2 === 0) {
        this.playHiHat(t, s === 2 || s === 10);
      }
      
      // Sub bass
      if (s === 0) this.playSubBass(t, 43.65); // F1
      if (s === 6) this.playSubBass(t, 43.65);
      if (s === 8) this.playSubBass(t, 38.89); // Eb1
      if (s === 14) this.playSubBass(t, 32.70); // C1

      // Atmospheric chord wash every 16 steps
      if (s === 0) {
        this.playSynthChord(t, Math.floor(this.step / 16));
      }
      
      this.step++;
    }, stepDuration * 1000);
  }

  stop() {
    this.isPlaying = false;
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  setVolume(vol) {
    this.volume = vol;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(vol, this.ctx.currentTime);
    }
  }
}

export const runwayAudio = new RunwayAudioEngine();
