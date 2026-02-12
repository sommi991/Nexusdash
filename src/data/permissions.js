// ============ NEXUS DASH - PERMISSIONS & ROLES ============

// Define all available permissions
export const PERMISSIONS = {
  // Dashboard
  VIEW_DASHBOARD: 'view_dashboard',
  EXPORT_DASHBOARD: 'export_dashboard',
  
  // Analytics
  VIEW_ANALYTICS: 'view_analytics',
  EXPORT_ANALYTICS: 'export_analytics',
  CREATE_REPORTS: 'create_reports',
  
  // Finance
  VIEW_FINANCE: 'view_finance',
  EXPORT_FINANCE: 'export_finance',
  MANAGE_TRANSACTIONS: 'manage_transactions',
  
  // Operations
  VIEW_OPERATIONS: 'view_operations',
  MANAGE_WORKFLOWS: 'manage_workflows',
  
  // Team
  VIEW_TEAM: 'view_team',
  MANAGE_TEAM: 'manage_team',
  INVITE_MEMBERS: 'invite_members',
  
  // Projects
  VIEW_PROJECTS: 'view_projects',
  CREATE_PROJECTS: 'create_projects',
  EDIT_PROJECTS: 'edit_projects',
  DELETE_PROJECTS: 'delete_projects',
  
  // Inventory
  VIEW_INVENTORY: 'view_inventory',
  MANAGE_INVENTORY: 'manage_inventory',
  REORDER_STOCK: 'reorder_stock',
  
  // Customers
  VIEW_CUSTOMERS: 'view_customers',
  MANAGE_CUSTOMERS: 'manage_customers',
  EXPORT_CUSTOMERS: 'export_customers',
  
  // Marketing
  VIEW_MARKETING: 'view_marketing',
  MANAGE_CAMPAIGNS: 'manage_campaigns',
  
  // Settings
  VIEW_SETTINGS: 'view_settings',
  MANAGE_SETTINGS: 'manage_settings',
  
  // System
  VIEW_LOGS: 'view_logs',
  MANAGE_SYSTEM: 'manage_system',
  
  // Super Admin Only
  MANAGE_ROLES: 'manage_roles',
  MANAGE_PERMISSIONS: 'manage_permissions'
}

// Role definitions with their permissions
export const ROLES = {
  super_admin: {
    id: 'super_admin',
    name: 'Super Administrator',
    description: 'Full system access with all permissions',
    level: 100,
    permissions: Object.values(PERMISSIONS) // All permissions
  },
  
  admin: {
    id: 'admin',
    name: 'Administrator',
    description: 'Full access except system management',
    level: 90,
    permissions: [
      PERMISSIONS.VIEW_DASHBOARD,
      PERMISSIONS.EXPORT_DASHBOARD,
      PERMISSIONS.VIEW_ANALYTICS,
      PERMISSIONS.EXPORT_ANALYTICS,
      PERMISSIONS.CREATE_REPORTS,
      PERMISSIONS.VIEW_FINANCE,
      PERMISSIONS.EXPORT_FINANCE,
      PERMISSIONS.MANAGE_TRANSACTIONS,
      PERMISSIONS.VIEW_OPERATIONS,
      PERMISSIONS.MANAGE_WORKFLOWS,
      PERMISSIONS.VIEW_TEAM,
      PERMISSIONS.MANAGE_TEAM,
      PERMISSIONS.INVITE_MEMBERS,
      PERMISSIONS.VIEW_PROJECTS,
      PERMISSIONS.CREATE_PROJECTS,
      PERMISSIONS.EDIT_PROJECTS,
      PERMISSIONS.DELETE_PROJECTS,
      PERMISSIONS.VIEW_INVENTORY,
      PERMISSIONS.MANAGE_INVENTORY,
      PERMISSIONS.REORDER_STOCK,
      PERMISSIONS.VIEW_CUSTOMERS,
      PERMISSIONS.MANAGE_CUSTOMERS,
      PERMISSIONS.EXPORT_CUSTOMERS,
      PERMISSIONS.VIEW_MARKETING,
      PERMISSIONS.MANAGE_CAMPAIGNS,
      PERMISSIONS.VIEW_SETTINGS,
      PERMISSIONS.MANAGE_SETTINGS,
      PERMISSIONS.VIEW_LOGS
    ]
  },
  
  manager: {
    id: 'manager',
    name: 'Manager',
    description: 'Department management access',
    level: 70,
    permissions: [
      PERMISSIONS.VIEW_DASHBOARD,
      PERMISSIONS.VIEW_ANALYTICS,
      PERMISSIONS.EXPORT_ANALYTICS,
      PERMISSIONS.CREATE_REPORTS,
      PERMISSIONS.VIEW_FINANCE,
      PERMISSIONS.VIEW_OPERATIONS,
      PERMISSIONS.MANAGE_WORKFLOWS,
      PERMISSIONS.VIEW_TEAM,
      PERMISSIONS.VIEW_PROJECTS,
      PERMISSIONS.CREATE_PROJECTS,
      PERMISSIONS.EDIT_PROJECTS,
      PERMISSIONS.VIEW_INVENTORY,
      PERMISSIONS.MANAGE_INVENTORY,
      PERMISSIONS.REORDER_STOCK,
      PERMISSIONS.VIEW_CUSTOMERS,
      PERMISSIONS.VIEW_MARKETING,
      PERMISSIONS.VIEW_SETTINGS
    ]
  },
  
  editor: {
    id: 'editor',
    name: 'Editor',
    description: 'Content and project editing',
    level: 50,
    permissions: [
      PERMISSIONS.VIEW_DASHBOARD,
      PERMISSIONS.VIEW_ANALYTICS,
      PERMISSIONS.VIEW_OPERATIONS,
      PERMISSIONS.VIEW_TEAM,
      PERMISSIONS.VIEW_PROJECTS,
      PERMISSIONS.EDIT_PROJECTS,
      PERMISSIONS.VIEW_INVENTORY,
      PERMISSIONS.VIEW_CUSTOMERS,
      PERMISSIONS.VIEW_MARKETING,
      PERMISSIONS.VIEW_SETTINGS
    ]
  },
  
  viewer: {
    id: 'viewer',
    name: 'Viewer',
    description: 'Read-only access',
    level: 30,
    permissions: [
      PERMISSIONS.VIEW_DASHBOARD,
      PERMISSIONS.VIEW_ANALYTICS,
      PERMISSIONS.VIEW_OPERATIONS,
      PERMISSIONS.VIEW_TEAM,
      PERMISSIONS.VIEW_PROJECTS,
      PERMISSIONS.VIEW_INVENTORY,
      PERMISSIONS.VIEW_CUSTOMERS,
      PERMISSIONS.VIEW_MARKETING,
      PERMISSIONS.VIEW_SETTINGS
    ]
  },
  
  customer: {
    id: 'customer',
    name: 'Customer',
    description: 'Limited customer portal access',
    level: 10,
    permissions: [
      PERMISSIONS.VIEW_DASHBOARD,
      PERMISSIONS.VIEW_PROJECTS
    ]
  }
}

