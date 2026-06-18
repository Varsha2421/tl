import { Search, Bell, HelpCircle, Grid3x3, Separator } from 'lucide-react';
import { Avatar } from '../shared/Avatar';

interface TopBarProps {
  query: string;
  onQueryChange: (query: string) => void;
  placeholder: string;
  user: string;
  role: string;
}

export function TopBar({ query, onQueryChange, placeholder, user, role }: TopBarProps) {
  const initials = user
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="h-16 bg-white border-b border-stone-200 flex items-center justify-between px-6">
      <div className="flex-1 max-w-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 ml-6">
        <button className="p-2 hover:bg-stone-100 rounded-lg transition-colors">
          <Bell className="w-5 h-5 text-stone-600" />
        </button>

        <button className="p-2 hover:bg-stone-100 rounded-lg transition-colors">
          <HelpCircle className="w-5 h-5 text-stone-600" />
        </button>

        <button className="p-2 hover:bg-stone-100 rounded-lg transition-colors">
          <Grid3x3 className="w-5 h-5 text-stone-600" />
        </button>

        <div className="w-px h-6 bg-stone-200" />

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-stone-900">{user}</p>
            <p className="text-xs text-stone-500">{role}</p>
          </div>
          <Avatar initials={initials} idx={0} />
        </div>
      </div>
    </div>
  );
}
