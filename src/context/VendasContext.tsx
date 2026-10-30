import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { Venda, Produto, Cliente, MetricasDashboard, StatusVenda, ItemVenda } from '../types';
import { mockVendas, mockProdutos, mockClientes } from '../services/mockData';

interface VendasContextType {
  vendas: Venda[];
  produtos: Produto[];
  clientes: Cliente[];
  metricas: MetricasDashboard;
  adicionarVenda: (venda: Omit<Venda, 'id' | 'data'>) => void;
  atualizarStatusVenda: (id: string, status: StatusVenda) => void;
  adicionarProduto: (produto: Omit<Produto, 'id'>) => void;
  adicionarCliente: (cliente: Omit<Cliente, 'id' | 'dataCadastro'>) => void;
}

const VendasContext = createContext<VendasContextType | undefined>(undefined);

export const VendasProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [vendas, setVendas] = useState<Venda[]>(mockVendas);
  const [produtos, setProdutos] = useState<Produto[]>(mockProdutos);
  const [clientes, setClientes] = useState<Cliente[]>(mockClientes);

  const metricas = useMemo<MetricasDashboard>(() => {
    const totalVendas = vendas.length;
    const receitaTotal = vendas
      .filter((v) => v.status === 'pago')
      .reduce((acc, v) => acc + v.total, 0);
    const ticketMedio = totalVendas > 0 ? receitaTotal / (vendas.filter(v => v.status === 'pago').length || 1) : 0;
    const totalClientes = clientes.length;
    const produtosBaixoEstoque = produtos.filter((p) => p.estoque <= 5).length;

    return {
      totalVendas,
      receitaTotal,
      ticketMedio,
      totalClientes,
      produtosBaixoEstoque,
    };
  }, [vendas, produtos, clientes]);

  const adicionarVenda = (novaVenda: Omit<Venda, 'id' | 'data'>) => {
    const venda: Venda = {
      ...novaVenda,
      id: `ven-${Date.now().toString().slice(-4)}`,
      data: new Date().toISOString().split('T')[0],
    };
    setVendas((prev) => [venda, ...prev]);

    // Reduz estoque dos produtos vendidos
    setProdutos((prev) =>
      prev.map((prod) => {
        const item = novaVenda.itens.find((i: ItemVenda) => i.produtoId === prod.id);
        if (item) {
          return { ...prod, estoque: Math.max(0, prod.estoque - item.quantidade) };
        }
        return prod;
      })
    );
  };

  const atualizarStatusVenda = (id: string, status: StatusVenda) => {
    setVendas((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status } : v))
    );
  };

  const adicionarProduto = (novoProd: Omit<Produto, 'id'>) => {
    const prod: Produto = {
      ...novoProd,
      id: `prod-${Date.now().toString().slice(-4)}`,
    };
    setProdutos((prev) => [prod, ...prev]);
  };

  const adicionarCliente = (novoCli: Omit<Cliente, 'id' | 'dataCadastro'>) => {
    const cli: Cliente = {
      ...novoCli,
      id: `cli-${Date.now().toString().slice(-4)}`,
      dataCadastro: new Date().toISOString().split('T')[0],
    };
    setClientes((prev) => [cli, ...prev]);
  };

  return (
    <VendasContext.Provider
      value={{
        vendas,
        produtos,
        clientes,
        metricas,
        adicionarVenda,
        atualizarStatusVenda,
        adicionarProduto,
        adicionarCliente,
      }}
    >
      {children}
    </VendasContext.Provider>
  );
};

export const useVendasContext = (): VendasContextType => {
  const context = useContext(VendasContext);
  if (!context) {
    throw new Error('useVendasContext deve ser usado dentro de um VendasProvider');
  }
  return context;
};