// Permission groups for UI organization
export const PERMISSION_GROUPS = [
  {
    name: 'Dashboard',
    permissions: [
      PERMISSIONS.VIEW_DASHBOARD,
      PERMISSIONS.EXPORT_DASHBOARD
    ]
  },
  {
    name: 'Analytics',
    permissions: [
      PERMISSIONS.VIEW_ANALYTICS,
      PERMISSIONS.EXPORT_ANALYTICS,
      PERMISSIONS.CREATE_REPORTS
    ]
  },
  {
    name: 'Finance',
    permissions: [
      PERMISSIONS.VIEW_FINANCE,
      PERMISSIONS.EXPORT_FINANCE,
      PERMISSIONS.MANAGE_TRANSACTIONS
    ]
  },
  {
    name: 'Operations',
    permissions: [
      PERMISSIONS.VIEW_OPERATIONS,
      PERMISSIONS.MANAGE_WORKFLOWS
    ]
  },
  {
    name: 'Team',
    permissions: [
      PERMISSIONS.VIEW_TEAM,
      PERMISSIONS.MANAGE_TEAM,
      PERMISSIONS.INVITE_MEMBERS
    ]
  },
  {
    name: 'Projects',
    permissions: [
      PERMISSIONS.VIEW_PROJECTS,
      PERMISSIONS.CREATE_PROJECTS,
      PERMISSIONS.EDIT_PROJECTS,
      PERMISSIONS.DELETE_PROJECTS
    ]
  },
  {
    name: 'Inventory',
    permissions: [
      PERMISSIONS.VIEW_INVENTORY,
      PERMISSIONS.MANAGE_INVENTORY,
      PERMISSIONS.REORDER_STOCK
    ]
  },
  {
    name: 'Customers',
    permissions: [
      PERMISSIONS.VIEW_CUSTOMERS,
      PERMISSIONS.MANAGE_CUSTOMERS,
      PERMISSIONS.EXPORT_CUSTOMERS
    ]
  },
  {
    name: 'Marketing',
    permissions: [
      PERMISSIONS.VIEW_MARKETING,
      PERMISSIONS.MANAGE_CAMPAIGNS
    ]
  },
  {
    name: 'Settings',
    permissions: [
      PERMISSIONS.VIEW_SETTINGS,
      PERMISSIONS.MANAGE_SETTINGS
    ]
  },
  {
    name: 'System',
    permissions: [
      PERMISSIONS.VIEW_LOGS,
      PERMISSIONS.MANAGE_SYSTEM
    ]
  }
]

// Helper function to check if a user has a specific permission
export const hasPermission = (user, permission) => {
  if (!user || !user.role) return false
  const role = ROLES[user.role]
  if (!role) return false
  return role.permissions.includes(permission)
}

// Helper function to check if a user has any of the specified permissions
export const hasAnyPermission = (user, permissions) => {
  if (!user || !user.role) return false
  const role = ROLES[user.role]
  if (!role) return false
  return permissions.some(p => role.permissions.includes(p))
}

// Helper function to check if a user has all of the specified permissions
export const hasAllPermissions = (user, permissions) => {
  if (!user || !user.role) return false
  const role = ROLES[user.role]
  if (!role) return false
  return permissions.every(p => role.permissions.includes(p))
}

export default {
  PERMISSIONS,
  ROLES,
  PERMISSION_GROUPS,
  hasPermission,
  hasAnyPermission,
  hasAllPermissions
}
