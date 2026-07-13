import React from 'react';
import { BookOpen, Sparkles, Play, Lock, Users } from 'lucide-react';
import { PROJECT_IMAGES } from '../lib/images';
import { useLanguage } from '../context/LanguageContext';

export const CreateAlbum = ({ onAlbumCreated }: { onAlbumCreated: (title: string, category: string, date: string, location: string) => void }) => {
  const { t, language } = useLanguage();
  const [title, setTitle] = React.useState('');
  const [category, setCategory] = React.useState('travel');
  const [date, setDate] = React.useState('');
  const [location, setLocation] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAlbumCreated(
      title || (language === 'es' ? 'Mi Álbum de Recuerdos' : 'My Memory Album'), 
      category, 
      date || new Date().toLocaleDateString(), 
      location || (language === 'es' ? 'Sin ubicación' : 'No location')
    );
  };
  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900">
      {/* Header */}
      <header className="px-4 md:px-8 py-6 flex items-center justify-between border-b border-stone-200 bg-white">
        <div className="flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-amber-900" />
            <h1 className="text-xl md:text-2xl font-serif font-bold text-amber-900">AnMemoryNest</h1>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-stone-600">
          <a href="#" className="hover:text-amber-900">{language === 'es' ? 'Cómo funciona' : 'How it works'}</a>
          <a href="#" className="hover:text-amber-900">{language === 'es' ? 'Casos de uso' : 'Use cases'}</a>
          <a href="#" className="hover:text-amber-900">{language === 'es' ? 'Privacidad' : 'Privacy'}</a>
          <a href="#" className="hover:text-amber-900">{language === 'es' ? 'Precios' : 'Pricing'}</a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="px-4 md:px-8 py-8 md:py-16 max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
        <div className="w-full md:w-1/2">
            <p className="text-xs font-bold tracking-widest text-amber-900 uppercase mb-4">
              {language === 'es' ? 'Paso 1 de 2 · Crea tu primer álbum' : 'Step 1 of 2 · Create your first album'}
            </p>
            <h2 className="text-4xl md:text-6xl font-serif text-stone-950 mb-6">
              {language === 'es' ? 'Empieza tu historia' : 'Start your story'}
            </h2>
            <p className="text-sm md:text-lg text-stone-600 mb-8">
              {language === 'es' ? 'Define los cimientos de tu archivo digital. Es el primer paso para preservar lo que importa.' : 'Define the foundations of your digital archive. It is the first step to preserve what matters.'}
            </p>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">{t('createAlbum.formTitle')}</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder={language === 'es' ? 'Ej. Viaje a Italia, Verano 2026' : 'e.g., Italy Trip, Summer 2026'} className="w-full bg-stone-100 border border-stone-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-900 focus:outline-none" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">{language === 'es' ? 'Fecha (Aproximada)' : 'Date (Approximate)'}</label>
                    <input type="text" value={date} onChange={(e) => setDate(e.target.value)} placeholder={language === 'es' ? 'Ej. Agosto 2026' : 'e.g., August 2026'} className="w-full bg-stone-100 border border-stone-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-900 focus:outline-none" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">{t('createAlbum.formLocation')}</label>
                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder={language === 'es' ? 'Ej. Roma, Italia' : 'e.g., Rome, Italy'} className="w-full bg-stone-100 border border-stone-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-900 focus:outline-none" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">{t('createAlbum.formCategory')}</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-stone-100 border border-stone-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-900 focus:outline-none" required>
                        <option value="travel">{language === 'es' ? 'Viajes' : 'Travel'}</option>
                        <option value="family">{language === 'es' ? 'Familia' : 'Family'}</option>
                        <option value="other">{language === 'es' ? 'Otro' : 'Other'}</option>
                    </select>
                </div>
                <button type="submit" className="w-full bg-amber-900 text-white font-bold py-3 rounded-lg hover:bg-amber-800 flex items-center justify-center gap-2 transition cursor-pointer">
                    {t('createAlbum.createBtn')} <span>&gt;</span>
                </button>
                <p className="text-sm text-stone-500 text-center">
                  {language === 'es' ? 'No te preocupes, podrás cambiar estos detalles más tarde.' : "Don't worry, you can change these details later."}
                </p>
            </form>
            
            <div className="border-t border-stone-200 mt-8 pt-6 flex flex-wrap gap-4 md:gap-6">
                <div className="flex items-center gap-2 text-stone-600 text-sm"><Lock className="w-4 h-4" /> {language === 'es' ? 'Privado por defecto' : 'Private by default'}</div>
                <div className="flex items-center gap-2 text-stone-600 text-sm"><Users className="w-4 h-4" /> {language === 'es' ? 'Colaborativo' : 'Collaborative'}</div>
            </div>
        </div>

        <div className="w-full md:w-1/2 relative hidden sm:block">
            <img src={PROJECT_IMAGES.LANDING.HERO_FAMILY} alt="Family" className="w-full h-full object-cover rounded-xl" />
            <div className="absolute bottom-4 md:bottom-10 left-4 md:left-10 right-4 md:right-10 bg-white/90 backdrop-blur-sm p-4 md:p-6 rounded-xl shadow-lg border border-stone-100">
                <div className="flex items-center gap-3 mb-4">
                    <Sparkles className="w-5 h-5 text-amber-900" />
                    <span className="text-[10px] md:text-xs font-bold text-amber-900 uppercase tracking-widest">AI SUGGESTION</span>
                </div>
                <p className="text-sm md:text-lg text-stone-900 mb-4">
                  {language === 'es' ? '¿Por qué no empiezas con vuestro último viaje juntos?' : 'Why not start with your last trip together?'}
                </p>
                <div className="flex items-center justify-between bg-stone-100 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                        <Play className="w-4 h-4 text-amber-900" />
                        <span className="text-sm font-medium">{language === 'es' ? 'Voz guardada' : 'Saved voice'}</span>
                    </div>
                </div>
            </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="px-4 md:px-8 py-8 border-t border-stone-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-sm text-stone-500 gap-4">
            <p>{t('createAlbum.copyright')}</p>
            <div className="flex flex-wrap gap-4 md:gap-6">
                <a href="#" className="hover:text-amber-900">{language === 'es' ? 'Producto' : 'Product'}</a>
                <a href="#" className="hover:text-amber-900">{language === 'es' ? 'Ayuda' : 'Help'}</a>
                <a href="#" className="hover:text-amber-900">{language === 'es' ? 'Privacidad' : 'Privacy'}</a>
                <a href="#" className="hover:text-amber-900">{language === 'es' ? 'Precios' : 'Prices'}</a>
                <a href="#" className="hover:text-amber-900">{language === 'es' ? 'Términos' : 'Terms'}</a>
                <a href="#" className="hover:text-amber-900">{language === 'es' ? 'Seguridad' : 'Security'}</a>
            </div>
        </div>
      </footer>
    </div>
  );
};
