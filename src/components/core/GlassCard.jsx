import React from 'react'

export const GlassCard = ({ 
  children, 
  className = '', 
  gradient = false,
  hover = false,
  glow = false,
  onClick,
  ...props 
}) => {
  const baseClasses = 'relative rounded-2xl bg-white/[0.02] border border-white/[0.03] backdrop-blur-xl'
  
  const gradientClasses = gradient 
    ? 'bg-gradient-to-br from-white/[0.03] to-white/[0.01]' 
    : ''
  
  const hoverClasses = hover
    ? 'transition-all duration-500 hover:scale-[1.02] hover:bg-white/[0.03] hover:border-white/[0.05] cursor-pointer'
    : ''
  
  const glowClasses = glow
    ? 'hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]'
    : ''

  return (
    <div 
      className={`${baseClasses} ${gradientClasses} ${hoverClasses} ${glowClasses} ${className}`}
      onClick={onClick}
      {...props}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/[0.02] to-purple-500/[0.02] pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
