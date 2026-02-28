import { Target, Settings, Bell, User } from 'lucide-react';

export function Header() {
  return (
    <header className="flex items-center justify-between p-4">
      <div className="flex items-center gap-2">
        {/* Logo */}
        <Target className="w-6 h-6" />
        <div>
          <h1 className="text-xl font-bold">SkillGPS</h1>
          <p className="text-sm text-gray-600">AI Career Navigator</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <Bell className="w-5 h-5" />
        <User className="w-5 h-5" />
        <span>Alex Chen</span>
      </div>
    </header>
  );
}
