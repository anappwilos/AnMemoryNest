import React, { useState } from 'react';
import { Camera, Share2, MapPin, Calendar, Heart, Users, Grid } from 'lucide-react';

export const AlbumDetail = () => {
  const [activeTab, setActiveTab] = useState('Historia');

  const renderContent = () => {
    switch (activeTab) {
      case 'Recuerdos':
        return (
            <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <img key={i} src={`https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400`} className="aspect-square object-cover rounded-lg" alt="Recuerdo" />
                ))}
            </div>
        );
      case 'Conversación':
        return (
            <div className="w-2/3 space-y-6">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-stone-100">
                    <p className="text-sm text-stone-700">¡Qué día tan increíble hoy en la Cala del Tío Ximo! ¿Alguien guardó el vídeo de los niños saltando desde las rocas?</p>
                </div>
                <div className="bg-amber-100 p-4 rounded-lg shadow-sm border border-amber-200">
                    <p className="text-sm text-stone-700">¡Aquí lo tengo! Los saltos fueron épicos 🤙</p>
                    <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400" className="mt-2 rounded-lg" alt="Jump" />
                </div>
                <div className="flex gap-2">
                    <input type="text" placeholder="Escribe un mensaje..." className="flex-grow border border-stone-200 rounded-lg px-4 py-2" />
                    <button className="bg-amber-900 text-white px-4 py-2 rounded-lg">Enviar</button>
                </div>
            </div>
        );
      default:
        return (
            <div className="w-2/3 space-y-12">
                {/* Chapter I */}
                <section>
                    <p className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-4">Capítulo I</p>
                    <h2 className="text-3xl font-serif font-bold mb-6">El Primer Amanecer</h2>
                    <div className="flex gap-6">
                        <p className="text-stone-700 leading-relaxed text-lg">
                            Llegamos a Benidorm cuando el sol apenas comenzaba a teñir de rosa los rascacielos. Había una calma inusual, solo rota por el murmullo rítmico de las olas rompiendo en la orilla de Levante.
                            <br /><br />
                            El olor a salitre nos recordó por qué volvemos aquí cada verano. Es esa mezcla de nostalgia y promesa lo que hace que cada viaje se sienta como el primero, una página en blanco esperando ser escrita.
                        </p>
                        <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400" className="w-1/3 aspect-[3/4] rounded-lg shadow-md" alt="Amanecer" />
                    </div>
                </section>
                
                {/* Quote */}
                <blockquote className="text-2xl font-serif text-amber-950 italic text-center py-12 border-y border-stone-200">
                    "Lo mejor no fue el destino, sino redescubrirnos entre helados y caminatas infinitas por el paseo marítimo."
                    <footer className="text-sm not-italic mt-4">— CRÓNICAS DEL MEDITERRÁNEO</footer>
                </blockquote>
            </div>
        );
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900">
        {/* Hero */}
        <div className="relative h-96">
            <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1600" alt="Benidorm" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white max-w-7xl mx-auto">
                <div className="flex gap-4 text-sm mb-2 opacity-90">
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> 10 - 20 julio, 2026</span>
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Benidorm, España</span>
                </div>
                <h1 className="text-5xl font-serif font-bold mb-2">Vacaciones en Benidorm 2026</h1>
                <p className="text-lg italic mb-6">"Arena, risas y el eco del Mediterráneo"</p>
                <div className="flex items-center gap-6">
                    <div className="flex -space-x-3">
                        <div className="w-10 h-10 rounded-full bg-stone-300 border-2 border-white"></div>
                        <div className="w-10 h-10 rounded-full bg-stone-400 border-2 border-white"></div>
                        <div className="w-10 h-10 rounded-full bg-stone-500 border-2 border-white flex items-center justify-center text-xs text-white">+3</div>
                    </div>
                    <button className="bg-white/20 backdrop-blur-sm px-5 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-white/30">
                        <Share2 className="w-4 h-4" /> Compartir
                    </button>
                    <button className="bg-amber-900 px-5 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-amber-800">
                        <Camera className="w-4 h-4" /> Añadir Recuerdo
                    </button>
                </div>
            </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-stone-200 bg-white">
            <div className="max-w-7xl mx-auto px-8 flex gap-8">
                {['Historia', 'Recuerdos', 'Personas', 'Conversación'].map((tab) => (
                    <button key={tab} onClick={() => setActiveTab(tab)} className={`py-4 text-sm font-bold uppercase tracking-widest ${activeTab === tab ? 'text-amber-900 border-b-2 border-amber-900' : 'text-stone-500'}`}>
                        {tab}
                    </button>
                ))}
            </div>
        </div>

        {/* Content */}
        <main className="max-w-7xl mx-auto px-8 py-12 flex gap-12">
            {renderContent()}

            {/* Sidebar */}
            {(activeTab !== 'Recuerdos' && activeTab !== 'Conversación') && (
                <aside className="w-1/3 space-y-8">
                    <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
                        <h3 className="font-serif text-xl font-bold mb-4">Sobre este viaje</h3>
                        <div className="aspect-[16/9] bg-stone-100 rounded-lg mb-4"></div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3"><Calendar className="w-5 h-5 text-stone-400" /> 10 días de sol puro</div>
                            <div className="flex items-center gap-3"><Heart className="w-5 h-5 text-stone-400" /> Nostalgia pura</div>
                            <div className="flex items-center gap-3"><Users className="w-5 h-5 text-stone-400" /> Familia, Amigos</div>
                        </div>
                        <div className="flex justify-between mt-6 pt-6 border-t border-stone-100">
                            <div className="text-center">
                                <p className="text-2xl font-bold">124</p>
                                <p className="text-xs text-stone-500">FOTOS</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold">12</p>
                                <p className="text-xs text-stone-500">VÍDEOS</p>
                            </div>
                        </div>
                    </div>
                </aside>
            )}
        </main>
    </div>
  );
};
