import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, ArrowLeft, Sparkles } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* 404 Number */}
          <div className="relative">
            <h1 className="text-9xl font-bold text-gray-200 dark:text-gray-700">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="h-16 w-16 text-primary-500" />
            </div>
          </div>
          
          {/* Content */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Page Not Found
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the wrong URL.
            </p>
          </div>
          
          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors duration-200"
            >
              <Home className="mr-2 h-5 w-5" />
              Go Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Go Back
            </button>
          </div>
          
          {/* Helpful links */}
          <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Try these popular pages:
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/catalog"
                className="text-sm text-primary-500 hover:text-primary-600 font-medium"
              >
                Browse Products
              </Link>
              <Link
                to="/try-on"
                className="text-sm text-primary-500 hover:text-primary-600 font-medium"
              >
                AR Try-On
              </Link>
              <Link
                to="/virtual-shopper"
                className="text-sm text-primary-500 hover:text-primary-600 font-medium"
              >
                Virtual Shopper
              </Link>
              <Link
                to="/contact"
                className="text-sm text-primary-500 hover:text-primary-600 font-medium"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 