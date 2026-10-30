import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  subtitle?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  colorScheme?: 'blue' | 'emerald' | 'purple' | 'amber' | 'rose';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  subtitle,
  trend,
  colorScheme = 'blue',
}) => {
  const iconBgStyles = {
    blue: 'bg-blue-50 text-blue-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    purple: 'bg-purple-50 text-purple-600',
    amber: 'bg-amber-50 text-amber-600',
    rose: 'bg-rose-50 text-rose-600',
  };

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <p className="text-2xl font-bold text-slate-900 mt-2">{value}</p>
        {(subtitle || trend) && (
          <div className="flex items-center gap-2 mt-2">
            {trend && (
              <span
                className={`text-xs font-semibold ${
                  trend.isPositive ? 'text-emerald-600' : 'text-rose-600'
                }`}
              >
                {trend.isPositive ? '↑' : '↓'} {trend.value}
              </span>
            )}
            {subtitle && <span className="text-xs text-slate-400">{subtitle}</span>}
          </div>
        )}
      </div>
      <div className={`p-3 rounded-lg ${iconBgStyles[colorScheme]}`}>
        {icon}
      </div>
    </div>
  );
};

