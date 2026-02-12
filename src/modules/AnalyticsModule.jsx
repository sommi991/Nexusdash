import React, { useState } from 'react'
import {
  FiBarChart2, FiPieChart, FiActivity, FiTrendingUp, FiTrendingDown,
  FiUsers, FiShoppingBag, FiDollarSign, FiCalendar, FiDownload,
  FiFilter, FiRefreshCw, FiMoreVertical, FiEye, FiTarget,
  FiGlobe, FiSmartphone, FiClock, FiAward, FiZap
} from 'react-icons/fi'
import { GlassCard } from '../components/core/GlassCard'
import { Chart } from '../components/core/Chart'

const AnalyticsModule = () => {
  const [dateRange, setDateRange] = useState('month')
  const [selectedMetric, setSelectedMetric] = useState('revenue')

  const metrics = [
    { id: 'revenue', label: 'Revenue', value: '$425.8K', change: 15.2, icon: FiDollarSign },
    { id: 'orders', label: 'Orders', value: '3,650', change: 8.7, icon: FiShoppingBag },
    { id: 'customers', label: 'Customers', value: '2,890', change: 23.4, icon: FiUsers },
    { id: 'conversion', label: 'Conversion', value: '3.4%', change: 0.8, icon: FiTarget },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r 
            from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Analytics
          </h1>
          <p className="text-white/40 text-sm flex items-center gap-2">
            <FiBarChart2 className="w-4 h-4" />
            Comprehensive insights into your business performance
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
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

          <button className="h-11 w-11 rounded-xl bg-white/[0.02] border border-white/[0.03] 
            hover:bg-white/[0.03] transition-colors flex items-center justify-center">
            <FiRefreshCw className="w-4 h-4 text-white/70" />
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {metrics.map((metric) => (
          <GlassCard key={metric.id} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br 
                ${metric.id === 'revenue' ? 'from-indigo-500 to-purple-500' :
                  metric.id === 'orders' ? 'from-purple-500 to-pink-500' :
                  metric.id === 'customers' ? 'from-pink-500 to-rose-500' :
                  'from-amber-500 to-orange-500'} 
                flex items-center justify-center`}>
                <metric.icon className="w-6 h-6 text-white" />
              </div>
              <span className={`text-sm font-semibold px-2 py-1 rounded-full flex items-center gap-1
                ${metric.change > 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                {metric.change > 0 ? <FiTrendingUp className="w-3 h-3" /> : <FiTrendingDown className="w-3 h-3" />}
                {metric.change}%
              </span>
            </div>
            <div className="text-2xl font-bold text-white/90 mb-1">{metric.value}</div>
            <div className="text-sm text-white/40">{metric.label}</div>
          </GlassCard>
        ))}
      </div>

      {/* Main Chart */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white/90 mb-1">Performance Overview</h3>
            <p className="text-sm text-white/40">Compare metrics over time</p>
          </div>
          
          <div className="flex items-center gap-2">
            {['revenue', 'orders', 'customers'].map((metric) => (
              <button
                key={metric}
                onClick={() => setSelectedMetric(metric)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
                  ${selectedMetric === metric
                    ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-400 border border-indigo-500/30'
                    : 'text-white/40 hover:text-white/60 hover:bg-white/5'
                  }`}
              >
                {metric.charAt(0).toUpperCase() + metric.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="h-96">
          <Chart type="line" />
        </div>
      </GlassCard>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Acquisition */}
        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold text-white/90 mb-4">Customer Acquisition</h3>
          <div className="space-y-4">
            {[
              { channel: 'Organic Search', value: 12450, percentage: 45, color: 'from-indigo-500 to-purple-500' },
              { channel: 'Direct', value: 6780, percentage: 25, color: 'from-purple-500 to-pink-500' },
              { channel: 'Social Media', value: 5340, percentage: 18, color: 'from-pink-500 to-rose-500' },
              { channel: 'Email', value: 2890, percentage: 8, color: 'from-amber-500 to-orange-500' },
              { channel: 'Referral', value: 1560, percentage: 4, color: 'from-emerald-500 to-teal-500' },
            ].map((channel) => (
              <div key={channel.channel}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-white/90">{channel.channel}</span>
                  <span className="text-sm font-semibold text-white/90">
                    {channel.value.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full bg-gradient-to-r ${channel.color}`}
                      style={{ width: `${channel.percentage}%` }}
                    />
                  </div>
                  <span className="text-xs text-white/40">{channel.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Sales Forecast */}
        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold text-white/90 mb-4">Sales Forecast</h3>
          <div className="space-y-6">
            {[
              { month: 'March', forecast: 185000, actual: 178000, variance: -3.8 },
              { month: 'April', forecast: 195000, actual: 201000, variance: 3.1 },
              { month: 'May', forecast: 210000, actual: 215000, variance: 2.4 },
              { month: 'June', forecast: 225000, actual: null, variance: null },
              { month: 'July', forecast: 240000, actual: null, variance: null },
            ].map((month) => (
              <div key={month.month} className="flex items-center gap-4">
                <div className="w-16 text-sm text-white/60">{month.month}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-white/40">Forecast</span>
                    <span className="text-xs font-medium text-white/90">
                      ${month.forecast.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                      style={{ width: month.actual ? `${(month.actual / month.forecast) * 100}%` : '0%' }}
                    />
                  </div>
                  {month.actual && (
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-white/40">Actual</span>
                      <span className={`text-xs flex items-center gap-1
                        ${month.variance > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {month.variance > 0 ? <FiTrendingUp className="w-3 h-3" /> : <FiTrendingDown className="w-3 h-3" />}
                        {Math.abs(month.variance)}%
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Cohort Analysis */}
        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold text-white/90 mb-4">Retention Cohort</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.03]">
                  <th className="py-2 text-left text-xs font-medium text-white/40">Cohort</th>
                  <th className="py-2 text-center text-xs font-medium text-white/40">M0</th>
                  <th className="py-2 text-center text-xs font-medium text-white/40">M1</th>
                  <th className="py-2 text-center text-xs font-medium text-white/40">M2</th>
                  <th className="py-2 text-center text-xs font-medium text-white/40">M3</th>
                  <th className="py-2 text-center text-xs font-medium text-white/40">M4</th>
                  <th className="py-2 text-center text-xs font-medium text-white/40">M5</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { cohort: 'Jan 2024', users: 245, m0: '100%', m1: '68%', m2: '54%', m3: '48%', m4: '42%', m5: '38%' },
                  { cohort: 'Dec 2023', users: 312, m0: '100%', m1: '71%', m2: '58%', m3: '52%', m4: '45%', m5: '-' },
                  { cohort: 'Nov 2023', users: 289, m0: '100%', m1: '69%', m2: '55%', m3: '49%', m4: '-', m5: '-' },
                  { cohort: 'Oct 2023', users: 278, m0: '100%', m1: '72%', m2: '59%', m3: '51%', m4: '-', m5: '-' },
                ].map((row) => (
                  <tr key={row.cohort} className="border-b border-white/[0.03]">
                    <td className="py-3 text-white/90">{row.cohort}</td>
                    <td className="py-3 text-center text-white/90">{row.m0}</td>
                    <td className="py-3 text-center text-white/90">{row.m1}</td>
                    <td className="py-3 text-center text-white/90">{row.m2}</td>
                    <td className="py-3 text-center text-white/90">{row.m3}</td>
                    <td className="py-3 text-center text-white/90">{row.m4}</td>
                    <td className="py-3 text-center text-white/90">{row.m5}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        {/* Real-time Analytics */}
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-white/90 mb-1">Real-time Analytics</h3>
              <p className="text-sm text-white/40">Live activity right now</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-xs text-white/40">Live</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-xl bg-white/[0.02]">
              <div className="text-2xl font-bold text-white/90 mb-1">156</div>
              <div className="text-xs text-white/40">Active Users</div>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02]">
              <div className="text-2xl font-bold text-white/90 mb-1">12</div>
              <div className="text-xs text-white/40">Orders</div>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02]">
              <div className="text-2xl font-bold text-white/90 mb-1">$3.2k</div>
              <div className="text-xs text-white/40">Revenue</div>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02]">
              <div className="text-2xl font-bold text-white/90 mb-1">3.1%</div>
              <div className="text-xs text-white/40">Conversion</div>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { user: 'John D.', action: 'purchased Premium Headphones', amount: 299.99, time: '1 min ago' },
              { user: 'Sarah M.', action: 'added to cart', item: 'Yoga Mat', time: '2 min ago' },
              { user: 'Michael R.', action: 'viewed product', item: 'Smart Watch', time: '3 min ago' },
            ].map((activity, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02]">
                <div>
                  <span className="text-xs font-medium text-white/90">{activity.user}</span>
                  <span className="text-xs text-white/40 ml-2">{activity.action}</span>
                  {activity.amount && (
                    <span className="text-xs text-indigo-400 ml-2">${activity.amount}</span>
                  )}
                </div>
                <span className="text-[10px] text-white/40">{activity.time}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  )
}

export default AnalyticsModule
