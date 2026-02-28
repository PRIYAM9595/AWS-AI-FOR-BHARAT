import { Home, Map, BookOpen, Target, BarChart3, Settings, HelpCircle, ChevronRight, Upload, TrendingUp, Calendar } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { icon: Home, label: 'Dashboard', path: '/dashboard' },
  { icon: Upload, label: 'Upload Resume', path: '/upload' },
  { icon: BookOpen, label: 'Skill Analysis', path: '/analysis' },
  { icon: Target, label: 'Skill Gaps', path: '/skill-gaps' },
  { icon: Map, label: 'Learning Navigator', path: '/navigator' },
  { icon: TrendingUp, label: 'Career Simulation', path: '/simulation' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: Calendar, label: 'Weekly Planner', path: '/planner' },
];

const secondaryItems = [
  { icon: Settings, label: 'Settings', path: '/settings' },
  { icon: HelpCircle, label: 'Help & Support', path: '/help' },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col">
      {/* Toggle button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-8 w-6 h-6 rounded-full bg-black flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      >
        <ChevronRight size={16} />
      </button>

      {/* Primary navigation */}
      <nav className="flex-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.path}
              href={item.path}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-800 transition-colors"
            >
              <Icon size={20} />
              {!collapsed && <span>{item.label}</span>}
            </a>
          );
        })}
      </nav>

      {/* Secondary navigation */}
      <nav className="border-t border-gray-700">
        {secondaryItems.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.path}
              href={item.path}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-800 transition-colors"
            >
              <Icon size={20} />
              {!collapsed && <span>{item.label}</span>}
            </a>
          );
        })}
      </nav>

      {/* Version info */}
      {!collapsed && (
        <div className="border-t border-gray-700 px-4 py-3 text-xs text-gray-400">
          <p>Version 2.0.1</p>
          <p>AI Engine: GPT-4</p>
        </div>
      )}
    </div>
  );
}
