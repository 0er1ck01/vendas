// --- TIPOS DA LOJA PROTECH (E-COMMERCE) ---
export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'Smartphones' | 'Kitchen' | 'Game Console' | 'Audio' | 'Home Appliances';
  price: number;
  originalPrice?: number;
  rating: number;
  salePercent?: number; // Ex: 15 para "Sale 15%"
  image: string;
  isBestseller?: boolean;
  isNewArrival?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FilterState {
  category: string;
  brands: string[];
  minPrice: number;
  maxPrice: number;
  brandSearch: string;
  sortBy: 'top-rated' | 'price-asc' | 'price-desc' | 'discount';
}

// --- TIPOS DO SISTEMA ADMINISTRATIVO / GESTÃO ---
export type StatusVenda = 'pago' | 'pendente' | 'cancelado';
export type MetodoPagamento = 'pix' | 'cartao_credito' | 'cartao_debito' | 'dinheiro';

export interface Cliente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  cidade: string;
  dataCadastro: string;
}

export interface Produto {
  id: string;
  nome: string;
  categoria: string;
  preco: number;
  estoque: number;
  codigoBarras: string;
}

export interface ItemVenda {
  produtoId: string;
  produtoNome: string;
  quantidade: number;
  precoUnitario: number;
  subtotal: number;
}

export interface Venda {
  id: string;
  clienteId: string;
  clienteNome: string;
  data: string;
  itens: ItemVenda[];
  total: number;
  status: StatusVenda;
  metodoPagamento: MetodoPagamento;
}

export interface MetricasDashboard {
  receitaTotal: number;
  totalVendas: number;
  ticketMedio: number;
  totalClientes: number;
  produtosBaixoEstoque: number;
}
