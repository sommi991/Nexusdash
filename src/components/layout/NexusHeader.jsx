import React, { useState, useRef, useEffect } from 'react'
import {
  FiMenu, FiSearch, FiBell, FiSun, FiMoon, FiUser,
  FiSettings, FiLogOut, FiHelpCircle, FiCalendar,
  FiMessageCircle, FiGrid, FiMaximize, FiMinimize,
  FiCommand, FiChevronDown, FiStar, FiClock, FiCheckCircle,
  FiAlertCircle, FiInfo, FiDownload, FiUpload, FiRefreshCw
} from 'react-icons/fi'
import { useNexusStore } from '../../store/nexusStore'

export const NexusHeader = () => {
  const {
    sidebarCollapsed,
    toggleSidebar,
    theme,
    setTheme,
    isMobile,
    user,
    notifications,
    unreadCount,
    markAllRead
  } = useNexusStore()

  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  
  const searchRef = useRef(null)
  const notificationsRef = useRef(null)
  const userMenuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false)
      }
      if (notificationsRef.current && !notificationsRef.current.contains(e.target)) {
        setShowNotifications(false)
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setShowSearch(true)
      }
      if (e.key === 'F11') {
        e.preventDefault()
        toggleFullscreen()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setFullscreen(true)
    } else {
      document.exitFullscreen()
      setFullscreen(false)
    }
  }

  return (
    <header className="sticky top-0 z-30 backdrop-blur-xl bg-[#0a0a1a]/80 border-b border-white/[0.03]">
      <div className="flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Menu Toggle - Mobile & Desktop */}
          <button
            onClick={toggleSidebar}
            className="relative w-10 h-10 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] 
              flex items-center justify-center transition-all group"
          >
            <FiMenu className="w-5 h-5 text-white/60 group-hover:text-white/90 
              transition-transform group-hover:scale-110" />
          </button>

          {/* Command Palette - Desktop */}
          {!isMobile && (
            <div className="relative w-96" ref={searchRef}>
              <div 
                onClick={() => setShowSearch(true)}
                className="flex items-center gap-2 w-full h-11 px-4 rounded-xl 
                  bg-white/[0.02] border border-white/[0.03] cursor-text
                  hover:bg-white/[0.03] transition-all group"
              >
                <FiSearch className="w-4 h-4 text-white/30 group-hover:text-white/50" />
                <span className="flex-1 text-sm text-white/30 group-hover:text-white/50">
                  Search anything... (⌘K)
                </span>
                <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-white/[0.05]">
                  <FiCommand className="w-3 h-3 text-white/40" />
                  <span className="text-[10px] text-white/40">K</span>
                </div>
              </div>

              {/* Search Modal */}
              {showSearch && (
                <div className="absolute top-full left-0 right-0 mt-2 glass-card overflow-hidden animate-slide-down">
                  <div className="p-4">
                    <div className="relative">
                      <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                      <input
                        type="text"
                        placeholder="Search modules, projects, documents..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-12 pl-11 pr-4 rounded-xl bg-white/[0.02] border border-white/[0.03]
                          focus:border-indigo-500/30 focus:outline-none text-sm"
                        autoFocus
                      />
                    </div>
                    <div className="mt-4 text-center text-xs text-white/30">
                      Type to search or press ESC to close
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Actions */}
          <div className="hidden md:flex items-center gap-1 mr-2">
            <QuickAction icon={FiDownload} label="Import" />
            <QuickAction icon={FiUpload} label="Export" />
            <QuickAction icon={FiRefreshCw} label="Sync" />
          </div>

          {/* Notifications */}
          <div className="relative"
