import React, { useState } from 'react'
import {
  FiUsers, FiUser, FiUserPlus, FiMail, FiPhone,
  FiMapPin, FiCalendar, FiStar, FiAward, FiClock,
  FiTrendingUp, FiTrendingDown, FiMoreVertical,
  FiMessageCircle, FiCheckCircle, FiAlertCircle,
  FiShield, FiBriefcase, FiBarChart2, FiPieChart,
  FiDownload, FiFilter, FiSearch, FiPlus, FiEdit,
  FiTrash2, FiEye, FiZap, FiTarget
} from 'react-icons/fi'
import { GlassCard } from '../components/core/GlassCard'

const TeamModule = () => {
  const [selectedTeam, setSelectedTeam] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const teamMembers = [
    {
      id: 1,
      name: 'Alex Morgan',
      role: 'CEO & Founder',
      department: 'Executive',
      email: 'alex@nexusdash.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      avatar: null,
      status: 'online',
      performance: 98,
      projects: 12,
      tasks: 24,
      rating: 4.9,
      joinDate: '2020-01-15',
      skills: ['Leadership', 'Strategy', 'Product'],
      color: 'from-indigo-500 to-purple-500'
    },
    {
      id: 2,
      name: 'Sarah Chen',
      role: 'CTO',
      department: 'Engineering',
      email: 'sarah@nexusdash.com',
      phone: '+1 (555) 234-5678',
      location: 'San Francisco, CA',
      avatar: null,
      status: 'online',
      performance: 96,
      projects: 8,
      tasks: 18,
      rating: 4.8,
      joinDate: '2020-03-20',
      skills: ['Architecture', 'Cloud', 'AI/ML'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 3,
      name: 'Michael Rodriguez',
      role: 'Head of Product',
      department: 'Product',
      email: 'michael@nexusdash.com',
      phone: '+1 (555) 345-6789',
      location: 'New York, NY',
      avatar: null,
      status: 'away',
      performance: 94,
      projects: 10,
      tasks: 15,
      rating: 4.7,
      joinDate: '2020-06-10',
      skills: ['Product Strategy', 'UX', 'Analytics'],
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 4,
      name: 'Emily Watson',
      role: 'Lead Designer',
      department: 'Design',
      email: 'emily@nexusdash.com',
      phone: '+1 (555) 456-7890',
      location: 'Los Angeles, CA',
      avatar: null,
      status: 'online',
      performance: 97,
      projects: 6,
      tasks: 12,
      rating: 4.9,
      joinDate: '2020-09-05',
      skills: ['UI/UX', 'Branding', 'Prototyping'],
      color: 'from-amber-500 to-orange-500'
    },
    {
      id: 5,
      name: 'David Kim',
      role: 'Engineering Manager',
      department: 'Engineering',
      email: 'david@nexusdash.com',
      phone: '+1 (555) 567-8901',
      location: 'Seattle, WA',
      avatar: null,
      status: 'offline',
      performance: 92,
      projects: 7,
      tasks: 20,
      rating: 4.6,
      joinDate: '2021-01-12',
      skills: ['Team Leadership', 'Backend', 'DevOps'],
      color: 'from-emerald-500 to-teal-500'
    },
    {
      id: 6,
      name: 'Lisa Thompson',
      role: 'Marketing Director',
      department: 'Marketing',
      email: 'lisa@nexusdash.com',
      phone: '+1 (555) 678-9012',
      location: 'Chicago, IL',
      avatar: null,
      status: 'online',
      performance: 95,
      projects: 5,
      tasks: 16,
      rating: 4.8,
      joinDate: '2021-03-18',
      skills: ['Growth', 'SEO', 'Content'],
      color: 'from-blue-500 to-indigo-500'
    }
  ]

  const departments = [
    { name: 'Executive', count: 2, color: 'from-indigo-500 to-purple-500' },
    { name: 'Engineering', count: 12, color: 'from-purple-500 to-pink-500' },
    { name: 'Product', count: 6, color: 'from-pink-500 to-rose-500' },
    { name: 'Design', count: 5, color: 'from-amber-500 to-orange-500' },
    { name: 'Marketing', count: 8, color: 'from-emerald-500 to-teal-500' },
    { name: 'Sales', count: 10, color: 'from-blue-500 to-indigo-500' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r 
            from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Team
          </h1>
          <p className="text-white/40 text-sm flex items-center gap-2">
            <FiUsers className="w-4 h-4" />
            Manage your team and track performance
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="h-11 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 
            text-white text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
            <FiUserPlus className="w-4 h-4" />
            Add Member
          </button>
          <button className="h-11 px-4 rounded-xl bg-white/[0.02] border border-white/[0.03] 
            hover:bg-white/[0.03] transition-colors flex items-center gap-2 text-sm text-white/70">
            <FiDownload className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <GlassCard className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 
              flex items-center justify-center">
              <FiUsers className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white/90 mb-1">43</div>
              <div className="text-sm text-white/40">Total Members</div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 
              flex items-center justify-center">
              <FiUser className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white/90 mb-1">28</div>
              <div className="text-sm text-white/40">Active Now</div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 
              flex items-center justify-center">
              <FiBriefcase className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white/90 mb-1">6</div>
              <div className="text-sm text-white/40">Departments</div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 
              flex items-center justify-center">
              <FiStar className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white/90 mb-1">4.8</div>
              <div className="text-sm text-white/40">Avg Rating</div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Search & Filters */}
      <GlassCard className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Search team members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-11 pr-4 rounded-xl bg-white/[0.02] border border-white/[0.03]
                focus:border-indigo-500/30 focus:outline-none text-sm text-white/90
                placeholder:text-white/40 transition-colors"
            />
          </div>
          
          <select className="h-11 px-4 rounded-xl bg-white/[0.02] border border-white/[0.03]
            focus:border-indigo-500/30 focus:outline-none text-sm text-white/70">
            <option>All Departments</option>
            {departments.map(dept => (
              <option key={dept.name}>{dept.name}</option>
            ))}
          </select>
          
          <select className="h-11 px-4 rounded-xl bg-white/[0.02] border border-white/[0.03]
            focus:border-indigo-500/30 focus:outline-none text-sm text-white/70">
            <option>All Status</option>
            <option>Online</option>
            <option>Away</option>
            <option>Offline</option>
          </select>
          
          <button className="h-11 px-4 rounded-xl bg-white/[0.02] border border-white/[0.03] 
            hover:bg-white/[0.03] transition-colors flex items-center gap-2 text-sm text-white/70">
            <FiFilter className="w-4 h-4" />
            More Filters
          </button>
        </div>
      </GlassCard>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <GlassCard key={member.id} className="p-6 group hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${member.color} 
                    flex items-center justify-center text-white font-bold text-xl`}>
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#0a0a1a]
                    ${member.status === 'online' ? 'bg-emerald-500' :
                      member.status === 'away' ? 'bg-amber-500' : 'bg-white/20'}`} />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white/90 mb-1">{member.name}</h4>
                  <p className="text-sm text-white/40">{member.role}</p>
                </div>
              </div>
              <button className="p-2 rounded-lg hover:bg-white/5 transition-colors opacity-0 group-hover:opacity-100">
                <FiMoreVertical className="w-5 h-5 text-white/40" />
              </button>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-white/60">
                <FiMail className="w-4 h-4 text-white/40" />
                {member.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <FiPhone className="w-4 h-4 text-white/40" />
                {member.phone}
              </div>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <FiMapPin className="w-4 h-4 text-white/40" />
                {member.location}
              </div>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <FiCalendar className="w-4 h-4 text-white/40" />
                Joined {new Date(member.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {member.skills.map((skill) => (
                <span key={skill} className="px-2 py-1 rounded-lg bg-white/5 text-xs text-white/60">
                  {skill}
                </span>
              ))}
            </div>

            <div className="pt-4 border-t border-white/[0.03]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-white/40">Performance</span>
                <span className="text-sm font-semibold text-white/90">{member.performance}%</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden mb-4">
                <div 
                  className={`h-full rounded-full bg-gradient-to-r ${member.color}`}
                  style={{ width: `${member.performance}%` }}
                />
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-sm font-semibold text-white/90">{member.projects}</div>
                  <div className="text-[10px] text-white/40">Projects</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white/90">{member.tasks}</div>
                  <div className="text-[10px] text-white/40">Tasks</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white/90">{member.rating}</div>
                  <div className="text-[10px] text-white/40">Rating</div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/[0.03]">
              <button className="flex-1 px-3 py-2 rounded-lg bg-white/[0.02] hover:bg-white/[0.03] 
                transition-colors text-sm text-white/70 flex items-center justify-center gap-2">
                <FiMessageCircle className="w-4 h-4" />
                Message
              </button>
              <button className="flex-1 px-3 py-2 rounded-lg bg-white/[0.02] hover:bg-white/[0.03] 
                transition-colors text-sm text-white/70 flex items-center justify-center gap-2">
                <FiEye className="w-4 h-4" />
                Profile
              </button>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Department Overview */}
      <GlassCard className="p-6">
        <h3 className="text-lg font-semibold text-white/90 mb-4">Department Overview</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept) => (
            <div key={dept.name} className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02]">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${dept.color} 
                flex items-center justify-center opacity-20`} />
              <div>
                <div className="text-sm font-medium text-white/90 mb-1">{dept.name}</div>
                <div className="text-2xl font-bold text-white/90">{dept.count}</div>
                <div className="text-xs text-white/40 mt-1">Team Members</div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}

export default TeamModule
