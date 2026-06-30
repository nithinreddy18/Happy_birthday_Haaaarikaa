"use client"
import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';


export const Cursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX - 8);
      y.set(e.clientY - 8);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [x, y]);

  return (
    <motion.div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 w-4 h-4 bg-pinkPrimary rounded-full opacity-75 mix-blend-screen"
      style={{ x, y }}
    />
  );
};
