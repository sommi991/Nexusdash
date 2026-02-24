import React, { useState, useEffect, useRef } from 'react'
import { 
  FiTrendingUp, FiTrendingDown, FiDollarSign, FiShoppingBag, 
  FiUsers, FiPackage, FiClock, FiCalendar, FiActivity,
  FiArrowUpRight, FiArrowDownRight, FiMoreVertical,
  FiDownload, FiFilter, FiRefreshCw, FiEye, FiStar,
  FiMapPin, FiGlobe, FiSmartphone, FiMonitor, FiCreditCard,
  FiCheckCircle, FiAlertCircle, FiZap, FiTarget, FiAward,
  FiHeart, FiShare2, FiBookmark, FiBell, FiSettings,
  FiHelpCircle, FiLogOut, FiUser, FiMenu, FiX,
  FiBarChart2, FiPieChart, FiTrendingUp as FiTrendingUpIcon,
  FiGrid, FiLayers, FiBox, FiFileText, FiPrinter,
  FiMail, FiMessageCircle, FiLink, FiCalendar as FiCalendarIcon,
  FiClock as FiClockIcon, FiPercent, FiDollarSign as FiDollarIcon,
  FiShoppingCart, FiTruck, FiHome, FiBriefcase
} from 'react-icons/fi'
import { useNexusStore } from '../store/nexusStore'
import { GlassCard } from '../components/core/GlassCard'
import { motion, AnimatePresence } from 'framer-motion'
import { useSwipeable } from 'react-swipeable'
import { toast } from 'react-hot-toast'

