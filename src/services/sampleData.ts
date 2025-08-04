import { Product, ProductCategory, User, StyleRecommendation, FashionShow } from '@/types'

// Sample users
export const sampleUsers: User[] = [
  {
    id: '1',
    email: 'john.doe@example.com',
    name: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    preferences: {
      style: ['casual', 'modern', 'minimalist'],
      size: 'M',
      colors: ['blue', 'black', 'white', 'gray'],
      budget: { min: 50, max: 500 },
      notifications: { email: true, push: true, sms: false }
    },
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    email: 'sarah.wilson@example.com',
    name: 'Sarah Wilson',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    preferences: {
      style: ['elegant', 'feminine', 'vintage'],
      size: 'S',
      colors: ['pink', 'purple', 'rose', 'cream'],
      budget: { min: 100, max: 800 },
      notifications: { email: true, push: true, sms: true }
    },
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10')
  }
]

// Sample products
export const sampleProducts: Product[] = [
  // Clothing
  {
    id: '1',
    name: 'Premium Cotton T-Shirt',
    description: 'Ultra-soft premium cotton t-shirt with a modern fit. Perfect for everyday wear with a comfortable, breathable design.',
    price: 29.99,
    originalPrice: 39.99,
    currency: 'USD',
    category: 'clothing',
    subcategory: 't-shirts',
    brand: 'VibeStyle',
    images: [
      {
        id: '1-1',
        url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop',
        alt: 'Premium Cotton T-Shirt - White',
        isPrimary: true,
        arCompatible: true
      },
      {
        id: '1-2',
        url: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=500&fit=crop',
        alt: 'Premium Cotton T-Shirt - Black',
        isPrimary: false,
        arCompatible: true
      }
    ],
    sizes: [
      { id: '1-s', name: 'S', available: true, stock: 15 },
      { id: '1-m', name: 'M', available: true, stock: 25 },
      { id: '1-l', name: 'L', available: true, stock: 20 },
      { id: '1-xl', name: 'XL', available: true, stock: 10 }
    ],
    colors: [
      { id: '1-white', name: 'White', hex: '#FFFFFF', available: true },
      { id: '1-black', name: 'Black', hex: '#000000', available: true },
      { id: '1-navy', name: 'Navy', hex: '#1B365D', available: true }
    ],
    tags: ['casual', 'cotton', 'comfortable', 'versatile'],
    rating: 4.5,
    reviewCount: 128,
    inStock: true,
    arModel: '/models/tshirt.glb',
    arTexture: '/textures/tshirt.jpg',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Slim Fit Jeans',
    description: 'Modern slim fit jeans with stretch denim for maximum comfort. Perfect for both casual and smart-casual looks.',
    price: 89.99,
    currency: 'USD',
    category: 'clothing',
    subcategory: 'jeans',
    brand: 'DenimCo',
    images: [
      {
        id: '2-1',
        url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop',
        alt: 'Slim Fit Jeans - Blue',
        isPrimary: true,
        arCompatible: true
      }
    ],
    sizes: [
      { id: '2-30', name: '30', available: true, stock: 8 },
      { id: '2-32', name: '32', available: true, stock: 12 },
      { id: '2-34', name: '34', available: true, stock: 15 },
      { id: '2-36', name: '36', available: true, stock: 10 }
    ],
    colors: [
      { id: '2-blue', name: 'Blue', hex: '#1E3A8A', available: true },
      { id: '2-black', name: 'Black', hex: '#000000', available: true }
    ],
    tags: ['denim', 'slim-fit', 'stretch', 'versatile'],
    rating: 4.3,
    reviewCount: 89,
    inStock: true,
    arModel: '/models/jeans.glb',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '3',
    name: 'Casual Blazer',
    description: 'Sophisticated casual blazer with a modern cut. Perfect for office wear or evening events.',
    price: 149.99,
    originalPrice: 199.99,
    currency: 'USD',
    category: 'clothing',
    subcategory: 'blazers',
    brand: 'Elegance',
    images: [
      {
        id: '3-1',
        url: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop',
        alt: 'Casual Blazer - Gray',
        isPrimary: true,
        arCompatible: true
      }
    ],
    sizes: [
      { id: '3-s', name: 'S', available: true, stock: 5 },
      { id: '3-m', name: 'M', available: true, stock: 8 },
      { id: '3-l', name: 'L', available: true, stock: 6 },
      { id: '3-xl', name: 'XL', available: false, stock: 0 }
    ],
    colors: [
      { id: '3-gray', name: 'Gray', hex: '#6B7280', available: true },
      { id: '3-navy', name: 'Navy', hex: '#1E3A8A', available: true }
    ],
    tags: ['blazer', 'formal', 'office', 'elegant'],
    rating: 4.7,
    reviewCount: 56,
    inStock: true,
    arModel: '/models/blazer.glb',
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-15')
  },
  // Shoes
  {
    id: '4',
    name: 'Classic Sneakers',
    description: 'Timeless classic sneakers with premium leather upper and cushioned sole for all-day comfort.',
    price: 129.99,
    currency: 'USD',
    category: 'shoes',
    subcategory: 'sneakers',
    brand: 'FootStyle',
    images: [
      {
        id: '4-1',
        url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop',
        alt: 'Classic Sneakers - White',
        isPrimary: true,
        arCompatible: true
      }
    ],
    sizes: [
      { id: '4-7', name: '7', available: true, stock: 10 },
      { id: '4-8', name: '8', available: true, stock: 15 },
      { id: '4-9', name: '9', available: true, stock: 12 },
      { id: '4-10', name: '10', available: true, stock: 8 },
      { id: '4-11', name: '11', available: true, stock: 5 }
    ],
    colors: [
      { id: '4-white', name: 'White', hex: '#FFFFFF', available: true },
      { id: '4-black', name: 'Black', hex: '#000000', available: true }
    ],
    tags: ['sneakers', 'classic', 'leather', 'comfortable'],
    rating: 4.6,
    reviewCount: 203,
    inStock: true,
    arModel: '/models/sneakers.glb',
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-15')
  },
  // Accessories
  {
    id: '5',
    name: 'Leather Crossbody Bag',
    description: 'Stylish leather crossbody bag with adjustable strap and multiple compartments for organized storage.',
    price: 79.99,
    currency: 'USD',
    category: 'accessories',
    subcategory: 'bags',
    brand: 'BagCraft',
    images: [
      {
        id: '5-1',
        url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop',
        alt: 'Leather Crossbody Bag - Brown',
        isPrimary: true,
        arCompatible: true
      }
    ],
    sizes: [
      { id: '5-one', name: 'One Size', available: true, stock: 20 }
    ],
    colors: [
      { id: '5-brown', name: 'Brown', hex: '#8B4513', available: true },
      { id: '5-black', name: 'Black', hex: '#000000', available: true }
    ],
    tags: ['bag', 'leather', 'crossbody', 'practical'],
    rating: 4.4,
    reviewCount: 67,
    inStock: true,
    arModel: '/models/bag.glb',
    createdAt: new Date('2024-01-06'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '6',
    name: 'Minimalist Watch',
    description: 'Elegant minimalist watch with a clean dial design and premium stainless steel case.',
    price: 299.99,
    currency: 'USD',
    category: 'accessories',
    subcategory: 'watches',
    brand: 'TimeCraft',
    images: [
      {
        id: '6-1',
        url: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=500&fit=crop',
        alt: 'Minimalist Watch - Silver',
        isPrimary: true,
        arCompatible: true
      }
    ],
    sizes: [
      { id: '6-one', name: 'One Size', available: true, stock: 12 }
    ],
    colors: [
      { id: '6-silver', name: 'Silver', hex: '#C0C0C0', available: true },
      { id: '6-gold', name: 'Gold', hex: '#FFD700', available: true }
    ],
    tags: ['watch', 'minimalist', 'elegant', 'premium'],
    rating: 4.8,
    reviewCount: 34,
    inStock: true,
    arModel: '/models/watch.glb',
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-15')
  },
  // Jewelry
  {
    id: '7',
    name: 'Sterling Silver Necklace',
    description: 'Delicate sterling silver necklace with a minimalist pendant design. Perfect for everyday elegance.',
    price: 59.99,
    currency: 'USD',
    category: 'jewelry',
    subcategory: 'necklaces',
    brand: 'JewelCraft',
    images: [
      {
        id: '7-1',
        url: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=500&fit=crop',
        alt: 'Sterling Silver Necklace',
        isPrimary: true,
        arCompatible: true
      }
    ],
    sizes: [
      { id: '7-one', name: 'One Size', available: true, stock: 25 }
    ],
    colors: [
      { id: '7-silver', name: 'Silver', hex: '#C0C0C0', available: true }
    ],
    tags: ['necklace', 'silver', 'minimalist', 'elegant'],
    rating: 4.5,
    reviewCount: 89,
    inStock: true,
    arModel: '/models/necklace.glb',
    createdAt: new Date('2024-01-09'),
    updatedAt: new Date('2024-01-15')
  },
  // Sunglasses
  {
    id: '8',
    name: 'Aviator Sunglasses',
    description: 'Classic aviator sunglasses with UV400 protection and premium metal frame. Timeless style for any occasion.',
    price: 159.99,
    currency: 'USD',
    category: 'accessories',
    subcategory: 'sunglasses',
    brand: 'EyeStyle',
    images: [
      {
        id: '8-1',
        url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=500&fit=crop',
        alt: 'Aviator Sunglasses - Gold',
        isPrimary: true,
        arCompatible: true
      }
    ],
    sizes: [
      { id: '8-one', name: 'One Size', available: true, stock: 18 }
    ],
    colors: [
      { id: '8-gold', name: 'Gold', hex: '#FFD700', available: true },
      { id: '8-silver', name: 'Silver', hex: '#C0C0C0', available: true }
    ],
    tags: ['sunglasses', 'aviator', 'classic', 'UV-protection'],
    rating: 4.6,
    reviewCount: 156,
    inStock: true,
    arModel: '/models/sunglasses.glb',
    createdAt: new Date('2024-01-04'),
    updatedAt: new Date('2024-01-15')
  }
]

// Sample style recommendations
export const sampleStyleRecommendations: StyleRecommendation[] = [
  {
    id: '1',
    userId: '1',
    products: [sampleProducts[0], sampleProducts[1], sampleProducts[4]],
    reason: 'Based on your casual style preference and recent purchases',
    confidence: 0.85,
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    userId: '2',
    products: [sampleProducts[2], sampleProducts[5], sampleProducts[7]],
    reason: 'Perfect for your elegant style and upcoming events',
    confidence: 0.92,
    createdAt: new Date('2024-01-15')
  }
]

// Sample fashion shows
export const sampleFashionShows: FashionShow[] = [
  {
    id: '1',
    title: 'Spring Collection Preview',
    description: 'Exclusive preview of our latest spring collection featuring sustainable fashion and modern designs.',
    hostId: '1',
    products: [sampleProducts[0], sampleProducts[2], sampleProducts[4]],
    startTime: new Date('2024-03-15T19:00:00Z'),
    endTime: new Date('2024-03-15T21:00:00Z'),
    participants: ['1', '2'],
    status: 'scheduled',
    streamUrl: 'https://stream.example.com/spring-preview'
  },
  {
    id: '2',
    title: 'Sustainable Fashion Week',
    description: 'Join us for a week-long celebration of sustainable fashion with live demonstrations and exclusive discounts.',
    hostId: '2',
    products: sampleProducts.slice(0, 4),
    startTime: new Date('2024-04-01T18:00:00Z'),
    endTime: new Date('2024-04-07T22:00:00Z'),
    participants: ['1', '2'],
    status: 'scheduled',
    streamUrl: 'https://stream.example.com/sustainable-week'
  }
]

// Categories with subcategories
export const categories = {
  clothing: {
    name: 'Clothing',
    subcategories: ['t-shirts', 'jeans', 'blazers', 'dresses', 'skirts', 'pants', 'shirts', 'sweaters', 'jackets', 'coats']
  },
  shoes: {
    name: 'Shoes',
    subcategories: ['sneakers', 'boots', 'sandals', 'loafers', 'heels', 'flats', 'athletic']
  },
  accessories: {
    name: 'Accessories',
    subcategories: ['bags', 'watches', 'sunglasses', 'belts', 'scarves', 'hats', 'gloves']
  },
  jewelry: {
    name: 'Jewelry',
    subcategories: ['necklaces', 'earrings', 'bracelets', 'rings', 'anklets', 'brooches']
  },
  bags: {
    name: 'Bags',
    subcategories: ['handbags', 'backpacks', 'clutches', 'totes', 'crossbody', 'wallets']
  },
  watches: {
    name: 'Watches',
    subcategories: ['analog', 'digital', 'smart', 'luxury', 'sport', 'dress']
  },
  sunglasses: {
    name: 'Sunglasses',
    subcategories: ['aviator', 'wayfarer', 'round', 'cat-eye', 'oversized', 'sport']
  }
}

// Popular brands
export const popularBrands = [
  'VibeStyle',
  'DenimCo',
  'Elegance',
  'FootStyle',
  'BagCraft',
  'TimeCraft',
  'JewelCraft',
  'EyeStyle',
  'Nike',
  'Adidas',
  'Zara',
  'H&M',
  'Uniqlo',
  'Levi\'s',
  'Calvin Klein'
]

// Popular tags
export const popularTags = [
  'casual',
  'formal',
  'elegant',
  'minimalist',
  'vintage',
  'modern',
  'sustainable',
  'comfortable',
  'versatile',
  'premium',
  'classic',
  'trendy',
  'sporty',
  'feminine',
  'masculine'
]

// Price ranges
export const priceRanges = [
  { label: 'Under $50', min: 0, max: 50 },
  { label: '$50 - $100', min: 50, max: 100 },
  { label: '$100 - $200', min: 100, max: 200 },
  { label: '$200 - $500', min: 200, max: 500 },
  { label: 'Over $500', min: 500, max: 10000 }
]

// Size options
export const sizeOptions = {
  clothing: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  shoes: ['6', '7', '8', '9', '10', '11', '12'],
  accessories: ['One Size'],
  jewelry: ['One Size']
}

// Color options
export const colorOptions = [
  { name: 'Black', hex: '#000000' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Gray', hex: '#6B7280' },
  { name: 'Navy', hex: '#1E3A8A' },
  { name: 'Blue', hex: '#3B82F6' },
  { name: 'Red', hex: '#EF4444' },
  { name: 'Green', hex: '#10B981' },
  { name: 'Yellow', hex: '#F59E0B' },
  { name: 'Purple', hex: '#8B5CF6' },
  { name: 'Pink', hex: '#EC4899' },
  { name: 'Brown', hex: '#8B4513' },
  { name: 'Silver', hex: '#C0C0C0' },
  { name: 'Gold', hex: '#FFD700' }
] 