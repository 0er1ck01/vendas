import React from 'react';
import { Menu, Search, ShoppingBag, User } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface NavbarProps {
  onSearchClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSearchClick }) => {
  const { cartCount, setIsCartOpen } = useStore();

  return (
    <header className="w-full bg-[#0B0B0E] border-b border-white/5 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left Side: Brand & Catalog */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 cursor-pointer select-none">
            <span className="text-2xl font-black tracking-tight text-white font-['Syne']">
              Protech
            </span>
          </div>

          <button
            type="button"
            className="hidden sm:inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 rounded-full bg-[#18181E] hover:bg-[#22222A] text-white text-sm font-medium border border-white/5 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#D4F636] focus-visible:outline-none"
            aria-label="Abrir catálogo"
          >
            <Menu size={18} />
            <span>Catalog</span>
          </button>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium" aria-label="Navegação principal">
            <button
              type="button"
              className="text-white relative py-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#D4F636] focus-visible:outline-none rounded"
            >
              Bestsellers
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#D4F636] rounded-full" />
            </button>
            <button
              type="button"
              className="text-zinc-400 hover:text-white transition-colors py-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#D4F636] focus-visible:outline-none rounded"
            >
              Sale
            </button>
            <button
              type="button"
              className="text-zinc-400 hover:text-white transition-colors py-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#D4F636] focus-visible:outline-none rounded"
            >
              New Arrivals
            </button>
          </nav>
        </div>

        {/* Right Side: Search, Cart, Login */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={onSearchClick}
            className="min-h-[44px] min-w-[44px] p-2.5 text-zinc-400 hover:text-white transition-colors cursor-pointer rounded-full focus-visible:ring-2 focus-visible:ring-[#D4F636] focus-visible:outline-none"
            aria-label="Buscar produtos"
            title="Buscar"
          >
            <Search size={20} />
          </button>

          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="min-h-[44px] flex items-center gap-2 px-3.5 py-2 rounded-full hover:bg-white/5 text-zinc-300 hover:text-white transition-colors relative cursor-pointer focus-visible:ring-2 focus-visible:ring-[#D4F636] focus-visible:outline-none"
            aria-label={`Carrinho de compras com ${cartCount} itens`}
            title="Carrinho"
          >
            <div className="relative">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#D4F636] text-black font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-sm font-medium hidden sm:inline">Cart</span>
          </button>

          <button
            type="button"
            className="min-h-[44px] flex items-center gap-2 px-3.5 py-2 rounded-full hover:bg-white/5 text-zinc-300 hover:text-white transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#D4F636] focus-visible:outline-none"
            aria-label="Entrar na conta"
          >
            <User size={20} />
            <span className="text-sm font-medium hidden sm:inline">Log in</span>
          </button>
        </div>
      </div>
    </header>
  );
};
