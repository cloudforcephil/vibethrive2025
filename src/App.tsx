import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Layout from '@/components/Layout'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { AuthProvider } from '@/components/auth/AuthProvider'
import { ARProvider } from '@/components/ar/ARProvider'
import { CartProvider } from '@/components/cart/CartProvider'

// Lazy load pages for better performance
const Home = lazy(() => import('@/pages/Home'))
const TryOn = lazy(() => import('@/pages/TryOn'))
const Catalog = lazy(() => import('@/pages/Catalog'))
const ProductDetail = lazy(() => import('@/pages/ProductDetail'))
const Cart = lazy(() => import('@/pages/Cart'))
const Checkout = lazy(() => import('@/pages/Checkout'))
const Profile = lazy(() => import('@/pages/Profile'))
const Login = lazy(() => import('@/pages/Login'))
const Register = lazy(() => import('@/pages/Register'))
const VirtualShopper = lazy(() => import('@/pages/VirtualShopper'))
const FashionShow = lazy(() => import('@/pages/FashionShow'))
const NotFound = lazy(() => import('@/pages/NotFound'))

function App() {
  return (
    <AuthProvider>
      <ARProvider>
        <CartProvider>
          <Layout>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/try-on" element={<TryOn />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/virtual-shopper" element={<VirtualShopper />} />
                <Route path="/fashion-show" element={<FashionShow />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </Layout>
        </CartProvider>
      </ARProvider>
    </AuthProvider>
  )
}

export default App 