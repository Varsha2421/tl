import { TrendingDown, TrendingUp, LucideIcon } from 'lucide-react';
import { ProgressBar } from './ProgressBar';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  sub?: string;
  trend?: string;
  dark?: boolean;
  progress?: number;
}

export function StatCard({ icon: Icon, label, value, sub, trend, dark, progress }: StatCardProps) {
  const trendColor = trend?.startsWith('+') ? 'text-emerald-600' : 'text-red-600';
  const trendIcon = trend?.startsWith('+') ? TrendingUp : TrendingDown;
  const TrendIcon = trendIcon;

  return (
    <div
      className={`rounded-2xl border p-4 flex flex-col gap-3 ${
        dark ? 'bg-stone-900 border-stone-800 text-stone-100' : 'bg-white border-stone-200'
      }`}
    >
      <div className="flex items-start justify-between">
        <div
          className={`w-9 h-9 rounded-lg flex items-center justify-center ${
            dark ? 'bg-white/10 text-amber-300' : 'bg-stone-100 text-stone-500'
          }`}
        >
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-medium ${trendColor}`}>
            <TrendIcon className="w-4 h-4" />
            {trend}
          </div>
        )}
      </div>

      <div>
        <p className={dark ? 'text-stone-400 text-sm' : 'text-stone-500 text-sm'}>{label}</p>
        <p className="text-2xl font-bold">{value}</p>
        {sub && <p className={`text-xs ${dark ? 'text-stone-400' : 'text-stone-500'} mt-1`}>{sub}</p>}
      </div>

      {progress !== null && progress !== undefined && <ProgressBar value={progress} />}
    </div>
  );
}
