"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Compass, Wind, Sparkles, ChevronDown } from "lucide-react";

// Beautiful SVG butterfly template with flutter animation
const Butterfly: React.FC<{ index: number; mouseX: any; mouseY: any }> = ({ index, mouseX, mouseY }) => {
  const x = useSpring(useMotionValue(Math.random() * 800 - 400), { damping: 25, stiffness: 60 });
  const y = useSpring(useMotionValue(Math.random() * 600 - 300), { damping: 25, stiffness: 60 });
  const scale = useMemo(() => 0.4 + Math.random() * 0.4, []);
  
  // Custom flutter speed
  const duration = useMemo(() => 0.5 + Math.random() * 0.5, []);

  useEffect(() => {
    // Periodically drift towards mouse or float randomly
    const interval = setInterval(() => {
      const targetX = mouseX.get() + (Math.random() - 0.5) * 250;
      const targetY = mouseY.get() + (Math.random() - 0.5) * 250;
      x.set(targetX);
      y.set(targetY);
    }, 1500 + Math.random() * 1000);

    return () => clearInterval(interval);
  }, [mouseX, mouseY, x, y]);

  return (
    <motion.div
      style={{ x, y, scale }}
      className="absolute pointer-events-none select-none z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.8, 0.8, 0] }}
      transition={{ repeat: Infinity, duration: 12, delay: index * 0.8 }}
    >
      <svg
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
        className="transform origin-center"
      >
        <motion.path
          d="M25 25C15 15 5 18 5 25C5 32 15 35 25 25Z"
          fill="#FF8FB1"
          opacity={0.8}
          animate={{ scaleX: [1, 0.2, 1] }}
          transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M25 25C35 15 45 18 45 25C45 32 35 35 25 25Z"
          fill="#FFC1E3"
          opacity={0.8}
          animate={{ scaleX: [1, 0.2, 1] }}
          transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
        />
        <circle cx="25" cy="25" r="2" fill="#FFD700" />
      </svg>
    </motion.div>
  );
};

export default function ForestPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse tracking for butterflies to swarm
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      rawMouseX.set(e.clientX - rect.left - rect.width / 2);
      rawMouseY.set(e.clientY - rect.top - rect.height / 2);
    }
  };

  const textSections = [
    {
      title: "The Forest of Dreams 🌲",
      content: "This path was woven from the softest dreams. As you walk through, let the whispers of the wind remind you how truly special you are.",
    },
    {
      title: "A Heart Full of Sunshine ☀️",
      content: "Just like the butterflies that follow the light, everyone who meets you is drawn to your warmth, your laughter, and your kind, sparkling soul.",
    },
    {
      title: "Blooming with Grace 🌸",
      content: "May this year bring you closer to all your wishes. The forest is preparing a beautiful path for the steps ahead.",
    },
  ];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="min-h-[250vh] w-full bg-gradient-to-b from-[#0f0408] via-[#240a15] to-[#3a0f21] relative overflow-hidden"
    >
      {/* Narrative Progress Header */}
      <div className="fixed top-6 left-6 right-6 z-40 flex justify-center pointer-events-none">
        <div className="glass-panel px-6 py-3 rounded-full flex items-center gap-4 text-xs font-poppins tracking-wider border-white/5 shadow-lg">
          <span className="text-pinkPrimary font-semibold glow-text">✿ Forest</span>
          <span className="text-white/20">➔</span>
          <span className="text-white/40">Garden</span>
          <span className="text-white/20">➔</span>
          <span className="text-white/40">Wish</span>
        </div>
      </div>

      {/* Stars and light beams in background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,143,177,0.08),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(212,175,55,0.04),transparent_50%)] pointer-events-none" />

      {/* Floating swarm of butterflies */}
      {Array.from({ length: 18 }).map((_, i) => (
        <Butterfly key={i} index={i} mouseX={rawMouseX} mouseY={rawMouseY} />
      ))}

      {/* Narrative sections */}
      <div className="max-w-3xl mx-auto px-6 py-20 flex flex-col justify-between min-h-screen">
        {/* Intro */}
        <div className="min-h-screen flex flex-col justify-center items-center text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="mb-4 inline-flex p-3 rounded-full bg-white/5 border border-white/10 text-pinkPrimary text-xs uppercase tracking-widest gap-2 items-center"
          >
            <Wind className="w-4 h-4 animate-pulse" /> Chapter II
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-5xl md:text-7xl font-cormorant font-bold text-white mb-6 glow-text"
          >
            The Whispering Forest
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-white/70 text-sm max-w-md tracking-wider font-poppins leading-relaxed mb-12"
          >
            Scroll down slowly to read the wind's message, and let the glowing butterflies guide your path...
          </motion.p>

          {/* Bouncing Scroll Guide */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute bottom-10 flex flex-col items-center gap-2 cursor-pointer pointer-events-auto"
            onClick={() => window.scrollTo({ top: window.innerHeight * 0.85, behavior: "smooth" })}
          >
            <span className="text-[10px] text-pinkPrimary/60 uppercase tracking-[0.2em] font-poppins">Scroll Down</span>
            <ChevronDown className="w-5 h-5 text-pinkPrimary/80" />
          </motion.div>
        </div>

        {/* Scroll cards */}
        <div className="space-y-48 my-40">
          {textSections.map((sec, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="p-10 rounded-3xl glass-panel-dark gold-border text-center"
            >
              <h2 className="text-3xl md:text-4xl font-cormorant text-pinkPrimary glow-text font-bold mb-6">
                {sec.title}
              </h2>
              <p className="text-white/90 font-poppins text-base md:text-lg leading-relaxed max-w-xl mx-auto font-light">
                {sec.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Outro & Next Button */}
        <div className="min-h-screen flex flex-col justify-center items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-panel p-10 rounded-3xl w-full max-w-lg gold-border"
          >
            <Compass className="w-12 h-12 text-gold mx-auto mb-6 animate-spin" style={{ animationDuration: "16s" }} />
            <h3 className="text-3xl font-cormorant font-bold text-white mb-4">
              Step Into the Light
            </h3>
            <p className="text-white/70 text-sm font-poppins mb-8 leading-relaxed">
              The butterflies are resting. Ahead lies a glowing garden where magic blooms at the touch of your hands.
            </p>
            <Button
              onClick={() => router.push("/journey/garden")}
              className="px-8 py-4 font-semibold tracking-wider flex items-center justify-center gap-2 mx-auto"
            >
              Enter the Garden <Sparkles className="w-4 h-4 fill-white animate-pulse" />
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
