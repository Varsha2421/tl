import {
  LayoutDashboard,
  Users,
  Briefcase,
  CheckSquare,
  MapPin,
  BarChart3,
  Trophy,
  Settings,
  LogOut,
} from 'lucide-react';

type Page =
  | 'dashboard'
  | 'employee'
  | 'client'
  | 'task'
  | 'tracking'
  | 'analytics'
  | 'incentive';

interface SidebarProps {
  active: Page;
  onChange: (page: Page) => void;
  onLogout: () => void;
}

const NAV = [
  { id: 'dashboard' as const, label: 'Dashboard', icon: LayoutDashboard },
  { id: 'employee' as const, label: 'Employee', icon: Users },
  { id: 'client' as const, label: 'Client', icon: Briefcase },
  { id: 'task' as const, label: 'Task assigning', icon: CheckSquare },
  { id: 'tracking' as const, label: 'Employee tracking', icon: MapPin },
  { id: 'analytics' as const, label: 'Analytics', icon: BarChart3 },
  { id: 'incentive' as const, label: 'Incentive', icon: Trophy },
];

export function Sidebar({ active, onChange, onLogout }: SidebarProps) {
  return (
    <div className="w-64 min-h-screen bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
            CO
          </div>
          <div>
            <div className="font-bold text-sm">ComplianceOS</div>
            <div className="text-xs text-sidebar-foreground/60">Admin Console</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {NAV.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${
              active === id
                ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
            }`}
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 space-y-2 border-t border-sidebar-border">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors text-sm font-medium">
          <Settings className="w-5 h-5 flex-shrink-0" />
          <span>Settings</span>
        </button>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors text-sm font-medium"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
