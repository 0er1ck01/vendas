import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { StoreFront } from './pages/StoreFront';
import { Layout } from './components/layout/Layout';
import { DashboardPage } from './pages/Dashboard';
import { VendasPage } from './pages/Vendas';
import { ProdutosPage } from './pages/Produtos';
import { ClientesPage } from './pages/Clientes';

export const App: React.FC = () => {
  return (
    <Routes>
      {/* Loja Principal E-commerce Protech (Modelo de Referência) */}
      <Route path="/" element={<StoreFront />} />

      {/* Painel Administrativo de Gestão */}
      <Route path="/admin" element={<Layout />}>
        <Route index element={<DashboardPage />} />
        <Route path="vendas" element={<VendasPage />} />
        <Route path="produtos" element={<ProdutosPage />} />
        <Route path="clientes" element={<ClientesPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
