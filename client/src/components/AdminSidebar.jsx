import React from 'react';
import { LayoutDashboard, PackagePlus, ShoppingCart, ShieldAlert, Store, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminSidebar = ({ activeTab, setActiveTab }) => {
  const { logout } = useAuth();

  const navItems = [
    { id: 'overview', label: 'Boutique Overview', icon: LayoutDashboard },
    { id: 'products', label: 'Product Inventory', icon: PackagePlus },
    { id: 'orders', label: 'Customer Orders', icon: ShoppingCart },
    { id: 'alerts', label: 'Low Stock Alerts', icon: ShieldAlert },
  ];

  return (
    <aside className="w-64 glass-panel border-r border-slate-800 p-6 flex flex-col justify-between min-h-[calc(100vh-80px)]">
      <div className="space-y-6">
        
        {/* Title Header */}
        <div className="pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">
            <Store className="w-4 h-4" /> Management Console
          </div>
          <h2 className="font-serif-luxury text-slate-100 font-bold text-lg">Boutique Admin</h2>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isSelected = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-amber-500/10 border border-amber-500/40 text-amber-300 shadow-md shadow-amber-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-slate-400'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

      </div>

      {/* Logout Footer */}
      <div className="pt-4 border-t border-slate-800">
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 text-xs font-semibold hover:text-rose-400 hover:border-rose-500/30 transition"
        >
          <LogOut className="w-4 h-4" /> Exit Admin Session
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
