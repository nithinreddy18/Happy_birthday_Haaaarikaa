import React from 'react';
import { motion } from 'framer-motion';

export const FlowerGarden: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-pinkPrimary bg-opacity-10">
      <motion.div
        className="text-4xl font-playfair text-rose"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1 }}
      >
        🌸 Flower Garden 🌸
      </motion.div>
    </section>
  );
};
