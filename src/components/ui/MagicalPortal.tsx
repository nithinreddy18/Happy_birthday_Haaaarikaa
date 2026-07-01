"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function PortalParticles() {
  const ref = useRef<THREE.Points>(null);

  // Generate particles in a beautiful torus-knot/spiral ring format
  const [positions, colors] = useMemo(() => {
    const count = 3000;
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Golden-pink color palette
      const r = Math.random();
      if (r < 0.4) {
        // Soft pink
        cols[i * 3] = 1.0;
        cols[i * 3 + 1] = 0.75;
        cols[i * 3 + 2] = 0.89;
      } else if (r < 0.7) {
        // Gold / Gold-orange
        cols[i * 3] = 1.0;
        cols[i * 3 + 1] = 0.84;
        cols[i * 3 + 2] = 0.0;
      } else {
        // White-blue glow
        cols[i * 3] = 0.9;
        cols[i * 3 + 1] = 0.95;
        cols[i * 3 + 2] = 1.0;
      }

      // Ring shape with some random dispersion
      const angle = Math.random() * Math.PI * 2;
      const radius = 2.0 + Math.random() * 0.8;
      pos[i * 3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 0.3;
      pos[i * 3 + 1] = Math.sin(angle) * radius + (Math.random() - 0.5) * 0.3;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
    }

    return [pos, cols];
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    
    // Slow continuous rotation
    ref.current.rotation.z = state.clock.getElapsedTime() * 0.15;
    ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
    ref.current.rotation.y = Math.cos(state.clock.getElapsedTime() * 0.2) * 0.1;

    // Subtle reactivity to mouse position
    const targetX = (state.pointer.x * Math.PI) / 10;
    const targetY = (state.pointer.y * Math.PI) / 10;
    ref.current.rotation.y += (targetX - ref.current.rotation.y) * 0.05;
    ref.current.rotation.x += (-targetY - ref.current.rotation.x) * 0.05;
  });

  return (
    <Points ref={ref} positions={positions} colors={colors} stride={3}>
      <PointMaterial
        transparent
        vertexColors
        size={0.065}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export const MagicalPortal: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none bg-gradient-to-b from-[#1E0914] via-[#330E22] to-[#4A1525]">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <PortalParticles />
      </Canvas>
      {/* Dreamy animated radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(30,9,20,0.8)_100%)] pointer-events-none" />
    </div>
  );
};
