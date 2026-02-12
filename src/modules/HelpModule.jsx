import React, { useState } from 'react'
import {
  FiHelpCircle, FiBook, FiVideo, FiMail, FiMessageCircle,
  FiFileText, FiSearch, FiDownload, FiExternalLink,
  FiChevronRight, FiChevronDown, FiStar, FiClock,
  FiUsers, FiSettings, FiBox, FiBarChart2, FiShield,
  FiZap, FiAward, FiTarget, FiGlobe, FiSmartphone
} from 'react-icons/fi'
import { GlassCard } from '../components/core/GlassCard'
import { Button } from '../components/core/Button'
import { Input } from '../components/core/Input'

const HelpModule = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFaq, setActiveFaq] = useState(null)

  const quickLinks = [
    { icon: FiBook, label: 'Documentation', href: '#', color: 'from-indigo-500 to-purple-500' },
    { icon: FiVideo, label: 'Video Tutorials', href: '#', color: 'from-purple-500 to-pink-500' },
    { icon: FiMessageCircle, label: 'Community', href: '#', color: 'from-pink-500 to-rose-500' },
    { icon: FiMail, label: 'Contact Support', href: '#', color: 'from-amber-500 to-orange-500' },
  ]

  const categories = [
    {
      icon: FiBox,
      title: 'Getting Started',
      description: 'New to Nexus Dash? Start here',
      articles: 12,
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: FiBarChart2,
      title: 'Analytics',
      description: 'Reports, metrics & insights',
      articles: 24,
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: FiUsers,
      title: 'Team Management',
      description: 'Users, roles & permissions',
      articles: 18,
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: FiSettings,
      title: 'Configuration',
      description: 'Settings & preferences',
      articles: 21,
      color: 'from-amber-500 to-orange-500'
    },
    {
      icon: FiShield,
      title: 'Security',
      description: 'Authentication & access',
      articles: 15,
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: FiZap,
      title: 'Integrations',
      description: 'Connect your tools',
      articles: 32,
      color: 'from-blue-500 to-indigo-500'
    }
  ]

  const faqs = [
    {
      question: 'How do I invite team members?',
      answer: 'Go to Team module → Click "Add Member" → Enter email and role → Send invitation. They\'ll receive an email to set up their account.',
      category: 'team'
    },
    {
      question: 'How do I create custom reports?',
      answer: 'Navigate to Analytics → Select metrics → Choose date range → Apply filters → Click "Export" or "Save Report". You can schedule automated reports in Settings.',
      category: 'analytics'
    },
    {
      question: 'How do I set up two-factor authentication?',
      answer: 'Go to Settings → Security → Enable 2FA → Scan QR code with authenticator app → Enter verification code → Save changes.',
      category: 'security'
    },
    {
      question: 'How do I integrate with Slack?',
      answer: 'Settings → Integrations → Slack → Click "Connect" → Authorize workspace → Configure notification preferences → Save.',
      category: 'integrations'
    },
    {
      question: 'How do I export data?',
      answer: 'Use the Export button in any module (CSV, JSON, PDF). For bulk exports, go to Settings → Data Management → Export All.',
      category: 'data'
    },
    {
      question: 'How do I reset my password?',
      answer: 'Click profile icon → Settings → Security → Change Password → Enter current password → Set new password → Confirm.',
      category: 'account'
    }
  ]

  const popularArticles = [
    { title: 'Getting Started Guide', views: 12453, category: 'Basics' },
    { title: 'User Roles & Permissions', views: 8762, category: 'Team' },
    { title: 'Analytics Dashboard Overview', views: 6541, category: 'Analytics' },
    { title: 'API Documentation', views: 5432, category: 'Developers' },
    { title: 'Security Best Practices', views: 4321, category: 'Security' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r 
            from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Help Center
          </h1>
          <p className="text-white/40 text-sm flex items-center gap-2">
            <FiHelpCircle className="w-4 h-4" />
            Documentation, guides, and support resources
          </p>
        </div>
      </div>

      {/* Search */}
      <GlassCard className="p-8 text-center">
        <h2 className="text-2xl font-semibold text-white/90 mb-3">
          How can we help you?
        </h2>
        <p className="text-white/40 mb-6">
          Search our documentation, guides, and support articles
        </p>
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 pl-12 pr-4 rounded-2xl bg-white/[0.02] border border-white/[0.03]
                focus:border-indigo-500/30 focus:outline-none text-lg text-white/90
                placeholder:text-white/30 transition-colors"
            />
          </div>
        </div>
      </GlassCard>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {quickLinks.map((link, index) => {
          const Icon = link.icon
          return (
            <a
              key={index}
              href={link.href}
              className="group relative overflow-hidden"
            >
              <GlassCard className="p-6 hover:scale-[1.02] transition-all duration-500">
                <div className={`absolute inset-0 bg-gradient-to-br ${link.color} opacity-0 
                  group-hover:opacity-5 transition-opacity duration-500`} />
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${link.color} 
                    flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white/90 mb-2">
                    {link.label}
                  </h3>
                  <span className="text-sm text-white/40 group-hover:text-white/60 transition-colors">
                    Learn more →
                  </span>
                </div>
              </GlassCard>
            </a>
          )
        })}
      </div>

      {/* Categories */}
      <div>
        <h2 className="text-xl font-semibold text-white/90 mb-4">Browse by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <GlassCard key={index} className="p-6 group hover:scale-[1.02] transition-all duration-500 cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} 
                    flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white/90 mb-1">
                      {category.title}
                    </h3>
                    <p className="text-sm text-white/40 mb-2">
                      {category.description}
                    </p>
                    <span className="text-xs text-indigo-400">
                      {category.articles} articles
                    </span>
                  </div>
                  <FiChevronRight className="w-5 h-5 text-white/20 group-hover:text-white/40 
                    group-hover:translate-x-1 transition-all" />
                </div>
              </GlassCard>
            )
          })}
        </div>
      </div>

      {/* FAQ & Popular Articles */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* FAQ Section */}
        <GlassCard className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white/90 mb-1">
                Frequently Asked Questions
              </h3>
              <p className="text-sm text-white/40">
                Quick answers to common questions
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-white/[0.03] rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full px-4 py-4 flex items-center justify-between bg-white/[0.02] 
                    hover:bg-white/[0.03] transition-colors text-left"
                >
                  <span className="text-sm font-medium text-white/90">
                    {faq.question}
                  </span>
                  {activeFaq === index ? (
                    <FiChevronDown className="w-5 h-5 text-white/40" />
                  ) : (
                    <FiChevronRight className="w-5 h-5 text-white/40" />
                  )}
                </button>
                {activeFaq === index && (
                  <div className="px-4 py-4 bg-white/[0.01] border-t border-white/[0.03]">
                    <p className="text-sm text-white/60">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Button variant="ghost" className="text-indigo-400">
              View all FAQs
              <FiChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </GlassCard>

        {/* Popular Articles */}
        <GlassCard className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 
              flex items-center justify-center">
              <FiStar className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white/90 mb-1">
                Popular Articles
              </h3>
              <p className="text-sm text-white/40">
                Most viewed this week
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {popularArticles.map((article, index) => (
              <a
                key={index}
                href="#"
                className="block p-3 rounded-xl hover:bg-white/[0.02] transition-colors group"
              >
                <div className="flex items-start justify-between mb-1">
                  <span className="text-sm font-medium text-white/90 group-hover:text-indigo-400 transition-colors">
                    {article.title}
                  </span>
                  <span className="text-xs text-white/40 ml-2 flex items-center gap-1">
                    <FiClock className="w-3 h-3" />
                    {article.views.toLocaleString()}
                  </span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-white/40">
                  {article.category}
                </span>
              </a>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-white/[0.03]">
            <Button variant="outline" fullWidth>
              <FiDownload className="w-4 h-4 mr-2" />
              Download Documentation
            </Button>
          </div>
        </GlassCard>
      </div>

      {/* Still Need Help? */}
      <GlassCard className="p-8 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-semibold text-white/90 mb-2">
              Still need help?
            </h3>
            <p className="text-white/40">
              Our support team is ready to assist you 24/7
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="primary" icon={FiMail} className="min-w-[160px]">
              Contact Support
            </Button>
            <Button variant="outline" icon={FiMessageCircle}>
              Live Chat
            </Button>
          </div>
        </div>
      </GlassCard>
    </div>
  )
}

export default HelpModule
