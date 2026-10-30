import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const Layout: React.FC = () => {
  const location = useLocation();

  const getPageTitle = (pathname: string): string => {
    switch (pathname) {
      case '/':
        return 'Dashboard de Vendas';
      case '/vendas':
        return 'Gestão de Vendas';
      case '/produtos':
        return 'Catálogo de Produtos';
      case '/clientes':
        return 'Carteira de Clientes';
      default:
        return 'Sistema de Vendas';
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header title={getPageTitle(location.pathname)} />
        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

