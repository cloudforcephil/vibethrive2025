'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Suspense } from 'react';
import { useStore } from '@/store';
import { motion } from 'framer-motion';
import Hat3DModel from './Hat3DModel';

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
        camera={{ position: [0, 1.6, 3], fov: 75 }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <Environment preset="studio" />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />
          
          <Hat3DModel />
          
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={1}
            maxDistance={10}
            target={[0, 1, 0]}
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
