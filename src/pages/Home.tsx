import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowRight, 
  Camera, 
  MessageCircle, 
  Users, 
  Star,
  ShoppingCart,
  Heart,
  Sparkles,
  Play,
  TrendingUp
} from 'lucide-react'
import { sampleProducts, sampleStyleRecommendations } from '@/services/sampleData'
import { useProductStore } from '@/store'
import ProductCard from '@/components/ProductCard'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { setFeaturedProducts, featuredProducts, loading } = useProductStore()
  
  // Hero carousel data
  const heroSlides = [
    {
      id: 1,
      title: 'Experience Fashion in AR',
      subtitle: 'Try on clothes virtually with our AI-powered AR technology',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop',
      cta: 'Start AR Try-On',
      link: '/try-on'
    },
    {
      id: 2,
      title: 'Virtual Personal Shopper',
      subtitle: 'Get personalized style recommendations from our AI assistant',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=600&fit=crop',
      cta: 'Chat with AI',
      link: '/virtual-shopper'
    },
    {
      id: 3,
      title: 'Live Fashion Shows',
      subtitle: 'Join virtual fashion shows and discover the latest trends',
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&h=600&fit=crop',
      cta: 'Watch Shows',
      link: '/fashion-show'
    }
  ]
  
  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [])
  
  // Load featured products
  useEffect(() => {
    if (featuredProducts.length === 0) {
      setFeaturedProducts(sampleProducts.slice(0, 6))
    }
  }, [featuredProducts, setFeaturedProducts])
  
  const features = [
    {
      icon: Camera,
      title: 'AR Try-On',
      description: 'Try clothes virtually with our advanced AR technology',
      color: 'bg-primary-500'
    },
    {
      icon: MessageCircle,
      title: 'AI Assistant',
      description: 'Get personalized style recommendations from our AI',
      color: 'bg-secondary-500'
    },
    {
      icon: Users,
      title: 'Social Shopping',
      description: 'Shop with friends in virtual fashion shows',
      color: 'bg-accent-500'
    },
    {
      icon: TrendingUp,
      title: 'Smart Analytics',
      description: 'Track your style preferences and trends',
      color: 'bg-green-500'
    }
  ]
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden rounded-2xl mb-12">
        <div className="relative h-full">
          {heroSlides.map((slide, index) => (
            <motion.div
              key={slide.id}
              className={`absolute inset-0 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              } transition-opacity duration-1000`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20" />
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-2xl text-white"
                  >
                    <h1 className="text-5xl font-bold mb-4">{slide.title}</h1>
                    <p className="text-xl mb-8 text-gray-200">{slide.subtitle}</p>
                    <Link
                      to={slide.link}
                      className="inline-flex items-center px-6 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors duration-200"
                    >
                      {slide.cta}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Carousel indicators */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentSlide ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Revolutionary Features
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Experience the future of fashion shopping with our cutting-edge technology
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${feature.color} text-white mb-4`}>
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Featured Products
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Discover our most popular items
            </p>
          </div>
          <Link
            to="/catalog"
            className="inline-flex items-center text-primary-500 hover:text-primary-600 font-semibold"
          >
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        
        {loading ? (
          <LoadingSpinner size="lg" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}
      </section>
      
      {/* Style Recommendations */}
      <section className="mb-16">
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              AI Style Recommendations
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Get personalized style suggestions based on your preferences
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sampleStyleRecommendations.map((recommendation, index) => (
              <motion.div
                key={recommendation.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <Sparkles className="h-6 w-6 text-primary-500 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Personalized for You
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {recommendation.reason}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {Math.round(recommendation.confidence * 100)}% match
                    </span>
                  </div>
                  <Link
                    to="/virtual-shopper"
                    className="text-primary-500 hover:text-primary-600 font-semibold text-sm"
                  >
                    Get More →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl p-12 text-white"
        >
          <h2 className="text-4xl font-bold mb-4">
            Ready to Transform Your Shopping Experience?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Join thousands of users who are already experiencing the future of fashion
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/try-on"
              className="inline-flex items-center px-8 py-4 bg-white text-primary-500 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <Camera className="mr-2 h-5 w-5" />
              Start AR Try-On
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-500 transition-colors duration-200"
            >
              Create Account
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
} 