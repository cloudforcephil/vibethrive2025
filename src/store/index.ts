import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { User, Product, CartItem, Cart, LoadingState, ProductFilters, ARSession } from '@/types'

// Auth store
interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: LoadingState
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (userData: Partial<User>) => Promise<void>
  logout: () => void
  updateProfile: (data: Partial<User>) => Promise<void>
  clearError: () => void
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        isAuthenticated: false,
        loading: 'idle',
        error: null,
        
        login: async (email: string, password: string) => {
          set({ loading: 'loading', error: null })
          try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000))
            const user: User = {
              id: '1',
              email,
              name: 'John Doe',
              preferences: {
                style: ['casual', 'modern'],
                size: 'M',
                colors: ['blue', 'black', 'white'],
                budget: { min: 50, max: 500 },
                notifications: { email: true, push: true, sms: false }
              },
              createdAt: new Date(),
              updatedAt: new Date()
            }
            set({ user, isAuthenticated: true, loading: 'success' })
          } catch (error) {
            set({ error: 'Login failed', loading: 'error' })
          }
        },
        
        register: async (userData: Partial<User>) => {
          set({ loading: 'loading', error: null })
          try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000))
            const user: User = {
              id: '1',
              email: userData.email!,
              name: userData.name!,
              preferences: {
                style: ['casual'],
                size: 'M',
                colors: ['blue', 'black'],
                budget: { min: 50, max: 300 },
                notifications: { email: true, push: true, sms: false }
              },
              createdAt: new Date(),
              updatedAt: new Date()
            }
            set({ user, isAuthenticated: true, loading: 'success' })
          } catch (error) {
            set({ error: 'Registration failed', loading: 'error' })
          }
        },
        
        logout: () => {
          set({ user: null, isAuthenticated: false, loading: 'idle' })
        },
        
        updateProfile: async (data: Partial<User>) => {
          const { user } = get()
          if (!user) return
          
          set({ loading: 'loading' })
          try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500))
            const updatedUser = { ...user, ...data, updatedAt: new Date() }
            set({ user: updatedUser, loading: 'success' })
          } catch (error) {
            set({ error: 'Profile update failed', loading: 'error' })
          }
        },
        
        clearError: () => set({ error: null })
      }),
      {
        name: 'auth-storage',
        partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated })
      }
    )
  )
)

// Cart store
interface CartState {
  items: CartItem[]
  loading: LoadingState
  error: string | null
  addItem: (product: Product, quantity?: number, size?: string, color?: string) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
}

export const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set, get) => ({
        items: [],
        loading: 'idle',
        error: null,
        
        addItem: (product: Product, quantity = 1, size?: string, color?: string) => {
          const { items } = get()
          const existingItem = items.find(item => 
            item.productId === product.id && 
            item.selectedSize === size && 
            item.selectedColor === color
          )
          
          if (existingItem) {
            set({
              items: items.map(item =>
                item.id === existingItem.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              )
            })
          } else {
            const newItem: CartItem = {
              id: `${product.id}-${Date.now()}`,
              productId: product.id,
              product,
              quantity,
              selectedSize: size,
              selectedColor: color,
              price: product.price
            }
            set({ items: [...items, newItem] })
          }
        },
        
        removeItem: (itemId: string) => {
          const { items } = get()
          set({ items: items.filter(item => item.id !== itemId) })
        },
        
        updateQuantity: (itemId: string, quantity: number) => {
          const { items } = get()
          set({
            items: items.map(item =>
              item.id === itemId ? { ...item, quantity } : item
            )
          })
        },
        
        clearCart: () => set({ items: [] }),
        
        getTotal: () => {
          const { items } = get()
          return items.reduce((total, item) => total + (item.price * item.quantity), 0)
        },
        
        getItemCount: () => {
          const { items } = get()
          return items.reduce((count, item) => count + item.quantity, 0)
        }
      }),
      {
        name: 'cart-storage',
        partialize: (state) => ({ items: state.items })
      }
    )
  )
)

// Product store
interface ProductState {
  products: Product[]
  featuredProducts: Product[]
  loading: LoadingState
  error: string | null
  filters: ProductFilters
  searchQuery: string
  setProducts: (products: Product[]) => void
  setFeaturedProducts: (products: Product[]) => void
  setLoading: (loading: LoadingState) => void
  setError: (error: string | null) => void
  setFilters: (filters: Partial<ProductFilters>) => void
  setSearchQuery: (query: string) => void
  clearFilters: () => void
}

