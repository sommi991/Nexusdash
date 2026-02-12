import React, { createContext, useContext, useEffect } from 'react'
import { useNexusStore } from '../store/nexusStore'

// Create Context
const NexusContext = createContext(null)

// Provider Component
export const NexusProvider = ({ children }) => {
  const store = useNexusStore()

  useEffect(() => {
    // Initialize theme class on html element
    if (store.theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [store.theme])

  return (
    <NexusContext.Provider value={store}>
      {children}
    </NexusContext.Provider>
  )
}

// Custom Hook for using context
export const useNexus = () => {
  const context = useContext(NexusContext)
  if (!context) {
    throw new Error('useNexus must be used within a NexusProvider')
  }
  return context
}
