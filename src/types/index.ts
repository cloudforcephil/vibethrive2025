export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  colors: Color[];
  sizes: Size[];
  category: string;
  brand: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  tags: string[];
  features: string[];
}

export interface Color {
  id: string;
  name: string;
  hex: string;
  available: boolean;
}

export interface Size {
  id: string;
  name: string;
  available: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: Color;
  selectedSize?: Size;
}

export interface ARState {
  isActive: boolean;
  isCameraActive: boolean;
  hatModel: string | null;
  avatarModel: string | null;
  hatPosition: { x: number; y: number; z: number };
  hatRotation: { x: number; y: number; z: number };
  hatScale: { x: number; y: number; z: number };
  selectedColor: Color | null;
  selectedSize: Size | null;
}

export interface FittingRoomState {
  isOpen: boolean;
  currentProduct: Product | null;
  arState: ARState;
  isFullscreen: boolean;
}

export interface StoreState {
  cart: CartItem[];
  user: User | null;
  fittingRoom: FittingRoomState;
  wishlist: Product[];
  recentlyViewed: Product[];
}
