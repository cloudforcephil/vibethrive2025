'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Suspense } from 'react';
import { useStore } from '@/store';
import { motion } from 'framer-motion';
import Hat3DModel from './Hat3DModel';
import Avatar3DModel from './Avatar3DModel';
import VirtualFittingRoom from './VirtualFittingRoom';

export default function ARScene() {
  const { arState, currentProduct } = useStore((state) => state.fittingRoom);
  const { activateAR, deactivateAR } = useStore();

  if (!arState.isActive) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-900 text-white">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">AR Try-On</h3>
          <p className="text-gray-300 mb-6">
            Experience {currentProduct?.name} in augmented reality
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={activateAR}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
          >
            Start AR Experience
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full">
      <Canvas
        camera={{ position: [0, 2, 4], fov: 70 }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          {/* Virtual Fitting Room Environment */}
          <VirtualFittingRoom />
          
          {/* Lighting setup for fitting room */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[0, 10, 5]} intensity={1.0} color="#ffffff" />
          <pointLight position={[-5, 5, 5]} intensity={0.8} color="#f0f0f0" />
          <pointLight position={[5, 5, 5]} intensity={0.8} color="#f0f0f0" />
          <spotLight 
            position={[0, 8, 0]} 
            angle={0.3} 
            penumbra={0.5} 
            intensity={0.6}
            color="#ffffff"
            target-position={[0, 1.7, 0]}
          />
          
          {/* Avatar Model */}
          <Avatar3DModel />
          
          {/* Hat Model - positioned relative to avatar's head */}
          <Hat3DModel />
          
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={2}
            maxDistance={12}
            target={[0, 1.5, 0]}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 8}
            enableDamping={true}
            dampingFactor={0.05}
          />
        </Suspense>
      </Canvas>
      
      <div className="absolute top-4 right-4 flex gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={deactivateAR}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
        >
          Exit AR
        </motion.button>
      </div>
    </div>
  );
}
