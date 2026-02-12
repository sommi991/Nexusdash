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
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative w-10 h-10 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] 
                flex items-center justify-center transition-all group"
            >
              <FiBell className="w-5 h-5 text-white/60 group-hover:text-white/90 
                transition-transform group-hover:scale-110" />
              {unreadCount > 0 && (
                <>
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r 
                    from-indigo-500 to-purple-500 text-white text-[10px] font-medium 
                    rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/20">
                    {unreadCount}
                  </span>
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-500 
                    rounded-full animate-ping opacity-75" />
                </>
              )}
            </button>

            {/* Notifications Panel */}
            {showNotifications && (
              <div className="absolute top-full right-0 mt-2 w-96 glass-card overflow-hidden animate-slide-down">
                <div className="p-4 border-b border-white/[0.03] flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-white/90">Notifications</span>
                    <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full 
                      bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      {unreadCount} new
                    </span>
                  </div>
                  <button 
                    onClick={markAllRead}
                    className="text-xs text-white/40 hover:text-white/60 transition-colors"
                  >
                    Mark all read
                  </button>
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {notifications.slice(0, 5).map((notification) => (
                    <NotificationItem key={notification.id} {...notification} />
                  ))}
                </div>

                <div className="p-3 border-t border-white/[0.03]">
                  <button className="w-full text-center text-xs text-white/40 hover:text-white/60">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="relative w-10 h-10 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] 
              flex items-center justify-center transition-all group"
          >
            {theme === 'dark' ? (
              <FiSun className="w-5 h-5 text-white/60 group-hover:text-white/90 
                transition-transform group-hover:rotate-90" />
            ) : (
              <FiMoon className="w-5 h-5 text-white/60 group-hover:text-white/90 
                transition-transform group-hover:scale-110" />
            )}
          </button>

          {/* Fullscreen Toggle - Desktop */}
          {!isMobile && (
            <button
              onClick={toggleFullscreen}
              className="relative w-10 h-10 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] 
                flex items-center justify-center transition-all group"
            >
              {fullscreen ? (
                <FiMinimize className="w-5 h-5 text-white/60 group-hover:text-white/90" />
              ) : (
                <FiMaximize className="w-5 h-5 text-white/60 group-hover:text-white/90" />
              )}
            </button>
          )}

          {/* User Menu */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-white/[0.02] 
                transition-all group"
            >
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 
                  flex items-center justify-center shadow-lg">
                  <span className="text-white font-semibold text-sm">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 
                  rounded-full border-2 border-[#0a0a1a]"></div>
              </div>
              
              {!isMobile && (
                <>
                  <div className="hidden lg:block text-left">
                    <div className="text-sm font-medium text-white/90">{user.name}</div>
                    <div className="text-[10px] uppercase tracking-wider text-white/40">
                      {user.role.split('_').join(' ')}
                    </div>
                  </div>
                  <FiChevronDown className="w-4 h-4 text-white/40 group-hover:text-white/60 
                    transition-colors hidden lg:block" />
                </>
              )}
            </button>

            {/* User Menu Dropdown */}
            {showUserMenu && (
              <div className="absolute top-full right-0 mt-2 w-64 glass-card overflow-hidden animate-slide-down">
                <div className="p-4 border-b border-white/[0.03]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 
                      flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white/90">{user.name}</div>
                      <div className="text-[10px] text-white/40">{user.email}</div>
                    </div>
                  </div>
                </div>

                <div className="p-2">
                  <MenuItem icon={FiUser} label="Profile" />
                  <MenuItem icon={FiSettings} label="Settings" />
                  <MenuItem icon={FiStar} label="Favorites" />
                  <MenuItem icon={FiClock} label="Activity Log" />
                  <div className="border-t border-white/[0.03] my-2" />
                  <MenuItem icon={FiHelpCircle} label="Help Center" />
                  <MenuItem icon={FiLogOut} label="Sign Out" className="text-red-400" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      {isMobile && (
        <div className="px-4 pb-4">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full h-11 pl-11 pr-4 rounded-xl bg-white/[0.02] border border-white/[0.03]
                focus:border-indigo-500/30 focus:outline-none text-sm"
            />
          </div>
        </div>
      )}
    </header>
  )
}

const QuickAction = ({ icon: Icon, label }) => (
  <button className="relative w-10 h-10 rounded-xl hover:bg-white/[0.02] flex items-center justify-center group">
    <Icon className="w-4 h-4 text-white/40 group-hover:text-white/60 transition-colors" />
    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 
      bg-[#0c0c1e] text-[10px] text-white/60 rounded border border-white/[0.03] 
      opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
      {label}
    </span>
  </button>
)

const NotificationItem = ({ type, title, message, time, read }) => {
  const getIcon = () => {
    switch(type) {
      case 'success': return FiCheckCircle
      case 'warning': return FiAlertCircle
      case 'info': return FiInfo
      default: return FiBell
    }
  }
  const Icon = getIcon()

  return (
    <div className={`p-4 border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors
      ${!read ? 'bg-indigo-500/5' : ''}`}>
      <div className="flex items-start gap-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center
          ${type === 'success' ? 'bg-emerald-500/10 text-emerald-400' :
            type === 'warning' ? 'bg-amber-500/10 text-amber-400' :
            type === 'info' ? 'bg-indigo-500/10 text-indigo-400' :
            'bg-white/5 text-white/60'}`}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-white/90">{title}</span>
            {!read && <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />}
          </div>
          <p className="text-xs text-white/60 mb-1">{message}</p>
          <span className="text-[10px] text-white/40">{time}</span>
        </div>
      </div>
    </div>
  )
}

const MenuItem = ({ icon: Icon, label, className = '' }) => (
  <button className={`w-full px-3 py-2 text-left text-sm rounded-lg 
    hover:bg-white/[0.02] flex items-center gap-3 transition-colors
    text-white/70 hover:text-white/90 ${className}`}>
    <Icon className="w-4 h-4" />
    <span>{label}</span>
  </button>
)
