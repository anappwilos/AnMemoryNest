import React, { useState } from 'react';
import { Leaf, Bell, Camera, User, LogOut, Sparkles, Settings as SettingsIcon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onAddMemoryClick: () => void;
  onLogout: () => void;
}

export const Header = ({ currentTab, onTabChange, onAddMemoryClick, onLogout }: HeaderProps) => {
  const { language, setLanguage, t } = useLanguage();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const notifications = language === 'es' ? [
    { id: 1, text: 'Mamá ha añadido un nuevo recuerdo a "Vacaciones en Benidorm 2026"', time: 'Hace 5m' },
    { id: 2, text: 'Tu asistente de IA ha identificado una fotografía similar', time: 'Hace 1h' },
    { id: 3, text: 'Carlos Ruiz ha respondido al grupo de conversación', time: 'Hace 3h' }
  ] : [
    { id: 1, text: 'Mom has added a new memory to "Benidorm Vacations 2026"', time: '5m ago' },
    { id: 2, text: 'Your AI Assistant identified a similar photograph', time: '1h ago' },
    { id: 3, text: 'Carlos Ruiz replied to the conversation group', time: '3h ago' }
  ];

  return (
    <header className="border-b border-stone-200 bg-white px-4 md:px-8 py-4 flex items-center justify-between sticky top-0 z-30">
      
      {/* Brand Logo */}
      <div className="flex items-center gap-8">
        <div 
          className="flex items-center gap-2.5 cursor-pointer select-none" 
          onClick={() => onTabChange('Home')}
        >
          <div className="p-1.5 bg-amber-900 rounded-lg text-white">
            <Leaf className="w-5 h-5" />
          </div>
          <h1 className="text-xl md:text-2xl font-serif font-bold text-amber-900 tracking-tight hidden sm:block">AnMemoryNest</h1>
        </div>

        {/* Navigation tabs */}
        <nav className="hidden md:flex gap-6">
          {[
            { id: 'Home', label: t('nav.home') },
            { id: 'Legacy', label: t('nav.legacy') }
          ].map((tab) => (
            <button 
              key={tab.id} 
              onClick={() => {
                onTabChange(tab.id);
                setNotificationsOpen(false);
                setProfileOpen(false);
              }}
              className={`text-xs font-bold uppercase tracking-wider transition ${
                currentTab === tab.id ? 'text-amber-900 font-extrabold' : 'text-stone-500 hover:text-amber-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Header Right Interactions */}
      <div className="flex items-center gap-4 relative">
        
        {/* Language Switcher */}
        <div className="flex items-center bg-stone-100 rounded-xl p-0.5 border border-stone-200">
          <button
            onClick={() => setLanguage('es')}
            className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
              language === 'es' ? 'bg-amber-900 text-white shadow-sm' : 'text-stone-500 hover:text-stone-950'
            }`}
          >
            ES
          </button>
          <button
            onClick={() => setLanguage('en')}
            className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
              language === 'en' ? 'bg-amber-900 text-white shadow-sm' : 'text-stone-500 hover:text-stone-950'
            }`}
          >
            EN
          </button>
        </div>

        {/* Notifications Icon Button */}
        <div className="relative">
          <button 
            onClick={() => { setNotificationsOpen(!notificationsOpen); setProfileOpen(false); }}
            className="p-2 hover:bg-stone-100 rounded-full text-stone-600 transition relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1.5 w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
          </button>

          {/* Notifications Dropdown Panel */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-stone-200 rounded-2xl shadow-xl p-4 z-40 space-y-3">
              <div className="flex justify-between items-center border-b border-stone-100 pb-2">
                <span className="text-xs font-bold text-stone-500 uppercase tracking-widest">{t('nav.notifications')}</span>
                <span className="text-[10px] text-amber-900 font-bold cursor-pointer hover:underline">{t('nav.markAllRead')}</span>
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="p-2 hover:bg-stone-50 rounded-xl transition text-xs space-y-1">
                    <p className="text-stone-800 leading-relaxed font-medium">{n.text}</p>
                    <span className="text-[10px] text-stone-400 font-semibold">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button 
            onClick={() => { setProfileOpen(!profileOpen); setNotificationsOpen(false); }}
            className="w-9 h-9 rounded-full bg-amber-900/10 border-2 border-stone-200 overflow-hidden cursor-pointer select-none flex items-center justify-center font-bold text-amber-900 text-sm"
          >
            M
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-stone-200 rounded-2xl shadow-xl p-3 z-40 space-y-1">
              <div className="p-2 border-b border-stone-100 mb-1">
                <p className="text-sm font-bold text-stone-900">María García</p>
                <p className="text-xs text-stone-500">maria@familia.com</p>
              </div>
              
              <button 
                onClick={() => { onTabChange('Legacy'); setProfileOpen(false); }}
                className="w-full text-left px-3 py-2 hover:bg-stone-50 rounded-lg text-xs font-bold text-stone-700 flex items-center gap-2 transition cursor-pointer"
              >
                <User className="w-4 h-4 text-stone-400" />
                {t('nav.profile')}
              </button>

              <button 
                onClick={() => { onTabChange('Settings'); setProfileOpen(false); }}
                className="w-full text-left px-3 py-2 hover:bg-stone-50 rounded-lg text-xs font-bold text-stone-700 flex items-center gap-2 transition cursor-pointer"
              >
                <SettingsIcon className="w-4 h-4 text-stone-400" />
                {t('nav.settings')}
              </button>
              
              <button 
                onClick={onLogout}
                className="w-full text-left px-3 py-2 hover:bg-red-50 hover:text-red-700 rounded-lg text-xs font-bold text-stone-700 flex items-center gap-2 transition cursor-pointer"
              >
                <LogOut className="w-4 h-4 text-stone-400 group-hover:text-red-700" />
                {t('nav.logout')}
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};
