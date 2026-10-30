import React, { useEffect } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../utils/formatters';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    cartTotal,
    cartCount,
  } = useStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsCartOpen(false);
    };
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-label="Carrinho de compras">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/80 transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#121217] border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} className="text-[#D4F636]" />
              <h2 className="text-lg font-bold text-white">Your Cart ({cartCount})</h2>
            </div>
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 text-zinc-400 hover:text-white rounded-lg transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#D4F636] focus-visible:outline-none"
              aria-label="Fechar carrinho"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto py-4 divide-y divide-white/5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-zinc-500">
                <ShoppingBag size={48} className="mb-3 stroke-1 text-zinc-600" />
                <p className="text-sm font-medium text-zinc-400">Your cart is currently empty</p>
                <p className="text-xs text-zinc-600 mt-1">Explore our electronics collection and add your favorite items.</p>
              </div>
            ) : (
              cart.map(({ product, quantity }) => (
                <div key={product.id} className="pt-4 flex gap-4 items-center">
                  <img
                    src={product.image}
                    alt={`${product.brand} ${product.name}`}
                    className="w-16 h-16 object-cover rounded-xl bg-zinc-900 border border-white/5"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-zinc-400 uppercase">{product.brand}</p>
                    <h4 className="text-sm font-semibold text-white truncate">{product.name}</h4>
                    <p className="text-xs font-bold text-[#D4F636] mt-0.5">
                      {formatPrice(product.price)}
                    </p>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center bg-[#1B1B22] rounded-lg border border-white/5">
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(product.id, quantity - 1)}
                          className="min-h-[36px] min-w-[36px] flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer"
                          aria-label={`Diminuir quantidade de ${product.name}`}
                        >
                          <Minus size={13} />
                        </button>
                        <span className="px-2 text-xs font-bold text-white select-none">{quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(product.id, quantity + 1)}
                          className="min-h-[36px] min-w-[36px] flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer"
                          aria-label={`Aumentar quantidade de ${product.name}`}
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(product.id)}
                        className="min-h-[36px] min-w-[36px] flex items-center justify-center text-zinc-500 hover:text-rose-400 transition-colors cursor-pointer"
                        aria-label={`Remover ${product.name} do carrinho`}
                        title="Remove item"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Subtotal & Checkout */}
          {cart.length > 0 && (
            <div className="pt-4 border-t border-white/10 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-400">Subtotal</span>
                <span className="text-lg font-extrabold text-white">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-zinc-500">
                <span>Shipping</span>
                <span className="text-[#D4F636] font-medium">Free</span>
              </div>

              <button
                type="button"
                onClick={() => alert('Checkout demo: pedido processado com sucesso!')}
                className="w-full min-h-[48px] py-3 px-4 rounded-xl bg-[#D4F636] hover:bg-[#bde327] text-black font-extrabold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg shadow-[#D4F636]/10 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
              >
                <span>Checkout</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
