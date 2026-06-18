interface AvatarProps {
  initials: string;
  idx?: number;
  size?: 'sm' | 'md';
}

const AVATAR_COLORS = [
  'bg-indigo-100 text-indigo-700',
  'bg-pink-100 text-pink-700',
  'bg-amber-100 text-amber-700',
  'bg-emerald-100 text-emerald-700',
  'bg-blue-100 text-blue-700',
  'bg-purple-100 text-purple-700',
];

export function Avatar({ initials, idx = 0, size = 'md' }: AvatarProps) {
  const colorClass = AVATAR_COLORS[idx % AVATAR_COLORS.length];
  const sizeClass = size === 'sm' ? 'w-8 h-8 text-xs' : 'w-10 h-10 text-sm';

  return (
    <div className={`${sizeClass} ${colorClass} rounded-full flex items-center justify-center font-semibold`}>
      {initials}
    </div>
  );
}
