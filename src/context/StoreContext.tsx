import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { Product, CartItem, FilterState } from '../types';
import { initialProducts } from '../services/productsData';

interface StoreContextType {
  products: Product[];
  filteredProducts: Product[];
  cart: CartItem[];
  favorites: string[];
  filters: FilterState;
  isCartOpen: boolean;
  cartCount: number;
  cartTotal: number;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  toggleFavorite: (productId: string) => void;
  setCategory: (category: string) => void;
  toggleBrand: (brand: string) => void;
  removeBrand: (brand: string) => void;
  setBrandSearch: (search: string) => void;
  setSortBy: (sort: FilterState['sortBy']) => void;
  resetFilters: () => void;
  setIsCartOpen: (open: boolean) => void;
}

const defaultFilters: FilterState = {
  category: 'All items',
  brands: ['Apple', 'SMEG', 'Remez'], // Ativado por padrão como no screenshot de referência
  minPrice: 0,
  maxPrice: 2000,
  brandSearch: '',
  sortBy: 'top-rated',
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(initialProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>(['prod-6']); // AirPods Max favoritado como no modelo
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const setCategory = (category: string) => {
    setFilters((prev) => ({ ...prev, category }));
  };

  const toggleBrand = (brand: string) => {
    setFilters((prev) => {
      const exists = prev.brands.includes(brand);
      return {
        ...prev,
        brands: exists
          ? prev.brands.filter((b) => b !== brand)
          : [...prev.brands, brand],
      };
    });
  };

  const removeBrand = (brand: string) => {
    setFilters((prev) => ({
      ...prev,
      brands: prev.brands.filter((b) => b !== brand),
    }));
  };

  const setBrandSearch = (brandSearch: string) => {
    setFilters((prev) => ({ ...prev, brandSearch }));
  };

  const setSortBy = (sortBy: FilterState['sortBy']) => {
    setFilters((prev) => ({ ...prev, sortBy }));
  };

  const resetFilters = () => {
    setFilters({
      ...defaultFilters,
      brands: [],
      category: 'All items',
      brandSearch: '',
    });
  };

  // Filtragem e ordenação
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Categoria
    if (filters.category !== 'All items') {
      list = list.filter((p) => p.category === filters.category);
    }

    // Marcas (se alguma estiver selecionada)
    if (filters.brands.length > 0) {
      list = list.filter((p) => filters.brands.includes(p.brand));
    }

    // Ordenação
    switch (filters.sortBy) {
      case 'top-rated':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'discount':
        list.sort((a, b) => (b.salePercent || 0) - (a.salePercent || 0));
        break;
    }

    return list;
  }, [products, filters]);

  const cartCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  const cartTotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }, [cart]);

  return (
    <StoreContext.Provider
      value={{
        products,
        filteredProducts,
        cart,
        favorites,
        filters,
        isCartOpen,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        toggleFavorite,
        setCategory,
        toggleBrand,
        removeBrand,
        setBrandSearch,
        setSortBy,
        resetFilters,
        setIsCartOpen,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore deve ser usado dentro de StoreProvider');
  }
  return context;
};

