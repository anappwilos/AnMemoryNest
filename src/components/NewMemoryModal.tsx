import React, { useState, useRef } from 'react';
import { X, Camera, Mic, MapPin, Calendar, Check, AlertCircle } from 'lucide-react';
import { Album } from '../types';

interface NewMemoryModalProps {
  albums: Album[];
  onClose: () => void;
  onSave: (albumId: string, memory: {
    imageUrl: string;
    caption: string;
    date: string;
    location: string;
    voiceDuration?: string;
  }) => void;
  defaultAlbumId?: string;
}

const PRESET_IMAGES = [
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1534080391025-a17c0af14a7f?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1513807016779-d51c0c026263?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=400'
];

export const NewMemoryModal = ({ albums, onClose, onSave, defaultAlbumId }: NewMemoryModalProps) => {
  const [selectedAlbumId, setSelectedAlbumId] = useState(defaultAlbumId || albums[0]?.id || '');
  const [caption, setCaption] = useState('');
  const [date, setDate] = useState('2026-07-12');
  const [location, setLocation] = useState('');
  const [selectedImage, setSelectedImage] = useState(PRESET_IMAGES[0]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedDuration, setRecordedDuration] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [success, setSuccess] = useState(false);

  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [seconds, setSeconds] = useState(0);

  const handleStartRecording = () => {
    setIsRecording(true);
    setSeconds(0);
    recordingIntervalRef.current = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
    }
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    setRecordedDuration(`${mins}:${secs < 10 ? '0' : ''}${secs}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(selectedAlbumId, {
      imageUrl: selectedImage,
      caption: caption || 'Un hermoso recuerdo guardado.',
      date,
      location,
      voiceDuration: recordedDuration || undefined
    });
    setSuccess(true);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-stone-50 border border-stone-200 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-stone-200 bg-white flex items-center justify-between">
          <div>
            <h3 className="font-serif text-2xl text-stone-900 font-bold">Añadir Nuevo Recuerdo</h3>
            <p className="text-xs text-stone-500 uppercase tracking-wider font-semibold">Captura la voz y las historias detrás de la foto</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full transition text-stone-500">
            <X className="w-6 h-6" />
          </button>
        </div>

        {success ? (
          <div className="p-12 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center">
              <Check className="w-10 h-10" />
            </div>
            <h4 className="font-serif text-2xl text-stone-950 font-bold">¡Recuerdo Preservado!</h4>
            <p className="text-stone-600 max-w-md">Tu historia ha sido guardada de manera segura en la cápsula y compartida con el grupo familiar.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-grow">
            
            {/* Album Selector */}
            <div>
              <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Selecciona el Álbum de Destino</label>
              <select 
                value={selectedAlbumId} 
                onChange={(e) => setSelectedAlbumId(e.target.value)}
                className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-900 focus:outline-none"
                required
              >
                <option value="">-- Selecciona un álbum --</option>
                {albums.map(a => (
                  <option key={a.id} value={a.id}>{a.title}</option>
                ))}
              </select>
            </div>

            {/* Photo Selection Area */}
            <div>
              <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Sube o Elige una Fotografía</label>
              
              <div 
                className={`border-2 border-dashed rounded-2xl p-6 text-center transition cursor-pointer bg-white ${
                  dragActive ? 'border-amber-900 bg-amber-50/30' : 'border-stone-200 hover:border-stone-400'
                }`}
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                onDrop={(e) => { e.preventDefault(); setDragActive(false); }}
              >
                <div className="flex flex-col items-center justify-center space-y-2">
                  <Camera className="w-10 h-10 text-stone-400" />
                  <p className="text-sm font-medium text-stone-700">Arrastra tu fotografía aquí o selecciona una del archivo</p>
                  <p className="text-xs text-stone-400">Archivos PNG, JPG o WEBP de hasta 10MB</p>
                </div>
              </div>

              {/* Preset Carousel */}
              <div className="mt-4">
                <p className="text-xs text-stone-500 mb-2">O selecciona una imagen de demostración:</p>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {PRESET_IMAGES.map((img, idx) => (
                    <button 
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImage(img)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition ${
                        selectedImage === img ? 'border-amber-900 scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="preset" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Caption / Story */}
            <div>
              <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Relato del Recuerdo (¿Qué ocurrió?)</label>
              <textarea 
                value={caption} 
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Describe quién aparece, qué estabais celebrando o qué sentías en ese instante..."
                rows={3}
                className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-900 focus:outline-none"
                required
              />
            </div>

            {/* Metadata (Date & Location) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Fecha</label>
                <div className="relative">
                  <input 
                    type="date" 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-white border border-stone-200 rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-amber-900 focus:outline-none text-sm"
                  />
                  <Calendar className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-400" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Ubicación</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Ej. Playa de Levante, Benidorm"
                    className="w-full bg-white border border-stone-200 rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-amber-900 focus:outline-none text-sm"
                  />
                  <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-400" />
                </div>
              </div>
            </div>

            {/* Voice Recording Feature Card */}
            <div className="bg-amber-50/40 border border-amber-900/10 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="font-serif font-bold text-stone-900 flex items-center gap-2">
                  <Mic className="w-4 h-4 text-amber-950" />
                  Suma su voz (Legacy Audio)
                </h4>
                <p className="text-xs text-stone-600">Graba la voz de tus familiares narrando la historia detrás de este instante.</p>
                {recordedDuration && (
                  <p className="text-xs text-emerald-800 font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Grabación de voz adjunta ({recordedDuration})
                  </p>
                )}
              </div>
              <div className="w-full md:w-auto flex justify-end">
                {isRecording ? (
                  <button 
                    type="button" 
                    onClick={handleStopRecording} 
                    className="bg-red-600 text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 animate-pulse"
                  >
                    <span className="w-2 h-2 rounded-full bg-white block animate-ping"></span>
                    Parar ({seconds}s)
                  </button>
                ) : (
                  <button 
                    type="button" 
                    onClick={handleStartRecording} 
                    className="bg-amber-900 text-white hover:bg-amber-800 px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 transition"
                  >
                    <Mic className="w-3.5 h-3.5" />
                    {recordedDuration ? 'Grabar de nuevo' : 'Grabar voz'}
                  </button>
                )}
              </div>
            </div>

            {/* Submit */}
            <button 
              type="submit" 
              className="w-full bg-amber-900 text-white font-serif text-lg font-bold py-3.5 rounded-xl hover:bg-amber-800 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition"
            >
              <Check className="w-5 h-5" />
              Preservar este Recuerdo
            </button>

          </form>
        )}
      </div>
    </div>
  );
};
