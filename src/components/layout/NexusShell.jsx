import React, { useEffect, useState } from 'react'
import { NexusSidebar } from './NexusSidebar'
import { NexusHeader } from './NexusHeader'
import { NotificationCenter } from '../core/Notification'
import { useNexusStore } from '../../store/nexusStore'
import { useResponsive } from '../../hooks/useResponsive'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-hot-toast'

export const NexusShell = ({ children }) => {
  const { 
    sidebarCollapsed, 
    setIsMobile, 
    theme,
    addNotification,
    preferences
  } = useNexusStore()
  
  const { isMobile } = useResponsive()
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [pullToRefresh, setPullToRefresh] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    setIsMobile(isMobile)
  }, [isMobile, setIsMobile])

  // ============ PULL TO REFRESH ============
  useEffect(() => {
    let touchStart = 0
    let touchMove = 0

    const handleTouchStart = (e) => {
      if (window.scrollY === 0) {
        touchStart = e.touches[0].clientY
      }
    }

    const handleTouchMove = (e) => {
      if (window.scrollY === 0 && touchStart > 0) {
        touchMove = e.touches[0].clientY
        const diff = touchMove - touchStart
        if (diff > 0) {
          setPullToRefresh(Math.min(diff, 100))
        }
      }
    }

    const handleTouchEnd = () => {
      if (pullToRefresh >= 60) {
        // Trigger refresh
        setIsRefreshing(true)
        setTimeout(() => {
          setIsRefreshing(false)
          window.location.reload()
        }, 1500)
        
        if (navigator.vibrate) navigator.vibrate([30, 50, 30])
        
        addNotification({
          type: 'info',
          title: 'Refreshing...',
          message: 'Pulling fresh data',
          icon: '🔄'
        })
      }
      setPullToRefresh(0)
      touchStart = 0
    }

    window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('touchmove', handleTouchMove)
    window.addEventListener('touchend', handleTouchEnd)

    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [pullToRefresh])

  return (
    <div className={`nexus-shell min-h-screen bg-gradient-to-br from-[#0a0a1a] to-[#050510] ${theme}`}>
      {/* Pull to refresh indicator */}
      <AnimatePresence>
        {pullToRefresh > 0 && (
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4"
          >
            <div className="glass-card px-6 py-3 rounded-full bg-white/10 backdrop-blur-xl 
              border border-white/20 flex items-center gap-3">
              <motion.div
                animate={{ rotate: pullToRefresh >= 60 ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-2xl">⬇️</span>
              </motion.div>
              <span className="text-white text-sm">
                {pullToRefresh >= 60 ? 'Release to refresh' : 'Pull to refresh'}
              </span>
              <motion.div
                className="w-16 h-1 bg-white/20 rounded-full overflow-hidden"
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${(pullToRefresh / 60) * 100}%` }}
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Refresh overlay */}
      <AnimatePresence>
        {isRefreshing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 
              flex items-center justify-center"
          >
            <div className="glass-card p-8 rounded-2xl text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                className="w-16 h-16 border-4 border-indigo-500 border-t-transparent 
                  rounded-full mx-auto mb-4"
              />
              <p className="text-white text-lg font-medium">Refreshing your data...</p>
              <p className="text-white/40 text-sm mt-2">Just a moment</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative flex">
        {/* Nexus Sidebar */}
        <NexusSidebar 
          isMobileMenuOpen={showMobileMenu}
          onCloseMobileMenu={() => setShowMobileMenu(false)}
        />
        
        {/* Main Content Area */}
        <motion.div 
          className={`flex-1 transition-all duration-300
            ${sidebarCollapsed 
              ? isMobile ? 'ml-0' : 'ml-20' 
              : isMobile ? 'ml-0' : 'ml-80'
            }`}
          animate={{
            scale: pullToRefresh > 0 ? 0.98 : 1,
            opacity: pullToRefresh > 0 ? 0.8 : 1
          }}
          transition={{ type: 'spring', damping: 30 }}
        >
          {/* Nexus Header */}
          <NexusHeader onMenuClick={() => setShowMobileMenu(true)} />
          
          {/* Dynamic Module Container */}
          <main className="nexus-main p-4 sm:p-6 lg:p-8">
            <div className="nexus-container mx-auto max-w-[1600px]">
              <AnimatePresence mode="wait">
                {children}
              </AnimatePresence>
            </div>
          </main>
        </motion.div>
      </div>
      
      {/* Global Notification System */}
      <NotificationCenter />

      {/* Gesture hint overlay (disappears after first use) */}
      {!localStorage.getItem('gesture-hint-shown') && (
        <GestureHint onClose={() => localStorage.setItem('gesture-hint-shown', 'true')} />
      )}
    </div>
  )
}

// ============ GESTURE HINT COMPONENT ============
const GestureHint = ({ onClose }) => {
  const [step, setStep] = useState(0)

  const hints = [
    { icon: '👆', text: 'Tap anywhere to select' },
    { icon: '👆👆', text: 'Double tap for quick actions' },
    { icon: '🤏', text: 'Long press for context menu' },
    { icon: '👉', text: 'Swipe left/right between modules' },
    { icon: '⬇️', text: 'Pull down to refresh' },
    { icon: '🖐️', text: 'Pinch to zoom charts' },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => (s + 1) % hints.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-50 
        glass-card px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-xl 
        border border-white/20 shadow-2xl"
    >
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{hints[step].icon}</span>
          <span className="text-white text-sm whitespace-nowrap">{hints[step].text}</span>
        </div>
        <div className="flex gap-1">
          {hints.map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === step ? 'w-4 bg-indigo-400' : 'bg-white/20'
              }`}
            />
          ))}
        </div>
        <button
          onClick={onClose}
          className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
        >
          <span className="text-white/60 text-sm">Skip</span>
        </button>
      </div>
    </motion.div>
  )
}
