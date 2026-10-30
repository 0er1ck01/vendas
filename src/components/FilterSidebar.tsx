import React, { useState } from 'react';
import { X, Search, ChevronDown, ChevronUp, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { AVAILABLE_BRANDS } from '../services/productsData';

export const FilterSidebar: React.FC = () => {
  const { filters, toggleBrand, removeBrand, resetFilters, setBrandSearch, setCategory } = useStore();
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [isBrandOpen, setIsBrandOpen] = useState(true);

  const marcasExibidas = AVAILABLE_BRANDS.filter((brand) =>
    brand.toLowerCase().includes(filters.brandSearch.toLowerCase())
  );

  return (
    <aside className="w-full md:w-64 shrink-0 space-y-6" aria-label="Filtros de produtos">
      {/* Reset Filters & Active Tags */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-1.5 min-h-[44px] text-xs font-semibold text-zinc-400 hover:text-white transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#D4F636] focus-visible:outline-none rounded"
          >
            <X size={14} />
            <span>Reset filters</span>
          </button>
        </div>

        {/* Selected Filter Badges / Chips */}
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtros ativos">
          {filters.brands.map((brand) => (
            <button
              key={brand}
              type="button"
              onClick={() => removeBrand(brand)}
              className="inline-flex items-center gap-1.5 min-h-[36px] px-3.5 py-1.5 rounded-full bg-[#18181E] border border-white/5 text-xs text-zinc-200 hover:text-white hover:border-white/20 transition-colors cursor-pointer group focus-visible:ring-2 focus-visible:ring-[#D4F636] focus-visible:outline-none"
              aria-label={`Remover filtro de marca ${brand}`}
            >
              <span>{brand}</span>
              <X size={12} className="text-zinc-500 group-hover:text-zinc-300" />
            </button>
          ))}
          {filters.category !== 'All items' && (
            <button
              key={filters.category}
              type="button"
              onClick={() => setCategory('All items')}
              className="inline-flex items-center gap-1.5 min-h-[36px] px-3.5 py-1.5 rounded-full bg-[#18181E] border border-white/5 text-xs text-zinc-200 hover:text-white hover:border-white/20 transition-colors cursor-pointer group focus-visible:ring-2 focus-visible:ring-[#D4F636] focus-visible:outline-none"
              aria-label={`Remover filtro de categoria ${filters.category}`}
            >
              <span>{filters.category}</span>
              <X size={12} className="text-zinc-500 group-hover:text-zinc-300" />
            </button>
          )}
        </div>
      </div>

      <div className="border-t border-white/5 pt-5 space-y-5">
        {/* Price Accordion */}
        <div className="border-b border-white/5 pb-5">
          <button
            type="button"
            onClick={() => setIsPriceOpen(!isPriceOpen)}
            className="w-full min-h-[44px] flex items-center justify-between text-sm font-semibold text-white tracking-wide cursor-pointer focus-visible:ring-2 focus-visible:ring-[#D4F636] focus-visible:outline-none rounded"
            aria-expanded={isPriceOpen}
          >
            <span>Price</span>
            {isPriceOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {isPriceOpen && (
            <div className="mt-3 space-y-3">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span>$0</span>
                <span>$2,000+</span>
              </div>
              <input
                type="range"
                min="50"
                max="2000"
                step="50"
                defaultValue="2000"
                className="w-full accent-[#D4F636] bg-zinc-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                aria-label="Filtrar por faixa de preço máxima"
              />
            </div>
          )}
        </div>

        {/* Brand Accordion */}
        <div>
          <button
            type="button"
            onClick={() => setIsBrandOpen(!isBrandOpen)}
            className="w-full min-h-[44px] flex items-center justify-between text-sm font-semibold text-white tracking-wide mb-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#D4F636] focus-visible:outline-none rounded"
            aria-expanded={isBrandOpen}
          >
            <span>Brand</span>
            {isBrandOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {isBrandOpen && (
            <div className="space-y-3">
              {/* Search brands input */}
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search brands"
                  value={filters.brandSearch}
                  onChange={(e) => setBrandSearch(e.target.value)}
                  className="w-full min-h-[40px] pl-8 pr-3 py-2 bg-[#18181E] border border-white/5 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/20 transition-colors"
                  aria-label="Buscar marcas"
                />
              </div>

              {/* Brands Checkbox List */}
              <div className="space-y-2 pt-2 max-h-60 overflow-y-auto pr-1" role="group" aria-label="Lista de marcas disponíveis">
                {marcasExibidas.map((brand) => {
                  const isChecked = filters.brands.includes(brand);
                  return (
                    <label
                      key={brand}
                      className="flex items-center gap-3 min-h-[36px] text-xs text-zinc-300 hover:text-white cursor-pointer select-none group"
                    >
                      <div
                        onClick={() => toggleBrand(brand)}
                        role="checkbox"
                        aria-checked={isChecked}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === ' ' || e.key === 'Enter') {
                            e.preventDefault();
                            toggleBrand(brand);
                          }
                        }}
                        className={`w-4 h-4 rounded flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-[#D4F636] focus-visible:outline-none ${
                          isChecked
                            ? 'bg-[#D4F636] text-black font-bold'
                            : 'bg-[#18181E] border border-zinc-700 group-hover:border-zinc-500'
                        }`}
                      >
                        {isChecked && <Check size={12} strokeWidth={3} />}
                      </div>
                      <span onClick={() => toggleBrand(brand)}>{brand}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
