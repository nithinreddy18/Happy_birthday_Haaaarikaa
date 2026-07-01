"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

interface GiftBox3DProps {
  onOpen: () => void;
}

function BoxScene({ onOpen }: GiftBox3DProps) {
  const boxRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((state) => {
    if (!boxRef.current) return;
    
    // Slow rotation
    if (!clicked) {
      boxRef.current.rotation.y += 0.01;
      boxRef.current.rotation.x = Math.sin(state.clock.getElapsedTime()) * 0.15;
    } else {
      // Open animation - expand and drift parts apart
      boxRef.current.rotation.y += 0.08;
      boxRef.current.position.y += 0.05;
      boxRef.current.scale.subScalar(0.02);
    }
  });

  const handleBoxClick = () => {
    if (clicked) return;
    setClicked(true);
    // Trigger parent callback after brief animation
    setTimeout(() => {
      onOpen();
    }, 800);
  };

  return (
    <group
      ref={boxRef}
      onClick={handleBoxClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.1 : 1.0}
    >
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* Gift Box Base */}
        <mesh position={[0, -0.4, 0]}>
          <boxGeometry args={[1.5, 1.2, 1.5]} />
          <meshStandardMaterial color="#FF8FB1" roughness={0.2} metalness={0.1} />
        </mesh>

        {/* Gift Box Lid */}
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[1.6, 0.4, 1.6]} />
          <meshStandardMaterial color="#FFC1E3" roughness={0.2} metalness={0.1} />
        </mesh>

        {/* Vertical Ribbon (Around Y & X axis) */}
        <mesh position={[0, -0.1, 0]}>
          <boxGeometry args={[0.2, 1.7, 1.55]} />
          <meshStandardMaterial color="#FFD700" roughness={0.1} metalness={0.8} />
        </mesh>
        
        {/* Horizontal Ribbon (Around Y & Z axis) */}
        <mesh position={[0, -0.1, 0]}>
          <boxGeometry args={[1.55, 1.7, 0.2]} />
          <meshStandardMaterial color="#FFD700" roughness={0.1} metalness={0.8} />
        </mesh>

        {/* Ribbon Bow on Top */}
        <group position={[0, 0.6, 0]}>
          {/* Left Loop */}
          <mesh position={[-0.3, 0.2, 0]} rotation={[0, 0, Math.PI / 4]}>
            <torusGeometry args={[0.3, 0.08, 16, 100]} />
            <meshStandardMaterial color="#FFD700" roughness={0.1} metalness={0.8} />
          </mesh>
          {/* Right Loop */}
          <mesh position={[0.3, 0.2, 0]} rotation={[0, 0, -Math.PI / 4]}>
            <torusGeometry args={[0.3, 0.08, 16, 100]} />
            <meshStandardMaterial color="#FFD700" roughness={0.1} metalness={0.8} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

export const GiftBox3D: React.FC<GiftBox3DProps> = ({ onOpen }) => {
  return (
    <div className="w-72 h-72 md:w-96 md:h-96 mx-auto cursor-pointer relative z-20">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <directionalLight position={[0, 5, 5]} intensity={1.0} />
        <BoxScene onOpen={onOpen} />
      </Canvas>
    </div>
  );
};
