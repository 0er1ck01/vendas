import React from 'react';
import { StatusVenda } from '../../types';

interface BadgeProps {
  status?: StatusVenda | 'baixo_estoque' | 'em_estoque' | 'default';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ status = 'default', children }) => {
  const styles: Record<string, string> = {
    pago: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    pendente: 'bg-amber-50 text-amber-700 border-amber-200',
    cancelado: 'bg-rose-50 text-rose-700 border-rose-200',
    baixo_estoque: 'bg-red-50 text-red-700 border-red-200 font-semibold',
    em_estoque: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    default: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
        styles[status] || styles.default
      }`}
    >
      {children}
    </span>
  );
};

