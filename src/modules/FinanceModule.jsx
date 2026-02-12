import React, { useState } from 'react'
import {
  FiDollarSign, FiCreditCard, FiTrendingUp, FiTrendingDown,
  FiPieChart, FiBarChart2, FiCalendar, FiDownload, FiFilter,
  FiMoreVertical, FiEye, FiCheckCircle, FiAlertCircle,
  FiClock, FiArrowUpRight, FiArrowDownRight, FiFileText,
  FiBriefcase, FiPercent, FiZap, FiDatabase  // ✅ Fixed imports
} from 'react-icons/fi'
import { GlassCard } from '../components/core/GlassCard'

const FinanceModule = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month')

  const financialStats = {
    revenue: { value: 425890, change: 12.5, trend: 'up' },
    expenses: { value: 284500, change: 8.3, trend: 'up' },
    profit: { value: 141390, change: 15.2, trend: 'up' },
    margin: { value: 33.2, change: 2.1, trend: 'up' },
    cashFlow: { value: 98500, change: 5.7, trend: 'up' },
    burnRate: { value: 42500, change: -2.3, trend: 'down' }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r 
            from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Finance
          </h1>
          <p className="text-white/40 text-sm flex items-center gap-2">
            <FiDollarSign className="w-4 h-4" />
            Real-time financial overview and projections
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="h-11 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 
            text-white text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
            <FiFileText className="w-4 h-4" />
            Generate Report
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 
              flex items-center justify-center">
              <FiDollarSign className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-semibold px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400">
              +{financialStats.revenue.change}%
            </span>
          </div>
          <div className="text-2xl font-bold text-white/90 mb-1">
            ${(financialStats.revenue.value / 1000).toFixed(1)}K
          </div>
          <div className="text-sm text-white/40">Total Revenue</div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 
              flex items-center justify-center">
              <FiCreditCard className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-semibold px-2 py-1 rounded-full bg-amber-500/10 text-amber-400">
              +{financialStats.expenses.change}%
            </span>
          </div>
          <div className="text-2xl font-bold text-white/90 mb-1">
            ${(financialStats.expenses.value / 1000).toFixed(1)}K
          </div>
          <div className="text-sm text-white/40">Operating Expenses</div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 
              flex items-center justify-center">
              <FiTrendingUp className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-semibold px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400">
              +{financialStats.profit.change}%
            </span>
          </div>
          <div className="text-2xl font-bold text-white/90 mb-1">
            ${(financialStats.profit.value / 1000).toFixed(1)}K
          </div>
          <div className="text-sm text-white/40">Net Profit</div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 
              flex items-center justify-center">
              <FiPercent className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-semibold px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400">
              +{financialStats.margin.change}%
            </span>
          </div>
          <div className="text-2xl font-bold text-white/90 mb-1">
            {financialStats.margin.value}%
          </div>
          <div className="text-sm text-white/40">Profit Margin</div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 
              flex items-center justify-center">
              <FiDatabase className="w-6 h-6 text-white" /> {/* ✅ Changed FiBank to FiDatabase */}
            </div>
            <span className="text-sm font-semibold px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400">
              +{financialStats.cashFlow.change}%
            </span>
          </div>
          <div className="text-2xl font-bold text-white/90 mb-1">
            ${(financialStats.cashFlow.value / 1000).toFixed(1)}K
          </div>
          <div className="text-sm text-white/40">Cash Flow</div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-red-500 
              flex items-center justify-center">
              <FiBriefcase className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-semibold px-2 py-1 rounded-full bg-rose-500/10 text-rose-400">
              {financialStats.burnRate.change}%
            </span>
          </div>
          <div className="text-2xl font-bold text-white/90 mb-1">
            ${(financialStats.burnRate.value / 1000).toFixed(1)}K
          </div>
          <div className="text-sm text-white/40">Burn Rate</div>
        </GlassCard>
      </div>

      {/* Rest of your component remains the same */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white/90 mb-1">Revenue vs Expenses</h3>
              <p className="text-sm text-white/40">Monthly comparison</p>
            </div>
            <select className="px-3 py-2 rounded-lg bg-white/[0.02] border border-white/[0.03] 
              text-sm text-white/60 focus:outline-none focus:border-indigo-500/30">
              <option>Last 6 months</option>
              <option>Last 12 months</option>
              <option>Year to date</option>
            </select>
          </div>
          <div className="h-80 bg-white/[0.01] rounded-xl flex items-center justify-center">
            <span className="text-white/20 text-sm">Revenue vs Expenses Chart</span>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white/90 mb-1">Expense Breakdown</h3>
              <p className="text-sm text-white/40">By category</p>
            </div>
            <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
              <FiMoreVertical className="w-5 h-5 text-white/40" />
            </button>
          </div>
          <div className="h-80 bg-white/[0.01] rounded-xl flex items-center justify-center">
            <span className="text-white/20 text-sm">Expense Distribution Chart</span>
          </div>
        </GlassCard>
      </div>

      {/* Recent Transactions */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white/90 mb-1">Recent Transactions</h3>
            <p className="text-sm text-white/40">Latest financial activities</p>
          </div>
          <button className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1">
            View All
            <FiArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.03]">
                <th className="py-4 text-left text-xs font-medium text-white/40 uppercase tracking-wider">Transaction</th>
                <th className="py-4 text-left text-xs font-medium text-white/40 uppercase tracking-wider">Date</th>
                <th className="py-4 text-left text-xs font-medium text-white/40 uppercase tracking-wider">Category</th>
                <th className="py-4 text-left text-xs font-medium text-white/40 uppercase tracking-wider">Amount</th>
                <th className="py-4 text-left text-xs font-medium text-white/40 uppercase tracking-wider">Status</th>
                <th className="py-4 text-left text-xs font-medium text-white/40 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: '#TR-2024-001', description: 'Client Payment - Acme Corp', date: '2024-03-15', category: 'Revenue', amount: 12500, type: 'credit', status: 'completed' },
                { id: '#TR-2024-002', description: 'Office Supplies', date: '2024-03-14', category: 'Operations', amount: 845, type: 'debit', status: 'completed' },
                { id: '#TR-2024-003', description: 'AWS Cloud Services', date: '2024-03-13', category: 'Technology', amount: 2340, type: 'debit', status: 'pending' },
                { id: '#TR-2024-004', description: 'Payroll - March', date: '2024-03-12', category: 'Salary', amount: 45200, type: 'debit', status: 'completed' },
                { id: '#TR-2024-005', description: 'Marketing Campaign', date: '2024-03-11', category: 'Marketing', amount: 5600, type: 'debit', status: 'processing' },
              ].map((transaction) => (
                <tr key={transaction.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                  <td className="py-4">
                    <div>
                      <div className="text-sm font-medium text-white/90">{transaction.description}</div>
                      <div className="text-xs text-white/40 mt-1">{transaction.id}</div>
                    </div>
                  </td>
                  <td className="py-4 text-sm text-white/60">{transaction.date}</td>
                  <td className="py-4">
                    <span className="text-sm text-white/60">{transaction.category}</span>
                  </td>
                  <td className="py-4">
                    <span className={`text-sm font-semibold flex items-center gap-1
                      ${transaction.type === 'credit' ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {transaction.type === 'credit' ? '+' : '-'}${transaction.amount.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-medium
                      ${transaction.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' :
                        transaction.status === 'pending' ? 'bg-amber-500/10 text-amber-400' :
                        'bg-indigo-500/10 text-indigo-400'}`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                      <FiEye className="w-4 h-4 text-white/40" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  )
}

export default FinanceModule
