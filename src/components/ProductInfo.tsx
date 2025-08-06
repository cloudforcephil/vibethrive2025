'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Heart, Share2, Truck, Shield, RotateCcw } from 'lucide-react';
import { Product, Color, Size } from '@/types';
import { useStore } from '@/store';

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [selectedColor, setSelectedColor] = useState<Color | null>(product.colors[0] || null);
  const [selectedSize, setSelectedSize] = useState<Size | null>(product.sizes[0] || null);
  const [quantity, setQuantity] = useState(1);

  const { addToCart, addToWishlist, openFittingRoom } = useStore();

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) return;
    
    addToCart({
      product,
      quantity,
      selectedColor,
      selectedSize,
    });
  };

  const handleTryOn = () => {
    openFittingRoom(product);
  };

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Brand and Name */}
      <div>
        <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < Math.floor(product.rating)
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-600">
          {product.rating} ({product.reviewCount} reviews)
        </span>
      </div>

      {/* Price */}
      <div className="flex items-center gap-3">
        <span className="text-3xl font-bold text-gray-900">${product.price}</span>
        {product.originalPrice && (
          <>
            <span className="text-xl text-gray-400 line-through">
              ${product.originalPrice}
            </span>
            <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-medium">
              {discountPercentage}% OFF
            </span>
          </>
        )}
      </div>

      {/* Description */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
        <p className="text-gray-600 leading-relaxed">{product.description}</p>
      </div>

      {/* Color Selection */}
      {product.colors.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Color</h3>
          <div className="flex gap-3">
            {product.colors.map((color) => (
              <button
                key={color.id}
                onClick={() => setSelectedColor(color)}
                disabled={!color.available}
                className={`w-8 h-8 rounded-full border-2 transition-all ${
                  selectedColor?.id === color.id
                    ? 'border-blue-500 scale-110'
                    : 'border-gray-300 hover:border-gray-400'
                } ${!color.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        </div>
      )}

      {/* Size Selection */}
      {product.sizes.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Size</h3>
          <div className="flex gap-2">
            {product.sizes.map((size) => (
              <button
                key={size.id}
                onClick={() => setSelectedSize(size)}
                disabled={!size.available}
                className={`px-4 py-2 rounded-lg border-2 transition-all ${
                  selectedSize?.id === size.id
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                } ${!size.available ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {size.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Quantity</h3>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
          >
            -
          </button>
          <span className="w-12 text-center font-medium">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
          >
            +
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddToCart}
          disabled={!selectedColor || !selectedSize}
          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-3 px-6 rounded-lg font-medium transition-colors"
        >
          Add to Cart
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleTryOn}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
        >
          Try On Digi-me
        </motion.button>
      </div>

      {/* Secondary Actions */}
      <div className="flex gap-4">
        <button
          onClick={() => addToWishlist(product)}
          className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors"
        >
          <Heart className="w-5 h-5" />
          Add to Wishlist
        </button>
        <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
          <Share2 className="w-5 h-5" />
          Share
        </button>
      </div>

      {/* Features */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
        <ul className="space-y-2">
          {product.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-gray-600">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Shipping Info */}
      <div className="border-t pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <Truck className="w-5 h-5 text-green-500" />
            <div>
              <p className="font-medium text-gray-900">Free Shipping</p>
              <p className="text-sm text-gray-600">On orders over $50</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-blue-500" />
            <div>
              <p className="font-medium text-gray-900">Secure Payment</p>
              <p className="text-sm text-gray-600">SSL encrypted</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <RotateCcw className="w-5 h-5 text-orange-500" />
            <div>
              <p className="font-medium text-gray-900">Easy Returns</p>
              <p className="text-sm text-gray-600">30-day returns</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
