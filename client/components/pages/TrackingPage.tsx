import { Download, Zap, MapPin, Eye, MoreVertical } from 'lucide-react';
import { StatCard } from '../shared/StatCard';
import { Avatar } from '../shared/Avatar';
import { Badge } from '../shared/Badge';
import { Pager } from '../shared/Pager';
import { Users, TrendingUp, Clock } from 'lucide-react';
import { useState } from 'react';

interface TrackingPageProps {
  onNotify: (message: string) => void;
}

const FEED_DATA = [
  {
    id: '1',
    name: 'Sarah Johnson',
    initials: 'SJ',
    checkIn: '08:45 AM',
    checkOut: '05:30 PM',
    note: 'On time',
    location: 'Downtown Office',
    status: 'on-duty',
  },
  {
    id: '2',
    name: 'Michael Chen',
    initials: 'MC',
    checkIn: '08:12 AM',
    checkOut: '—',
    note: 'Late arrival',
    location: 'Field Site A',
    status: 'on-duty',
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    initials: 'ER',
    checkIn: '09:00 AM',
    checkOut: '04:45 PM',
    note: 'On time',
    location: 'Remote',
    status: 'off-duty',
  },
  {
    id: '4',
    name: 'James Wilson',
    initials: 'JW',
    checkIn: '08:30 AM',
    checkOut: '06:15 PM',
    note: 'Late arrival',
    location: 'Downtown Office',
    status: 'on-duty',
  },
];

export function TrackingPage({ onNotify }: TrackingPageProps) {
  const [syncing, setSyncing] = useState(false);
  const [page, setPage] = useState(0);

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      onNotify('Dashboard synced');
    }, 1500);
  };

  const isLateArrival = (note: string) => note.toLowerCase().includes('late');

  return (
    <main className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-stone-900">Employee Tracking</h1>
          <p className="text-stone-500 text-sm mt-1">Real-time operational status and location tracking</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => onNotify('Tracking log exported')}
            className="flex items-center gap-2 px-4 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors font-medium text-sm"
          >
            <Download className="w-4 h-4" />
            Export Log
          </button>
          <button
            onClick={handleSync}
            disabled={syncing}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-amber-600 disabled:opacity-50 transition-colors font-medium text-sm"
          >
            <Zap className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
            {syncing ? 'Syncing...' : 'Sync Dashboard'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <StatCard icon={Users} label="CHECKED IN" value="14" sub="Currently active" />
        <StatCard icon={Clock} label="LATE ARRIVAL" value="2" trend="+1" />
        <StatCard icon={MapPin} label="ACTIVE ROUTES" value="8" sub="In progress" />
        <StatCard icon={TrendingUp} label="AVG PRODUCTIVITY" value="87%" progress={87} dark />
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4">
        <h2 className="text-lg font-bold text-stone-900">Executive Status Feed</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-stone-200">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-stone-700">Employee</th>
                <th className="px-4 py-3 text-left font-semibold text-stone-700">Check-in</th>
                <th className="px-4 py-3 text-left font-semibold text-stone-700">Check-out</th>
                <th className="px-4 py-3 text-left font-semibold text-stone-700">Location</th>
                <th className="px-4 py-3 text-left font-semibold text-stone-700">Status</th>
                <th className="px-4 py-3 text-left font-semibold text-stone-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {FEED_DATA.map((feed) => (
                <tr key={feed.id} className="hover:bg-stone-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar initials={feed.initials} idx={parseInt(feed.id)} size="sm" />
                      <div>
                        <p className="font-medium text-stone-900">{feed.name}</p>
                        <p className="text-xs text-stone-500">ID: {feed.id.padStart(3, '0')}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-stone-900">{feed.checkIn}</p>
                      <p
                        className={`text-xs font-medium mt-1 ${
                          isLateArrival(feed.note) ? 'text-red-600' : 'text-emerald-600'
                        }`}
                      >
                        {feed.note}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-stone-600">{feed.checkOut}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 text-stone-600">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      {feed.location}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge type={feed.status === 'on-duty' ? 'green' : 'gray'}>
                      {feed.status === 'on-duty' ? 'On Duty' : 'Off Duty'}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => onNotify(`Opening live location for ${feed.name}`)}
                      className="p-1.5 hover:bg-stone-100 rounded transition-colors inline-flex"
                    >
                      <Eye className="w-4 h-4 text-stone-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-stone-200">
          <p className="text-xs text-stone-600">Showing 4 of 12 employees</p>
          <Pager page={page} totalPages={3} onChange={setPage} />
        </div>
      </div>
    </main>
  );
}