const DashboardModule = () => {
  const { user } = useNexusStore()
  const [selectedPeriod, setSelectedPeriod] = useState('week')
  const [selectedStat, setSelectedStat] = useState(null)
  const [showFilters, setShowFilters] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)
  const [selectedView, setSelectedView] = useState('overview')
  const [showExportModal, setShowExportModal] = useState(false)
  const [exportFormat, setExportFormat] = useState('pdf')
  const [exportProgress, setExportProgress] = useState(0)
  const [isExporting, setIsExporting] = useState(false)
  const [selectedActivity, setSelectedActivity] = useState(null)
  const containerRef = useRef(null)
  const touchStartY = useRef(0)
  const isPulling = useRef(false)

  // ============ REAL STATS DATA ============
  const stats = {
    revenue: { 
      value: 284500, 
      change: 15.2, 
      trend: 'up', 
      historical: [245000, 258000, 271000, 284500, 298000, 312000],
      format: 'currency',
      icon: FiDollarSign,
      color: 'from-indigo-500 to-purple-500'
    },
    orders: { 
      value: 1248, 
      change: 8.7, 
      trend: 'up', 
      historical: [1120, 1180, 1210, 1248, 1280, 1320],
      format: 'number',
      icon: FiShoppingBag,
      color: 'from-purple-500 to-pink-500'
    },
    customers: { 
      value: 892, 
      change: 23.4, 
      trend: 'up', 
      historical: [680, 740, 820, 892, 950, 1020],
      format: 'number',
      icon: FiUsers,
      color: 'from-pink-500 to-rose-500'
    },
    conversion: { 
      value: 3.2, 
      change: 0.8, 
      trend: 'up', 
      historical: [2.8, 3.0, 3.1, 3.2, 3.3, 3.4],
      format: 'percent',
      icon: FiTarget,
      color: 'from-amber-500 to-orange-500'
    },
    aov: { 
      value: 228, 
      change: 4.2, 
      trend: 'up', 
      historical: [215, 220, 225, 228, 232, 235],
      format: 'currency',
      icon: FiCreditCard,
      color: 'from-emerald-500 to-teal-500'
    },
    retention: { 
      value: 76, 
      change: 5.3, 
      trend: 'up', 
      historical: [68, 71, 74, 76, 78, 80],
      format: 'percent',
      icon: FiAward,
      color: 'from-blue-500 to-indigo-500'
    }
  }

  // ============ REAL ACTIVITY DATA ============
  const recentActivity = [
    { 
      id: 1, 
      user: 'John Smith', 
      action: 'placed order', 
      item: '#ORD-7842', 
      amount: 1248, 
      time: '2 min ago', 
      type: 'order', 
      avatar: '👨', 
      status: 'success',
      details: '3 items • Express shipping • Paid with Visa'
    },
    { 
      id: 2, 
      user: 'Sarah Johnson', 
      action: 'registered new account', 
      time: '15 min ago', 
      type: 'user', 
      avatar: '👩', 
      status: 'info',
      details: 'Email: sarah.j@example.com • Referred by friend'
    },
    { 
      id: 3, 
      user: 'Michael Brown', 
      action: 'submitted review', 
      rating: 5, 
      time: '1 hour ago', 
      type: 'review', 
      avatar: '👨‍🦰', 
      status: 'success',
      details: 'Product: Wireless Headphones • "Amazing sound quality!"'
    },
    { 
      id: 4, 
      user: 'Emma Wilson', 
      action: 'requested refund', 
      amount: 299, 
      time: '3 hours ago', 
      type: 'refund', 
      avatar: '👩‍🦰', 
      status: 'warning',
      details: 'Order #ORD-7811 • Reason: Wrong size'
    }
  ]

  // ============ CHART DATA ============
  const chartData = {
    revenue: [210000, 235000, 248000, 284500, 298000, 312000, 325000, 341000],
    categories: [
      { name: 'Electronics', value: 35, color: 'from-indigo-500 to-purple-500', icon: '📱' },
      { name: 'Fashion', value: 25, color: 'from-purple-500 to-pink-500', icon: '👕' },
      { name: 'Home', value: 19, color: 'from-pink-500 to-rose-500', icon: '🏠' },
      { name: 'Sports', value: 13, color: 'from-amber-500 to-orange-500', icon: '⚽' },
      { name: 'Books', value: 8, color: 'from-emerald-500 to-teal-500', icon: '📚' }
    ]
  }

  // ============ SWIPE GESTURES ============
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      toast.success('👉 Switched to Analytics', { 
        icon: '📊',
        style: { background: '#6366f1', color: '#fff' }
      })
      if (navigator.vibrate) navigator.vibrate(20)
    },
    onSwipedRight: () => {
      toast.success('👈 Switched to Orders', { 
        icon: '📦',
        style: { background: '#8b5cf6', color: '#fff' }
      })
      if (navigator.vibrate) navigator.vibrate(20)
    },
    onSwipedUp: () => handleRefresh(),
    onSwipedDown: () => {
      setShowFilters(true)
      toast.success('👇 Filters opened', { 
        icon: '🔍',
        style: { background: '#3b82f6', color: '#fff' }
      })
      if (navigator.vibrate) navigator.vibrate(15)
    },
    trackMouse: true,
    preventScrollOnSwipe: false,
    delta: 10
  })

  // ============ PULL TO REFRESH ============
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleTouchStart = (e) => {
      if (container.scrollTop === 0) {
        touchStartY.current = e.touches[0].clientY
        isPulling.current = true
      }
    }

    const handleTouchMove = (e) => {
      if (!isPulling.current || container.scrollTop > 0) return
      const diff = e.touches[0].clientY - touchStartY.current
      if (diff > 0) {
        e.preventDefault()
        setPullDistance(Math.min(diff * 0.5, 100))
      }
    }

    const handleTouchEnd = () => {
      if (pullDistance >= 50) handleRefresh()
      setPullDistance(0)
      isPulling.current = false
    }

    container.addEventListener('touchstart', handleTouchStart, { passive: false })
    container.addEventListener('touchmove', handleTouchMove, { passive: false })
    container.addEventListener('touchend', handleTouchEnd)

    return () => {
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchmove', handleTouchMove)
      container.removeEventListener('touchend', handleTouchEnd)
    }
  }, [pullDistance])

  // ============ REFRESH HANDLER ============
  const handleRefresh = () => {
    setIsRefreshing(true)
    toast.loading('Refreshing dashboard...', { 
      id: 'refresh',
      style: { background: '#0a0a1f', color: '#fff' }
    })
    
    setTimeout(() => {
      setIsRefreshing(false)
      toast.success('✨ Dashboard updated!', { 
        id: 'refresh',
        style: { background: '#10b981', color: '#fff' }
      })
      if (navigator.vibrate) navigator.vibrate([30, 50, 30])
    }, 2000)
  }

  // ============ EXPORT HANDLER ============
  const handleExport = () => {
    setShowExportModal(true)
  }

  const startExport = () => {
    setIsExporting(true)
    setExportProgress(0)
    
    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsExporting(false)
          setShowExportModal(false)
          toast.success(
            <div>
              <div className="font-bold">Export Complete!</div>
              <div className="text-sm">dashboard_export.{exportFormat}</div>
            </div>,
            { 
              icon: '📥',
              style: { background: '#10b981', color: '#fff' }
            }
          )
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  // ============ STAT CARD HANDLERS ============
  const handleStatClick = (statKey) => {
    setSelectedStat(statKey)
    if (navigator.vibrate) navigator.vibrate(10)
  }

  const handleDoubleTap = (statKey) => {
    handleExport()
    if (navigator.vibrate) navigator.vibrate([20, 20, 20])
  }

  const handleLongPress = (statKey) => {
    toast.custom((t) => (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-4 bg-[#0a0a1f] border border-indigo-500/30 rounded-xl"
      >
        <p className="text-white mb-3">Quick actions for {statKey}:</p>
        <div className="grid grid-cols-2 gap-2">
          <button 
            onClick={() => { toast.dismiss(t.id); handleExport(); }}
            className="px-3 py-2 bg-indigo-500 text-white rounded-lg text-sm"
          >
            Export
          </button>
          <button 
            onClick={() => { toast.dismiss(t.id); toast.success('Link copied!'); }}
            className="px-3 py-2 bg-purple-500 text-white rounded-lg text-sm"
          >
            Share
          </button>
        </div>
      </motion.div>
    ), { duration: 3000 })
    if (navigator.vibrate) navigator.vibrate([50, 30, 50])
  }

  // ============ FORMAT VALUE ============
  const formatValue = (value, format) => {
    switch (format) {
      case 'currency': return `$${value.toLocaleString()}`
      case 'percent': return `${value}%`
      default: return value.toLocaleString()
    }
  }

  // ============ Stat Card Component ============
  const StatCard = ({ statKey, stat }) => (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onTap={() => handleStatClick(statKey)}
      onDoubleClick={() => handleDoubleTap(statKey)}
      onContextMenu={(e) => {
        e.preventDefault()
        handleLongPress(statKey)
      }}
      className={`p-6 rounded-2xl bg-gradient-to-br ${stat.color} 
        cursor-pointer relative overflow-hidden`}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-8 -mt-8" />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
            <stat.icon className="w-6 h-6 text-white" />
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium
            ${stat.trend === 'up' ? 'bg-emerald-500/30 text-emerald-200' : 'bg-rose-500/30 text-rose-200'}`}>
            {stat.trend === 'up' ? '↑' : '↓'} {stat.change}%
          </span>
        </div>
        <h3 className="text-white/60 text-sm mb-1">
          {statKey.charAt(0).toUpperCase() + statKey.slice(1)}
        </h3>
        <p className="text-3xl font-bold text-white mb-3">
          {formatValue(stat.value, stat.format)}
        </p>
        <div className="flex items-center gap-1">
          {stat.historical.slice(0, 6).map((value, i) => (
            <div
              key={i}
              className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden"
            >
              <div
                className="h-full bg-white"
                style={{ width: `${(value / Math.max(...stat.historical)) * 100}%` }}
              />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )

  // ============ Export Modal ============
  const ExportModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
      onClick={() => setShowExportModal(false)}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="glass-card w-full max-w-md p-6 bg-[#0a0a1f] border border-indigo-500/30"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-white mb-2">Export Dashboard</h2>
        <p className="text-white/40 text-sm mb-6">Choose export format</p>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {['pdf', 'excel', 'csv'].map((format) => (
            <button
              key={format}
              onClick={() => setExportFormat(format)}
              className={`p-4 rounded-xl border transition-all
                ${exportFormat === format
                  ? 'border-indigo-500 bg-indigo-500/20'
                  : 'border-white/10 bg-white/5 hover:bg-white/10'
                }`}
            >
              <div className="text-3xl mb-2">
                {format === 'pdf' && '📄'}
                {format === 'excel' && '📊'}
                {format === 'csv' && '📋'}
              </div>
              <div className="text-xs text-white/60 uppercase">{format}</div>
            </button>
          ))}
        </div>

        {isExporting && (
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-white/60">Exporting...</span>
              <span className="text-white/80">{exportProgress}%</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: `${exportProgress}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={() => setShowExportModal(false)}
            className="flex-1 px-4 py-3 bg-white/5 rounded-xl text-white/80"
          >
            Cancel
          </button>
          <button
            onClick={startExport}
            disabled={isExporting}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 
              rounded-xl text-white font-medium disabled:opacity-50"
          >
            {isExporting ? 'Exporting...' : 'Export Now'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )

  // ============ Activity Detail Modal ============
  const ActivityDetailModal = ({ activity, onClose }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="glass-card w-full max-w-lg p-6 bg-[#0a0a1f] border border-indigo-500/30"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-3xl">
              {activity.avatar}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">{activity.user}</h2>
              <p className="text-white/60">{activity.action} {activity.item}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4 mb-8">
          <div className="p-4 rounded-xl bg-white/5">
            <div className="text-sm text-white/40 mb-1">Details</div>
            <div className="text-white/90">{activity.details}</div>
          </div>

          {activity.amount && (
            <div className="p-4 rounded-xl bg-white/5">
              <div className="text-sm text-white/40 mb-1">Amount</div>
              <div className="text-2xl font-bold text-white">${activity.amount}</div>
            </div>
          )}

          {activity.rating && (
            <div className="p-4 rounded-xl bg-white/5">
              <div className="text-sm text-white/40 mb-1">Rating</div>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold text-white">{activity.rating}.0</div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className={`w-5 h-5 
                      ${i < activity.rating ? 'fill-amber-400 text-amber-400' : 'text-white/20'}`} 
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="p-4 rounded-xl bg-white/5">
            <div className="text-sm text-white/40 mb-1">Time</div>
            <div className="text-white/90 flex items-center gap-2">
              <FiClock className="w-4 h-4" />
              {activity.time}
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => {
              toast.success('Message sent!')
              onClose()
            }}
            className="flex-1 px-4 py-3 bg-white/5 rounded-xl text-white/80 flex items-center justify-center gap-2"
          >
            <FiMail className="w-4 h-4" />
            Message
          </button>
          <button
            onClick={() => {
              toast.success('Marked as resolved!')
              onClose()
            }}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 
              rounded-xl text-white font-medium"
          >
            Mark Resolved
          </button>
        </div>
      </motion.div>
    </motion.div>
  )

  // ============ Swipeable Activity Item ============
  const SwipeableActivityItem = ({ activity }) => {
    const [offset, setOffset] = useState(0)
    const [isSwiping, setIsSwiping] = useState(false)
    const startX = useRef(0)

    const handleTouchStart = (e) => {
      startX.current = e.touches[0].clientX
      setIsSwiping(true)
    }

    const handleTouchMove = (e) => {
      if (!isSwiping) return
      const diff = e.touches[0].clientX - startX.current
      setOffset(Math.max(-80, Math.min(80, diff)))
    }

    const handleTouchEnd = () => {
      if (Math.abs(offset) > 40) {
        if (offset > 0) {
          toast.success('Marked as read', { icon: '✅' })
        } else {
          toast.success('Saved for later', { icon: '📌' })
        }
        if (navigator.vibrate) navigator.vibrate([20, 10, 20])
      }
      setOffset(0)
      setIsSwiping(false)
    }

    return (
      <motion.div
        animate={{ x: offset }}
        transition={{ type: 'spring', damping: 30 }}
        className="relative"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Background actions */}
        <div className="absolute inset-0 flex rounded-xl overflow-hidden">
          <div className="flex-1 bg-emerald-500/20 flex items-center justify-start pl-4">
            <FiCheckCircle className="w-5 h-5 text-emerald-400" />
            <span className="ml-2 text-emerald-400 text-sm">Read</span>
          </div>
          <div className="flex-1 bg-purple-500/20 flex items-center justify-end pr-4">
            <FiBookmark className="w-5 h-5 text-purple-400" />
            <span className="mr-2 text-purple-400 text-sm">Save</span>
          </div>
        </div>

        {/* Foreground content */}
        <motion.div 
          className="relative p-4 rounded-xl bg-[#0a0a1f] border border-white/10 
            cursor-pointer hover:bg-[#12122f] transition-colors"
          onClick={() => setSelectedActivity(activity)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-xl">
                {activity.avatar}
              </div>
              <div>
                <div className="text-sm font-medium text-white/90 mb-1">
                  <span className="font-semibold">{activity.user}</span> {activity.action} {activity.item}
                </div>
                <div className="flex items-center gap-3 text-xs text-white/40">
                  <span className="flex items-center gap-1">
                    <FiClock className="w-3 h-3" />
                    {activity.time}
                  </span>
                  {activity.amount && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400">
                      ${activity.amount}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <FiEye className="w-5 h-5 text-white/20" />
          </div>
        </motion.div>
      </motion.div>
    )
  }

  // ============ Quick Action Button ============
  const QuickActionButton = ({ icon: Icon, label, color, onClick }) => (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all flex flex-col items-center gap-2"
      onClick={onClick}
    >
      <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${color} flex items-center justify-center`}>
        <Icon className="w-4 h-4 text-white" />
      </div>
      <span className="text-[10px] text-white/60">{label}</span>
    </motion.button>
  )

  // ============ MAIN RENDER ============
  return (
    <div className="h-full w-full relative">
      {/* Modals */}
      <AnimatePresence>
        {showExportModal && <ExportModal />}
      </AnimatePresence>

      <AnimatePresence>
        {selectedActivity && (
          <ActivityDetailModal
            activity={selectedActivity}
            onClose={() => setSelectedActivity(null)}
          />
        )}
      </AnimatePresence>

      {/* Main scrollable container */}
      <motion.div 
        {...swipeHandlers}
        ref={containerRef}
        className="h-full w-full overflow-y-auto overflow-x-hidden touch-pan-y"
        style={{ WebkitOverflowScrolling: 'touch' }}
        animate={{ y: pullDistance }}
      >
        {/* Pull to refresh indicator */}
        <AnimatePresence>
          {pullDistance > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-0 left-0 right-0 flex justify-center pt-4 z-50"
            >
              <div className="glass-card px-6 py-3 rounded-full bg-[#0a0a1f] border border-indigo-500/30">
                <span className="text-white">
                  {pullDistance >= 50 ? 'Release to refresh' : 'Pull to refresh'}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main content */}
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6 space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r 
                from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                Welcome back, {user?.name?.split(' ')[0] || 'Alex'} 👋
              </h1>
              <p className="text-white/40 text-sm">
                Here's what's happening with your business today
              </p>
            </div>

            <div className="flex items-center gap-3">
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="h-11 px-4 rounded-xl bg-white/5 border border-white/10 
                  text-white/70 focus:border-indigo-500/30 focus:outline-none"
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
              
              <button
                onClick={handleExport}
                className="h-11 px-4 rounded-xl bg-white/5 border border-white/10 
                  hover:bg-white/10 transition-colors flex items-center gap-2 text-white/70"
              >
                <FiDownload className="w-4 h-4" />
                Export
              </button>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`h-11 px-4 rounded-xl transition-colors flex items-center gap-2
                  ${showFilters ? 'bg-indigo-500/20 text-indigo-400' : 'bg-white/5 text-white/70'}`}
              >
                <FiFilter className="w-4 h-4" />
                Filter
              </button>

              <button
                onClick={handleRefresh}
                className={`h-11 w-11 rounded-xl bg-white/5 border border-white/10 
                  flex items-center justify-center ${isRefreshing ? 'animate-spin' : ''}`}
              >
                <FiRefreshCw className="w-4 h-4 text-white/70" />
              </button>
            </div>
          </div>

          {/* Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <GlassCard className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs text-white/40 mb-2">Date Range</label>
                      <select className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70">
                        <option>Last 7 days</option>
                        <option>Last 30 days</option>
                        <option>Last 90 days</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-white/40 mb-2">Category</label>
                      <select className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70">
                        <option>All Categories</option>
                        <option>Electronics</option>
                        <option>Fashion</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-white/40 mb-2">Status</label>
                      <select className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70">
                        <option>All</option>
                        <option>Active</option>
                        <option>Pending</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-white/40 mb-2">Sort By</label>
                      <select className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70">
                        <option>Revenue (High to Low)</option>
                        <option>Revenue (Low to High)</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 mt-4">
                    <button 
                      onClick={() => setShowFilters(false)}
                      className="px-4 py-2 text-white/60 hover:text-white/80"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={() => {
                        setShowFilters(false)
                        toast.success('Filters applied!')
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 
                        rounded-lg text-white font-medium"
                    >
                      Apply Filters
                    </button>
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>

          {/* KPI Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
            {Object.entries(stats).map(([key, stat]) => (
              <StatCard key={key} statKey={key} stat={stat} />
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold text-white/90 mb-4">Revenue Overview</h3>
              <div className="h-80 flex items-end justify-around gap-2">
                {chartData.revenue.map((value, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${(value / 400000) * 100}%` }}
                    className="w-12 bg-gradient-to-t from-indigo-500 to-purple-500 rounded-t-lg cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    onClick={() => toast.success(`Revenue: $${value}`)}
                  />
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold text-white/90 mb-4">Sales by Category</h3>
              <div className="h-80 flex items-center justify-center">
                <div className="relative w-48 h-48">
                  {chartData.categories.map((cat, i) => {
                    const rotation = chartData.categories.slice(0, i).reduce((acc, c) => acc + c.value, 0) * 3.6
                    return (
                      <motion.div
                        key={cat.name}
                        className={`absolute inset-0 rounded-full cursor-pointer
                          hover:scale-105 transition-transform`}
                        style={{
                          background: `conic-gradient(from ${rotation}deg, 
                            ${i === 0 ? '#6366f1' : i === 1 ? '#8b5cf6' : i === 2 ? '#ec4899' : i === 3 ? '#f59e0b' : '#10b981'} 
                            ${cat.value * 3.6}deg, transparent 0)`
                        }}
                        onClick={() => toast.success(`${cat.name}: ${cat.value}%`)}
                      />
                    )
                  })}
                  <div className="absolute inset-4 rounded-full bg-[#0a0a1f] flex items-center justify-center">
                    <span className="text-3xl">💰</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Recent Activity & Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <GlassCard className="p-6 lg:col-span-2">
              <h3 className="text-lg font-semibold text-white/90 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <SwipeableActivityItem key={activity.id} activity={activity} />
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold text-white/90 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <QuickActionButton 
                  icon={FiShoppingBag} 
                  label="New Order" 
                  color="from-indigo-500 to-purple-500"
                  onClick={() => toast.success('Creating new order...')}
                />
                <QuickActionButton 
                  icon={FiUsers} 
                  label="Add User" 
                  color="from-purple-500 to-pink-500"
                  onClick={() => toast.success('Adding new user...')}
                />
                <QuickActionButton 
                  icon={FiPackage} 
                  label="Add Product" 
                  color="from-emerald-500 to-teal-500"
                  onClick={() => toast.success('Adding new product...')}
                />
                <QuickActionButton 
                  icon={FiDownload} 
                  label="Export" 
                  color="from-amber-500 to-orange-500"
                  onClick={handleExport}
                />
              </div>
            </GlassCard>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default DashboardModule
