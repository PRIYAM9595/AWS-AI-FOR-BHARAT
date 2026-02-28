import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Target } from 'lucide-react';

const salaryData = [
  { month: 'Now', current: 85, projected: 85 },
  { month: '3M', current: 85, projected: 92 },
  { month: '6M', current: 85, projected: 98 },
  { month: '9M', current: 85, projected: 105 },
  { month: '12M', current: 85, projected: 115 },
  { month: '18M', current: 85, projected: 125 },
  { month: '24M', current: 85, projected: 140 },
];

export function SalaryProjection() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Card */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Career Growth Simulation</h2>
        <p className="text-gray-600">Estimated salary impact from skill development</p>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded">
          <p className="text-sm text-gray-600">Current</p>
          <p className="text-2xl font-bold">$85K</p>
        </div>
        <div className="bg-gray-50 p-4 rounded">
          <p className="text-sm text-gray-600">Target (24 months)</p>
          <p className="text-2xl font-bold">$140K</p>
        </div>
        <div className="bg-gray-50 p-4 rounded">
          <p className="text-sm text-gray-600">Growth</p>
          <p className="text-2xl font-bold">+65%</p>
        </div>
      </div>

      {/* Chart */}
      <div className="mb-6">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={salaryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => `$${value}K`} />
            <Area type="monotone" dataKey="current" stroke="#8b5cf6" fill="#8b5cf6" />
            <Area type="monotone" dataKey="projected" stroke="#10b981" fill="#10b981" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded p-4">
        <p className="text-sm text-blue-900">
          <Target className="inline mr-2" size={18} />
          AI Insight: Completing your roadmap can increase your market value by 65% within 24 months based on current industry trends.
        </p>
      </div>
    </div>
  );
}
