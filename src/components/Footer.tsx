import React from 'react';
import { BookOpen } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Footer = () => {
  const { t, language } = useLanguage();
  return (
    <footer className="px-8 py-12 border-t border-stone-200 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-stone-500 gap-4">
            <p>© 2026 AnMemoryNest. {t('createAlbum.copyright') || (language === 'es' ? 'Tus recuerdos, construidos entre todos.' : 'Your memories, built together.')}</p>
            <div className="flex flex-wrap gap-4 md:gap-6 justify-center">
                <a href="#" className="hover:text-amber-900">{language === 'es' ? 'Política de Privacidad' : 'Privacy Policy'}</a>
                <a href="#" className="hover:text-amber-900">{language === 'es' ? 'Términos de Servicio' : 'Terms of Service'}</a>
                <a href="#" className="hover:text-amber-900">{language === 'es' ? 'Centro de Ayuda' : 'Help Center'}</a>
                <a href="#" className="hover:text-amber-900">{language === 'es' ? 'Contacto' : 'Contact Us'}</a>
            </div>
        </div>
      </div>
    </footer>
  );
};
