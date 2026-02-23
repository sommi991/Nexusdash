import React, { useState, useEffect, useRef } from 'react'
import { 
  FiTrendingUp, FiTrendingDown, FiDollarSign, FiShoppingBag, 
  FiUsers, FiPackage, FiClock, FiCalendar, FiActivity,
  FiArrowUpRight, FiArrowDownRight, FiMoreVertical,
  FiDownload, FiFilter, FiRefreshCw, FiEye, FiStar,
  FiMapPin, FiGlobe, FiSmartphone, FiMonitor, FiCreditCard,
  FiCheckCircle, FiAlertCircle, FiZap, FiTarget, FiAward,
  FiHeart, FiShare2, FiBookmark, FiBell, FiSettings,
  FiHelpCircle, FiLogOut, FiUser, FiMenu, FiX
} from 'react-icons/fi'
import { useNexusStore } from '../store/nexusStore'
import { GlassCard } from '../components/core/GlassCard'
import { StatCard } from '../components/core/StatCard'
import { Chart } from '../components/core/Chart'
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
  const containerRef = useRef(null)

  // ============ STATS DATA ============
  const stats = {
    revenue: { value: 284500, change: 15.2, trend: 'up', historical: [245000, 258000, 271000, 284500] },
    orders: { value: 1248, change: 8.7, trend: 'up', historical: [1120, 1180, 1210, 1248] },
    customers: { value: 892, change: 23.4, trend: 'up', historical: [680, 740, 820, 892] },
    conversion: { value: 3.2, change: 0.8, trend: 'up', historical: [2.8, 3.0, 3.1, 3.2] },
    aov: { value: 228, change: 4.2, trend: 'up', historical: [215, 220, 225, 228] },
    retention: { value: 76, change: 5.3, trend: 'up', historical: [68, 71, 74, 76] }
  }

  const recentActivity = [
    { id: 1, user: 'John Smith', action: 'placed order #ORD-7842', amount: 1248, time: '2 min ago', type: 'order', avatar: '👨' },
    { id: 2, user: 'Sarah Johnson', action: 'registered new account', time: '15 min ago', type: 'user', avatar: '👩' },
    { id: 3, user: 'Michael Brown', action: 'submitted review', rating: 5, time: '1 hour ago', type: 'review', avatar: '👨‍🦰' },
    { id: 4, user: 'Emma Wilson', action: 'requested refund', amount: 299, time: '3 hours ago', type: 'refund', avatar: '👩‍🦰' },
    { id: 5, user: 'David Lee', action: 'completed onboarding', time: '5 hours ago', type: 'onboarding', avatar: '👨' },
  ]

  // ============ SWIPE GESTURES ============
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      toast.success('Swiped left - showing analytics', { icon: '👈' })
      setSelectedStat('revenue')
      if (navigator.vibrate) navigator.vibrate(20)
    },
    onSwipedRight: () => {
      toast.success('Swiped right - showing orders', { icon: '👉' })
      setSelectedStat('orders')
      if (navigator.vibrate) navigator.vibrate(20)
    },
    onSwipedUp: () => {
      toast.success('Swiped up - refreshing', { icon: '👆' })
      handleRefresh()
      if (navigator.vibrate) navigator.vibrate([30, 50, 30])
    },
    onSwipedDown: () => {
      setShowFilters(true)
      toast.success('Filters opened', { icon: '👇' })
      if (navigator.vibrate) navigator.vibrate(15)
    },
    trackMouse: true
  })

  // ============ PULL TO REFRESH ============
  useEffect(() => {
    const handleTouchStart = (e) => {
      if (window.scrollY === 0) {
        window.touchStartY = e.touches[0].clientY
      }
    }

    const handleTouchMove = (e) => {
      if (window.scrollY === 0 && window.touchStartY) {
        const diff = e.touches[0].clientY - window.touchStartY
        if (diff > 0) {
          setPullDistance(Math.min(diff, 100))
        }
      }
    }

    const handleTouchEnd = () => {
      if (pullDistance >= 60) {
        handleRefresh()
      }
      setPullDistance(0)
    }

    window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('touchmove', handleTouchMove)
    window.addEventListener('touchend', handleTouchEnd)

    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [pullDistance])

  // ============ REFRESH HANDLER ============
  const handleRefresh = () => {
    setIsRefreshing(true)
    addNotification({
      type: 'info',
      title: 'Refreshing data',
      message: 'Fetching latest metrics',
      icon: '🔄'
    })
    
    setTimeout(() => {
      setIsRefreshing(false)
      toast.success('Dashboard updated!', { icon: '✨' })
      if (navigator.vibrate) navigator.vibrate([30, 50, 30])
    }, 1500)
  }

  // ============ STAT CARD CLICK HANDLER ============
  const handleStatClick = (statKey, stat) => {
    setSelectedStat(statKey)
    addNotification({
      type: 'info',
      title: `${statKey.charAt(0).toUpperCase() + statKey.slice(1)} Details`,
      message: `Viewing detailed analytics`,
      icon: '📊'
    })
    if (navigator.vibrate) navigator.vibrate(10)
  }

  // ============ DOUBLE TAP HANDLER ============
  const handleDoubleTap = (statKey) => {
    toast.success(`Quick export of ${statKey} data`, { icon: '📥' })
    if (navigator.vibrate) navigator.vibrate([20, 20, 20])
  }

  // ============ LONG PRESS HANDLER ============
  const handleLongPress = (statKey) => {
    toast.custom((t) => (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl"
      >
        <p className="text-white mb-3">Quick actions for {statKey}:</p>
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-lg">Export</button>
          <button className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-lg">Share</button>
          <button className="px-3 py-1 bg-rose-500/20 text-rose-400 rounded-lg">Pin</button>
        </div>
      </motion.div>
    ), { duration: 3000 })
    
    if (navigator.vibrate) navigator.vibrate([50, 30, 50])
  }

  return (
    <motion.div 
      {...swipeHandlers}
      ref={containerRef}
      className="space-y-8"
      animate={{ y: pullDistance }}
      transition={{ type: 'spring', damping: 30 }}
    >
      {/* Pull to refresh indicator */}
      <AnimatePresence>
        {pullDistance > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 right-0 flex justify-center pt-4 z-50"
          >
            <div className="glass-card px-6 py-3 rounded-full bg-white/10 backdrop-blur-xl 
              border border-white/20 flex items-center gap-3">
              <motion.div
                animate={{ rotate: pullDistance >= 60 ? 180 : 0 }}
                className="text-2xl"
              >
                ⬇️
              </motion.div>
              <span className="text-white text-sm">
                {pullDistance >= 60 ? 'Release to refresh' : 'Pull to refresh'}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r 
            from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2
            flex items-center gap-3">
            Welcome back, {user?.name?.split(' ')[0] || 'Alex'}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-2xl"
            >
              👋
            </motion.span>
          </h1>
          <p className="text-white/40 text-sm flex items-center gap-2 flex-wrap">
            <FiActivity className="w-4 h-4" />
            Here's what's happening with your business today
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className="px-2 py-0.5 rounded-full bg-white/5 text-white/60 text-[10px] cursor-default"
            >
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </motion.span>
          </p>
        </motion.div>

        <motion.div 
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="h-11 px-4 rounded-xl bg-white/[0.02] border border-white/[0.03] 
              focus:border-indigo-500/30 focus:outline-none text-sm text-white/70
              hover:bg-white/[0.03] transition-colors cursor-pointer"
          >
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </motion.select>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleExport()}
            className="h-11 px-4 rounded-xl bg-white/[0.02] border border-white/[0.03] 
              hover:bg-white/[0.03] transition-colors flex items-center gap-2 text-sm text-white/70
              relative overflow-hidden group"
          >
            <FiDownload className="w-4 h-4 group-hover:animate-bounce" />
            Export
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFilters(!showFilters)}
            className={`h-11 px-4 rounded-xl transition-colors flex items-center gap-2 text-sm
              ${showFilters 
                ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' 
                : 'bg-white/[0.02] border border-white/[0.03] text-white/70 hover:bg-white/[0.03]'
              }`}
          >
            <FiFilter className="w-4 h-4" />
            Filter
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, rotate: 180 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
            className={`h-11 w-11 rounded-xl bg-white/[0.02] border border-white/[0.03] 
              hover:bg-white/[0.03] transition-colors flex items-center justify-center
              ${isRefreshing ? 'animate-spin' : ''}`}
          >
            <FiRefreshCw className="w-4 h-4 text-white/70" />
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
            <GlassCard className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs text-white/40 mb-2">Date Range</label>
                  <select className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 
                    text-white/70 focus:border-indigo-500/30 focus:outline-none">
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                    <option>Custom range</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-white/40 mb-2">Category</label>
                  <select className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 
                    text-white/70 focus:border-indigo-500/30 focus:outline-none">
                    <option>All Categories</option>
                    <option>Electronics</option>
                    <option>Fashion</option>
                    <option>Home</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-white/40 mb-2">Status</label>
                  <select className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 
                    text-white/70 focus:border-indigo-500/30 focus:outline-none">
                    <option>All</option>
                    <option>Active</option>
                    <option>Pending</option>
                    <option>Completed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-white/40 mb-2">Sort By</label>
                  <select className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 
                    text-white/70 focus:border-indigo-500/30 focus:outline-none">
                    <option>Revenue (High to Low)</option>
                    <option>Revenue (Low to High)</option>
                    <option>Date (Newest)</option>
                    <option>Date (Oldest)</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button className="px-4 py-2 text-white/60 hover:text-white/80">Reset</button>
                <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 
                  rounded-lg text-white font-medium">Apply Filters</button>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* KPI Grid with Touch Interactions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
        {Object.entries(stats).map(([key, stat], index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onTap={() => handleStatClick(key, stat)}
            onDoubleClick={() => handleDoubleTap(key)}
            onContextMenu={(e) => {
              e.preventDefault()
              handleLongPress(key)
            }}
          >
            <StatCard
              title={key.charAt(0).toUpperCase() + key.slice(1)}
              value={key === 'revenue' || key === 'aov' ? `$${stat.value.toLocaleString()}` : stat.value.toString()}
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
              sparkline={stat.historical}
            />
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white/90 mb-1">Revenue Overview</h3>
              <p className="text-sm text-white/40">Monthly revenue performance</p>
            </div>
            <div className="flex items-center gap-2">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                <span className="text-xs text-white/60">2024</span>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                <span className="text-xs text-white/60">2023</span>
              </motion.div>
            </div>
          </div>
          <div className="h-80">
            <Chart type="line" interactive={true} onPointClick={(point) => {
              toast.success(`Revenue: $${point.value}`, { icon: '📈' })
              if (navigator.vibrate) navigator.vibrate(10)
            }} />
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white/90 mb-1">Sales by Category</h3>
              <p className="text-sm text-white/40">Product category distribution</p>
            </div>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              <FiMoreVertical className="w-5 h-5 text-white/40" />
            </motion.button>
          </div>
          <div className="h-80">
            <Chart type="pie" interactive={true} onSegmentClick={(segment) => {
              toast.success(`${segment.name}: ${segment.value}%`, { icon: '🥧' })
              if (navigator.vibrate) navigator.vibrate(10)
            }} />
          </div>
        </GlassCard>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity with Swipe Actions */}
        <GlassCard className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white/90 mb-1">Recent Activity</h3>
              <p className="text-sm text-white/40">Latest actions across your business</p>
            </div>
            <motion.button 
              whileHover={{ x: 5 }}
              className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1"
            >
              View All
              <FiArrowUpRight className="w-4 h-4" />
            </motion.button>
          </div>

          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <SwipeableActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
        </GlassCard>

        {/* Quick Stats & Actions */}
        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold text-white/90 mb-4">Quick Stats</h3>
          
          <div className="space-y-4">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="p-4 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 
                border border-indigo-500/20 cursor-pointer"
              onClick={() => toast.success('Viewing detailed revenue', { icon: '💰' })}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white/60">Today's Revenue</span>
                <motion.span 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-xs px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400"
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
              <QuickStatCard value="156" label="Products" sub="+8 new" trend="up" />
              <QuickStatCard value="12" label="Pending" sub="-3 today" trend="down" />
              <QuickStatCard value="89%" label="Satisfaction" sub="+2.3%" trend="up" />
              <QuickStatCard value="5" label="Low Stock" sub="Restock soon" trend="warning" />
            </div>

            <div className="pt-4 border-t border-white/[0.03]">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-3">
                Quick Actions
              </h4>
              <div className="grid grid-cols-4 gap-2">
                <QuickActionButton icon={FiShoppingBag} label="New Order" />
                <QuickActionButton icon={FiUsers} label="Add User" />
                <QuickActionButton icon={FiPackage} label="Add Product" />
                <QuickActionButton icon={FiDownload} label="Export" />
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

      {/* Floating gesture indicator */}
      <FloatingGestureIndicator />
    </motion.div>
  )
}

// ============ SWIPEABLE ACTIVITY ITEM ============
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
    setOffset(Math.max(-100, Math.min(100, diff)))
  }

  const handleTouchEnd = () => {
    if (Math.abs(offset) > 50) {
      if (offset > 0) {
        toast.success(`Marked as read`, { icon: '✅' })
      } else {
        toast.success(`Archived`, { icon: '📦' })
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
      <div className="absolute inset-0 flex">
        <div className="flex-1 bg-emerald-500/20 rounded-l-xl flex items-center justify-start pl-4">
          <FiCheckCircle className="w-5 h-5 text-emerald-400" />
          <span className="ml-2 text-emerald-400 text-sm">Archive</span>
        </div>
        <div className="flex-1 bg-rose-500/20 rounded-r-xl flex items-center justify-end pr-4">
          <FiBookmark className="w-5 h-5 text-rose-400" />
          <span className="mr-2 text-rose-400 text-sm">Save</span>
        </div>
      </div>

      {/* Foreground content */}
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="relative p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.03] 
          transition-all cursor-pointer"
        onClick={() => {
          toast.success(`Viewing ${activity.user}'s activity`)
          if (navigator.vibrate) navigator.vibrate(10)
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl
              ${activity.type === 'order' ? 'bg-indigo-500/10' :
                activity.type === 'user' ? 'bg-emerald-500/10' :
                activity.type === 'review' ? 'bg-amber-500/10' :
                'bg-rose-500/10'}`}>
              {activity.avatar}
            </div>
            <div>
              <div className="text-sm font-medium text-white/90 mb-1">
                <span className="font-semibold">{activity.user}</span> {activity.action}
              </div>
              <div className="flex items-center gap-3 text-xs text-white/40">
                <span className="flex items-center gap-1">
                  <FiClock className="w-3 h-3" />
                  {activity.time}
                </span>
                {activity.amount && (
                  <span className="px-2 py-0.5 rounded-full bg-white/5 text-white/60">
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
          <FiEye className="w-5 h-5 text-white/20 hover:text-white/40 transition-colors" />
        </div>
      </motion.div>
    </motion.div>
  )
}

// ============ QUICK STAT CARD ============
const QuickStatCard = ({ value, label, sub, trend }) => (
  <motion.div 
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="p-3 rounded-xl bg-white/[0.02] cursor-pointer"
    onClick={() => toast.success(`Viewing ${label} details`, { icon: '📊' })}
  >
    <div className="text-2xl font-bold text-white/90 mb-1">{value}</div>
    <div className="text-xs text-white/40">{label}</div>
    <div className={`text-[10px] mt-1 flex items-center gap-1
      ${trend === 'up' ? 'text-emerald-400' : 
        trend === 'down' ? 'text-rose-400' : 
        'text-amber-400'}`}>
      {trend === 'up' && <FiTrendingUp className="w-3 h-3" />}
      {trend === 'down' && <FiTrendingDown className="w-3 h-3" />}
      {sub}
    </div>
  </motion.div>
)

// ============ QUICK ACTION BUTTON ============
const QuickActionButton = ({ icon: Icon, label }) => (
  <motion.button
    whileHover={{ scale: 1.1, y: -5 }}
    whileTap={{ scale: 0.95 }}
    className="p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.03] 
      transition-all group flex flex-col items-center gap-2"
    onClick={() => {
      toast.success(`${label} action triggered`, { icon: '⚡' })
      if (navigator.vibrate) navigator.vibrate(15)
    }}
  >
    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 
      flex items-center justify-center group-hover:scale-110 transition-transform">
      <Icon className="w-4 h-4 text-indigo-400" />
    </div>
    <span className="text-[10px] text-white/60 group-hover:text-white/80 transition-colors">
      {label}
    </span>
  </motion.button>
)

// ============ LOCATION CHART ============
const LocationChart = () => (
  <GlassCard className="p-6">
    <div className="flex items-center justify-between mb-6">
      <div>
        <h3 className="text-lg font-semibold text-white/90 mb-1">Top Locations</h3>
        <p className="text-sm text-white/40">Revenue by region</p>
      </div>
    </div>
    <div className="space-y-4">
      {[
        { country: 'United States', flag: '🇺🇸', revenue: 124500, percentage: 45, growth: 12.5 },
        { country: 'United Kingdom', flag: '🇬🇧', revenue: 68200, percentage: 24, growth: 8.3 },
        { country: 'Canada', flag: '🇨🇦', revenue: 45600, percentage: 16, growth: 15.7 },
        { country: 'Australia', flag: '🇦🇺', revenue: 28900, percentage: 10, growth: -2.1 },
        { country: 'Germany', flag: '🇩🇪', revenue: 14200, percentage: 5, growth: 5.8 },
      ].map((location, i) => (
        <motion.div 
          key={location.country}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="flex items-center gap-4 cursor-pointer"
          whileHover={{ scale: 1.02, x: 10 }}
          onClick={() => toast.success(`Viewing ${location.country} details`, { icon: location.flag })}
        >
          <span className="text-2xl">{location.flag}</span>
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
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
                className={`text-xs flex items-center gap-1
                  ${location.growth > 0 ? 'text-emerald-400' : 'text-rose-400'}`}
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

// ============ DEVICE CHART ============
const DeviceChart = () => (
  <GlassCard className="p-6">
    <div className="flex items-center justify-between mb-6">
      <div>
        <h3 className="text-lg font-semibold text-white/90 mb-1">Device Breakdown</h3>
        <p className="text-sm text-white/40">Traffic by device type</p>
      </div>
    </div>
    <div className="space-y-6">
      {[
        { device: 'Mobile', icon: FiSmartphone, percentage: 55, revenue: 156475, growth: 23.4 },
        { device: 'Desktop', icon: FiMonitor, percentage: 35, revenue: 99575, growth: 5.2 },
        { device: 'Tablet', icon: FiMonitor, percentage: 10, revenue: 28450, growth: -1.8 },
      ].map((item, i) => {
        const Icon = item.icon
        return (
          <motion.div 
            key={item.device}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-4 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            onClick={() => toast.success(`${item.device} traffic: ${item.percentage}%`, { icon: '📱' })}
          >
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
              <Icon className="w-5 h-5 text-white/60" />
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
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                  />
                </div>
                <span className="text-xs text-white/40">{item.percentage}%</span>
                <motion.span 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
                  className={`text-xs flex items-center gap-1
                    ${item.growth > 0 ? 'text-emerald-400' : 'text-rose-400'}`}
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

// ============ FLOATING GESTURE INDICATOR ============
const FloatingGestureIndicator = () => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 10000)
    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 
        glass-card px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl 
        border border-white/20 flex items-center gap-4"
    >
      <span className="text-white/60 text-xs flex items-center gap-1">
        <span className="text-lg">👆</span> Tap
      </span>
      <span className="text-white/20">|</span>
      <span className="text-white/60 text-xs flex items-center gap-1">
        <span className="text-lg">👆👆</span> Double
      </span>
      <span className="text-white/20">|</span>
      <span className="text-white/60 text-xs flex items-center gap-1">
        <span className="text-lg">🤏</span> Long press
      </span>
      <span className="text-white/20">|</span>
      <span className="text-white/60 text-xs flex items-center gap-1">
        <span className="text-lg">👉</span> Swipe
      </span>
    </motion.div>
  )
}

export default DashboardModule
