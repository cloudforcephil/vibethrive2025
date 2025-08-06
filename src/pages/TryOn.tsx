import { motion } from 'framer-motion'
import { Camera, Sparkles } from 'lucide-react'

export default function TryOn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="flex items-center justify-center mb-6">
            <Camera className="h-16 w-16 text-primary-500" />
          </div>
          
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              AR Try-On
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Experience virtual try-on with our advanced AR technology. 
              This feature is coming soon!
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <Sparkles className="h-12 w-12 text-primary-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Coming Soon
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Our AR try-on feature is under development. You'll be able to:
            </p>
            <ul className="text-left space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• Try on clothes virtually using your camera</li>
              <li>• See how items fit in real-time</li>
              <li>• Share try-on sessions with friends</li>
              <li>• Get AI-powered style recommendations</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 