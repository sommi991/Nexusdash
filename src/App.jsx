import React, { useEffect, lazy, Suspense, useState } from 'react'
import { NexusShell } from './components/layout/NexusShell'
import { useNexusStore } from './store/nexusStore'
import { NexusProvider } from './context/NexusContext'
import { LoadingSpinner } from './components/core/Loading'
import { GestureProvider } from './components/core/GestureProvider'
import { CommandPalette } from './components/core/CommandPalette'
import { TourGuide } from './components/core/TourGuide'
import { toast } from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'

// Lazy load modules with preloading
const DashboardModule = lazy(() => import('./modules/DashboardModule'))
const AnalyticsModule = lazy(() => import('./modules/AnalyticsModule'))
const FinanceModule = lazy(() => import('./modules/FinanceModule'))
const OperationsModule = lazy(() => import('./modules/OperationsModule'))
const TeamModule = lazy(() => import('./modules/TeamModule'))
const ProjectsModule = lazy(() => import('./modules/ProjectsModule'))
const InventoryModule = lazy(() => import('./modules/InventoryModule'))
const CustomersModule = lazy(() => import('./modules/CustomersModule'))
const MarketingModule = lazy(() => import('./modules/MarketingModule'))
const SettingsModule = lazy(() => import('./modules/SettingsModule'))
const HelpModule = lazy(() => import('./modules/HelpModule'))

// Preload critical modules
const preloadModules = () => {
  const modules = [
    DashboardModule, 
    AnalyticsModule, 
    FinanceModule
  ]
  modules.forEach(module => module.preload?.())
}

