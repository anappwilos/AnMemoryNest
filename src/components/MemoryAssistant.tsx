import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Brain, Check, X, Camera, RefreshCw, Trash2, Calendar, Smile, AlertTriangle, Send, MessageSquare, Clock, ShieldCheck } from 'lucide-react';
import { AISuggestion, Album } from '../types';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

interface MemoryAssistantProps {
  suggestions: AISuggestion[];
  albums: Album[];
  onAccept: (suggestionId: string, customData?: any) => void;
  onIgnore: (suggestionId: string) => void;
}

export const MemoryAssistant = ({ suggestions, albums, onAccept, onIgnore }: MemoryAssistantProps) => {
  const [activeSuggestionId, setActiveSuggestionId] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: '¡Hola! 🌸 Soy tu Asistente de Memoria de MemoryNest. Estoy aquí para ayudarte a revivir tus recuerdos familiares, redactar relatos poéticos para tu Bitácora, recordar quiénes formaron parte de tus aventuras o darte ideas inspiradoras para nuevos álbumes. ¿De qué te gustaría conversar hoy?',
      timestamp: new Date()
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom of the chat when a message arrives
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAiLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsgId = `user_${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setChatInput('');
    setIsAiLoading(true);

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: textToSend,
          albums: albums,
          messages: updatedMessages
        }),
      });
      const data = await response.json();

      const assistantMsg: ChatMessage = {
        id: `assistant_${Date.now()}`,
        sender: 'assistant',
        text: data.answer || "No obtuve una respuesta clara.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (e) {
      const errorMsg: ChatMessage = {
        id: `assistant_${Date.now()}`,
        sender: 'assistant',
        text: "Error al conectar con la IA de recuerdos. Por favor, asegúrate de que el servidor está encendido y tiene configurada tu clave API en Ajustes.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsAiLoading(false);
    }
  };

  const getAlbumTitle = (id: string) => {
    return albums.find(a => a.id === id)?.title || id;
  };

  const presetQuestions = [
    { text: '¿Qué álbumes tengo activos hoy?', label: 'Mis álbumes' },
    { text: '¿Quiénes son los miembros de mi familia según mis álbumes?', label: 'Mi familia' },
    { text: 'Sugiéreme títulos creativos para mis bitácoras', label: 'Títulos creativos' },
    { text: '¿Cómo puedo redactar un recuerdo familiar de forma poética?', label: 'Escribir relato' }
  ];

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6 md:space-y-8">
      {/* Banner / Header */}
      <div className="bg-gradient-to-r from-amber-900/10 to-amber-800/5 rounded-3xl p-6 md:p-8 border border-amber-900/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-amber-900">
            <Sparkles className="w-5 h-5 md:w-6 md:h-6 animate-pulse" />
            <span className="font-serif font-bold text-base md:text-lg">Asistente de Memoria IA</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-stone-950 font-bold">Conversa con tu Baúl de Recuerdos</h2>
          <p className="text-sm text-stone-600 max-w-xl">
            Nuestra inteligencia artificial se conecta de forma privada a tus álbumes guardados para responder preguntas, ayudarte a hilar historias o proponer ideas poéticas de Bitácora.
          </p>
        </div>
        <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-stone-200/60 flex items-center gap-2 text-xs text-stone-500 font-medium shrink-0">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          Procesamiento Privado
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left/Middle Column: Real Chatbot Container */}
        <div className="lg:col-span-2 flex flex-col bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-sm h-[600px]">
          
          {/* Chat Header */}
          <div className="bg-stone-50/50 border-b border-stone-100 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-900/10 flex items-center justify-center text-amber-900">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-stone-950 text-sm">Biógrafo Familiar Virtual</h3>
                <p className="text-[10px] text-stone-400 uppercase tracking-widest flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                  En línea con tus álbumes
                </p>
              </div>
            </div>
            <button 
              onClick={() => setMessages([
                {
                  id: 'welcome_reset',
                  sender: 'assistant',
                  text: '¡Hola de nuevo! 🌸 He limpiado nuestra conversación. ¿De qué recuerdo, álbum o anécdota familiar te gustaría que hablemos ahora?',
                  timestamp: new Date()
                }
              ])}
              className="text-[10px] font-bold text-stone-400 hover:text-amber-900 uppercase tracking-wider transition"
            >
              Reiniciar Chat
            </button>
          </div>

          {/* Chat Messages List */}
          <div className="flex-grow overflow-y-auto p-6 space-y-4 bg-stone-50/30 hide-scrollbar">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
              >
                {/* Avatar / Icon */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                  msg.sender === 'user' 
                    ? 'bg-stone-900 text-white' 
                    : 'bg-amber-900/10 text-amber-900 border border-amber-900/10'
                }`}>
                  {msg.sender === 'user' ? 'Tú' : <Sparkles className="w-3.5 h-3.5" />}
                </div>

                {/* Message Bubble */}
                <div className="space-y-1">
                  <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-amber-900 text-white rounded-tr-none'
                      : 'bg-white border border-stone-200 text-stone-800 rounded-tl-none shadow-sm'
                  }`}>
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  </div>
                  <p className={`text-[9px] text-stone-400 ${msg.sender === 'user' ? 'text-right' : ''}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {isAiLoading && (
              <div className="flex gap-3 max-w-[80%]">
                <div className="w-8 h-8 rounded-full bg-amber-900/10 flex items-center justify-center shrink-0 border border-amber-900/10">
                  <Sparkles className="w-3.5 h-3.5 text-amber-900 animate-pulse" />
                </div>
                <div className="bg-white border border-stone-200/80 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-stone-500 font-medium">Buscando en tus relatos familiares</span>
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-amber-900 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-1.5 h-1.5 bg-amber-900 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-1.5 h-1.5 bg-amber-900 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions Chips */}
          <div className="px-6 py-2.5 bg-stone-50/50 border-t border-stone-100/50 overflow-x-auto flex gap-2 hide-scrollbar shrink-0">
            {presetQuestions.map((pq, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(pq.text)}
                disabled={isAiLoading}
                className="bg-white hover:bg-amber-50 text-stone-700 hover:text-amber-950 border border-stone-200/70 hover:border-amber-900/30 text-[11px] px-3 py-1.5 rounded-full shrink-0 transition-all shadow-xs flex items-center gap-1"
              >
                <MessageSquare className="w-3 h-3 text-amber-950/40" />
                {pq.label}
              </button>
            ))}
          </div>

          {/* Chat Footer Input */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(chatInput);
            }}
            className="p-4 border-t border-stone-100 flex gap-2 items-center bg-white shrink-0"
          >
            <input 
              type="text" 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              disabled={isAiLoading}
              placeholder="Pregúntame sobre tus recuerdos, sugerencias de títulos, o pídeme redactar relatos..." 
              className="flex-grow bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-amber-900 focus:outline-none focus:bg-white transition-all disabled:opacity-60"
            />
            <button 
              type="submit"
              disabled={isAiLoading || !chatInput.trim()}
              className="bg-amber-900 hover:bg-amber-800 disabled:bg-stone-200 text-white disabled:text-stone-400 w-11 h-11 rounded-xl flex items-center justify-center transition-all shrink-0 shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

        {/* Right Column: AI Insights & Suggestions list */}
        <div className="space-y-6">
          <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-amber-900" />
              <h3 className="font-serif text-lg font-bold text-stone-950">Sugerencias del Asistente</h3>
            </div>
            <p className="text-xs text-stone-500 leading-relaxed">
              Detección automática de rostros de familiares, propuestas de fechas con metadatos y limpieza de imágenes redundantes para mantener el baúl perfecto.
            </p>

            {suggestions.length === 0 ? (
              <div className="bg-stone-50 border border-dashed border-stone-200 rounded-2xl p-5 text-center text-xs text-stone-500">
                <Smile className="w-8 h-8 text-stone-300 mx-auto mb-2" />
                <p className="font-medium">¡Todo catalogado con éxito!</p>
                <p className="text-[10px] mt-0.5">No hay rostros o sugerencias pendientes de revisión.</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                {suggestions.map((s) => {
                  const albumTitle = getAlbumTitle(s.targetAlbum);
                  return (
                    <div key={s.id} className="bg-stone-50 border border-stone-200/80 rounded-xl p-3 space-y-2 text-xs">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h4 className="font-bold text-stone-800 leading-snug">{s.title}</h4>
                          <p className="text-[10px] text-stone-400 mt-0.5">Álbum: {albumTitle}</p>
                        </div>
                        <span className="text-[9px] bg-amber-900/10 text-amber-900 font-bold uppercase px-1.5 py-0.5 rounded-sm">
                          {s.type === 'face' ? 'Identidad' : s.type === 'date' ? 'Fecha' : 'Limpieza'}
                        </span>
                      </div>
                      <p className="text-stone-600 text-[11px] leading-relaxed">{s.description}</p>

                      {s.targetImage && (
                        <div className="w-16 h-16 rounded overflow-hidden border border-stone-200">
                          <img src={s.targetImage} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      )}

                      {activeSuggestionId === s.id && s.type === 'face' && (
                        <div className="flex gap-1.5 pt-1">
                          <input 
                            type="text" 
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Nombre del familiar..." 
                            className="flex-grow bg-white border border-stone-200 rounded px-2 py-1 text-[11px] focus:outline-none"
                          />
                          <button 
                            onClick={() => {
                              onAccept(s.id, { name: inputText });
                              setActiveSuggestionId(null);
                              setInputText('');
                            }}
                            className="bg-amber-900 text-white font-bold px-2.5 py-1 rounded text-[10px]"
                          >
                            OK
                          </button>
                        </div>
                      )}

                      <div className="flex gap-1.5 justify-end pt-2 border-t border-stone-200/40">
                        {s.type === 'face' && activeSuggestionId !== s.id ? (
                          <button 
                            onClick={() => {
                              setActiveSuggestionId(s.id);
                              setInputText('Abuelo Manuel');
                            }}
                            className="text-[10px] bg-amber-900 text-white font-bold px-2.5 py-1 rounded transition hover:bg-amber-800"
                          >
                            Identificar
                          </button>
                        ) : s.type !== 'face' ? (
                          <button 
                            onClick={() => onAccept(s.id)}
                            className="text-[10px] bg-amber-900 text-white font-bold px-2.5 py-1 rounded transition hover:bg-amber-800"
                          >
                            Confirmar
                          </button>
                        ) : null}
                        <button 
                          onClick={() => onIgnore(s.id)}
                          className="text-[10px] bg-stone-200 hover:bg-stone-300 text-stone-600 font-bold px-2.5 py-1 rounded transition"
                        >
                          Ignorar
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="bg-stone-900 text-stone-200 border border-stone-850 rounded-3xl p-6 shadow-sm space-y-4">
            <h4 className="font-serif font-bold text-amber-500 text-sm flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              ¿Sabías que...?
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              La IA te ayuda a buscar anécdotas específicas o estimula tus recuerdos familiares haciéndote preguntas interactivas. ¡Pídele un consejo de escritura familiar!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
