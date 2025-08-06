import { Product } from '@/types';

export const hatProduct: Product = {
  id: '1',
  name: 'Red Pattern Bucket Hat',
  description: 'A striking red bucket hat featuring an intricate white geometric pattern. This bold design combines street style with artistic flair, perfect for making a statement. Features premium cotton construction and a classic bucket hat silhouette.',
  price: 39.99,
  originalPrice: 54.99,
  images: [
    '/images/products/abstract-bucket-hat-1.jpg', // Your actual red bucket hat - Image 1
    '/images/products/abstract-bucket-hat-2.jpg', // Your actual red bucket hat - Image 2  
    '/images/products/abstract-bucket-hat-3.jpg', // Your actual red bucket hat - Image 3
    '/placeholder-bucket-hat.svg', // Fallback placeholder
  ],
  colors: [
    { id: '1', name: 'Red', hex: '#DC2626', available: true },
    { id: '2', name: 'Black', hex: '#000000', available: true },
    { id: '3', name: 'Navy', hex: '#1E3A8A', available: true },
    { id: '4', name: 'Forest Green', hex: '#059669', available: false },
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
  tags: ['bucket hat', 'cotton', 'pattern', 'streetwear', 'artistic'],
  features: [
    '100% Premium cotton construction',
    'Unique geometric pattern design',
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
    images: ['/images/products/abstract-bucket-hat-1.jpg'],
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
    images: ['/images/products/abstract-bucket-hat-1.jpg'],
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
