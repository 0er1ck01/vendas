import React from 'react';
import { DollarSign, ShoppingCart, TrendingUp, AlertTriangle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useVendasContext } from '../../context/VendasContext';
import { StatCard } from '../../components/common/StatCard';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { formatCurrency, formatDate } from '../../utils/formatters';

export const DashboardPage: React.FC = () => {
  const { metricas, vendas, produtos } = useVendasContext();

  const ultimasVendas = vendas.slice(0, 5);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Receita Total"
          value={formatCurrency(metricas.receitaTotal)}
          icon={<DollarSign size={22} />}
          trend={{ value: '12.5%', isPositive: true }}
          colorScheme="emerald"
        />
        <StatCard
          title="Total de Vendas"
          value={metricas.totalVendas}
          icon={<ShoppingCart size={22} />}
          trend={{ value: '8.2%', isPositive: true }}
          colorScheme="blue"
        />
        <StatCard
          title="Ticket Médio"
          value={formatCurrency(metricas.ticketMedio)}
          icon={<TrendingUp size={22} />}
          subtitle="por pedido concluído"
          colorScheme="purple"
        />
        <StatCard
          title="Alerta de Estoque"
          value={`${metricas.produtosBaixoEstoque} produtos`}
          icon={<AlertTriangle size={22} />}
          subtitle="menos de 5 unidades"
          colorScheme="amber"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent sales table */}
        <div className="lg:col-span-2">
          <Card
            title="Últimas Vendas Realizadas"
            subtitle="Resumo dos pedidos mais recentes"
            action={
              <Link
                to="/vendas"
                className="text-sm text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1"
              >
                Ver todas <ArrowRight size={14} />
              </Link>
            }
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-medium">
                    <th className="pb-3">Código</th>
                    <th className="pb-3">Cliente</th>
                    <th className="pb-3">Data</th>
                    <th className="pb-3">Total</th>
                    <th className="pb-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {ultimasVendas.map((venda) => (
                    <tr key={venda.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 font-semibold text-slate-700">{venda.id}</td>
                      <td className="py-3 text-slate-800 font-medium">{venda.clienteNome}</td>
                      <td className="py-3 text-slate-500">{formatDate(venda.data)}</td>
                      <td className="py-3 font-semibold text-slate-900">{formatCurrency(venda.total)}</td>
                      <td className="py-3 text-right">
                        <Badge status={venda.status}>
                          {venda.status.charAt(0).toUpperCase() + venda.status.slice(1)}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Quick stock overview */}
        <div className="space-y-6">
          <Card title="Inventário em Destaque" subtitle="Produtos cadastrados">
            <div className="divide-y divide-slate-100">
              {produtos.slice(0, 4).map((produto) => (
                <div key={produto.id} className="py-3 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-800 text-sm">{produto.nome}</p>
                    <p className="text-xs text-slate-500">{produto.categoria}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm text-slate-900">{formatCurrency(produto.preco)}</p>
                    <span
                      className={`text-xs ${
                        produto.estoque <= 5
                          ? 'text-amber-600 font-semibold'
                          : 'text-slate-500'
                      }`}
                    >
                      {produto.estoque} em estoque
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

