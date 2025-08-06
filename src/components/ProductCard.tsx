import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Heart, 
  ShoppingCart, 
  Camera, 
  Star,
  Eye
} from 'lucide-react'
import { Product } from '@/types'
import { useCartStore, useAuthStore } from '@/store'
import toast from 'react-hot-toast'

interface ProductCardProps {
  product: Product
  showARButton?: boolean
  className?: string
}

export default function ProductCard({ 
  product, 
  showARButton = true,
  className = '' 
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  const { addItem } = useCartStore()
  const { isAuthenticated } = useAuthStore()
  
  const primaryImage = product.images.find(img => img.isPrimary) || product.images[0]
  const secondaryImage = product.images.find(img => !img.isPrimary) || product.images[0]
  
  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to add items to cart')
      return
    }
    
    addItem(product)
    toast.success(`${product.name} added to cart`)
  }
  
  const handleWishlist = () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to add items to wishlist')
      return
    }
    
    setIsWishlisted(!isWishlisted)
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist')
  }
  
  const handleARTryOn = () => {
    if (!product.arModel) {
      toast.error('AR try-on not available for this product')
      return
    }
    
    // Navigate to AR try-on page with product
    window.location.href = `/try-on?product=${product.id}`
  }
  
  return (
    <motion.div
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden group ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <Link to={`/product/${product.id}`}>
          <img
            src={isHovered && secondaryImage ? secondaryImage.url : primaryImage.url}
            alt={isHovered && secondaryImage ? secondaryImage.alt : primaryImage.alt}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        
        {/* Image indicators */}
        {product.images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {product.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
        
        {/* Quick actions overlay */}
        <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleWishlist}
            className={`p-2 rounded-full shadow-lg transition-colors duration-200 ${
              isWishlisted 
                ? 'bg-red-500 text-white' 
                : 'bg-white text-gray-600 hover:text-red-500'
            }`}
          >
            <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
          
          {showARButton && product.arModel && (
            <Link
              to={`/try-on?product=${product.id}`}
              className="p-2 rounded-full bg-white text-gray-600 hover:text-primary-500 shadow-lg transition-colors duration-200"
            >
              <Camera className="h-4 w-4" />
            </Link>
          )}
        </div>
        
        {/* Sale badge */}
        {product.originalPrice && product.originalPrice > product.price && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
          </div>
        )}
        
        {/* Out of stock badge */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-3 py-1 rounded text-sm font-semibold">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2">
          <Link 
            to={`/product/${product.id}`}
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-500 transition-colors duration-200"
          >
            {product.brand}
          </Link>
        </div>
        
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-primary-500 transition-colors duration-200">
            {product.name}
          </h3>
        </Link>
        
        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
            ({product.reviewCount})
          </span>
        </div>
        
        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-lg text-gray-900 dark:text-white">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          {/* Currency */}
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {product.currency}
          </span>
        </div>
        
        {/* Action buttons */}
        <div className="flex space-x-2">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="flex-1 bg-primary-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Add to Cart</span>
          </button>
          
          <Link
            to={`/product/${product.id}`}
            className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <Eye className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          </Link>
        </div>
        
        {/* AR compatibility indicator */}
        {product.arModel && (
          <div className="mt-2 flex items-center text-xs text-primary-500">
            <Camera className="h-3 w-3 mr-1" />
            <span>AR Try-On Available</span>
          </div>
        )}
      </div>
    </motion.div>
  )
} 