import React from 'react';
import { BookOpen } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="px-8 py-12 border-t border-stone-200 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-6 h-6 text-amber-900" />
            <h1 className="text-xl font-serif font-bold text-amber-900">MemoryNest</h1>
        </div>
        <div className="flex justify-between items-center text-sm text-stone-500">
            <p>© 2024 MemoryNest. Preserve your family legacy.</p>
            <div className="flex gap-6">
                <a href="#" className="hover:text-amber-900">Privacy Policy</a>
                <a href="#" className="hover:text-amber-900">Terms of Service</a>
                <a href="#" className="hover:text-amber-900">Help Center</a>
                <a href="#" className="hover:text-amber-900">Contact Us</a>
            </div>
            <div className="flex gap-4">
              <span>🌐</span>
              <span>🔗</span>
            </div>
        </div>
      </div>
    </footer>
  );
};
