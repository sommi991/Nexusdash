import React, { useEffect } from 'react'
import { NexusShell } from './components/layout/NexusShell'
import { useNexusStore } from './store/nexusStore'
import { NexusProvider } from './context/NexusContext'

// Module Imports
import DashboardModule from './modules/DashboardModule'
import AnalyticsModule from './modules/AnalyticsModule'
import FinanceModule from './modules/FinanceModule'
import OperationsModule from './modules/OperationsModule'
import TeamModule from './modules/TeamModule'
import ProjectsModule from './modules/ProjectsModule'
import InventoryModule from './modules/InventoryModule'
import CustomersModule from './modules/CustomersModule'
import MarketingModule from './modules/MarketingModule'
import SettingsModule from './modules/SettingsModule'
import HelpModule from './modules/HelpModule'

function App() {
  const { currentModule, setCurrentModule, theme, initializeStore } = useNexusStore()

  useEffect(() => {
    initializeStore()
    
    // Keyboard shortcuts
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
          case '1': e.preventDefault(); setCurrentModule('dashboard'); break;
          case '2': e.preventDefault(); setCurrentModule('analytics'); break;
          case '3': e.preventDefault(); setCurrentModule('finance'); break;
          case '4': e.preventDefault(); setCurrentModule('operations'); break;
          case '5': e.preventDefault(); setCurrentModule('team'); break;
          case '6': e.preventDefault(); setCurrentModule('projects'); break;
          case '7': e.preventDefault(); setCurrentModule('inventory'); break;
          case '8': e.preventDefault(); setCurrentModule('customers'); break;
          case '9': e.preventDefault(); setCurrentModule('marketing'); break;
          case '0': e.preventDefault(); setCurrentModule('settings'); break;
          case 'h': e.preventDefault(); setCurrentModule('help'); break;
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Module renderer with props for navigation
  const renderModule = () => {
    const moduleProps = {
      onNavigate: setCurrentModule,
      showToast: (message, type) => {
        console.log('Toast:', message, type)
        // Add your toast notification logic here
      }
    }

    switch(currentModule) {
      case 'dashboard': return <DashboardModule {...moduleProps} />
      case 'analytics': return <AnalyticsModule {...moduleProps} />
      case 'finance': return <FinanceModule {...moduleProps} />
      case 'operations': return <OperationsModule {...moduleProps} />
      case 'team': return <TeamModule {...moduleProps} />
      case 'projects': return <ProjectsModule {...moduleProps} />
      case 'inventory': return <InventoryModule {...moduleProps} />
      case 'customers': return <CustomersModule {...moduleProps} />
      case 'marketing': return <MarketingModule {...moduleProps} />
      case 'settings': return <SettingsModule {...moduleProps} />
      case 'help': return <HelpModule {...moduleProps} />
      default: return <DashboardModule {...moduleProps} />
    }
  }

  return (
    <NexusProvider>
      <div className={`nexus-app ${theme}`}>
        <NexusShell>
          {renderModule()}
        </NexusShell>
      </div>
    </NexusProvider>
  )
}

export default App
