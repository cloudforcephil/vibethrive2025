'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Camera, Sparkles, Settings, RotateCcw } from 'lucide-react';
import { useStore } from '@/store';
import AvaturnIntegration from './AvaturnIntegration';

interface AvatarControlsProps {
  className?: string;
}

export default function AvatarControls({ className = '' }: AvatarControlsProps) {
  const [showAvatarCreator, setShowAvatarCreator] = useState(false);
  const [showAvatarSettings, setShowAvatarSettings] = useState(false);
  const { fittingRoom, setAvatarModel } = useStore();
  const { arState } = fittingRoom;

  const hasAvatar = !!arState?.avatarModel;

  const handleAvatarCreated = (avatarUrl: string) => {
    setAvatarModel(avatarUrl);
    setShowAvatarCreator(false);
  };

  const resetAvatar = () => {
    setAvatarModel(null);
    setShowAvatarSettings(false);
  };

  return (
    <>
      <div className={`space-y-3 ${className}`}>
        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4">
          <h3 className="text-white font-medium mb-3 flex items-center gap-2">
            <User className="w-4 h-4" />
            Avatar Controls
          </h3>
          
          <div className="space-y-2">
            {!hasAvatar ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowAvatarCreator(true)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2 hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                Create Avatar
              </motion.button>
            ) : (
              <div className="space-y-2">
                <div className="bg-green-600/20 border border-green-600/30 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-green-400 text-sm">
                    <User className="w-4 h-4" />
                    Avatar Active
                  </div>
                  <p className="text-green-300 text-xs mt-1">
                    Realistic 3D avatar loaded
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowAvatarSettings(true)}
                    className="flex-1 bg-gray-600 text-white py-2 px-3 rounded-lg text-sm hover:bg-gray-700 transition-colors flex items-center justify-center gap-1"
                  >
                    <Settings className="w-3 h-3" />
                    Settings
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowAvatarCreator(true)}
                    className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-1"
                  >
                    <Camera className="w-3 h-3" />
                    New Avatar
                  </motion.button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Avatar Features Info */}
        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4">
          <h4 className="text-white font-medium mb-2 text-sm">Avatar Features</h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2 text-gray-300">
              <div className="w-2 h-2 bg-blue-400 rounded-full" />
              Realistic face from selfie
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              Body customization
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <div className="w-2 h-2 bg-purple-400 rounded-full" />
              Animation ready
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <div className="w-2 h-2 bg-yellow-400 rounded-full" />
              10,000+ looks
            </div>
          </div>
        </div>
      </div>

      {/* Avatar Creator Modal */}
      <AnimatePresence>
        {showAvatarCreator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowAvatarCreator(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md"
            >
              <AvaturnIntegration
                onAvatarCreated={handleAvatarCreated}
                onClose={() => setShowAvatarCreator(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Avatar Settings Modal */}
      <AnimatePresence>
        {showAvatarSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowAvatarSettings(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-md mx-auto shadow-2xl"
            >
              <div className="text-center mb-6">
                <Settings className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <h2 className="text-xl font-bold text-gray-900">Avatar Settings</h2>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Current Avatar</h3>
                  <p className="text-gray-600 text-sm">
                    Realistic 3D avatar generated from your selfie
                  </p>
                </div>

                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setShowAvatarSettings(false);
                      setShowAvatarCreator(true);
                    }}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Create New Avatar
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={resetAvatar}
                    className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Remove Avatar
                  </motion.button>

                  <button
                    onClick={() => setShowAvatarSettings(false)}
                    className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}