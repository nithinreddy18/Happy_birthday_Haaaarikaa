"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { GiftBox3D } from "@/components/ui/GiftBox3D";
import { Button } from "@/components/ui/Button";
import { Sparkles, Gift, Heart, RotateCcw } from "lucide-react";

interface ConfettiParticle {
  id: number;
  x: number;
  y: number;
  color: string;
  angle: number;
  speed: number;
}

export default function WishPage() {
  const router = useRouter();
  const [isOpened, setIsOpened] = useState(false);
  const [confetti, setConfetti] = useState<ConfettiParticle[]>([]);

  const colors = ["#FFC1E3", "#FF8FB1", "#FFD700", "#E6D6FF", "#FFF9FC"];

  const triggerConfetti = () => {
    const list: ConfettiParticle[] = [];
    for (let i = 0; i < 90; i++) {
      list.push({
        id: i,
        x: 0,
        y: 0,
        color: colors[Math.floor(Math.random() * colors.length)],
        angle: Math.random() * Math.PI * 2,
        speed: 4 + Math.random() * 9,
      });
    }
    setConfetti(list);
  };

  const handleOpenGift = () => {
    setIsOpened(true);
    triggerConfetti();
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#0A0205] via-[#1a060f] to-[#040102] relative overflow-hidden flex flex-col items-center justify-center p-6 select-none">
      {/* Narrative Progress Header */}
      <div className="fixed top-6 left-6 right-6 z-40 flex justify-center pointer-events-none">
        <div className="glass-panel px-6 py-3 rounded-full flex items-center gap-4 text-xs font-poppins tracking-wider border-white/5 shadow-lg">
          <span className="text-white/40">Forest</span>
          <span className="text-white/20">➔</span>
          <span className="text-white/40">Garden</span>
          <span className="text-white/20">➔</span>
          <span className="text-pinkPrimary font-semibold glow-text">✿ Wish</span>
        </div>
      </div>

      {/* Cosmic Nebula Aura behind content */}
      <div className="absolute w-[500px] h-[500px] rounded-full nebula-glow pointer-events-none -z-10" />

      {/* Confetti canvas particles */}
      <AnimatePresence>
        {isOpened && confetti.map((p) => (
          <motion.div
            key={p.id}
            initial={{ x: 0, y: 100, scale: 1, opacity: 1 }}
            animate={{
              x: Math.cos(p.angle) * p.speed * 85,
              y: Math.sin(p.angle) * p.speed * 85 - 180,
              scale: 0.15,
              opacity: 0,
              rotate: 360,
            }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            style={{
              position: "absolute",
              width: 8,
              height: 8,
              borderRadius: Math.random() > 0.5 ? "50%" : "0%",
              backgroundColor: p.color,
              zIndex: 30,
            }}
          />
        ))}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.div
            key="unopened"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            className="text-center max-w-md mt-16"
          >
            <div className="inline-flex p-3 rounded-full bg-white/5 border border-white/10 text-pinkPrimary text-xs uppercase tracking-widest gap-2 items-center mb-6">
              <Gift className="w-4 h-4 animate-bounce" /> Chapter IV
            </div>
            
            <h1 className="text-4xl md:text-5xl font-cormorant font-bold text-white mb-4 glow-text">
              The Celestial Wish
            </h1>
            
            <p className="text-white/70 text-sm font-poppins mb-8 leading-relaxed max-w-xs mx-auto">
              Tap the magical floating gift box to unbox your final birthday letter... 🎁✨
            </p>

            <div className="relative flex items-center justify-center">
              {/* Rotating golden light glow behind the gift box */}
              <div className="absolute w-64 h-64 bg-gold/15 rounded-full filter blur-2xl animate-pulse-slow" />
              <GiftBox3D onOpen={handleOpenGift} />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="opened"
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 90, damping: 14, delay: 0.1 }}
            className="w-full max-w-2xl p-10 md:p-14 rounded-3xl glass-panel text-center relative gold-border z-20 my-16 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          >
            {/* Elegant ornamental corner details */}
            <div className="absolute top-4 left-4 text-gold/30 text-xl font-serif">✥</div>
            <div className="absolute top-4 right-4 text-gold/30 text-xl font-serif">✥</div>
            <div className="absolute bottom-4 left-4 text-gold/30 text-xl font-serif">✥</div>
            <div className="absolute bottom-4 right-4 text-gold/30 text-xl font-serif">✥</div>

            <div className="inline-flex p-4 rounded-full bg-white/5 border border-white/10 mb-6 text-pinkPrimary animate-bounce">
              <Heart className="w-6 h-6 fill-pinkPrimary stroke-rose" />
            </div>

            <h2 className="text-4xl md:text-6xl font-cormorant font-bold text-white mb-8 tracking-wider leading-tight">
              Happy Birthday, <br />
              <span className="text-pinkPrimary glow-text">Harika</span>! 🌸
            </h2>

            <div className="space-y-6 text-white/90 font-cormorant text-xl md:text-2xl leading-relaxed max-w-xl mx-auto font-light text-center">
              <p>
                In a universe of billions of stars, your light shines the brightest. 
                Your gentle smile, beautiful laughter, and warm heart bring joy to everyone who is lucky enough to walk alongside you.
              </p>
              <p>
                As the stars align tonight, remember that you are capable of achieving everything your heart desires. 
                May this year ahead be filled with magical moments, boundless love, and dreams that come to life.
              </p>
              <p className="font-playfair text-gold glow-gold pt-4 tracking-wider">
                You are loved, celebrated, and cherished today and always. 👑💖
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
              <Button
                onClick={() => {
                  triggerConfetti();
                }}
                className="px-8 py-4 font-semibold tracking-wider flex items-center justify-center gap-2 bg-gradient-to-r from-[#2F0B18] to-[#4A1525] hover:scale-[1.02] active:scale-[0.98] transition-transform"
              >
                Spark Confetti <Sparkles className="w-4 h-4 fill-white animate-pulse" />
              </Button>

              <button
                onClick={() => router.push("/")}
                className="px-8 py-4 rounded-full border border-white/20 text-white font-poppins hover:bg-white/5 hover:border-white/50 transition-all duration-300 flex items-center justify-center gap-2 text-sm tracking-wide"
              >
                Relive the Magic <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
