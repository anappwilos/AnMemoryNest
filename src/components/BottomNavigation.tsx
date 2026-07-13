import React from 'react';
import { Home, BookOpen, Users, Sparkles, Shield } from 'lucide-react';

interface BottomNavigationProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNavigation = ({ currentTab, onTabChange }: BottomNavigationProps) => {
  const tabs = [
    { id: 'Home', label: 'Inicio', icon: Home },
    { id: 'Assistant', label: 'Asistente IA', icon: Sparkles },
    { id: 'Legacy', label: 'Legado', icon: Shield }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 flex justify-around items-center px-2 py-2 z-40 pb-safe">
      {tabs.map(tab => {
        const Icon = tab.icon;
        const isActive = currentTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center gap-1 min-w-[64px] ${isActive ? 'text-amber-900' : 'text-stone-400 hover:text-stone-600'}`}
          >
            <div className={`p-1 rounded-full ${isActive ? 'bg-amber-50' : 'bg-transparent'}`}>
              <Icon className={`w-5 h-5 ${isActive ? 'text-amber-900' : ''}`} />
            </div>
            <span className={`text-[10px] font-bold ${isActive ? 'text-amber-900' : 'text-stone-500'}`}>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};
