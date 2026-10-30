import React, { useState } from 'react';
import { Plus, Search, Mail, Phone, MapPin } from 'lucide-react';
import { useVendasContext } from '../../context/VendasContext';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Modal } from '../../components/common/Modal';
import { formatCPF, formatPhone, formatDate } from '../../utils/formatters';

export const ClientesPage: React.FC = () => {
  const { clientes, adicionarCliente } = useVendasContext();
  const [busca, setBusca] = useState('');
  const [modalAberta, setModalAberta] = useState(false);

  // Form states
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [cidade, setCidade] = useState('');

  const clientesFiltrados = clientes.filter((c) => {
    return (
      c.nome.toLowerCase().includes(busca.toLowerCase()) ||
      c.email.toLowerCase().includes(busca.toLowerCase()) ||
      c.cpf.includes(busca)
    );
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !email) {
      alert('Nome e e-mail são obrigatórios.');
      return;
    }

    adicionarCliente({
      nome,
      email,
      telefone: telefone || '11999999999',
      cpf: cpf || '00000000000',
      cidade: cidade || 'São Paulo - SP',
    });

    setNome('');
    setEmail('');
    setTelefone('');
    setCpf('');
    setCidade('');
    setModalAberta(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative flex-1 sm:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por nome, e-mail ou CPF..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <Button
          onClick={() => setModalAberta(true)}
          icon={<Plus size={16} />}
          variant="primary"
        >
          Novo Cliente
        </Button>
      </div>

      {/* Clients cards / table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-medium">
                <th className="pb-3">Nome</th>
                <th className="pb-3">Contato</th>
                <th className="pb-3">CPF</th>
                <th className="pb-3">Localização</th>
                <th className="pb-3 text-right">Cadastrado em</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {clientesFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400">
                    Nenhum cliente encontrado.
                  </td>
                </tr>
              ) : (
                clientesFiltrados.map((cliente) => (
                  <tr key={cliente.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 font-semibold text-slate-800">
                      <div>{cliente.nome}</div>
                      <span className="text-xs text-slate-400 font-normal">ID: {cliente.id}</span>
                    </td>
                    <td className="py-3 text-slate-600">
                      <div className="flex items-center gap-1.5 text-xs text-slate-700">
                        <Mail size={13} className="text-slate-400" />
                        {cliente.email}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                        <Phone size={13} className="text-slate-400" />
                        {formatPhone(cliente.telefone)}
                      </div>
                    </td>
                    <td className="py-3 font-mono text-xs text-slate-600">{formatCPF(cliente.cpf)}</td>
                    <td className="py-3 text-slate-600">
                      <div className="flex items-center gap-1 text-xs">
                        <MapPin size={13} className="text-slate-400" />
                        {cliente.cidade}
                      </div>
                    </td>
                    <td className="py-3 text-right text-xs text-slate-500">
                      {formatDate(cliente.dataCadastro)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal Novo Cliente */}
      <Modal
        isOpen={modalAberta}
        onClose={() => setModalAberta(false)}
        title="Cadastrar Novo Cliente"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Nome Completo</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: João Ferreira Santos"
              required
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="joao@exemplo.com"
                required
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Telefone / WhatsApp</label>
              <input
                type="tel"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                placeholder="(11) 98765-4321"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">CPF</label>
              <input
                type="text"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                placeholder="000.000.000-00"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Cidade / UF</label>
              <input
                type="text"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                placeholder="São Paulo - SP"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setModalAberta(false)}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              Cadastrar Cliente
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

