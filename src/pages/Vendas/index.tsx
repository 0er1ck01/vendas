import React, { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { useVendasContext } from '../../context/VendasContext';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { Card } from '../../components/common/Card';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { StatusVenda, MetodoPagamento, ItemVenda } from '../../types';

export const VendasPage: React.FC = () => {
  const { vendas, clientes, produtos, adicionarVenda, atualizarStatusVenda } = useVendasContext();
  const [busca, setBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState<string>('todos');
  const [modalAberta, setModalAberta] = useState(false);

  // Form states for new sale
  const [clienteId, setClienteId] = useState('');
  const [produtoId, setProdutoId] = useState('');
  const [quantidade, setQuantidade] = useState<number>(1);
  const [metodoPagamento, setMetodoPagamento] = useState<MetodoPagamento>('pix');
  const [status, setStatus] = useState<StatusVenda>('pago');

  const vendasFiltradas = vendas.filter((venda) => {
    const correspondeBusca =
      venda.clienteNome.toLowerCase().includes(busca.toLowerCase()) ||
      venda.id.toLowerCase().includes(busca.toLowerCase());
    const correspondeStatus = filtroStatus === 'todos' || venda.status === filtroStatus;
    return correspondeBusca && correspondeStatus;
  });

  const produtoSelecionado = produtos.find((p) => p.id === produtoId);
  const subtotal = produtoSelecionado ? produtoSelecionado.preco * quantidade : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clienteId || !produtoId || !produtoSelecionado || quantidade <= 0) {
      alert('Por favor, preencha todos os campos corretamente.');
      return;
    }

    if (quantidade > produtoSelecionado.estoque) {
      alert(`Estoque insuficiente! Disponível: ${produtoSelecionado.estoque}`);
      return;
    }

    const cliente = clientes.find((c) => c.id === clienteId);
    if (!cliente) return;

    const itens: ItemVenda[] = [
      {
        produtoId: produtoSelecionado.id,
        produtoNome: produtoSelecionado.nome,
        quantidade,
        precoUnitario: produtoSelecionado.preco,
        subtotal,
      },
    ];

    adicionarVenda({
      clienteId: cliente.id,
      clienteNome: cliente.nome,
      itens,
      total: subtotal,
      status,
      metodoPagamento,
    });

    // Reset form and close modal
    setClienteId('');
    setProdutoId('');
    setQuantidade(1);
    setModalAberta(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-72">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar por cliente ou ID..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative flex items-center">
            <Filter size={16} className="absolute left-3 text-slate-400 pointer-events-none" />
            <select
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
              className="pl-9 pr-8 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
            >
              <option value="todos">Todos Status</option>
              <option value="pago">Pago</option>
              <option value="pendente">Pendente</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div>
        </div>

        <Button
          onClick={() => setModalAberta(true)}
          icon={<Plus size={16} />}
          variant="primary"
        >
          Nova Venda
        </Button>
      </div>

      {/* Sales table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-medium">
                <th className="pb-3">Código</th>
                <th className="pb-3">Cliente</th>
                <th className="pb-3">Data</th>
                <th className="pb-3">Itens</th>
                <th className="pb-3">Pagamento</th>
                <th className="pb-3">Total</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {vendasFiltradas.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400">
                    Nenhuma venda encontrada.
                  </td>
                </tr>
              ) : (
                vendasFiltradas.map((venda) => (
                  <tr key={venda.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 font-semibold text-slate-700">{venda.id}</td>
                    <td className="py-3 font-medium text-slate-800">{venda.clienteNome}</td>
                    <td className="py-3 text-slate-500">{formatDate(venda.data)}</td>
                    <td className="py-3 text-slate-600">
                      {venda.itens.map((i: ItemVenda) => `${i.quantidade}x ${i.produtoNome}`).join(', ')}
                    </td>
                    <td className="py-3 capitalize text-slate-600">
                      {venda.metodoPagamento.replace('_', ' ')}
                    </td>
                    <td className="py-3 font-bold text-slate-900">{formatCurrency(venda.total)}</td>
                    <td className="py-3">
                      <Badge status={venda.status}>
                        {venda.status.charAt(0).toUpperCase() + venda.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="py-3 text-right space-x-2">
                      {venda.status === 'pendente' && (
                        <button
                          onClick={() => atualizarStatusVenda(venda.id, 'pago')}
                          className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 hover:underline"
                        >
                          Marcar Pago
                        </button>
                      )}
                      {venda.status !== 'cancelado' && (
                        <button
                          onClick={() => atualizarStatusVenda(venda.id, 'cancelado')}
                          className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:underline"
                        >
                          Cancelar
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal Nova Venda */}
      <Modal
        isOpen={modalAberta}
        onClose={() => setModalAberta(false)}
        title="Registrar Nova Venda"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Cliente</label>
            <select
              value={clienteId}
              onChange={(e) => setClienteId(e.target.value)}
              required
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">Selecione um cliente...</option>
              {clientes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nome} ({c.cidade})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Produto</label>
            <select
              value={produtoId}
              onChange={(e) => setProdutoId(e.target.value)}
              required
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">Selecione um produto...</option>
              {produtos.map((p) => (
                <option key={p.id} value={p.id} disabled={p.estoque <= 0}>
                  {p.nome} - {formatCurrency(p.preco)} ({p.estoque} disponíveis)
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Quantidade</label>
              <input
                type="number"
                min="1"
                max={produtoSelecionado?.estoque || 999}
                value={quantidade}
                onChange={(e) => setQuantidade(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Forma de Pagamento</label>
              <select
                value={metodoPagamento}
                onChange={(e) => setMetodoPagamento(e.target.value as MetodoPagamento)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="pix">PIX</option>
                <option value="cartao_credito">Cartão de Crédito</option>
                <option value="cartao_debito">Cartão de Débito</option>
                <option value="dinheiro">Dinheiro</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Status Inicial</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as StatusVenda)}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="pago">Pago</option>
              <option value="pendente">Pendente</option>
            </select>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600">Total Previsto:</span>
            <span className="text-lg font-bold text-slate-900">{formatCurrency(subtotal)}</span>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setModalAberta(false)}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              Salvar Venda
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

