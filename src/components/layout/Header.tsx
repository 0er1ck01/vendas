import React from 'react';
import { Bell, Search } from 'lucide-react';

interface HeaderProps {
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ title = 'Painel' }) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-30">
      <div>
        <h1 className="text-xl font-bold text-slate-800">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Search bar mockup */}
        <div className="relative hidden md:block">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar vendas, produtos..."
            className="pl-9 pr-4 py-1.5 text-sm bg-slate-100 border border-transparent rounded-lg focus:outline-none focus:bg-white focus:border-blue-500 w-64 transition-all"
          />
        </div>

        {/* Notifications */}
        <button
          className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg relative"
          aria-label="Notificações"
        >
          <Bell size={18} />
          <span className="w-2 h-2 bg-blue-600 rounded-full absolute top-1.5 right-1.5" />
        </button>
      </div>
    </header>
  );
};

