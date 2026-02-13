import React, { useEffect } from 'react'
import { NexusSidebar } from './NexusSidebar'
import { NexusHeader } from './NexusHeader'
import { NotificationCenter } from '../core/Notification'
import { useNexusStore } from '../../store/nexusStore'
import { useResponsive } from '../../hooks/useResponsive'

export const NexusShell = ({ children }) => {
  const { sidebarCollapsed, setIsMobile, theme } = useNexusStore()
  const { isMobile } = useResponsive()

  useEffect(() => {
    setIsMobile(isMobile)
  }, [isMobile, setIsMobile])

  return (
    <div className={`nexus-shell min-h-screen bg-gradient-to-br from-[#0a0a1a] to-[#050510] ${theme}`}>
      <div className="relative flex">
        {/* Nexus Sidebar */}
        <NexusSidebar />
        
        {/* Main Content Area */}
        <div 
          className={`flex-1 transition-all duration-300
            ${sidebarCollapsed 
              ? isMobile ? 'ml-0' : 'ml-20' 
              : isMobile ? 'ml-0' : 'ml-80'
            }`}
        >
          {/* Nexus Header */}
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
    </div>
  )
}
