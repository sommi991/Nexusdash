import React, { useEffect } from 'react'
import { NexusSidebar } from './NexusSidebar'
import { NexusHeader } from './NexusHeader'
import { NotificationCenter } from '../core/Notification'
import { useNexusStore } from '../../store/nexusStore'
import { useResponsive } from '../../hooks/useResponsive'

export const NexusShell = ({ children }) => {
  const { 
    sidebarCollapsed, 
    toggleSidebar,
    isMobile, 
    setIsMobile, 
    theme,
    currentModule,
    setCurrentModule
  } = useNexusStore()
  
  const { width } = useResponsive()

  useEffect(() => {
    setIsMobile(width < 768)
  }, [width, setIsMobile])

  // Handler for navigation
  const handleNavigate = (moduleId) => {
    console.log('Navigating to:', moduleId)
    setCurrentModule(moduleId)
  }

  return (
    <div className={`nexus-shell min-h-screen bg-gradient-to-br from-[#0a0a1a] to-[#050510] ${theme}`}>
      <div className="relative flex">
        {/* Pass navigation handler to Sidebar */}
        <NexusSidebar 
          onNavigate={handleNavigate}
          currentModule={currentModule}
        />
        
        <div 
          className={`flex-1 transition-all duration-500 ease-out-expo
            ${sidebarCollapsed 
              ? isMobile ? 'ml-0' : 'ml-20' 
              : isMobile ? 'ml-0' : 'ml-80'
            }`}
        >
          {/* Pass navigation and toggle handlers to Header */}
          <NexusHeader 
            onToggleSidebar={toggleSidebar}
            onNavigate={handleNavigate}
          />
          
          <main className="nexus-main p-4 sm:p-6 lg:p-8">
            <div className="nexus-container mx-auto max-w-[1600px]">
              {children}
            </div>
          </main>
        </div>
      </div>
      
      <NotificationCenter />
    </div>
  )
}'
