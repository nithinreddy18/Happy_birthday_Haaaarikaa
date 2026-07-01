"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const noteIndexRef = useRef(0);

  // Gentle, dreamlike music box melody (Happy Birthday chords in C major/F major/G major)
  // [frequency, duration_ms, delay_ms]
  const melody = [
    [261.63, 300, 0],    // C4
    [261.63, 300, 400],  // C4
    [293.66, 600, 800],  // D4
    [261.63, 600, 1600], // C4
    [349.23, 600, 2400], // F4
    [329.63, 1200, 3200], // E4
    
    [261.63, 300, 4800], // C4
    [261.63, 300, 5200], // C4
    [293.66, 600, 5600], // D4
    [261.63, 600, 6400], // C4
    [392.00, 600, 7200], // G4
    [349.23, 1200, 8000], // F4

    [261.63, 300, 9600],  // C4
    [261.63, 300, 10000], // C4
    [523.25, 600, 10400], // C5
    [440.00, 600, 11200], // A4
    [349.23, 600, 12000], // F4
    [329.63, 600, 12800], // E4
    [293.66, 1200, 13600], // D4

    [466.16, 300, 15200], // Bb4
    [466.16, 300, 15600], // Bb4
    [440.00, 600, 16000], // A4
    [349.23, 600, 16800], // F4
    [392.00, 600, 17600], // G4
    [349.23, 1200, 18400], // F4
  ];

  const loopLength = 20800; // total duration of loop in ms

  const playTone = (freq: number, duration: number) => {
    if (!audioContextRef.current) return;
    const ctx = audioContextRef.current;

    // Resumes context if suspended (browser security)
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    // Use a triangle wave for a soft, music-box-like chime sound
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    // Filter to make chimes rounder and warmer
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1000, ctx.currentTime);

    // Envelope for a gentle pluck with long release
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.05); // soft attack
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration / 1000); // decay/release

    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration / 1000);
  };

  const startSequence = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    
    // Play immediately
    melody.forEach(([freq, duration, delay]) => {
      setTimeout(() => {
        if (isPlaying) {
          playTone(freq, duration);
        }
      }, delay);
    });

    // Schedule loop
    timerRef.current = setInterval(() => {
      if (!isPlaying) return;
      melody.forEach(([freq, duration, delay]) => {
        setTimeout(() => {
          if (isPlaying) {
            playTone(freq, duration);
          }
        }, delay);
      });
    }, loopLength);
  };

  useEffect(() => {
    if (isPlaying) {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      startSequence();
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed top-6 right-6 z-50 flex items-center gap-3">
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="hidden md:block glass-panel px-4 py-1.5 rounded-full text-xs font-medium text-rose tracking-wider glow-text uppercase"
          >
            🎵 Dreamy Music Box
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={togglePlayback}
        className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-rose hover:text-white hover:bg-rose transition-all duration-300 shadow-md focus:outline-none relative group overflow-hidden"
      >
        <span className="absolute inset-0 bg-gradient-to-tr from-pinkPrimary to-rose opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
        {isPlaying ? (
          <Volume2 className="w-5 h-5 animate-pulse" />
        ) : (
          <VolumeX className="w-5 h-5" />
        )}
      </button>
    </div>
  );
};
