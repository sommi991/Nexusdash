import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { mockData } from '../data/mockData'
import { PERMISSIONS } from '../data/permissions'

export const useNexusStore = create(
  persist(
    (set, get) => ({
      // ============ USER STATE ============
      user: {
        id: 'USR-001',
        name: 'Alex Morgan',
        email: 'alex@nexusdash.com',
        role: 'super_admin',
        avatar: null,
        preferences: {
          theme: 'dark',
          sidebarCollapsed: false,
          animations: true,
          denseMode: false,
          notifications: true
        },
        permissions: PERMISSIONS.super_admin
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
        help: false
      },
      
      // ============ FILTERS STATE ============
      filters: {
        dateRange: 'month',
        status: 'all',
        category: 'all',
        searchQuery: ''
      },

      // ============ ACTIONS ============
      
      // Navigation
      setCurrentModule: (module) => set({ currentModule: module }),
      
      // UI
      toggleSidebar: () => set((state) => ({ 
        sidebarCollapsed: !state.sidebarCollapsed 
      })),
      
      setTheme: (theme) => set({ theme }),
      
      setIsMobile: (isMobile) => set({ isMobile }),
      
      setViewMode: (mode) => set({ viewMode: mode }),
      
      // Notifications
      addNotification: (notification) => set((state) => ({
        notifications: [{
          id: Date.now(),
          timestamp: new Date().toISOString(),
          read: false,
          ...notification
        }, ...state.notifications].slice(0, 50),
        unreadCount: state.unreadCount + 1
      })),
      
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
      
      // Initialize
      initializeStore: () => {
        // Add welcome notification
        get().addNotification({
          type: 'success',
          title: 'Welcome to Nexus Dash',
          message: 'Your ultimate admin dashboard is ready',
          icon: '✨'
        })
      }
    }),
    {
      name: 'nexus-dash-storage',
      partialize: (state) => ({
        user: state.user,
        theme: state.theme,
        sidebarCollapsed: state.sidebarCollapsed
      })
    }
  )
)
