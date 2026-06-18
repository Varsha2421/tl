import { Download, Edit2, TrendingUp, TrendingDown, Minus, Trash2 } from 'lucide-react';
import { StatCard } from '../shared/StatCard';
import { Avatar } from '../shared/Avatar';
import { Badge } from '../shared/Badge';
import { ProgressBar } from '../shared/ProgressBar';
import { Trophy, DollarSign, Calendar } from 'lucide-react';
import { BarChart, Bar, Cell, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';

interface IncentivePending {
  id: string;
  amount: string;
  by: string;
}

interface IncentivePageProps {
  onNotify: (message: string) => void;
}

const BAR_DATA = [
  { month: 'Jan', value: 4200 },
  { month: 'Feb', value: 5100 },
  { month: 'Mar', value: 4800 },
  { month: 'Apr', value: 6300 },
  { month: 'May', value: 7200 },
  { month: 'Jun', value: 6800 },
];

const LEADERBOARD = [
  { rank: 1, name: 'Sarah Johnson', attainment: 95, incentive: '$4,200', up: true },
  { rank: 2, name: 'Michael Chen', attainment: 88, incentive: '$3,800', up: true },
  { rank: 3, name: 'James Wilson', attainment: 92, incentive: '$4,100', up: false },
];

const ALLOCATIONS = [
  { label: 'Performance Bonus', percent: 45 },
  { label: 'Attendance Incentive', percent: 25 },
  { label: 'Project Completion', percent: 20 },
  { label: 'Team Collaboration', percent: 10 },
];

export function IncentivePage({ onNotify }: IncentivePageProps) {
  const [pending, setPending] = useState<IncentivePending[]>([
    { id: '1', amount: '$850', by: 'Sarah Johnson' },
    { id: '2', amount: '$650', by: 'Michael Chen' },
  ]);

  const handleApproveClaim = (id: string, amount: string, by: string) => {
    setPending((prev) => prev.filter((p) => p.id !== id));
    onNotify(`Approved ${amount} for ${by}`);
  };

  const handleReview = (by: string) => {
    onNotify(`Reviewing claim from ${by}`);
  };

  return (
    <main className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-stone-900">Incentive Management</h1>
          <p className="text-stone-500 text-sm mt-1">Team incentive performance and payout tracking</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => onNotify('Incentive report exported')}
            className="flex items-center gap-2 px-4 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors font-medium text-sm"
          >
            <Download className="w-4 h-4" />
            Export Report
          </button>
          <button
            onClick={() => onNotify('Manual adjustment form opened')}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-amber-600 transition-colors font-medium text-sm"
          >
            <Edit2 className="w-4 h-4" />
            Manual Adjust
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <StatCard icon={DollarSign} label="TOTAL INCENTIVE POOL" value="$45,200" sub="This month" />
        <StatCard icon={Trophy} label="PAYOUT READINESS" value="87%" progress={87} />
        <StatCard icon={Calendar} label="NEXT PAYOUT DATE" value="Feb 28" sub="Due in 8 days" dark />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-2xl border border-stone-200 p-6">
          <h2 className="text-lg font-bold text-stone-900 mb-6">Monthly Incentive Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={BAR_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0eee9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#a8a29e' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#a8a29e' }} axisLine={false} tickLine={false} />
              <Tooltip formatter={(value) => `$${value}`} />
              <Bar dataKey="value" fill="#3f3a35" radius={[8, 8, 0, 0]}>
                {BAR_DATA.map((entry, idx) => (
                  <Cell key={idx} fill={idx === BAR_DATA.length - 1 ? '#dba23a' : '#3f3a35'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-stone-900 text-white rounded-2xl border border-stone-800 p-6 space-y-4">
          <h3 className="font-bold">Pool Allocation</h3>
          <div className="space-y-4">
            {ALLOCATIONS.map((alloc, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-stone-300">{alloc.label}</span>
                  <span className="text-sm font-bold">{alloc.percent}%</span>
                </div>
                <ProgressBar value={alloc.percent} color="hsl(35, 85%, 55%)" bg="bg-stone-800" />
              </div>
            ))}
          </div>
          <div className="pt-4 border-t border-stone-700 text-xs text-stone-400">
            <div className="flex gap-1 items-center">
              <span className="text-yellow-500">📌</span>
              Allocations are adjusted based on Q4 priority goals for retention.
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-2xl border border-stone-200 p-6">
          <h2 className="text-lg font-bold text-stone-900 mb-4">Team Incentive Leaderboard</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-stone-50 border-b border-stone-200">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-stone-700">Rank</th>
                  <th className="px-4 py-3 text-left font-semibold text-stone-700">Member</th>
                  <th className="px-4 py-3 text-left font-semibold text-stone-700">Attainment</th>
                  <th className="px-4 py-3 text-left font-semibold text-stone-700">Estimated Incentive</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {LEADERBOARD.map((member) => (
                  <tr key={member.rank} className="hover:bg-stone-50 transition-colors">
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center justify-center w-6 h-6 rounded-full font-bold text-sm ${
                          member.rank === 1 ? 'bg-amber-500 text-white' : 'bg-stone-100 text-stone-700'
                        }`}
                      >
                        {member.rank}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar
                          initials={member.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                          idx={member.rank}
                          size="sm"
                        />
                        <p className="font-medium text-stone-900">{member.name}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-stone-900">{member.attainment}%</span>
                        {member.up !== null && (
                          <>
                            {member.up ? (
                              <TrendingUp className="w-4 h-4 text-emerald-600" />
                            ) : member.up === false ? (
                              <TrendingDown className="w-4 h-4 text-red-600" />
                            ) : (
                              <Minus className="w-4 h-4 text-stone-400" />
                            )}
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-semibold text-stone-900">{member.incentive}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4">
          <h3 className="font-bold text-stone-900">Pending Payout Validations</h3>
          <div className="inline-block">
            <Badge type="red">{pending.length} Pending</Badge>
          </div>

          {pending.length === 0 ? (
            <div className="py-6 text-center text-stone-500 text-sm">
              All claims are validated.
            </div>
          ) : (
            <div className="space-y-3">
              {pending.map((claim) => (
                <div key={claim.id} className="p-3 bg-stone-50 rounded-lg border border-red-100">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-stone-900 text-sm">{claim.amount}</p>
                      <p className="text-xs text-stone-500">Claimed by {claim.by}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApproveClaim(claim.id, claim.amount, claim.by)}
                      className="flex-1 px-2 py-1.5 text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded transition-colors"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReview(claim.by)}
                      className="flex-1 px-2 py-1.5 text-xs font-medium text-stone-700 border border-stone-300 rounded hover:bg-stone-100 transition-colors"
                    >
                      Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={() => onNotify('Viewing all pending claims')}
            className="w-full px-3 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-amber-50 transition-colors"
          >
            View All Pending Claims
          </button>
        </div>
      </div>
    </main>
  );
}
