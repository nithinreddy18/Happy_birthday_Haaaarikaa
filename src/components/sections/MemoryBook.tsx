"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MagicalPortal } from "../ui/MagicalPortal";
import { Button } from "../ui/Button";
import { GiftBox3D } from "../ui/GiftBox3D";
import { Heart, Sparkles, ChevronDown, RotateCcw, BookOpen, Compass, Gift } from "lucide-react";
import Image from "next/image";

interface BloomedFlower {
  id: number;
  x: number;
  y: number;
  color: string;
  message: string;
  rotation: number;
  scale: number;
}

interface ConfettiParticle {
  id: number;
  x: number;
  y: number;
  color: string;
  angle: number;
  speed: number;
}

export const MemoryBook: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [flowers, setFlowers] = useState<BloomedFlower[]>([]);
  const [currentFlowerMsg, setCurrentFlowerMsg] = useState<string | null>(
    "Tap anywhere on the paper to plant a flower and bloom a sweet memory... 🌸"
  );
  const [bloomedCount, setBloomedCount] = useState(0);

  const [isOpened, setIsOpened] = useState(false);
  const [confetti, setConfetti] = useState<ConfettiParticle[]>([]);

  const colors = ["#FFC1E3", "#FF8FB1", "#FFD700", "#E6D6FF", "#FFF9FC"];
  
  const flowerWishes = [
    "Our cozy coffee dates filled with endless conversations and laughter. ☕",
    "Walking hand in hand through the beautiful botanical gardens. 🌸",
    "Watching the sunset paint the sky at the beach while sitting on our picnic blanket. 🌅",
    "The way your eyes light up whenever we share inside jokes. 💖",
    "Looking forward to creating a lifetime of more beautiful memories together. 👑✨",
  ];

  const handleBloom = (e: React.MouseEvent<HTMLDivElement>) => {
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
      rotation: Math.random() * 360,
      scale: 0.8 + Math.random() * 0.4,
    };

    setFlowers((prev) => [...prev, newFlower]);
    setCurrentFlowerMsg(flowerWishes[bloomedCount]);
    setBloomedCount((prev) => prev + 1);
  };

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

  const scrollToSection = (index: number) => {
    if (containerRef.current) {
      const sections = containerRef.current.querySelectorAll(".scroll-section");
      if (sections[index]) {
        sections[index].scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div ref={containerRef} className="scroll-container w-full relative">
      
      {/* SECTION 1: THE COVER PAGE */}
      <section className="scroll-section w-full flex flex-col items-center justify-center relative px-6 bg-[#0f0408]">
        <MagicalPortal />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-xl p-8 rounded-3xl glass-panel gold-border text-center flex flex-col items-center relative overflow-hidden"
        >
          <div className="absolute -top-16 -left-16 w-32 h-32 rounded-full bg-pinkPrimary opacity-20 blur-3xl pointer-events-none animate-pulse-slow" />
          
          <div className="relative w-48 h-64 shadow-[0_15px_35px_rgba(0,0,0,0.5)] rounded-lg overflow-hidden border border-white/10 mb-8 animate-float">
            <Image
              src="/cover.png"
              alt="Memory Book Cover"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/25 flex flex-col items-center justify-center p-4 text-center">
              <span className="text-gold text-[10px] uppercase tracking-[0.2em] font-poppins font-semibold mb-2">
                Chapter I
              </span>
              <h2 className="text-2xl font-cormorant font-bold text-white leading-tight glow-text">
                Book of <br /> Memories
              </h2>
              <div className="w-8 h-px bg-gold/50 my-3" />
              <p className="text-white/80 font-cormorant italic text-[11px]">
                For Harika 🌸
              </p>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-cormorant font-bold text-white tracking-wide glow-text mb-3">
            Harika&apos;s Memory Book
          </h1>
          
          <p className="text-white/60 font-poppins text-xs uppercase tracking-[0.2em] mb-8">
            An Interactive Journey of Us
          </p>

          <Button
            onClick={() => scrollToSection(1)}
            className="px-8 py-4 font-semibold tracking-wider flex items-center justify-center gap-2 group"
          >
            Open Book <BookOpen className="w-4 h-4 transition-transform group-hover:scale-110" />
          </Button>
        </motion.div>
      </section>

      {/* SECTION 2: THE DIARY (HOW WE MET / FIRST BLOSSOM) */}
      <section className="scroll-section w-full flex flex-col items-center justify-center relative px-6 bg-gradient-to-b from-[#0f0408] via-[#1d0812] to-[#2b0b1a]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,143,177,0.05),transparent_50%)] pointer-events-none" />
        
        <div className="max-w-5xl w-full flex flex-col lg:flex-row items-center gap-12 z-10 py-16">
          
          {/* Polaroid container left */}
          <motion.div
            initial={{ opacity: 0, rotate: -6, x: -30 }}
            whileInView={{ opacity: 1, rotate: -2, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="polaroid w-full max-w-sm flex-shrink-0"
          >
            <div className="relative w-full aspect-square bg-[#eaeaea] rounded-sm overflow-hidden">
              <Image
                src="/garden_roses.png"
                alt="Our First Date Roses"
                fill
                className="object-cover"
              />
            </div>
            <p className="polaroid-caption">Where Our Story Began... 🌸</p>
          </motion.div>

          {/* Diary entries right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="glass-panel p-8 md:p-10 rounded-3xl w-full gold-border"
          >
            <span className="text-pinkPrimary text-xs font-poppins uppercase tracking-widest mb-2 block">
              Chapter II • The First Blossom
            </span>
            <h2 className="text-3xl md:text-4xl font-cormorant font-bold text-white mb-6 glow-text">
              The Journey of You &amp; Me
            </h2>
            <div className="space-y-6 text-white/80 font-poppins text-sm md:text-base leading-relaxed font-light">
              <p>
                Every story has a beginning, but ours feels like it was written in the stars. 
                From the very first moment we started talking, the world became a warmer, brighter, and much more beautiful place.
              </p>
              <p>
                This space serves as a custom digital canvas of all the little details, laughter, and milestones we shared. 
                Thank you for being the most supportive, wonderful, and caring person.
              </p>
            </div>

            <button
              onClick={() => scrollToSection(2)}
              className="text-pinkPrimary/80 hover:text-pinkPrimary text-xs font-poppins tracking-wider font-semibold mt-8 inline-flex items-center gap-2 transition-colors duration-200"
            >
              Explore Our Adventures <ChevronDown className="w-4 h-4 animate-bounce" />
            </button>
          </motion.div>

        </div>
      </section>

      {/* SECTION 3: PLACES WE EXPLORED */}
      <section className="scroll-section w-full flex flex-col items-center justify-center relative px-6 bg-gradient-to-b from-[#2b0b1a] via-[#3a0e23] to-[#4c122e]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(212,175,55,0.03),transparent_50%)] pointer-events-none" />
        
        <div className="max-w-5xl w-full flex flex-col items-center z-10 py-16 text-center">
          <span className="text-pinkPrimary text-xs font-poppins uppercase tracking-widest mb-2 block">
            Chapter III • Places We Went
          </span>
          <h2 className="text-4xl font-cormorant font-bold text-white mb-10 glow-text">
            Our Adventures Together
          </h2>

          <div className="flex flex-col md:flex-row justify-center gap-12 w-full mt-4">
            
            {/* Polaroid 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: -4 }}
              whileInView={{ opacity: 1, y: 0, rotate: -2 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="polaroid w-full max-w-sm"
            >
              <div className="relative w-full aspect-square bg-[#eaeaea] rounded-sm overflow-hidden">
                <Image
                  src="/coffee_date.png"
                  alt="Cozy Coffee Date"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="polaroid-caption">Cozy Days &amp; Laughter ☕</p>
            </motion.div>

            {/* Polaroid 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: 4 }}
              whileInView={{ opacity: 1, y: 0, rotate: 2 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="polaroid w-full max-w-sm"
            >
              <div className="relative w-full aspect-square bg-[#eaeaea] rounded-sm overflow-hidden">
                <Image
                  src="/sunset_beach.png"
                  alt="Sunset Beach Picnic"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="polaroid-caption">Sunset beach walk scenery 🌅</p>
            </motion.div>

          </div>

          <Button
            onClick={() => scrollToSection(3)}
            className="px-8 py-4 font-semibold tracking-wider flex items-center justify-center gap-2 mt-12"
          >
            Plant a Blossom <ChevronDown className="w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* SECTION 4: FLOWER COMPLIMENTS (MEMORIES CLICKS) */}
      <section
        onClick={handleBloom}
        className="scroll-section w-full flex flex-col items-center justify-between relative px-6 bg-gradient-to-b from-[#4c122e] via-[#2f0b1a] to-[#14030a] cursor-crosshair select-none"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,143,177,0.05),transparent_60%)] pointer-events-none" />

        {/* Chapter header */}
        <div className="text-center z-10 pt-20 pointer-events-none">
          <div className="inline-flex p-3 rounded-full bg-white/5 border border-white/10 text-pinkPrimary text-xs uppercase tracking-widest gap-2 items-center mb-2">
            <Compass className="w-4 h-4 animate-spin" style={{ animationDuration: "12s" }} /> Chapter IV
          </div>
          <h2 className="text-4xl font-cormorant font-bold text-white glow-text">
            Garden of Little Things
          </h2>
          
          {/* Timeline flower dots */}
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

        {/* Spawning flowers */}
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
                <svg width="60" height="60" viewBox="0 0 60 60" className="drop-shadow-[0_0_12px_rgba(255,143,177,0.45)]">
                  <g fill={f.color} opacity={0.95}>
                    <circle cx="30" cy="16" r="11" />
                    <circle cx="17" cy="25" r="11" />
                    <circle cx="43" cy="25" r="11" />
                    <circle cx="22" cy="39" r="11" />
                    <circle cx="38" cy="39" r="11" />
                  </g>
                  <circle cx="30" cy="30" r="7" fill="#FFD700" />
                </svg>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Narrative wish card */}
        <div className="w-full max-w-xl z-20 flex flex-col items-center gap-6 my-auto pt-10">
          <AnimatePresence mode="wait">
            {currentFlowerMsg && (
              <motion.div
                key={currentFlowerMsg}
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.98 }}
                className="w-full p-8 rounded-3xl glass-panel text-center wish-card gold-border"
              >
                <Heart className="w-8 h-8 mx-auto mb-4 text-pinkPrimary fill-pinkPrimary/20 animate-pulse" />
                <p className="text-white text-lg font-poppins leading-relaxed font-light">
                  {currentFlowerMsg}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {bloomedCount >= 5 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="w-full flex justify-center"
              >
                <Button
                  onClick={() => scrollToSection(4)}
                  className="px-8 py-4 font-semibold tracking-wider flex items-center justify-center gap-2"
                >
                  Unveil final chapter <ChevronDown className="w-4 h-4" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="z-10 pb-8 pointer-events-none">
          {bloomedCount < 5 ? (
            <p className="text-white/40 text-[10px] uppercase tracking-[0.25em] font-poppins">
              Tap the page paper to plant memories ({bloomedCount}/5)
            </p>
          ) : (
            <p className="text-gold glow-gold text-[10px] uppercase tracking-[0.25em] font-poppins animate-pulse">
              Memories fully aligned!
            </p>
          )}
        </div>
      </section>

      {/* SECTION 5: CELESTIAL UNBOXING & LETTER */}
      <section className="scroll-section w-full flex flex-col items-center justify-center relative px-6 bg-[#040102]">
        <div className="absolute w-[500px] h-[500px] rounded-full nebula-glow pointer-events-none -z-10" />

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
              className="text-center max-w-md"
            >
              <div className="inline-flex p-3 rounded-full bg-white/5 border border-white/10 text-pinkPrimary text-xs uppercase tracking-widest gap-2 items-center mb-6">
                <Gift className="w-4 h-4 animate-bounce" /> Chapter V
              </div>
              
              <h1 className="text-4xl md:text-5xl font-cormorant font-bold text-white mb-4 glow-text">
                The Final Wish
              </h1>
              
              <p className="text-white/70 text-sm font-poppins mb-8 leading-relaxed max-w-xs mx-auto">
                Tap the golden gift box below to unveil your final birthday letter... 🎁✨
              </p>

              <div className="relative flex items-center justify-center">
                <div className="absolute w-64 h-64 bg-gold/10 rounded-full filter blur-2xl animate-pulse-slow" />
                <GiftBox3D onOpen={handleOpenGift} />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="opened"
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 90, damping: 14, delay: 0.1 }}
              className="w-full max-w-2xl p-10 md:p-14 rounded-3xl glass-panel text-center relative gold-border z-20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] my-10"
            >
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
                  className="px-8 py-4 font-semibold tracking-wider flex items-center justify-center gap-2 bg-gradient-to-r from-[#2F0B18] to-[#4A1525]"
                >
                  Spark Confetti <Sparkles className="w-4 h-4 fill-white animate-pulse" />
                </Button>

                <button
                  onClick={() => scrollToSection(0)}
                  className="px-8 py-4 rounded-full border border-white/20 text-white font-poppins hover:bg-white/5 hover:border-white/50 transition-all duration-300 flex items-center justify-center gap-2 text-sm tracking-wide"
                >
                  Close Book <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

    </div>
  );
};
