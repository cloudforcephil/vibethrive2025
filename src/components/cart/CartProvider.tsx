import { createContext, useContext, ReactNode } from 'react'
import { useCartStore } from '@/store'

interface CartContextType {
  items: any[]
  loading: boolean
  error: string | null
  addItem: (product: any, quantity?: number, size?: string, color?: string) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

interface CartProviderProps {
  children: ReactNode
}

export function CartProvider({ children }: CartProviderProps) {
  const cartStore = useCartStore()
  
  return (
    <CartContext.Provider value={cartStore}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
} 