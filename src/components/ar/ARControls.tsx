'use client';

import { RotateCcw, Move, Scale } from 'lucide-react';
import { useStore } from '@/store';
import AvatarControls from './AvatarControls';

export default function ARControls() {
  const { fittingRoom, updateHatPosition, updateHatRotation, updateHatScale } = useStore();
  const { arState } = fittingRoom;

  const handlePositionChange = (axis: 'x' | 'y' | 'z', value: number) => {
    const newPosition = { ...arState.hatPosition, [axis]: value };
    updateHatPosition(newPosition);
  };

  const handleRotationChange = (axis: 'x' | 'y' | 'z', value: number) => {
    const newRotation = { ...arState.hatRotation, [axis]: value };
    updateHatRotation(newRotation);
  };

  const handleScaleChange = (axis: 'x' | 'y' | 'z', value: number) => {
    const newScale = { ...arState.hatScale, [axis]: value };
    updateHatScale(newScale);
  };

  return (
    <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
      <div className="flex gap-4 pointer-events-auto">
        {/* Avatar Controls */}
        <AvatarControls className="w-64" />
        
        {/* Hat Controls */}
        <div className="bg-black/80 backdrop-blur-sm rounded-lg p-4 text-white min-w-[280px]">
          <h3 className="text-white font-medium mb-3 flex items-center gap-2">
            <Move className="w-4 h-4" />
            Hat Controls
          </h3>
          <div className="space-y-4">
            <div>
          <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
            <Move className="w-4 h-4" />
            Position
          </h4>
          <div className="grid grid-cols-3 gap-2">
            {(['x', 'y', 'z'] as const).map((axis) => (
              <div key={axis} className="text-center">
                <label className="text-xs text-gray-300 uppercase">{axis}</label>
                <input
                  type="range"
                  min="-2"
                  max="2"
                  step="0.1"
                  value={arState.hatPosition[axis]}
                  onChange={(e) => handlePositionChange(axis, parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
            <RotateCcw className="w-4 h-4" />
            Rotation
          </h4>
          <div className="grid grid-cols-3 gap-2">
            {(['x', 'y', 'z'] as const).map((axis) => (
              <div key={axis} className="text-center">
                <label className="text-xs text-gray-300 uppercase">{axis}</label>
                <input
                  type="range"
                  min="-3.14"
                  max="3.14"
                  step="0.1"
                  value={arState.hatRotation[axis]}
                  onChange={(e) => handleRotationChange(axis, parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
            <Scale className="w-4 h-4" />
            Scale
          </h4>
          <div className="grid grid-cols-3 gap-2">
            {(['x', 'y', 'z'] as const).map((axis) => (
              <div key={axis} className="text-center">
                <label className="text-xs text-gray-300 uppercase">{axis}</label>
                <input
                  type="range"
                  min="0.1"
                  max="3"
                  step="0.1"
                  value={arState.hatScale[axis]}
                  onChange={(e) => handleScaleChange(axis, parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
}
