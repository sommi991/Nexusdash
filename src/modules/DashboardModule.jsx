import React, { useState } from 'react'
import { 
  FiTrendingUp, FiTrendingDown, FiDollarSign, FiShoppingBag, 
  FiUsers, FiPackage, FiClock, FiCalendar, FiActivity,
  FiArrowUpRight, FiArrowDownRight, FiMoreVertical,
  FiDownload, FiFilter, FiRefreshCw, FiEye, FiStar,
  FiMapPin, FiGlobe, FiSmartphone, FiMonitor, FiCreditCard,
  FiCheckCircle, FiAlertCircle, FiZap, FiTarget, FiAward
} from 'react-icons/fi'
import { useNexusStore } from '../store/nexusStore'
import { GlassCard } from '../components/core/GlassCard'
import { StatCard } from '../components/core/StatCard'
import { Chart } from '../components/core/Chart'

const DashboardModule = () => {
  const { data, filters, setFilters } = useNexusStore()
  const [selectedPeriod, setSelectedPeriod] = useState('week')

  // Mock analytics data
  const stats = {
    revenue: { value: 284500, change: 15.2, trend: 'up' },
    orders: { value: 1248, change: 8.7, trend: 'up' },
    customers: { value: 892, change: 23.4, trend: 'up' },
    conversion: { value: 3.2, change: 0.8, trend: 'up' },
    aov: { value: 228, change: 4.2, trend: 'up' },
    retention: { value: 76, change: 5.3, trend: 'up' }
  }

  const recentActivity = [
    { id: 1, user: 'John Smith', action: 'placed order #ORD-7842', amount: 1248, time: '2 min ago', type: 'order' },
    { id: 2, user: 'Sarah Johnson', action: 'registered new account', time: '15 min ago', type: 'user' },
    { id: 3, user: 'Michael Brown', action: 'submitted review', rating: 5, time: '1 hour ago', type: 'review' },
    { id: 4, user: 'Emma Wilson', action: 'requested refund', amount: 299, time: '3 hours ago', type: 'refund' },
    { id: 5, user: 'David Lee', action: 'completed onboarding', time: '5 hours ago', type: 'onboarding' },
  ]

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r 
            from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Welcome back, Alex
          </h1>
          <p className="text-white/40 text-sm flex items-center gap-2">
            <FiActivity className="w-4 h-4" />
            Here's what's happening with your business today
            <span className="px-2 py-0.5 rounded-full bg-white/5 text-white/60 text-[10px]">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
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
          </select>
          
          <button className="h-11 px-4 rounded-xl bg-white/[0.02] border border-white/[0.03] 
            hover:bg-white/[0.03] transition-colors flex items-center gap-2 text-sm text-white/70">
            <FiDownload className="w-4 h-4" />
            Export
          </button>
          
          <button className="h-11 px-4 rounded-xl bg-white/[0.02] border border-white/[0.03] 
            hover:bg-white/[0.03] transition-colors flex items-center gap-2 text-sm text-white/70">
            <FiFilter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
        <StatCard
          title="Total Revenue"
          value={`$${stats.revenue.value.toLocaleString()}`}
          change={stats.revenue.change}
          trend={stats.revenue.trend}
          icon={FiDollarSign}
          gradient="from-indigo-500 to-purple-500"
        />
        <StatCard
          title="Total Orders"
          value={stats.orders.value}
          change={stats.orders.change}
          trend={stats.orders.trend}
          icon={FiShoppingBag}
          gradient="from-purple-500 to-pink-500"
        />
        <StatCard
          title="Customers"
          value={stats.customers.value}
          change={stats.customers.change}
          trend={stats.customers.trend}
          icon={FiUsers}
          gradient="from-pink-500 to-rose-500"
        />
        <StatCard
          title="Conversion"
          value={`${stats.conversion.value}%`}
          change={stats.conversion.change}
          trend={stats.conversion.trend}
          icon={FiTarget}
          gradient="from-amber-500 to-orange-500"
        />
        <StatCard
          title="Avg Order"
          value={`$${stats.aov.value}`}
          change={stats.aov.change}
          trend={stats.aov.trend}
          icon={FiCreditCard}
          gradient="from-emerald-500 to-teal-500"
        />
        <StatCard
          title="Retention"
          value={`${stats.retention.value}%`}
          change={stats.retention.change}
          trend={stats.retention.trend}
          icon={FiAward}
          gradient="from-blue-500 to-indigo-500"
        />
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
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                <span className="text-xs text-white/60">2024</span>
              </div>
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                <span className="text-xs text-white/60">2023</span>
              </div>
            </div>
          </div>
          <div className="h-80">
            <Chart type="line" />
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white/90 mb-1">Sales by Category</h3>
              <p className="text-sm text-white/40">Product category distribution</p>
            </div>
            <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
              <FiMoreVertical className="w-5 h-5 text-white/40" />
            </button>
          </div>
          <div className="h-80">
            <Chart type="pie" />
          </div>
        </GlassCard>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <GlassCard className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white/90 mb-1">Recent Activity</h3>
              <p className="text-sm text-white/40">Latest actions across your business</p>
            </div>
            <button className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1">
              View All
              <FiArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} 
                className="flex items-center justify-between p-4 rounded-xl 
                  bg-white/[0.02] hover:bg-white/[0.03] transition-all group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center
                    ${activity.type === 'order' ? 'bg-indigo-500/10 text-indigo-400' :
                      activity.type === 'user' ? 'bg-emerald-500/10 text-emerald-400' :
                      activity.type === 'review' ? 'bg-amber-500/10 text-amber-400' :
                      activity.type === 'refund' ? 'bg-rose-500/10 text-rose-400' :
                      'bg-purple-500/10 text-purple-400'}`}>
                    {activity.type === 'order' && <FiShoppingBag className="w-5 h-5" />}
                    {activity.type === 'user' && <FiUsers className="w-5 h-5" />}
                    {activity.type === 'review' && <FiStar className="w-5 h-5" />}
                    {activity.type === 'refund' && <FiCreditCard className="w-5 h-5" />}
                    {activity.type === 'onboarding' && <FiCheckCircle className="w-5 h-5" />}
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
                <FiEye className="w-5 h-5 text-white/20 group-hover:text-white/40 transition-colors" />
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Quick Stats & Actions */}
        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold text-white/90 mb-4">Quick Stats</h3>
          
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white/60">Today's Revenue</span>
                <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400">
                  +12.5%
                </span>
              </div>
              <div className="text-2xl font-bold text-white/90">$12,845</div>
              <div className="text-xs text-white/40 mt-1">vs $11,423 yesterday</div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-white/[0.02]">
                <div className="text-2xl font-bold text-white/90 mb-1">156</div>
                <div className="text-xs text-white/40">Products</div>
                <div className="text-[10px] text-emerald-400 mt-1">+8 new</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02]">
                <div className="text-2xl font-bold text-white/90 mb-1">12</div>
                <div className="text-xs text-white/40">Pending</div>
                <div className="text-[10px] text-amber-400 mt-1">-3 today</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02]">
                <div className="text-2xl font-bold text-white/90 mb-1">89%</div>
                <div className="text-xs text-white/40">Satisfaction</div>
                <div className="text-[10px] text-emerald-400 mt-1">+2.3%</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02]">
                <div className="text-2xl font-bold text-white/90 mb-1">5</div>
                <div className="text-xs text-white/40">Low Stock</div>
                <div className="text-[10px] text-rose-400 mt-1">Restock soon</div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.03]">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-3">
                Quick Actions
              </h4>
              <div className="grid grid-cols-2 gap-2">
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
            ].map((location) => (
              <div key={location.country} className="flex items-center gap-4">
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
                      <div 
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                        style={{ width: `${location.percentage}%` }}
                      />
                    </div>
                    <span className={`text-xs flex items-center gap-1
                      ${location.growth > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {location.growth > 0 ? <FiTrendingUp className="w-3 h-3" /> : <FiTrendingDown className="w-3 h-3" />}
                      {Math.abs(location.growth)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

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
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.device} className="flex items-center gap-4">
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
                        <div 
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                      <span className="text-xs text-white/40">{item.percentage}%</span>
                      <span className={`text-xs flex items-center gap-1
                        ${item.growth > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {item.growth > 0 ? <FiTrendingUp className="w-3 h-3" /> : <FiTrendingDown className="w-3 h-3" />}
                        {Math.abs(item.growth)}%
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </GlassCard>
      </div>
    </div>
  )
}

const QuickActionButton = ({ icon: Icon, label }) => (
  <button className="p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.03] 
    transition-all group flex flex-col items-center gap-2">
    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 
      flex items-center justify-center group-hover:scale-110 transition-transform">
      <Icon className="w-4 h-4 text-indigo-400" />
    </div>
    <span className="text-[10px] text-white/60 group-hover:text-white/80 transition-colors">
      {label}
    </span>
  </button>
)

export default DashboardModule
