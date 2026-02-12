import React, { useState } from 'react'
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
  const [searchQuery, setSearchQuery] = useState('')

  // Master Navigation Structure
  const navigation = [
    {
      category: 'OVERVIEW',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: FiHome, shortcut: '⌘1', badge: null },
        { id: 'analytics', label: 'Analytics', icon: FiBarChart2, shortcut: '⌘2', badge: '24' },
        { id: 'finance', label: 'Finance', icon: FiDollarSign, shortcut: '⌘3', badge: null },
      ]
    },
    {
      category: 'OPERATIONS',
      items: [
        { id: 'operations', label: 'Operations', icon: FiBriefcase, shortcut: '⌘4', badge: '3' },
        { id: 'team', label: 'Team', icon: FiUsers, shortcut: '⌘5', badge: null },
        { id: 'projects', label: 'Projects', icon: FiGrid, shortcut: '⌘6', badge: '12' },
        { id: 'inventory', label: 'Inventory', icon: FiPackage, shortcut: '⌘7', badge: '5' },
        { id: 'customers', label: 'Customers', icon: FiUser, shortcut: '⌘8', badge: null },
      ]
    },
    {
      category: 'ENGAGEMENT',
      items: [
        { id: 'marketing', label: 'Marketing', icon: FiTrendingUp, shortcut: '⌘9', badge: '2' },
        { id: 'email', label: 'Email', icon: FiMail, shortcut: '⌘0', badge: '7' },
        { id: 'calendar', label: 'Calendar', icon: FiCalendar, shortcut: null, badge: '4' },
        { id: 'chat', label: 'Messages', icon: FiMessageCircle, shortcut: null, badge: '3' },
      ]
    },
    {
      category: 'SYSTEM',
      items: [
        { id: 'settings', label: 'Settings', icon: FiSettings, shortcut: '⌘,', badge: null },
        { id: 'help', label: 'Help', icon: FiHelpCircle, shortcut: 'F1', badge: null },
      ]
    }
  ]

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && !sidebarCollapsed && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Nexus Sidebar */}
      <aside 
        className={`fixed top-0 left-0 h-full z-50 flex flex-col
          bg-gradient-to-b from-[#0c0c1e] to-[#080814]
          border-r border-white/[0.03]
          transition-all duration-700 ease-out-expo
          ${sidebarCollapsed ? 'w-20' : 'w-80'}
          ${isMobile && sidebarCollapsed ? '-translate-x-full' : 'translate-x-0'}`}
      >
        {/* Logo Area */}
        <div className={`flex items-center h-20 px-4 border-b border-white/[0.03]
          ${sidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
          
          {/* Nexus Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 
                flex items-center justify-center shadow-lg shadow-purple-500/20">
                <FiZap className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3">
                <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-75"></div>
                <div className="absolute inset-0 bg-emerald-500 rounded-full"></div>
              </div>
            </div>
            
            {!sidebarCollapsed && (
              <div>
                <span className="font-bold text-xl bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 
                  bg-clip-text text-transparent tracking-tight">
                  NEXUS
                </span>
                <span className="block text-[10px] text-white/40 uppercase tracking-widest mt-0.5">
                  ENTERPRISE
                </span>
              </div>
            )}
          </div>

          {/* Toggle Button */}
          {!isMobile && (
            <button
              onClick={toggleSidebar}
              className="w-8 h-8 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] 
                flex items-center justify-center transition-all group"
            >
              {sidebarCollapsed ? (
                <FiChevronRight className="w-5 h-5 text-white/40 group-hover:text-white/60" />
              ) : (
                <FiChevronLeft className="w-5 h-5 text-white/40 group-hover:text-white/60" />
              )}
            </button>
          )}
        </div>

        {/* Search - Expanded Only */}
        {!sidebarCollapsed && (
          <div className="px-4 pt-6 pb-4">
            <div className="relative group">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 
                group-focus-within:text-indigo-400 transition-colors" />
              <input
                type="text"
                placeholder="Search modules... (⌘K)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-11 pr-4 rounded-xl bg-white/[0.02] border border-white/[0.03]
                  focus:border-indigo-500/30 focus:outline-none focus:bg-white/[0.03] 
                  placeholder:text-white/30 text-sm transition-all"
              />
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-4 space-y-8">
          {navigation.map((section) => (
            <div key={section.category} className="space-y-1">
              {/* Section Header - Hidden when collapsed */}
              {!sidebarCollapsed && (
                <div className="px-3 mb-2">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">
                    {section.category}
                  </span>
                </div>
              )}

              {/* Navigation Items */}
              {section.items.map((item) => {
                const Icon = item.icon
                const isActive = currentModule === item.id
                const isHovered = hoveredItem === item.id

                return (
                  <div
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <button
                      onClick={() => setCurrentModule(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                        transition-all duration-300 group
                        ${sidebarCollapsed ? 'justify-center' : 'justify-start'}
                        ${isActive 
                          ? 'bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 text-white' 
                          : 'text-white/50 hover:text-white hover:bg-white/[0.02]'
                        }
                      `}
                    >
                      {/* Icon with glow */}
                      <div className={`relative transition-transform duration-300
                        ${isActive ? 'scale-110' : ''}
                        ${isHovered ? 'scale-110' : ''}
                      `}>
                        <Icon className={`w-5 h-5 transition-colors
                          ${isActive ? 'text-indigo-400' : ''}
                        `} />
                        {isActive && (
                          <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full -z-10" />
                        )}
                      </div>

                      {/* Label */}
                      {!sidebarCollapsed && (
                        <span className="flex-1 text-left text-sm font-medium">
                          {item.label}
                        </span>
                      )}

                      {/* Badge */}
                      {!sidebarCollapsed && item.badge && (
                        <span className="px-2 py-0.5 text-[10px] font-medium rounded-full 
                          bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                          {item.badge}
                        </span>
                      )}

                      {/* Shortcut */}
                      {!sidebarCollapsed && item.shortcut && (
                        <span className="text-[10px] text-white/30 font-mono">
                          {item.shortcut}
                        </span>
                      )}
                    </button>

                    {/* Tooltip - Collapsed Mode */}
                    {sidebarCollapsed && (
                      <div className={`
                        absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-2
                        bg-[#0c0c1e] text-white text-sm rounded-lg whitespace-nowrap
                        border border-white/[0.03] shadow-2xl z-50
                        transition-all duration-200
                        ${isHovered ? 'opacity-100 visible translate-x-0' : 'opacity-0 invisible -translate-x-2'}
                      `}>
                        <div className="flex items-center gap-2">
                          <span>{item.label}</span>
                          {item.badge && (
                            <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-indigo-500/20 text-indigo-400">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 
                          border-8 border-transparent border-r-[#0c0c1e]" />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </nav>

        {/* User Profile */}
        <div className={`p-4 border-t border-white/[0.03] mt-auto
          ${sidebarCollapsed ? 'text-center' : ''}`}>
          
          <div className={`flex items-center gap-3 ${sidebarCollapsed ? 'justify-center' : ''}`}>
            {/* Avatar */}
            <div className="relative group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 
                flex items-center justify-center shadow-lg">
                <span className="text-white font-semibold text-sm">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 
                rounded-full border-2 border-[#0c0c1e]"></div>
            </div>

            {/* User Info */}
            {!sidebarCollapsed && (
              <>
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium text-white/90">{user.name}</div>
                  <div className="text-[10px] text-white/40 uppercase tracking-wider">
                    {user.role.split('_').join(' ')}
                  </div>
                </div>

                <button className="w-8 h-8 rounded-lg hover:bg-white/[0.02] flex items-center justify-center
                  transition-colors group">
                  <FiLogOut className="w-4 h-4 text-white/30 group-hover:text-white/60" />
                </button>
              </>
            )}
          </div>

          {/* Quick Stats - Expanded Only */}
          {!sidebarCollapsed && (
            <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-white/[0.03]">
              <div className="text-center">
                <div className="text-[10px] uppercase tracking-wider text-white/40">Projects</div>
                <div className="text-sm font-semibold text-white/90 mt-1">24</div>
              </div>
              <div className="text-center">
                <div className="text-[10px] uppercase tracking-wider text-white/40">Tasks</div>
                <div className="text-sm font-semibold text-white/90 mt-1">156</div>
              </div>
              <div className="text-center">
                <div className="text-[10px] uppercase tracking-wider text-white/40">Team</div>
                <div className="text-sm font-semibold text-white/90 mt-1">12</div>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}
