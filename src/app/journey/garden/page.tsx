"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Flower, Sparkles, Heart } from "lucide-react";

interface BloomedFlower {
  id: number;
  x: number;
  y: number;
  color: string;
  message: string;
  rotation: number;
  scale: number;
}

export default function GardenPage() {
  const router = useRouter();
  const [flowers, setFlowers] = useState<BloomedFlower[]>([]);
  const [currentMessage, setCurrentMessage] = useState<string | null>(
    "Tap anywhere on the screen to plant a flower and bloom a secret wish... 🌸"
  );
  const [bloomedCount, setBloomedCount] = useState(0);

  const flowerWishes = [
    "Your beautiful smile has the power to brighten up the darkest room. Keep shining! ☀️",
    "You carry an infectious grace that makes the world a warmer, sweeter place. 🌸",
    "The kindness and joy you radiate is a constant inspiration to everyone around you. 💖",
    "You possess a brilliant mind and a lovely soul, a truly rare and beautiful combination. 🧠✨",
    "May this new chapter bring you endless magic, laughter, and all the love you deserve. 👑🎂",
  ];

  const colors = [
    "#FFC1E3", // Soft pink
    "#FF8FB1", // Rose
    "#FFD700", // Gold
    "#E6D6FF", // Lavender
    "#FFF9FC", // Cream
  ];

  const handleBloom = (e: React.MouseEvent<HTMLDivElement>) => {
    if (bloomedCount >= 5) return;
    
    // Avoid double clicking on UI components
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest(".wish-card")) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newFlower: BloomedFlower = {
      id: Date.now(),
      x,
      y,
      color: colors[bloomedCount % colors.length],
      message: flowerWishes[bloomedCount],
      rotation: Math.random() * 360,
      scale: 0.8 + Math.random() * 0.4,
    };

    setFlowers((prev) => [...prev, newFlower]);
    setCurrentMessage(flowerWishes[bloomedCount]);
    setBloomedCount((prev) => prev + 1);
  };

  return (
    <div
      onClick={handleBloom}
      className="min-h-screen w-full bg-gradient-to-b from-[#3a0f21] via-[#1a060f] to-[#0f0408] relative overflow-hidden flex flex-col items-center justify-between p-6 select-none cursor-crosshair"
    >
      {/* Narrative Progress Header */}
      <div className="fixed top-6 left-6 right-6 z-40 flex justify-center pointer-events-none">
        <div className="glass-panel px-6 py-3 rounded-full flex items-center gap-4 text-xs font-poppins tracking-wider border-white/5 shadow-lg">
          <span className="text-white/40">Forest</span>
          <span className="text-white/20">➔</span>
          <span className="text-pinkPrimary font-semibold glow-text">✿ Garden</span>
          <span className="text-white/20">➔</span>
          <span className="text-white/40">Wish</span>
        </div>
      </div>

      {/* Background soft lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,143,177,0.06),transparent_70%)] pointer-events-none" />

      {/* Chapter header */}
      <div className="text-center z-10 pt-20 pointer-events-none">
        <div className="inline-flex p-3 rounded-full bg-white/5 border border-white/10 text-pinkPrimary text-xs uppercase tracking-widest gap-2 items-center mb-2">
          <Flower className="w-4 h-4 animate-spin" style={{ animationDuration: "8s" }} /> Chapter III
        </div>
        <h1 className="text-4xl font-cormorant font-bold text-white glow-text">
          The Garden of Memories
        </h1>
        
        {/* Glowing timeline dot indicator [✿ ✿ ✿ ❀ ❀] */}
        <div className="flex justify-center gap-2 mt-4 text-lg">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={`transition-all duration-500 ${
                i < bloomedCount
                  ? "text-pinkPrimary scale-110 drop-shadow-[0_0_8px_rgba(255,143,177,0.8)]"
                  : "text-white/20"
              }`}
            >
              ✿
            </span>
          ))}
        </div>
      </div>

      {/* Bloomed Flowers (Interactive visual petals) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <AnimatePresence>
          {flowers.map((f) => (
            <motion.div
              key={f.id}
              initial={{ scale: 0, rotate: f.rotation - 45 }}
              animate={{ scale: f.scale, rotate: f.rotation }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 12 }}
              style={{ left: f.x - 30, top: f.y - 30 }}
              className="absolute pointer-events-none"
            >
              {/* Upgraded stylized Multi-Petal Flower SVG */}
              <svg width="60" height="60" viewBox="0 0 60 60" className="drop-shadow-[0_0_12px_rgba(255,143,177,0.4)]">
                {/* 5 Petals */}
                <g fill={f.color} opacity={0.9}>
                  <circle cx="30" cy="16" r="11" />
                  <circle cx="17" cy="25" r="11" />
                  <circle cx="43" cy="25" r="11" />
                  <circle cx="22" cy="39" r="11" />
                  <circle cx="38" cy="39" r="11" />
                </g>
                {/* Flower center */}
                <circle cx="30" cy="30" r="7" fill="#FFD700" className="animate-pulse" />
              </svg>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Dynamic text card */}
      <div className="w-full max-w-xl z-20 flex flex-col items-center gap-6 my-auto pt-10">
        <AnimatePresence mode="wait">
          {currentMessage && (
            <motion.div
              key={currentMessage}
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              className="w-full p-8 rounded-3xl glass-panel text-center wish-card gold-border"
            >
              <Heart className="w-8 h-8 mx-auto mb-4 text-pinkPrimary fill-pinkPrimary/20 animate-pulse" />
              <p className="text-white text-lg font-poppins leading-relaxed font-light">
                {currentMessage}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reach for the Stars navigation button */}
        <AnimatePresence>
          {bloomedCount >= 5 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="w-full flex justify-center mt-2"
            >
              <Button
                onClick={() => router.push("/journey/wish")}
                className="px-8 py-4 font-semibold tracking-wider flex items-center justify-center gap-2"
              >
                Reach for the Stars <Sparkles className="w-4 h-4 fill-white animate-pulse" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Guidance instructions */}
      <div className="z-10 pb-10 pointer-events-none">
        {bloomedCount < 5 ? (
          <p className="text-white/40 text-[10px] uppercase tracking-[0.25em] font-poppins">
            Tap screen to plant flowers and read wishes
          </p>
        ) : (
          <p className="text-gold glow-gold text-[10px] uppercase tracking-[0.25em] font-poppins animate-pulse">
            All flowers are in full bloom!
          </p>
        )}
      </div>
    </div>
  );
}
