import React, { useState } from 'react'
import {
  FiMenu, FiBell, FiSun, FiMoon, FiUser,
  FiSettings, FiLogOut, FiHelpCircle, FiMail,
  FiMessageCircle, FiMaximize, FiMinimize
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
    unreadCount
  } = useNexusStore()

  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const handleLogout = () => {
    console.log('Logout clicked')
    setShowUserMenu(false)
  }

  const handleNavigation = (page) => {
    console.log('Navigate to:', page)
    setShowUserMenu(false)
    // Add navigation logic here
  }

  return (
    <header className="sticky top-0 z-30 backdrop-blur-xl bg-[#0a0a1a]/80 border-b border-white/[0.03]">
      <div className="flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Menu Toggle */}
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              toggleSidebar()
            }}
            className="w-10 h-10 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] 
              flex items-center justify-center transition-all cursor-pointer"
          >
            <FiMenu className="w-5 h-5 text-white/60 hover:text-white/90" />
          </button>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative w-10 h-10 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] 
                flex items-center justify-center transition-all cursor-pointer"
            >
              <FiBell className="w-5 h-5 text-white/60 hover:text-white/90" />
              {unreadCount > 0 && (
                <>
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r 
                    from-indigo-500 to-purple-500 text-white text-[10px] font-medium 
                    rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                </>
              )}
            </button>

            {/* Notifications Panel */}
            {showNotifications && (
              <div className="absolute top-full right-0 mt-2 w-80 glass-card overflow-hidden z-50">
                <div className="p-4 border-b border-white/[0.03]">
                  <span className="text-sm font-medium text-white/90">Notifications</span>
                </div>
                <div className="p-4 text-center text-white/40 text-sm">
                  No new notifications
                </div>
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              toggleTheme()
            }}
            className="w-10 h-10 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] 
              flex items-center justify-center transition-all cursor-pointer"
          >
            {theme === 'dark' ? (
              <FiSun className="w-5 h-5 text-white/60 hover:text-white/90" />
            ) : (
              <FiMoon className="w-5 h-5 text-white/60 hover:text-white/90" />
            )}
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-white/[0.02] 
                transition-all cursor-pointer"
            >
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 
                  flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {user?.name?.split(' ').map(n => n[0]).join('') || 'AD'}
                  </span>
                </div>
              </div>
            </button>

            {/* User Menu Dropdown */}
            {showUserMenu && (
              <div className="absolute top-full right-0 mt-2 w-48 glass-card overflow-hidden z-50">
                <div className="p-2">
                  <button 
                    onClick={() => handleNavigation('profile')}
                    className="w-full px-3 py-2 text-left text-sm rounded-lg 
                      hover:bg-white/[0.02] flex items-center gap-3 text-white/70 hover:text-white/90"
                  >
                    <FiUser className="w-4 h-4" />
                    Profile
                  </button>
                  <button 
                    onClick={() => handleNavigation('settings')}
                    className="w-full px-3 py-2 text-left text-sm rounded-lg 
                      hover:bg-white/[0.02] flex items-center gap-3 text-white/70 hover:text-white/90"
                  >
                    <FiSettings className="w-4 h-4" />
                    Settings
                  </button>
                  <button 
                    onClick={() => handleNavigation('help')}
                    className="w-full px-3 py-2 text-left text-sm rounded-lg 
                      hover:bg-white/[0.02] flex items-center gap-3 text-white/70 hover:text-white/90"
                  >
                    <FiHelpCircle className="w-4 h-4" />
                    Help
                  </button>
                  <div className="border-t border-white/[0.03] my-2" />
                  <button 
                    onClick={handleLogout}
                    className="w-full px-3 py-2 text-left text-sm rounded-lg 
                      hover:bg-rose-500/10 flex items-center gap-3 text-rose-400"
                  >
                    <FiLogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
