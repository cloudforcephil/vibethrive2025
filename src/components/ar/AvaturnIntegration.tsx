'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, User, Sparkles, Download } from 'lucide-react';
import { useStore } from '@/store';

interface AvaturnIntegrationProps {
  onAvatarCreated?: (avatarUrl: string) => void;
  onClose?: () => void;
}

export default function AvaturnIntegration({ onAvatarCreated, onClose }: AvaturnIntegrationProps) {
  const [isCreatingAvatar, setIsCreatingAvatar] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { setAvatarModel } = useStore();

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  }, []);

  const createAvatar = useCallback(async () => {
    if (!selectedFile) return;

    setIsCreatingAvatar(true);
    
    try {
      // In a real implementation, you would integrate with Avaturn's API
      // For this demo, we'll simulate the avatar creation process
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock avatar URL - in real implementation, this would come from Avaturn API
      const mockAvatarUrl = `https://api.avaturn.me/avatars/demo-avatar-${Date.now()}.glb`;
      
      setAvatarUrl(mockAvatarUrl);
      setAvatarModel(mockAvatarUrl);
      onAvatarCreated?.(mockAvatarUrl);
      
    } catch (error) {
      console.error('Failed to create avatar:', error);
    } finally {
      setIsCreatingAvatar(false);
    }
  }, [selectedFile, setAvatarModel, onAvatarCreated]);

  const openAvaturnCreator = useCallback(() => {
    // Open Avaturn's avatar creator in a new window
    window.open('https://avaturn.me/create', '_blank', 'width=800,height=600');
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white rounded-2xl p-6 max-w-md mx-auto shadow-2xl"
    >
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Your Avatar</h2>
        <p className="text-gray-600">
          Transform yourself into a realistic 3D avatar for the ultimate try-on experience
        </p>
      </div>

      {!previewUrl && !avatarUrl && (
        <div className="space-y-4">
          {/* Upload Photo Option */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id="avatar-upload"
            />
            <label htmlFor="avatar-upload" className="cursor-pointer">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-700 font-medium">Upload a selfie</p>
              <p className="text-gray-500 text-sm">PNG, JPG up to 10MB</p>
            </label>
          </div>

          {/* Or Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          {/* Avaturn Creator Option */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={openAvaturnCreator}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 hover:from-blue-700 hover:to-purple-700 transition-all"
          >
            <Sparkles className="w-5 h-5" />
            Open Avaturn Creator
          </motion.button>
        </div>
      )}

      {previewUrl && !avatarUrl && (
        <div className="space-y-4">
          <div className="text-center">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-blue-200"
            />
            <p className="text-gray-600 mt-2">Ready to create your avatar?</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                setSelectedFile(null);
                setPreviewUrl(null);
              }}
              className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Change Photo
            </button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={createAvatar}
              disabled={isCreatingAvatar}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {isCreatingAvatar ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Create Avatar
                </>
              )}
            </motion.button>
          </div>
        </div>
      )}

      {isCreatingAvatar && (
        <div className="text-center space-y-4">
          <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto" />
          <div>
            <p className="text-gray-700 font-medium">Creating your avatar...</p>
            <p className="text-gray-500 text-sm">This may take a few moments</p>
          </div>
        </div>
      )}

      {avatarUrl && (
        <div className="text-center space-y-4">
          <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto">
            <User className="w-12 h-12 text-white" />
          </div>
          <div>
            <p className="text-gray-700 font-medium">Avatar created successfully!</p>
            <p className="text-gray-500 text-sm">Your realistic 3D avatar is ready</p>
          </div>
          
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setAvatarUrl(null);
                setPreviewUrl(null);
                setSelectedFile(null);
              }}
              className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Create Another
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Use Avatar
            </motion.button>
          </div>
        </div>
      )}
    </motion.div>
  );
}