function App() {
  const { 
    currentModule, 
    setCurrentModule, 
    theme, 
    initializeStore,
    addNotification,
    user,
    preferences
  } = useNexusStore()
  
  const [showCommandPalette, setShowCommandPalette] = useState(false)
  const [showTour, setShowTour] = useState(false)

  useEffect(() => {
    initializeStore()
    preloadModules()
    
    // Check if first visit
    const hasVisited = localStorage.getItem('nexus-has-visited')
    if (!hasVisited) {
      setShowTour(true)
      localStorage.setItem('nexus-has-visited', 'true')
    }

    // ============ ADVANCED KEYBOARD SHORTCUTS ============
    const handleKeyDown = (e) => {
      // Ignore if in input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return

      // Command/Ctrl + K - Open command palette
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setShowCommandPalette(true)
        addNotification({
          type: 'info',
          title: 'Command Palette',
          message: 'Type a command to navigate',
          duration: 2000
        })
      }

      // Command/Ctrl + , - Open settings
      if ((e.metaKey || e.ctrlKey) && e.key === ',') {
        e.preventDefault()
        setCurrentModule('settings')
        toast.success('Opening settings...', { icon: '⚙️' })
      }

      // Command/Ctrl + Shift + D - Toggle dark mode
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'D') {
        e.preventDefault()
        const newTheme = theme === 'dark' ? 'light' : 'dark'
        document.documentElement.classList.toggle('light')
        toast.success(`${newTheme.charAt(0).toUpperCase() + newTheme.slice(1)} mode activated`, {
          icon: newTheme === 'dark' ? '🌙' : '☀️'
        })
      }

      // Escape - Close modals
      if (e.key === 'Escape') {
        setShowCommandPalette(false)
        setShowTour(false)
      }

      // Simple number shortcuts with Ctrl
      if (e.ctrlKey && !isNaN(parseInt(e.key))) {
        e.preventDefault()
        const modules = ['dashboard', 'analytics', 'finance', 'operations', 'team', 
                        'projects', 'inventory', 'customers', 'marketing', 'settings']
        const index = parseInt(e.key) - 1
        if (modules[index]) {
          setCurrentModule(modules[index])
          toast.success(`Switched to ${modules[index]}`, { icon: '🔄', duration: 1500 })
          
          // Haptic feedback on supported devices
          if (navigator.vibrate) navigator.vibrate(10)
        }
      }

      // Ctrl + H - Go home
      if (e.ctrlKey && e.key === 'h') {
        e.preventDefault()
        setCurrentModule('dashboard')
        toast.success('Returning to dashboard', { icon: '🏠' })
      }

      // Ctrl + R - Refresh data (with haptic)
      if (e.ctrlKey && e.key === 'r') {
        e.preventDefault()
        window.location.reload()
      }

      // Ctrl + ? - Show help
      if (e.ctrlKey && e.key === '?') {
        e.preventDefault()
        toast.success(
          <div className="space-y-2">
            <p className="font-bold">Keyboard Shortcuts:</p>
            <p>⌘K - Command Palette</p>
            <p>⌘, - Settings</p>
            <p>⌘1-9 - Switch modules</p>
            <p>⌘H - Go home</p>
            <p>⌘⇧D - Toggle theme</p>
          </div>,
          { duration: 5000, icon: '⌨️' }
        )
      }
    }

    // ============ TOUCH GESTURES ============
    const handleTouchStart = (e) => {
      // Store touch start for gesture detection
      const touch = e.touches[0]
      window.touchStartX = touch.clientX
      window.touchStartY = touch.clientY
      window.touchStartTime = Date.now()
    }

    const handleTouchEnd = (e) => {
      if (!window.touchStartX) return

      const touch = e.changedTouches[0]
      const deltaX = touch.clientX - window.touchStartX
      const deltaY = touch.clientY - window.touchStartY
      const deltaTime = Date.now() - window.touchStartTime
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

      // Swipe detection (fast movement > 50px)
      if (distance > 50 && deltaTime < 300) {
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          // Horizontal swipe
          if (deltaX > 0) {
            // Swipe right - go to previous module
            const modules = ['dashboard', 'analytics', 'finance', 'operations', 'team', 
                            'projects', 'inventory', 'customers', 'marketing', 'settings']
            const currentIndex = modules.indexOf(currentModule)
            if (currentIndex > 0) {
              setCurrentModule(modules[currentIndex - 1])
              toast.success('Previous module', { icon: '👈' })
              if (navigator.vibrate) navigator.vibrate(20)
            }
          } else {
            // Swipe left - go to next module
            const modules = ['dashboard', 'analytics', 'finance', 'operations', 'team', 
                            'projects', 'inventory', 'customers', 'marketing', 'settings']
            const currentIndex = modules.indexOf(currentModule)
            if (currentIndex < modules.length - 1) {
              setCurrentModule(modules[currentIndex + 1])
              toast.success('Next module', { icon: '👉' })
              if (navigator.vibrate) navigator.vibrate(20)
            }
          }
        } else {
          // Vertical swipe
          if (deltaY > 0) {
            // Swipe down - refresh
            toast.success('Pull to refresh', { icon: '🔄' })
            if (navigator.vibrate) navigator.vibrate([30, 50, 30])
          } else {
            // Swipe up - open command palette
            setShowCommandPalette(true)
            if (navigator.vibrate) navigator.vibrate(15)
          }
        }
      }

      // Double tap detection (simulated)
      if (distance < 10 && deltaTime < 200) {
        const now = Date.now()
        if (window.lastTap && (now - window.lastTap) < 300) {
          // Double tap detected
          toast.success('Double tap - quick actions', { icon: '👆👆' })
          if (navigator.vibrate) navigator.vibrate([20, 20, 20])
          window.lastTap = null
        } else {
          window.lastTap = now
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('touchend', handleTouchEnd)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [currentModule])

  // ============ MODULE RENDERER WITH TRANSITIONS ============
  const renderModule = () => {
    const moduleMap = {
      dashboard: DashboardModule,
      analytics: AnalyticsModule,
      finance: FinanceModule,
      operations: OperationsModule,
      team: TeamModule,
      projects: ProjectsModule,
      inventory: InventoryModule,
      customers: CustomersModule,
      marketing: MarketingModule,
      settings: SettingsModule,
      help: HelpModule
    }

    const Component = moduleMap[currentModule] || DashboardModule

    return (
      <motion.div
        key={currentModule}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 30 }}
      >
        <Component />
      </motion.div>
    )
  }

  return (
    <NexusProvider>
      <GestureProvider>
        <div className={`nexus-app ${theme} min-h-screen bg-gradient-to-br from-[#0a0a1a] to-[#050510]`}>
          <NexusShell>
            {/* Command Palette */}
            <AnimatePresence>
              {showCommandPalette && (
                <CommandPalette onClose={() => setShowCommandPalette(false)} />
              )}
            </AnimatePresence>

            {/* Tour Guide */}
            <AnimatePresence>
              {showTour && (
                <TourGuide onClose={() => setShowTour(false)} />
              )}
            </AnimatePresence>

            {/* Main Content with Suspense */}
            <Suspense fallback={
              <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center space-y-4">
                  <LoadingSpinner size="xl" text="Loading legendary experience..." />
                  <p className="text-xs text-white/20 animate-pulse">
                    Preparing your dashboard with magic ✨
                  </p>
                </div>
              </div>
            }>
              <AnimatePresence mode="wait">
                {renderModule()}
              </AnimatePresence>
            </Suspense>

            {/* Floating Action Button for mobile */}
            <FloatingActionButton />
          </NexusShell>
        </div>
      </GestureProvider>
    </NexusProvider>
  )
}

// ============ FLOATING ACTION BUTTON ============
const FloatingActionButton = () => {
  const { addNotification } = useNexusStore()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50 lg:hidden">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-20 right-0 space-y-3"
          >
            {[
              { icon: '📊', label: 'Dashboard', action: 'dashboard' },
              { icon: '📈', label: 'Analytics', action: 'analytics' },
              { icon: '💰', label: 'Finance', action: 'finance' },
              { icon: '⚙️', label: 'Settings', action: 'settings' },
            ].map((item) => (
              <motion.button
                key={item.label}
                whileHover={{ scale: 1.1, x: -10 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center space-x-3 px-4 py-3 glass-card rounded-xl 
                  bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl"
                onClick={() => {
                  // Navigate to module
                  if (navigator.vibrate) navigator.vibrate(10)
                  setIsOpen(false)
                }}
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-white text-sm font-medium">{item.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          rotate: isOpen ? 45 : 0,
          boxShadow: [
            '0 0 0 0 rgba(139, 92, 246, 0.7)',
            '0 0 0 20px rgba(139, 92, 246, 0)',
          ]
        }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="w-14 h-14 bg-gradient-to-r from-indigo-600 to-purple-600 
          rounded-full shadow-2xl flex items-center justify-center"
        onClick={() => {
          setIsOpen(!isOpen)
          if (navigator.vibrate) navigator.vibrate(15)
        }}
      >
        <span className="text-3xl text-white">⚡</span>
      </motion.button>
    </div>
  )
}

export default App
