import React, { useState } from 'react'
import {
  FiBriefcase, FiClock, FiCheckCircle, FiAlertCircle,
  FiTrendingUp, FiTrendingDown, FiUsers, FiPackage,
  FiTruck, FiBox, FiCalendar, FiBarChart2, FiDownload,
  FiFilter, FiMoreVertical, FiEye, FiZap, FiTarget,
  FiActivity, FiPieChart, FiAward, FiStar, FiGlobe
} from 'react-icons/fi'
import { GlassCard } from '../components/core/GlassCard'

const OperationsModule = () => {
  const [selectedView, setSelectedView] = useState('overview')

  const metrics = {
    efficiency: { value: 94, change: 2.5, trend: 'up' },
    utilization: { value: 78, change: 5.2, trend: 'up' },
    throughput: { value: 1248, change: 8.7, trend: 'up' },
    quality: { value: 99.2, change: 0.3, trend: 'up' },
    downtime: { value: 2.4, change: -12.5, trend: 'down' },
    backlog: { value: 45, change: -8.3, trend: 'down' }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r 
            from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Operations
          </h1>
          <p className="text-white/40 text-sm flex items-center gap-2">
            <FiBriefcase className="w-4 h-4" />
            Monitor and optimize your business operations
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="h-11 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 
            text-white text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
            <FiZap className="w-4 h-4" />
            Optimize Workflow
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 
              flex items-center justify-center">
              <FiTarget className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-semibold px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400">
              +{metrics.efficiency.change}%
            </span>
          </div>
          <div className="text-2xl font-bold text-white/90 mb-1">{metrics.efficiency.value}%</div>
          <div className="text-sm text-white/40">Efficiency Score</div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 
              flex items-center justify-center">
              <FiActivity className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-semibold px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400">
              +{metrics.utilization.change}%
            </span>
          </div>
          <div className="text-2xl font-bold text-white/90 mb-1">{metrics.utilization.value}%</div>
          <div className="text-sm text-white/40">Resource Utilization</div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 
              flex items-center justify-center">
              <FiPackage className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-semibold px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400">
              +{metrics.throughput.change}%
            </span>
          </div>
          <div className="text-2xl font-bold text-white/90 mb-1">{metrics.throughput.value}</div>
          <div className="text-sm text-white/40">Daily Throughput</div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 
              flex items-center justify-center">
              <FiAward className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-semibold px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400">
              +{metrics.quality.change}%
            </span>
          </div>
          <div className="text-2xl font-bold text-white/90 mb-1">{metrics.quality.value}%</div>
          <div className="text-sm text-white/40">Quality Score</div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-red-500 
              flex items-center justify-center">
              <FiClock className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-semibold px-2 py-1 rounded-full bg-rose-500/10 text-rose-400">
              {metrics.downtime.change}%
            </span>
          </div>
          <div className="text-2xl font-bold text-white/90 mb-1">{metrics.downtime.value}%</div>
          <div className="text-sm text-white/40">Downtime</div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-500 to-gray-500 
              flex items-center justify-center">
              <FiBox className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-semibold px-2 py-1 rounded-full bg-rose-500/10 text-rose-400">
              {metrics.backlog.change}%
            </span>
          </div>
          <div className="text-2xl font-bold text-white/90 mb-1">{metrics.backlog.value}</div>
          <div className="text-sm text-white/40">Backlog Items</div>
        </GlassCard>
      </div>

      {/* Production Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white/90 mb-1">Production Timeline</h3>
              <p className="text-sm text-white/40">Real-time workflow status</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 rounded-lg bg-white/5 text-sm text-white/60 hover:bg-white/10">
                Today
              </button>
              <button className="px-3 py-1.5 rounded-lg text-sm text-white/40 hover:bg-white/5">
                Week
              </button>
              <button className="px-3 py-1.5 rounded-lg text-sm text-white/40 hover:bg-white/5">
                Month
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { stage: 'Order Processing', progress: 100, status: 'completed', time: '08:00 - 10:30', items: 156 },
              { stage: 'Quality Control', progress: 75, status: 'in-progress', time: '10:30 - 12:00', items: 89 },
              { stage: 'Packaging', progress: 45, status: 'in-progress', time: '11:00 - 14:00', items: 67 },
              { stage: 'Shipping', progress: 30, status: 'pending', time: '13:00 - 16:00', items: 45 },
              { stage: 'Delivery', progress: 0, status: 'pending', time: '15:00 - 18:00', items: 23 },
            ].map((stage) => (
              <div key={stage.stage} className="relative">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full 
                      ${stage.status === 'completed' ? 'bg-emerald-500' :
                        stage.status === 'in-progress' ? 'bg-indigo-500 animate-pulse' :
                        'bg-white/20'}`} />
                    <span className="text-sm font-medium text-white/90">{stage.stage}</span>
                    <span className="text-xs text-white/40">{stage.time}</span>
                  </div>
                  <span className="text-sm font-semibold text-white/90">{stage.items} items</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500
                      ${stage.status === 'completed' ? 'bg-gradient-to-r from-emerald-500 to-teal-500' :
                        stage.status === 'in-progress' ? 'bg-gradient-to-r from-indigo-500 to-purple-500' :
                        'bg-white/10'}`}
                    style={{ width: `${stage.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Resource Allocation */}
        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold text-white/90 mb-4">Resource Allocation</h3>
          <div className="space-y-6">
            {[
              { resource: 'Production Team', allocated: 85, total: 100, color: 'from-indigo-500 to-purple-500' },
              { resource: 'Quality Control', allocated: 60, total: 80, color: 'from-purple-500 to-pink-500' },
              { resource: 'Packaging', allocated: 45, total: 60, color: 'from-pink-500 to-rose-500' },
              { resource: 'Shipping', allocated: 30, total: 50, color: 'from-amber-500 to-orange-500' },
              { resource: 'Equipment', allocated: 75, total: 100, color: 'from-emerald-500 to-teal-500' },
            ].map((resource) => (
              <div key={resource.resource}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-white/90">{resource.resource}</span>
                  <span className="text-xs text-white/40">
                    {resource.allocated}/{resource.total}
                  </span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full bg-gradient-to-r ${resource.color}`}
                    style={{ width: `${(resource.allocated / resource.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Work Orders */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white/90 mb-1">Active Work Orders</h3>
            <p className="text-sm text-white/40">Current production tasks</p>
          </div>
          <button className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1">
            View All
            <FiEye className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { id: 'WO-2024-001', product: 'Premium Headphones', quantity: 50, deadline: '2024-03-20', priority: 'high', status: 'in-progress' },
            { id: 'WO-2024-002', product: 'Smart Watch', quantity: 35, deadline: '2024-03-21', priority: 'medium', status: 'pending' },
            { id: 'WO-2024-003', product: 'Yoga Mat', quantity: 100, deadline: '2024-03-19', priority: 'high', status: 'quality-check' },
            { id: 'WO-2024-004', product: 'Coffee Beans', quantity: 200, deadline: '2024-03-22', priority: 'low', status: 'pending' },
            { id: 'WO-2024-005', product: 'Bluetooth Speaker', quantity: 75, deadline: '2024-03-20', priority: 'medium', status: 'packaging' },
            { id: 'WO-2024-006', product: 'Phone Case', quantity: 150, deadline: '2024-03-23', priority: 'low', status: 'pending' },
          ].map((order) => (
            <div key={order.id} className="p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.03] transition-all group">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-sm font-medium text-white/90 mb-1">{order.product}</div>
                  <div className="text-xs text-white/40">{order.id}</div>
                </div>
                <span className={`px-2 py-1 rounded-full text-[10px] font-medium
                  ${order.priority === 'high' ? 'bg-rose-500/10 text-rose-400' :
                    order.priority === 'medium' ? 'bg-amber-500/10 text-amber-400' :
                    'bg-emerald-500/10 text-emerald-400'}`}>
                  {order.priority}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="text-white/40">Quantity: {order.quantity}</span>
                <span className="text-white/40">Due: {order.deadline}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-xs px-2 py-1 rounded-full
                  ${order.status === 'in-progress' ? 'bg-indigo-500/10 text-indigo-400' :
                    order.status === 'quality-check' ? 'bg-purple-500/10 text-purple-400' :
                    order.status === 'packaging' ? 'bg-emerald-500/10 text-emerald-400' :
                    'bg-white/5 text-white/40'}`}>
                  {order.status.split('-').join(' ')}
                </span>
                <button className="p-1.5 rounded-lg hover:bg-white/5 transition-colors">
                  <FiMoreVertical className="w-4 h-4 text-white/40" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Quality Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold text-white/90 mb-4">Defect Analysis</h3>
          <div className="space-y-4">
            {[
              { category: 'Manufacturing', defects: 24, percentage: 45, trend: 'down' },
              { category: 'Packaging', defects: 12, percentage: 23, trend: 'down' },
              { category: 'Material', defects: 8, percentage: 15, trend: 'up' },
              { category: 'Design', defects: 6, percentage: 12, trend: 'flat' },
              { category: 'Other', defects: 3, percentage: 5, trend: 'down' },
            ].map((item) => (
              <div key={item.category}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-white/90">{item.category}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white/90">{item.defects}</span>
                    <span className="text-xs text-white/40">{item.percentage}%</span>
                    <span className={`text-xs flex items-center gap-1
                      ${item.trend === 'up' ? 'text-rose-400' : 
                        item.trend === 'down' ? 'text-emerald-400' : 'text-white/40'}`}>
                      {item.trend === 'up' && <FiTrendingUp className="w-3 h-3" />}
                      {item.trend === 'down' && <FiTrendingDown className="w-3 h-3" />}
                    </span>
                  </div>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold text-white/90 mb-4">Performance Indicators</h3>
          <div className="space-y-6">
            {[
              { metric: 'Overall Equipment Effectiveness', value: 87, target: 92, unit: '%' },
              { metric: 'First Pass Yield', value: 94.5, target: 96, unit: '%' },
              { metric: 'Mean Time Between Failures', value: 324, target: 350, unit: 'hrs' },
              { metric: 'On-Time Delivery', value: 95.2, target: 98, unit: '%' },
            ].map((item) => (
              <div key={item.metric}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-white/90">{item.metric}</span>
                  <span className="text-sm font-semibold text-white/90">
                    {item.value}{item.unit} / {item.target}{item.unit}
                  </span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                    style={{ width: `${(item.value / item.target) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  )
}

export default OperationsModule
