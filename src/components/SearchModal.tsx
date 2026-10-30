import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../utils/formatters';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const { products, addToCart } = useStore();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.brand.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 flex items-start justify-center pt-20 p-4" role="dialog" aria-modal="true" aria-label="Busca de produtos">
      <div className="w-full max-w-2xl bg-[#141418] border border-white/10 rounded-2xl p-6 shadow-2xl">
        {/* Search Input */}
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <Search size={22} className="text-[#D4F636] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search iPhone, SMEG, headphones, consoles..."
            className="w-full bg-transparent text-lg text-white placeholder-zinc-500 focus:outline-none"
            aria-label="Campo de busca de produtos"
            autoFocus
          />
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 text-zinc-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            aria-label="Fechar busca"
          >
            <X size={20} />
          </button>
        </div>

        {/* Results */}
        <div className="mt-4 max-h-96 overflow-y-auto space-y-2">
          {query.trim() === '' ? (
            <div className="text-center py-8 text-zinc-500 text-sm">
              Type something to search across our electronics catalog.
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-8 text-zinc-500 text-sm">
              No products found for "{query}".
            </div>
          ) : (
            results.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={product.image}
                    alt={`${product.brand} - ${product.name}`}
                    className="w-12 h-12 object-cover rounded-lg bg-zinc-900 shrink-0"
                  />
                  <div className="truncate">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase">
                      {product.brand}
                    </span>
                    <h4 className="text-sm font-semibold text-white truncate">{product.name}</h4>
                    <p className="text-xs font-bold text-[#D4F636] mt-0.5">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    addToCart(product);
                    onClose();
                  }}
                  className="min-h-[38px] px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-[#D4F636] text-white hover:text-black text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
                  aria-label={`Adicionar ${product.name} ao carrinho`}
                >
                  <span>Add</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
