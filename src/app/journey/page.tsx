"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function JourneyPage() {
  const router = useRouter();

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-rose to-pinkPrimary p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-5xl md:text-6xl font-playfair text-white mb-6">
          🎉 The Journey Begins! 🎉
        </h1>
        <p className="text-lg text-white mb-8">
          Explore the magical birthday experience we prepared for you.
        </p>
        <Button onClick={() => router.push('/')}>Back to Home</Button>
      </motion.div>
    </section>
  );
}
