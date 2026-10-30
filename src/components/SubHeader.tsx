import React, { useState } from 'react';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../services/productsData';
import { FilterState } from '../types';

export const SubHeader: React.FC = () => {
  const { filters, setCategory, setSortBy } = useStore();
  const [isSortOpen, setIsSortOpen] = useState(false);

  const sortLabels: Record<FilterState['sortBy'], string> = {
    'top-rated': 'Top rated',
    'price-asc': 'Price: Low to High',
    'price-desc': 'Price: High to Low',
    'discount': 'Biggest discounts',
  };

  return (
    <section className="pt-8 pb-6 border-b border-white/5" aria-label="Cabeçalho da seção de produtos">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top line: Page Title & Breadcrumb */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight font-['Syne']">
              Bestsellers
            </h1>
            <nav className="text-xs text-zinc-500 mt-2 flex items-center gap-2" aria-label="Navegação estrutural">
              <span className="hover:text-zinc-300 cursor-pointer">Home</span>
              <span aria-hidden="true">•</span>
              <span className="text-zinc-300 font-medium" aria-current="page">Bestsellers</span>
            </nav>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-6 overflow-x-auto py-2" role="tablist" aria-label="Categorias de produtos">
            {CATEGORIES.map((cat) => {
              const isActive = filters.category === cat;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setCategory(cat)}
                  className={`min-h-[44px] text-sm whitespace-nowrap transition-colors relative pb-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#D4F636] focus-visible:outline-none rounded ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-zinc-400 hover:text-zinc-200 font-medium'
                  }`}
                >
                  {cat}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Sort Dropdown */}
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#18181E] hover:bg-[#22222A] text-white text-xs font-medium border border-white/5 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#D4F636] focus-visible:outline-none"
              aria-expanded={isSortOpen}
              aria-label={`Ordenar por: ${sortLabels[filters.sortBy]}`}
            >
              <SlidersHorizontal size={14} className="text-[#D4F636]" />
              <span>{sortLabels[filters.sortBy]}</span>
              <ChevronDown size={14} className="text-zinc-400" />
            </button>

            {isSortOpen && (
              <div
                className="absolute right-0 mt-2 w-48 bg-[#18181E] border border-white/10 rounded-xl shadow-2xl py-1 z-50"
                role="menu"
                aria-orientation="vertical"
              >
                {(Object.keys(sortLabels) as FilterState['sortBy'][]).map((key) => (
                  <button
                    key={key}
                    role="menuitem"
                    onClick={() => {
                      setSortBy(key);
                      setIsSortOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-xs transition-colors cursor-pointer ${
                      filters.sortBy === key
                        ? 'text-[#D4F636] font-semibold bg-white/5'
                        : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {sortLabels[key]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
