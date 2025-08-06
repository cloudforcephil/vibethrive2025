'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { useStore } from '@/store';

export default function Hat3DModel() {
  const meshRef = useRef<Mesh>(null);
  const { arState } = useStore((state) => state.fittingRoom);
  const { hatPosition, hatRotation, hatScale, selectedColor } = arState;
  
  // Default position relative to avatar head
  const defaultPosition = { x: 0, y: 1.85, z: 0 };

  useFrame(() => {
    if (meshRef.current) {
      // Gentle rotation animation
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={[
        defaultPosition.x + hatPosition.x, 
        defaultPosition.y + hatPosition.y, 
        defaultPosition.z + hatPosition.z
      ]}
      rotation={[hatRotation.x, hatRotation.y, hatRotation.z]}
      scale={[hatScale.x, hatScale.y, hatScale.z]}
    >
      {/* Bucket hat brim */}
      <cylinderGeometry args={[0.85, 0.85, 0.03, 32]} />
      <meshStandardMaterial 
        color={selectedColor?.hex || '#DC2626'} 
        roughness={0.6}
        metalness={0.0}
      />
      
      {/* Bucket hat crown */}
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.65, 0.7, 0.35, 32]} />
        <meshStandardMaterial 
          color={selectedColor?.hex || '#DC2626'} 
          roughness={0.6}
          metalness={0.0}
        />
      </mesh>
      
      {/* Embroidered text area (simulated) */}
      <mesh position={[0, 0.1, 0.71]}>
        <planeGeometry args={[0.3, 0.08]} />
        <meshStandardMaterial 
          color="#FFFFFF" 
          roughness={0.8}
          metalness={0.0}
          transparent={true}
          opacity={0.9}
        />
      </mesh>
    </mesh>
  );
}
