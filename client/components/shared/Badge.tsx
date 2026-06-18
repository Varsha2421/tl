import { Circle } from 'lucide-react';

type BadgeType = 'red' | 'purple' | 'green' | 'gray' | 'blue' | 'amber';

interface BadgeProps {
  type?: BadgeType;
  dot?: boolean;
  children: React.ReactNode;
}

const BADGE_STYLES: Record<BadgeType, string> = {
  red: 'bg-red-100 text-red-700',
  purple: 'bg-purple-100 text-purple-700',
  green: 'bg-emerald-100 text-emerald-700',
  gray: 'bg-stone-100 text-stone-700',
  blue: 'bg-blue-100 text-blue-700',
  amber: 'bg-amber-100 text-amber-700',
};

const DOT_COLORS: Record<BadgeType, string> = {
  red: 'bg-red-500',
  purple: 'bg-violet-500',
  green: 'bg-emerald-500',
  gray: 'bg-stone-400',
  blue: 'bg-blue-500',
  amber: 'bg-amber-500',
};

export function Badge({ type = 'gray', dot, children }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium ${BADGE_STYLES[type]}`}>
      {dot && <Circle className={`w-1.5 h-1.5 fill-current ${DOT_COLORS[type]}`} />}
      {children}
    </span>
  );
}
