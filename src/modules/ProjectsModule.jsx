import React, { useState } from 'react'
import {
  FiGrid, FiClock, FiCheckCircle, FiAlertCircle,
  FiTrendingUp, FiTrendingDown, FiUsers, FiCalendar,
  FiBarChart2, FiDownload, FiFilter, FiMoreVertical,
  FiEye, FiPlus, FiEdit, FiTrash2, FiZap, FiTarget,
  FiPieChart, FiActivity, FiAward, FiStar, FiFlag,
  FiPauseCircle, FiPlayCircle, FiArchive
} from 'react-icons/fi'
import { GlassCard } from '../components/core/GlassCard'

const ProjectsModule = () => {
  const [selectedView, setSelectedView] = useState('grid')

  const projects = [
    {
      id: 'PRJ-2024-001',
      name: 'Nexus Dash 2.0',
      description: 'Complete redesign of admin dashboard with new features',
      status: 'in-progress',
      progress: 75,
      priority: 'high',
      team: ['Alex M', 'Sarah C', 'David K'],
      deadline: '2024-04-15',
      tasks: { total: 24, completed: 18 },
      budget: 150000,
      spent: 112500,
      health: 'good',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      id: 'PRJ-2024-002',
      name: 'Mobile App Development',
      description: 'Native mobile apps for iOS and Android platforms',
      status: 'in-progress',
      progress: 45,
      priority: 'high',
      team: ['Sarah C', 'Michael R', 'Emily W'],
      deadline: '2024-05-30',
      tasks: { total: 32, completed: 14 },
      budget: 200000,
      spent: 85000,
      health: 'warning',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'PRJ-2024-003',
      name: 'API Integration Platform',
      description: 'Unified API gateway for third-party integrations',
      status: 'planning',
      progress: 15,
      priority: 'medium',
      team: ['David K', 'Lisa T', 'John M'],
      deadline: '2024-06-15',
      tasks: { total: 18, completed: 3 },
      budget: 120000,
      spent: 18000,
      health: 'good',
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 'PRJ-2024-004',
      name: 'Customer Analytics Suite',
      description: 'Advanced analytics and reporting dashboard',
      status: 'in-progress',
      progress: 60,
      priority: 'high',
      team: ['Michael R', 'Emily W', 'Sarah C'],
      deadline: '2024-04-30',
      tasks: { total: 28, completed: 17 },
      budget: 180000,
      spent: 108000,
      health: 'good',
      color: 'from-amber-500 to-orange-500'
    },
    {
      id: 'PRJ-2024-005',
      name: 'Security Enhancement',
      description: 'Implementation of advanced security features',
      status: 'review',
      progress: 90,
      priority: 'critical',
      team: ['David K', 'Alex M', 'Lisa T'],
      deadline: '2024-03-25',
      tasks: { total: 16, completed: 14 },
      budget: 90000,
      spent: 81000,
      health: 'good',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      id: 'PRJ-2024-006',
      name: 'Marketing Campaign Q2',
      description: 'Digital marketing campaign for Q2 2024',
      status: 'planning',
      progress: 10,
      priority: 'medium',
      team: ['Lisa T', 'John M', 'Emily W'],
      deadline: '2024-04-01',
      tasks: { total: 12, completed: 1 },
      budget: 75000,
      spent: 7500,
      health: 'warning',
      color: 'from-blue-500 to-indigo-500'
    }
  ]

  const projectStats = {
    active: 4,
    completed: 12,
    planned: 3,
    onHold: 1,
    totalBudget: 815000,
    totalSpent: 412000,
    completion: 68
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r 
            from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Projects
          </h1>
          <p className="text-white/40 text-sm flex items-center gap-2">
            <FiGrid className="w-4 h-4" />
            Track and manage your projects
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="h-11 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 
            text-white text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
            <FiPlus className="w-4 h-4" />
            New Project
          </button>
          <button className="h-11 px-4 rounded-xl bg-white/[0.02] border border-white/[0.03] 
            hover:bg-white/[0.03] transition-colors flex items-center gap-2 text-sm text-white/70">
            <FiDownload className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Project Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <GlassCard className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 
              flex items-center justify-center">
              <FiGrid className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white/90 mb-1">{projectStats.active}</div>
              <div className="text-sm text-white/40">Active Projects</div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 
              flex items-center justify-center">
              <FiCheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white/90 mb-1">{projectStats.completed}</div>
              <div className="text-sm text-white/40">Completed</div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 
              flex items-center justify-center">
              <FiClock className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white/90 mb-1">{projectStats.planned}</div>
              <div className="text-sm text-white/40">Upcoming</div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 
              flex items-center justify-center">
              <FiTarget className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white/90 mb-1">{projectStats.completion}%</div>
              <div className="text-sm text-white/40">Overall Progress</div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Filters & View Toggle */}
      <GlassCard className="p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${selectedView === 'grid' 
                ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-400 border border-indigo-500/30'
                : 'text-white/40 hover:text-white/60 hover:bg-white/5'}`}
              onClick={() => setSelectedView('grid')}>
              Grid View
            </button>
            <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${selectedView === 'board' 
                ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-400 border border-indigo-500/30'
                : 'text-white/40 hover:text-white/60 hover:bg-white/5'}`}
              onClick={() => setSelectedView('board')}>
              Board View
            </button>
            <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${selectedView === 'timeline' 
                ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-400 border border-indigo-500/30'
                : 'text-white/40 hover:text-white/60 hover:bg-white/5'}`}
              onClick={() => setSelectedView('timeline')}>
              Timeline
            </button>
          </div>

          <div className="flex items-center gap-2">
            <select className="h-10 px-4 rounded-lg bg-white/[0.02] border border-white/[0.03]
              focus:border-indigo-500/30 focus:outline-none text-sm text-white/70">
              <option>All Status</option>
              <option>In Progress</option>
              <option>Planning</option>
              <option>Review</option>
              <option>Completed</option>
            </select>
            
            <select className="h-10 px-4 rounded-lg bg-white/[0.02] border border-white/[0.03]
              focus:border-indigo-500/30 focus:outline-none text-sm text-white/70">
              <option>All Priority</option>
              <option>Critical</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>

            <button className="h-10 px-4 rounded-lg bg-white/[0.02] border border-white/[0.03] 
              hover:bg-white/[0.03] transition-colors flex items-center gap-2 text-sm text-white/70">
              <FiFilter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>
      </GlassCard>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project) => (
          <GlassCard key={project.id} className="p-6 group hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${project.color} 
                    flex items-center justify-center`}>
                    <FiGrid className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white/90">{project.name}</h4>
                    <p className="text-xs text-white/40">{project.id}</p>
                  </div>
                </div>
                <p className="text-sm text-white/60 mt-2">{project.description}</p>
              </div>
              <button className="p-2 rounded-lg hover:bg-white/5 transition-colors opacity-0 group-hover:opacity-100">
                <FiMoreVertical className="w-5 h-5 text-white/40" />
              </button>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <span className={`px-2 py-1 rounded-lg text-[10px] font-medium
                ${project.status === 'in-progress' ? 'bg-indigo-500/10 text-indigo-400' :
                  project.status === 'planning' ? 'bg-amber-500/10 text-amber-400' :
                  project.status === 'review' ? 'bg-purple-500/10 text-purple-400' :
                  'bg-emerald-500/10 text-emerald-400'}`}>
                {project.status.split('-').join(' ')}
              </span>
              <span className={`px-2 py-1 rounded-lg text-[10px] font-medium
                ${project.priority === 'critical' ? 'bg-rose-500/10 text-rose-400' :
                  project.priority === 'high' ? 'bg-orange-500/10 text-orange-400' :
                  'bg-emerald-500/10 text-emerald-400'}`}>
                {project.priority}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-white/40">Progress</span>
                  <span className="text-xs font-semibold text-white/90">{project.progress}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full bg-gradient-to-r ${project.color}`}
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <FiUsers className="w-4 h-4 text-white/40" />
                  <span className="text-white/60">{project.team.length} members</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCalendar className="w-4 h-4 text-white/40" />
                  <span className="text-white/60">Due {project.deadline}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="w-4 h-4 text-white/40" />
                  <span className="text-white/60">{project.tasks.completed}/{project.tasks.total} tasks</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiBarChart2 className="w-4 h-4 text-white/40" />
                  <span className="text-white/60">${(project.spent/1000).toFixed(1)}K/${(project.budget/1000).toFixed(1)}K</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-4 border-t border-white/[0.03]">
              <button className="flex-1 px-3 py-2 rounded-lg bg-white/[0.02] hover:bg-white/[0.03] 
                transition-colors text-sm text-white/70 flex items-center justify-center gap-2">
                <FiEye className="w-4 h-4" />
                Details
              </button>
              <button className="flex-1 px-3 py-2 rounded-lg bg-white/[0.02] hover:bg-white/[0.03] 
                transition-colors text-sm text-white/70 flex items-center justify-center gap-2">
                <FiEdit className="w-4 h-4" />
                Edit
              </button>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Timeline View (Simplified) */}
      {selectedView === 'timeline' && (
        <GlassCard className="p-6 mt-6">
          <h3 className="text-lg font-semibold text-white/90 mb-4">Project Timeline</h3>
          <div className="space-y-4">
            {projects.slice(0, 4).map((project) => (
              <div key={project.id} className="relative">
                <div className="flex items-center gap-4 mb-2">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${project.color}`} />
                  <span className="text-sm font-medium text-white/90">{project.name}</span>
                  <span className="text-xs text-white/40">{project.deadline}</span>
                </div>
                <div className="ml-6 h-8 relative">
                  <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-lg"
                    style={{ width: `${(new Date(project.deadline) - new Date()) / (1000 * 60 * 60 * 24 * 30) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      )}
    </div>
  )
}

export default ProjectsModule
