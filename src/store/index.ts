import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { StoreState, Product, CartItem, User, Color, Size } from '@/types';

interface StoreActions {
  // Cart actions
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateCartItemQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  // User actions
  setUser: (user: User | null) => void;
  
  // Fitting room actions
  openFittingRoom: (product: Product) => void;
  closeFittingRoom: () => void;
  toggleFittingRoom: () => void;
  setFittingRoomFullscreen: (isFullscreen: boolean) => void;
  
  // AR actions
  activateAR: () => void;
  deactivateAR: () => void;
  setHatModel: (model: string | null) => void;
  setAvatarModel: (model: string | null) => void;
  updateHatPosition: (position: { x: number; y: number; z: number }) => void;
  updateHatRotation: (rotation: { x: number; y: number; z: number }) => void;
  updateHatScale: (scale: { x: number; y: number; z: number }) => void;
  setSelectedColor: (color: Color | null) => void;
  setSelectedSize: (size: Size | null) => void;
  
  // Wishlist actions
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  
  // Recently viewed actions
  addToRecentlyViewed: (product: Product) => void;
}

type Store = StoreState & StoreActions;

const initialState: StoreState = {
  cart: [],
  user: null,
  fittingRoom: {
    isOpen: false,
    currentProduct: null,
    arState: {
      isActive: false,
      isCameraActive: false,
      hatModel: null,
      avatarModel: null,
      hatPosition: { x: 0, y: 0, z: 0 },
      hatRotation: { x: 0, y: 0, z: 0 },
      hatScale: { x: 1, y: 1, z: 1 },
      selectedColor: null,
      selectedSize: null,
    },
    isFullscreen: false,
  },
  wishlist: [],
  recentlyViewed: [],
};

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      // Cart actions
      addToCart: (item) => {
        const { cart } = get();
        const existingItem = cart.find(
          (cartItem) => cartItem.product.id === item.product.id
        );
        
        if (existingItem) {
          set({
            cart: cart.map((cartItem) =>
              cartItem.product.id === item.product.id
                ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                : cartItem
            ),
          });
        } else {
          set({ cart: [...cart, item] });
        }
      },
      
      removeFromCart: (productId) => {
        const { cart } = get();
        set({ cart: cart.filter((item) => item.product.id !== productId) });
      },
      
      updateCartItemQuantity: (productId, quantity) => {
        const { cart } = get();
        set({
          cart: cart.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        });
      },
      
      clearCart: () => set({ cart: [] }),
      
      // User actions
      setUser: (user) => set({ user }),
      
      // Fitting room actions
      openFittingRoom: (product) => {
        set({
          fittingRoom: {
            ...get().fittingRoom,
            isOpen: true,
            currentProduct: product,
          },
        });
      },
      
      closeFittingRoom: () => {
        set({
          fittingRoom: {
            ...get().fittingRoom,
            isOpen: false,
            currentProduct: null,
            arState: {
              ...get().fittingRoom.arState,
              isActive: false,
              isCameraActive: false,
            },
          },
        });
      },
      
      toggleFittingRoom: () => {
        const { fittingRoom } = get();
        set({
          fittingRoom: {
            ...fittingRoom,
            isOpen: !fittingRoom.isOpen,
          },
        });
      },
      
      setFittingRoomFullscreen: (isFullscreen) => {
        const { fittingRoom } = get();
        set({
          fittingRoom: {
            ...fittingRoom,
            isFullscreen,
          },
        });
      },
      
      // AR actions
      activateAR: () => {
        const { fittingRoom } = get();
        set({
          fittingRoom: {
            ...fittingRoom,
            arState: {
              ...fittingRoom.arState,
              isActive: true,
              isCameraActive: true,
            },
          },
        });
      },
      
      deactivateAR: () => {
        const { fittingRoom } = get();
        set({
          fittingRoom: {
            ...fittingRoom,
            arState: {
              ...fittingRoom.arState,
              isActive: false,
              isCameraActive: false,
            },
          },
        });
      },
      
      setHatModel: (model: string | null) => {
        const { fittingRoom } = get();
        set({
          fittingRoom: {
            ...fittingRoom,
            arState: {
              ...fittingRoom.arState,
              hatModel: model,
            },
          },
        });
      },
      
      setAvatarModel: (model: string | null) => {
        const { fittingRoom } = get();
        set({
          fittingRoom: {
            ...fittingRoom,
            arState: {
              ...fittingRoom.arState,
              avatarModel: model,
            },
          },
        });
      },
      
      updateHatPosition: (position) => {
        const { fittingRoom } = get();
        set({
          fittingRoom: {
            ...fittingRoom,
            arState: {
              ...fittingRoom.arState,
              hatPosition: position,
            },
          },
        });
      },
      
      updateHatRotation: (rotation) => {
        const { fittingRoom } = get();
        set({
          fittingRoom: {
            ...fittingRoom,
            arState: {
              ...fittingRoom.arState,
              hatRotation: rotation,
            },
          },
        });
      },
      
      updateHatScale: (scale) => {
        const { fittingRoom } = get();
        set({
          fittingRoom: {
            ...fittingRoom,
            arState: {
              ...fittingRoom.arState,
              hatScale: scale,
            },
          },
        });
      },
      
      setSelectedColor: (color) => {
        const { fittingRoom } = get();
        set({
          fittingRoom: {
            ...fittingRoom,
            arState: {
              ...fittingRoom.arState,
              selectedColor: color,
            },
          },
        });
      },
      
      setSelectedSize: (size) => {
        const { fittingRoom } = get();
        set({
          fittingRoom: {
            ...fittingRoom,
            arState: {
              ...fittingRoom.arState,
              selectedSize: size,
            },
          },
        });
      },
      
      // Wishlist actions
      addToWishlist: (product) => {
        const { wishlist } = get();
        if (!wishlist.find((item) => item.id === product.id)) {
          set({ wishlist: [...wishlist, product] });
        }
      },
      
      removeFromWishlist: (productId) => {
        const { wishlist } = get();
        set({ wishlist: wishlist.filter((item) => item.id !== productId) });
      },
      
      // Recently viewed actions
      addToRecentlyViewed: (product) => {
        const { recentlyViewed } = get();
        const filtered = recentlyViewed.filter((item) => item.id !== product.id);
        set({ recentlyViewed: [product, ...filtered].slice(0, 10) });
      },
    }),
    {
      name: 'hat-ar-store',
      partialize: (state) => ({
        cart: state.cart,
        user: state.user,
        wishlist: state.wishlist,
        recentlyViewed: state.recentlyViewed,
      }),
    }
  )
);
