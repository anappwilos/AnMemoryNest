import React from 'react';
import { BookOpen } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="px-8 py-12 border-t border-stone-200 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center text-sm text-stone-500">
            <p>© 2026 MemoryNest. </p>
            <div className="flex gap-6">
                <a href="#" className="hover:text-amber-900">Privacy Policy</a>
                <a href="#" className="hover:text-amber-900">Terms of Service</a>
                <a href="#" className="hover:text-amber-900">Help Center</a>
                <a href="#" className="hover:text-amber-900">Contact Us</a>
            </div>
        </div>
      </div>
    </footer>
  );
};
