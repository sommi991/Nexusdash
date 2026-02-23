import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { mockData } from '../data/mockData'
import { PERMISSIONS } from '../data/permissions'
import { toast } from 'react-hot-toast'

export const useNexusStore = create(
  persist(
    (set, get) => ({
      // ============ USER STATE ============
      user: {
        id: 'USR-001',
        name: 'Alex Morgan',
        email: 'alex@nexusdash.com',
        role: 'super_admin',
        avatar: 'https://i.pravatar.cc/150?u=alex',
        preferences: {
          theme: 'dark',
          sidebarCollapsed: false,
          animations: true,
          denseMode: false,
          notifications: true,
          soundEnabled: true,
          hapticFeedback: true,
          gestureHints: true,
          autoSave: true,
          language: 'en',
          dateFormat: 'MM/DD/YYYY',
          timeFormat: '12h'
        },
        permissions: PERMISSIONS.super_admin,
        stats: {
          lastLogin: new Date().toISOString(),
          loginCount: 142,
          sessions: [],
          achievements: [
            { id: 1, name: 'First Login', date: '2024-01-01', icon: '🎯' },
            { id: 2, name: 'Power User', date: '2024-02-15', icon: '⚡' },
            { id: 3, name: 'Data Master', date: '2024-03-20', icon: '📊' }
          ]
        }
      },

      // ============ UI STATE ============
      currentModule: 'dashboard',
      sidebarCollapsed: false,
      theme: 'dark',
      isMobile: false,
      viewMode: 'grid',
      density: 'comfortable',
      
      // ============ DATA STATE ============
      data: mockData,
      
      // ============ NOTIFICATION STATE ============
      notifications: [],
      unreadCount: 0,
      
      // ============ MODAL STATE ============
      modals: {
        createItem: false,
        editItem: false,
        deleteConfirm: false,
        exportData: false,
        importData: false,
        share: false,
        help: false,
        shortcuts: false,
        search: false
      },
      
      // ============ FILTERS STATE ============
      filters: {
        dateRange: 'month',
        status: 'all',
        category: 'all',
        searchQuery: ''
      },

      // ============ ANALYTICS STATE ============
      analytics: {
        pageViews: {},
        userActions: [],
        errors: [],
        performance: {}
      },

      // ============ CACHE STATE ============
      cache: {},

      // ============ ACTIONS ============
      
      // Navigation
      setCurrentModule: (module) => {
        set({ currentModule: module })
        get().trackAction('navigation', { to: module })
        
        // Haptic feedback
        if (get().user.preferences.hapticFeedback && navigator.vibrate) {
          navigator.vibrate(10)
        }
      },
      
      // UI
      toggleSidebar: () => {
        set((state) => ({ 
          sidebarCollapsed: !state.sidebarCollapsed 
        }))
        get().trackAction('ui', { action: 'toggleSidebar' })
      },
      
      setTheme: (theme) => {
        set({ theme })
        document.documentElement.classList.toggle('light', theme === 'light')
        get().trackAction('preferences', { theme })
      },
      
      setIsMobile: (isMobile) => set({ isMobile }),
      
      setViewMode: (mode) => {
        set({ viewMode: mode })
        get().trackAction('ui', { action: 'changeView', mode })
      },
      
      // Notifications
      addNotification: (notification) => {
        const newNotification = {
          id: Date.now(),
          timestamp: new Date().toISOString(),
          read: false,
          ...notification
        }
        
        set((state) => ({
          notifications: [newNotification, ...state.notifications].slice(0, 50),
          unreadCount: state.unreadCount + 1
        }))
        
        // Show toast based on type
        if (notification.type === 'success') {
          toast.success(notification.message, { icon: notification.icon })
        } else if (notification.type === 'error') {
          toast.error(notification.message, { icon: notification.icon })
        } else {
          toast(notification.message, { icon: notification.icon })
        }
        
        // Play sound if enabled
        if (get().user.preferences.soundEnabled) {
          const audio = new Audio(`/sounds/${notification.type}.mp3`)
          audio.play().catch(() => {})
        }
        
        // Haptic feedback
        if (get().user.preferences.hapticFeedback && navigator.vibrate) {
          if (notification.type === 'error') {
            navigator.vibrate([50, 30, 50])
          } else {
            navigator.vibrate(20)
          }
        }
      },
      
      markNotificationRead: (id) => set((state) => ({
        notifications: state.notifications.map(n => 
          n.id === id ? { ...n, read: true } : n
        ),
        unreadCount: Math.max(0, state.unreadCount - 1)
      })),
      
      markAllRead: () => set((state) => ({
        notifications: state.notifications.map(n => ({ ...n, read: true })),
        unreadCount: 0
      })),
      
      // Modals
      openModal: (modalName) => set((state) => ({
        modals: { ...state.modals, [modalName]: true }
      })),
      
      closeModal: (modalName) => set((state) => ({
        modals: { ...state.modals, [modalName]: false }
      })),
      
      toggleModal: (modalName) => set((state) => ({
        modals: { ...state.modals, [modalName]: !state.modals[modalName] }
      })),
      
      // Filters
      setFilters: (filters) => set((state) => ({
        filters: { ...state.filters, ...filters }
      })),
      
      resetFilters: () => set({
        filters: {
          dateRange: 'month',
          status: 'all',
          category: 'all',
          searchQuery: ''
        }
      }),
      
      // Data Operations
      updateData: (key, value) => set((state) => ({
        data: { ...state.data, [key]: value }
      })),
      
      // Cache operations
      setCache: (key, value, ttl = 300000) => set((state) => ({
        cache: {
          ...state.cache,
          [key]: {
            value,
            timestamp: Date.now(),
            ttl
          }
        }
      })),
      
      getCache: (key) => {
        const cached = get().cache[key]
        if (!cached) return null
        if (Date.now() - cached.timestamp > cached.ttl) {
          // Expired
          set((state) => {
            const newCache = { ...state.cache }
            delete newCache[key]
            return { cache: newCache }
          })
          return null
        }
        return cached.value
      },
      
      // Analytics
      trackAction: (category, action) => {
        set((state) => ({
          analytics: {
            ...state.analytics,
            userActions: [
              ...state.analytics.userActions,
              {
                category,
                action,
                timestamp: Date.now(),
                userId: get().user.id,
                module: get().currentModule
              }
            ].slice(-100)
          }
        }))
      },
      
      trackPageView: (page) => {
        set((state) => ({
          analytics: {
            ...state.analytics,
            pageViews: {
              ...state.analytics.pageViews,
              [page]: (state.analytics.pageViews[page] || 0) + 1
            }
          }
        }))
      },
      
      trackError: (error) => {
        set((state) => ({
          analytics: {
            ...state.analytics,
            errors: [
              ...state.analytics.errors,
              {
                error,
                timestamp: Date.now(),
                url: window.location.href,
                userId: get().user.id
              }
            ].slice(-20)
          }
        }))
      },
      
      // User preferences
      updatePreferences: (prefs) => set((state) => ({
        user: {
          ...state.user,
          preferences: {
            ...state.user.preferences,
            ...prefs
          }
        }
      })),
      
      // Achievements
      addAchievement: (achievement) => set((state) => ({
        user: {
          ...state.user,
          stats: {
            ...state.user.stats,
            achievements: [
              ...state.user.stats.achievements,
              {
                id: Date.now(),
                date: new Date().toISOString(),
                ...achievement
              }
            ]
          }
        }
      })),
      
      // Initialize
      initializeStore: () => {
        // Add welcome notification
        get().addNotification({
          type: 'success',
          title: 'Welcome to Nexus Dash',
          message: 'Your ultimate admin dashboard is ready',
          icon: '✨',
          duration: 5000
        })
        
        // Check for achievements
        const loginCount = get().user.stats.loginCount
        if (loginCount === 1) {
          get().addAchievement({
            name: 'First Login',
            icon: '🎯',
            description: 'Logged in for the first time'
          })
        }
        
        if (loginCount === 100) {
          get().addAchievement({
            name: 'Century Club',
            icon: '💯',
            description: '100 logins and still going strong'
          })
        }
        
        // Track page view
        get().trackPageView(get().currentModule)
      }
    }),
    {
      name: 'nexus-dash-storage',
      partialize: (state) => ({
        user: {
          ...state.user,
          preferences: state.user.preferences,
          stats: {
            ...state.user.stats,
            achievements: state.user.stats.achievements
          }
        },
        theme: state.theme,
        sidebarCollapsed: state.sidebarCollapsed,
        filters: state.filters
      })
    }
  )
)
