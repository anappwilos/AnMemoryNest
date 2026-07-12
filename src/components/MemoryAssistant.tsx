import React, { useState } from 'react';
import { Sparkles, Brain, Check, X, Camera, RefreshCw, Trash2, Calendar, Smile, AlertTriangle } from 'lucide-react';
import { AISuggestion, Album } from '../types';

interface MemoryAssistantProps {
  suggestions: AISuggestion[];
  albums: Album[];
  onAccept: (suggestionId: string, customData?: any) => void;
  onIgnore: (suggestionId: string) => void;
}

export const MemoryAssistant = ({ suggestions, albums, onAccept, onIgnore }: MemoryAssistantProps) => {
  const [activeSuggestionId, setActiveSuggestionId] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');

  const getAlbumTitle = (id: string) => {
    return albums.find(a => a.id === id)?.title || id;
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      {/* Banner / Header */}
      <div className="bg-gradient-to-r from-amber-900/10 to-amber-800/5 rounded-3xl p-8 border border-amber-900/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-amber-900">
            <Sparkles className="w-6 h-6 animate-pulse" />
            <span className="font-serif font-bold text-lg">Asistente de Memoria IA</span>
          </div>
          <h2 className="text-4xl font-serif text-stone-950 font-bold">Organizador Inteligente</h2>
          <p className="text-stone-600 max-w-xl">La inteligencia artificial te ayuda a recuperar fechas, identificar rostros de familiares y limpiar duplicados. Siempre bajo tu control total.</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200 text-center flex flex-col justify-center min-w-[140px]">
          <span className="text-3xl font-bold font-serif text-amber-900">{suggestions.length}</span>
          <span className="text-xs text-stone-500 font-semibold uppercase tracking-wider">Acciones Pendientes</span>
        </div>
      </div>

      {suggestions.length === 0 ? (
        <div className="text-center p-16 bg-white border border-stone-200 rounded-3xl space-y-4">
          <div className="w-16 h-16 bg-stone-100 text-stone-400 rounded-full flex items-center justify-center mx-auto">
            <Brain className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-xl font-bold text-stone-900">¡Todo al día!</h3>
          <p className="text-stone-500 max-w-md mx-auto">Tu asistente de recuerdos ha analizado todas tus fotografías y no hay tareas pendientes. Tus cápsulas de tiempo están perfectamente documentadas.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Main Suggestions List */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-lg font-serif font-bold text-stone-900 uppercase tracking-wider mb-2">Sugerencias para revisar</h3>
            
            {suggestions.map((s) => {
              const albumTitle = getAlbumTitle(s.targetAlbum);
              return (
                <div key={s.id} className="bg-white border border-stone-200 hover:border-stone-300 rounded-2xl p-5 shadow-sm hover:shadow transition flex gap-4">
                  <div className="p-3 bg-amber-50 rounded-xl h-fit text-amber-900">
                    {s.type === 'face' && <Smile className="w-5 h-5" />}
                    {s.type === 'date' && <Calendar className="w-5 h-5" />}
                    {s.type === 'duplicate' && <AlertTriangle className="w-5 h-5" />}
                  </div>
                  <div className="flex-grow space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-stone-900">{s.title}</h4>
                        <p className="text-xs text-stone-500">En el álbum: <span className="font-semibold text-stone-700">{albumTitle}</span></p>
                      </div>
                      <span className="text-[10px] bg-amber-900/10 text-amber-900 font-bold uppercase px-2.5 py-1 rounded-full">
                        Sugerencia IA
                      </span>
                    </div>
                    <p className="text-sm text-stone-700 leading-relaxed">{s.description}</p>
                    
                    {s.targetImage && (
                      <div className="relative w-32 aspect-square rounded-lg overflow-hidden border border-stone-200 mt-2">
                        <img src={s.targetImage} alt="suggestion preview" className="w-full h-full object-cover" />
                      </div>
                    )}

                    {/* Interactive Input Block on active selection */}
                    {activeSuggestionId === s.id && s.type === 'face' && (
                      <div className="mt-4 pt-4 border-t border-stone-100 flex gap-2 items-center">
                        <input 
                          type="text" 
                          value={inputText}
                          onChange={(e) => setInputText(e.target.value)}
                          placeholder="Nombre del familiar..." 
                          className="flex-grow bg-stone-50 border border-stone-200 rounded-lg px-3 py-1.5 text-sm focus:ring-1 focus:ring-amber-900 focus:outline-none"
                        />
                        <button 
                          onClick={() => {
                            onAccept(s.id, { name: inputText });
                            setActiveSuggestionId(null);
                            setInputText('');
                          }}
                          className="bg-amber-900 text-white text-xs font-bold px-4 py-2 rounded-lg"
                        >
                          Confirmar
                        </button>
                      </div>
                    )}

                    <div className="flex gap-2 justify-end mt-4 pt-2 border-t border-stone-50">
                      {s.type === 'face' && activeSuggestionId !== s.id ? (
                        <button 
                          onClick={() => {
                            setActiveSuggestionId(s.id);
                            setInputText('Abuelo Manuel');
                          }}
                          className="text-xs bg-amber-900 text-white hover:bg-amber-800 px-3.5 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5"
                        >
                          <Check className="w-3.5 h-3.5" /> Identificar
                        </button>
                      ) : s.type !== 'face' ? (
                        <button 
                          onClick={() => onAccept(s.id)}
                          className="text-xs bg-amber-900 text-white hover:bg-amber-800 px-3.5 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5"
                        >
                          <Check className="w-3.5 h-3.5" /> Confirmar sugerencia
                        </button>
                      ) : null}

                      <button 
                        onClick={() => onIgnore(s.id)}
                        className="text-xs bg-stone-100 hover:bg-stone-200 text-stone-600 px-3.5 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5"
                      >
                        <X className="w-3.5 h-3.5" /> Ignorar
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Assistant Info Cards Sidebar */}
          <div className="space-y-6">
            <div className="bg-white border border-stone-200 rounded-3xl p-6 space-y-4 shadow-sm">
              <h3 className="font-serif text-lg font-bold text-stone-950">¿Cómo te ayuda?</h3>
              <div className="space-y-4 text-sm text-stone-600 leading-relaxed">
                <div>
                  <h4 className="font-bold text-stone-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-900 block"></span>
                    Legado Protegido
                  </h4>
                  <p className="text-xs mt-1">Todas las sugerencias se procesan de forma segura para preservar tu árbol de recuerdos.</p>
                </div>
                <div>
                  <h4 className="font-bold text-stone-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-900 block"></span>
                    Preguntas de contexto
                  </h4>
                  <p className="text-xs mt-1">La IA estimula el recuerdo preguntando quién cocinaba o qué se sentía en ese momento.</p>
                </div>
                <div>
                  <h4 className="font-bold text-stone-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-900 block"></span>
                    Calidad de Imagen
                  </h4>
                  <p className="text-xs mt-1">Filtros inteligentes sugieren descartar borrosas o duplicadas para tener un álbum hermoso.</p>
                </div>
              </div>
            </div>

            {/* AI Center status */}
            <div className="bg-amber-900/5 border border-amber-950/10 rounded-3xl p-6 text-center space-y-2">
              <h4 className="font-serif font-bold text-amber-950">Inteligencia Artificial</h4>
              <p className="text-xs text-amber-900/80">Modelo optimizado para reconocimiento facial privado, extracción de metadatos EXIF y enriquecimiento de relatos.</p>
              <div className="pt-2">
                <span className="inline-block text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  PRIVADO POR DEFECTO
                </span>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
