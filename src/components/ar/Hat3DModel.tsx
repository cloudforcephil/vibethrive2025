'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { useStore } from '@/store';

export default function Hat3DModel() {
  const meshRef = useRef<Mesh>(null);
  const { arState } = useStore((state) => state.fittingRoom);
  const { hatPosition, hatRotation, hatScale, selectedColor } = arState;

  useFrame(() => {
    if (meshRef.current) {
      // Gentle rotation animation
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={[hatPosition.x, hatPosition.y, hatPosition.z]}
      rotation={[hatRotation.x, hatRotation.y, hatRotation.z]}
      scale={[hatScale.x, hatScale.y, hatScale.z]}
    >
      {/* Hat brim */}
      <cylinderGeometry args={[0.8, 0.8, 0.05, 32]} />
      <meshStandardMaterial 
        color={selectedColor?.hex || '#000000'} 
        roughness={0.3}
        metalness={0.1}
      />
      
      {/* Hat crown */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.6, 0.8, 0.4, 32]} />
        <meshStandardMaterial 
          color={selectedColor?.hex || '#000000'} 
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>
      
      {/* Hat band */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.65, 0.65, 0.05, 32]} />
        <meshStandardMaterial 
          color="#8B4513" 
          roughness={0.2}
          metalness={0.3}
        />
      </mesh>
    </mesh>
  );
}
