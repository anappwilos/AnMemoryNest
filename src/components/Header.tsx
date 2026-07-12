import React, { useState } from 'react';
import { Leaf, Bell, Camera, User, LogOut, Sparkles } from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onAddMemoryClick: () => void;
  onLogout: () => void;
}

export const Header = ({ currentTab, onTabChange, onAddMemoryClick, onLogout }: HeaderProps) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const notifications = [
    { id: 1, text: 'Mamá ha añadido un nuevo recuerdo a "Vacaciones en Benidorm 2026"', time: 'Hace 5m' },
    { id: 2, text: 'Tu asistente de IA ha identificado una fotografía similar', time: 'Hace 1h' },
    { id: 3, text: 'Carlos Ruiz ha respondido al grupo de conversación', time: 'Hace 3h' }
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
            { id: 'Home', label: 'Inicio' },
            { id: 'Timeline', label: 'Bitácora' },
            { id: 'People', label: 'Personas' },
            { id: 'AI-Assistant', label: 'Asistente IA' },
            { id: 'Legacy', label: 'Legado Digital' }
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
        
        {/* Quick Add Memory CTA */}
        <button 
          onClick={onAddMemoryClick}
          className="bg-amber-900 hover:bg-amber-800 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition"
        >
          <Camera className="w-4 h-4" />
          <span className="hidden sm:inline">Nuevo Recuerdo</span>
        </button>

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
                <span className="text-xs font-bold text-stone-500 uppercase tracking-widest">Notificaciones</span>
                <span className="text-[10px] text-amber-900 font-bold cursor-pointer hover:underline">Marcar todo</span>
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
                className="w-full text-left px-3 py-2 hover:bg-stone-50 rounded-lg text-xs font-bold text-stone-700 flex items-center gap-2 transition"
              >
                <User className="w-4 h-4 text-stone-400" />
                Mi Perfil y Legado
              </button>
              
              <button 
                onClick={onLogout}
                className="w-full text-left px-3 py-2 hover:bg-red-50 hover:text-red-700 rounded-lg text-xs font-bold text-stone-700 flex items-center gap-2 transition"
              >
                <LogOut className="w-4 h-4 text-stone-400 group-hover:text-red-700" />
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};
