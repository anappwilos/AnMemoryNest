import React, { useState } from 'react';
import { Camera, BookOpen, Search, Sparkles, SlidersHorizontal, ArrowRight, UserCheck } from 'lucide-react';
import { Album } from '../types';

interface DashboardProps {
  albums: Album[];
  onAlbumClick: (albumId: string) => void;
  onAddMemoryClick: () => void;
  onNavigateToTab: (tab: string) => void;
}

export const Dashboard = ({ albums, onAlbumClick, onAddMemoryClick, onNavigateToTab }: DashboardProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredAlbums = albums.filter((a) => {
    const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          a.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || a.companions.includes(categoryFilter);
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="p-8 max-w-7xl mx-auto space-y-12">
      
      {/* Dynamic Welcome Greeting Banner */}
      <div className="bg-gradient-to-br from-amber-900/10 via-amber-800/5 to-transparent rounded-3xl p-8 border border-amber-900/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <h2 className="text-5xl font-serif text-stone-950 font-bold">Hola, María</h2>
          <p className="text-stone-600 max-w-lg">Tienes nuevos recuerdos compartidos de la <span className="font-bold text-stone-900">Familia García</span> esperándote.</p>
          
          <div className="flex flex-wrap gap-3 pt-2">
            <button 
              onClick={onAddMemoryClick} 
              className="bg-amber-900 text-white hover:bg-amber-800 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition shadow hover:shadow-md"
            >
              <Camera className="w-4 h-4" /> Añadir Recuerdo
            </button>
            <button 
              onClick={() => onNavigateToTab('Timeline')} 
              className="bg-white border border-stone-200 text-stone-800 hover:bg-stone-50 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition"
            >
              <BookOpen className="w-4 h-4" /> Ver Bitácora
            </button>
          </div>
        </div>

        {/* AI Quick Shortcut Widget */}
        <div 
          onClick={() => onNavigateToTab('AI-Assistant')}
          className="bg-white p-5 rounded-2xl shadow-sm border border-stone-200 hover:border-amber-900/20 cursor-pointer transition flex items-center gap-4 max-w-sm"
        >
          <div className="p-3 bg-amber-50 rounded-xl text-amber-950">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div className="space-y-0.5">
            <h4 className="font-bold text-stone-900 text-sm flex items-center gap-1">
              Organidad Inteligente
              <span className="w-2 h-2 rounded-full bg-amber-900 block animate-ping"></span>
            </h4>
            <p className="text-xs text-stone-500">Revisa 3 rostros y fechas sugeridas por el Asistente IA.</p>
          </div>
        </div>
      </div>

      {/* Catalog Search and Filters Section */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h3 className="text-2xl font-serif text-stone-950 font-bold">Tus Álbumes de Recuerdos</h3>
          <p className="text-xs text-stone-500 uppercase tracking-widest font-semibold mt-0.5">Cápsulas del tiempo privadas y compartidas</p>
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {/* Search bar */}
          <div className="relative flex-grow md:flex-grow-0 md:w-64">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por título o lugar..." 
              className="w-full pl-9 pr-4 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:ring-1 focus:ring-amber-900 focus:outline-none"
            />
            <Search className="absolute left-3.5 top-2.5 w-3.5 h-3.5 text-stone-400" />
          </div>

          {/* Categories filter */}
          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-1 focus:ring-amber-900 focus:outline-none"
          >
            <option value="all">Todas las categorías</option>
            <option value="Familia">Familia</option>
            <option value="Amigos">Amigos</option>
            <option value="Compañeros">Compañeros</option>
          </select>
        </div>
      </div>

      {/* Album Grid */}
      {filteredAlbums.length === 0 ? (
        <div className="text-center p-16 bg-white border border-stone-200 rounded-3xl space-y-4">
          <p className="text-stone-500 font-serif">No hemos encontrado ningún álbum que coincida con tu búsqueda.</p>
          <button 
            onClick={() => { setSearchQuery(''); setCategoryFilter('all'); }}
            className="text-amber-900 font-bold text-sm hover:underline"
          >
            Limpiar filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredAlbums.map((album) => (
            <div 
              key={album.id} 
              className="group cursor-pointer bg-white border border-stone-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              onClick={() => onAlbumClick(album.id)}
            >
              <div>
                <div className="aspect-[4/3] bg-stone-100 rounded-xl mb-4 overflow-hidden relative border border-stone-100">
                  <img src={album.coverImage} alt={album.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <span className="absolute top-3 left-3 bg-white/80 backdrop-blur-md text-stone-900 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {album.companions[0] || 'Álbum'}
                  </span>
                </div>
                
                <h3 className="font-serif text-xl text-stone-950 font-bold group-hover:text-amber-950 transition-colors line-clamp-1">{album.title}</h3>
                <p className="text-xs text-stone-500 font-medium mb-1 flex items-center gap-1">
                  <span>{album.location}</span>
                </p>
                <p className="text-xs text-stone-400 italic mb-4 line-clamp-2">"{album.description}"</p>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-stone-50">
                <div className="flex -space-x-2">
                  {album.members.slice(0, 3).map((m, idx) => (
                    <img 
                      key={idx} 
                      src={m.avatar} 
                      alt={m.name} 
                      title={m.name} 
                      className="w-6 h-6 rounded-full object-cover border-2 border-white" 
                    />
                  ))}
                  {album.members.length > 3 && (
                    <div className="w-6 h-6 rounded-full bg-stone-700 border-2 border-white flex items-center justify-center text-[8px] text-white font-bold">
                      +{album.members.length - 3}
                    </div>
                  )}
                </div>
                
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest flex items-center gap-1 group-hover:text-amber-900 transition-colors">
                  Explorar <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};
