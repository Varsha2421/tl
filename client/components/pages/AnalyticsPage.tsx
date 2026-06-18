import { Download, Zap, TrendingDown } from 'lucide-react';
import { StatCard } from '../shared/StatCard';
import { Avatar } from '../shared/Avatar';
import { Badge } from '../shared/Badge';
import { ProgressBar } from '../shared/ProgressBar';
import { TrendingUp, BarChart3, Clock } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, Cell, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';

interface AnalyticsPageProps {
  onNotify: (message: string) => void;
}

const CHART_DATA = [
  { month: 'Jan', flow: 65, target: 60 },
  { month: 'Feb', flow: 72, target: 65 },
  { month: 'Mar', flow: 68, target: 70 },
  { month: 'Apr', flow: 85, target: 75 },
  { month: 'May', flow: 92, target: 80 },
  { month: 'Jun', flow: 88, target: 85 },
];

const BAR_DATA = [
  { month: 'Jan', value: 65 },
  { month: 'Feb', value: 72 },
  { month: 'Mar', value: 68 },
  { month: 'Apr', value: 85 },
  { month: 'May', value: 92 },
  { month: 'Jun', value: 88 },
];

const TOP_PERFORMERS = [
  { name: 'Sarah Johnson', role: 'Field Executive', tasks: 24, efficiency: 92 },
  { name: 'Michael Chen', role: 'Compliance Officer', tasks: 19, efficiency: 88 },
  { name: 'James Wilson', role: 'Senior Officer', tasks: 22, efficiency: 95 },
];

const DOMAINS = [
  { name: 'Software Development', percent: 32 },
  { name: 'Marketing Strategy', percent: 25 },
  { name: 'Operations', percent: 28 },
  { name: 'Compliance', percent: 15 },
];

export function AnalyticsPage({ onNotify }: AnalyticsPageProps) {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      onNotify('Analytics data refreshed');
    }, 1500);
  };

  return (
    <main className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-stone-900">Analytics & Insights</h1>
          <p className="text-stone-500 text-sm mt-1">Team productivity and performance metrics</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => onNotify('Analytics PDF exported')}
            className="flex items-center gap-2 px-4 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors font-medium text-sm"
          >
            <Download className="w-4 h-4" />
            Export PDF
          </button>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-amber-600 disabled:opacity-50 transition-colors font-medium text-sm"
          >
            <Zap className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Refreshing...' : 'Update Data'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <StatCard icon={TrendingUp} label="EFFICIENCY INDEX" value="87.2" trend="+3.1%" />
        <StatCard icon={BarChart3} label="TEAM MILESTONES" value="12" sub="This quarter" />
        <StatCard icon={Clock} label="AVG RESOLUTION TIME" value="2.3h" trend="-0.5h" dark />
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 p-6">
        <h2 className="text-lg font-bold text-stone-900 mb-6">Performance Trends</h2>
        <div className="flex gap-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#dba23a' }} />
            <span className="text-sm text-stone-600">Operational Flow</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-0.5 w-4 bg-stone-300" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #d6d3ce 0px, #d6d3ce 4px, transparent 4px, transparent 8px)' }} />
            <span className="text-sm text-stone-600">Target Baseline</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={CHART_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0eee9" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#a8a29e' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#a8a29e' }} axisLine={false} tickLine={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="flow"
              stroke="#dba23a"
              strokeWidth={2.5}
              dot={false}
              name="Operational Flow"
            />
            <Line
              type="monotone"
              dataKey="target"
              stroke="#d6d3ce"
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={false}
              name="Target"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-2xl border border-stone-200 p-6">
          <h2 className="text-lg font-bold text-stone-900 mb-4">Top Performing Employees</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-stone-50 border-b border-stone-200">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-stone-700">Employee</th>
                  <th className="px-4 py-3 text-left font-semibold text-stone-700">Designation</th>
                  <th className="px-4 py-3 text-left font-semibold text-stone-700">Tasks</th>
                  <th className="px-4 py-3 text-left font-semibold text-stone-700">Efficiency</th>
                  <th className="px-4 py-3 text-left font-semibold text-stone-700">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {TOP_PERFORMERS.map((emp, idx) => (
                  <tr key={idx} className="hover:bg-stone-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar
                          initials={emp.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                          idx={idx}
                          size="sm"
                        />
                        <p className="font-medium text-stone-900">{emp.name}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-stone-600">{emp.role}</td>
                    <td className="px-4 py-3 font-medium text-stone-900">{emp.tasks}</td>
                    <td className="px-4 py-3">
                      <Badge type="green">{emp.efficiency}%</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 p-6">
          <h2 className="text-lg font-bold text-stone-900 mb-4">Task Domain Distribution</h2>
          <div className="space-y-4">
            {DOMAINS.map((domain, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-stone-700 font-medium">{domain.name}</span>
                  <span className="text-sm font-semibold text-stone-900">{domain.percent}%</span>
                </div>
                <ProgressBar value={domain.percent} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 p-6">
        <h2 className="text-lg font-bold text-stone-900 mb-6">Monthly Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={BAR_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0eee9" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#a8a29e' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#a8a29e' }} axisLine={false} tickLine={false} />
            <Tooltip />
            <Bar dataKey="value" fill="#3f3a35" radius={[8, 8, 0, 0]}>
              {BAR_DATA.map((entry, idx) => (
                <Cell key={idx} fill={idx === BAR_DATA.length - 1 ? '#dba23a' : '#3f3a35'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}
