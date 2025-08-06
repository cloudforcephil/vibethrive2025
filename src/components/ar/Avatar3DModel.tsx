'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import { useStore } from '@/store';

interface Avatar3DModelProps {
  avatarUrl?: string;
  position?: [number, number, number];
  scale?: [number, number, number];
  rotation?: [number, number, number];
}

export default function Avatar3DModel({ 
  avatarUrl, 
  position = [0, -1, 0], 
  scale = [1, 1, 1],
  rotation = [0, 0, 0]
}: Avatar3DModelProps) {
  const groupRef = useRef<Group>(null);
  const { fittingRoom } = useStore();
  const { arState } = fittingRoom;

  // For this demo, we'll create a simple humanoid figure
  // In production, you'd load the actual Avaturn GLTF model
  const createDemoAvatar = () => {
    return (
      <group ref={groupRef} position={position} scale={scale} rotation={rotation}>
        {/* Head */}
        <mesh position={[0, 1.7, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#FDBCB4" />
        </mesh>
        
        {/* Neck */}
        <mesh position={[0, 1.55, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.1, 8]} />
          <meshStandardMaterial color="#FDBCB4" />
        </mesh>
        
        {/* Torso */}
        <mesh position={[0, 1.2, 0]}>
          <boxGeometry args={[0.3, 0.6, 0.15]} />
          <meshStandardMaterial color="#4A5568" />
        </mesh>
        
        {/* Arms */}
        <mesh position={[-0.2, 1.2, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.5, 8]} />
          <meshStandardMaterial color="#FDBCB4" />
        </mesh>
        <mesh position={[0.2, 1.2, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.5, 8]} />
          <meshStandardMaterial color="#FDBCB4" />
        </mesh>
        
        {/* Legs */}
        <mesh position={[-0.1, 0.6, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.8, 8]} />
          <meshStandardMaterial color="#2D3748" />
        </mesh>
        <mesh position={[0.1, 0.6, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.8, 8]} />
          <meshStandardMaterial color="#2D3748" />
        </mesh>
        
        {/* Feet */}
        <mesh position={[-0.1, 0.1, 0.05]}>
          <boxGeometry args={[0.08, 0.04, 0.15]} />
          <meshStandardMaterial color="#1A202C" />
        </mesh>
        <mesh position={[0.1, 0.1, 0.05]}>
          <boxGeometry args={[0.08, 0.04, 0.15]} />
          <meshStandardMaterial color="#1A202C" />
        </mesh>
      </group>
    );
  };

  useFrame((state, delta) => {
    // Gentle breathing animation for demo avatar
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.01;
    }
  });

  // For now, we'll always show the demo avatar
  // In production, you would check for avatarUrl or arState.avatarModel
  // and load the actual Avaturn model
  return createDemoAvatar();
}