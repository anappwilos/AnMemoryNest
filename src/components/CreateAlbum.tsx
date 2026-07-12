import React from 'react';
import { BookOpen, Sparkles, Play, Lock, Users } from 'lucide-react';

export const CreateAlbum = ({ onAlbumCreated }: { onAlbumCreated: (title: string, category: string) => void }) => {
  const [title, setTitle] = React.useState('');
  const [category, setCategory] = React.useState('travel');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAlbumCreated(title || 'Mi Álbum de Recuerdos', category);
  };
  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900">
      {/* Header */}
      <header className="px-8 py-6 flex items-center justify-between border-b border-stone-200 bg-white">
        <div className="flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-amber-900" />
            <h1 className="text-2xl font-serif font-bold text-amber-900">AnMemoryNest</h1>
        </div>
        <nav className="flex gap-8 text-sm font-medium text-stone-600">
          <a href="#" className="hover:text-amber-900">How it works</a>
          <a href="#" className="hover:text-amber-900">Use cases</a>
          <a href="#" className="hover:text-amber-900">Privacy</a>
          <a href="#" className="hover:text-amber-900">Pricing</a>
          <a href="#" className="hover:text-amber-900">Log in</a>
        </nav>
        <button className="bg-amber-900 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-amber-800">Crear álbum</button>
      </header>

      {/* Main Content */}
      <main className="px-8 py-16 max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
        <div className="md:w-1/2">
            <p className="text-xs font-bold tracking-widest text-amber-900 uppercase mb-4">Paso 1 de 2 · Crea tu primer álbum</p>
            <h2 className="text-6xl font-serif text-stone-950 mb-6">Empieza tu historia</h2>
            <p className="text-lg text-stone-600 mb-8">Define los cimientos de tu archivo digital. Es el primer paso para preservar lo que importa.</p>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Nombre del álbum</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ej. Viaje a Italia, Verano 2026" className="w-full bg-stone-100 border border-stone-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-900 focus:outline-none" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Tipo de historia</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-stone-100 border border-stone-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-900 focus:outline-none" required>
                        <option value="travel">Viajes</option>
                        <option value="family">Familia</option>
                        <option value="other">Otro</option>
                    </select>
                </div>
                <button type="submit" className="w-full bg-amber-900 text-white font-bold py-3 rounded-lg hover:bg-amber-800 flex items-center justify-center gap-2 transition cursor-pointer">
                    Crear álbum <span>&gt;</span>
                </button>
                <p className="text-sm text-stone-500 text-center">No te preocupes, podrás cambiar estos detalles más tarde.</p>
            </form>
            
            <div className="border-t border-stone-200 mt-8 pt-6 flex gap-6">
                <div className="flex items-center gap-2 text-stone-600"><Lock className="w-4 h-4" /> Privado por defecto</div>
                <div className="flex items-center gap-2 text-stone-600"><Users className="w-4 h-4" /> Colaborativo</div>
            </div>
        </div>

        <div className="w-1/2 relative">
            <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800" alt="Family" className="w-full h-full object-cover rounded-xl" />
            <div className="absolute bottom-10 left-10 right-10 bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-stone-100">
                <div className="flex items-center gap-3 mb-4">
                    <Sparkles className="w-5 h-5 text-amber-900" />
                    <span className="text-xs font-bold text-amber-900 uppercase tracking-widest">AI SUGGESTION</span>
                </div>
                <p className="text-lg text-stone-900 mb-4">¿Por qué no empiezas con vuestro último viaje juntos?</p>
                <div className="flex items-center justify-between bg-stone-100 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                        <Play className="w-4 h-4 text-amber-900" />
                        <span className="text-sm font-medium">Voz guardada</span>
                    </div>
                </div>
            </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="px-8 py-8 border-t border-stone-200">
        <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-6 h-6 text-amber-900" />
            <h1 className="text-xl font-serif font-bold text-amber-900">AnMemoryNest</h1>
        </div>
        <div className="flex justify-between items-center text-sm text-stone-500">
            <p>© 2026 AnMemoryNest. Tus recuerdos, construidos entre todos.</p>
            <div className="flex gap-6">
                <a href="#" className="hover:text-amber-900">Product</a>
                <a href="#" className="hover:text-amber-900">Help</a>
                <a href="#" className="hover:text-amber-900">Privacy</a>
                <a href="#" className="hover:text-amber-900">Prices</a>
                <a href="#" className="hover:text-amber-900">Terms</a>
                <a href="#" className="hover:text-amber-900">Security</a>
            </div>
        </div>
      </footer>
    </div>
  );
};
