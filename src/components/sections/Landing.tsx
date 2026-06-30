"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { useRouter } from "next/navigation";

export const Landing: React.FC = () => {
  const router = useRouter();

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-pinkPrimary to-rose">
      {/* Background animated flower (placeholder) */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <div className="w-64 h-64 bg-white rounded-full shadow-lg animate-pulse" />
      </motion.div>

      {/* Hero content */}
      <div className="relative z-10 text-center p-8">
        <motion.h1
          className="text-5xl md:text-7xl font-playfair text-white mb-6"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Happy Birthday<br />Beautiful Soul 🌸
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <Button onClick={() => router.push("/journey")}>Begin the Journey</Button>
        </motion.div>
      </div>
    </section>
  );
};
