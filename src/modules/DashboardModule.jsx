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
import { StatCard } from '../components/core/StatCard'
import { motion, AnimatePresence } from 'framer-motion'
import { useSwipeable } from 'react-swipeable'
import { toast } from 'react-hot-toast'

const DashboardModule = () => {
  const { data, filters, setFilters, addNotification, user } = useNexusStore()
  const [selectedPeriod, setSelectedPeriod] = useState('week')
  const [selectedStat, setSelectedStat] = useState(null)
  const [showFilters, setShowFilters] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)
  const [selectedView, setSelectedView] = useState('overview')
  const [showExportModal, setShowExportModal] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [exportFormat, setExportFormat] = useState('pdf')
  const [exportProgress, setExportProgress] = useState(0)
  const [isExporting, setIsExporting] = useState(false)
  const [selectedChart, setSelectedChart] = useState(null)
  const [chartData, setChartData] = useState(null)
  const containerRef = useRef(null)
  const touchStartY = useRef(0)
  const isPulling = useRef(false)

  // ============ REAL DATA WITH HISTORY ============
  const stats = {
    revenue: { 
      value: 284500, 
      change: 15.2, 
      trend: 'up', 
      historical: [245000, 258000, 271000, 284500, 298000, 312000, 325000, 341000],
      weekly: [45000, 52000, 48000, 56000, 59000, 62000, 58000],
      monthly: [245000, 258000, 271000, 284500, 298000],
      yearly: [2100000, 2350000, 2680000, 2845000],
      format: 'currency'
    },
    orders: { 
      value: 1248, 
      change: 8.7, 
      trend: 'up', 
      historical: [1120, 1180, 1210, 1248, 1280, 1320, 1350, 1390],
      weekly: [180, 195, 210, 188, 205, 220, 215],
      monthly: [1120, 1180, 1210, 1248, 1280],
      yearly: [9850, 10200, 11500, 12480],
      format: 'number'
    },
    customers: { 
      value: 892, 
      change: 23.4, 
      trend: 'up', 
      historical: [680, 740, 820, 892, 950, 1020, 1080, 1150],
      weekly: [120, 145, 132, 158, 167, 149, 172],
      monthly: [680, 740, 820, 892, 950],
      yearly: [4200, 5100, 6200, 8920],
      format: 'number'
    },
    conversion: { 
      value: 3.2, 
      change: 0.8, 
      trend: 'up', 
      historical: [2.8, 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6],
      weekly: [3.1, 3.2, 3.1, 3.3, 3.2, 3.4, 3.3],
      monthly: [2.8, 3.0, 3.1, 3.2, 3.3],
      yearly: [2.4, 2.6, 2.9, 3.2],
      format: 'percent'
    },
    aov: { 
      value: 228, 
      change: 4.2, 
      trend: 'up', 
      historical: [215, 220, 225, 228, 232, 235, 238, 242],
      weekly: [220, 225, 218, 230, 235, 228, 240],
      monthly: [215, 220, 225, 228, 232],
      yearly: [198, 208, 218, 228],
      format: 'currency'
    },
    retention: { 
      value: 76, 
      change: 5.3, 
      trend: 'up', 
      historical: [68, 71, 74, 76, 78, 80, 81, 83],
      weekly: [74, 75, 76, 77, 78, 79, 80],
      monthly: [68, 71, 74, 76, 78],
      yearly: [62, 65, 71, 76],
      format: 'percent'
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
    },
    { 
      id: 5, 
      user: 'David Lee', 
      action: 'completed onboarding', 
      time: '5 hours ago', 
      type: 'onboarding', 
      avatar: '👨', 
      status: 'info',
      details: 'Completed 5/5 steps • Ready to start'
    },
    { 
      id: 6, 
      user: 'Lisa Chen', 
      action: 'upgraded to premium', 
      amount: 99, 
      time: '6 hours ago', 
      type: 'upgrade', 
      avatar: '👩', 
      status: 'success',
      details: 'Annual plan • 20% discount applied'
    },
  ]

  // ============ CHART DATA ============
  const revenueChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: '2024 Revenue',
        data: [210000, 235000, 248000, 284500, 298000, 312000, 325000, 341000, 358000, 372000, 389000, 405000],
        color: 'from-indigo-500 to-purple-500'
      },
      {
        label: '2023 Revenue',
        data: [185000, 198000, 210000, 225000, 238000, 252000, 265000, 278000, 291000, 305000, 318000, 332000],
        color: 'from-purple-500 to-pink-500'
      }
    ]
  }

  const categoryData = [
    { name: 'Electronics', value: 125000, percentage: 35, color: 'from-indigo-500 to-purple-500', icon: '📱' },
    { name: 'Fashion', value: 89000, percentage: 25, color: 'from-purple-500 to-pink-500', icon: '👕' },
    { name: 'Home', value: 67000, percentage: 19, color: 'from-pink-500 to-rose-500', icon: '🏠' },
    { name: 'Sports', value: 45000, percentage: 13, color: 'from-amber-500 to-orange-500', icon: '⚽' },
    { name: 'Books', value: 28500, percentage: 8, color: 'from-emerald-500 to-teal-500', icon: '📚' },
  ]

  // ============ EXPORT FUNCTIONALITY ============
  const handleExport = () => {
    setShowExportModal(true)
  }

  const startExport = () => {
    setIsExporting(true)
    setExportProgress(0)
    
    // Simulate export progress
    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsExporting(false)
          setShowExportModal(false)
          
          // Show success message with download simulation
          toast.success(
            <div className="space-y-2">
              <div className="font-bold">Export Complete!</div>
              <div className="text-sm">File: dashboard_export.{exportFormat}</div>
              <div className="text-xs text-white/60">Size: 2.4 MB</div>
            </div>,
            { 
              icon: '📥',
              duration: 5000,
              style: {
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: '#fff',
                minWidth: '250px'
              }
            }
          )
          
          // Simulate download
          const link = document.createElement('a')
          link.href = '#'
          link.download = `dashboard_export.${exportFormat}`
          link.click()
          
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  // ============ DETAILED STAT VIEW ============
  const StatDetailModal = ({ statKey, stat, onClose }) => {
    const [selectedTimeframe, setSelectedTimeframe] = useState('monthly')
    
    const timeframes = {
      weekly: { label: 'Weekly', data: stat.weekly },
      monthly: { label: 'Monthly', data: stat.monthly },
      yearly: { label: 'Yearly', data: stat.yearly }
    }

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="glass-card w-full max-w-3xl p-6 bg-[#0a0a1f]/90 border border-indigo-500/30"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">
                {statKey.charAt(0).toUpperCase() + statKey.slice(1)} Details
              </h2>
              <p className="text-white/40 text-sm">Detailed analytics and trends</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 
                flex items-center justify-center transition-colors"
            >
              <FiX className="w-5 h-5 text-white/60" />
            </button>
          </div>

          {/* Current Value */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 
              border border-indigo-500/20">
              <div className="text-sm text-white/40 mb-1">Current Value</div>
              <div className="text-3xl font-bold text-white">
                {formatValue(stat.value, stat.format)}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 
              border border-purple-500/20">
              <div className="text-sm text-white/40 mb-1">Change</div>
              <div className="text-3xl font-bold text-white flex items-center gap-2">
                <span className={stat.trend === 'up' ? 'text-emerald-400' : 'text-rose-400'}>
                  {stat.change}%
                </span>
                {stat.trend === 'up' ? 
                  <FiTrendingUp className="w-6 h-6 text-emerald-400" /> : 
                  <FiTrendingDown className="w-6 h-6 text-rose-400" />
                }
              </div>
            </div>
          </div>

          {/* Timeframe Selector */}
          <div className="flex gap-2 mb-6">
            {Object.entries(timeframes).map(([key, tf]) => (
              <button
                key={key}
                onClick={() => setSelectedTimeframe(key)}
                className={`px-4 py-2 rounded-lg transition-all text-sm font-medium
                  ${selectedTimeframe === key
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-glow'
                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
              >
                {tf.label}
              </button>
            ))}
          </div>

          {/* Historical Data */}
          <div className="space-y-3 mb-6">
            {timeframes[selectedTimeframe].data.map((value, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-16 text-sm text-white/40">
                  {selectedTimeframe === 'weekly' && `Week ${index + 1}`}
                  {selectedTimeframe === 'monthly' && `Month ${index + 1}`}
                  {selectedTimeframe === 'yearly' && `${2020 + index}`}
                </div>
                <div className="flex-1 h-8 bg-white/5 rounded-lg overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(value / Math.max(...timeframes[selectedTimeframe].data)) * 100}%` }}
                    className={`h-full bg-gradient-to-r from-indigo-500 to-purple-500 
                      flex items-center justify-end px-3 text-xs text-white font-medium`}
                  >
                    {formatValue(value, stat.format)}
                  </motion.div>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <button
              onClick={() => {
                handleDoubleTap(statKey)
                onClose()
              }}
              className="px-6 py-2.5 bg-white/5 hover:bg-white/10 
                rounded-xl text-white/80 transition-colors flex items-center gap-2"
            >
              <FiDownload className="w-4 h-4" />
              Export Data
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 
                rounded-xl text-white font-medium shadow-glow"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    )
  }

  // ============ EXPORT MODAL ============
  const ExportModal = ({ onClose }) => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="glass-card w-full max-w-md p-6 bg-[#0a0a1f]/90 border border-indigo-500/30"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl font-bold text-white mb-2">Export Dashboard</h2>
          <p className="text-white/40 text-sm mb-6">Choose your export preferences</p>

          {/* Format Selection */}
          <div className="space-y-4 mb-6">
            <label className="block text-sm text-white/60 mb-2">Export Format</label>
            <div className="grid grid-cols-3 gap-3">
              {['pdf', 'excel', 'csv'].map((format) => (
                <button
                  key={format}
                  onClick={() => setExportFormat(format)}
                  className={`p-3 rounded-xl border transition-all
                    ${exportFormat === format
                      ? 'border-indigo-500 bg-indigo-500/10 shadow-glow-sm'
                      : 'border-white/10 bg-white/5 hover:bg-white/10'
                    }`}
                >
                  <div className="text-2xl mb-1">
                    {format === 'pdf' && '📄'}
                    {format === 'excel' && '📊'}
                    {format === 'csv' && '📋'}
                  </div>
                  <div className="text-xs text-white/60 uppercase">{format}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div className="space-y-4 mb-6">
            <label className="block text-sm text-white/60 mb-2">Date Range</label>
            <div className="grid grid-cols-2 gap-3">
              {['Today', 'This Week', 'This Month', 'Custom'].map((range) => (
                <button
                  key={range}
                  className="p-2 rounded-lg bg-white/5 border border-white/10 
                    hover:bg-white/10 transition-colors text-sm text-white/80"
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          {/* Include Options */}
          <div className="space-y-3 mb-8">
            <label className="flex items-center gap-3">
              <input type="checkbox" className="w-4 h-4 rounded bg-white/5 border-white/20" defaultChecked />
              <span className="text-sm text-white/80">Include Charts</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" className="w-4 h-4 rounded bg-white/5 border-white/20" defaultChecked />
              <span className="text-sm text-white/80">Include Raw Data</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" className="w-4 h-4 rounded bg-white/5 border-white/20" defaultChecked />
              <span className="text-sm text-white/80">Include Summary</span>
            </label>
          </div>

          {/* Progress Bar (if exporting) */}
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

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 
                rounded-xl text-white/80 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={startExport}
              disabled={isExporting}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 
                rounded-xl text-white font-medium shadow-glow
                disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center gap-2"
            >
              {isExporting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Exporting
                </>
              ) : (
                <>
                  <FiDownload className="w-4 h-4" />
                  Export Now
                </>
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    )
  }

  // ============ ACTIVITY DETAIL MODAL ============
  const ActivityDetailModal = ({ activity, onClose }) => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="glass-card w-full max-w-lg p-6 bg-[#0a0a1f]/90 border border-indigo-500/30"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl
                bg-gradient-to-r ${getStatusColor(activity.status)}/20 
                border border-${activity.status === 'success' ? 'emerald' : 
                  activity.status === 'warning' ? 'amber' : 
                  activity.status === 'error' ? 'rose' : 'indigo'}-500/30`}
              >
                {activity.avatar}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">{activity.user}</h2>
                <p className="text-white/60">{activity.action}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 
                flex items-center justify-center transition-colors"
            >
              <FiX className="w-5 h-5 text-white/60" />
            </button>
          </div>

          <div className="space-y-4 mb-8">
            <div className="p-4 rounded-xl bg-white/5">
              <div className="text-sm text-white/40 mb-1">Details</div>
              <div className="text-white/90">{activity.details || 'No additional details'}</div>
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
                toast.success('Message sent to user', { icon: '✉️' })
                onClose()
              }}
              className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 
                rounded-xl text-white/80 transition-colors flex items-center justify-center gap-2"
            >
              <FiMail className="w-4 h-4" />
              Message
            </button>
            <button
              onClick={() => {
                toast.success('Activity marked as resolved', { icon: '✅' })
                onClose()
              }}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 
                rounded-xl text-white font-medium shadow-glow"
            >
              Mark as Resolved
            </button>
          </div>
        </motion.div>
      </motion.div>
    )
  }

  // ============ SWIPE GESTURES ============
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      toast.success(
        <div className="flex items-center gap-2">
          <span className="text-2xl">👉</span>
          <span>Switched to Analytics</span>
        </div>,
        { 
          icon: '📊',
          style: {
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            color: '#fff',
            border: 'none',
            boxShadow: '0 10px 25px -5px rgba(99,102,241,0.5)'
          }
        }
      )
      setSelectedStat('revenue')
      if (navigator.vibrate) navigator.vibrate(20)
    },
    onSwipedRight: () => {
      toast.success(
        <div className="flex items-center gap-2">
          <span className="text-2xl">👈</span>
          <span>Switched to Orders</span>
        </div>,
        { 
          icon: '📦',
          style: {
            background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
            color: '#fff',
            border: 'none',
            boxShadow: '0 10px 25px -5px rgba(139,92,246,0.5)'
          }
        }
      )
      setSelectedStat('orders')
      if (navigator.vibrate) navigator.vibrate(20)
    },
    onSwipedUp: () => {
      handleRefresh()
      if (navigator.vibrate) navigator.vibrate([30, 50, 30])
    },
    onSwipedDown: () => {
      setShowFilters(true)
      toast.success(
        <div className="flex items-center gap-2">
          <span className="text-2xl">👇</span>
          <span>Filters opened</span>
        </div>,
        { 
          icon: '🔍',
          style: {
            background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
            color: '#fff',
            border: 'none',
            boxShadow: '0 10px 25px -5px rgba(59,130,246,0.5)'
          }
        }
      )
      if (navigator.vibrate) navigator.vibrate(15)
    },
    trackMouse: true,
    preventScrollOnSwipe: false,
    delta: 10,
    swipeDuration: 300
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
      if (pullDistance >= 50) {
        handleRefresh()
      }
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
    
    toast.loading(
      <div className="flex items-center gap-3">
        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        <span>Refreshing your dashboard...</span>
      </div>,
      { 
        id: 'refresh',
        style: {
          background: 'rgba(10,10,31,0.9)',
          color: '#fff',
          border: '1px solid rgba(99,102,241,0.3)',
          backdropFilter: 'blur(10px)'
        }
      }
    )
    
    setTimeout(() => {
      setIsRefreshing(false)
      toast.success(
        <div className="flex items-center gap-2">
          <span className="text-2xl">✨</span>
          <span>Dashboard updated with latest data!</span>
        </div>,
        { 
          id: 'refresh',
          style: {
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: '#fff',
            border: 'none',
            boxShadow: '0 10px 25px -5px rgba(16,185,129,0.5)'
          }
        }
      )
      if (navigator.vibrate) navigator.vibrate([30, 50, 30])
    }, 2000)
  }

  // ============ STAT CARD HANDLERS ============
  const handleStatClick = (statKey, stat) => {
    setSelectedStat(statKey)
  }

  const closeStatModal = () => {
    setSelectedStat(null)
  }

  // ============ DOUBLE TAP HANDLER ============
  const handleDoubleTap = (statKey) => {
    setExportFormat('pdf')
    setShowExportModal(true)
    if (navigator.vibrate) navigator.vibrate([20, 20, 20])
  }

  // ============ LONG PRESS HANDLER ============
  const handleLongPress = (statKey) => {
    toast.custom((t) => (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="glass-card p-4 bg-[#0a0a1f]/90 backdrop-blur-xl 
          border border-indigo-500/30 rounded-xl shadow-glow-lg"
        style={{ maxWidth: '300px' }}
      >
        <p className="text-white mb-3 font-medium">Quick actions for {statKey}:</p>
        <div className="grid grid-cols-2 gap-2">
          <button 
            className="px-3 py-2 bg-indigo-500/20 text-indigo-400 rounded-lg 
              hover:bg-indigo-500/30 transition-colors text-sm font-medium
              flex items-center justify-center gap-1"
            onClick={() => {
              toast.dismiss(t.id)
              handleDoubleTap(statKey)
            }}
          >
            <FiDownload className="w-3 h-3" />
            Export
          </button>
          <button 
            className="px-3 py-2 bg-purple-500/20 text-purple-400 rounded-lg 
              hover:bg-purple-500/30 transition-colors text-sm font-medium
              flex items-center justify-center gap-1"
            onClick={() => {
              toast.dismiss(t.id)
              toast.success('Share link copied!', { 
                icon: '🔗',
                style: {
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                  color: '#fff'
                }
              })
            }}
          >
            <FiShare2 className="w-3 h-3" />
            Share
          </button>
          <button 
            className="px-3 py-2 bg-pink-500/20 text-pink-400 rounded-lg 
              hover:bg-pink-500/30 transition-colors text-sm font-medium
              flex items-center justify-center gap-1 col-span-2"
            onClick={() => {
              toast.dismiss(t.id)
              toast.success('Added to quick view', { 
                icon: '📌',
                style: {
                  background: 'linear-gradient(135deg, #ec4899 0%, #d946ef 100%)',
                  color: '#fff'
                }
              })
            }}
          >
            <FiStar className="w-3 h-3" />
            Add to Favorites
          </button>
        </div>
      </motion.div>
    ), { duration: 3000 })
    
    if (navigator.vibrate) navigator.vibrate([50, 30, 50])
  }

  // ============ ACTIVITY CLICK HANDLER ============
  const [selectedActivity, setSelectedActivity] = useState(null)

  const handleActivityClick = (activity) => {
    setSelectedActivity(activity)
  }

  // ============ FORMAT VALUE ============
  const formatValue = (value, format) => {
    switch (format) {
      case 'currency':
        return `$${value.toLocaleString()}`
      case 'percent':
        return `${value}%`
      default:
        return value.toLocaleString()
    }
  }

  // ============ GET STATUS COLOR ============
  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'from-emerald-500 to-teal-500'
      case 'warning': return 'from-amber-500 to-orange-500'
      case 'error': return 'from-rose-500 to-red-500'
      default: return 'from-blue-500 to-indigo-500'
    }
  }

  // ============ VIEWS ============
  const views = [
    { id: 'overview', label: 'Overview', icon: FiGrid },
    { id: 'analytics', label: 'Analytics', icon: FiBarChart2 },
    { id: 'reports', label: 'Reports', icon: FiFileText },
  ]

  return (
    <div className="h-full w-full relative">
      {/* Modals */}
      <AnimatePresence>
        {selectedStat && (
          <StatDetailModal
            statKey={selectedStat}
            stat={stats[selectedStat]}
            onClose={closeStatModal}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showExportModal && (
          <ExportModal onClose={() => setShowExportModal(false)} />
        )}
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
        style={{ 
          WebkitOverflowScrolling: 'touch',
          scrollBehavior: 'smooth'
        }}
        animate={{ y: pullDistance }}
        transition={{ type: 'spring', damping: 30, stiffness: 200 }}
      >
        {/* Pull to refresh indicator */}
        <AnimatePresence>
          {pullDistance > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-0 left-0 right-0 flex justify-center pt-4 z-50 pointer-events-none"
            >
              <div className="glass-card px-6 py-3 rounded-full bg-[#0a0a1f]/90 
                backdrop-blur-xl border border-indigo-500/30 flex items-center gap-3
                shadow-glow-lg"
              >
                <motion.div
                  animate={{ 
                    rotate: pullDistance >= 50 ? 180 : 0,
                    scale: pullDistance >= 50 ? 1.2 : 1
                  }}
                  className="text-2xl"
                >
                  ⬇️
                </motion.div>
                <span className="text-white text-sm font-medium">
                  {pullDistance >= 50 ? 'Release to refresh' : 'Pull to refresh'}
                </span>
                <div className="w-12 h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                    initial={{ width: '0%' }}
                    animate={{ width: `${(pullDistance / 50) * 100}%` }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main content container with max width for large screens */}
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6 space-y-8">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl lg:text-4xl font-display font-bold mb-2
                bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 
                bg-clip-text text-transparent
                flex items-center gap-3"
              >
                Welcome back, {user?.name?.split(' ')[0] || 'Alex'}
                <motion.span
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2,
                    repeatDelay: 1
                  }}
                  className="text-3xl inline-block"
                >
                  👋
                </motion.span>
              </h1>
              <p className="text-white/40 text-sm flex items-center gap-2 flex-wrap">
                <FiActivity className="w-4 h-4 text-indigo-400" />
                Here's what's happening with your business today
                <motion.span 
                  whileHover={{ scale: 1.05 }}
                  className="px-2 py-0.5 rounded-full bg-white/5 text-white/60 
                    text-[10px] cursor-default border border-white/10"
                >
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </motion.span>
              </p>
            </motion.div>

            {/* Header Actions */}
            <motion.div 
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Period Selector */}
              <motion.select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="h-11 px-4 rounded-xl bg-white/[0.02] border border-white/[0.03] 
                  focus:border-indigo-500/30 focus:outline-none focus:ring-2 
                  focus:ring-indigo-500/20 text-sm text-white/70
                  hover:bg-white/[0.03] transition-colors cursor-pointer
                  appearance-none bg-no-repeat"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='rgba(255,255,255,0.4)' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                  backgroundPosition: 'right 1rem center',
                  backgroundSize: '1.25rem',
                  paddingRight: '2.5rem'
                }}
              >
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </motion.select>
              
              {/* Export Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleExport}
                className="h-11 px-4 rounded-xl bg-white/[0.02] border border-white/[0.03] 
                  hover:bg-white/[0.03] transition-colors flex items-center gap-2 
                  text-sm text-white/70 relative overflow-hidden group
                  hover:border-indigo-500/30"
              >
                <FiDownload className="w-4 h-4 group-hover:animate-bounce" />
                Export
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/10 to-indigo-500/0"
                  animate={{
                    x: ['-100%', '200%']
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: 'linear'
                  }}
                />
              </motion.button>
              
              {/* Filter Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFilters(!showFilters)}
                className={`h-11 px-4 rounded-xl transition-all flex items-center gap-2 text-sm
                  ${showFilters 
                    ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 shadow-glow-sm' 
                    : 'bg-white/[0.02] border border-white/[0.03] text-white/70 hover:bg-white/[0.03]'
                  }`}
              >
                <FiFilter className={`w-4 h-4 transition-transform duration-300 
                  ${showFilters ? 'rotate-180' : ''}`} 
                />
                Filter
              </motion.button>

              {/* Refresh Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRefresh}
                className={`h-11 w-11 rounded-xl bg-white/[0.02] border border-white/[0.03] 
                  hover:bg-white/[0.03] transition-colors flex items-center justify-center
                  ${isRefreshing ? 'pointer-events-none' : ''}`}
              >
                <FiRefreshCw className={`w-4 h-4 text-white/70 
                  ${isRefreshing ? 'animate-spin' : ''}`} 
                />
              </motion.button>
            </motion.div>
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
                <GlassCard className="p-6 border border-indigo-500/20 shadow-glow-md">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs text-white/40 mb-2 font-medium">
                        Date Range
                      </label>
                      <select className="w-full px-4 py-2.5 rounded-lg bg-white/5 
                        border border-white/10 text-white/70 focus:border-indigo-500/30 
                        focus:outline-none focus:ring-2 focus:ring-indigo-500/20
                        hover:bg-white/[0.06] transition-colors cursor-pointer">
                        <option>Last 7 days</option>
                        <option>Last 30 days</option>
                        <option>Last 90 days</option>
                        <option>Custom range</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-white/40 mb-2 font-medium">
                        Category
                      </label>
                      <select className="w-full px-4 py-2.5 rounded-lg bg-white/5 
                        border border-white/10 text-white/70 focus:border-indigo-500/30 
                        focus:outline-none focus:ring-2 focus:ring-indigo-500/20
                        hover:bg-white/[0.06] transition-colors cursor-pointer">
                        <option>All Categories</option>
                        <option>Electronics</option>
                        <option>Fashion</option>
                        <option>Home & Garden</option>
                        <option>Sports</option>
                        <option>Books</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-white/40 mb-2 font-medium">
                        Status
                      </label>
                      <select className="w-full px-4 py-2.5 rounded-lg bg-white/5 
                        border border-white/10 text-white/70 focus:border-indigo-500/30 
                        focus:outline-none focus:ring-2 focus:ring-indigo-500/20
                        hover:bg-white/[0.06] transition-colors cursor-pointer">
                        <option>All</option>
                        <option>Active</option>
                        <option>Pending</option>
                        <option>Completed</option>
                        <option>Cancelled</option>
                        <option>Refunded</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-white/40 mb-2 font-medium">
                        Sort By
                      </label>
                      <select className="w-full px-4 py-2.5 rounded-lg bg-white/5 
                        border border-white/10 text-white/70 focus:border-indigo-500/30 
                        focus:outline-none focus:ring-2 focus:ring-indigo-500/20
                        hover:bg-white/[0.06] transition-colors cursor-pointer">
                        <option>Revenue (High to Low)</option>
                        <option>Revenue (Low to High)</option>
                        <option>Date (Newest)</option>
                        <option>Date (Oldest)</option>
                        <option>Orders (Most)</option>
                        <option>Orders (Least)</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 mt-6">
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowFilters(false)}
                      className="px-6 py-2.5 text-white/60 hover:text-white/80 
                        transition-colors font-medium"
                    >
                      Cancel
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setShowFilters(false)
                        toast.success(
                          <div>
                            <div className="font-bold">Filters applied!</div>
                            <div className="text-sm text-white/80">Showing filtered results</div>
                          </div>,
                          {
                            icon: '✅',
                            style: {
                              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                              color: '#fff'
                            }
                          }
                        )
                      }}
                      className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 
                        rounded-xl text-white font-medium shadow-glow
                        hover:shadow-glow-lg transition-all"
                    >
                      Apply Filters
                    </motion.button>
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>

          {/* View Tabs */}
          <div className="flex items-center gap-2 p-1 glass-card w-fit">
            {views.map((view) => {
              const Icon = view.icon
              return (
                <motion.button
                  key={view.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedView(view.id)}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 
                    transition-all duration-200 font-medium text-sm
                    ${selectedView === view.id 
                      ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-400 border border-indigo-500/30 shadow-glow-sm' 
                      : 'text-white/60 hover:text-white/80'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  {view.label}
                </motion.button>
              )
            })}
          </div>

          {/* KPI Grid with Touch Interactions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
            {Object.entries(stats).map(([key, stat], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  transition: { type: 'spring', stiffness: 400, damping: 25 }
                }}
                whileTap={{ scale: 0.95 }}
                onTap={() => handleStatClick(key, stat)}
                onDoubleClick={() => handleDoubleTap(key)}
                onContextMenu={(e) => {
                  e.preventDefault()
                  handleLongPress(key)
                }}
                className="cursor-pointer"
              >
                <StatCard
                  title={key.charAt(0).toUpperCase() + key.slice(1)}
                  value={formatValue(stat.value, stat.format)}
                  change={stat.change}
                  trend={stat.trend}
                  icon={
                    key === 'revenue' ? FiDollarSign :
                    key === 'orders' ? FiShoppingBag :
                    key === 'customers' ? FiUsers :
                    key === 'conversion' ? FiTarget :
                    key === 'aov' ? FiCreditCard :
                    FiAward
                  }
                  gradient={
                    key === 'revenue' ? 'from-indigo-500 to-purple-500' :
                    key === 'orders' ? 'from-purple-500 to-pink-500' :
                    key === 'customers' ? 'from-pink-500 to-rose-500' :
                    key === 'conversion' ? 'from-amber-500 to-orange-500' :
                    key === 'aov' ? 'from-emerald-500 to-teal-500' :
                    'from-blue-500 to-indigo-500'
                  }
                  sparkline={stat.historical.slice(0, 6)}
                  onClick={() => handleStatClick(key, stat)}
                />
              </motion.div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <GlassCard className="p-6 border border-indigo-500/20 hover:border-indigo-500/30 
              transition-all duration-300 group">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-white/90 mb-1 
                    flex items-center gap-2">
                    <FiTrendingUpIcon className="w-5 h-5 text-indigo-400" />
                    Revenue Overview
                  </h3>
                  <p className="text-sm text-white/40">Monthly revenue performance</p>
                </div>
                <div className="flex items-center gap-2">
                  {revenueChartData.datasets.map((dataset, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg 
                        cursor-pointer border transition-colors
                        ${i === 0 
                          ? 'bg-indigo-500/10 border-indigo-500/20 hover:bg-indigo-500/20' 
                          : 'bg-purple-500/10 border-purple-500/20 hover:bg-purple-500/20'
                        }`}
                      onClick={() => {
                        setChartData(dataset)
                        toast.success(`Viewing ${dataset.label}`, {
                          icon: '📊',
                          style: {
                            background: `linear-gradient(135deg, ${dataset.color.split(' ')[1]} 0%, ${dataset.color.split(' ')[3]} 100%)`,
                            color: '#fff'
                          }
                        })
                      }}
                    >
                      <span className={`w-2 h-2 rounded-full 
                        ${i === 0 ? 'bg-indigo-400' : 'bg-purple-400'} animate-pulse-soft`}
                      />
                      <span className="text-xs text-white/60">{dataset.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="h-80 relative group">
                {/* Chart visualization - in real app, use a chart library */}
                <div className="absolute inset-0 flex items-end justify-around p-4">
                  {revenueChartData.datasets[0].data.slice(0, 12).map((value, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${(value / 500000) * 100}%` }}
                      transition={{ delay: i * 0.02, duration: 0.5 }}
                      className="w-6 bg-gradient-to-t from-indigo-500 to-purple-500 
                        rounded-t-lg cursor-pointer group/chart relative"
                      whileHover={{ scale: 1.1 }}
                      onClick={() => {
                        toast.success(
                          <div>
                            <div className="font-bold">Revenue: ${value.toLocaleString()}</div>
                            <div className="text-sm text-white/80">{revenueChartData.labels[i]} 2024</div>
                          </div>,
                          { 
                            icon: '📈',
                            style: {
                              background: 'rgba(99,102,241,0.2)',
                              color: '#fff',
                              border: '1px solid rgba(99,102,241,0.3)',
                              backdropFilter: 'blur(10px)'
                            }
                          }
                        )
                        if (navigator.vibrate) navigator.vibrate(10)
                      }}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 
                        bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 
                        group-hover/chart:opacity-100 transition-opacity whitespace-nowrap">
                        ${value.toLocaleString()}
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="absolute bottom-0 left-0 right-0 flex justify-around px-4">
                  {revenueChartData.labels.slice(0, 12).map((label, i) => (
                    <div key={i} className="text-xs text-white/40 w-6 text-center">
                      {label}
                    </div>
                  ))}
                </div>
                <motion.div 
                  className="absolute inset-0 pointer-events-none"
                  animate={{
                    boxShadow: ['0 0 0 0 rgba(99,102,241,0)', '0 0 30px 0 rgba(99,102,241,0.2)', '0 0 0 0 rgba(99,102,241,0)']
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: 'easeInOut'
                  }}
                />
              </div>
            </GlassCard>

            <GlassCard className="p-6 border border-purple-500/20 hover:border-purple-500/30 
              transition-all duration-300 group">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-white/90 mb-1 
                    flex items-center gap-2">
                    <FiPieChart className="w-5 h-5 text-purple-400" />
                    Sales by Category
                  </h3>
                  <p className="text-sm text-white/40">Product category distribution</p>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                  onClick={() => {
                    toast.success(
                      <div>
                        <div className="font-bold">Category Analytics</div>
                        <div className="text-sm text-white/80">View detailed breakdown</div>
                      </div>,
                      {
                        icon: '📊',
                        style: {
                          background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                          color: '#fff'
                        }
                      }
                    )
                  }}
                >
                  <FiMoreVertical className="w-5 h-5 text-white/40" />
                </motion.button>
              </div>
              <div className="h-80">
                {/* Pie chart visualization */}
                <div className="flex flex-col h-full">
                  <div className="flex-1 flex items-center justify-center">
                    <div className="relative w-40 h-40">
                      {categoryData.map((category, i) => {
                        const rotation = categoryData.slice(0, i).reduce((acc, c) => acc + c.percentage, 0) * 3.6
                        return (
                          <motion.div
                            key={category.name}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className={`absolute inset-0 rounded-full cursor-pointer
                              hover:scale-105 transition-transform`}
                            style={{
                              background: `conic-gradient(from ${rotation}deg, 
                                ${i === 0 ? '#6366f1' : 
                                  i === 1 ? '#8b5cf6' : 
                                  i === 2 ? '#ec4899' : 
                                  i === 3 ? '#f59e0b' : '#10b981'} ${category.percentage * 3.6}deg, 
                                transparent 0)`
                            }}
                            onClick={() => {
                              toast.success(
                                <div>
                                  <div className="font-bold">{category.name}</div>
                                  <div className="text-sm text-white/80">
                                    ${category.value.toLocaleString()} ({category.percentage}%)
                                  </div>
                                </div>,
                                { 
                                  icon: category.icon,
                                  style: {
                                    background: `linear-gradient(135deg, ${category.color.split(' ')[1]} 0%, ${category.color.split(' ')[3]} 100%)`,
                                    color: '#fff'
                                  }
                                }
                              )
                              if (navigator.vibrate) navigator.vibrate(10)
                            }}
                          />
                        )
                      })}
                      <div className="absolute inset-4 rounded-full bg-[#0a0a1f] 
                        flex items-center justify-center">
                        <span className="text-2xl">💰</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {categoryData.map((category, i) => (
                      <motion.div
                        key={category.name}
                        whileHover={{ scale: 1.02, x: 5 }}
                        className="flex items-center gap-2 cursor-pointer p-2 
                          rounded-lg hover:bg-white/5 transition-colors"
                        onClick={() => {
                          toast.success(
                            <div>
                              <div className="font-bold">{category.name}</div>
                              <div className="text-sm text-white/80">
                                ${category.value.toLocaleString()} ({category.percentage}%)
                              </div>
                            </div>,
                            { 
                              icon: category.icon,
                              style: {
                                background: `linear-gradient(135deg, ${category.color.split(' ')[1]} 0%, ${category.color.split(' ')[3]} 100%)`,
                                color: '#fff'
                              }
                            }
                          )
                        }}
                      >
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${category.color}`} />
                        <span className="text-xs text-white/80 flex-1">{category.name}</span>
                        <span className="text-xs text-white/40">{category.percentage}%</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity with Swipe Actions */}
            <GlassCard className="p-6 lg:col-span-2 border border-indigo-500/20">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-white/90 mb-1 
                    flex items-center gap-2">
                    <FiActivity className="w-5 h-5 text-indigo-400" />
                    Recent Activity
                  </h3>
                  <p className="text-sm text-white/40">Latest actions across your business</p>
                </div>
                <motion.button 
                  whileHover={{ x: 5 }}
                  className="text-sm text-indigo-400 hover:text-indigo-300 
                    transition-colors flex items-center gap-1"
                  onClick={() => {
                    toast.success('Loading all activities...', {
                      icon: '📋',
                      style: {
                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                        color: '#fff'
                      }
                    })
                  }}
                >
                  View All
                  <FiArrowUpRight className="w-4 h-4" />
                </motion.button>
              </div>

              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <SwipeableActivityItem 
                    key={activity.id} 
                    activity={activity} 
                    onClick={() => handleActivityClick(activity)}
                  />
                ))}
              </div>
            </GlassCard>

            {/* Quick Stats & Actions */}
            <GlassCard className="p-6 border border-purple-500/20">
              <h3 className="text-lg font-semibold text-white/90 mb-4 
                flex items-center gap-2">
                <FiZap className="w-5 h-5 text-purple-400" />
                Quick Stats
              </h3>
              
              <div className="space-y-4">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-4 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 
                    border border-indigo-500/20 cursor-pointer relative overflow-hidden
                    hover:border-indigo-500/40 transition-colors group"
                  onClick={() => {
                    toast.success(
                      <div>
                        <div className="font-bold">Today's Revenue Details</div>
                        <div className="text-sm text-white/80">Breakdown by hour available</div>
                      </div>,
                      { 
                        icon: '💰',
                        style: {
                          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                          color: '#fff'
                        }
                      }
                    )
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/20 to-indigo-500/0"
                    animate={{
                      x: ['-100%', '200%']
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: 'linear'
                    }}
                  />
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white/60">Today's Revenue</span>
                    <motion.span 
                      animate={{ 
                        scale: [1, 1.1, 1],
                        backgroundColor: ['rgba(16,185,129,0.1)', 'rgba(16,185,129,0.2)', 'rgba(16,185,129,0.1)']
                      }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="text-xs px-2 py-1 rounded-full bg-emerald-500/10 
                        text-emerald-400 border border-emerald-500/20"
                    >
                      +12.5%
                    </motion.span>
                  </div>
                  <div className="text-2xl font-bold text-white/90">$12,845</div>
                  <div className="text-xs text-white/40 mt-1 flex items-center gap-1">
                    <FiTrendingUp className="w-3 h-3 text-emerald-400" />
                    vs $11,423 yesterday
                  </div>
                </motion.div>

                <div className="grid grid-cols-2 gap-3">
                  <QuickStatCard 
                    value="156" 
                    label="Products" 
                    sub="+8 new" 
                    trend="up" 
                    color="from-emerald-500/20 to-teal-500/20"
                    icon={FiBox}
                    onClick={() => {
                      toast.success(
                        <div>
                          <div className="font-bold">Products Overview</div>
                          <div className="text-sm text-white/80">156 active • 8 new this week</div>
                        </div>,
                        { 
                          icon: '📦',
                          style: {
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                            color: '#fff'
                          }
                        }
                      )
                    }}
                  />
                  <QuickStatCard 
                    value="12" 
                    label="Pending" 
                    sub="-3 today" 
                    trend="down" 
                    color="from-amber-500/20 to-orange-500/20"
                    icon={FiClock}
                    onClick={() => {
                      toast.success(
                        <div>
                          <div className="font-bold">Pending Orders</div>
                          <div className="text-sm text-white/80">12 orders awaiting processing</div>
                        </div>,
                        { 
                          icon: '⏳',
                          style: {
                            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                            color: '#fff'
                          }
                        }
                      )
                    }}
                  />
                  <QuickStatCard 
                    value="89%" 
                    label="Satisfaction" 
                    sub="+2.3%" 
                    trend="up" 
                    color="from-blue-500/20 to-indigo-500/20"
                    icon={FiStar}
                    onClick={() => {
                      toast.success(
                        <div>
                          <div className="font-bold">Customer Satisfaction</div>
                          <div className="text-sm text-white/80">Based on 234 reviews this month</div>
                        </div>,
                        { 
                          icon: '⭐',
                          style: {
                            background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
                            color: '#fff'
                          }
                        }
                      )
                    }}
                  />
                  <QuickStatCard 
                    value="5" 
                    label="Low Stock" 
                    sub="Restock soon" 
                    trend="warning" 
                    color="from-rose-500/20 to-red-500/20"
                    icon={FiAlertCircle}
                    onClick={() => {
                      toast.success(
                        <div>
                          <div className="font-bold">Low Stock Alert</div>
                          <div className="text-sm text-white/80">5 products need restocking</div>
                        </div>,
                        { 
                          icon: '⚠️',
                          style: {
                            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                            color: '#fff'
                          }
                        }
                      )
                    }}
                  />
                </div>

                <div className="pt-4 border-t border-white/[0.03]">
                  <h4 className="text-xs font-semibold uppercase tracking-wider 
                    text-white/40 mb-3 flex items-center gap-2">
                    <FiZap className="w-3 h-3 text-purple-400" />
                    Quick Actions
                  </h4>
                  <div className="grid grid-cols-4 gap-2">
                    <QuickActionButton 
                      icon={FiShoppingBag} 
                      label="New Order" 
                      color="from-indigo-500 to-purple-500"
                      onClick={() => {
                        toast.success(
                          <div>
                            <div className="font-bold">Create New Order</div>
                            <div className="text-sm text-white/80">Opening order form...</div>
                          </div>,
                          { 
                            icon: '🛒',
                            style: {
                              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                              color: '#fff'
                            }
                          }
                        )
                      }}
                    />
                    <QuickActionButton 
                      icon={FiUsers} 
                      label="Add User" 
                      color="from-purple-500 to-pink-500"
                      onClick={() => {
                        toast.success(
                          <div>
                            <div className="font-bold">Add New User</div>
                            <div className="text-sm text-white/80">Opening user registration...</div>
                          </div>,
                          { 
                            icon: '👤',
                            style: {
                              background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                              color: '#fff'
                            }
                          }
                        )
                      }}
                    />
                    <QuickActionButton 
                      icon={FiPackage} 
                      label="Add Product" 
                      color="from-emerald-500 to-teal-500"
                      onClick={() => {
                        toast.success(
                          <div>
                            <div className="font-bold">Add New Product</div>
                            <div className="text-sm text-white/80">Opening product form...</div>
                          </div>,
                          { 
                            icon: '📦',
                            style: {
                              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                              color: '#fff'
                            }
                          }
                        )
                      }}
                    />
                    <QuickActionButton 
                      icon={FiDownload} 
                      label="Export" 
                      color="from-amber-500 to-orange-500"
                      onClick={handleExport}
                    />
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Geographic & Device Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LocationChart />
            <DeviceChart />
          </div>

          {/* Bottom padding for better scrolling */}
          <div className="h-8" />
        </div>
      </motion.div>

      {/* Floating gesture indicator */}
      <FloatingGestureIndicator />
    </div>
  )
}

// ============ SWIPEABLE ACTIVITY ITEM ============
const SwipeableActivityItem = ({ activity, onClick }) => {
  const [offset, setOffset] = useState(0)
  const [isSwiping, setIsSwiping] = useState(false)
  const startX = useRef(0)
  const itemRef = useRef(null)

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
        toast.success(
          <div className="flex items-center gap-2">
            <span className="text-xl">✅</span>
            <span>Activity marked as read</span>
          </div>,
          { 
            style: {
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: '#fff'
            }
          }
        )
      } else {
        toast.success(
          <div className="flex items-center gap-2">
            <span className="text-xl">📌</span>
            <span>Activity saved for later</span>
          </div>,
          { 
            style: {
              background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
              color: '#fff'
            }
          }
        )
      }
      if (navigator.vibrate) navigator.vibrate([20, 10, 20])
    }
    setOffset(0)
    setIsSwiping(false)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'from-emerald-500 to-teal-500'
      case 'warning': return 'from-amber-500 to-orange-500'
      case 'error': return 'from-rose-500 to-red-500'
      default: return 'from-blue-500 to-indigo-500'
    }
  }

  return (
    <motion.div
      ref={itemRef}
      animate={{ x: offset }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className="relative touch-pan-x"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background actions */}
      <div className="absolute inset-0 flex rounded-xl overflow-hidden">
        <div className={`flex-1 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 
          flex items-center justify-start pl-4 border-r border-white/10`}>
          <FiCheckCircle className="w-5 h-5 text-emerald-400" />
          <span className="ml-2 text-emerald-400 text-sm font-medium">Read</span>
        </div>
        <div className={`flex-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 
          flex items-center justify-end pr-4`}>
          <FiBookmark className="w-5 h-5 text-purple-400" />
          <span className="mr-2 text-purple-400 text-sm font-medium">Save</span>
        </div>
      </div>

      {/* Foreground content */}
      <motion.div 
        whileHover={{ scale: 1.01 }}
        className={`relative p-4 rounded-xl bg-gradient-to-r ${getStatusColor(activity.status)}/5 
          border border-white/[0.03] hover:border-white/[0.08] 
          transition-all cursor-pointer backdrop-blur-sm`}
        style={{ 
          background: 'rgba(10,10,31,0.7)',
          backdropFilter: 'blur(10px)'
        }}
        onClick={onClick}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl
              bg-gradient-to-r ${getStatusColor(activity.status)}/20 
              border border-${activity.status === 'success' ? 'emerald' : 
                activity.status === 'warning' ? 'amber' : 
                activity.status === 'error' ? 'rose' : 'indigo'}-500/30
              animate-pulse-soft`}
            >
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
                  <span className={`px-2 py-0.5 rounded-full 
                    ${activity.type === 'refund' 
                      ? 'bg-rose-500/10 text-rose-400' 
                      : 'bg-emerald-500/10 text-emerald-400'
                    } border border-current/20`}
                  >
                    ${activity.amount}
                  </span>
                )}
                {activity.rating && (
                  <span className="flex items-center gap-1 text-amber-400">
                    <FiStar className="w-3 h-3 fill-amber-400" />
                    {activity.rating}.0
                  </span>
                )}
              </div>
            </div>
          </div>
          <FiEye className="w-5 h-5 text-white/20 hover:text-white/40 
            transition-colors cursor-pointer" 
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

// ============ QUICK STAT CARD ============
const QuickStatCard = ({ value, label, sub, trend, color, icon: Icon, onClick }) => (
  <motion.div 
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.95 }}
    className={`p-3 rounded-xl bg-gradient-to-br ${color} 
      border border-white/5 cursor-pointer relative overflow-hidden
      hover:border-white/10 transition-all group`}
    onClick={onClick}
  >
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0"
      animate={{
        x: ['-100%', '200%']
      }}
      transition={{
        repeat: Infinity,
        duration: 2,
        ease: 'linear'
      }}
    />
    <div className="flex items-start justify-between mb-1">
      <div className="text-2xl font-bold text-white/90">{value}</div>
      {Icon && <Icon className="w-4 h-4 text-white/40 group-hover:text-white/60 
        transition-colors" />}
    </div>
    <div className="text-xs text-white/40">{label}</div>
    <div className={`text-[10px] mt-1 flex items-center gap-1
      ${trend === 'up' ? 'text-emerald-400' : 
        trend === 'down' ? 'text-rose-400' : 
        'text-amber-400'}`}>
      {trend === 'up' && <FiTrendingUp className="w-3 h-3" />}
      {trend === 'down' && <FiTrendingDown className="w-3 h-3" />}
      {trend === 'warning' && <FiAlertCircle className="w-3 h-3" />}
      {sub}
    </div>
  </motion.div>
)

// ============ QUICK ACTION BUTTON ============
const QuickActionButton = ({ icon: Icon, label, color, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.1, y: -2 }}
    whileTap={{ scale: 0.9 }}
    className="p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.03] 
      transition-all group flex flex-col items-center gap-2
      border border-white/5 hover:border-white/10 relative overflow-hidden"
    onClick={onClick}
  >
    <motion.div
      className={`absolute inset-0 bg-gradient-to-r ${color} opacity-0 
        group-hover:opacity-10 transition-opacity duration-300`}
    />
    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${color} 
      flex items-center justify-center group-hover:scale-110 
      transition-transform shadow-glow-sm`}
    >
      <Icon className="w-4 h-4 text-white" />
    </div>
    <span className="text-[10px] text-white/60 group-hover:text-white/80 
      transition-colors font-medium">
      {label}
    </span>
  </motion.button>
)

// ============ LOCATION CHART ============
const LocationChart = () => {
  const locations = [
    { country: 'United States', flag: '🇺🇸', revenue: 124500, percentage: 45, growth: 12.5, cities: ['New York', 'LA', 'Chicago'] },
    { country: 'United Kingdom', flag: '🇬🇧', revenue: 68200, percentage: 24, growth: 8.3, cities: ['London', 'Manchester'] },
    { country: 'Canada', flag: '🇨🇦', revenue: 45600, percentage: 16, growth: 15.7, cities: ['Toronto', 'Vancouver'] },
    { country: 'Australia', flag: '🇦🇺', revenue: 28900, percentage: 10, growth: -2.1, cities: ['Sydney', 'Melbourne'] },
    { country: 'Germany', flag: '🇩🇪', revenue: 14200, percentage: 5, growth: 5.8, cities: ['Berlin', 'Munich'] },
  ]

  return (
    <GlassCard className="p-6 border border-indigo-500/20 hover:border-indigo-500/30 
      transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white/90 mb-1 
            flex items-center gap-2">
            <FiGlobe className="w-5 h-5 text-indigo-400" />
            Top Locations
          </h3>
          <p className="text-sm text-white/40">Revenue by region</p>
        </div>
      </div>
      <div className="space-y-4">
        {locations.map((location, i) => (
          <motion.div 
            key={location.country}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-4 cursor-pointer group"
            whileHover={{ scale: 1.02, x: 5 }}
            onClick={() => toast.success(
              <div>
                <div className="font-bold">{location.country}</div>
                <div className="text-sm text-white/80">Revenue: ${location.revenue.toLocaleString()}</div>
                <div className="text-xs text-white/60 mt-1">Cities: {location.cities.join(', ')}</div>
              </div>,
              { 
                icon: location.flag,
                style: {
                  background: 'rgba(99,102,241,0.2)',
                  color: '#fff',
                  border: '1px solid rgba(99,102,241,0.3)',
                  backdropFilter: 'blur(10px)'
                }
              }
            )}
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">
              {location.flag}
            </span>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-white/90">{location.country}</span>
                <span className="text-sm font-semibold text-white/90">
                  ${location.revenue.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${location.percentage}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                  />
                </div>
                <motion.span 
                  animate={{ 
                    scale: [1, 1.1, 1],
                    color: location.growth > 0 ? '#34d399' : '#f87171'
                  }}
                  transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
                  className={`text-xs flex items-center gap-1 font-medium`}
                >
                  {location.growth > 0 ? <FiTrendingUp className="w-3 h-3" /> : <FiTrendingDown className="w-3 h-3" />}
                  {Math.abs(location.growth)}%
                </motion.span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  )
}

// ============ DEVICE CHART ============
const DeviceChart = () => {
  const devices = [
    { device: 'Mobile', icon: FiSmartphone, percentage: 55, revenue: 156475, growth: 23.4, color: 'from-indigo-500 to-purple-500', os: ['iOS', 'Android'] },
    { device: 'Desktop', icon: FiMonitor, percentage: 35, revenue: 99575, growth: 5.2, color: 'from-purple-500 to-pink-500', os: ['Windows', 'macOS'] },
    { device: 'Tablet', icon: FiMonitor, percentage: 10, revenue: 28450, growth: -1.8, color: 'from-amber-500 to-orange-500', os: ['iPadOS', 'Android'] },
  ]

  return (
    <GlassCard className="p-6 border border-purple-500/20 hover:border-purple-500/30 
      transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white/90 mb-1 
            flex items-center gap-2">
            <FiSmartphone className="w-5 h-5 text-purple-400" />
            Device Breakdown
          </h3>
          <p className="text-sm text-white/40">Traffic by device type</p>
        </div>
      </div>
      <div className="space-y-6">
        {devices.map((item, i) => {
          const Icon = item.icon
          return (
            <motion.div 
              key={item.device}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4 cursor-pointer group"
              whileHover={{ scale: 1.02 }}
              onClick={() => toast.success(
                <div>
                  <div className="font-bold">{item.device}</div>
                  <div className="text-sm text-white/80">Traffic: {item.percentage}%</div>
                  <div className="text-sm text-white/80">Revenue: ${item.revenue.toLocaleString()}</div>
                  <div className="text-xs text-white/60 mt-1">OS: {item.os.join(', ')}</div>
                </div>,
                { 
                  icon: item.device === 'Mobile' ? '📱' : item.device === 'Desktop' ? '💻' : '📟',
                  style: {
                    background: `linear-gradient(135deg, ${item.color.split(' ')[1]} 0%, ${item.color.split(' ')[3]} 100%)`,
                    color: '#fff'
                  }
                }
              )}
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${item.color} 
                flex items-center justify-center group-hover:scale-110 
                transition-transform shadow-glow-sm`}
              >
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-white/90">{item.device}</span>
                  <span className="text-sm font-semibold text-white/90">
                    ${item.revenue.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percentage}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                    />
                  </div>
                  <span className="text-xs text-white/40 font-medium">{item.percentage}%</span>
                  <motion.span 
                    animate={{ 
                      scale: [1, 1.1, 1],
                      color: item.growth > 0 ? '#34d399' : '#f87171'
                    }}
                    transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
                    className={`text-xs flex items-center gap-1 font-medium`}
                  >
                    {item.growth > 0 ? <FiTrendingUp className="w-3 h-3" /> : <FiTrendingDown className="w-3 h-3" />}
                    {Math.abs(item.growth)}%
                  </motion.span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </GlassCard>
  )
}

// ============ FLOATING GESTURE INDICATOR ============
const FloatingGestureIndicator = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [gestureDemo, setGestureDemo] = useState('swipe')

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 15000)
    
    // Rotate through gesture examples
    const gestures = ['swipe', 'doubletap', 'longpress']
    let index = 0
    const interval = setInterval(() => {
      index = (index + 1) % gestures.length
      setGestureDemo(gestures[index])
    }, 2000)
    
    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [])

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 
        glass-card px-4 py-2 rounded-full bg-[#0a0a1f]/90 backdrop-blur-xl 
        border border-indigo-500/30 flex items-center gap-4 shadow-glow-lg"
    >
      <span className="text-white/80 text-xs flex items-center gap-1">
        <motion.span 
          animate={{ 
            x: gestureDemo === 'swipe' ? [0, 10, 0] : 0,
            scale: gestureDemo === 'doubletap' ? [1, 1.2, 1] : 1,
          }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="text-lg"
        >
          {gestureDemo === 'swipe' && '👉'}
          {gestureDemo === 'doubletap' && '👆👆'}
          {gestureDemo === 'longpress' && '🤏'}
        </motion.span>
        <span>
          {gestureDemo === 'swipe' && 'Swipe cards'}
          {gestureDemo === 'doubletap' && 'Double tap to export'}
          {gestureDemo === 'longpress' && 'Long press for menu'}
        </span>
      </span>
    </motion.div>
  )
}

export default DashboardModule
