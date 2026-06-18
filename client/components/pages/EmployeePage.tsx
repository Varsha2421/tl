import { Download, Plus, Settings } from 'lucide-react';
import { StatCard } from '../shared/StatCard';
import { Avatar } from '../shared/Avatar';
import { Badge } from '../shared/Badge';
import { ProgressBar } from '../shared/ProgressBar';
import { Pager } from '../shared/Pager';
import { Users, User, TrendingUp, Eye } from 'lucide-react';
import { useState } from 'react';

interface EmployeePageProps {
  onNotify: (message: string) => void;
}

const EMPLOYEES = [
  {
    id: '1',
    name: 'Sarah Johnson',
    initials: 'SJ',
    role: 'Field Executive',
    status: 'On Duty',
    type: 'green',
    performance: 92,
    task: 'Client Site Visit',
  },
  {
    id: '2',
    name: 'Michael Chen',
    initials: 'MC',
    role: 'Compliance Officer',
    status: 'On Duty',
    type: 'green',
    performance: 88,
    task: 'Document Review',
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    initials: 'ER',
    role: 'Field Executive',
    status: 'On Leave',
    type: 'gray',
    performance: 85,
    task: '—',
  },
  {
    id: '4',
    name: 'James Wilson',
    initials: 'JW',
    role: 'Senior Officer',
    status: 'On Duty',
    type: 'green',
    performance: 95,
    task: 'Audit Preparation',
  },
];

export function EmployeePage({ onNotify }: EmployeePageProps) {
  const [highPerfOnly, setHighPerfOnly] = useState(false);
  const [currentTab, setCurrentTab] = useState<'all' | 'active' | 'inactive'>('all');
  const [page, setPage] = useState(0);

  let filtered = EMPLOYEES;
  if (currentTab === 'active') {
    filtered = filtered.filter((e) => e.status === 'On Duty');
  } else if (currentTab === 'inactive') {
    filtered = filtered.filter((e) => e.status !== 'On Duty');
  }

  if (highPerfOnly) {
    filtered = filtered.filter((e) => e.performance >= 90);
  }

  return (
    <main className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-stone-900">Team Management</h1>
          <p className="text-stone-500 text-sm mt-1">Manage and coordinate active field team members</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => onNotify('Employee list exported')}
            className="flex items-center gap-2 px-4 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors font-medium text-sm"
          >
            <Download className="w-4 h-4" />
            Export List
          </button>
          <button
            onClick={() => onNotify('Onboarding form opened')}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-amber-600 transition-colors font-medium text-sm"
          >
            <Plus className="w-4 h-4" />
            Onboard New
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <StatCard icon={Users} label="TOTAL TEAM" value="28" sub="Active members" />
        <StatCard icon={TrendingUp} label="ON DUTY" value="24" sub="Currently working" />
        <StatCard icon={User} label="AVG RATING" value="8.9/10" trend="+0.3" />
        <StatCard icon={Plus} label="PENDING LEAVE" value="3" sub="Requests to review" dark />
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {(['all', 'active', 'inactive'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setCurrentTab(tab);
                  setPage(0);
                }}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  currentTab === tab
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {tab === 'all' ? 'All Members' : tab === 'active' ? 'Active' : 'Inactive'}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="perf-filter"
              checked={highPerfOnly}
              onChange={(e) => {
                setHighPerfOnly(e.target.checked);
                setPage(0);
              }}
              className="rounded"
            />
            <label htmlFor="perf-filter" className="text-sm text-stone-600 font-medium">
              Filter: ≥90%
            </label>
          </div>
        </div>

        <p className="text-xs text-stone-500 font-medium">Sort by: Performance (High to Low)</p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-stone-200">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-stone-700">Member</th>
                <th className="px-4 py-3 text-left font-semibold text-stone-700">Role</th>
                <th className="px-4 py-3 text-left font-semibold text-stone-700">Status</th>
                <th className="px-4 py-3 text-left font-semibold text-stone-700">Performance</th>
                <th className="px-4 py-3 text-left font-semibold text-stone-700">Active Task</th>
                <th className="px-4 py-3 text-left font-semibold text-stone-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {filtered.map((employee) => (
                <tr key={employee.id} className="hover:bg-stone-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar initials={employee.initials} idx={parseInt(employee.id)} size="sm" />
                      <div>
                        <p className="font-medium text-stone-900">{employee.name}</p>
                        <p className="text-xs text-stone-500">ID: {employee.id.padStart(3, '0')}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-stone-600">{employee.role}</td>
                  <td className="px-4 py-3">
                    <Badge type={employee.type} dot>
                      {employee.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <ProgressBar value={employee.performance} />
                      <span className="font-medium text-stone-700 w-8">{employee.performance}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-stone-600">{employee.task}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onNotify(`Viewing location for ${employee.name}`)}
                        className="p-1.5 hover:bg-stone-100 rounded transition-colors"
                      >
                        <Eye className="w-4 h-4 text-stone-500" />
                      </button>
                      <button
                        onClick={() => onNotify(`Options for ${employee.name}`)}
                        className="p-1.5 hover:bg-stone-100 rounded transition-colors"
                      >
                        <Settings className="w-4 h-4 text-stone-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-stone-200">
          <p className="text-xs text-stone-600">
            Showing {filtered.length} of 24 team members
          </p>
          <Pager page={page} totalPages={3} onChange={setPage} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-2xl border border-stone-200 p-6">
          <h3 className="font-bold text-stone-900 mb-4">Department Distribution</h3>
          <div className="space-y-3">
            {[
              { name: 'Field Operations', count: 12 },
              { name: 'Compliance', count: 8 },
              { name: 'Support', count: 5 },
              { name: 'Management', count: 3 },
            ].map((dept, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="text-sm text-stone-600">{dept.name}</span>
                <div className="flex-1 mx-4 h-2 bg-stone-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${idx === 0 ? 'bg-primary' : 'bg-stone-300'}`}
                    style={{ width: `${(dept.count / 28) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-stone-700 w-8">{dept.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-stone-900 text-white rounded-2xl border border-stone-800 p-6">
          <h3 className="font-bold mb-4">Internal Training</h3>
          <p className="text-sm text-stone-400 mb-4">
            Assign compliance modules to team members
          </p>
          <button
            onClick={() => onNotify('Training modules form opened')}
            className="w-full px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors font-medium text-sm"
          >
            Assign Modules
          </button>
        </div>
      </div>
    </main>
  );
}
