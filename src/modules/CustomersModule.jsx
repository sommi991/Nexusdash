import React, { useState } from 'react'
import {
  FiUsers, FiUser, FiUserPlus, FiMail, FiPhone,
  FiMapPin, FiCalendar, FiStar, FiAward, FiClock,
  FiTrendingUp, FiTrendingDown, FiMoreVertical,
  FiMessageCircle, FiCheckCircle, FiAlertCircle,
  FiShoppingBag, FiDollarSign, FiDownload, FiFilter,
  FiSearch, FiPlus, FiEdit, FiTrash2, FiEye,
  FiZap, FiTarget, FiPieChart, FiActivity
} from 'react-icons/fi'
import { GlassCard } from '../components/core/GlassCard'

const CustomersModule = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSegment, setSelectedSegment] = useState('all')

  const customers = [
    {
      id: 'CUST-001',
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      avatar: null,
      status: 'active',
      segment: 'vip',
      orders: 45,
      spent: 12450.75,
      avgOrder: 276.68,
      lastOrder: '2024-03-15',
      joinDate: '2023-06-15',
      satisfaction: 4.9,
      lifetime: 12450.75,
      color: 'from-indigo-500 to-purple-500'
    },
    {
      id: 'CUST-002',
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      phone: '+1 (555) 234-5678',
      location: 'Los Angeles, CA',
      avatar: null,
      status: 'active',
      segment: 'regular',
      orders: 28,
      spent: 8345.50,
      avgOrder: 298.05,
      lastOrder: '2024-03-14',
      joinDate: '2023-08-22',
      satisfaction: 4.7,
      lifetime: 8345.50,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'CUST-003',
      name: 'Michael Brown',
      email: 'michael.b@example.com',
      phone: '+1 (555) 345-6789',
      location: 'New York, NY',
      avatar: null,
      status: 'active',
      segment: 'wholesale',
      orders: 89,
      spent: 45230.25,
      avgOrder: 508.21,
      lastOrder: '2024-03-13',
      joinDate: '2023-03-10',
      satisfaction: 4.8,
      lifetime: 45230.25,
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 'CUST-004',
      name: 'Emma Wilson',
      email: 'emma.w@example.com',
      phone: '+1 (555) 456-7890',
      location: 'Chicago, IL',
      avatar: null,
      status: 'inactive',
      segment: 'regular',
      orders: 12,
      spent: 2340.50,
      avgOrder: 195.04,
      lastOrder: '2024-02-28',
      joinDate: '2023-11-05',
      satisfaction: 4.2,
      lifetime: 2340.50,
      color: 'from-amber-500 to-orange-500'
    },
    {
      id: 'CUST-005',
      name: 'David Lee',
      email: 'david.l@example.com',
      phone: '+1 (555) 567-8901',
      location: 'Seattle, WA',
      avatar: null,
      status: 'active',
      segment: 'vip',
      orders: 34,
      spent: 18900.00,
      avgOrder: 555.88,
      lastOrder: '2024-03-12',
      joinDate: '2023-09-18',
      satisfaction: 5.0,
      lifetime: 18900.00,
      color: 'from-emerald-500 to-teal-500'
    },
    {
      id: 'CUST-006',
      name: 'Lisa Thompson',
      email: 'lisa.t@example.com',
      phone: '+1 (555) 678-9012',
      location: 'Boston, MA',
      avatar: null,
      status: 'active',
      segment: 'new',
      orders: 3,
      spent: 567.80,
      avgOrder: 189.27,
      lastOrder: '2024-03-10',
      joinDate: '2024-03-01',
      satisfaction: 4.5,
      lifetime: 567.80,
      color: 'from-blue-500 to-indigo-500'
    }
  ]

  const segments = [
    { name: 'VIP', count: 45, value: 245000, color: 'from-indigo-500 to-purple-500' },
    { name: 'Wholesale', count: 28, value: 189000, color: 'from-purple-500 to-pink-500' },
    { name: 'Regular', count: 156, value: 156000, color: 'from-pink-500 to-rose-500' },
    { name: 'New', count: 67, value: 23400, color: 'from-emerald-500 to-teal-500' },
    { name: 'Inactive', count: 34, value: 12300, color: 'from-amber-500 to-orange-500' },
  ]

  const stats = {
    total: 330,
    active: 296,
    new: 67,
    returning: 229,
    avgLifetime: 8450,
    satisfaction: 4.7
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r 
            from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Customers
          </h1>
          <p className="text-white/40 text-sm flex items-center gap-2">
            <FiUsers className="w-4 h-4" />
            Manage your customer relationships and track engagement
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="h-11 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 
            text-white text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
            <FiUserPlus className="w-4 h-4" />
            Add Customer
          </button>
          <button className="h-11 px-4 rounded-xl bg-white/[0.02] border border-white/[0.03] 
            hover:bg-white/[0.03] transition-colors flex items-center gap-2 text-sm text-white/70">
            <FiDownload className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Customer Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
        <GlassCard className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 
              flex items-center justify-center">
              <FiUsers className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white/90 mb-1">{stats.total}</div>
              <div className="text-sm text-white/40">Total Customers</div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 
              flex items-center justify-center">
              <FiUser className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white/90 mb-1">{stats.active}</div>
              <div className="text-sm text-white/40">Active</div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 
              flex items-center justify-center">
              <FiZap className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white/90 mb-1">{stats.new}</div>
              <div className="text-sm text-white/40">New This Month</div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 
              flex items-center justify-center">
              <FiTrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white/90 mb-1">{stats.returning}</div>
              <div className="text-sm text-white/40">Returning</div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 
              flex items-center justify-center">
              <FiDollarSign className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white/90 mb-1">${(stats.avgLifetime / 1000).toFixed(1)}K</div>
              <div className="text-sm text-white/40">Avg LTV</div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 
              flex items-center justify-center">
              <FiStar className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white/90 mb-1">{stats.satisfaction}</div>
              <div className="text-sm text-white/40">Satisfaction</div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Segment Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {segments.map((segment) => (
          <GlassCard key={segment.name} className="p-4 hover:scale-[1.02] transition-all cursor-pointer">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${segment.color} 
                flex items-center justify-center opacity-20`} />
              <div>
                <div className="text-sm font-medium text-white/90">{segment.name}</div>
                <div className="text-xs text-white/40">{segment.count} customers</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/40">Value</span>
              <span className="text-sm font-semibold text-white/90">${(segment.value / 1000).toFixed(1)}K</span>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Search & Filters */}
      <GlassCard className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Search customers by name, email, location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-11 pr-4 rounded-xl bg-white/[0.02] border border-white/[0.03]
                focus:border-indigo-500/30 focus:outline-none text-sm text-white/90
                placeholder:text-white/40 transition-colors"
            />
          </div>
          
          <select 
            className="h-11 px-4 rounded-xl bg-white/[0.02] border border-white/[0.03]
              focus:border-indigo-500/30 focus:outline-none text-sm text-white/70"
            value={selectedSegment}
            onChange={(e) => setSelectedSegment(e.target.value)}
          >
            <option value="all">All Segments</option>
            {segments.map(s => <option key={s.name}>{s.name}</option>)}
          </select>
          
          <select className="h-11 px-4 rounded-xl bg-white/[0.02] border border-white/[0.03]
            focus:border-indigo-500/30 focus:outline-none text-sm text-white/70">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
          
          <button className="h-11 px-4 rounded-xl bg-white/[0.02] border border-white/[0.03] 
            hover:bg-white/[0.03] transition-colors flex items-center gap-2 text-sm text-white/70">
            <FiFilter className="w-4 h-4" />
            More Filters
          </button>
        </div>
      </GlassCard>

      {/* Customers Table */}
      <GlassCard className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.03]">
                <th className="py-4 text-left text-xs font-medium text-white/40 uppercase tracking-wider">Customer</th>
                <th className="py-4 text-left text-xs font-medium text-white/40 uppercase tracking-wider">Contact</th>
                <th className="py-4 text-left text-xs font-medium text-white/40 uppercase tracking-wider">Segment</th>
                <th className="py-4 text-left text-xs font-medium text-white/40 uppercase tracking-wider">Orders</th>
                <th className="py-4 text-left text-xs font-medium text-white/40 uppercase tracking-wider">Spent</th>
                <th className="py-4 text-left text-xs font-medium text-white/40 uppercase tracking-wider">Last Order</th>
                <th className="py-4 text-left text-xs font-medium text-white/40 uppercase tracking-wider">Status</th>
                <th className="py-4 text-left text-xs font-medium text-white/40 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${customer.color} 
                        flex items-center justify-center text-white font-bold text-sm`}>
                        {customer.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white/90">{customer.name}</div>
                        <div className="text-xs text-white/40">{customer.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="text-sm text-white/60">{customer.email}</div>
                    <div className="text-xs text-white/40 mt-1">{customer.phone}</div>
                  </td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-lg text-[10px] font-medium
                      ${customer.segment === 'vip' ? 'bg-indigo-500/10 text-indigo-400' :
                        customer.segment === 'wholesale' ? 'bg-purple-500/10 text-purple-400' :
                        customer.segment === 'regular' ? 'bg-emerald-500/10 text-emerald-400' :
                        'bg-blue-500/10 text-blue-400'}`}>
                      {customer.segment}
                    </span>
                  </td>
                  <td className="py-4 text-sm text-white/60">{customer.orders}</td>
                  <td className="py-4 text-sm font-semibold text-white/90">
                    ${customer.spent.toLocaleString()}
                  </td>
                  <td className="py-4 text-sm text-white/60">{customer.lastOrder}</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-lg text-[10px] font-medium
                      ${customer.status === 'active' 
                        ? 'bg-emerald-500/10 text-emerald-400' 
                        : 'bg-amber-500/10 text-amber-400'}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                        <FiMessageCircle className="w-4 h-4 text-white/40" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                        <FiEye className="w-4 h-4 text-white/40" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                        <FiMoreVertical className="w-4 h-4 text-white/40" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Customer Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold text-white/90 mb-4">Customer Lifetime Value</h3>
          <div className="space-y-4">
            {customers.slice(0, 5).map((customer) => (
              <div key={customer.id}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-white/90">{customer.name}</span>
                  <span className="text-sm font-semibold text-white/90">
                    ${customer.lifetime.toLocaleString()}
                  </span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full bg-gradient-to-r ${customer.color}`}
                    style={{ width: `${(customer.lifetime / 50000) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold text-white/90 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { customer: 'John Smith', action: 'placed order #ORD-7842', amount: 1248, time: '2 min ago' },
              { customer: 'Sarah Johnson', action: 'updated profile', time: '15 min ago' },
              { customer: 'Michael Brown', action: 'submitted review', rating: 5, time: '1 hour ago' },
              { customer: 'Emma Wilson', action: 'requested support', time: '3 hours ago' },
              { customer: 'David Lee', action: 'completed onboarding', time: '5 hours ago' },
            ].map((activity, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02]">
                <div>
                  <span className="text-xs font-medium text-white/90">{activity.customer}</span>
                  <span className="text-xs text-white/40 ml-2">{activity.action}</span>
                  {activity.amount && (
                    <span className="text-xs text-indigo-400 ml-2">${activity.amount}</span>
                  )}
                  {activity.rating && (
                    <span className="text-xs text-amber-400 ml-2">★ {activity.rating}</span>
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

export default CustomersModule
