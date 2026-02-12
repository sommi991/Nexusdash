import React, { useEffect, useState } from 'react'
import { 
  FiCheckCircle, FiAlertCircle, FiInfo, FiXCircle, 
  FiX, FiBell 
} from 'react-icons/fi'

export const Notification = ({
  id,
  type = 'info',
  title,
  message,
  duration = 5000,
  onClose
}) => {
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [duration])

  const handleClose = () => {
    setIsExiting(true)
    setTimeout(() => {
      onClose?.(id)
    }, 300)
  }

  const icons = {
    success: FiCheckCircle,
    error: FiXCircle,
    warning: FiAlertCircle,
    info: FiInfo,
    default: FiBell
  }

  const colors = {
    success: {
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
      text: 'text-emerald-400',
      icon: 'text-emerald-400'
    },
    error: {
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/20',
      text: 'text-rose-400',
      icon: 'text-rose-400'
    },
    warning: {
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
      text: 'text-amber-400',
      icon: 'text-amber-400'
    },
    info: {
      bg: 'bg-indigo-500/10',
      border: 'border-indigo-500/20',
      text: 'text-indigo-400',
      icon: 'text-indigo-400'
    },
    default: {
      bg: 'bg-white/5',
      border: 'border-white/10',
      text: 'text-white/90',
      icon: 'text-white/60'
    }
  }

  const Icon = icons[type] || icons.default
  const color = colors[type] || colors.default

  return (
    <div 
      className={`
        relative w-96 rounded-xl ${color.bg} border ${color.border} backdrop-blur-xl
        transition-all duration-300 transform
        ${isExiting ? 'opacity-0 translate-x-full' : 'opacity-100 translate-x-0'}
        animate-slide-in-right
      `}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className="flex-shrink-0">
            <Icon className={`w-5 h-5 ${color.icon}`} />
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            {title && (
              <h4 className={`text-sm font-semibold ${color.text} mb-0.5`}>
                {title}
              </h4>
            )}
            <p className="text-xs text-white/60">
              {message}
            </p>
          </div>
          
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="flex-shrink-0 p-1 rounded-lg hover:bg-white/5 transition-colors"
          >
            <FiX className="w-4 h-4 text-white/40" />
          </button>
        </div>
      </div>
      
      {/* Progress Bar */}
      {duration > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/5 rounded-b-xl overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 animate-shrink-width"
            style={{ animationDuration: `${duration}ms` }}
          />
        </div>
      )}
    </div>
  )
}

export const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([])

  const addNotification = (notification) => {
    const id = Date.now()
    setNotifications(prev => [...prev, { id, ...notification }])
  }

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  return (
    <div className="fixed top-6 right-6 z-[200] space-y-3 w-96">
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          {...notification}
          onClose={removeNotification}
        />
      ))}
    </div>
  )
}
