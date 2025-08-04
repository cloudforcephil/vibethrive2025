import { createContext, useContext, ReactNode } from 'react'
import { useARStore } from '@/store'

interface ARContextType {
  currentSession: any
  isARActive: boolean
  loading: boolean
  error: string | null
  performanceMetrics: {
    fps: number
    memoryUsage: number
    batteryLevel?: number
  }
  startARSession: (productId: string) => Promise<void>
  stopARSession: () => void
  updateARPosition: (position: { x: number; y: number; z: number }) => void
  updateARRotation: (rotation: { x: number; y: number; z: number }) => void
  updateARScale: (scale: number) => void
  captureScreenshot: () => Promise<string>
  setPerformanceMetrics: (metrics: any) => void
}

const ARContext = createContext<ARContextType | undefined>(undefined)

interface ARProviderProps {
  children: ReactNode
}

export function ARProvider({ children }: ARProviderProps) {
  const arStore = useARStore()
  
  return (
    <ARContext.Provider value={arStore}>
      {children}
    </ARContext.Provider>
  )
}

export function useAR() {
  const context = useContext(ARContext)
  if (context === undefined) {
    throw new Error('useAR must be used within an ARProvider')
  }
  return context
} 