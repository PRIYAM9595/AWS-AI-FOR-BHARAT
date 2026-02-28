import { Clock, Check, Play, BookOpen } from 'lucide-react';

const activities = [
  {
    icon: Check,
    color: 'green',
    title: 'Completed TypeScript Advanced Patterns',
    time: '2 hours ago',
  },
  {
    icon: Play,
    color: 'blue',
    title: 'Started Node.js Project',
    time: '5 hours ago',
  },
  {
    icon: BookOpen,
    color: 'purple',
    title: 'Saved 3 new resources',
    time: '1 day ago',
  },
  {
    icon: Check,
    color: 'green',
    title: 'Skill assessment completed',
    time: '2 days ago',
  },
];

export function ActivityFeed() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Card */}
      <div className="mb-6">
        <h3 className="text-xl font-bold">Recent Activity</h3>
        <p className="text-gray-500">Your learning journey</p>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div key={activity.title} className="flex items-center gap-4">
              <Icon className={`text-${activity.color}-500`} size={24} />
              <div>
                <p className="font-medium">{activity.title}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>

      <button className="mt-6 text-blue-500 hover:underline">
        View All Activity
      </button>
    </div>
  );
}
