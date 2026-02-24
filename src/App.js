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
          title: '✨ Command Palette',
          message: 'Type a command to navigate',
          duration: 2000,
          icon: '⌨️'
        })
      }

      // Command/Ctrl + , - Open settings
      if ((e.metaKey || e.ctrlKey) && e.key === ',') {
        e.preventDefault()
        setCurrentModule('settings')
        toast.success('Opening settings...', { 
          icon: '⚙️',
          style: {
            background: '#0a0a1f',
            color: '#fff',
            border: '1px solid rgba(99,102,241,0.2)'
          }
        })
      }

      // Command/Ctrl + Shift + D - Toggle dark mode
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'D') {
        e.preventDefault()
        const newTheme = theme === 'dark' ? 'light' : 'dark'
        document.documentElement.classList.toggle('light')
        toast.success(`${newTheme === 'dark' ? '🌙' : '☀️'} ${newTheme.charAt(0).toUpperCase() + newTheme.slice(1)} mode activated`, {
          style: {
            background: '#0a0a1f',
            color: '#fff',
            border: '1px solid rgba(99,102,241,0.2)'
          }
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
          toast.success(`Switched to ${modules[index].charAt(0).toUpperCase() + modules[index].slice(1)}`, { 
            icon: '🔄',
            duration: 1500,
            style: {
              background: '#0a0a1f',
              color: '#fff',
              border: '1px solid rgba(99,102,241,0.2)'
            }
          })
          
          // Haptic feedback on supported devices
          if (navigator.vibrate) navigator.vibrate(10)
        }
      }

      // Ctrl + H - Go home
      if (e.ctrlKey && e.key === 'h') {
        e.preventDefault()
        setCurrentModule('dashboard')
        toast.success('🏠 Returning to dashboard', {
          style: {
            background: '#0a0a1f',
            color: '#fff',
            border: '1px solid rgba(99,102,241,0.2)'
          }
        })
      }

      // Ctrl + ? - Show help
      if (e.ctrlKey && e.key === '?') {
        e.preventDefault()
        toast.success(
          <div className="space-y-2">
            <p className="font-bold text-indigo-400">⌨️ Keyboard Shortcuts</p>
            <p className="text-white/80">⌘K - Command Palette</p>
            <p className="text-white/80">⌘, - Settings</p>
            <p className="text-white/80">⌘1-9 - Switch modules</p>
            <p className="text-white/80">⌘H - Go home</p>
            <p className="text-white/80">⌘⇧D - Toggle theme</p>
            <p className="text-white/80">⌘? - Show this help</p>
          </div>,
          { 
            duration: 5000, 
            icon: '⌨️',
            style: {
              background: '#0a0a1f',
              color: '#fff',
              border: '1px solid rgba(99,102,241,0.3)',
              maxWidth: '300px'
            }
          }
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
              toast.success('👈 Previous module', {
                style: {
                  background: '#0a0a1f',
                  color: '#fff',
                  border: '1px solid rgba(99,102,241,0.2)'
                }
              })
              if (navigator.vibrate) navigator.vibrate(20)
            }
          } else {
            // Swipe left - go to next module
            const modules = ['dashboard', 'analytics', 'finance', 'operations', 'team', 
                            'projects', 'inventory', 'customers', 'marketing', 'settings']
            const currentIndex = modules.indexOf(currentModule)
            if (currentIndex < modules.length - 1) {
              setCurrentModule(modules[currentIndex + 1])
              toast.success('👉 Next module', {
                style: {
                  background: '#0a0a1f',
                  color: '#fff',
                  border: '1px solid rgba(99,102,241,0.2)'
                }
              })
              if (navigator.vibrate) navigator.vibrate(20)
            }
          }
        } else {
          // Vertical swipe
          if (deltaY > 0) {
            // Swipe down - refresh
            toast.success('🔄 Pull to refresh', {
              style: {
                background: '#0a0a1f',
                color: '#fff',
                border: '1px solid rgba(99,102,241,0.2)'
              }
            })
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
          toast.success('👆👆 Double tap - quick actions', {
            style: {
              background: '#0a0a1f',
              color: '#fff',
              border: '1px solid rgba(99,102,241,0.2)'
            }
          })
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
  }, [currentModule, theme])

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
        transition={{ 
          duration: 0.3, 
          type: 'spring', 
          stiffness: 300, 
          damping: 30 
        }}
        className="h-full w-full"
      >
        <Component />
      </motion.div>
    )
  }

  return (
    <NexusProvider>
      <GestureProvider>
        <div className={`nexus-app ${theme} h-full w-full flex flex-col bg-[#030014]`}>
          {/* Cosmic Background Effects */}
          <div className="fixed inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.15),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(139,92,246,0.1),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(236,72,153,0.05),transparent_50%)]" />
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.02) 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }} />
          </div>

          {/* Main Content */}
          <div className="relative flex-1 h-full w-full overflow-hidden">
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
                    <p className="text-xs text-white/20 animate-pulse-soft">
                      Preparing your cosmic dashboard ✨
                    </p>
                  </div>
                </div>
              }>
                <AnimatePresence mode="wait">
                  {renderModule()}
                </AnimatePresence>
              </Suspense>
            </NexusShell>
          </div>

          {/* Floating Action Button for mobile */}
          <FloatingActionButton />
        </div>
      </GestureProvider>
    </NexusProvider>
  )
}

