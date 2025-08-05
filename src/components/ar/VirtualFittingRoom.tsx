'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Color } from 'three';

export default function VirtualFittingRoom() {
  const roomRef = useRef<Mesh>(null);

  useFrame((state) => {
    // Gentle ambient lighting animation
    if (roomRef.current) {
      const time = state.clock.elapsedTime;
      // Subtle breathing effect for ambient lighting
      roomRef.current.material.opacity = 0.8 + Math.sin(time * 0.5) * 0.05;
    }
  });

  return (
    <group>
      {/* Floor */}
      <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshLambertMaterial color="#e5e5e5" />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, 5, -8]} rotation={[0, 0, 0]}>
        <planeGeometry args={[20, 10]} />
        <meshLambertMaterial color="#f8f8f8" />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-8, 5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[16, 10]} />
        <meshLambertMaterial color="#f5f5f5" />
      </mesh>

      {/* Right Wall */}
      <mesh position={[8, 5, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[16, 10]} />
        <meshLambertMaterial color="#f5f5f5" />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, 10, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 16]} />
        <meshLambertMaterial color="#fafafa" />
      </mesh>

      {/* Mirror on back wall */}
      <mesh position={[0, 3, -7.9]} rotation={[0, 0, 0]}>
        <planeGeometry args={[6, 8]} />
        <meshStandardMaterial 
          color="#e8e8e8" 
          metalness={0.9} 
          roughness={0.1}
          transparent={true}
          opacity={0.8}
        />
      </mesh>

      {/* Mirror frame */}
      <group position={[0, 3, -7.85]}>
        {/* Top frame */}
        <mesh position={[0, 4.1, 0]}>
          <boxGeometry args={[6.2, 0.2, 0.1]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        {/* Bottom frame */}
        <mesh position={[0, -4.1, 0]}>
          <boxGeometry args={[6.2, 0.2, 0.1]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        {/* Left frame */}
        <mesh position={[-3.1, 0, 0]}>
          <boxGeometry args={[0.2, 8, 0.1]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        {/* Right frame */}
        <mesh position={[3.1, 0, 0]}>
          <boxGeometry args={[0.2, 8, 0.1]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
      </group>

      {/* Ceiling lights */}
      <group>
        {/* Left ceiling light */}
        <mesh position={[-3, 9.8, 2]}>
          <cylinderGeometry args={[0.8, 0.8, 0.2, 16]} />
          <meshStandardMaterial 
            color="#ffffff" 
            emissive="#ffffff"
            emissiveIntensity={0.3}
          />
        </mesh>
        
        {/* Right ceiling light */}
        <mesh position={[3, 9.8, 2]}>
          <cylinderGeometry args={[0.8, 0.8, 0.2, 16]} />
          <meshStandardMaterial 
            color="#ffffff" 
            emissive="#ffffff"
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>

      {/* Fitting room bench */}
      <group position={[-5, 0.5, -6]}>
        {/* Bench seat */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[3, 0.2, 1]} />
          <meshStandardMaterial color="#D2B48C" />
        </mesh>
        {/* Bench legs */}
        <mesh position={[-1.2, -0.4, -0.3]}>
          <boxGeometry args={[0.1, 0.6, 0.1]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        <mesh position={[1.2, -0.4, -0.3]}>
          <boxGeometry args={[0.1, 0.6, 0.1]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        <mesh position={[-1.2, -0.4, 0.3]}>
          <boxGeometry args={[0.1, 0.6, 0.1]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        <mesh position={[1.2, -0.4, 0.3]}>
          <boxGeometry args={[0.1, 0.6, 0.1]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
      </group>

      {/* Coat hooks on left wall */}
      <group position={[-7.8, 4, 2]}>
        <mesh>
          <cylinderGeometry args={[0.05, 0.05, 0.3, 8]} />
          <meshStandardMaterial color="#C0C0C0" />
        </mesh>
      </group>
      <group position={[-7.8, 3, 2]}>
        <mesh>
          <cylinderGeometry args={[0.05, 0.05, 0.3, 8]} />
          <meshStandardMaterial color="#C0C0C0" />
        </mesh>
      </group>

      {/* Soft ambient lighting sphere (invisible but provides atmosphere) */}
      <mesh ref={roomRef} position={[0, 5, 0]} visible={false}>
        <sphereGeometry args={[15, 32, 32]} />
        <meshBasicMaterial 
          color="#ffffff" 
          transparent={true} 
          opacity={0.1}
        />
      </mesh>

      {/* Subtle floor pattern */}
      <group>
        {/* Floor tiles pattern */}
        {Array.from({ length: 10 }).map((_, i) =>
          Array.from({ length: 10 }).map((_, j) => (
            <mesh 
              key={`${i}-${j}`}
              position={[(i - 5) * 2, -0.05, (j - 5) * 2]} 
              rotation={[-Math.PI / 2, 0, 0]}
            >
              <planeGeometry args={[1.9, 1.9]} />
              <meshLambertMaterial 
                color={((i + j) % 2 === 0) ? "#e8e8e8" : "#e0e0e0"} 
              />
            </mesh>
          ))
        )}
      </group>
    </group>
  );
}