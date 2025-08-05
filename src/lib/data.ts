import { Product } from '@/types';

export const hatProduct: Product = {
  id: '1',
  name: 'Salty Bucket Hat',
  description: 'A vibrant orange bucket hat with embroidered "salty" text. Perfect for casual outings, beach days, and street style. Features a comfortable cotton construction and classic bucket hat silhouette.',
  price: 34.99,
  originalPrice: 49.99,
  images: [
    '/placeholder-bucket-hat.svg', // Always use reliable local image first
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&h=800&fit=crop&q=80', // Bucket hat front view
    'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?w=800&h=800&fit=crop&q=80', // Bucket hat side angle  
    'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=800&h=800&fit=crop&q=80', // Bucket hat detail shot
  ],
  colors: [
    { id: '1', name: 'Orange', hex: '#E67E22', available: true },
    { id: '2', name: 'Black', hex: '#000000', available: true },
    { id: '3', name: 'White', hex: '#FFFFFF', available: true },
    { id: '4', name: 'Navy', hex: '#2C3E50', available: true },
  ],
  sizes: [
    { id: '1', name: 'S', available: true },
    { id: '2', name: 'M', available: true },
    { id: '3', name: 'L', available: true },
    { id: '4', name: 'XL', available: true },
  ],
  category: 'Hats',
  brand: 'Salty Co.',
  rating: 4.6,
  reviewCount: 89,
  inStock: true,
  tags: ['bucket hat', 'cotton', 'casual', 'streetwear', 'beach'],
  features: [
    '100% Cotton construction',
    'Embroidered "salty" text',
    'Comfortable bucket fit',
    'UV protection',
    'Machine washable',
  ],
};

export const relatedProducts: Product[] = [
  {
    id: '2',
    name: 'Classic Black Bucket Hat',
    description: 'A timeless black bucket hat with minimalist design. Perfect for everyday wear and street style.',
    price: 29.99,
    images: ['/placeholder-bucket-hat.svg'],
    colors: [{ id: '1', name: 'Black', hex: '#000000', available: true }],
    sizes: [{ id: '1', name: 'One Size', available: true }],
    category: 'Hats',
    brand: 'Salty Co.',
    rating: 4.4,
    reviewCount: 67,
    inStock: true,
    tags: ['bucket hat', 'black', 'minimal', 'streetwear'],
    features: ['Cotton construction', 'Classic fit', 'Versatile style'],
  },
  {
    id: '3',
    name: 'Tie-Dye Bucket Hat',
    description: 'A vibrant tie-dye bucket hat for festival season and summer vibes.',
    price: 39.99,
    images: ['/placeholder-bucket-hat.svg'],
    colors: [{ id: '1', name: 'Multi', hex: '#FF6B6B', available: true }],
    sizes: [{ id: '1', name: 'One Size', available: true }],
    category: 'Hats',
    brand: 'Salty Co.',
    rating: 4.3,
    reviewCount: 43,
    inStock: true,
    tags: ['bucket hat', 'tie-dye', 'festival', 'summer'],
    features: ['100% Cotton', 'Unique tie-dye pattern', 'Festival ready'],
  },
];
