import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { skill: 'React', current: 85, market: 95 },
  { skill: 'TypeScript', current: 75, market: 90 },
  { skill: 'Node.js', current: 60, market: 85 },
  { skill: 'System Design', current: 45, market: 80 },
  { skill: 'AI/ML', current: 40, market: 75 },
  { skill: 'Cloud (AWS)', current: 50, market: 85 },
];

export function SkillGapChart() {
  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Skill Gap Analysis</h2>
        <p className="text-gray-600">Your skills vs. market demand</p>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="skill" />
          <PolarRadiusAxis />
          <Radar name="Current" dataKey="current" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
          <Radar name="Market Demand" dataKey="market" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Avg. Gap</p>
          <p className="text-2xl font-bold text-blue-600">-22%</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Priority Skills</p>
          <p className="text-2xl font-bold text-red-600">3</p>
        </div>
      </div>
    </div>
  );
}
