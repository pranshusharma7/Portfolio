/**
 * Futuristic Audio & Voice Engine
 * Combines Web Audio API for cinematic sci-fi chimes
 * with Web Speech API for the "Welcome to the Pranshu Kumar Era" voice announcement.
 */

class AudioEngine {
  constructor() {
    this.audioCtx = null;
    this.isMuted = false;
    this.isSpeaking = false;
    this.listeners = new Set();
    this.hasPlayed = false;
  }

  // Lazy AudioContext initialization on first user interaction
  getAudioContext() {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  // Subscribe to voice state changes (speaking: true/false, muted: true/false)
  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((fn) =>
      fn({ isSpeaking: this.isSpeaking, isMuted: this.isMuted })
    );
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      this.isSpeaking = false;
    }
    this.notify();
    return this.isMuted;
  }

  // Synthesize a rich cinematic sci-fi sub-bass riser + crystalline chime
  playCinematicChime() {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      // Layer 1: Sub-bass resonance (55Hz -> 110Hz gentle glide)
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(55, now);
      subOsc.frequency.exponentialRampToValueAtTime(110, now + 0.5);

      subGain.gain.setValueAtTime(0.001, now);
      subGain.gain.linearRampToValueAtTime(0.3, now + 0.1);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      subOsc.connect(subGain);
      subGain.connect(ctx.destination);
      subOsc.start(now);
      subOsc.stop(now + 1.3);

      // Layer 2: Ethereal high crystal shimmer (880Hz -> 1760Hz)
      const chimeOsc = ctx.createOscillator();
      const chimeGain = ctx.createGain();
      chimeOsc.type = 'sine';
      chimeOsc.frequency.setValueAtTime(880, now + 0.05);
      chimeOsc.frequency.exponentialRampToValueAtTime(1760, now + 0.7);

      chimeGain.gain.setValueAtTime(0.001, now);
      chimeGain.gain.linearRampToValueAtTime(0.15, now + 0.15);
      chimeGain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);

      chimeOsc.connect(chimeGain);
      chimeGain.connect(ctx.destination);
      chimeOsc.start(now);
      chimeOsc.stop(now + 1.6);
    } catch (e) {
      console.warn('AudioContext playback error:', e);
    }
  }

  // Futuristic AI voice announcement: "Welcome to the Pranshu Kumar Era."
  speakWelcome() {
    if (this.isMuted || typeof window === 'undefined') return;
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance('Welcome to the Pranshu Kumar Era.');

    // Configure speech parameters for clear, authoritative AI feel
    utterance.rate = 0.92; // Slightly measured, authoritative
    utterance.pitch = 1.05; // Crisp, clear
    utterance.volume = 1.0;

    const selectVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices || voices.length === 0) return;

      // Prefer premium neural or clear English voices
      const preferred = voices.find(
        (v) =>
          (v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel') || v.name.includes('Karen') || v.name.includes('Zira') || v.name.includes('Siri')))
      ) || voices.find((v) => v.lang.startsWith('en')) || voices[0];

      if (preferred) {
        utterance.voice = preferred;
      }
    };

    if (window.speechSynthesis.getVoices().length > 0) {
      selectVoice();
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        selectVoice();
      };
    }

    utterance.onstart = () => {
      this.isSpeaking = true;
      this.notify();
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.notify();
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
      this.notify();
    };

    window.speechSynthesis.speak(utterance);
  }

  // Full cinematic experience (Sound Chime + Voice)
  triggerWelcomeExperience() {
    this.hasPlayed = true;
    this.playCinematicChime();
    // Delay speech slightly to let the sub-bass riser hit first
    setTimeout(() => {
      this.speakWelcome();
    }, 280);
  }
}

export const audioEngine = new AudioEngine();
