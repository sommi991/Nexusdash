import React from 'react'

export const Avatar = ({
  src,
  name,
  size = 'md',
  shape = 'circle',
  status,
  className = ''
}) => {
  const getInitials = (name) => {
    if (!name) return '?'
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const sizes = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-xl',
    '2xl': 'w-20 h-20 text-2xl',
  }

  const shapes = {
    circle: 'rounded-full',
    square: 'rounded-lg',
    rounded: 'rounded-xl',
  }

  const gradients = [
    'from-indigo-500 to-purple-500',
    'from-purple-500 to-pink-500',
    'from-pink-500 to-rose-500',
    'from-amber-500 to-orange-500',
    'from-emerald-500 to-teal-500',
    'from-blue-500 to-indigo-500',
    'from-cyan-500 to-blue-500',
  ]

  const gradientIndex = (name?.length || 0) % gradients.length
  const gradient = gradients[gradientIndex]

  const statusColors = {
    online: 'bg-emerald-500',
    away: 'bg-amber-500',
    busy: 'bg-rose-500',
    offline: 'bg-white/20',
  }

  return (
    <div className={`relative inline-flex ${className}`}>
      {src ? (
        <img
          src={src}
          alt={name}
          className={`${sizes[size]} ${shapes[shape]} object-cover`}
        />
      ) : (
        <div
          className={`
            ${sizes[size]} ${shapes[shape]}
            bg-gradient-to-br ${gradient}
            flex items-center justify-center text-white font-semibold
            shadow-lg shadow-indigo-500/20
          `}
        >
          {getInitials(name)}
        </div>
      )}
      
      {status && (
        <span
          className={`
            absolute bottom-0 right-0 block
            ${size === 'xs' ? 'w-1.5 h-1.5' : 
              size === 'sm' ? 'w-2 h-2' : 
              size === 'md' ? 'w-2.5 h-2.5' : 
              size === 'lg' ? 'w-3 h-3' : 'w-3.5 h-3.5'}
            rounded-full ${statusColors[status]}
            ring-2 ring-[#0a0a1a]
          `}
        />
      )}
    </div>
  )
}

export const AvatarGroup = ({
  users = [],
  max = 3,
  size = 'md',
  className = ''
}) => {
  const visibleUsers = users.slice(0, max)
  const remaining = users.length - max

  return (
    <div className={`flex items-center -space-x-2 ${className}`}>
      {visibleUsers.map((user, index) => (
        <Avatar
          key={index}
          name={user.name}
          src={user.avatar}
          size={size}
          className="ring-2 ring-[#0a0a1a]"
        />
      ))}
      {remaining > 0 && (
        <div
          className={`
            ${size === 'xs' ? 'w-6 h-6 text-[10px]' : 
              size === 'sm' ? 'w-8 h-8 text-xs' : 
              size === 'md' ? 'w-10 h-10 text-sm' : 
              size === 'lg' ? 'w-12 h-12 text-base' : 'w-16 h-16 text-xl'}
            rounded-full bg-white/10 border border-white/20
            flex items-center justify-center text-white/60 text-xs font-medium
            ring-2 ring-[#0a0a1a]
          `}
        >
          +{remaining}
        </div>
      )}
    </div>
  )
}
