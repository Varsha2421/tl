import { Download, Plus } from 'lucide-react';
import { StatCard } from '../shared/StatCard';
import { Avatar } from '../shared/Avatar';
import { Badge } from '../shared/Badge';
import { ProgressBar } from '../shared/ProgressBar';
import { DollarSign, Percent, Users, Clock } from 'lucide-react';

interface DashboardPageProps {
  onNavigate: (page: string) => void;
  onNotify: (message: string) => void;
}

interface AttentionRow {
  id: string;
  name: string;
  role: string;
  status: string;
  type: 'red' | 'purple' | 'green' | 'gray' | 'blue' | 'amber';
  lastAction: string;
  performance: number;
  action: string;
}

export function DashboardPage({ onNavigate, onNotify }: DashboardPageProps) {
  const [attention, setAttention] = React.useState<AttentionRow[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Field Executive',
      status: 'Task Pending',
      type: 'red',
      lastAction: '2 hours ago',
      performance: 85,
      action: 'Assign Now',
    },
    {
      id: '2',
      name: 'Michael Chen',
      role: 'Compliance Officer',
      status: 'Document Review',
      type: 'purple',
      lastAction: '30 mins ago',
      performance: 92,
      action: 'Review Work',
    },
    {
      id: '3',
      name: 'Emma Rodriguez',
      role: 'Field Executive',
      status: 'In Progress',
      type: 'blue',
      lastAction: 'just now',
      performance: 78,
      action: 'In Progress',
    },
  ]);

  const handleRowAction = (row: AttentionRow) => {
    if (row.action === 'Assign Now') {
      setAttention((prev) =>
        prev.map((r) =>
          r.id === row.id
            ? {
                ...r,
                status: 'Task Assigned',
                type: 'blue',
                action: 'In Progress',
              }
            : r
        )
      );
      onNotify(`Task assigned to ${row.name}`);
    } else {
      onNotify(`Reviewing ${row.name}'s work`);
    }
  };

  return (
    <main className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-stone-900">Team Overview</h1>
          <p className="text-stone-500 text-sm mt-1">Real-time performance and operational status</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => onNotify('Report exported')}
            className="flex items-center gap-2 px-4 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors font-medium text-sm"
          >
            <Download className="w-4 h-4" />
            Export Report
          </button>
          <button
            onClick={() => onNavigate('task')}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-amber-600 transition-colors font-medium text-sm"
          >
            <Plus className="w-4 h-4" />
            Assign New Task
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <StatCard icon={DollarSign} label="TEAM INCENTIVE POOL" value="$45,200" sub="This month" />
        <StatCard
          icon={Percent}
          label="COMPLETION RATE"
          value="92%"
          trend="+5%"
          progress={92}
        />
        <StatCard icon={Users} label="ACTIVE STAFF" value="24" sub="of 28" />
        <StatCard
          icon={Clock}
          label="AVG HANDLING TIME"
          value="18.4m"
          trend="-2.1m"
          dark
          progress={65}
        />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-stone-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-stone-900">Attention Required</h2>
              <span className="text-sm font-semibold text-stone-600">
                {attention.filter((r) => r.action === 'Assign Now').length} Action Items
              </span>
            </div>

            <div className="space-y-3">
              {attention.map((row) => (
                <div
                  key={row.id}
                  className="flex items-center justify-between p-4 bg-stone-50 rounded-xl hover:bg-stone-100 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <Avatar initials={row.name.split(' ').map((n) => n[0]).join('')} idx={parseInt(row.id)} />
                    <div>
                      <p className="font-medium text-stone-900">{row.name}</p>
                      <p className="text-sm text-stone-500">{row.role}</p>
                    </div>
                  </div>

                  <Badge type={row.type} dot>
                    {row.status}
                  </Badge>

                  <p className="text-sm text-stone-500 w-24">{row.lastAction}</p>

                  <div className="w-32">
                    <ProgressBar value={row.performance} />
                    <p className="text-xs text-stone-600 mt-1 text-right">{row.performance}%</p>
                  </div>

                  <button
                    onClick={() => handleRowAction(row)}
                    disabled={row.action === 'In Progress'}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      row.action === 'In Progress'
                        ? 'bg-stone-200 text-stone-500 cursor-not-allowed'
                        : 'bg-primary text-primary-foreground hover:bg-amber-600'
                    }`}
                  >
                    {row.action}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-stone-900 text-white rounded-2xl border border-stone-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Regional Spread</h3>
              <span className="flex items-center gap-1.5 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                LIVE
              </span>
            </div>

            <button
              onClick={() => onNavigate('tracking')}
              className="w-full flex items-center justify-center gap-2 p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors mb-4 font-medium text-sm"
            >
              View Live Map
            </button>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-stone-400">Active Agents</span>
                <span className="font-semibold">14 Online</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 p-6">
            <h3 className="font-bold text-stone-900 mb-4">Leaderboard</h3>
            <div className="space-y-3">
              {[
                { name: 'Alex Kumar', score: 95 },
                { name: 'Jessica Lee', score: 88 },
                { name: 'David Park', score: 82 },
              ].map((member, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-stone-900">{member.name}</span>
                    <span className="text-stone-500">{member.score}%</span>
                  </div>
                  <ProgressBar value={member.score} />
                </div>
              ))}
            </div>
            <button
              onClick={() => onNavigate('incentive')}
              className="w-full mt-4 px-3 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-amber-50 transition-colors"
            >
              Full Incentive Dashboard
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 p-6">
        <h2 className="text-lg font-bold text-stone-900 mb-4">Operational Activity</h2>
        <div className="grid grid-cols-4 gap-4">
          {[
            { time: '14:32', text: 'Task assigned to Sarah', status: 'success' },
            { time: '14:15', text: 'Document review completed', status: 'success' },
            { time: '13:58', text: 'New client onboarded', status: 'success' },
            { time: '13:42', text: 'Performance report generated', status: 'success' },
          ].map((activity, idx) => (
            <div key={idx} className="p-3 bg-stone-50 rounded-lg border border-stone-200">
              <p className="text-xs font-semibold text-primary">{activity.time}</p>
              <p className="text-sm text-stone-700 mt-1">{activity.text}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

import React from 'react';
