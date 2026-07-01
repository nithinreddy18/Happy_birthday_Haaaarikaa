"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { MagicalPortal } from "../ui/MagicalPortal";
import { Button } from "../ui/Button";
import { Sparkles, Heart, ChevronRight, Lock } from "lucide-react";

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
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05, y: -20 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md p-10 rounded-3xl glass-panel gold-border text-center relative overflow-hidden"
          >
            {/* Ambient decorative glowing particles inside card */}
            <div className="absolute -top-12 -left-12 w-28 h-28 rounded-full bg-pinkPrimary opacity-20 blur-3xl pointer-events-none animate-pulse-slow" />
            <div className="absolute -bottom-12 -right-12 w-28 h-28 rounded-full bg-gold opacity-15 blur-3xl pointer-events-none animate-pulse-slow" />

            {/* Glowing lock icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
              className="inline-flex p-4 rounded-full bg-white/5 border border-white/10 mb-6 text-pinkPrimary shadow-[0_0_15px_rgba(255,193,227,0.2)]"
            >
              <Lock className="w-6 h-6 stroke-pinkPrimary" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-cormorant font-bold text-white tracking-wider mb-2"
            >
              The Magical Portal
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-pinkPrimary/85 font-poppins text-[10px] uppercase tracking-[0.25em] mb-8"
            >
              Made specially for Harika
            </motion.p>

            <form onSubmit={handleUnlock} className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Password hint: The Birthday Princess 🌸"
                  className={`w-full px-6 py-4 rounded-full bg-white/5 border text-center text-white placeholder-white/40 focus:outline-none focus:bg-white/10 focus:ring-2 focus:ring-pinkPrimary/50 transition-all duration-300 font-poppins text-sm ${
                    showError
                      ? "border-red-400 focus:border-red-400 shake animate-headShake"
                      : "border-white/15 focus:border-pinkPrimary/80"
                  }`}
                />
                
                {/* Visual help text so the user can easily proceed */}
                <p className="text-white/40 text-[10px] font-poppins mt-3 tracking-wide">
                  Hint: Her beautiful name is the key (e.g. &quot;Harika&quot;) 🔑
                </p>

                <AnimatePresence>
                  {showError && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-red-300 text-xs mt-2 font-poppins"
                    >
                      Incorrect key. Try &quot;Harika&quot;! 🌸
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex flex-col gap-4 pt-2">
                <Button 
                  type="submit" 
                  className="w-full py-4 text-sm font-semibold tracking-wider flex items-center justify-center gap-2 bg-gradient-to-r from-pinkPrimary to-rose border border-white/20 hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200"
                >
                  Unlock the Magic <Sparkles className="w-4 h-4 fill-white animate-pulse" />
                </Button>

                <button
                  type="button"
                  onClick={() => router.push("/journey/forest")}
                  className="text-white/40 hover:text-white text-xs tracking-wider transition-colors duration-200 py-2 inline-flex items-center justify-center gap-1.5 font-poppins"
                >
                  Skip direct to portal <ChevronRight className="w-4 h-4" />
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
              transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
              className="w-20 h-20 border-4 border-t-pinkPrimary border-r-gold border-b-rose border-l-transparent rounded-full mx-auto mb-6 shadow-[0_0_25px_rgba(255,143,177,0.4)]"
            />
            <h2 className="text-3xl md:text-5xl font-cormorant font-bold text-white tracking-widest glow-gold animate-pulse">
              WELCOME PRINCESS... 👑
            </h2>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
