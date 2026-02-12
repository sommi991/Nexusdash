import { useCallback } from 'react'
import { useNexusStore } from './useNexusStore'

export const useNotifications = () => {
  const { notifications, unreadCount, addNotification, markNotificationRead, markAllRead } = useNexusStore()

  const showSuccess = useCallback((title, message) => {
    addNotification({
      type: 'success',
      title,
      message,
      icon: '✅'
    })
  }, [addNotification])

  const showError = useCallback((title, message) => {
    addNotification({
      type: 'error',
      title,
      message,
      icon: '❌'
    })
  }, [addNotification])

  const showWarning = useCallback((title, message) => {
    addNotification({
      type: 'warning',
      title,
      message,
      icon: '⚠️'
    })
  }, [addNotification])

  const showInfo = useCallback((title, message) => {
    addNotification({
      type: 'info',
      title,
      message,
      icon: 'ℹ️'
    })
  }, [addNotification])

  return {
    notifications,
    unreadCount,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    markAsRead: markNotificationRead,
    markAllAsRead: markAllRead
  }
}
