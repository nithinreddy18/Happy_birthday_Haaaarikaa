"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { MagicalPortal } from "../ui/MagicalPortal";
import { Button } from "../ui/Button";
import { Sparkles, Heart, ChevronRight } from "lucide-react";

export const Landing: React.FC = () => {
  const router = useRouter();
  const [passcode, setPasscode] = useState("");
  const [showError, setShowError] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPasscode = passcode.trim().toLowerCase();
    if (cleanPasscode === "harika" || cleanPasscode === "princess") {
      setIsUnlocked(true);
      setTimeout(() => {
        router.push("/journey/forest");
      }, 1200);
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
    }
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 select-none">
      {/* Three.js interactive portal canvas backdrop */}
      <MagicalPortal />

      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <motion.div
            key="portal-card"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05, y: -30 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full max-w-md p-8 rounded-3xl glass-panel text-center relative overflow-hidden"
          >
            {/* Ambient decorative glowing particles inside card */}
            <div className="absolute -top-12 -left-12 w-24 h-24 rounded-full bg-pinkPrimary opacity-30 blur-2xl pointer-events-none animate-pulse-slow" />
            <div className="absolute -bottom-12 -right-12 w-24 h-24 rounded-full bg-gold opacity-25 blur-2xl pointer-events-none animate-pulse-slow" />

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
              className="inline-flex p-3 rounded-full bg-white/30 border border-white/20 mb-6 text-pinkPrimary animate-bounce"
            >
              <Heart className="w-8 h-8 fill-pinkPrimary stroke-rose" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl md:text-5xl font-playfair font-bold text-white tracking-wide glow-text mb-2"
            >
              For Harika 🌸
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-white/80 font-poppins text-xs uppercase tracking-widest mb-8"
            >
              Enter the Magical Kingdom
            </motion.p>

            <form onSubmit={handleUnlock} className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Who is the birthday princess? 😊"
                  className={`w-full px-5 py-4 rounded-full bg-white/10 border-2 text-center text-white placeholder-white/50 focus:outline-none focus:bg-white/15 transition-all duration-300 ${
                    showError
                      ? "border-red-400 focus:border-red-400 shake animate-headShake"
                      : "border-white/20 focus:border-pinkPrimary"
                  }`}
                />
                <AnimatePresence>
                  {showError && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-red-300 text-xs mt-2"
                    >
                      Hint: Her name starts with H... 🌸
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full py-4 text-sm font-semibold tracking-wider flex items-center justify-center gap-2">
                  Unlock the Magic <Sparkles className="w-4 h-4 fill-white animate-pulse" />
                </Button>

                <button
                  type="button"
                  onClick={() => router.push("/journey/forest")}
                  className="text-white/60 hover:text-white text-xs tracking-wider transition-colors duration-200 py-2 inline-flex items-center justify-center gap-1"
                >
                  Skip direct to portal <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="portal-unlocked"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center z-10"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, ease: "linear", repeat: Infinity }}
              className="w-16 h-16 border-4 border-t-pinkPrimary border-r-gold border-b-rose border-l-transparent rounded-full mx-auto mb-6 shadow-lg"
            />
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white tracking-widest glow-gold animate-pulse">
              WELCOME PRINCESS... 👑
            </h2>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
