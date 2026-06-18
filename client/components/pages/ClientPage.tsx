import { Download, Plus, Filter, MoreVertical, MapPin } from 'lucide-react';
import { StatCard } from '../shared/StatCard';
import { Avatar } from '../shared/Avatar';
import { Badge } from '../shared/Badge';
import { ProgressBar } from '../shared/ProgressBar';
import { Pager } from '../shared/Pager';
import { Briefcase, TrendingUp, DollarSign } from 'lucide-react';
import { useState } from 'react';

interface ClientPageProps {
  onNavigate: (page: string) => void;
  onNotify: (message: string) => void;
}

const CLIENTS = [
  {
    id: '1',
    name: 'Acme Corporation',
    initials: 'AC',
    project: 'Compliance Suite',
    status: 'active',
    lead: 'Sarah Johnson',
    progress: 78,
    dueDate: '2024-02-15',
  },
  {
    id: '2',
    name: 'Tech Innovations Inc',
    initials: 'TI',
    project: 'Audit Framework',
    status: 'active',
    lead: 'Michael Chen',
    progress: 92,
    dueDate: '2024-01-30',
  },
  {
    id: '3',
    name: 'Global Finance Ltd',
    initials: 'GF',
    project: 'Risk Assessment',
    status: 'on-hold',
    lead: 'Emma Rodriguez',
    progress: 45,
    dueDate: '2024-03-20',
  },
  {
    id: '4',
    name: 'Enterprise Solutions',
    initials: 'ES',
    project: 'Integration Project',
    status: 'completed',
    lead: 'James Wilson',
    progress: 100,
    dueDate: '2024-01-15',
  },
];

const STATUS_TYPES: Record<string, 'green' | 'blue' | 'purple' | 'gray'> = {
  active: 'green',
  'on-hold': 'purple',
  completed: 'gray',
  at_risk: 'red',
};

export function ClientPage({ onNavigate, onNotify }: ClientPageProps) {
  const [currentStatus, setCurrentStatus] = useState<string>('all');
  const [page, setPage] = useState(0);

  const cycleStatus = (current: string): string => {
    const statuses = ['all', 'active', 'on-hold', 'completed'];
    const nextIdx = (statuses.indexOf(current) + 1) % statuses.length;
    return statuses[nextIdx];
  };

  let filtered = CLIENTS;
  if (currentStatus !== 'all') {
    filtered = filtered.filter((c) => c.status === currentStatus);
  }

  const DEADLINES = [
    { title: 'Q4 Audit Completion', tag: 'audit', client: 'Acme Corp', due: 'Feb 15', color: '#ef4444' },
    { title: 'Compliance Report', tag: 'report', client: 'Tech Inc', due: 'Feb 10', color: '#f59e0b' },
    { title: 'Risk Assessment', tag: 'assessment', client: 'Global Ltd', due: 'Mar 20', color: '#d1cfc9' },
  ];

  return (
    <main className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-stone-900">Client Management</h1>
          <p className="text-stone-500 text-sm mt-1">Manage contracts and project status</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => onNotify('Client list exported')}
            className="flex items-center gap-2 px-4 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors font-medium text-sm"
          >
            <Download className="w-4 h-4" />
            Export List
          </button>
          <button
            onClick={() => onNavigate('task')}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-amber-600 transition-colors font-medium text-sm"
          >
            <Plus className="w-4 h-4" />
            Add New Task
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <StatCard icon={Briefcase} label="TOTAL CLIENTS" value="127" sub="Active portfolio" />
        <StatCard icon={TrendingUp} label="ACTIVE PROJECTS" value="32" trend="+4" />
        <StatCard icon={Filter} label="CRITICAL TASKS" value="5" sub="Need attention" />
        <StatCard icon={DollarSign} label="TOTAL REVENUE" value="$2.4M" trend="+12.5%" dark />
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => onNotify('Filters dialog opened')}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-stone-700 border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>

            <button
              onClick={() => setCurrentStatus(cycleStatus(currentStatus))}
              className="px-3 py-1.5 text-sm font-medium text-primary bg-amber-50 rounded-full hover:bg-amber-100 transition-colors"
            >
              Status:{' '}
              {currentStatus === 'all'
                ? 'All'
                : currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1).replace('-', ' ')}
            </button>
          </div>
        </div>

        <p className="text-xs text-stone-500 font-medium">Showing {filtered.length} of 1,254 entries</p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-stone-200">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-stone-700">Client Name</th>
                <th className="px-4 py-3 text-left font-semibold text-stone-700">Project Status</th>
                <th className="px-4 py-3 text-left font-semibold text-stone-700">Assigned Lead</th>
                <th className="px-4 py-3 text-left font-semibold text-stone-700">Progress</th>
                <th className="px-4 py-3 text-left font-semibold text-stone-700">Due Date</th>
                <th className="px-4 py-3 text-left font-semibold text-stone-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {filtered.map((client) => (
                <tr key={client.id} className="hover:bg-stone-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar initials={client.initials} idx={parseInt(client.id)} size="sm" />
                      <div>
                        <p className="font-medium text-stone-900">{client.name}</p>
                        <p className="text-xs text-stone-500">{client.project}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge type={STATUS_TYPES[client.status]}>
                      {client.status.toUpperCase().replace('-', ' ')}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-stone-600">{client.lead}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <ProgressBar
                        value={client.progress}
                        color={client.status === 'at_risk' ? '#ef4444' : undefined}
                      />
                      <span className="font-medium text-stone-700 w-8">{client.progress}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-stone-600">
                    {new Date(client.dueDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => onNotify(`More options for ${client.name}`)}
                      className="p-1.5 hover:bg-stone-100 rounded transition-colors"
                    >
                      <MoreVertical className="w-4 h-4 text-stone-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-stone-200">
          <p className="text-xs text-stone-600">Showing {filtered.length} of {CLIENTS.length} clients</p>
          <Pager page={page} totalPages={3} onChange={setPage} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-2xl border border-stone-200 p-6">
          <h3 className="font-bold text-stone-900 mb-4">Client Concentration Map</h3>
          <div className="h-48 bg-stone-100 rounded-lg flex items-center justify-center text-stone-400">
            <MapPin className="w-8 h-8 mr-2" />
            <span>Map View (Geographic Distribution)</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4">
          <h3 className="font-bold text-stone-900">Upcoming Task Deadlines</h3>
          <div className="space-y-3">
            {DEADLINES.map((deadline, idx) => (
              <button
                key={idx}
                onClick={() => onNotify(`Viewing deadline: ${deadline.title}`)}
                className="w-full text-left p-3 bg-stone-50 hover:bg-stone-100 rounded-lg transition-colors border-l-4"
                style={{ borderColor: deadline.color }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-stone-900 text-sm">{deadline.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge type={deadline.tag === 'audit' ? 'red' : deadline.tag === 'report' ? 'amber' : 'gray'}>
                        {deadline.tag}
                      </Badge>
                      <p className="text-xs text-stone-500">{deadline.client}</p>
                    </div>
                  </div>
                  <p className="text-xs font-semibold text-stone-600 whitespace-nowrap ml-2">{deadline.due}</p>
                </div>
              </button>
            ))}
          </div>
          <button
            onClick={() => onNavigate('task')}
            className="w-full px-3 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-amber-50 transition-colors"
          >
            View All Tasks
          </button>
        </div>
      </div>
    </main>
  );
}
