import React from 'react'
import { FiLoader } from 'react-icons/fi'

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  fullWidth = false,
  className = '',
  onClick,
  type = 'button',
  ...props
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90',
    secondary: 'bg-white/[0.02] border border-white/[0.03] text-white/70 hover:bg-white/[0.03] hover:text-white/90',
    success: 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:opacity-90',
    danger: 'bg-gradient-to-r from-rose-500 to-red-500 text-white hover:opacity-90',
    warning: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:opacity-90',
    outline: 'bg-transparent border border-white/[0.03] text-white/70 hover:bg-white/[0.02] hover:text-white/90',
    ghost: 'bg-transparent text-white/70 hover:bg-white/[0.02] hover:text-white/90',
  }

  const sizes = {
    sm: 'h-9 px-4 text-xs',
    md: 'h-11 px-6 text-sm',
    lg: 'h-14 px-8 text-base',
    xl: 'h-16 px-10 text-lg',
  }

  const baseClasses = 'relative inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 cursor-pointer'
  const widthClasses = fullWidth ? 'w-full' : ''
  const stateClasses = (disabled || loading) ? 'opacity-50 cursor-not-allowed' : ''

  return (
    <button
      type={type}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${widthClasses} ${stateClasses} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <FiLoader className="w-4 h-4 animate-spin" />
      )}
      
      {!loading && Icon && iconPosition === 'left' && (
        <Icon className={`w-4 h-4 ${size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : ''}`} />
      )}
      
      <span>{children}</span>
      
      {!loading && Icon && iconPosition === 'right' && (
        <Icon className={`w-4 h-4 ${size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : ''}`} />
      )}
    </button>
  )
}
