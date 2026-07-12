import React, { useState } from 'react';
import { Camera, Share2, MapPin, Calendar, Heart, Users, ArrowLeft, Send, Mic, FileText, Check } from 'lucide-react';
import { Album } from '../types';

interface AlbumDetailProps {
  album: Album;
  onBack: () => void;
  onAddMemoryClick: () => void;
  onUpdateAlbum: (updated: Album) => void;
}

export const AlbumDetail = ({ album, onBack, onAddMemoryClick, onUpdateAlbum }: AlbumDetailProps) => {
  const [activeTab, setActiveTab] = useState('Historia');
  const [chatMessage, setChatMessage] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [inviteSuccess, setInviteSuccess] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const newMessage = {
      id: `c_${Date.now()}`,
      author: 'Yo (Ana)',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100',
      message: chatMessage,
      date: `Hoy · ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    };

    const updatedAlbum = {
      ...album,
      conversation: [...album.conversation, newMessage]
    };
    onUpdateAlbum(updatedAlbum);
    setChatMessage('');
  };

  const handleSendPresetAudio = () => {
    const newAudio = {
      id: `c_${Date.now()}`,
      author: 'Yo (Ana)',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100',
      date: `Hoy · ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      isAudio: true,
      audioUrl: '#',
      audioDuration: '0:32',
      message: 'HISTORIA DE LA PLAYA - VOZ'
    };

    const updatedAlbum = {
      ...album,
      conversation: [...album.conversation, newAudio]
    };
    onUpdateAlbum(updatedAlbum);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Recuerdos':
        return (
          <div className="w-full space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-2xl text-stone-900 font-bold">Galería de Recuerdos</h3>
              <button 
                onClick={onAddMemoryClick} 
                className="bg-amber-900 text-white hover:bg-amber-800 text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 transition"
              >
                <Camera className="w-4 h-4" /> Añadir Recuerdo
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {album.memories.map((m) => (
                <div 
                  key={m.id} 
                  className="group cursor-pointer bg-white p-3 rounded-2xl border border-stone-200 shadow-sm hover:shadow transition"
                  onClick={() => setSelectedPhoto(m.imageUrl)}
                >
                  <div className="aspect-square overflow-hidden rounded-xl bg-stone-100 relative">
                    <img src={m.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" alt={m.caption} />
                  </div>
                  <p className="text-xs text-stone-700 font-medium mt-2 line-clamp-2 italic">"{m.caption}"</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Personas':
        return (
          <div className="w-full space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-6">
              <div>
                <h3 className="font-serif text-2xl text-stone-950 font-bold">Álbum Colaborativo</h3>
                <p className="text-sm text-stone-500">Familiares y amigos autorizados para ver y aportar a este álbum.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {album.members.map((m, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 bg-stone-50 rounded-2xl border border-stone-100">
                    <div className="relative">
                      <img src={m.avatar} alt={m.name} className="w-12 h-12 rounded-full object-cover" />
                      {m.online && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
                        {m.name}
                        {m.typing && (
                          <span className="text-[10px] text-amber-900 animate-pulse font-normal">Escribiendo...</span>
                        )}
                      </h4>
                      <p className="text-xs text-stone-500">{m.role}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Invitation option inside Personas tab */}
              <div className="pt-4 border-t border-stone-100">
                <h4 className="font-bold text-stone-800 text-sm mb-2">¿Quieres invitar a alguien más?</h4>
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="correo@familiar.com" 
                    className="flex-grow bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-amber-900 focus:outline-none" 
                  />
                  <button 
                    onClick={() => {
                      setInviteSuccess(true);
                      setTimeout(() => setInviteSuccess(false), 3000);
                    }}
                    className="bg-amber-900 text-white text-xs font-bold px-4 py-2 rounded-lg"
                  >
                    Invitar
                  </button>
                </div>
                {inviteSuccess && (
                  <p className="text-xs text-emerald-800 font-bold mt-2">✓ ¡Invitación enviada con éxito!</p>
                )}
              </div>
            </div>
          </div>
        );

      case 'Conversación':
        return (
          <div className="w-full grid md:grid-cols-3 gap-8">
            
            {/* Conversation Flow */}
            <div className="md:col-span-2 space-y-6 flex flex-col justify-between h-[550px] bg-white border border-stone-200 rounded-3xl p-6 shadow-sm">
              <div className="overflow-y-auto space-y-4 flex-grow pr-2">
                <span className="text-xs font-bold text-stone-400 block text-center uppercase tracking-widest my-2">Historial de Conversación</span>
                
                {album.conversation.map((c) => (
                  <div key={c.id} className="space-y-1">
                    <div className="flex items-center gap-2">
                      <img src={c.avatar} alt={c.author} className="w-6 h-6 rounded-full object-cover" />
                      <span className="text-xs font-bold text-stone-800">{c.author}</span>
                      <span className="text-[10px] text-stone-400">{c.date}</span>
                    </div>

                    <div className="pl-8">
                      {c.isAudio ? (
                        <div className="bg-amber-900 text-white p-3.5 rounded-2xl border border-amber-950/10 shadow-sm flex items-center gap-3 max-w-sm">
                          <button className="w-8 h-8 rounded-full bg-white text-amber-900 flex items-center justify-center font-bold text-sm shadow">
                            ▶
                          </button>
                          <div className="flex-grow">
                            <p className="text-xs font-bold uppercase tracking-wider">{c.message}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <span className="block w-20 h-1 bg-white/40 rounded overflow-hidden">
                                <span className="block w-1/3 h-full bg-white"></span>
                              </span>
                              <span className="text-[10px] opacity-90 font-mono">{c.audioDuration}</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-stone-100 text-stone-800 p-3 rounded-2xl text-sm max-w-md shadow-sm">
                          <p>{c.message}</p>
                          {c.image && (
                            <img src={c.image} alt="shared" className="mt-2 rounded-lg max-h-36 object-cover" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input Bar */}
              <form onSubmit={handleSendMessage} className="pt-4 border-t border-stone-100 space-y-2">
                <div className="flex gap-2">
                  <button 
                    type="button" 
                    onClick={handleSendPresetAudio}
                    title="Enviar nota de voz demo" 
                    className="p-2.5 bg-amber-50 hover:bg-amber-100 text-amber-950 rounded-xl border border-amber-900/10 transition"
                  >
                    <Mic className="w-5 h-5" />
                  </button>
                  <input 
                    type="text" 
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Escribe un relato o responde al grupo familiar..." 
                    className="flex-grow bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:ring-1 focus:ring-amber-900 focus:outline-none" 
                  />
                  <button type="submit" className="p-2.5 bg-amber-900 hover:bg-amber-800 text-white rounded-xl shadow transition">
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>

            {/* Conversation Sidebar */}
            <div className="space-y-6">
              {/* Online members */}
              <div className="bg-white border border-stone-200 rounded-3xl p-5 shadow-sm space-y-4">
                <h4 className="font-serif font-bold text-stone-900">Familia en línea</h4>
                <div className="space-y-3">
                  {album.members.map((m, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <img src={m.avatar} alt={m.name} className="w-7 h-7 rounded-full object-cover" />
                          {m.online && (
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border border-white rounded-full"></span>
                          )}
                        </div>
                        <span className="font-bold text-stone-700">{m.name}</span>
                      </div>
                      {m.typing ? (
                        <span className="text-[10px] text-amber-900 font-bold uppercase animate-pulse">Escribiendo...</span>
                      ) : m.online ? (
                        <span className="text-[10px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-full uppercase">Activo</span>
                      ) : (
                        <span className="text-[10px] text-stone-400">Inactivo</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Highlights mini gallery */}
              <div className="bg-white border border-stone-200 rounded-3xl p-5 shadow-sm space-y-3">
                <h4 className="font-serif font-bold text-stone-900">Momentos destacados</h4>
                <div className="grid grid-cols-2 gap-2">
                  {album.memories.slice(0, 3).map((m, idx) => (
                    <img key={idx} src={m.imageUrl} alt="highlight" className="aspect-square object-cover rounded-lg w-full" />
                  ))}
                  <button onClick={() => setActiveTab('Recuerdos')} className="aspect-square bg-stone-50 hover:bg-stone-100 rounded-lg flex items-center justify-center font-bold text-amber-900 border border-dashed border-stone-300">
                    +
                  </button>
                </div>
              </div>
            </div>

          </div>
        );

      default: // Historia
        return (
          <div className="w-full flex flex-col md:flex-row gap-12">
            
            {/* Chapters and quote (Left) */}
            <div className="md:w-2/3 space-y-12">
              {album.chapters.map((ch) => (
                <section key={ch.id} className="space-y-4">
                  <p className="text-xs font-bold text-stone-500 uppercase tracking-widest">{ch.chapterNum}</p>
                  <h2 className="text-3xl font-serif font-bold text-stone-950">{ch.title}</h2>
                  
                  <div className={`flex flex-col md:flex-row gap-6 ${ch.imageSide === 'left' ? 'md:flex-row-reverse' : ''}`}>
                    <p className="text-stone-700 leading-relaxed text-sm flex-grow">
                      {ch.text}
                    </p>
                    <div className="md:w-1/3 aspect-[3/4] rounded-2xl overflow-hidden shadow-md border border-stone-200">
                      <img src={ch.image} className="w-full h-full object-cover" alt={ch.title} />
                    </div>
                  </div>
                </section>
              ))}

              {album.quote && (
                <blockquote className="text-2xl font-serif text-amber-950 italic text-center py-12 border-y border-stone-200">
                  "{album.quote}"
                  {album.quoteAuthor && (
                    <footer className="text-xs not-italic mt-4 text-stone-500 uppercase tracking-widest">— {album.quoteAuthor}</footer>
                  )}
                </blockquote>
              )}

              {/* Key Moments gallery header */}
              <div className="space-y-4">
                <h3 className="text-xl font-serif font-bold text-stone-900">Momentos Clave</h3>
                <p className="text-xs text-stone-500">Pequeños instantes capturados en el tiempo.</p>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                  {album.memories.map((m, idx) => (
                    <div key={idx} className="group bg-white p-2 rounded-xl border border-stone-200 shadow-sm hover:shadow transition">
                      <img src={m.imageUrl} className="aspect-square object-cover rounded-lg w-full mb-1" alt={m.caption} />
                      <p className="text-[10px] text-stone-500 text-center truncate italic">"{m.caption}"</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar (Right) */}
            <aside className="md:w-1/3 space-y-8">
              
              {/* Info card */}
              <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-6">
                <h3 className="font-serif text-xl font-bold text-stone-950">Sobre este viaje</h3>
                
                {/* Simulated map placeholder */}
                <div className="aspect-[16/10] bg-stone-100 rounded-2xl border border-stone-200 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>
                  <div className="text-center p-4">
                    <MapPin className="w-8 h-8 text-amber-900 mx-auto mb-2 animate-bounce" />
                    <p className="text-xs font-bold text-stone-800">{album.location}</p>
                  </div>
                </div>

                <div className="space-y-4 text-sm text-stone-700">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-stone-400" />
                    <span>{album.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Heart className="w-5 h-5 text-stone-400" />
                    <span>Categorías: <span className="font-semibold text-stone-900">{album.companions.join(', ')}</span></span>
                  </div>
                </div>

                <div className="flex justify-between mt-6 pt-6 border-t border-stone-100">
                  <div className="text-center">
                    <p className="text-3xl font-bold font-serif text-amber-950">{album.imagesCount}</p>
                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">FOTOS</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold font-serif text-amber-950">{album.videosCount}</p>
                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">VÍDEOS</p>
                  </div>
                </div>
              </div>

              {/* Viajeros List card */}
              <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
                <h3 className="font-serif text-xl font-bold text-stone-950">Viajeros</h3>
                <div className="space-y-3">
                  {album.members.slice(0, 3).map((m, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <img src={m.avatar} alt={m.name} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <p className="text-xs font-bold text-stone-800">{m.name}</p>
                        <p className="text-[10px] text-stone-500">{m.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => setActiveTab('Personas')}
                  className="w-full text-center border border-dashed border-stone-300 hover:border-stone-500 py-2.5 rounded-xl text-xs font-bold text-stone-700 transition"
                >
                  + INVITAR A ALGUIEN
                </button>
              </div>

            </aside>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 flex flex-col">
      {/* Hero Banner */}
      <div className="relative h-96 bg-stone-900">
        <img src={album.coverImage} alt={album.title} className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        
        {/* Back navigation */}
        <button 
          onClick={onBack} 
          className="absolute top-6 left-6 bg-white/10 backdrop-blur-md hover:bg-white/20 p-2.5 rounded-full text-white transition flex items-center gap-1.5"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-xs font-bold uppercase pr-2">Volver</span>
        </button>

        {/* Hero bottom content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-4 text-xs font-semibold mb-2 opacity-90">
            <span className="flex items-center gap-1 bg-white/20 px-3 py-1.5 rounded-full"><Calendar className="w-3.5 h-3.5" /> {album.date}</span>
            <span className="flex items-center gap-1 bg-white/20 px-3 py-1.5 rounded-full"><MapPin className="w-3.5 h-3.5" /> {album.location}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-2">{album.title}</h1>
          <p className="text-lg italic mb-6 opacity-95">"{album.description}"</p>
          
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex -space-x-3">
              {album.members.slice(0, 3).map((m, idx) => (
                <img key={idx} src={m.avatar} alt={m.name} className="w-10 h-10 rounded-full object-cover border-2 border-white" />
              ))}
              {album.members.length > 3 && (
                <div className="w-10 h-10 rounded-full bg-stone-700 border-2 border-white flex items-center justify-center text-xs text-white font-bold">
                  +{album.members.length - 3}
                </div>
              )}
            </div>
            
            <button className="bg-white/15 backdrop-blur-md hover:bg-white/25 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition">
              <Share2 className="w-4 h-4" /> Compartir
            </button>
            <button 
              onClick={onAddMemoryClick}
              className="bg-amber-900 hover:bg-amber-800 text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition shadow"
            >
              <Camera className="w-4 h-4" /> Añadir Recuerdo
            </button>
          </div>
        </div>
      </div>

      {/* Album Tabs */}
      <div className="border-b border-stone-200 bg-white sticky top-[72px] z-20">
        <div className="max-w-7xl mx-auto px-8 flex gap-8">
          {['Historia', 'Recuerdos', 'Personas', 'Conversación'].map((tab) => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)} 
              className={`py-4 text-xs font-bold uppercase tracking-widest border-b-2 transition ${
                activeTab === tab ? 'text-amber-900 border-amber-900' : 'text-stone-500 border-transparent hover:text-amber-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-8 py-12 flex-grow w-full">
        {renderContent()}
      </main>

      {/* Image Preview Zoom Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4 cursor-pointer" onClick={() => setSelectedPhoto(null)}>
          <img src={selectedPhoto} className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl" alt="Preview" />
        </div>
      )}
    </div>
  );
};
