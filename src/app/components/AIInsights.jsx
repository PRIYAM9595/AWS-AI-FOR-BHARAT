import { Brain, Lightbulb, AlertCircle, TrendingUp } from 'lucide-react';

const insights = [
  {
    type: 'recommendation',
    icon: Brain,
    color: 'yellow',
    title: 'High-Impact Skill',
    message: 'Learning System Design could increase your salary potential by 28% in the next 6 months.',
    priority: 'high',
  },
  {
    type: 'warning',
    icon: AlertCircle,
    color: 'orange',
    title: 'Skill Gap Alert',
    message: 'AWS/Cloud skills are in high demand for your target roles. Consider prioritizing this.',
    priority: 'medium',
  },
  {
    type: 'trend',
    icon: TrendingUp,
    color: 'green',
    title: 'Market Trend',
    message: 'TypeScript adoption is growing 45% YoY. Your current skill level puts you ahead of 73% of developers.',
    priority: 'low',
  },
];

export function AIInsights() {
  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">AI Insights</h2>
        <p className="text-gray-600">Personalized recommendations</p>
      </div>

      <div className="space-y-3">
        {insights.map((insight) => {
          const Icon = insight.icon;
          const priorityColors = {
            high: 'border-red-200 bg-red-50',
            medium: 'border-yellow-200 bg-yellow-50',
            low: 'border-blue-200 bg-blue-50',
          };

          return (
            <div key={insight.title} className={`border-l-4 p-4 rounded ${priorityColors[insight.priority]}`}>
              <div className="flex items-start gap-3">
                <Icon className="w-5 h-5 mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{insight.title}</h3>
                  <p className="text-sm text-gray-700 mt-1">{insight.message}</p>
                </div>
                <span className="text-xs font-bold text-gray-600">{insight.priority.toUpperCase()}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          <span className="text-sm font-medium">AI Engine Active</span>
        </div>
        <p className="text-xs text-gray-500 mt-2">Last updated: 2 min ago</p>
      </div>
    </div>
  );
}
