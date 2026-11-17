'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { FloatingLaptop } from './FloatingLaptop';
import { ParticleBackground } from './ParticleBackground';

export const SceneContainer: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <ParticleBackground />
        <FloatingLaptop />
      </Canvas>
    </div>
  );
};