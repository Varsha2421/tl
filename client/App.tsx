import { useState, useRef, useEffect } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';
import { LoginPage } from './components/layout/LoginPage';
import { Toast } from './components/shared/Toast';

import { DashboardPage } from './components/pages/DashboardPage';
import { EmployeePage } from './components/pages/EmployeePage';
import { TaskPage } from './components/pages/TaskPage';
import { ClientPage } from './components/pages/ClientPage';
import { TrackingPage } from './components/pages/TrackingPage';
import { AnalyticsPage } from './components/pages/AnalyticsPage';
import { IncentivePage } from './components/pages/IncentivePage';

type Page = 'login' | 'dashboard' | 'employee' | 'client' | 'task' | 'tracking' | 'analytics' | 'incentive';

const SEARCH_PLACEHOLDERS: Record<Exclude<Page, 'login'>, string> = {
  dashboard: 'Search tasks, employees, clients...',
  employee: 'Search team members by name or ID...',
  client: 'Search clients, projects, contracts...',
  task: 'Search tasks, queue status...',
  tracking: 'Search employee, location, status...',
  analytics: 'Search metrics, reports...',
  incentive: 'Search payouts, allocations...',
};

const NAV = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'employee', label: 'Employee' },
  { id: 'client', label: 'Client' },
  { id: 'task', label: 'Task assigning' },
  { id: 'tracking', label: 'Employee tracking' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'incentive', label: 'Incentive' },
];

export default function App() {
  const [page, setPage] = useState<Page>('login');
  const [toast, setToast] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const user = 'Admin User';
  const role = 'Team Lead';

  const notify = (message: string) => {
    setToast(message);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setToast(null), 2200);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  if (page === 'login') {
    return <LoginPage onLogin={() => setPage('dashboard')} />;
  }

  const renderPage = () => {
    switch (page) {
      case 'dashboard':
        return <DashboardPage onNavigate={(p) => setPage(p as Page)} onNotify={notify} />;
      case 'employee':
        return <EmployeePage onNotify={notify} />;
      case 'client':
        return <ClientPage onNavigate={(p) => setPage(p as Page)} onNotify={notify} />;
      case 'task':
        return <TaskPage onNotify={notify} />;
      case 'tracking':
        return <TrackingPage onNotify={notify} />;
      case 'analytics':
        return <AnalyticsPage onNotify={notify} />;
      case 'incentive':
        return <IncentivePage onNotify={notify} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar active={page as Exclude<Page, 'login'>} onChange={(p) => setPage(p)} onLogout={() => setPage('login')} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar
          query={query}
          onQueryChange={setQuery}
          placeholder={SEARCH_PLACEHOLDERS[page as Exclude<Page, 'login'>] || 'Search...'}
          user={user}
          role={role}
        />

        <div className="flex-1 overflow-auto">
          {renderPage()}
        </div>
      </div>

      <Toast message={toast} />
    </div>
  );
}
