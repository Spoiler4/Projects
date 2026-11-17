'use client';

import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, RoundedBox, Text } from '@react-three/drei';
import * as THREE from 'three';

export const FloatingLaptop: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  const { viewport } = useThree();

  /*
   * Move laptop to the right on desktop.
   *
   * Mobile/tablet:
   *   stays centered
   *
   * Desktop:
   *   moves progressively to the right
   */
  const xPosition =
    viewport.width >= 10
      ? 1.7
      : viewport.width >= 7
        ? 1.2
        : 0;

  useFrame((state) => {
    if (groupRef.current) {
      // Rotation speed
      groupRef.current.rotation.y =
        state.clock.getElapsedTime() * 0.3;

      // Very subtle tilt
      groupRef.current.rotation.x =
        Math.sin(state.clock.getElapsedTime() * 0.35) * 0.035;
    }
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.12}
      floatIntensity={0.55}
    >
      <group
        ref={groupRef}
        dispose={null}

        // RESPONSIVE POSITION
        position={[xPosition, -0.1, 0]}

        rotation={[0.05, -0.35, 0]}
        scale={1.1}
      >

        {/* ===================================================== */}
        {/* LAPTOP BASE */}
        {/* ===================================================== */}

        <RoundedBox
          args={[3.4, 0.16, 2.25]}
          radius={0.12}
          smoothness={6}
          position={[0, -0.65, 0]}
        >
          <meshStandardMaterial
            color="#526b86"
            metalness={0.9}
            roughness={0.22}
          />
        </RoundedBox>

        {/* Subtle lower edge */}
        <RoundedBox
          args={[3.25, 0.025, 2.08]}
          radius={0.1}
          smoothness={5}
          position={[0, -0.55, 0]}
        >
          <meshStandardMaterial
            color="#344c68"
            metalness={0.8}
            roughness={0.28}
          />
        </RoundedBox>

        {/* ===================================================== */}
        {/* KEYBOARD DECK */}
        {/* ===================================================== */}

        <RoundedBox
          args={[3.05, 0.04, 1.85]}
          radius={0.08}
          smoothness={5}
          position={[0, -0.54, 0]}
        >
          <meshStandardMaterial
            color="#34495f"
            metalness={0.72}
            roughness={0.3}
          />
        </RoundedBox>

        {/* ===================================================== */}
        {/* KEYBOARD */}
        {/* ===================================================== */}

        {Array.from({ length: 8 }).map((_, row) =>
          Array.from({ length: 12 }).map((_, col) => (
            <RoundedBox
              key={`key-${row}-${col}`}
              args={[0.17, 0.025, 0.12]}
              radius={0.025}
              smoothness={3}
              position={[
                -1.25 + col * 0.23,
                -0.505,
                -0.45 + row * 0.16,
              ]}
            >
              <meshStandardMaterial
                color="#24364b"
                metalness={0.45}
                roughness={0.42}
              />
            </RoundedBox>
          ))
        )}

        {/* Cyan accent keys */}
        {[
          [-1.25, -0.505, 0.83],
          [-0.56, -0.505, 0.83],
          [0.13, -0.505, 0.83],
          [0.82, -0.505, 0.83],
        ].map((position, index) => (
          <RoundedBox
            key={`accent-key-${index}`}
            args={[0.17, 0.026, 0.12]}
            radius={0.025}
            smoothness={3}
            position={position as [number, number, number]}
          >
            <meshStandardMaterial
              color="#25627a"
              emissive="#00d9ff"
              emissiveIntensity={0.18}
              metalness={0.45}
              roughness={0.35}
            />
          </RoundedBox>
        ))}

        {/* ===================================================== */}
        {/* TRACKPAD */}
        {/* ===================================================== */}

        <RoundedBox
          args={[1.15, 0.025, 0.7]}
          radius={0.08}
          smoothness={5}
          position={[0, -0.505, 0.57]}
        >
          <meshStandardMaterial
            color="#405872"
            metalness={0.55}
            roughness={0.25}
          />
        </RoundedBox>

        {/* ===================================================== */}
        {/* SCREEN */}
        {/* ===================================================== */}

        <group
          position={[0, 0.65, -0.92]}
          rotation={[-0.12, 0, 0]}
        >

          {/* Outer screen frame */}
          <RoundedBox
            args={[3.25, 2.15, 0.11]}
            radius={0.12}
            smoothness={7}
          >
            <meshStandardMaterial
              color="#526b86"
              metalness={0.92}
              roughness={0.2}
            />
          </RoundedBox>

          {/* Inner bezel */}
          <RoundedBox
            args={[3.08, 2.0, 0.035]}
            radius={0.1}
            smoothness={6}
            position={[0, 0, 0.065]}
          >
            <meshStandardMaterial
              color="#263b52"
              metalness={0.7}
              roughness={0.24}
            />
          </RoundedBox>

          {/* Active screen */}
          <RoundedBox
            args={[2.94, 1.86, 0.025]}
            radius={0.085}
            smoothness={6}
            position={[0, 0, 0.09]}
          >
            <meshStandardMaterial
              color="#071a2a"
              emissive="#06344a"
              emissiveIntensity={1.5}
              metalness={0.1}
              roughness={0.2}
            />
          </RoundedBox>

          {/* ================================================= */}
          {/* CODE */}
          {/* ================================================= */}

          <Text
            position={[-1.22, 0.65, 0.115]}
            fontSize={0.12}
            color="#00f5ff"
            anchorX="left"
            anchorY="middle"
          >
            {'< Charles />'}
          </Text>

          <Text
            position={[-1.22, 0.38, 0.115]}
            fontSize={0.085}
            color="#a78bfa"
            anchorX="left"
            anchorY="middle"
          >
            {'const developer = {'}
          </Text>

          <Text
            position={[-1.02, 0.17, 0.115]}
            fontSize={0.075}
            color="#67e8f9"
            anchorX="left"
            anchorY="middle"
          >
            {'  stack: "Full Stack",'}
          </Text>

          <Text
            position={[-1.02, -0.03, 0.115]}
            fontSize={0.075}
            color="#818cf8"
            anchorX="left"
            anchorY="middle"
          >
            {'  mobile: true,'}
          </Text>

          <Text
            position={[-1.02, -0.23, 0.115]}
            fontSize={0.075}
            color="#c084fc"
            anchorX="left"
            anchorY="middle"
          >
            {'  coffee: "∞"'}
          </Text>

          <Text
            position={[-1.22, -0.5, 0.115]}
            fontSize={0.085}
            color="#22d3ee"
            anchorX="left"
            anchorY="middle"
          >
            {'};'}
          </Text>

          <Text
            position={[-1.22, -0.78, 0.115]}
            fontSize={0.075}
            color="#4ade80"
            anchorX="left"
            anchorY="middle"
          >
            {'> npm run build_'}
          </Text>

          {/* Screen glow */}
          <pointLight
            position={[0, 0, 0.4]}
            color="#00f5ff"
            intensity={0.45}
            distance={2.8}
          />
        </group>

        {/* ===================================================== */}
        {/* HINGE */}
        {/* ===================================================== */}

        <mesh position={[0, -0.38, -0.91]}>
          <cylinderGeometry args={[0.055, 0.055, 2.5, 24]} />
          <meshStandardMaterial
            color="#6b82a0"
            metalness={0.95}
            roughness={0.18}
          />
        </mesh>

        {/* ===================================================== */}
        {/* LIGHTING */}
        {/* ===================================================== */}

        <pointLight
          position={[0, -0.9, 0]}
          color="#6366f1"
          intensity={1.5}
          distance={4}
        />

        <pointLight
          position={[1.8, 0.3, 0.5]}
          color="#00f5ff"
          intensity={0.9}
          distance={3.5}
        />

        <pointLight
          position={[-1.8, 0.3, 0]}
          color="#a855f7"
          intensity={0.7}
          distance={3.5}
        />

      </group>
    </Float>
  );
};
