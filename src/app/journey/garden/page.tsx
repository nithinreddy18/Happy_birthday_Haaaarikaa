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
    // Avoid blooming too many or clicking on buttons
    if (bloomedCount >= 5) return;
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
    };

    setFlowers((prev) => [...prev, newFlower]);
    setCurrentMessage(flowerWishes[bloomedCount]);
    setBloomedCount((prev) => prev + 1);
  };

  return (
    <div
      onClick={handleBloom}
      className="min-h-screen w-full bg-gradient-to-b from-[#4A1525] via-[#2F0B18] to-[#14030A] relative overflow-hidden flex flex-col items-center justify-between p-6 select-none cursor-crosshair"
    >
      {/* Background stars */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,143,177,0.06),transparent_70%)] pointer-events-none" />

      {/* Chapter header */}
      <div className="text-center z-10 pt-6 pointer-events-none">
        <div className="inline-flex p-3 rounded-full bg-white/5 border border-white/10 text-pinkPrimary text-xs uppercase tracking-widest gap-2 items-center mb-2">
          <Flower className="w-4 h-4" /> Chapter III
        </div>
        <h1 className="text-4xl font-playfair font-bold text-white glow-text">
          The Garden of Memories
        </h1>
        <p className="text-white/60 text-xs font-poppins tracking-wider mt-1">
          {bloomedCount} / 5 Flowers Bloomed
        </p>
      </div>

      {/* Bloomed Flowers */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <AnimatePresence>
          {flowers.map((f) => (
            <motion.div
              key={f.id}
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 15 }}
              style={{ left: f.x - 25, top: f.y - 25 }}
              className="absolute pointer-events-none"
            >
              {/* Petals */}
              <svg width="50" height="50" viewBox="0 0 50 50">
                <circle cx="25" cy="15" r="10" fill={f.color} opacity={0.85} />
                <circle cx="15" cy="25" r="10" fill={f.color} opacity={0.85} />
                <circle cx="35" cy="25" r="10" fill={f.color} opacity={0.85} />
                <circle cx="25" cy="35" r="10" fill={f.color} opacity={0.85} />
                <circle cx="25" cy="25" r="8" fill="#FFD700" />
              </svg>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Interactive text display screen */}
      <div className="w-full max-w-xl z-20 flex flex-col items-center gap-6 my-auto pt-10">
        <AnimatePresence mode="wait">
          {currentMessage && (
            <motion.div
              key={currentMessage}
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              className="w-full p-8 rounded-3xl glass-panel text-center wish-card border-white/10"
            >
              <Heart className="w-8 h-8 mx-auto mb-4 text-pinkPrimary fill-pinkPrimary/20 animate-pulse" />
              <p className="text-white text-lg font-poppins leading-relaxed font-light">
                {currentMessage}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Unlock navigation button when 5 flowers bloomed */}
        <AnimatePresence>
          {bloomedCount >= 5 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
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

      {/* Guide text */}
      <div className="z-10 pb-6 pointer-events-none">
        {bloomedCount < 5 ? (
          <p className="text-white/40 text-xs uppercase tracking-widest font-poppins">
            Tap screen to plant flowers and read wishes
          </p>
        ) : (
          <p className="text-gold glow-gold text-xs uppercase tracking-widest font-poppins animate-pulse">
            All flowers are in full bloom!
          </p>
        )}
      </div>
    </div>
  );
}