// ============ FLOATING ACTION BUTTON ============
const FloatingActionButton = () => {
  const { addNotification, setCurrentModule } = useNexusStore()
  const [isOpen, setIsOpen] = useState(false)

  const modules = [
    { icon: '📊', label: 'Dashboard', action: 'dashboard', color: 'from-indigo-500 to-purple-500' },
    { icon: '📈', label: 'Analytics', action: 'analytics', color: 'from-purple-500 to-pink-500' },
    { icon: '💰', label: 'Finance', action: 'finance', color: 'from-emerald-500 to-teal-500' },
    { icon: '👥', label: 'Team', action: 'team', color: 'from-blue-500 to-indigo-500' },
    { icon: '📦', label: 'Projects', action: 'projects', color: 'from-amber-500 to-orange-500' },
    { icon: '⚙️', label: 'Settings', action: 'settings', color: 'from-rose-500 to-red-500' },
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50 lg:hidden">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-20 right-0 space-y-3 min-w-[180px]"
          >
            {modules.map((item, index) => (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, x: -10 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl
                  bg-gradient-to-r ${item.color} shadow-glow-lg
                  border border-white/20 backdrop-blur-xl`}
                onClick={() => {
                  setCurrentModule(item.action)
                  if (navigator.vibrate) navigator.vibrate(10)
                  setIsOpen(false)
                  toast.success(`Opening ${item.label}`, {
                    icon: item.icon,
                    style: {
                      background: '#0a0a1f',
                      color: '#fff',
                      border: '1px solid rgba(99,102,241,0.2)'
                    }
                  })
                }}
              >
                <span className="text-2xl filter drop-shadow-glow">{item.icon}</span>
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
            '0 0 0 0 rgba(99,102,241,0.7)',
            '0 0 0 15px rgba(99,102,241,0.3)',
            '0 0 0 30px rgba(99,102,241,0)',
          ]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 2,
          boxShadow: {
            repeat: Infinity,
            duration: 2,
            ease: "easeOut"
          }
        }}
        className="w-14 h-14 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 
          rounded-full shadow-2xl flex items-center justify-center relative
          before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r 
          before:from-indigo-400 before:via-purple-400 before:to-pink-400 before:opacity-0
          before:transition-opacity before:duration-300 hover:before:opacity-50
          before:blur-xl"
        onClick={() => {
          setIsOpen(!isOpen)
          if (navigator.vibrate) navigator.vibrate(15)
        }}
      >
        <motion.span 
          animate={{ rotate: isOpen ? 45 : 0 }}
          className="text-3xl text-white relative z-10"
        >
          ⚡
        </motion.span>
      </motion.button>
    </div>
  )
}

export default App
