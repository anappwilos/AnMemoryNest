import React from 'react';
import { Leaf, Bell } from 'lucide-react';

export const Header = ({ onViewChange }: { onViewChange: (view: string) => void }) => {
  return (
    <header className="border-b border-stone-200 bg-white px-8 py-4 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onViewChange('dashboard')}>
            <Leaf className="w-6 h-6 text-amber-900" />
            <h1 className="text-2xl font-serif font-bold text-amber-900">MemoryNest</h1>
        </div>
        <nav className="flex gap-6">
            <button className="text-sm font-medium text-stone-900" onClick={() => onViewChange('dashboard')}>Home</button>
            <button className="text-sm font-medium text-stone-600 hover:text-amber-900" onClick={() => onViewChange('dashboard')}>Albums</button>
            <button className="text-sm font-medium text-stone-600 hover:text-amber-900" onClick={() => onViewChange('dashboard')}>Timeline</button>
            <button className="text-sm font-medium text-stone-600 hover:text-amber-900" onClick={() => onViewChange('dashboard')}>People</button>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <Bell className="w-5 h-5 text-stone-600 cursor-pointer" />
        <div className="w-8 h-8 rounded-full bg-stone-300 flex items-center justify-center font-bold text-white text-sm">img</div>
      </div>
    </header>
  );
};
