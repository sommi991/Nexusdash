import React from 'react'
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi'
import { GlassCard } from './GlassCard'

export const StatCard = ({
  title,
  value,
  change,
  trend = 'up',
  icon: Icon,
  gradient = 'from-indigo-500 to-purple-500',
  onClick,
  className = ''
}) => {
  return (
    <GlassCard 
      className={`p-6 group hover:scale-[1.02] transition-all duration-300 cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} 
          flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        
        {change !== undefined && (
          <div className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium
            ${trend === 'up' 
              ? 'bg-emerald-500/10 text-emerald-400' 
              : 'bg-rose-500/10 text-rose-400'
            }`}>
            {trend === 'up' ? (
              <FiTrendingUp className="w-3.5 h-3.5" />
            ) : (
              <FiTrendingDown className="w-3.5 h-3.5" />
            )}
            {change}%
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <h3 className="text-2xl lg:text-3xl font-bold text-white/90 tracking-tight">
          {value}
        </h3>
        <p className="text-sm text-white/40 font-medium uppercase tracking-wider">
          {title}
        </p>
      </div>
    </GlassCard>
  )
}
