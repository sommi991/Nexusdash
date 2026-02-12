import React, { useState } from 'react'
import { FiEye, FiEyeOff, FiAlertCircle, FiCheckCircle } from 'react-icons/fi'

export const Input = ({
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  error,
  success,
  icon: Icon,
  required = false,
  disabled = false,
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [focused, setFocused] = useState(false)

  const inputType = type === 'password' && showPassword ? 'text' : type

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-white/60">
          {label}
          {required && <span className="text-rose-400 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {/* Icon */}
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <Icon className={`w-4 h-4 transition-colors duration-300
              ${focused ? 'text-indigo-400' : 'text-white/30'}`} />
          </div>
        )}
        
        {/* Input */}
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`
            w-full h-11 rounded-xl bg-white/[0.02] border transition-all duration-300
            focus:outline-none focus:ring-2 focus:ring-offset-0
            ${Icon ? 'pl-11' : 'pl-4'}
            ${error ? 'border-rose-500/30 focus:border-rose-500 focus:ring-rose-500/20' : 
              success ? 'border-emerald-500/30 focus:border-emerald-500 focus:ring-emerald-500/20' :
              'border-white/[0.03] focus:border-indigo-500/30 focus:ring-indigo-500/20'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            text-sm text-white/90 placeholder:text-white/30
            ${className}
          `}
          {...props}
        />
        
        {/* Password Toggle */}
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
          >
            {showPassword ? (
              <FiEyeOff className="w-4 h-4" />
            ) : (
              <FiEye className="w-4 h-4" />
            )}
          </button>
        )}
        
        {/* Status Icons */}
        {error && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <FiAlertCircle className="w-4 h-4 text-rose-400" />
          </div>
        )}
        {success && !error && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <FiCheckCircle className="w-4 h-4 text-emerald-400" />
          </div>
        )}
      </div>
      
      {/* Error Message */}
      {error && (
        <p className="text-xs text-rose-400/80 mt-1">{error}</p>
      )}
      
      {/* Success Message */}
      {success && !error && (
        <p className="text-xs text-emerald-400/80 mt-1">{success}</p>
      )}
    </div>
  )
}

export const Select = ({
  label,
  options = [],
  value,
  onChange,
  error,
  required = false,
  className = ''
}) => {
  const [focused, setFocused] = useState(false)

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-white/60">
          {label}
          {required && <span className="text-rose-400 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`
            w-full h-11 px-4 rounded-xl bg-white/[0.02] border transition-all duration-300
            focus:outline-none focus:ring-2 focus:ring-offset-0
            appearance-none cursor-pointer
            ${error ? 'border-rose-500/30 focus:border-rose-500 focus:ring-rose-500/20' : 
              'border-white/[0.03] focus:border-indigo-500/30 focus:ring-indigo-500/20'
            }
            text-sm text-white/90
            ${className}
          `}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-[#0a0a1a]">
              {option.label}
            </option>
          ))}
        </select>
        
        {/* Custom Arrow */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg 
            className={`w-4 h-4 transition-colors duration-300 ${focused ? 'text-indigo-400' : 'text-white/30'}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      
      {error && (
        <p className="text-xs text-rose-400/80 mt-1">{error}</p>
      )}
    </div>
  )
}

export const Textarea = ({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  error,
  className = ''
}) => {
  const [focused, setFocused] = useState(false)

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-white/60">
          {label}
        </label>
      )}
      
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`
          w-full px-4 py-3 rounded-xl bg-white/[0.02] border transition-all duration-300
          focus:outline-none focus:ring-2 focus:ring-offset-0
          ${error ? 'border-rose-500/30 focus:border-rose-500 focus:ring-rose-500/20' : 
            'border-white/[0.03] focus:border-indigo-500/30 focus:ring-indigo-500/20'
          }
          text-sm text-white/90 placeholder:text-white/30 resize-none
          ${className}
        `}
      />
      
      {error && (
        <p className="text-xs text-rose-400/80 mt-1">{error}</p>
      )}
    </div>
  )
}

export const Checkbox = ({
  label,
  checked,
  onChange,
  error,
  className = ''
}) => {
  return (
    <label className={`flex items-center gap-3 cursor-pointer group ${className}`}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only peer"
        />
        <div className="w-5 h-5 rounded-lg border border-white/[0.03] bg-white/[0.02] 
          peer-checked:bg-gradient-to-r peer-checked:from-indigo-500 peer-checked:to-purple-500
          peer-checked:border-transparent transition-all duration-300
          group-hover:border-white/10">
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none
          text-white opacity-0 peer-checked:opacity-100 transition-opacity">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      {label && (
        <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
          {label}
        </span>
      )}
      {error && (
        <span className="text-xs text-rose-400/80 ml-2">{error}</span>
      )}
    </label>
  )
}

export const Switch = ({
  label,
  checked,
  onChange,
  className = ''
}) => {
  return (
    <label className={`flex items-center gap-3 cursor-pointer group ${className}`}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only peer"
        />
        <div className="w-11 h-6 rounded-full bg-white/10 border border-white/[0.03] 
          peer-checked:bg-gradient-to-r peer-checked:from-indigo-500 peer-checked:to-purple-500
          transition-all duration-300 group-hover:bg-white/15">
        </div>
        <div className="absolute left-0.5 top-0.5 w-5 h-5 rounded-full bg-white shadow-lg
          peer-checked:translate-x-5 transition-transform duration-300">
        </div>
      </div>
      {label && (
        <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
          {label}
        </span>
      )}
    </label>
  )
}
