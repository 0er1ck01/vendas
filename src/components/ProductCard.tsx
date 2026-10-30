import React from 'react';
import { Heart, Star, Plus } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../utils/formatters';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { favorites, toggleFavorite, addToCart } = useStore();
  const isFavorite = favorites.includes(product.id);

  return (
    <article className="group bg-[#15151A] rounded-2xl border border-white/5 hover:border-white/20 transition-colors duration-200 flex flex-col overflow-hidden">
      {/* Top Media Area */}
      <div className="relative p-5 aspect-square flex items-center justify-center bg-zinc-950/40">
        {/* Sale Tag */}
        {product.salePercent && (
          <span className="absolute top-4 left-4 z-10 bg-[#D4F636] text-black text-xs font-black px-3 py-1 rounded-full shadow-sm tracking-tight select-none">
            Sale {product.salePercent}%
          </span>
        )}

        {/* Favorite Heart Button - Solid token background per Visant Killer rule */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(product.id);
          }}
          className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full bg-[#1A1A22] hover:bg-[#252530] border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#D4F636] focus-visible:outline-none"
          aria-label={isFavorite ? `Remover ${product.name} dos favoritos` : `Adicionar ${product.name} aos favoritos`}
        >
          <Heart
            size={18}
            className={isFavorite ? 'fill-rose-500 text-rose-500' : 'text-zinc-300'}
          />
        </button>

        {/* Product Image */}
        <div className="w-full h-full flex items-center justify-center p-2">
          <img
            src={product.image}
            alt={`${product.brand} - ${product.name}`}
            className="w-full h-full object-cover rounded-xl"
            loading="lazy"
          />
        </div>
      </div>

      {/* Bottom Information Area */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Rating Row */}
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-bold text-zinc-400 uppercase tracking-wider">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 text-white font-semibold" aria-label={`Avaliação: ${product.rating} de 5 estrelas`}>
              <Star size={14} className="fill-amber-400 text-amber-400" />
              <span>{product.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Price Row */}
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-xl font-extrabold text-white tracking-tight">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-zinc-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Product Name */}
          <h3 className="text-sm text-zinc-300 font-medium line-clamp-1">
            {product.name}
          </h3>
        </div>

        {/* Quick Add To Cart Button */}
        <div className="mt-4 pt-3 border-t border-white/5">
          <button
            onClick={() => addToCart(product)}
            className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-[#1F1F27] hover:bg-[#D4F636] text-white hover:text-black font-semibold text-xs flex items-center justify-center gap-2 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#D4F636] focus-visible:outline-none"
            aria-label={`Adicionar ${product.name} ao carrinho`}
          >
            <Plus size={16} />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </article>
  );
};
