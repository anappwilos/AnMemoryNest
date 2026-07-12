import React from 'react';
import { Camera, BookOpen } from 'lucide-react';

export const Dashboard = ({ onAlbumClick }: { onAlbumClick: () => void }) => {
  return (
    <main className="p-8 max-w-7xl mx-auto">
      <h2 className="text-4xl font-serif text-stone-950 mb-2">Hola, María</h2>
      <p className="text-stone-600 mb-8">Tienes 3 nuevos recuerdos de la <span className="font-bold text-stone-900">Familia Garcia</span> esperándote.</p>
      
      <div className="flex gap-4 mb-12">
        <button className="bg-amber-900 text-white px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 hover:bg-amber-800">
            <Camera className="w-4 h-4" /> Añadir Recuerdo
        </button>
        <button className="bg-white border border-stone-200 text-stone-900 px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 hover:bg-stone-50">
            <BookOpen className="w-4 h-4" /> Ver Bitácora
        </button>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-serif text-stone-950">Tus Álbumes Recientes</h3>
        <a href="#" className="text-sm font-medium text-stone-600 hover:text-amber-900">Ver todos &rarr;</a>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
            { title: "Vacaciones en Benidorm 2026", date: "Agosto 2026 · Playa de Poniente" },
            { title: "Interrail Verano 2026", date: "Julio 2026 · Praga, República Checa" },
            { title: "Navidad en el Pueblo", date: "Diciembre 2025 · Zamora, España" }
        ].map((album, i) => (
          <div key={i} className="group cursor-pointer" onClick={onAlbumClick}>
            <div className="aspect-[4/3] bg-stone-200 rounded-lg mb-3 shadow-sm group-hover:shadow-md transition-shadow overflow-hidden">
                <img src={`https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400`} alt={album.title} className="w-full h-full object-cover" />
            </div>
            <h3 className="font-serif text-lg text-stone-950 font-bold">{album.title}</h3>
            <p className="text-sm text-stone-500 mb-2">{album.date}</p>
            <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-stone-300 border-2 border-white"></div>
                <div className="w-6 h-6 rounded-full bg-stone-400 border-2 border-white"></div>
                <div className="w-6 h-6 rounded-full bg-stone-500 border-2 border-white flex items-center justify-center text-[10px] text-white">+4</div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};
