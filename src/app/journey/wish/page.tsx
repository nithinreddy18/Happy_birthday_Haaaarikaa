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
    for (let i = 0; i < 80; i++) {
      list.push({
        id: i,
        x: 0,
        y: 0,
        color: colors[Math.floor(Math.random() * colors.length)],
        angle: Math.random() * Math.PI * 2,
        speed: 3 + Math.random() * 8,
      });
    }
    setConfetti(list);
  };

  const handleOpenGift = () => {
    setIsOpened(true);
    triggerConfetti();
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#14030A] via-[#2F0B18] to-[#0A0205] relative overflow-hidden flex flex-col items-center justify-center p-6 select-none">
      {/* Falling stars background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,215,0,0.06),transparent_60%)] pointer-events-none" />

      {/* Confetti canvas */}
      <AnimatePresence>
        {isOpened && confetti.map((p) => (
          <motion.div
            key={p.id}
            initial={{ x: 0, y: 100, scale: 1, opacity: 1 }}
            animate={{
              x: Math.cos(p.angle) * p.speed * 80,
              y: Math.sin(p.angle) * p.speed * 80 - 150,
              scale: 0.2,
              opacity: 0,
              rotate: 360,
            }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              position: "absolute",
              width: 10,
              height: 10,
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
            className="text-center max-w-md"
          >
            <div className="inline-flex p-3 rounded-full bg-white/5 border border-white/10 text-pinkPrimary text-xs uppercase tracking-widest gap-2 items-center mb-6">
              <Gift className="w-4 h-4 animate-bounce" /> Chapter IV
            </div>
            
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-4 glow-text">
              The Celestial Wish
            </h1>
            
            <p className="text-white/60 text-sm font-poppins mb-8 leading-relaxed">
              Tap the golden gift box below to unlock the final birthday message woven from stardust... 🌟
            </p>

            <GiftBox3D onOpen={handleOpenGift} />
          </motion.div>
        ) : (
          <motion.div
            key="opened"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.2 }}
            className="w-full max-w-2xl p-8 md:p-12 rounded-3xl glass-panel text-center relative border-white/15 z-20 my-10"
          >
            {/* Soft decorative blur circles */}
            <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-pinkPrimary opacity-20 blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-gold opacity-15 blur-3xl pointer-events-none" />

            <div className="inline-flex p-3 rounded-full bg-white/30 border border-white/20 mb-6 text-pinkPrimary animate-bounce">
              <Heart className="w-8 h-8 fill-pinkPrimary stroke-rose" />
            </div>

            <h2 className="text-4xl md:text-6xl font-playfair font-bold text-white mb-6 tracking-wide glow-text leading-tight">
              Happy Birthday, <br />
              <span className="text-pinkPrimary">Harika</span>! 🌸
            </h2>

            <div className="space-y-6 text-white/95 font-cormorant text-xl md:text-2xl leading-relaxed max-w-xl mx-auto font-light text-center">
              <p>
                In a universe of billions of stars, your light shines the brightest. 
                Your gentle smile, beautiful laughter, and incredibly warm heart bring joy to everyone who is lucky enough to walk alongside you.
              </p>
              <p>
                As the stars align tonight, remember that you are capable of achieving everything your heart desires. 
                May this year ahead be filled with magical moments, boundless love, and dreams that come to life.
              </p>
              <p className="font-playfair text-pinkPrimary glow-text pt-4">
                You are loved, celebrated, and cherished today and always. 👑💖
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
              <Button
                onClick={() => {
                  setIsOpened(false);
                  triggerConfetti();
                }}
                className="px-8 py-4 font-semibold tracking-wider flex items-center justify-center gap-2 bg-gradient-to-r from-[#2F0B18] to-[#4A1525]"
              >
                Spark Confetti <Sparkles className="w-4 h-4 fill-white" />
              </Button>

              <button
                onClick={() => router.push("/")}
                className="px-8 py-4 rounded-full border border-white/35 text-white font-poppins hover:bg-white/10 hover:border-white transition-all duration-300 flex items-center justify-center gap-2"
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
