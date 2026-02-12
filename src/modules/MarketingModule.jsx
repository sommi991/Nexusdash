import React, { useState } from 'react'
import {
  FiTrendingUp, FiMail, FiMessageCircle, FiUsers,
  FiBarChart2, FiPieChart, FiActivity, FiCalendar,
  FiDownload, FiFilter, FiPlus, FiEdit, FiTrash2,
  FiEye, FiMoreVertical, FiZap, FiTarget, FiAward,
  FiStar, FiClock, FiCheckCircle, FiAlertCircle,
  FiShoppingBag, FiDollarSign, FiPercent, FiTag
} from 'react-icons/fi'
import { GlassCard } from '../components/core/GlassCard'

const MarketingModule = () => {
  const [selectedView, setSelectedView] = useState('campaigns')

  const campaigns = [
    {
      id: 'CAMP-001',
      name: 'Spring Sale 2024',
      type: 'email',
      status: 'active',
      audience: 12500,
      openRate: 24.5,
      clickRate: 8.2,
      conversion: 3.1,
      revenue: 45200,
      budget: 15000,
      roi: 201,
      startDate: '2024-03-01',
      endDate: '2024-03-31',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      id: 'CAMP-002',
      name: 'New Product Launch',
      type: 'social',
      status: 'active',
      audience: 45000,
      engagement: 4.8,
      reach: 125000,
      conversion: 2.4,
      revenue: 67800,
      budget: 25000,
      roi: 171,
      startDate: '2024-03-15',
      endDate: '2024-04-15',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'CAMP-003',
      name: 'Customer Appreciation',
      type: 'email',
      status: 'scheduled',
      audience: 8500,
      openRate: 0,
      clickRate: 0,
      conversion: 0,
      revenue: 0,
      budget: 5000,
      roi: 0,
      startDate: '2024-04-01',
      endDate: '2024-04-07',
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 'CAMP-004',
      name: 'Summer Collection',
      type: 'social',
      status: 'draft',
      audience: 0,
      engagement: 0,
      reach: 0,
      conversion: 0,
      revenue: 0,
      budget: 20000,
      roi: 0,
      startDate: '2024-05-01',
      endDate: '2024-06-30',
      color: 'from-amber-500 to-orange-500'
    },
    {
      id: 'CAMP-005',
      name: 'Flash Sale Weekend',
      type: 'push',
      status: 'completed',
      audience: 32000,
      openRate: 32.1,
      clickRate: 12.5,
      conversion: 5.2,
      revenue: 89200,
      budget: 18000,
      roi: 396,
      startDate: '2024-02-23',
      endDate: '2024-02-25',
      color: 'from-emerald-500 to-teal-500'
    }
  ]

  const metrics = {
    totalCampaigns: 12,
    activeCampaigns: 4,
    totalReach: 245000,
    totalRevenue: 234500,
    avgROI: 245,
    conversionRate: 3.2
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r 
            from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Marketing
          </h1>
          <p className="text-white/40 text-sm flex items-center gap-2">
            <FiTrendingUp className="w-4 h-4" />
            Plan, execute, and analyze marketing campaigns
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="h-11 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 
            text-white text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
            <FiPlus className="w-4 h-4" />
            New Campaign
          </button>
          <button className="h-11 px-4 rounded-xl bg-white/[0.02] border border-white/[0.03] 
            hover:bg-white/[0.03] transition-colors flex items-center gap-2 text-sm text-white/70">
            <FiDownload className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Marketing Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        <GlassCard className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 
              flex items-center justify-center">
              <FiTarget className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white/90 mb-1">{metrics.totalCampaigns}</div>
              <div className="text-sm text-white/40">Total Campaigns</div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 
              flex items-center justify-center">
              <FiZap className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white/90 mb-1">{metrics.activeCampaigns}</div>
              <div className="text-sm text-white/40">Active</div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 
              flex items-center justify-center">
              <FiUsers className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white/90 mb-1">{(metrics.totalReach / 1000).toFixed(0)}K</div>
              <div className="text-sm text-white/40">Total Reach</div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 
              flex items-center justify-center">
              <FiDollarSign className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white/90 mb-1">${(metrics.totalRevenue / 1000).toFixed(0)}K</div>
              <div className="text-sm text-white/40">Revenue</div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 
              flex items-center justify-center">
              <FiPercent className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white/90 mb-1">{metrics.avgROI}%</div>
              <div className="text-sm text-white/40">Avg ROI</div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Campaign Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold text-white/90 mb-4">Campaign Performance</h3>
          <div className="space-y-4">
            {campaigns.filter(c => c.status === 'active' || c.status === 'completed').slice(0, 4).map((campaign) => (
              <div key={campaign.id}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${campaign.color}`} />
                    <span className="text-sm font-medium text-white/90">{campaign.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/40">
                      {campaign.type}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-white/90">
                    ${campaign.revenue.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-white/40">
                  <span>ROI: {campaign.roi}%</span>
                  <span>Conv: {campaign.conversion}%</span>
                  <span className={`px-2 py-0.5 rounded-full
                    ${campaign.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' :
                      campaign.status === 'completed' ? 'bg-blue-500/10 text-blue-400' :
                      'bg-amber-500/10 text-amber-400'}`}>
                    {campaign.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold text-white/90 mb-4">Channel Distribution</h3>
          <div className="space-y-4">
            {[
              { channel: 'Email', percentage: 45, revenue: 105525, color: 'from-indigo-500 to-purple-500' },
              { channel: 'Social Media', percentage: 30, revenue: 70350, color: 'from-purple-500 to-pink-500' },
              { channel: 'Push Notifications', percentage: 15, revenue: 35175, color: 'from-pink-500 to-rose-500' },
              { channel: 'SMS', percentage: 10, revenue: 23450, color: 'from-amber-500 to-orange-500' },
            ].map((channel) => (
              <div key={channel.channel}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-white/90">{channel.channel}</span>
                  <span className="text-sm font-semibold text-white/90">
                    ${(channel.revenue / 1000).toFixed(1)}K
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
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
      </div>

      {/* Campaigns Grid */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white/90 mb-1">Active Campaigns</h3>
            <p className="text-sm text-white/40">Monitor and manage your marketing campaigns</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 rounded-lg bg-white/[0.02] hover:bg-white/[0.03] 
              text-sm text-white/70 flex items-center gap-2">
              <FiCalendar className="w-4 h-4" />
              Date Range
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="p-6 rounded-xl bg-white/[0.02] hover:bg-white/[0.03] 
              transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${campaign.color} 
                    flex items-center justify-center`}>
                    {campaign.type === 'email' && <FiMail className="w-6 h-6 text-white" />}
                    {campaign.type === 'social' && <FiUsers className="w-6 h-6 text-white" />}
                    {campaign.type === 'push' && <FiMessageCircle className="w-6 h-6 text-white" />}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white/90">{campaign.name}</h4>
                    <p className="text-xs text-white/40 mt-1">{campaign.id}</p>
                  </div>
                </div>
                <button className="p-2 rounded-lg hover:bg-white/5 transition-colors opacity-0 group-hover:opacity-100">
                  <FiMoreVertical className="w-5 h-5 text-white/40" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-xs text-white/40">Reach</div>
                  <div className="text-lg font-semibold text-white/90">
                    {campaign.audience ? campaign.audience.toLocaleString() : '—'}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-white/40">Revenue</div>
                  <div className="text-lg font-semibold text-white/90">
                    ${campaign.revenue ? campaign.revenue.toLocaleString() : '—'}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-white/40">Conversion</div>
                  <div className="text-lg font-semibold text-white/90">
                    {campaign.conversion ? `${campaign.conversion}%` : '—'}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-white/40">ROI</div>
                  <div className="text-lg font-semibold text-emerald-400">
                    {campaign.roi ? `${campaign.roi}%` : '—'}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/[0.03]">
                <span className={`px-2 py-1 rounded-lg text-[10px] font-medium
                  ${campaign.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' :
                    campaign.status === 'scheduled' ? 'bg-blue-500/10 text-blue-400' :
                    campaign.status === 'draft' ? 'bg-amber-500/10 text-amber-400' :
                    'bg-white/5 text-white/40'}`}>
                  {campaign.status}
                </span>
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <FiEye className="w-4 h-4 text-white/40" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <FiEdit className="w-4 h-4 text-white/40" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}

export default MarketingModule