export const useProductStore = create<ProductState>()(
  devtools(
    (set, get) => ({
      products: [],
      featuredProducts: [],
      loading: 'idle',
      error: null,
      filters: {},
      searchQuery: '',
      
      setProducts: (products: Product[]) => set({ products }),
      setFeaturedProducts: (products: Product[]) => set({ featuredProducts: products }),
      setLoading: (loading: LoadingState) => set({ loading }),
      setError: (error: string | null) => set({ error }),
      setFilters: (filters: Partial<ProductFilters>) => {
        const currentFilters = get().filters
        set({ filters: { ...currentFilters, ...filters } })
      },
      setSearchQuery: (searchQuery: string) => set({ searchQuery }),
      clearFilters: () => set({ filters: {}, searchQuery: '' })
    })
  )
)

// AR store
interface ARState {
  currentSession: ARSession | null
  isARActive: boolean
  loading: LoadingState
  error: string | null
  performanceMetrics: {
    fps: number
    memoryUsage: number
    batteryLevel?: number
  }
  startARSession: (productId: string) => Promise<void>
  stopARSession: () => void
  updateARPosition: (position: { x: number; y: number; z: number }) => void
  updateARRotation: (rotation: { x: number; y: number; z: number }) => void
  updateARScale: (scale: number) => void
  captureScreenshot: () => Promise<string>
  setPerformanceMetrics: (metrics: Partial<ARState['performanceMetrics']>) => void
}

export const useARStore = create<ARState>()(
  devtools(
    (set, get) => ({
      currentSession: null,
      isARActive: false,
      loading: 'idle',
      error: null,
      performanceMetrics: {
        fps: 60,
        memoryUsage: 0,
        batteryLevel: undefined
      },
      
      startARSession: async (productId: string) => {
        set({ loading: 'loading', error: null })
        try {
          // Simulate AR session initialization
          await new Promise(resolve => setTimeout(resolve, 2000))
          const session: ARSession = {
            id: `ar-${Date.now()}`,
            userId: '1',
            productId,
            model: {
              id: 'model-1',
              productId,
              modelUrl: '/models/product.glb',
              scale: 1,
              position: { x: 0, y: 0, z: 0 },
              rotation: { x: 0, y: 0, z: 0 },
              compatibleCategories: ['clothing', 'accessories']
            },
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: 1,
            createdAt: new Date()
          }
          set({ currentSession: session, isARActive: true, loading: 'success' })
        } catch (error) {
          set({ error: 'Failed to start AR session', loading: 'error' })
        }
      },
      
      stopARSession: () => {
        set({ currentSession: null, isARActive: false, loading: 'idle' })
      },
      
      updateARPosition: (position) => {
        const { currentSession } = get()
        if (currentSession) {
          set({
            currentSession: { ...currentSession, position }
          })
        }
      },
      
      updateARRotation: (rotation) => {
        const { currentSession } = get()
        if (currentSession) {
          set({
            currentSession: { ...currentSession, rotation }
          })
        }
      },
      
      updateARScale: (scale) => {
        const { currentSession } = get()
        if (currentSession) {
          set({
            currentSession: { ...currentSession, scale }
          })
        }
      },
      
      captureScreenshot: async () => {
        // Simulate screenshot capture
        await new Promise(resolve => setTimeout(resolve, 500))
        return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
      },
      
      setPerformanceMetrics: (metrics) => {
        const currentMetrics = get().performanceMetrics
        set({ performanceMetrics: { ...currentMetrics, ...metrics } })
      }
    })
  )
)

// UI store
interface UIState {
  sidebarOpen: boolean
  modalOpen: boolean
  modalType: string | null
  theme: 'light' | 'dark'
  notifications: boolean
  toggleSidebar: () => void
  openModal: (type: string) => void
  closeModal: () => void
  toggleTheme: () => void
  toggleNotifications: () => void
}

export const useUIStore = create<UIState>()(
  devtools(
    persist(
      (set, get) => ({
        sidebarOpen: false,
        modalOpen: false,
        modalType: null,
        theme: 'light',
        notifications: true,
        
        toggleSidebar: () => {
          const { sidebarOpen } = get()
          set({ sidebarOpen: !sidebarOpen })
        },
        
        openModal: (type: string) => {
          set({ modalOpen: true, modalType: type })
        },
        
        closeModal: () => {
          set({ modalOpen: false, modalType: null })
        },
        
        toggleTheme: () => {
          const { theme } = get()
          set({ theme: theme === 'light' ? 'dark' : 'light' })
        },
        
        toggleNotifications: () => {
          const { notifications } = get()
          set({ notifications: !notifications })
        }
      }),
      {
        name: 'ui-storage',
        partialize: (state) => ({ theme: state.theme, notifications: state.notifications })
      }
    )
  )
) 