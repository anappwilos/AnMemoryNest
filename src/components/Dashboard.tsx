import React, { useState } from 'react';
import { Camera, BookOpen, Search, Sparkles, SlidersHorizontal, ArrowRight, UserCheck } from 'lucide-react';
import { Album } from '../types';

interface DashboardProps {
  albums: Album[];
  userName?: string;
  onAlbumClick: (albumId: string) => void;
  onAddMemoryClick: () => void;
  onNavigateToTab: (tab: string) => void;
}

export const Dashboard = ({ albums, userName, onAlbumClick, onAddMemoryClick, onNavigateToTab }: DashboardProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredAlbums = albums.filter((a) => {
    const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          a.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || a.companions?.includes(categoryFilter);
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="p-6 max-w-7xl mx-auto space-y-8">
      
      {/* Dynamic Welcome Greeting Banner */}
      <div className="bg-white rounded-2xl p-8 border border-stone-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h2 className="text-4xl font-serif text-stone-950 font-bold">Hola, {userName ? userName.split(' ')[0] : 'Explorador'}</h2>
          <p className="text-stone-500 text-sm max-w-lg">Tienes tus recuerdos compartidos esperándote.</p>
          
          <div className="flex flex-wrap gap-3 pt-4">
            <button 
              onClick={onAddMemoryClick} 
              className="bg-primary text-white hover:opacity-90 px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition"
            >
              <Camera className="w-3.5 h-3.5" /> Añadir Recuerdo
            </button>
            <button 
              onClick={() => onNavigateToTab('Timeline')} 
              className="bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition"
            >
              <BookOpen className="w-3.5 h-3.5" /> Ver Bitácora
            </button>
          </div>
        </div>

        {/* AI Quick Shortcut Widget */}
        <div 
          onClick={() => onNavigateToTab('AI-Assistant')}
          className="bg-stone-50 p-4 rounded-xl border border-stone-100 hover:border-primary/20 cursor-pointer transition flex items-center gap-4 max-w-sm"
        >
          <div className="p-2.5 bg-white rounded-lg text-primary shadow-sm border border-stone-100">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="space-y-0.5">
            <h4 className="font-bold text-stone-900 text-xs">Asistente IA</h4>
            <p className="text-[10px] text-stone-500">Sugerencias y organización inteligente.</p>
          </div>
        </div>
      </div>

      {/* Catalog Search and Filters Section */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h3 className="text-xl font-serif text-stone-950 font-bold">Tus Álbumes</h3>
          <p className="text-[10px] text-stone-400 uppercase tracking-widest font-semibold mt-0.5">Cápsulas de tiempo privadas</p>
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {/* Search bar */}
          <div className="relative flex-grow md:flex-grow-0 md:w-64">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar..." 
              className="w-full pl-8 pr-3 py-1.5 bg-white border border-stone-200 rounded-md text-xs focus:ring-1 focus:ring-primary focus:outline-none"
            />
            <Search className="absolute left-2.5 top-2 w-3 h-3 text-stone-400" />
          </div>

          {/* Categories filter */}
          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-white border border-stone-200 rounded-md px-3 py-1.5 text-xs font-semibold focus:ring-1 focus:ring-primary focus:outline-none text-stone-600"
          >
            <option value="all">Categorías</option>
            <option value="Familia">Familia</option>
            <option value="Amigos">Amigos</option>
            <option value="Compañeros">Compañeros</option>
          </select>
        </div>
      </div>

      {/* Album Grid */}
      {filteredAlbums.length === 0 ? (
        <div className="text-center p-12 bg-white border border-stone-100 rounded-2xl space-y-3">
          <p className="text-stone-500 font-serif text-sm">No hemos encontrado ningún álbum.</p>
          <button 
            onClick={() => { setSearchQuery(''); setCategoryFilter('all'); }}
            className="text-primary font-bold text-xs hover:underline"
          >
            Limpiar filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredAlbums.map((album) => (
            <div 
              key={album.id} 
              className="group cursor-pointer bg-white border border-stone-100 rounded-xl p-3 shadow-sm hover:shadow transition flex flex-col justify-between"
              onClick={() => onAlbumClick(album.id)}
            >
              <div>
                <div className="aspect-[4/3] bg-stone-100 rounded-lg mb-3 overflow-hidden relative border border-stone-100">
                  <img src={album.coverImage} alt={album.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-stone-900 text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">
                    {album.companions[0] || 'Álbum'}
                  </span>
                </div>
                
                <h3 className="font-serif text-base text-stone-950 font-bold group-hover:text-primary transition-colors line-clamp-1">{album.title}</h3>
                <p className="text-[10px] text-stone-400 font-medium mb-3 flex items-center gap-1">
                  {album.location}
                </p>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-stone-50">
                <div className="flex -space-x-1.5">
                  {album.members.slice(0, 3).map((m, idx) => (
                    <img 
                      key={idx} 
                      src={m.avatar} 
                      alt={m.name} 
                      title={m.name} 
                      className="w-5 h-5 rounded-full object-cover border border-white" 
                    />
                  ))}
                  {album.members.length > 3 && (
                    <div className="w-5 h-5 rounded-full bg-stone-100 border border-white flex items-center justify-center text-[8px] text-stone-500 font-bold">
                      +{album.members.length - 3}
                    </div>
                  )}
                </div>
                
                <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest flex items-center gap-1 group-hover:text-primary transition-colors">
                  Explorar <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};
