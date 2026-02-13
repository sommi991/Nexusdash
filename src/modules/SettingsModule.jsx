import React, { useState } from 'react'
import {
  FiSettings, FiSave, FiGlobe, FiMail, FiShield,
  FiCreditCard, FiTruck, FiBell, FiLock, FiUser,
  FiDatabase, FiCloud, FiSmartphone, FiMonitor,
  FiMoon, FiSun, FiGlobe as FiLanguage, FiClock, FiDollarSign,
  FiPercent, FiBox, FiUsers, FiCheckCircle, FiAlertCircle,
  FiRefreshCw, FiSliders, FiCode, FiKey, FiCpu
} from 'react-icons/fi'
import { GlassCard } from '../components/core/GlassCard'

const SettingsModule = () => {
  const [activeTab, setActiveTab] = useState('general')
  const [isSaving, setIsSaving] = useState(false)

  const [settings, setSettings] = useState({
    general: {
      siteName: 'Nexus Dash',
      siteUrl: 'https://nexusdash.com',
      adminEmail: 'admin@nexusdash.com',
      supportEmail: 'support@nexusdash.com',
      timezone: 'America/Los_Angeles',
      language: 'en',
      dateFormat: 'MM/DD/YYYY',
      timeFormat: '12h',
      currency: 'USD'
    },
    appearance: {
      theme: 'dark',
      sidebarCollapsed: false,
      denseMode: false,
      animations: true,
      glassEffect: true,
      accentColor: 'indigo',
      fontSize: 'medium'
    },
    notifications: {
      emailNotifications: true,
      orderAlerts: true,
      inventoryAlerts: true,
      customerAlerts: true,
      marketingAlerts: false,
      dailyDigest: true,
      weeklyReport: true
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      passwordExpiry: 90,
      maxLoginAttempts: 5,
      ipWhitelist: false,
      sslRequired: true,
      backupEnabled: true
    },
    integrations: {
      stripe: { enabled: true, testMode: true },
      paypal: { enabled: true, testMode: true },
      mailchimp: { enabled: false, testMode: false },
      slack: { enabled: true, webhook: 'https://hooks.slack.com/...' },
      aws: { enabled: true, region: 'us-west-2' }
    }
  })

  const tabs = [
    { id: 'general', label: 'General', icon: FiSettings },
    { id: 'appearance', label: 'Appearance', icon: FiMonitor },
    { id: 'notifications', label: 'Notifications', icon: FiBell },
    { id: 'security', label: 'Security', icon: FiShield },
    { id: 'integrations', label: 'Integrations', icon: FiCloud },
    { id: 'advanced', label: 'Advanced', icon: FiCpu }
  ]

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      alert('Settings saved successfully!')
    }, 1500)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r 
            from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Settings
          </h1>
          <p className="text-white/40 text-sm flex items-center gap-2">
            <FiSettings className="w-4 h-4" />
            Configure your system preferences and integrations
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`h-11 px-6 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 
            text-white text-sm font-medium hover:opacity-90 transition-opacity 
            flex items-center gap-2 ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isSaving ? (
            <FiRefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <FiSave className="w-4 h-4" />
          )}
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {/* Settings Navigation */}
      <GlassCard className="p-1">
        <div className="flex flex-wrap items-center gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2
                  ${activeTab === tab.id
                    ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-400 border border-indigo-500/30'
                    : 'text-white/40 hover:text-white/60 hover:bg-white/5'
                  }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </div>
      </GlassCard>

      {/* Settings Content */}
      <GlassCard className="p-6">
        {/* General Settings */}
        {activeTab === 'general' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white/90 mb-4">General Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Site Name</label>
                    <input
                      type="text"
                      value={settings.general.siteName}
                      onChange={(e) => setSettings({
                        ...settings,
                        general: { ...settings.general, siteName: e.target.value }
                      })}
                      className="w-full h-11 px-4 rounded-xl bg-white/[0.02] border border-white/[0.03]
                        focus:border-indigo-500/30 focus:outline-none text-sm text-white/90"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Site URL</label>
                    <input
                      type="url"
                      value={settings.general.siteUrl}
                      onChange={(e) => setSettings({
                        ...settings,
                        general: { ...settings.general, siteUrl: e.target.value }
                      })}
                      className="w-full h-11 px-4 rounded-xl bg-white/[0.02] border border-white/[0.03]
                        focus:border-indigo-500/30 focus:outline-none text-sm text-white/90"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Admin Email</label>
                    <input
                      type="email"
                      value={settings.general.adminEmail}
                      onChange={(e) => setSettings({
                        ...settings,
                        general: { ...settings.general, adminEmail: e.target.value }
                      })}
                      className="w-full h-11 px-4 rounded-xl bg-white/[0.02] border border-white/[0.03]
                        focus:border-indigo-500/30 focus:outline-none text-sm text-white/90"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Support Email</label>
                    <input
                      type="email"
                      value={settings.general.supportEmail}
                      onChange={(e) => setSettings({
                        ...settings,
                        general: { ...settings.general, supportEmail: e.target.value }
                      })}
                      className="w-full h-11 px-4 rounded-xl bg-white/[0.02] border border-white/[0.03]
                        focus:border-indigo-500/30 focus:outline-none text-sm text-white/90"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Timezone</label>
                    <select
                      value={settings.general.timezone}
                      onChange={(e) => setSettings({
                        ...settings,
                        general: { ...settings.general, timezone: e.target.value }
                      })}
                      className="w-full h-11 px-4 rounded-xl bg-white/[0.02] border border-white/[0.03]
                        focus:border-indigo-500/30 focus:outline-none text-sm text-white/90"
                    >
                      <option value="America/Los_Angeles">Pacific Time (US & Canada)</option>
                      <option value="America/New_York">Eastern Time (US & Canada)</option>
                      <option value="America/Chicago">Central Time (US & Canada)</option>
                      <option value="America/Denver">Mountain Time (US & Canada)</option>
                      <option value="Europe/London">London (GMT)</option>
                      <option value="Europe/Paris">Paris (CET)</option>
                      <option value="Asia/Tokyo">Tokyo (JST)</option>
                      <option value="Australia/Sydney">Sydney (AEDT)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Language</label>
                    <select
                      value={settings.general.language}
                      onChange={(e) => setSettings({
                        ...settings,
                        general: { ...settings.general, language: e.target.value }
                      })}
                      className="w-full h-11 px-4 rounded-xl bg-white/[0.02] border border-white/[0.03]
                        focus:border-indigo-500/30 focus:outline-none text-sm text-white/90"
                    >
                      <option value="en">English</option>
                      <option value="es">Español</option>
                      <option value="fr">Français</option>
                      <option value="de">Deutsch</option>
                      <option value="it">Italiano</option>
                      <option value="pt">Português</option>
                      <option value="ja">日本語</option>
                      <option value="ko">한국어</option>
                      <option value="zh">中文</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Currency</label>
                    <select
                      value={settings.general.currency}
                      onChange={(e) => setSettings({
                        ...settings,
                        general: { ...settings.general, currency: e.target.value }
                      })}
                      className="w-full h-11 px-4 rounded-xl bg-white/[0.02] border border-white/[0.03]
                        focus:border-indigo-500/30 focus:outline-none text-sm text-white/90"
                    >
                      <option value="USD">USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="GBP">GBP - British Pound</option>
                      <option value="JPY">JPY - Japanese Yen</option>
                      <option value="CAD">CAD - Canadian Dollar</option>
                      <option value="AUD">AUD - Australian Dollar</option>
                      <option value="CHF">CHF - Swiss Franc</option>
                      <option value="CNY">CNY - Chinese Yuan</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Date Format</label>
                    <select
                      value={settings.general.dateFormat}
                      onChange={(e) => setSettings({
                        ...settings,
                        general: { ...settings.general, dateFormat: e.target.value }
                      })}
                      className="w-full h-11 px-4 rounded-xl bg-white/[0.02] border border-white/[0.03]
                        focus:border-indigo-500/30 focus:outline-none text-sm text-white/90"
                    >
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Appearance Settings */}
        {activeTab === 'appearance' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white/90 mb-4">Appearance Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02]">
                  <div>
                    <div className="text-sm font-medium text-white/90">Dark Mode</div>
                    <div className="text-xs text-white/40 mt-1">Enable dark theme across the dashboard</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.appearance.theme === 'dark'}
                      onChange={(e) => setSettings({
                        ...settings,
                        appearance: { ...settings.appearance, theme: e.target.checked ? 'dark' : 'light' }
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-white/10 rounded-full peer 
                      peer-checked:after:translate-x-full peer-checked:after:border-white 
                      after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                      after:bg-white after:border-gray-300 after:border after:rounded-full 
                      after:h-5 after:w-5 after:transition-all
                      peer-checked:bg-gradient-to-r peer-checked:from-indigo-500 peer-checked:to-purple-500">
                    </div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02]">
                  <div>
                    <div className="text-sm font-medium text-white/90">Dense Mode</div>
                    <div className="text-xs text-white/40 mt-1">Compact interface with reduced spacing</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.appearance.denseMode}
                      onChange={(e) => setSettings({
                        ...settings,
                        appearance: { ...settings.appearance, denseMode: e.target.checked }
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-white/10 rounded-full peer 
                      peer-checked:after:translate-x-full peer-checked:after:border-white 
                      after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                      after:bg-white after:border-gray-300 after:border after:rounded-full 
                      after:h-5 after:w-5 after:transition-all
                      peer-checked:bg-gradient-to-r peer-checked:from-indigo-500 peer-checked:to-purple-500">
                    </div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02]">
                  <div>
                    <div className="text-sm font-medium text-white/90">Animations</div>
                    <div className="text-xs text-white/40 mt-1">Enable UI animations and transitions</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.appearance.animations}
                      onChange={(e) => setSettings({
                        ...settings,
                        appearance: { ...settings.appearance, animations: e.target.checked }
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-white/10 rounded-full peer 
                      peer-checked:after:translate-x-full peer-checked:after:border-white 
                      after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                      after:bg-white after:border-gray-300 after:border after:rounded-full 
                      after:h-5 after:w-5 after:transition-all
                      peer-checked:bg-gradient-to-r peer-checked:from-indigo-500 peer-checked:to-purple-500">
                    </div>
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-white/60 mb-2">Accent Color</label>
                  <select
                    value={settings.appearance.accentColor}
                    onChange={(e) => setSettings({
                      ...settings,
                      appearance: { ...settings.appearance, accentColor: e.target.value }
                    })}
                    className="w-full h-11 px-4 rounded-xl bg-white/[0.02] border border-white/[0.03]
                      focus:border-indigo-500/30 focus:outline-none text-sm text-white/90"
                  >
                    <option value="indigo">Indigo</option>
                    <option value="purple">Purple</option>
                    <option value="pink">Pink</option>
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                    <option value="amber">Amber</option>
                    <option value="red">Red</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-2">Font Size</label>
                  <select
                    value={settings.appearance.fontSize}
                    onChange={(e) => setSettings({
                      ...settings,
                      appearance: { ...settings.appearance, fontSize: e.target.value }
                    })}
                    className="w-full h-11 px-4 rounded-xl bg-white/[0.02] border border-white/[0.03]
                      focus:border-indigo-500/30 focus:outline-none text-sm text-white/90"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notification Settings */}
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white/90 mb-4">Notification Preferences</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { id: 'emailNotifications', label: 'Email Notifications', desc: 'Receive notifications via email' },
                { id: 'orderAlerts', label: 'Order Alerts', desc: 'Get notified about new orders' },
                { id: 'inventoryAlerts', label: 'Inventory Alerts', desc: 'Low stock notifications' },
                { id: 'customerAlerts', label: 'Customer Alerts', desc: 'New customer registrations' },
                { id: 'marketingAlerts', label: 'Marketing Alerts', desc: 'Campaign performance updates' },
                { id: 'dailyDigest', label: 'Daily Digest', desc: 'Summary of daily activities' },
                { id: 'weeklyReport', label: 'Weekly Report', desc: 'Comprehensive weekly report' },
              ].map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02]">
                  <div>
                    <div className="text-sm font-medium text-white/90">{item.label}</div>
                    <div className="text-xs text-white/40 mt-1">{item.desc}</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notifications[item.id]}
                      onChange={(e) => setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, [item.id]: e.target.checked }
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-white/10 rounded-full peer 
                      peer-checked:after:translate-x-full peer-checked:after:border-white 
                      after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                      after:bg-white after:border-gray-300 after:border after:rounded-full 
                      after:h-5 after:w-5 after:transition-all
                      peer-checked:bg-gradient-to-r peer-checked:from-indigo-500 peer-checked:to-purple-500">
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Security Settings */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white/90 mb-4">Security Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02]">
                  <div>
                    <div className="text-sm font-medium text-white/90">Two-Factor Authentication</div>
                    <div className="text-xs text-white/40 mt-1">Require 2FA for admin accounts</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.security.twoFactorAuth}
                      onChange={(e) => setSettings({
                        ...settings,
                        security: { ...settings.security, twoFactorAuth: e.target.checked }
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-white/10 rounded-full peer 
                      peer-checked:after:translate-x-full peer-checked:after:border-white 
                      after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                      after:bg-white after:border-gray-300 after:border after:rounded-full 
                      after:h-5 after:w-5 after:transition-all
                      peer-checked:bg-gradient-to-r peer-checked:from-indigo-500 peer-checked:to-purple-500">
                    </div>
                  </label>
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-2">Session Timeout (minutes)</label>
                  <input
                    type="number"
                    value={settings.security.sessionTimeout}
                    onChange={(e) => setSettings({
                      ...settings,
                      security: { ...settings.security, sessionTimeout: parseInt(e.target.value) }
                    })}
                    className="w-full h-11 px-4 rounded-xl bg-white/[0.02] border border-white/[0.03]
                      focus:border-indigo-500/30 focus:outline-none text-sm text-white/90"
                    min="1"
                    max="120"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-2">Password Expiry (days)</label>
                  <input
                    type="number"
                    value={settings.security.passwordExpiry}
                    onChange={(e) => setSettings({
                      ...settings,
                      security: { ...settings.security, passwordExpiry: parseInt(e.target.value) }
                    })}
                    className="w-full h-11 px-4 rounded-xl bg-white/[0.02] border border-white/[0.03]
                      focus:border-indigo-500/30 focus:outline-none text-sm text-white/90"
                    min="0"
                    max="365"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-white/60 mb-2">Max Login Attempts</label>
                  <input
                    type="number"
                    value={settings.security.maxLoginAttempts}
                    onChange={(e) => setSettings({
                      ...settings,
                      security: { ...settings.security, maxLoginAttempts: parseInt(e.target.value) }
                    })}
                    className="w-full h-11 px-4 rounded-xl bg-white/[0.02] border border-white/[0.03]
                      focus:border-indigo-500/30 focus:outline-none text-sm text-white/90"
                    min="1"
                    max="10"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02]">
                  <div>
                    <div className="text-sm font-medium text-white/90">IP Whitelist</div>
                    <div className="text-xs text-white/40 mt-1">Restrict access to specific IPs</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.security.ipWhitelist}
                      onChange={(e) => setSettings({
                        ...settings,
                        security: { ...settings.security, ipWhitelist: e.target.checked }
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-white/10 rounded-full peer 
                      peer-checked:after:translate-x-full peer-checked:after:border-white 
                      after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                      after:bg-white after:border-gray-300 after:border after:rounded-full 
                      after:h-5 after:w-5 after:transition-all
                      peer-checked:bg-gradient-to-r peer-checked:from-indigo-500 peer-checked:to-purple-500">
                    </div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02]">
                  <div>
                    <div className="text-sm font-medium text-white/90">SSL Required</div>
                    <div className="text-xs text-white/40 mt-1">Force HTTPS connections</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.security.sslRequired}
                      onChange={(e) => setSettings({
                        ...settings,
                        security: { ...settings.security, sslRequired: e.target.checked }
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-white/10 rounded-full peer 
                      peer-checked:after:translate-x-full peer-checked:after:border-white 
                      after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                      after:bg-white after:border-gray-300 after:border after:rounded-full 
                      after:h-5 after:w-5 after:transition-all
                      peer-checked:bg-gradient-to-r peer-checked:from-indigo-500 peer-checked:to-purple-500">
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Integrations Settings */}
        {activeTab === 'integrations' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white/90 mb-4">Integrations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(settings.integrations).map(([key, value]) => (
                <div key={key} className="p-4 rounded-xl bg-white/[0.02]">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 
                        flex items-center justify-center">
                        {key === 'stripe' && <FiCreditCard className="w-5 h-5 text-indigo-400" />}
                        {key === 'paypal' && <FiDollarSign className="w-5 h-5 text-indigo-400" />}
                        {key === 'mailchimp' && <FiMail className="w-5 h-5 text-indigo-400" />}
                        {key === 'slack' && <FiUsers className="w-5 h-5 text-indigo-400" />}
                        {key === 'aws' && <FiCloud className="w-5 h-5 text-indigo-400" />}
                      </div>
                      <span className="text-sm font-medium text-white/90 capitalize">{key}</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value.enabled}
                        onChange={(e) => setSettings({
                          ...settings,
                          integrations: {
                            ...settings.integrations,
                            [key]: { ...value, enabled: e.target.checked }
                          }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-white/10 rounded-full peer 
                        peer-checked:after:translate-x-full peer-checked:after:border-white 
                        after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                        after:bg-white after:border-gray-300 after:border after:rounded-full 
                        after:h-5 after:w-5 after:transition-all
                        peer-checked:bg-gradient-to-r peer-checked:from-indigo-500 peer-checked:to-purple-500">
                      </div>
                    </label>
                  </div>
                  
                  {value.enabled && (
                    <div className="mt-3 pt-3 border-t border-white/[0.03]">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-white/40">Status:</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full
                          ${value.testMode 
                            ? 'bg-amber-500/10 text-amber-400' 
                            : 'bg-emerald-500/10 text-emerald-400'}`}>
                          {value.testMode ? 'Test Mode' : 'Live'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Advanced Settings */}
        {activeTab === 'advanced' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white/90 mb-4">Advanced Settings</h3>
            
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-6">
              <div className="flex items-start gap-3">
                <FiAlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-amber-400 mb-1">Advanced Configuration</h4>
                  <p className="text-xs text-white/60">
                    These settings can affect system performance and stability. Please proceed with caution.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <button className="w-full p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.03] 
                flex items-center justify-between transition-colors">
                <div className="flex items-center gap-3">
                  <FiDatabase className="w-5 h-5 text-white/40" />
                  <div className="text-left">
                    <div className="text-sm font-medium text-white/90">Clear System Cache</div>
                    <div className="text-xs text-white/40 mt-1">Remove all cached data and temporary files</div>
                  </div>
                </div>
                <span className="text-xs text-white/40">Clear</span>
              </button>

              <button className="w-full p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.03] 
                flex items-center justify-between transition-colors">
                <div className="flex items-center gap-3">
                  <FiRefreshCw className="w-5 h-5 text-white/40" />
                  <div className="text-left">
                    <div className="text-sm font-medium text-white/90">Rebuild Indexes</div>
                    <div className="text-xs text-white/40 mt-1">Reindex database for optimal performance</div>
                  </div>
                </div>
                <span className="text-xs text-white/40">Rebuild</span>
              </button>

              <button className="w-full p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.03] 
                flex items-center justify-between transition-colors">
                <div className="flex items-center gap-3">
                  <FiCode className="w-5 h-5 text-white/40" />
                  <div className="text-left">
                    <div className="text-sm font-medium text-white/90">System Information</div>
                    <div className="text-xs text-white/40 mt-1">View detailed system diagnostics</div>
                  </div>
                </div>
                <span className="text-xs text-white/40">View</span>
              </button>

              <button className="w-full p-4 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 
                flex items-center justify-between transition-colors">
                <div className="flex items-center gap-3">
                  <FiKey className="w-5 h-5 text-rose-400" />
                  <div className="text-left">
                    <div className="text-sm font-medium text-rose-400">Reset to Defaults</div>
                    <div className="text-xs text-rose-400/60 mt-1">Restore all settings to factory defaults</div>
                  </div>
                </div>
                <span className="text-xs text-rose-400">Reset</span>
              </button>
            </div>
          </div>
        )}
      </GlassCard>
    </div>
  )
}

export default SettingsModule
