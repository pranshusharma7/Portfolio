import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Sparkles, RotateCcw } from 'lucide-react';
import { audioEngine } from '../utils/audio';

export default function VoiceHUD() {
  const [audioState, setAudioState] = useState({
    isSpeaking: false,
    isMuted: false,
  });

  useEffect(() => {
    const unsubscribe = audioEngine.subscribe(setAudioState);
    return unsubscribe;
  }, []);

  const handleToggleMute = (e) => {
    e.stopPropagation();
    audioEngine.toggleMute();
  };

  const handleReplayVoice = (e) => {
    e.stopPropagation();
    audioEngine.triggerWelcomeExperience();
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center gap-2.5 select-none pointer-events-auto">
      {/* Mini Futuristic HUD Pill */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="group relative flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#0d0d11]/85 border border-white/10 hover:border-white/25 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-300"
      >
        {/* Equalizer Waveform Bars */}
        <div
          onClick={handleReplayVoice}
          className="flex items-center gap-0.5 cursor-pointer py-1"
          title="Replay Voice Welcome"
        >
          {[0, 1, 2, 3].map((bar) => (
            <motion.span
              key={bar}
              animate={{
                height: audioState.isSpeaking
                  ? [4, 16, 6, 20, 8][bar % 5]
                  : [4, 7, 4][bar % 3],
              }}
              transition={{
                repeat: Infinity,
                duration: audioState.isSpeaking ? 0.45 : 1.6,
                delay: bar * 0.12,
                ease: 'easeInOut',
              }}
              className={`w-[2.5px] rounded-full transition-colors ${
                audioState.isSpeaking
                  ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]'
                  : audioState.isMuted
                  ? 'bg-zinc-600'
                  : 'bg-zinc-400 group-hover:bg-white'
              }`}
            />
          ))}
        </div>

        {/* Text Label / Status */}
        <div
          onClick={handleReplayVoice}
          className="flex items-center gap-1.5 cursor-pointer"
        >
          <span className="font-mono text-[10px] tracking-wider uppercase text-zinc-300 group-hover:text-white transition-colors">
            {audioState.isSpeaking
              ? 'TRANSMITTING ERA...'
              : audioState.isMuted
              ? 'AUDIO MUTED'
              : 'ERA VOICE'}
          </span>
        </div>

        {/* Replay Icon */}
        <button
          onClick={handleReplayVoice}
          aria-label="Replay Welcome Greeting"
          className="p-1 rounded-full text-zinc-400 hover:text-white transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
        </button>

        {/* Mute Toggle */}
        <button
          onClick={handleToggleMute}
          aria-label={audioState.isMuted ? 'Unmute Audio' : 'Mute Audio'}
          className="p-1 rounded-full text-zinc-400 hover:text-white transition-colors"
        >
          {audioState.isMuted ? (
            <VolumeX className="w-3 h-3 text-red-400" />
          ) : (
            <Volume2 className="w-3 h-3" />
          )}
        </button>

        {/* Floating Subtitle Banner during speech */}
        <AnimatePresence>
          {audioState.isSpeaking && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: -45, scale: 1 }}
              exit={{ opacity: 0, y: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="absolute left-0 bottom-0 pointer-events-none whitespace-nowrap px-3.5 py-1.5 rounded-xl bg-black/90 border border-emerald-500/30 text-emerald-300 font-mono text-[11px] shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center gap-2"
            >
              <Sparkles className="w-3 h-3 text-emerald-400 animate-pulse" />
              <span>"Welcome to the Pranshu Kumar Era."</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
