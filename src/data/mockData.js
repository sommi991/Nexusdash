// ============ NEXUS DASH - COMPLETE MOCK DATABASE ============

export const mockData = {
  // ============ USERS ============
  users: [
    {
      id: 'USR-001',
      name: 'Alex Morgan',
      email: 'alex@nexusdash.com',
      role: 'super_admin',
      avatar: null,
      status: 'active',
      lastActive: '2024-03-15T10:30:00Z',
      joinDate: '2023-01-15',
      preferences: {
        theme: 'dark',
        notifications: true,
        sidebarCollapsed: false
      }
    },
    {
      id: 'USR-002',
      name: 'Sarah Chen',
      email: 'sarah@nexusdash.com',
      role: 'admin',
      avatar: null,
      status: 'active',
      lastActive: '2024-03-15T09:45:00Z',
      joinDate: '2023-03-20',
      preferences: {
        theme: 'dark',
        notifications: true,
        sidebarCollapsed: true
      }
    },
    {
      id: 'USR-003',
      name: 'Michael Rodriguez',
      email: 'michael@nexusdash.com',
      role: 'manager',
      avatar: null,
      status: 'active',
      lastActive: '2024-03-15T08:15:00Z',
      joinDate: '2023-06-10',
      preferences: {
        theme: 'light',
        notifications: false,
        sidebarCollapsed: false
      }
    },
    {
      id: 'USR-004',
      name: 'Emily Watson',
      email: 'emily@nexusdash.com',
      role: 'editor',
      avatar: null,
      status: 'away',
      lastActive: '2024-03-15T11:00:00Z',
      joinDate: '2023-09-05',
      preferences: {
        theme: 'dark',
        notifications: true,
        sidebarCollapsed: false
      }
    },
    {
      id: 'USR-005',
      name: 'David Kim',
      email: 'david@nexusdash.com',
      role: 'viewer',
      avatar: null,
      status: 'offline',
      lastActive: '2024-03-14T16:20:00Z',
      joinDate: '2024-01-12',
      preferences: {
        theme: 'dark',
        notifications: true,
        sidebarCollapsed: true
      }
    }
  ],

  // ============ PRODUCTS ============
  products: [
    {
      id: 'PRD-001',
      name: 'Premium Wireless Headphones',
      category: 'Electronics',
      price: 299.99,
      cost: 180.00,
      stock: 45,
      sku: 'ELEC-001',
      status: 'active',
      sales: 1248,
      revenue: 374351,
      rating: 4.8,
      reviews: 342,
      createdAt: '2024-01-15'
    },
    {
      id: 'PRD-002',
      name: 'Smart Fitness Watch',
      category: 'Wearables',
      price: 199.99,
      cost: 120.00,
      stock: 28,
      sku: 'WEAR-002',
      status: 'active',
      sales: 892,
      revenue: 178391,
      rating: 4.6,
      reviews: 256,
      createdAt: '2024-01-20'
    },
    {
      id: 'PRD-003',
      name: 'Organic Coffee Beans',
      category: 'Food & Beverage',
      price: 24.99,
      cost: 12.50,
      stock: 156,
      sku: 'FOOD-003',
      status: 'active',
      sales: 2156,
      revenue: 53874,
      rating: 4.9,
      reviews: 567,
      createdAt: '2024-01-10'
    },
    {
      id: 'PRD-004',
      name: 'Yoga Mat Premium',
      category: 'Fitness',
      price: 49.99,
      cost: 25.00,
      stock: 12,
      sku: 'FIT-004',
      status: 'low_stock',
      sales: 745,
      revenue: 37243,
      rating: 4.7,
      reviews: 189,
      createdAt: '2024-02-01'
    },
    {
      id: 'PRD-005',
      name: 'Bluetooth Speaker',
      category: 'Electronics',
      price: 89.99,
      cost: 45.00,
      stock: 0,
      sku: 'ELEC-005',
      status: 'out_of_stock',
      sales: 623,
      revenue: 56023,
      rating: 4.5,
      reviews: 178,
      createdAt: '2024-02-10'
    },
    {
      id: 'PRD-006',
      name: 'Phone Case',
      category: 'Accessories',
      price: 29.99,
      cost: 12.00,
      stock: 89,
      sku: 'ACC-006',
      status: 'active',
      sales: 445,
      revenue: 13345,
      rating: 4.3,
      reviews: 98,
      createdAt: '2024-02-15'
    }
  ],

  // ============ ORDERS ============
  orders: [
    {
      id: 'ORD-7842',
      customer: 'John Smith',
      email: 'john@example.com',
      date: '2024-03-15',
      amount: 1248.00,
      status: 'delivered',
      items: 3,
      paymentMethod: 'Credit Card'
    },
    {
      id: 'ORD-7841',
      customer: 'Sarah Johnson',
      email: 'sarah@example.com',
      date: '2024-03-15',
      amount: 845.50,
      status: 'processing',
      items: 2,
      paymentMethod: 'PayPal'
    },
    {
      id: 'ORD-7840',
      customer: 'Michael Brown',
      email: 'michael@example.com',
      date: '2024-03-14',
      amount: 299.99,
      status: 'shipped',
      items: 1,
      paymentMethod: 'Credit Card'
    },
    {
      id: 'ORD-7839',
      customer: 'Emma Wilson',
      email: 'emma@example.com',
      date: '2024-03-14',
      amount: 1567.80,
      status: 'pending',
      items: 4,
      paymentMethod: 'Bank Transfer'
    },
    {
      id: 'ORD-7838',
      customer: 'David Lee',
      email: 'david@example.com',
      date: '2024-03-13',
      amount: 89.99,
      status: 'delivered',
      items: 1,
      paymentMethod: 'Apple Pay'
    }
  ],

  // ============ CUSTOMERS ============
  customers: [
    {
      id: 'CUST-001',
      name: 'John Smith',
      email: 'john@example.com',
      phone: '+1 555-0123',
      orders: 12,
      spent: 4852.50,
      lastOrder: '2024-03-15',
      status: 'active',
      segment: 'vip',
      joinDate: '2023-06-15'
    },
    {
      id: 'CUST-002',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      phone: '+1 555-0456',
      orders: 8,
      spent: 3245.75,
      lastOrder: '2024-03-15',
      status: 'active',
      segment: 'regular',
      joinDate: '2023-08-22'
    },
    {
      id: 'CUST-003',
      name: 'Michael Brown',
      email: 'michael@example.com',
      phone: '+1 555-0789',
      orders: 15,
      spent: 6780.25,
      lastOrder: '2024-03-14',
      status: 'active',
      segment: 'wholesale',
      joinDate: '2023-03-10'
    },
    {
      id: 'CUST-004',
      name: 'Emma Wilson',
      email: 'emma@example.com',
      phone: '+1 555-0987',
      orders: 3,
      spent: 450.00,
      lastOrder: '2024-03-10',
      status: 'active',
      segment: 'new',
      joinDate: '2024-03-01'
    }
  ],

  // ============ PROJECTS ============
  projects: [
    {
      id: 'PRJ-001',
      name: 'Nexus Dash 2.0',
      status: 'in-progress',
      progress: 75,
      priority: 'high',
      team: ['Alex Morgan', 'Sarah Chen', 'David Kim'],
      deadline: '2024-04-15',
      tasks: 24,
      completed: 18,
      budget: 150000,
      spent: 112500
    },
    {
      id: 'PRJ-002',
      name: 'Mobile App Development',
      status: 'in-progress',
      progress: 45,
      priority: 'high',
      team: ['Sarah Chen', 'Michael Rodriguez', 'Emily Watson'],
      deadline: '2024-05-30',
      tasks: 32,
      completed: 14,
      budget: 200000,
      spent: 85000
    },
    {
      id: 'PRJ-003',
      name: 'API Integration Platform',
      status: 'planning',
      progress: 15,
      priority: 'medium',
      team: ['David Kim', 'Emily Watson'],
      deadline: '2024-06-15',
      tasks: 18,
      completed: 3,
      budget: 120000,
      spent: 18000
    }
  ],

  // ============ TEAM ============
  team: [
    {
      id: 'EMP-001',
      name: 'Alex Morgan',
      role: 'CEO & Founder',
      department: 'Executive',
      email: 'alex@nexusdash.com',
      status: 'active',
      performance: 98,
      projects: 12
    },
    {
      id: 'EMP-002',
      name: 'Sarah Chen',
      role: 'CTO',
      department: 'Engineering',
      email: 'sarah@nexusdash.com',
      status: 'active',
      performance: 96,
      projects: 8
    },
    {
      id: 'EMP-003',
      name: 'Michael Rodriguez',
      role: 'Head of Product',
      department: 'Product',
      email: 'michael@nexusdash.com',
      status: 'active',
      performance: 94,
      projects: 10
    },
    {
      id: 'EMP-004',
      name: 'Emily Watson',
      role: 'Lead Designer',
      department: 'Design',
      email: 'emily@nexusdash.com',
      status: 'active',
      performance: 97,
      projects: 6
    }
  ],

  // ============ INVENTORY ============
  inventory: {
    totalItems: 481,
    totalValue: 210500,
    lowStock: 8,
    outOfStock: 3,
    incoming: 1245,
    turnover: 6.8,
    categories: [
      { name: 'Electronics', count: 124, value: 89200 },
      { name: 'Wearables', count: 45, value: 34500 },
      { name: 'Fitness', count: 67, value: 28900 },
      { name: 'Food & Beverage', count: 89, value: 15600 },
      { name: 'Accessories', count: 156, value: 42300 }
    ]
  },

  // ============ FINANCE ============
  finance: {
    revenue: 425890,
    expenses: 284500,
    profit: 141390,
    margin: 33.2,
    cashFlow: 98500,
    burnRate: 42500,
    transactions: [
      { id: 'TR-001', description: 'Client Payment - Acme Corp', amount: 12500, type: 'credit', date: '2024-03-15' },
      { id: 'TR-002', description: 'Office Supplies', amount: 845, type: 'debit', date: '2024-03-14' },
      { id: 'TR-003', description: 'AWS Cloud Services', amount: 2340, type: 'debit', date: '2024-03-13' },
      { id: 'TR-004', description: 'Payroll - March', amount: 45200, type: 'debit', date: '2024-03-12' }
    ]
  },

  // ============ MARKETING ============
  marketing: {
    campaigns: [
      { id: 'CAMP-001', name: 'Spring Sale 2024', status: 'active', reach: 12500, conversion: 3.1, revenue: 45200 },
      { id: 'CAMP-002', name: 'New Product Launch', status: 'active', reach: 45000, conversion: 2.4, revenue: 67800 },
      { id: 'CAMP-003', name: 'Customer Appreciation', status: 'scheduled', reach: 0, conversion: 0, revenue: 0 }
    ],
    channels: [
      { name: 'Email', percentage: 45, revenue: 105525 },
      { name: 'Social Media', percentage: 30, revenue: 70350 },
      { name: 'Push Notifications', percentage: 15, revenue: 35175 },
      { name: 'SMS', percentage: 10, revenue: 23450 }
    ]
  },

  // ============ ANALYTICS ============
  analytics: {
    visitors: 12450,
    pageViews: 45200,
    bounceRate: 32.5,
    avgSession: 184,
    topPages: [
      { path: '/dashboard', views: 12450 },
      { path: '/products', views: 8900 },
      { path: '/analytics', views: 6700 },
      { path: '/customers', views: 5400 }
    ]
  },

  // ============ NOTIFICATIONS ============
  notifications: [
    {
      id: 'NOT-001',
      type: 'order',
      title: 'New Order Received',
      message: 'Order #ORD-7842 from John Smith',
      time: '2 minutes ago',
      read: false
    },
    {
      id: 'NOT-002',
      type: 'inventory',
      title: 'Low Stock Alert',
      message: 'Premium Headphones - Only 5 units left',
      time: '15 minutes ago',
      read: false
    },
    {
      id: 'NOT-003',
      type: 'customer',
      title: 'New Customer Registered',
      message: 'Emma Wilson just created an account',
      time: '1 hour ago',
      read: true
    }
  ],

  // ============ ACTIVITY LOG ============
  activityLog: [
    {
      id: 'ACT-001',
      user: 'Alex Morgan',
      action: 'Updated product PRD-001',
      timestamp: '2024-03-15T10:30:00Z',
      ip: '192.168.1.100'
    },
    {
      id: 'ACT-002',
      user: 'Sarah Chen',
      action: 'Processed order ORD-7842',
      timestamp: '2024-03-15T09:45:00Z',
      ip: '192.168.1.101'
    },
    {
      id: 'ACT-003',
      user: 'Michael Rodriguez',
      action: 'Created new project PRJ-003',
      timestamp: '2024-03-15T08:15:00Z',
      ip: '192.168.1.102'
    }
  ]
}

export default mockData
