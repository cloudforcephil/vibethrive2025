// User types
export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  preferences: UserPreferences
  createdAt: Date
  updatedAt: Date
}

export interface UserPreferences {
  style: string[]
  size: string
  colors: string[]
  budget: {
    min: number
    max: number
  }
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
  }
}

// Product types
export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  currency: string
  category: ProductCategory
  subcategory: string
  brand: string
  images: ProductImage[]
  sizes: ProductSize[]
  colors: ProductColor[]
  tags: string[]
  rating: number
  reviewCount: number
  inStock: boolean
  arModel?: string
  arTexture?: string
  createdAt: Date
  updatedAt: Date
}

export interface ProductImage {
  id: string
  url: string
  alt: string
  isPrimary: boolean
  arCompatible: boolean
}

export interface ProductSize {
  id: string
  name: string
  available: boolean
  stock: number
}

export interface ProductColor {
  id: string
  name: string
  hex: string
  available: boolean
}

export type ProductCategory = 
  | 'clothing'
  | 'shoes'
  | 'accessories'
  | 'jewelry'
  | 'bags'
  | 'watches'
  | 'sunglasses'

// Cart types
export interface CartItem {
  id: string
  productId: string
  product: Product
  quantity: number
  selectedSize?: string
  selectedColor?: string
  price: number
}

export interface Cart {
  id: string
  userId: string
  items: CartItem[]
  subtotal: number
  tax: number
  shipping: number
  total: number
  currency: string
  updatedAt: Date
}

// Order types
export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  status: OrderStatus
  paymentStatus: PaymentStatus
  shippingAddress: Address
  billingAddress: Address
  subtotal: number
  tax: number
  shipping: number
  total: number
  currency: string
  paymentMethod: PaymentMethod
  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  id: string
  productId: string
  product: Product
  quantity: number
  price: number
  selectedSize?: string
  selectedColor?: string
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded'

export type PaymentStatus = 
  | 'pending'
  | 'paid'
  | 'failed'
  | 'refunded'

export type PaymentMethod = 
  | 'credit_card'
  | 'paypal'
  | 'apple_pay'
  | 'google_pay'

// Address types
export interface Address {
  id: string
  firstName: string
  lastName: string
  company?: string
  address1: string
  address2?: string
  city: string
  state: string
  postalCode: string
  country: string
  phone?: string
  isDefault: boolean
}

// AR types
export interface ARModel {
  id: string
  productId: string
  modelUrl: string
  textureUrl?: string
  scale: number
  position: Vector3
  rotation: Vector3
  compatibleCategories: ProductCategory[]
}

export interface Vector3 {
  x: number
  y: number
  z: number
}

export interface ARSession {
  id: string
  userId: string
  productId: string
  model: ARModel
  position: Vector3
  rotation: Vector3
  scale: number
  screenshot?: string
  createdAt: Date
}

// AI types
export interface StyleRecommendation {
  id: string
  userId: string
  products: Product[]
  reason: string
  confidence: number
  createdAt: Date
}

export interface ChatMessage {
  id: string
  userId: string
  message: string
  isUser: boolean
  timestamp: Date
  metadata?: {
    productIds?: string[]
    category?: ProductCategory
    intent?: string
  }
}

// Social types
export interface SocialSession {
  id: string
  hostId: string
  participants: string[]
  products: Product[]
  status: 'waiting' | 'active' | 'ended'
  createdAt: Date
  endedAt?: Date
}

export interface FashionShow {
  id: string
  title: string
  description: string
  hostId: string
  products: Product[]
  startTime: Date
  endTime: Date
  participants: string[]
  status: 'scheduled' | 'live' | 'ended'
  streamUrl?: string
}

// API types
export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
  errors?: string[]
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Filter types
export interface ProductFilters {
  category?: ProductCategory
  subcategory?: string
  brand?: string[]
  priceRange?: {
    min: number
    max: number
  }
  colors?: string[]
  sizes?: string[]
  rating?: number
  inStock?: boolean
  tags?: string[]
}

export interface SortOption {
  field: string
  direction: 'asc' | 'desc'
  label: string
}

// Notification types
export interface Notification {
  id: string
  userId: string
  type: NotificationType
  title: string
  message: string
  data?: Record<string, any>
  read: boolean
  createdAt: Date
}

export type NotificationType = 
  | 'order_update'
  | 'price_drop'
  | 'new_arrival'
  | 'style_recommendation'
  | 'social_invite'
  | 'fashion_show'

// Error types
export interface AppError {
  code: string
  message: string
  details?: Record<string, any>
  timestamp: Date
}

// Performance types
export interface PerformanceMetrics {
  pageLoadTime: number
  arLoadTime: number
  modelLoadTime: number
  fps: number
  memoryUsage: number
  batteryLevel?: number
}

// Analytics types
export interface AnalyticsEvent {
  event: string
  properties: Record<string, any>
  timestamp: Date
  userId?: string
  sessionId: string
}

// Theme types
export interface Theme {
  name: string
  primary: string
  secondary: string
  accent: string
  background: string
  surface: string
  text: string
  textSecondary: string
}

// Utility types
export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

export interface PaginationParams {
  page: number
  limit: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface SearchParams {
  query: string
  filters: ProductFilters
  pagination: PaginationParams
} 