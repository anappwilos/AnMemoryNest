import React, { useState } from 'react';
import { Calendar, MapPin, Sparkles, BookOpen, Clock } from 'lucide-react';
import { Album } from '../types';

interface TimelineViewProps {
  albums: Album[];
  onAlbumClick: (albumId: string) => void;
}

export const TimelineView = ({ albums, onAlbumClick }: { albums: Album[], onAlbumClick: (id: string) => void }) => {
  const [selectedAlbumFilter, setSelectedAlbumFilter] = useState<string>('all');

  // Flat map chapters or custom timeline points
  const timelineItems = albums
    .filter(a => selectedAlbumFilter === 'all' || a.id === selectedAlbumFilter)
    .flatMap(a => 
      a.chapters.map(c => ({
        ...c,
        albumId: a.id,
        albumTitle: a.title,
        date: a.date,
        location: a.location
      }))
    );

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-4xl font-serif text-stone-950 font-bold">Bitácora Cronológica</h2>
          <p className="text-stone-600">Explora la historia de tus álbumes agrupada en hermosos capítulos cronológicos.</p>
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Filtrar:</span>
          <select 
            value={selectedAlbumFilter}
            onChange={(e) => setSelectedAlbumFilter(e.target.value)}
            className="bg-white border border-stone-200 rounded-lg px-3 py-1.5 text-xs font-bold focus:ring-1 focus:ring-amber-900 focus:outline-none"
          >
            <option value="all">Todos los álbumes</option>
            {albums.map(a => (
              <option key={a.id} value={a.id}>{a.title}</option>
            ))}
          </select>
        </div>
      </div>

      {timelineItems.length === 0 ? (
        <div className="text-center p-16 bg-white border border-stone-200 rounded-3xl">
          <p className="text-stone-500">No hay capítulos para mostrar en esta línea temporal.</p>
        </div>
      ) : (
        <div className="relative border-l border-stone-200 ml-4 md:ml-8 space-y-12 py-4">
          {timelineItems.map((item, idx) => (
            <div key={idx} className="relative pl-8 md:pl-12 group">
              
              {/* Dot marker */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 border-amber-900 bg-stone-50 group-hover:bg-amber-900 transition-colors"></div>
              
              <div className="grid md:grid-cols-3 gap-6 bg-white p-6 rounded-3xl border border-stone-200 shadow-sm hover:shadow-md transition">
                
                {/* Text content (Col-span-2) */}
                <div className="md:col-span-2 space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-amber-900 uppercase tracking-widest bg-amber-50 px-2.5 py-1 rounded-full">{item.chapterNum}</span>
                    <h3 className="text-2xl font-serif font-bold text-stone-950 pt-1">{item.title}</h3>
                    
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-stone-500 font-semibold pt-1">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {item.date}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {item.location}</span>
                      <span className="text-amber-900 cursor-pointer hover:underline" onClick={() => onAlbumClick(item.albumId)}>
                        Álbum: {item.albumTitle}
                      </span>
                    </div>
                  </div>

                  <p className="text-stone-700 leading-relaxed text-sm pt-2">{item.text}</p>
                </div>

                {/* Picture Side */}
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-sm border border-stone-100">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                </div>

              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};
