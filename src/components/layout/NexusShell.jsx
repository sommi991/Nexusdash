import React, { useEffect } from 'react'
import { NexusSidebar } from './NexusSidebar'
import { NexusHeader } from './NexusHeader'
import { NotificationCenter } from '../core/Notification'
import { useNexusStore } from '../../store/nexusStore'
import { useResponsive } from '../../hooks/useResponsive'

export const NexusShell = ({ children }) => {
  const { sidebarCollapsed, isMobile, setIsMobile, theme } = useNexusStore()
  const { width } = useResponsive()

  useEffect(() => {
    setIsMobile(width < 768)
  }, [width, setIsMobile])

  return (
    <div className={`nexus-shell min-h-screen bg-gradient-to-br from-[#0a0a1a] to-[#050510] ${theme}`}>
      <div className="relative flex">
        {/* Nexus Sidebar - Master Navigation */}
        <NexusSidebar />
        
        {/* Main Content Area */}
        <div 
          className={`flex-1 transition-all duration-500 ease-out-expo
            ${sidebarCollapsed 
              ? isMobile ? 'ml-0' : 'ml-20' 
              : isMobile ? 'ml-0' : 'ml-80'
            }`}
        >
          {/* Nexus Header - Command Center */}
          <NexusHeader />
          
          {/* Dynamic Module Container */}
          <main className="nexus-main p-4 sm:p-6 lg:p-8">
            <div className="nexus-container mx-auto max-w-[1600px]">
              {children}
            </div>
          </main>
        </div>
      </div>
      
      {/* Global Notification System */}
      <NotificationCenter />
      
      {/* Keyboard Shortcuts Hint */}
      <KeyboardShortcutsHint />
    </div>
  )
}

const KeyboardShortcutsHint = () => {
  const [showHint, setShowHint] = React.useState(false)

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '?' && e.shiftKey) {
        setShowHint(prev => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  if (!showHint) return null

  return (
    <div className="fixed bottom-6 right-6 w-80 glass-card p-4 animate-slide-up z-50">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold">Keyboard Shortcuts</h4>
        <button 
          onClick={() => setShowHint(false)}
          className="p-1 rounded-lg hover:bg-white/10"
        >
          <FiX className="w-4 h-4" />
        </button>
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">Ctrl + 1-9</span>
          <span>Switch modules</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Ctrl + B</span>
          <span>Toggle sidebar</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Ctrl + K</span>
          <span>Search</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Ctrl + N</span>
          <span>New item</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Shift + ?</span>
          <span>Show shortcuts</span>
        </div>
      </div>
    </div>
  )
}

import { FiX } from 'react-icons/fi'
