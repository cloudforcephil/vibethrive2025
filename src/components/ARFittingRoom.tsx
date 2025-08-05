'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, Fullscreen } from 'lucide-react';
import { useStore } from '@/store';
import ARScene from './ar/ARScene';
import ARControls from './ar/ARControls';

export default function ARFittingRoom() {
  const { fittingRoom, closeFittingRoom, setFittingRoomFullscreen, activateAR } = useStore();
  const { isOpen, currentProduct, arState, isFullscreen } = fittingRoom;

  if (!isOpen || !currentProduct) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`fixed inset-0 z-50 bg-black ${
          isFullscreen ? 'z-[60]' : ''
        }`}
      >
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-black/80 backdrop-blur-sm p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={closeFittingRoom}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <div>
                <h2 className="text-white font-semibold">{currentProduct.name}</h2>
                <p className="text-gray-300 text-sm">
                  {arState?.avatarModel ? 'Avatar AR Try-On' : 'AR Try-On Experience'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {!arState?.isActive && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={activateAR}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <Camera className="w-4 h-4" />
                  Start AR
                </motion.button>
              )}
              
              <button
                onClick={() => setFittingRoomFullscreen(!isFullscreen)}
                className="text-white hover:text-gray-300 transition-colors p-2"
              >
                <Fullscreen className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* AR Scene */}
        <div className="h-full pt-16">
          <ARScene />
          {arState?.isActive && <ARControls />}
        </div>

        {/* Product Info Overlay */}
        {!arState?.isActive && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-6"
          >
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-white font-semibold text-lg">{currentProduct.name}</h3>
                  <p className="text-gray-300">${currentProduct.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  {currentProduct.colors.map((color) => (
                    <div
                      key={color.id}
                      className="w-4 h-4 rounded-full border border-white"
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
              
              <p className="text-gray-300 text-sm leading-relaxed">
                {currentProduct.description}
              </p>
              
              {!arState?.avatarModel && (
                <div className="mt-4 p-3 bg-blue-600/20 border border-blue-600/30 rounded-lg">
                  <p className="text-blue-300 text-sm">
                    💡 <strong>Enhanced Experience:</strong> Create a realistic avatar with Avaturn for the ultimate virtual try-on!
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
