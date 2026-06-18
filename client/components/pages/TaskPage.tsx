import { Download, Plus, SortAsc } from 'lucide-react';
import { StatCard } from '../shared/StatCard';
import { Avatar } from '../shared/Avatar';
import { Badge } from '../shared/Badge';
import { ProgressBar } from '../shared/ProgressBar';
import { CheckSquare, Users, Clock } from 'lucide-react';
import { useState } from 'react';

interface TaskPageProps {
  onNotify: (message: string) => void;
}

const INITIAL_QUEUE = [
  { id: '1', title: 'Client Proposal Review', client: 'Acme Corp', priority: 'high', estimate: '2h 30m' },
  { id: '2', title: 'Compliance Audit Report', client: 'Tech Inc', priority: 'medium', estimate: '4h' },
  { id: '3', title: 'Documentation Update', client: 'Global Ltd', priority: 'low', estimate: '1h 45m' },
];

export function TaskPage({ onNotify }: TaskPageProps) {
  const [queue, setQueue] = useState(INITIAL_QUEUE);
  const [completed] = useState(8);
  const [inProgress] = useState(5);
  const [delayed] = useState(2);

  const handleAssignTask = (taskId: string, taskTitle: string) => {
    setQueue((prev) => prev.filter((t) => t.id !== taskId));
    onNotify(`Assigned: ${taskTitle}`);
  };

  const getPriorityType = (priority: string): 'red' | 'blue' | 'gray' => {
    if (priority === 'high') return 'red';
    if (priority === 'medium') return 'blue';
    return 'gray';
  };

  return (
    <main className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-stone-900">Task Assignment</h1>
          <p className="text-stone-500 text-sm mt-1">Assign workflows to employees and monitor delivery</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => onNotify('Progress exported')}
            className="flex items-center gap-2 px-4 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors font-medium text-sm"
          >
            <Download className="w-4 h-4" />
            Export Progress
          </button>
          <button
            onClick={() => onNotify('New task creation form opened')}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-amber-600 transition-colors font-medium text-sm"
          >
            <Plus className="w-4 h-4" />
            Create New Task
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <StatCard
          icon={CheckSquare}
          label="UNASSIGNED TASKS"
          value={queue.length.toString().padStart(2, '0')}
          progress={queue.length * 25}
        />
        <StatCard icon={Clock} label="IN PROGRESS" value={inProgress} sub="Being worked on" />
        <StatCard icon={CheckSquare} label="COMPLETED TODAY" value={completed} sub="Tasks done" />
        <StatCard icon={Clock} label="DELAYED DELIVERIES" value={delayed} trend="-1" dark />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-2xl border border-stone-200 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-stone-900">Unassigned Queue</h2>
            <button
              onClick={() => onNotify('Queue sorted by priority')}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-primary hover:bg-amber-50 rounded-lg transition-colors"
            >
              <SortAsc className="w-4 h-4" />
              Priority Sort
            </button>
          </div>

          {queue.length === 0 ? (
            <div className="text-center py-12">
              <CheckSquare className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
              <p className="text-stone-600 font-medium">Queue is clear — every task has been assigned.</p>
              <p className="text-stone-500 text-sm mt-1">Great job! All tasks are distributed.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {queue.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-4 bg-stone-50 rounded-xl hover:bg-stone-100 transition-colors border border-stone-200"
                >
                  <div className="flex-1">
                    <p className="font-medium text-stone-900">{task.title}</p>
                    <p className="text-sm text-stone-500 mt-1">
                      {task.client} • Created {Math.floor(Math.random() * 4) + 1}h ago
                    </p>
                  </div>

                  <Badge type={getPriorityType(task.priority)}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                  </Badge>

                  <div className="text-right ml-6">
                    <p className="text-sm font-medium text-stone-900">Estimate</p>
                    <p className="text-xs text-stone-500">{task.estimate}</p>
                  </div>

                  <button
                    onClick={() => handleAssignTask(task.id, task.title)}
                    className="ml-4 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-amber-600 transition-colors whitespace-nowrap"
                  >
                    Assign Task
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-stone-200 p-6">
            <h3 className="font-bold text-stone-900 mb-4">Employee Availability</h3>
            <div className="space-y-3">
              {[
                { name: 'Sarah Johnson', load: 65 },
                { name: 'Michael Chen', load: 45 },
                { name: 'James Wilson', load: 80 },
              ].map((emp, idx) => (
                <button
                  key={idx}
                  onClick={() => onNotify(`${emp.name} has ${emp.load}% workload`)}
                  className="w-full text-left p-3 bg-stone-50 hover:bg-stone-100 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar
                      initials={emp.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                      idx={idx}
                      size="sm"
                    />
                    <span className="font-medium text-sm text-stone-900 flex-1">{emp.name}</span>
                    <span
                      className={`w-3 h-3 rounded-full ${
                        emp.load > 75 ? 'bg-red-500' : emp.load > 50 ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                    />
                  </div>
                  <ProgressBar value={emp.load} />
                  <p className="text-xs text-stone-500 mt-1 text-right">{emp.load}% capacity</p>
                </button>
              ))}
            </div>
            <button
              onClick={() => onNotify('Viewing all assignees')}
              className="w-full mt-4 px-3 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-amber-50 transition-colors"
            >
              View All Assignees
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 p-6">
            <h3 className="font-bold text-stone-900 mb-4">Live Activity</h3>
            <div className="space-y-4">
              {[
                { time: '14:32', text: 'Sarah started new task', type: 'work' },
                { time: '14:15', text: 'Michael completed review', type: 'success' },
                { time: '13:58', text: 'James submitted deliverable', type: 'success' },
              ].map((activity, idx) => (
                <div key={idx} className="flex gap-3 text-sm">
                  <div className="flex flex-col items-center">
                    <div className={`w-2 h-2 rounded-full mt-2 ${activity.type === 'success' ? 'bg-emerald-500' : 'bg-primary'}`} />
                    {idx < 2 && <div className="w-0.5 h-6 bg-stone-200 mt-2" />}
                  </div>
                  <div>
                    <p className="font-medium text-stone-900">{activity.text}</p>
                    <p className="text-xs text-stone-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
