import { motion } from 'motion/react';

export function StatsCard({ title, value, change, icon: Icon, trend, delay = 0 }) {
  const trendColor = trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white rounded-lg p-6 shadow-sm"
    >
      {/* Card */}
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-gray-600 text-sm">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          <p className={`text-sm mt-2 ${trendColor}`}>{change}</p>
        </div>
        {Icon && <Icon className="w-10 h-10 text-gray-400" />}
      </div>
    </motion.div>
  );
}
