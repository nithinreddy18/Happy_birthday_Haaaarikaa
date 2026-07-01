"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function JourneyRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/journey/forest");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#1E0914] flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-t-pinkPrimary border-r-transparent rounded-full animate-spin" />
    </div>
  );
}

