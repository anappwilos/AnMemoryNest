import React from 'react';
import { Leaf, ArrowRight } from 'lucide-react';
import { PROJECT_IMAGES } from '../lib/images';
import { useLanguage } from '../context/LanguageContext';

export const LandingPage = ({ onStart }: { onStart: () => void }) => {
  const { t, language, setLanguage } = useLanguage();

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900">
      {/* Header */}
      <header className="px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Leaf className="w-8 h-8 text-amber-900" />
          <h1 className="text-3xl font-serif font-bold text-amber-900">AnMemoryNest</h1>
        </div>
        
        {/* Language Switcher */}
        <div className="flex items-center bg-stone-100 rounded-xl p-0.5 border border-stone-200">
          <button
            onClick={() => setLanguage('es')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              language === 'es' ? 'bg-amber-900 text-white shadow-sm' : 'text-stone-500 hover:text-stone-950'
            }`}
          >
            ES
          </button>
          <button
            onClick={() => setLanguage('en')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              language === 'en' ? 'bg-amber-900 text-white shadow-sm' : 'text-stone-500 hover:text-stone-950'
            }`}
          >
            EN
          </button>
        </div>
      </header>

      {/* Hero */}
      <main className="px-8 py-16 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl md:text-6xl font-serif text-amber-950 mt-4 mb-6">
            {t('landing.title')} <span className="italic text-amber-800">{t('landing.titleItalic')}</span>{t('landing.titleSuffix')}
          </h2>
          <p className="text-lg text-stone-600 mb-8">{t('landing.description')}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={onStart} className="bg-amber-900 text-white px-8 py-3 rounded-full font-medium hover:bg-amber-800 flex items-center justify-center gap-2 cursor-pointer transition">
              {t('landing.startBtn')} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="relative hidden md:block">
          <div className="absolute top-0 right-0 w-3/4 rotate-3 bg-white p-4 shadow-lg rounded-sm">
             <img src={PROJECT_IMAGES.LANDING.HERO_FAMILY} alt="Family dinner" className="w-full h-64 object-cover" />
             <p className="text-xs mt-2 text-stone-500">{t('landing.christmasCaption')}</p>
          </div>
          <div className="absolute top-20 right-10 w-2/3 -rotate-6 bg-white p-4 shadow-lg rounded-sm">
             <img src={PROJECT_IMAGES.TRAVEL.SUNSET} alt="Interrail journey" className="w-full h-64 object-cover" />
             <p className="text-xs mt-2 text-stone-500">{t('landing.interrailCaption')}</p>
          </div>
          <div className="h-96"></div>
        </div>
      </main>
    </div>
  );
};
