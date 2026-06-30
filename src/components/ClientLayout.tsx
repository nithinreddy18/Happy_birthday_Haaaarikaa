"use client"
import React from 'react';
import { Cursor } from '@/components/ui/Cursor';
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
      {children}
    </>
  );
}
