import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { SubHeader } from '../components/SubHeader';
import { FilterSidebar } from '../components/FilterSidebar';
import { ProductCard } from '../components/ProductCard';
import { CartDrawer } from '../components/CartDrawer';
import { SearchModal } from '../components/SearchModal';
import { useStore } from '../context/StoreContext';
import { Sparkles, RefreshCw } from 'lucide-react';

export const StoreFront: React.FC = () => {
  const { filteredProducts, resetFilters } = useStore();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0B0B0E] text-white flex flex-col font-sans selection:bg-[#D4F636] selection:text-black">
      {/* Top Navigation */}
      <Navbar onSearchClick={() => setIsSearchOpen(true)} />

      {/* Hero / Header Section */}
      <SubHeader />

      {/* Main Content Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Sidebar Filters */}
          <FilterSidebar />

          {/* Right Product Grid */}
          <section className="flex-1 min-w-0" aria-label="Lista de produtos">
            {/* Header info bar */}
            <div className="flex items-center justify-between text-xs text-zinc-400 mb-6">
              <span className="flex items-center gap-1.5">
                <Sparkles size={14} className="text-[#D4F636]" />
                Showing <strong className="text-white">{filteredProducts.length}</strong> items
              </span>
            </div>

            {/* Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-[#15151A] rounded-2xl border border-white/5 p-12 text-center flex flex-col items-center justify-center">
                <p className="text-base font-semibold text-white">No products found</p>
                <p className="text-xs text-zinc-500 mt-1 max-w-sm">
                  We couldn't find any products matching your current filters. Try resetting or selecting other brands.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-5 min-h-[44px] px-6 py-2.5 rounded-full bg-[#D4F636] hover:bg-[#bde327] text-black text-xs font-bold inline-flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <RefreshCw size={14} />
                  <span>Reset all filters</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Drawers & Modals */}
      <CartDrawer />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Footer */}
      <footer className="mt-20 border-t border-white/5 py-10 bg-[#070709] text-xs text-zinc-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Protech Store Inc. All rights reserved.</p>
          <div className="flex items-center gap-6 text-zinc-400">
            <button type="button" className="hover:text-white cursor-pointer bg-transparent border-0 p-0 text-xs text-zinc-400">Privacy Policy</button>
            <button type="button" className="hover:text-white cursor-pointer bg-transparent border-0 p-0 text-xs text-zinc-400">Terms of Service</button>
            <button type="button" className="hover:text-white cursor-pointer bg-transparent border-0 p-0 text-xs text-zinc-400">Shipping & Returns</button>
          </div>
        </div>
      </footer>
    </div>
  );
};
