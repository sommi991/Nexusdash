import React, { useEffect, lazy, Suspense } from 'react'
import { NexusShell } from './components/layout/NexusShell'
import { useNexusStore } from './store/nexusStore'
import { NexusProvider } from './context/NexusContext'
import { LoadingSpinner } from './components/core/Loading'

// Lazy load modules for better performance
const DashboardModule = lazy(() => import('./modules/DashboardModule'))
const AnalyticsModule = lazy(() => import('./modules/AnalyticsModule'))
const FinanceModule = lazy(() => import('./modules/FinanceModule'))
const OperationsModule = lazy(() => import('./modules/OperationsModule'))
const TeamModule = lazy(() => import('./modules/TeamModule'))
const ProjectsModule = lazy(() => import('./modules/ProjectsModule'))
const InventoryModule = lazy(() => import('./modules/InventoryModule'))
const CustomersModule = lazy(() => import('./modules/CustomersModule'))
const MarketingModule = lazy(() => import('./modules/MarketingModule'))
const SettingsModule = lazy(() => import('./modules/SettingsModule'))
const HelpModule = lazy(() => import('./modules/HelpModule'))

function App() {
  const { currentModule, setCurrentModule, theme, initializeStore } = useNexusStore()

  useEffect(() => {
    initializeStore()
    
    // Simple keyboard shortcuts - removed complex ones that cause delay
    const handleKeyDown = (e) => {
      // Only handle if not in input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
      
      // Simple number shortcuts with Ctrl
      if (e.ctrlKey && !isNaN(parseInt(e.key))) {
        e.preventDefault()
        const modules = ['dashboard', 'analytics', 'finance', 'operations', 'team', 
                        'projects', 'inventory', 'customers', 'marketing', 'settings']
        const index = parseInt(e.key) - 1
        if (modules[index]) {
          setCurrentModule(modules[index])
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const renderModule = () => {
    switch(currentModule) {
      case 'dashboard': return <DashboardModule />
      case 'analytics': return <AnalyticsModule />
      case 'finance': return <FinanceModule />
      case 'operations': return <OperationsModule />
      case 'team': return <TeamModule />
      case 'projects': return <ProjectsModule />
      case 'inventory': return <InventoryModule />
      case 'customers': return <CustomersModule />
      case 'marketing': return <MarketingModule />
      case 'settings': return <SettingsModule />
      case 'help': return <HelpModule />
      default: return <DashboardModule />
    }
  }

  return (
    <NexusProvider>
      <div className={`nexus-app ${theme}`}>
        <NexusShell>
          <Suspense fallback={<LoadingSpinner text="Loading module..." />}>
            {renderModule()}
          </Suspense>
        </NexusShell>
      </div>
    </NexusProvider>
  )
}

export default App
