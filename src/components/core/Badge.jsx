import React from 'react'

export const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  className = ''
}) => {
  const variants = {
    default: 'bg-white/5 text-white/60 border-white/10',
    primary: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    danger: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    info: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    pink: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  }

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 rounded-full border font-medium
        ${variants[variant]} ${sizes[size]} ${className}
      `}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${variants[variant].split(' ')[1]}`} />
      )}
      {children}
    </span>
  )
}

export const StatusBadge = ({ status, className = '' }) => {
  const statusMap = {
    active: { variant: 'success', label: 'Active' },
    inactive: { variant: 'default', label: 'Inactive' },
    pending: { variant: 'warning', label: 'Pending' },
    processing: { variant: 'info', label: 'Processing' },
    completed: { variant: 'success', label: 'Completed' },
    cancelled: { variant: 'danger', label: 'Cancelled' },
    draft: { variant: 'default', label: 'Draft' },
    published: { variant: 'success', label: 'Published' },
    archived: { variant: 'default', label: 'Archived' },
    low_stock: { variant: 'warning', label: 'Low Stock' },
    out_of_stock: { variant: 'danger', label: 'Out of Stock' },
    in_stock: { variant: 'success', label: 'In Stock' },
  }

  const config = statusMap[status] || { variant: 'default', label: status }

  return (
    <Badge variant={config.variant} dot size="sm" className={className}>
      {config.label}
    </Badge>
  )
}
