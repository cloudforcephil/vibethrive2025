import { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'
import { useUIStore } from '@/store'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const { sidebarOpen, theme } = useUIStore()
  
  // Hide sidebar on mobile for certain pages
  const hideSidebarOnMobile = ['/try-on', '/virtual-shopper', '/fashion-show'].includes(location.pathname)
  
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        {/* Sidebar */}
        {!hideSidebarOnMobile && (
          <Sidebar />
        )}
        
        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <Header />
          
          {/* Main content area */}
          <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4 py-6">
              {children}
            </div>
          </main>
          
          {/* Footer */}
          <Footer />
        </div>
      </div>
      
      {/* Mobile sidebar overlay */}
      {sidebarOpen && !hideSidebarOnMobile && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div 
            className="fixed inset-0 bg-gray-600 bg-opacity-75"
            onClick={() => useUIStore.getState().toggleSidebar()}
          />
          <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white dark:bg-gray-800">
            <Sidebar />
          </div>
        </div>
      )}
    </div>
  )
} 