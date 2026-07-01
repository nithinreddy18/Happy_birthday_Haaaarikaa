"use client"
import React from 'react';
import { Cursor } from '@/components/ui/Cursor';
import { MusicPlayer } from '@/components/ui/MusicPlayer';
import { useLenisScroll } from '@/hooks/useLenisScroll';

type Props = {
  children: React.ReactNode;
};

export default function ClientLayout({ children }: Props) {
  // Initialize smooth scrolling via Lenis
  useLenisScroll();

  return (
    <>
      <Cursor />
      <MusicPlayer />
      <div data-lenis className="glow min-h-screen flex flex-col">
        {children}
      </div>
    </>
  );
}

