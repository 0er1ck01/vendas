# 🛒 Sistema de Vendas - React + TypeScript + Tailwind CSS

Estrutura profissional e escalável de aplicação web para controle e gestão de vendas desenvolvida com React, Vite, TypeScript e Tailwind CSS.

---

## 📁 Estrutura de Pastas

```text
vendas/
├── public/                 # Arquivos estáticos públicos
├── src/
│   ├── assets/             # Imagens, ícones e arquivos visuais
│   ├── components/         # Componentes reutilizáveis
│   │   ├── common/         # Componentes base (Button, Card, StatCard, Badge, Modal)
│   │   └── layout/         # Estrutura visual global (Sidebar, Header, Layout)
│   ├── context/            # Gerenciamento de estado global (VendasContext)
│   ├── hooks/              # Custom React Hooks
│   ├── pages/              # Módulos e telas da aplicação
│   │   ├── Dashboard/      # KPIs, resumo de vendas e métricas de estoque
│   │   ├── Vendas/         # Listagem, filtros e modal de registro de vendas
│   │   ├── Produtos/       # Catálogo, status de estoque e cadastro de produtos
│   │   └── Clientes/       # Gestão e cadastro de clientes
│   ├── services/           # Camada de integração com API e mock de dados
│   ├── types/              # Definições de tipos e interfaces TypeScript
│   ├── utils/              # Formatadores (moeda BRL, datas, máscaras CPF/telefone)
│   ├── App.tsx             # Definição das rotas (React Router)
│   ├── index.css           # Estilos globais e diretivas do Tailwind CSS
│   ├── main.tsx            # Ponto de entrada da aplicação
│   └── vite-env.d.ts       # Declaração de tipos de ambiente Vite
├── index.html              # Template HTML principal
├── package.json            # Dependências e scripts do projeto
├── postcss.config.js       # Configuração do PostCSS
├── tailwind.config.js      # Configuração do Tailwind CSS
├── tsconfig.json           # Configuração do compilador TypeScript
├── tsconfig.node.json      # Configuração do TypeScript para o Vite
└── vite.config.ts          # Configuração do bundler Vite (com alias @)
```

---

## 🚀 Como Executar o Projeto

### 1. Pré-requisito: Node.js
Certifique-se de que o **Node.js** (versão 18 ou superior) está instalado na máquina.
- Se ainda não tiver o Node.js instalado, você pode baixá-lo no site oficial: [nodejs.org](https://nodejs.org) ou instalar via terminal:
  ```powershell
  winget install OpenJS.NodeJS.LTS
  ```
- Após a instalação, feche e abra o terminal/VS Code para carregar o `node` no PATH do sistema.

### 2. Instalar as dependências
No terminal, dentro da pasta do projeto (`c:\Users\aluno\Desktop\vendas`), execute:
```bash
npm install
```

### 3. Iniciar o servidor de desenvolvimento
Execute o comando abaixo:
```bash
npm run dev
```

A aplicação estará disponível no navegador pelo link:
👉 `http://localhost:5173`

---

## 🛠️ Tecnologias Utilizadas

- **[React 18](https://react.dev/)**: Biblioteca para interfaces declarativas
- **[TypeScript](https://www.typescriptlang.org/)**: Tipagem estática para robustez e produtividade
- **[Vite](https://vitejs.dev/)**: Ferramenta de build ultrarrápida
- **[Tailwind CSS](https://tailwindcss.com/)**: Framework utilitário de CSS moderno
- **[React Router DOM](https://reactrouter.com/)**: Gerenciamento de rotas e navegação SPA
- **[Lucide React](https://lucide.dev/)**: Pacote de ícones limpos e modernos

---

## 🎯 Funcionalidades Já Implementadas

1. **Dashboard Executivo**:
   - Cartões de KPI com Receita Total (em R$), Total de Pedidos, Ticket Médio e Alerta de Baixo Estoque.
   - Tabela com histórico das transações mais recentes.
   - Visão rápida dos produtos em estoque.

2. **Gestão de Vendas**:
   - Listagem completa de pedidos com status (`Pago`, `Pendente`, `Cancelado`).
   - Filtro dinâmico por status e busca por cliente ou código do pedido.
   - Modal para cadastrar uma nova venda com seleção de cliente, produto, quantidade e cálculo automático do total com baixa no estoque.

3. **Catálogo de Produtos**:
   - Listagem de itens com categoria, preço e código de barras.
   - Indicador visual automático de estoque regular vs baixo estoque (<= 5 unidades).
   - Modal para cadastro de novos produtos.

4. **Carteira de Clientes**:
   - Listagem com máscaras automáticas de CPF, telefones e cidade.
   - Modal para cadastro de novos clientes.

