import { Cliente, Produto, Venda } from '../types';

export const mockClientes: Cliente[] = [
  {
    id: 'cli-1',
    nome: 'Ana Clara Silva',
    email: 'ana.silva@email.com',
    telefone: '11987654321',
    cpf: '12345678901',
    cidade: 'São Paulo - SP',
    dataCadastro: '2026-01-15',
  },
  {
    id: 'cli-2',
    nome: 'Carlos Eduardo Lima',
    email: 'carlos.lima@email.com',
    telefone: '21976543210',
    cpf: '98765432100',
    cidade: 'Rio de Janeiro - RJ',
    dataCadastro: '2026-02-10',
  },
  {
    id: 'cli-3',
    nome: 'Mariana Souza Dias',
    email: 'mariana.dias@email.com',
    telefone: '31965432109',
    cpf: '45678912345',
    cidade: 'Belo Horizonte - MG',
    dataCadastro: '2026-03-05',
  },
  {
    id: 'cli-4',
    nome: 'Roberto Antunes',
    email: 'roberto.antunes@email.com',
    telefone: '41954321098',
    cpf: '78912345678',
    cidade: 'Curitiba - PR',
    dataCadastro: '2026-03-20',
  },
];

export const mockProdutos: Produto[] = [
  {
    id: 'prod-1',
    nome: 'Notebook Dell Inspiron 15',
    categoria: 'Informática',
    preco: 3899.90,
    estoque: 14,
    codigoBarras: '789100010001',
  },
  {
    id: 'prod-2',
    nome: 'Mouse Sem Fio Logitech MX Master 3S',
    categoria: 'Acessórios',
    preco: 599.00,
    estoque: 25,
    codigoBarras: '789100010002',
  },
  {
    id: 'prod-3',
    nome: 'Teclado Mecânico Keychron K2',
    categoria: 'Acessórios',
    preco: 749.50,
    estoque: 8,
    codigoBarras: '789100010003',
  },
  {
    id: 'prod-4',
    nome: 'Monitor Dell 27" 4K IPS',
    categoria: 'Monitores',
    preco: 2299.00,
    estoque: 4, // Baixo estoque
    codigoBarras: '789100010004',
  },
  {
    id: 'prod-5',
    nome: 'Headset HyperX Cloud II Wireless',
    categoria: 'Áudio',
    preco: 699.90,
    estoque: 18,
    codigoBarras: '789100010005',
  },
];

export const mockVendas: Venda[] = [
  {
    id: 'ven-1001',
    clienteId: 'cli-1',
    clienteNome: 'Ana Clara Silva',
    data: '2026-10-28',
    itens: [
      {
        produtoId: 'prod-1',
        produtoNome: 'Notebook Dell Inspiron 15',
        quantidade: 1,
        precoUnitario: 3899.90,
        subtotal: 3899.90,
      },
      {
        produtoId: 'prod-2',
        produtoNome: 'Mouse Sem Fio Logitech MX Master 3S',
        quantidade: 1,
        precoUnitario: 599.00,
        subtotal: 599.00,
      },
    ],
    total: 4498.90,
    status: 'pago',
    metodoPagamento: 'pix',
  },
  {
    id: 'ven-1002',
    clienteId: 'cli-2',
    clienteNome: 'Carlos Eduardo Lima',
    data: '2026-10-29',
    itens: [
      {
        produtoId: 'prod-4',
        produtoNome: 'Monitor Dell 27" 4K IPS',
        quantidade: 1,
        precoUnitario: 2299.00,
        subtotal: 2299.00,
      },
    ],
    total: 2299.00,
    status: 'pago',
    metodoPagamento: 'cartao_credito',
  },
  {
    id: 'ven-1003',
    clienteId: 'cli-3',
    clienteNome: 'Mariana Souza Dias',
    data: '2026-10-30',
    itens: [
      {
        produtoId: 'prod-3',
        produtoNome: 'Teclado Mecânico Keychron K2',
        quantidade: 2,
        precoUnitario: 749.50,
        subtotal: 1499.00,
      },
    ],
    total: 1499.00,
    status: 'pendente',
    metodoPagamento: 'cartao_debito',
  },
];

