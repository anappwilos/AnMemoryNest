import React from 'react';
import { Leaf, ArrowRight, Play } from 'lucide-react';
import { PROJECT_IMAGES } from '../lib/images';

export const LandingPage = ({ onStart }: { onStart: () => void }) => {
  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900">
      {/* Header */}
      <header className="px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Leaf className="w-8 h-8 text-amber-900" />
          <h1 className="text-3xl font-serif font-bold text-amber-900">MemoryNest</h1>
        </div>
      </header>

      {/* Hero */}
      <main className="px-8 py-16 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl md:text-6xl font-serif text-amber-950 mt-4 mb-6">No guardes solo fotos. <span className="italic text-amber-800">Preserva las historias</span> detrás de ellas.</h2>
          <p className="text-lg text-stone-600 mb-8">La primera cápsula del tiempo inteligente diseñada para capturar la voz, las emociones y los relatos que hacen que cada recuerdo familiar sea único.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={onStart} className="bg-amber-900 text-white px-8 py-3 rounded-full font-medium hover:bg-amber-800 flex items-center justify-center gap-2">
              Comenzar <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="relative hidden md:block">
          <div className="absolute top-0 right-0 w-3/4 rotate-3 bg-white p-4 shadow-lg rounded-sm">
             <img src={PROJECT_IMAGES.LANDING.HERO_FAMILY} alt="Family dinner" className="w-full h-64 object-cover" />
             <p className="text-xs mt-2 text-stone-500">La cena de Navidad, 1988</p>
          </div>
          <div className="absolute top-20 right-10 w-2/3 -rotate-6 bg-white p-4 shadow-lg rounded-sm">
             <img src={PROJECT_IMAGES.TRAVEL.SUNSET} alt="Interrail journey" className="w-full h-64 object-cover" />
             <p className="text-xs mt-2 text-stone-500">Interrail 2026</p>
          </div>
          <div className="h-96"></div>
        </div>
      </main>
    </div>
  );
};
