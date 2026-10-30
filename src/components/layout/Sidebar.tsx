import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, Package, Users, Store } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const navItems = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/vendas', label: 'Vendas', icon: ShoppingCart },
    { to: '/produtos', label: 'Produtos', icon: Package },
    { to: '/clientes', label: 'Clientes', icon: Users },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 min-h-screen">
      {/* Brand Header */}
      <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-800">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
          <Store size={20} />
        </div>
        <span className="font-bold text-white text-lg tracking-tight">VendasPro</span>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        <div className="px-2 pb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Menu Principal
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`
              }
            >
              <Icon size={18} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      {/* User / Footer info */}
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 px-2">
          <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center text-white font-semibold text-xs">
            OP
          </div>
          <div className="truncate">
            <p className="text-xs font-semibold text-white">Operador</p>
            <p className="text-xs text-slate-500 truncate">vendas@empresa.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

