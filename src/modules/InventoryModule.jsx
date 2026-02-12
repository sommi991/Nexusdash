import React, { useState } from 'react'
import {
  FiPackage, FiBox, FiAlertCircle, FiCheckCircle,
  FiTrendingUp, FiTrendingDown, FiClock, FiCalendar,
  FiBarChart2, FiDownload, FiFilter, FiSearch,
  FiPlus, FiEdit, FiTrash2, FiEye, FiMoreVertical,
  FiZap, FiTarget, FiArchive, FiTruck, FiDollarSign
} from 'react-icons/fi'
import { GlassCard } from '../components/core/GlassCard'

const InventoryModule = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const inventoryItems = [
    {
      id: 'PRD-001',
      name: 'Premium Wireless Headphones',
      sku: 'ELEC-001',
      category: 'Electronics',
      price: 299.99,
      cost: 180.00,
      stock: 45,
      reserved: 12,
      available: 33,
      reorderPoint: 20,
      status: 'in-stock',
      location: 'Warehouse A',
      supplier: 'TechSupply Co',
      lastOrder: '2024-03-10',
      turnover: 4.5
    },
    {
      id: 'PRD-002',
      name: 'Smart Fitness Watch',
      sku: 'WEAR-002',
      category: 'Wearables',
      price: 199.99,
      cost: 120.00,
      stock: 8,
      reserved: 3,
      available: 5,
      reorderPoint: 15,
      status: 'low-stock',
      location: 'Warehouse A',
      supplier: 'TechSupply Co',
      lastOrder: '2024-03-08',
      turnover: 6.2
    },
    {
      id: 'PRD-003',
      name: 'Organic Coffee Beans',
      sku: 'FOOD-003',
      category: 'Food & Beverage',
      price: 24.99,
      cost: 12.50,
      stock: 156,
      reserved: 28,
      available: 128,
      reorderPoint: 50,
      status: 'in-stock',
      location: 'Warehouse B',
      supplier: 'Organic Farms',
      lastOrder: '2024-03-12',
      turnover: 8.1
    },
    {
      id: 'PRD-004',
      name: 'Yoga Mat Premium',
      sku: 'FIT-004',
      category: 'Fitness',
      price: 49.99,
      cost: 25.00,
      stock: 12,
      reserved: 5,
      available: 7,
      reorderPoint: 20,
      status: 'low-stock',
      location: 'Warehouse A',
      supplier: 'Fitness Direct',
      lastOrder: '2024-03-05',
      turnover: 5.8
    },
    {
      id: 'PRD-005',
      name: 'Bluetooth Speaker',
      sku: 'ELEC-005',
      category: 'Electronics',
      price: 89.99,
      cost: 45.00,
      stock: 0,
      reserved: 0,
      available: 0,
      reorderPoint: 15,
      status: 'out-of-stock',
      location: 'Warehouse A',
      supplier: 'TechSupply Co',
      lastOrder: '2024-02-28',
      turnover: 7.3
    },
    {
      id: 'PRD-006',
      name: 'Phone Case',
      sku: 'ACC-006',
      category: 'Accessories',
      price: 29.99,
      cost: 12.00,
      stock: 89,
      reserved: 14,
      available: 75,
      reorderPoint: 30,
      status: 'in-stock',
      location: 'Warehouse C',
      supplier: 'Accessory World',
      lastOrder: '2024-03-14',
      turnover: 9.2
    }
  ]

  const categories = [
    { name: 'Electronics', count: 124, value: 89200, color: 'from-indigo-500 to-purple-500' },
    { name: 'Wearables', count: 45, value: 34500, color: 'from-purple-500 to-pink-500' },
    { name: 'Fitness', count: 67, value: 28900, color: 'from-pink-500 to-rose-500' },
    { name: 'Food & Beverage', count: 89, value: 15600, color: 'from-amber-500 to-orange-500' },
    { name: 'Accessories', count: 156, value: 42300, color: 'from-emerald-500 to-teal-500' },
  ]

  const stats = {
    totalItems: 481,
    totalValue: 210500,
    lowStock: 8,
    outOfStock: 3,
    incoming: 1245,
    turnover: 6.8
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r 
            from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Inventory
          </h1>
          <p className="text-white/40 text-sm flex items-center gap-2">
            <FiPackage className="w-4 h-4" />
            Manage stock and track inventory levels
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="h-11 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 
            text-white text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
            <FiPlus className="w-4 h-4" />
            Add Product
          </button>
          <button className="h-11 px-4 rounded-xl bg-white/[0.02] border border-white/[0.03] 
            hover:bg-white/[0.03] transition-colors flex items-center gap-2 text-sm text-white/70">
            <FiDownload className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Inventory Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
        <GlassCard className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 
              flex items-center justify-center">
              <FiBox className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white/90 mb-1">{stats.totalItems}</div>
              <div className="text-sm text-white/40">Total Items</div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 
              flex items-center justify-center">
              <FiDollarSign className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white/90 mb-1">${(stats.totalValue / 1000).toFixed(1)}K</div>
              <div className="text-sm text-white/40">Inventory Value</div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 
              flex items-center justify-center">
              <FiAlertCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white/90 mb-1">{stats.lowStock}</div>
              <div className="text-sm text-white/40">Low Stock</div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-red-500 
              flex items-center justify-center">
              <FiPackage className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white/90 mb-1">{stats.outOfStock}</div>
              <div className="text-sm text-white/40">Out of Stock</div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 
              flex items-center justify-center">
              <FiTruck className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white/90 mb-1">{stats.incoming}</div>
              <div className="text-sm text-white/40">Incoming</div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 
              flex items-center justify-center">
              <FiTrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white/90 mb-1">{stats.turnover}x</div>
              <div className="text-sm text-white/40">Turnover Rate</div>
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
              placeholder="Search products by name, SKU, category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-11 pr-4 rounded-xl bg-white/[0.02] border border-white/[0.03]
                focus:border-indigo-500/30 focus:outline-none text-sm text-white/90
                placeholder:text-white/40 transition-colors"
            />
          </div>
          
          <select className="h-11 px-4 rounded-xl bg-white/[0.02] border border-white/[0.03]
            focus:border-indigo-500/30 focus:outline-none text-sm text-white/70">
            <option>All Categories</option>
            {categories.map(cat => <option key={cat.name}>{cat.name}</option>)}
          </select>
          
          <select className="h-11 px-4 rounded-xl bg-white/[0.02] border border-white/[0.03]
            focus:border-indigo-500/30 focus:outline-none text-sm text-white/70">
            <option>All Status</option>
            <option>In Stock</option>
            <option>Low Stock</option>
            <option>Out of Stock</option>
          </select>
          
          <button className="h-11 px-4 rounded-xl bg-white/[0.02] border border-white/[0.03] 
            hover:bg-white/[0.03] transition-colors flex items-center gap-2 text-sm text-white/70">
            <FiFilter className="w-4 h-4" />
            More Filters
          </button>
        </div>
      </GlassCard>

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {categories.map((category) => (
          <GlassCard key={category.name} className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.color} 
                flex items-center justify-center opacity-20`} />
              <div>
                <div className="text-sm font-medium text-white/90">{category.name}</div>
                <div className="text-xs text-white/40">{category.count} items</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/40">Value</span>
              <span className="text-sm font-semibold text-white/90">${(category.value / 1000).toFixed(1)}K</span>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Inventory Table */}
      <GlassCard className="p-6">
        <h3 className="text-lg font-semibold text-white/90 mb-4">Current Stock</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.03]">
                <th className="py-4 text-left text-xs font-medium text-white/40 uppercase tracking-wider">Product</th>
                <th className="py-4 text-left text-xs font-medium text-white/40 uppercase tracking-wider">SKU</th>
                <th className="py-4 text-left text-xs font-medium text-white/40 uppercase tracking-wider">Category</th>
                <th className="py-4 text-left text-xs font-medium text-white/40 uppercase tracking-wider">Price</th>
                <th className="py-4 text-left text-xs font-medium text-white/40 uppercase tracking-wider">Stock</th>
                <th className="py-4 text-left text-xs font-medium text-white/40 uppercase tracking-wider">Available</th>
                <th className="py-4 text-left text-xs font-medium text-white/40 uppercase tracking-wider">Status</th>
                <th className="py-4 text-left text-xs font-medium text-white/40 uppercase tracking-wider">Location</th>
                <th className="py-4 text-left text-xs font-medium text-white/40 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody>
              {inventoryItems.map((item) => (
                <tr key={item.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                  <td className="py-4">
                    <div>
                      <div className="text-sm font-medium text-white/90">{item.name}</div>
                      <div className="text-xs text-white/40 mt-1">{item.id}</div>
                    </div>
                  </td>
                  <td className="py-4 text-sm text-white/60">{item.sku}</td>
                  <td className="py-4 text-sm text-white/60">{item.category}</td>
                  <td className="py-4 text-sm font-semibold text-white/90">${item.price}</td>
                  <td className="py-4">
                    <span className={`text-sm font-semibold
                      ${item.stock > item.reorderPoint ? 'text-emerald-400' :
                        item.stock > 0 ? 'text-amber-400' : 'text-rose-400'}`}>
                      {item.stock}
                    </span>
                  </td>
                  <td className="py-4 text-sm text-white/60">{item.available}</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-lg text-[10px] font-medium
                      ${item.status === 'in-stock' ? 'bg-emerald-500/10 text-emerald-400' :
                        item.status === 'low-stock' ? 'bg-amber-500/10 text-amber-400' :
                        'bg-rose-500/10 text-rose-400'}`}>
                      {item.status.split('-').join(' ')}
                    </span>
                  </td>
                  <td className="py-4 text-sm text-white/60">{item.location}</td>
                  <td className="py-4">
                    <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                      <FiMoreVertical className="w-4 h-4 text-white/40" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Reorder Alerts */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-white/90 mb-1">Reorder Alerts</h3>
            <p className="text-sm text-white/40">Items below reorder point</p>
          </div>
          <button className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {inventoryItems.filter(i => i.status !== 'in-stock').map((item) => (
            <div key={item.id} className="p-4 rounded-xl bg-white/[0.02] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center
                  ${item.status === 'low-stock' ? 'bg-amber-500/10' : 'bg-rose-500/10'}`}>
                  <FiAlertCircle className={`w-5 h-5
                    ${item.status === 'low-stock' ? 'text-amber-400' : 'text-rose-400'}`} />
                </div>
                <div>
                  <div className="text-sm font-medium text-white/90">{item.name}</div>
                  <div className="text-xs text-white/40">Stock: {item.stock} / Min: {item.reorderPoint}</div>
                </div>
              </div>
              <button className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 
                text-white text-xs font-medium hover:opacity-90 transition-opacity">
                Reorder
              </button>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}

export default InventoryModule
