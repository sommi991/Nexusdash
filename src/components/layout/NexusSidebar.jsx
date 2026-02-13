iimport React, { useState } from 'react'
import { 
  FiHome, FiBarChart2, FiDollarSign, FiBriefcase, FiUsers,
  FiGrid, FiPackage, FiUser, FiMail, FiSettings, FiHelpCircle,
  FiChevronLeft, FiChevronRight, FiLogOut, FiStar, FiSearch,
  FiLayers, FiTrendingUp, FiShoppingBag, FiCalendar, FiMessageCircle,
  FiShield, FiAward, FiZap, FiTarget, FiCompass, FiCpu
} from 'react-icons/fi'
import { useNexusStore } from '../../store/nexusStore'

export const NexusSidebar = () => {
  const { 
    currentModule, 
    setCurrentModule, 
    sidebarCollapsed, 
    toggleSidebar,
    isMobile,
    user
  } = useNexusStore()
  
  const [hoveredItem, setHoveredItem] = useState(null)

  // Simplified navigation structure
  const navigation = [
    {
      category: 'MAIN',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: FiHome },
        { id: 'analytics', label: 'Analytics', icon: FiBarChart2 },
        { id: 'finance', label: 'Finance', icon: FiDollarSign },
      ]
    },
    {
      category: 'MANAGEMENT',
      items: [
        { id: 'operations', label: 'Operations', icon: FiBriefcase },
        { id: 'team', label: 'Team', icon: FiUsers },
        { id: 'projects', label: 'Projects', icon: FiGrid },
        { id: 'inventory', label: 'Inventory', icon: FiPackage },
        { id: 'customers', label: 'Customers', icon: FiUser },
      ]
    },
    {
      category: 'COMMUNICATION',
      items: [
        { id: 'marketing', label: 'Marketing', icon: FiTrendingUp },
        { id: 'email', label: 'Email', icon: FiMail },
        { id: 'calendar', label: 'Calendar', icon: FiCalendar },
        { id: 'chat', label: 'Chat', icon: FiMessageCircle },
      ]
    },
    {
      category: 'SYSTEM',
      items: [
        { id: 'settings', label: 'Settings', icon: FiSettings },
        { id: 'help', label: 'Help', icon: FiHelpCircle },
      ]
    }
  ]

  const handleNavigation = (pageId) => {
    console.log('Navigating to:', pageId)
    setCurrentModule(pageId)
    if (isMobile) {
      toggleSidebar()
    }
  }

  const handleLogout = () => {
    console.log('Logout clicked')
    // Add your logout logic here
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && !sidebarCollapsed && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 h-full z-50 flex flex-col
          bg-gradient-to-b from-[#0c0c1e] to-[#080814]
          border-r border-white/[0.03]
          transition-all duration-300
          ${sidebarCollapsed ? 'w-20' : 'w-80'}
          ${isMobile && sidebarCollapsed ? '-translate-x-full' : 'translate-x-0'}`}
      >
        {/* Logo Area */}
        <div className={`flex items-center h-20 px-4 border-b border-white/[0.03]
          ${sidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 
              flex items-center justify-center">
              <FiZap className="w-5 h-5 text-white" />
            </div>
            
            {!sidebarCollapsed && (
              <div>
                <span className="font-bold text-xl bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 
                  bg-clip-text text-transparent">
                  NEXUS
                </span>
              </div>
            )}
          </div>

          {/* Toggle Button */}
          {!isMobile && (
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                toggleSidebar()
              }}
              className="w-8 h-8 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] 
                flex items-center justify-center transition-all"
            >
              {sidebarCollapsed ? (
                <FiChevronRight className="w-5 h-5 text-white/60" />
              ) : (
                <FiChevronLeft className="w-5 h-5 text-white/60" />
              )}
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-4 space-y-6">
          {navigation.map((section) => (
            <div key={section.category} className="space-y-1">
              {/* Section Header */}
              {!sidebarCollapsed && (
                <div className="px-3 mb-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-white/30">
                    {section.category}
                  </span>
                </div>
              )}

              {/* Navigation Items */}
              {section.items.map((item) => {
                const Icon = item.icon
                const isActive = currentModule === item.id

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                      transition-all duration-200 cursor-pointer
                      ${sidebarCollapsed ? 'justify-center' : 'justify-start'}
                      ${isActive 
                        ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-white' 
                        : 'text-white/50 hover:text-white hover:bg-white/[0.02]'
                      }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-400' : ''}`} />
                    {!sidebarCollapsed && (
                      <span className="text-sm font-medium">{item.label}</span>
                    )}
                  </button>
                )
              })}
            </div>
          ))}
        </nav>

        {/* User Profile */}
        <div className={`p-4 border-t border-white/[0.03] mt-auto`}>
          <div className={`flex items-center gap-3 ${sidebarCollapsed ? 'justify-center' : ''}`}>
            {/* Avatar */}
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 
                flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {user?.name?.split(' ').map(n => n[0]).join('') || 'AD'}
                </span>
              </div>
            </div>

            {/* User Info */}
            {!sidebarCollapsed && (
              <>
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium text-white/90">{user?.name || 'Admin User'}</div>
                  <div className="text-[10px] text-white/40 uppercase tracking-wider">
                    {user?.role?.split('_').join(' ') || 'Administrator'}
                  </div>
                </div>

                <button 
                  onClick={handleLogout}
                  className="w-8 h-8 rounded-lg hover:bg-white/[0.02] flex items-center justify-center
                    transition-colors cursor-pointer"
                >
                  <FiLogOut className="w-4 h-4 text-white/30 hover:text-white/60" />
                </button>
              </>
            )}
          </div>
        </div>
      </aside>
    </>
  )
}
