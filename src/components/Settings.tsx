import React, { useState } from 'react';
import { User, Shield, Sparkles, Sliders, RefreshCw, Check, AlertCircle, Save } from 'lucide-react';
import { Album, AISuggestion } from '../types';
import { MemoryAssistant } from './MemoryAssistant';

interface SettingsProps {
  user: any;
  albums: Album[];
  suggestions: AISuggestion[];
  onAcceptSuggestion: (id: string, customData?: any) => void;
  onIgnoreSuggestion: (id: string) => void;
  onUpdateUser?: (updatedProfile: { displayName: string; photoURL: string }) => void;
}

export const Settings = ({
  user,
  albums,
  suggestions,
  onAcceptSuggestion,
  onIgnoreSuggestion,
  onUpdateUser
}: SettingsProps) => {
  const [activeSection, setActiveSection] = useState<'general' | 'ai' | 'security'>('general');
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [avatarUrl, setAvatarUrl] = useState(user?.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100');
  const [isSaved, setIsSaved] = useState(false);
  
  // AI specific states
  const [aiEnabled, setAiEnabled] = useState(true);
  const [autoFaceDetect, setAutoFaceDetect] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const [scanMessage, setScanMessage] = useState('');

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdateUser) {
      onUpdateUser({ displayName, photoURL: avatarUrl });
    }
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleScan = () => {
    setIsScanning(true);
    setScanMessage('Escaneando metadatos de imágenes...');
    setTimeout(() => {
      setScanMessage('Analizando rostros frecuentes...');
      setTimeout(() => {
        setIsScanning(false);
        setScanMessage('✓ Escaneo completado. Se han actualizado las sugerencias del asistente.');
        setTimeout(() => setScanMessage(''), 4000);
      }, 1500);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-amber-900">Ajustes</h1>
        <p className="text-sm text-stone-500 mt-1">Configura tu perfil, privacidad y preferencias de inteligencia artificial.</p>
      </div>

      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[500px]">
        {/* Settings Sidebar */}
        <div className="w-full md:w-64 bg-stone-50/50 border-r border-stone-200 p-4 space-y-1">
          <button
            onClick={() => setActiveSection('general')}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
              activeSection === 'general' ? 'bg-amber-900 text-white shadow-sm' : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            <User className="w-4 h-4" />
            Perfil General
          </button>
          
          <button
            onClick={() => setActiveSection('ai')}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
              activeSection === 'ai' ? 'bg-amber-900 text-white shadow-sm' : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Asistente IA
          </button>

          <button
            onClick={() => setActiveSection('security')}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
              activeSection === 'security' ? 'bg-amber-900 text-white shadow-sm' : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            <Shield className="w-4 h-4" />
            Privacidad y Seguridad
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-grow p-6 md:p-8">
          {activeSection === 'general' && (
            <form onSubmit={handleSaveGeneral} className="space-y-6 max-w-xl">
              <div>
                <h2 className="text-lg font-serif font-bold text-stone-900 mb-4">Información de Perfil</h2>
                
                <div className="flex items-center gap-4 mb-6">
                  <img src={avatarUrl} alt="Avatar preview" className="w-16 h-16 rounded-full object-cover border-2 border-amber-900/20" />
                  <div>
                    <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Enlace de Foto de Perfil</label>
                    <input
                      type="text"
                      value={avatarUrl}
                      onChange={(e) => setAvatarUrl(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-1.5 text-xs focus:ring-1 focus:ring-amber-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Nombre para mostrar</label>
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-2.5 text-sm focus:ring-1 focus:ring-amber-900 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Correo electrónico</label>
                    <input
                      type="email"
                      value={user?.email || ''}
                      disabled
                      className="w-full bg-stone-100 border border-stone-200 rounded-lg px-4 py-2.5 text-sm text-stone-500 cursor-not-allowed"
                    />
                    <span className="text-[10px] text-stone-400 mt-1 block">El correo electrónico principal no se puede modificar directamente.</span>
                  </div>
                </div>
              </div>

              {isSaved && (
                <div className="bg-emerald-50 text-emerald-800 text-xs font-bold p-3 rounded-lg border border-emerald-200 flex items-center gap-2">
                  <Check className="w-4 h-4" /> Perfil actualizado correctamente
                </div>
              )}

              <button
                type="submit"
                className="bg-amber-900 hover:bg-amber-800 text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition shadow-sm"
              >
                <Save className="w-4 h-4" /> Guardar Cambios
              </button>
            </form>
          )}

          {activeSection === 'ai' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-lg font-serif font-bold text-stone-900 mb-2">Preferencias del Asistente IA</h2>
                <p className="text-xs text-stone-500 mb-6">Administra cómo interactúa la inteligencia artificial con tus fotografías familiares y relatos.</p>
                
                <div className="space-y-4 border-b border-stone-100 pb-6 mb-6">
                  <div className="flex items-center justify-between p-4 bg-stone-50 rounded-xl">
                    <div>
                      <h4 className="text-sm font-bold text-stone-800">Activar Organizador Inteligente</h4>
                      <p className="text-[11px] text-stone-500 mt-0.5">Permitir que la IA analice las fotos para sugerir títulos, fechas e historias.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={aiEnabled} 
                        onChange={() => setAiEnabled(!aiEnabled)} 
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-900"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-stone-50 rounded-xl">
                    <div>
                      <h4 className="text-sm font-bold text-stone-800">Auto-detección de rostros frecuentes</h4>
                      <p className="text-[11px] text-stone-500 mt-0.5">Identificar automáticamente familiares en común a través de tus recuerdos.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={autoFaceDetect} 
                        onChange={() => setAutoFaceDetect(!autoFaceDetect)} 
                        disabled={!aiEnabled}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-900 peer-disabled:opacity-50"></div>
                    </label>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-stone-800">Escanear Recuerdos</h3>
                  <p className="text-xs text-stone-500">Haz un escaneo manual en todo tu baúl de recuerdos para descubrir rostros perdidos, proponer mejoras cronológicas o limpiar fotos borrosas.</p>
                  
                  <div className="flex items-center gap-4">
                    <button
                      onClick={handleScan}
                      disabled={isScanning || !aiEnabled}
                      className="bg-stone-900 hover:bg-stone-800 text-white disabled:bg-stone-200 disabled:text-stone-400 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition shadow-sm"
                    >
                      <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
                      {isScanning ? 'Escaneando...' : 'Escanear fotos ahora'}
                    </button>
                    {scanMessage && <span className="text-xs font-semibold text-amber-900 animate-pulse">{scanMessage}</span>}
                  </div>
                </div>
              </div>

              {aiEnabled && (
                <div className="border-t border-stone-200 pt-8">
                  <div className="mb-4">
                    <h3 className="font-serif text-lg font-bold text-stone-900">Consola Central del Asistente</h3>
                    <p className="text-xs text-stone-500">Aquí se concentran todas las sugerencias de la IA detectadas en todos tus álbumes familiares.</p>
                  </div>
                  <div className="border border-stone-100 rounded-3xl overflow-hidden bg-stone-50/20 p-2">
                    <MemoryAssistant
                      suggestions={suggestions}
                      albums={albums}
                      onAccept={onAcceptSuggestion}
                      onIgnore={onIgnoreSuggestion}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {activeSection === 'security' && (
            <div className="space-y-6 max-w-xl">
              <div>
                <h2 className="text-lg font-serif font-bold text-stone-900 mb-2">Privacidad y Seguridad</h2>
                <p className="text-xs text-stone-500 mb-6">MemoryNest está diseñado para proteger tu privacidad. Tus datos y rostros nunca serán compartidos ni utilizados para entrenar modelos públicos.</p>
                
                <div className="space-y-4">
                  <div className="p-4 border border-stone-200 rounded-2xl flex items-start gap-3">
                    <Shield className="w-5 h-5 text-amber-900 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-stone-800">Cifrado de Extremo a Extremo</h4>
                      <p className="text-xs text-stone-500 mt-1">Todas las imágenes y audios se almacenan con cifrado avanzado en el almacenamiento persistente de Google Cloud.</p>
                    </div>
                  </div>

                  <div className="p-4 border border-stone-200 rounded-2xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-900 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-stone-800">Eliminación Permanente</h4>
                      <p className="text-xs text-stone-500 mt-1">Si decides borrar una foto, recuerdo o álbum, los archivos e información se borrarán de forma definitiva de nuestros servidores de inmediato.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
