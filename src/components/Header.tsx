import React from 'react';
import { Leaf } from 'lucide-react';

export const Header = ({ onViewChange }: { onViewChange: (view: string) => void }) => {
  return (
    <header className="border-b border-stone-200 bg-background-warm px-6 py-4 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => onViewChange('dashboard')}>
        <Leaf className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-serif font-bold text-primary">MemoryNest</h1>
      </div>
      <nav className="flex gap-6">
        <button className="text-sm font-medium text-stone-600 hover:text-primary transition-colors" onClick={() => onViewChange('dashboard')}>Archivo</button>
        <button className="text-sm font-medium text-stone-600 hover:text-primary transition-colors" onClick={() => onViewChange('create')}>Añadir recuerdo</button>
      </nav>
    </header>
  );
};
