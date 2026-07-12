import React from 'react';
import { Leaf, ArrowRight, Play } from 'lucide-react';

export const LandingPage = ({ onStart }: { onStart: () => void }) => {
  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900">
      {/* Header */}
      <header className="px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Leaf className="w-8 h-8 text-amber-900" />
          <h1 className="text-3xl font-serif font-bold text-amber-900">MemoryNest</h1>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-stone-600">
          <a href="#" className="hover:text-amber-900">Home</a>
          <a href="#" className="hover:text-amber-900">Albums</a>
          <a href="#" className="hover:text-amber-900">Timeline</a>
          <a href="#" className="hover:text-amber-900">People</a>
          <a href="#" className="hover:text-amber-900">Plans</a>
        </nav>
        <button className="hidden md:block bg-amber-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-amber-800">New Memory</button>
      </header>

      {/* Hero */}
      <main className="px-8 py-16 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-xs font-bold tracking-widest text-stone-500 uppercase">Tu herencia digital</span>
          <h2 className="text-4xl md:text-6xl font-serif text-amber-950 mt-4 mb-6">No guardes solo fotos. <span className="italic text-amber-800">Preserva las historias</span> detrás de ellas.</h2>
          <p className="text-lg text-stone-600 mb-8">La primera cápsula del tiempo inteligente diseñada para capturar la voz, las emociones y los relatos que hacen que cada recuerdo familiar sea único.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={onStart} className="bg-amber-900 text-white px-8 py-3 rounded-full font-medium hover:bg-amber-800 flex items-center justify-center gap-2">
              Crear mi cápsula <ArrowRight className="w-4 h-4" />
            </button>
            <button className="border border-stone-300 text-stone-800 px-8 py-3 rounded-full font-medium hover:bg-stone-100 flex items-center justify-center">Ver demo</button>
          </div>
        </div>
        <div className="relative hidden md:block">
          <div className="absolute top-0 right-0 w-3/4 rotate-3 bg-white p-4 shadow-lg rounded-sm">
             <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600" alt="Family dinner" className="w-full h-64 object-cover" />
             <p className="text-xs mt-2 text-stone-500">La cena de Navidad, 1988</p>
          </div>
          <div className="absolute top-20 right-10 w-2/3 -rotate-6 bg-white p-4 shadow-lg rounded-sm">
             <img src="https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=600" alt="Grandma" className="w-full h-64 object-cover" />
             <p className="text-xs mt-2 text-stone-500">Abuela en el pueblo</p>
          </div>
          <div className="h-96"></div>
        </div>
      </main>

      {/* Footer CTA */}
      <section className="bg-amber-800 text-white px-8 py-20 mt-16 text-center">
        <h3 className="text-4xl font-serif mb-6">Empezar el árbol genealógico de tus historias hoy.</h3>
        <p className="mb-10 opacity-90">Únete a miles de familias que ya están asegurando su legado emocional.</p>
        <button onClick={onStart} className="bg-white text-amber-900 px-8 py-3 rounded-full font-bold hover:bg-stone-100">Crear mi cápsula familiar</button>
      </section>
    </div>
  );
};
