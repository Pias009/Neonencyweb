"use client";

import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text3D, Center, useMatcapTexture } from '@react-three/drei';
import * as THREE from 'three';

interface NeonLogoProps {
  size?: number;
  animate?: boolean;
  className?: string;
}

function Logo3D({ animate = true }: { animate: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [matcapTexture] = useMatcapTexture('7B5254_E9DCC7_B19986_C8AC91', 256);

  useFrame((state) => {
    if (meshRef.current && animate) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <Center>
      <Text3D
        ref={meshRef}
        font="/fonts/orbitron_regular.json"
        size={0.5}
        height={0.1}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
      >
        N
        <meshMatcapMaterial matcap={matcapTexture} />
      </Text3D>
    </Center>
  );
}

export function NeonLogo({ size = 60, animate = false, className = "" }: NeonLogoProps) {
  return (
    <div 
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00ffff" />
        <Logo3D animate={animate} />
      </Canvas>
      
      {/* Neon glow effect overlay */}
      <div className="absolute inset-0 rounded-full blur-sm bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-pink-500/20 animate-pulse" />
    </div>
  );
}