import React from 'react'

export const Spinner = ({
  size = 'md',
  color = 'indigo',
  className = ''
}) => {
  const sizes = {
    xs: 'w-4 h-4',
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  }

  const colors = {
    indigo: 'border-indigo-500 border-t-indigo-200',
    purple: 'border-purple-500 border-t-purple-200',
    pink: 'border-pink-500 border-t-pink-200',
    emerald: 'border-emerald-500 border-t-emerald-200',
    amber: 'border-amber-500 border-t-amber-200',
    rose: 'border-rose-500 border-t-rose-200',
    white: 'border-white/20 border-t-white/60',
  }

  return (
    <div
      className={`
        ${sizes[size]} rounded-full border-2
        animate-spin-slow
        ${colors[color]}
        ${className}
      `}
    />
  )
}

export const LoadingSpinner = ({ text = 'Loading...', className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
      <Spinner size="lg" color="indigo" />
      <p className="text-sm text-white/40 animate-pulse">{text}</p>
    </div>
  )
}

export const LoadingSkeleton = ({
  type = 'text',
  width = 'full',
  height = 'auto',
  count = 1,
  className = ''
}) => {
  const types = {
    text: 'h-4 rounded-lg',
    title: 'h-6 rounded-lg',
    subtitle: 'h-5 rounded-lg',
    button: 'h-11 rounded-xl',
    input: 'h-11 rounded-xl',
    card: 'h-32 rounded-2xl',
    avatar: 'w-10 h-10 rounded-full',
    image: 'w-full h-48 rounded-xl',
  }

  const widths = {
    full: 'w-full',
    sm: 'w-24',
    md: 'w-32',
    lg: 'w-48',
    xl: 'w-64',
    '2xl': 'w-96',
  }

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`
            ${types[type]} ${widths[width]}
            bg-gradient-to-r from-white/5 via-white/[0.07] to-white/5
            bg-[length:200%_100%] animate-shimmer
            ${className}
          `}
        />
      ))}
    </>
  )
}

export const LoadingOverlay = ({ loading = true, children }) => {
  if (!loading) return children

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-2xl z-50 
        flex items-center justify-center">
        <Spinner size="lg" color="white" />
      </div>
      <div className="opacity-50 pointer-events-none">
        {children}
      </div>
    </div>
  )
}
