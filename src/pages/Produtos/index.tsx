import React, { useState } from 'react';
import { Plus, Search, PackageCheck, AlertCircle } from 'lucide-react';
import { useVendasContext } from '../../context/VendasContext';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Modal } from '../../components/common/Modal';
import { formatCurrency } from '../../utils/formatters';

export const ProdutosPage: React.FC = () => {
  const { produtos, adicionarProduto } = useVendasContext();
  const [busca, setBusca] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('todas');
  const [modalAberta, setModalAberta] = useState(false);

  // Form states
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('');
  const [preco, setPreco] = useState('');
  const [estoque, setEstoque] = useState('');
  const [codigoBarras, setCodigoBarras] = useState('');

  const categorias = Array.from(new Set(produtos.map((p) => p.categoria)));

  const produtosFiltrados = produtos.filter((p) => {
    const correspondeBusca =
      p.nome.toLowerCase().includes(busca.toLowerCase()) ||
      p.codigoBarras.includes(busca);
    const correspondeCategoria =
      categoriaFiltro === 'todas' || p.categoria === categoriaFiltro;
    return correspondeBusca && correspondeCategoria;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !categoria || !preco || !estoque) {
      alert('Preencha os campos obrigatórios.');
      return;
    }

    adicionarProduto({
      nome,
      categoria,
      preco: parseFloat(preco.replace(',', '.')),
      estoque: parseInt(estoque, 10),
      codigoBarras: codigoBarras || `789${Math.floor(100000000 + Math.random() * 900000000)}`,
    });

    setNome('');
    setCategoria('');
    setPreco('');
    setEstoque('');
    setCodigoBarras('');
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
              placeholder="Buscar por nome ou código..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            value={categoriaFiltro}
            onChange={(e) => setCategoriaFiltro(e.target.value)}
            className="px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
          >
            <option value="todas">Todas Categorias</option>
            {categorias.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <Button
          onClick={() => setModalAberta(true)}
          icon={<Plus size={16} />}
          variant="primary"
        >
          Novo Produto
        </Button>
      </div>

      {/* Product List */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-medium">
                <th className="pb-3">Código / EAN</th>
                <th className="pb-3">Nome do Produto</th>
                <th className="pb-3">Categoria</th>
                <th className="pb-3">Preço Unitário</th>
                <th className="pb-3">Estoque</th>
                <th className="pb-3 text-right">Status Estoque</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {produtosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    Nenhum produto encontrado.
                  </td>
                </tr>
              ) : (
                produtosFiltrados.map((prod) => (
                  <tr key={prod.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 text-slate-500 font-mono text-xs">{prod.codigoBarras}</td>
                    <td className="py-3 font-medium text-slate-800">{prod.nome}</td>
                    <td className="py-3 text-slate-600">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-xs">
                        {prod.categoria}
                      </span>
                    </td>
                    <td className="py-3 font-semibold text-slate-900">{formatCurrency(prod.preco)}</td>
                    <td className="py-3 text-slate-700 font-medium">{prod.estoque} un</td>
                    <td className="py-3 text-right">
                      {prod.estoque <= 5 ? (
                        <span className="inline-flex items-center gap-1 text-xs text-amber-600 font-semibold bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                          <AlertCircle size={12} /> Baixo Estoque
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs text-emerald-700 font-medium bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                          <PackageCheck size={12} /> Normal
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal Novo Produto */}
      <Modal
        isOpen={modalAberta}
        onClose={() => setModalAberta(false)}
        title="Cadastrar Novo Produto"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Nome do Produto</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Mouse Gamer Sem Fio"
              required
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Categoria</label>
              <input
                type="text"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                placeholder="Ex: Informática"
                required
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Preço (R$)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                placeholder="Ex: 199.90"
                required
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Estoque Inicial</label>
              <input
                type="number"
                min="0"
                value={estoque}
                onChange={(e) => setEstoque(e.target.value)}
                placeholder="Ex: 20"
                required
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Código de Barras</label>
              <input
                type="text"
                value={codigoBarras}
                onChange={(e) => setCodigoBarras(e.target.value)}
                placeholder="Opcional (gerado auto)"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setModalAberta(false)}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              Cadastrar Produto
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

