import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Home, 
  Grid, 
  Camera, 
  MessageCircle, 
  Users, 
  Heart, 
  Settings,
  LogOut,
  User,
  ShoppingBag,
  Star,
  TrendingUp,
  Sparkles
} from 'lucide-react'
import { useAuthStore, useUIStore } from '@/store'
import { categories } from '@/services/sampleData'

export default function Sidebar() {
  const location = useLocation()
  const { user, isAuthenticated, logout } = useAuthStore()
  const { toggleSidebar } = useUIStore()
  
  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Catalog', href: '/catalog', icon: Grid },
    { name: 'AR Try-On', href: '/try-on', icon: Camera },
    { name: 'Virtual Shopper', href: '/virtual-shopper', icon: MessageCircle },
    { name: 'Fashion Shows', href: '/fashion-show', icon: Users },
    { name: 'Wishlist', href: '/wishlist', icon: Heart },
  ]
  
  const handleLogout = () => {
    logout()
    toggleSidebar()
  }
  
  return (
    <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:z-50 lg:bg-white dark:bg-gray-800 lg:border-r lg:border-gray-200 dark:border-gray-700">
      <div className="flex-1 flex flex-col min-h-0 overflow-y-auto">
        {/* Logo */}
        <div className="flex items-center h-16 flex-shrink-0 px-4 bg-white dark:bg-gray-800">
          <Link to="/" className="flex items-center space-x-2">
            <Sparkles className="h-8 w-8 text-primary-500" />
            <span className="text-xl font-bold text-gradient">VibeThrive</span>
          </Link>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => toggleSidebar()}
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  isActive
                    ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>
        
        {/* Categories */}
        <div className="px-4 py-4">
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Categories
          </h3>
          <div className="space-y-1">
            {Object.entries(categories).map(([key, category]) => (
              <Link
                key={key}
                to={`/catalog?category=${key}`}
                onClick={() => toggleSidebar()}
                className="group flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
              >
                <ShoppingBag className="mr-3 h-4 w-4" />
                {category.name}
              </Link>
            ))}
          </div>
        </div>
        
        {/* User section */}
        {isAuthenticated && user && (
          <div className="flex-shrink-0 px-4 py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-8 w-8 rounded-full"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                  <User className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user.email}
                </p>
              </div>
            </div>
            
            <div className="mt-3 space-y-1">
              <Link
                to="/profile"
                onClick={() => toggleSidebar()}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
              >
                <User className="mr-3 h-4 w-4" />
                Profile
              </Link>
              <Link
                to="/orders"
                onClick={() => toggleSidebar()}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
              >
                <ShoppingBag className="mr-3 h-4 w-4" />
                Orders
              </Link>
              <Link
                to="/settings"
                onClick={() => toggleSidebar()}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
              >
                <Settings className="mr-3 h-4 w-4" />
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
              >
                <LogOut className="mr-3 h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        )}
        
        {/* Quick stats for authenticated users */}
        {isAuthenticated && (
          <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Quick Stats
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Wishlist</span>
                <span className="font-medium text-gray-900 dark:text-white">12</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Orders</span>
                <span className="font-medium text-gray-900 dark:text-white">8</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Reviews</span>
                <span className="font-medium text-gray-900 dark:text-white">5</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 