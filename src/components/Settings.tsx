import React, { useState } from 'react';
import { User, Shield, Sparkles, RefreshCw, Check, AlertCircle, Save, Image, Copy, Code } from 'lucide-react';
import { Album, AISuggestion } from '../types';
import { MemoryAssistant } from './MemoryAssistant';
import { IMAGE_CATALOGUE } from '../lib/images';
import { useLanguage } from '../context/LanguageContext';

interface SettingsProps {
  user: any;
  albums: Album[];
  suggestions: AISuggestion[];
  onAcceptSuggestion: (id: string, customData?: any) => void;
  onIgnoreSuggestion: (id: string) => void;
  onUpdateUser?: (updatedProfile: { displayName: string; photoURL: string }) => void;
}

export const Settings = ({
  user,
  albums,
  suggestions,
  onAcceptSuggestion,
  onIgnoreSuggestion,
  onUpdateUser
}: SettingsProps) => {
  const { t, language } = useLanguage();
  const [activeSection, setActiveSection] = useState<'general' | 'ai' | 'security' | 'images'>('general');
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [avatarUrl, setAvatarUrl] = useState(user?.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100');
  const [isSaved, setIsSaved] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [imageSubTab, setImageSubTab] = useState<'active' | 'catalogue'>('catalogue');
  
  // AI specific states
  const [aiEnabled, setAiEnabled] = useState(true);
  const [autoFaceDetect, setAutoFaceDetect] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const [scanMessage, setScanMessage] = useState('');

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdateUser) {
      onUpdateUser({ displayName, photoURL: avatarUrl });
    }
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleScan = () => {
    setIsScanning(true);
    setScanMessage(t('settings.aiScanningMeta'));
    setTimeout(() => {
      setScanMessage(t('settings.aiScanningFaces'));
      setTimeout(() => {
        setIsScanning(false);
        setScanMessage(t('settings.aiScanComplete'));
        setTimeout(() => setScanMessage(''), 4000);
      }, 1500);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-amber-900">{t('settings.title')}</h1>
        <p className="text-sm text-stone-500 mt-1">{t('settings.subtitle')}</p>
      </div>

      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[500px]">
        {/* Settings Sidebar */}
        <div className="w-full md:w-64 bg-stone-50/50 border-r border-stone-200 p-4 space-y-1">
          <button
            onClick={() => setActiveSection('general')}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
              activeSection === 'general' ? 'bg-amber-900 text-white shadow-sm' : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            <User className="w-4 h-4" />
            {t('settings.sidebarProfile')}
          </button>
          
          <button
            onClick={() => setActiveSection('ai')}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
              activeSection === 'ai' ? 'bg-amber-900 text-white shadow-sm' : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            {t('settings.sidebarAi')}
          </button>

          <button
            onClick={() => setActiveSection('security')}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
              activeSection === 'security' ? 'bg-amber-900 text-white shadow-sm' : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            <Shield className="w-4 h-4" />
            {t('settings.sidebarSecurity')}
          </button>

          <button
            onClick={() => setActiveSection('images')}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
              activeSection === 'images' ? 'bg-amber-900 text-white shadow-sm' : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            <Image className="w-4 h-4" />
            {t('settings.sidebarImages')}
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-grow p-6 md:p-8">
          {activeSection === 'general' && (
            <form onSubmit={handleSaveGeneral} className="space-y-6 max-w-xl">
              <div>
                <h2 className="text-lg font-serif font-bold text-stone-900 mb-4">{t('settings.profileTitle')}</h2>
                
                <div className="flex items-center gap-4 mb-6">
                  <img src={avatarUrl} alt="Avatar preview" className="w-16 h-16 rounded-full object-cover border-2 border-amber-900/20" />
                  <div>
                    <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">{t('settings.profileAvatarLabel')}</label>
                    <input
                      type="text"
                      value={avatarUrl}
                      onChange={(e) => setAvatarUrl(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-1.5 text-xs focus:ring-1 focus:ring-amber-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">{t('settings.profileNameLabel')}</label>
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-2.5 text-sm focus:ring-1 focus:ring-amber-900 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">{t('settings.profileEmailLabel')}</label>
                    <input
                      type="email"
                      value={user?.email || ''}
                      disabled
                      className="w-full bg-stone-100 border border-stone-200 rounded-lg px-4 py-2.5 text-sm text-stone-500 cursor-not-allowed"
                    />
                    <span className="text-[10px] text-stone-400 mt-1 block">{t('settings.profileEmailHint')}</span>
                  </div>
                </div>
              </div>

              {isSaved && (
                <div className="bg-emerald-50 text-emerald-800 text-xs font-bold p-3 rounded-lg border border-emerald-200 flex items-center gap-2">
                  <Check className="w-4 h-4" /> {t('settings.profileSuccess')}
                </div>
              )}

              <button
                type="submit"
                className="bg-amber-900 hover:bg-amber-800 text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition shadow-sm cursor-pointer"
              >
                <Save className="w-4 h-4" /> {t('settings.saveBtn')}
              </button>
            </form>
          )}

          {activeSection === 'ai' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-lg font-serif font-bold text-stone-900 mb-2">{t('settings.aiTitle')}</h2>
                <p className="text-xs text-stone-500 mb-6">{t('settings.aiDesc')}</p>
                
                <div className="space-y-4 border-b border-stone-100 pb-6 mb-6">
                  <div className="flex items-center justify-between p-4 bg-stone-50 rounded-xl">
                    <div>
                      <h4 className="text-sm font-bold text-stone-800">{t('settings.aiToggleOrganize')}</h4>
                      <p className="text-[11px] text-stone-500 mt-0.5">{t('settings.aiToggleOrganizeDesc')}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={aiEnabled} 
                        onChange={() => setAiEnabled(!aiEnabled)} 
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-900"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-stone-50 rounded-xl">
                    <div>
                      <h4 className="text-sm font-bold text-stone-800">{t('settings.aiToggleFaces')}</h4>
                      <p className="text-[11px] text-stone-500 mt-0.5">{t('settings.aiToggleFacesDesc')}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={autoFaceDetect} 
                        onChange={() => setAutoFaceDetect(!autoFaceDetect)} 
                        disabled={!aiEnabled}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-900 peer-disabled:opacity-50"></div>
                    </label>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-stone-800">{t('settings.aiScanTitle')}</h3>
                  <p className="text-xs text-stone-500">{t('settings.aiScanDesc')}</p>
                  
                  <div className="flex items-center gap-4">
                    <button
                      onClick={handleScan}
                      disabled={isScanning || !aiEnabled}
                      className="bg-stone-900 hover:bg-stone-800 text-white disabled:bg-stone-200 disabled:text-stone-400 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition shadow-sm cursor-pointer"
                    >
                      <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
                      {isScanning ? t('settings.aiScanning') : t('settings.aiScanBtn')}
                    </button>
                    {scanMessage && <span className="text-xs font-semibold text-amber-900 animate-pulse">{scanMessage}</span>}
                  </div>
                </div>
              </div>

              {aiEnabled && (
                <div className="border-t border-stone-200 pt-8">
                  <div className="mb-4">
                    <h3 className="font-serif text-lg font-bold text-stone-900">{t('settings.aiConsoleTitle')}</h3>
                    <p className="text-xs text-stone-500">{t('settings.aiConsoleDesc')}</p>
                  </div>
                  <div className="border border-stone-100 rounded-3xl overflow-hidden bg-stone-50/20 p-2">
                    <MemoryAssistant
                      suggestions={suggestions}
                      albums={albums}
                      onAccept={onAcceptSuggestion}
                      onIgnore={onIgnoreSuggestion}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {activeSection === 'security' && (
            <div className="space-y-6 max-w-xl">
              <div>
                <h2 className="text-lg font-serif font-bold text-stone-900 mb-2">{t('settings.securityTitle')}</h2>
                <p className="text-xs text-stone-500 mb-6">{t('settings.securityDesc')}</p>
                
                <div className="space-y-4">
                  <div className="p-4 border border-stone-200 rounded-2xl flex items-start gap-3">
                    <Shield className="w-5 h-5 text-amber-900 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-stone-800">{t('settings.securityEncryptTitle')}</h4>
                      <p className="text-xs text-stone-500 mt-1">{t('settings.securityEncryptDesc')}</p>
                    </div>
                  </div>

                  <div className="p-4 border border-stone-200 rounded-2xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-900 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-stone-800">{t('settings.securityDeleteTitle')}</h4>
                      <p className="text-xs text-stone-500 mt-1">{t('settings.securityDeleteDesc')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'images' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-serif font-bold text-stone-900 mb-2">{t('settings.imagesTitle')}</h2>
                <p className="text-xs text-stone-500 mb-6">{t('settings.imagesDesc')}</p>

                {/* Sub-Tabs Toggle */}
                <div className="flex border-b border-stone-200 mb-6 gap-6">
                  <button
                    onClick={() => setImageSubTab('catalogue')}
                    className={`pb-3 text-xs font-bold uppercase tracking-wider transition relative cursor-pointer ${
                      imageSubTab === 'catalogue' ? 'text-amber-900 font-bold' : 'text-stone-400 hover:text-stone-700'
                    }`}
                  >
                    {imageSubTab === 'catalogue' && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-900 rounded-full" />
                    )}
                    <span className="flex items-center gap-1.5">
                      <Code className="w-3.5 h-3.5" />
                      {t('settings.imagesSubTabCode')}
                    </span>
                  </button>

                  <button
                    onClick={() => setImageSubTab('active')}
                    className={`pb-3 text-xs font-bold uppercase tracking-wider transition relative cursor-pointer ${
                      imageSubTab === 'active' ? 'text-amber-900 font-bold' : 'text-stone-400 hover:text-stone-700'
                    }`}
                  >
                    {imageSubTab === 'active' && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-900 rounded-full" />
                    )}
                    <span className="flex items-center gap-1.5">
                      <Image className="w-3.5 h-3.5" />
                      {t('settings.imagesSubTabActive')}
                    </span>
                  </button>
                </div>
                
                {imageSubTab === 'catalogue' ? (
                  <div className="space-y-4">
                    <div className="bg-amber-900/5 border border-amber-900/10 rounded-2xl p-4 mb-2">
                      <p className="text-xs text-amber-950 font-medium leading-relaxed">
                        {t('settings.imagesCodeHint')}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {IMAGE_CATALOGUE.map((img, idx) => {
                        const handleCopyUrl = (url: string) => {
                          navigator.clipboard.writeText(url);
                          setCopiedUrl(url);
                          setTimeout(() => setCopiedUrl(null), 2000);
                        };

                        return (
                          <div key={idx} className="bg-white border border-stone-200 rounded-2xl p-4 flex gap-4 hover:shadow-sm hover:border-stone-300 transition-all">
                            {/* Thumbnail */}
                            <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-stone-200 shrink-0 bg-stone-50">
                              <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                              <span className="absolute bottom-1 right-1 bg-black/75 text-white text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">
                                {img.category}
                              </span>
                            </div>

                            {/* Details & Actions */}
                            <div className="flex-grow flex flex-col justify-between min-w-0">
                              <div className="space-y-1">
                                <h4 className="font-bold text-stone-900 text-xs truncate" title={img.name}>
                                  {img.name}
                                </h4>
                                <p className="text-[10px] text-stone-500 line-clamp-1" title={img.description}>
                                  {img.description}
                                </p>
                              </div>

                              {/* URL and Copy */}
                              <div className="flex gap-1.5 mt-2">
                                <input
                                  type="text"
                                  readOnly
                                  value={img.url}
                                  className="flex-grow bg-stone-50 border border-stone-200 rounded-lg px-2 py-1 text-[9px] font-mono text-stone-500 focus:outline-none focus:ring-1 focus:ring-amber-900 select-all font-mono"
                                />
                                <button
                                  onClick={() => handleCopyUrl(img.url)}
                                  className="bg-amber-900 hover:bg-amber-800 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-1 shrink-0 cursor-pointer"
                                >
                                  {copiedUrl === img.url ? (
                                    <>
                                      <Check className="w-3 h-3" />
                                      {t('settings.copiedBtn')}
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3 h-3" />
                                      {t('settings.copyBtn')}
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  (() => {
                    const projectImages = (() => {
                      const imagesList: { url: string; source: string; albumTitle: string; type: string }[] = [];
                      const seenUrls = new Set<string>();

                      albums.forEach(album => {
                        if (album.coverImage && !seenUrls.has(album.coverImage)) {
                          seenUrls.add(album.coverImage);
                          imagesList.push({
                            url: album.coverImage,
                            source: language === 'es' ? 'Portada de Álbum' : 'Album Cover',
                            albumTitle: album.title,
                            type: 'cover'
                          });
                        }

                        if (album.chapters) {
                          album.chapters.forEach(ch => {
                            if (ch.image && !seenUrls.has(ch.image)) {
                              seenUrls.add(ch.image);
                              imagesList.push({
                                url: ch.image,
                                source: language === 'es' ? `Capítulo: ${ch.title}` : `Chapter: ${ch.title}`,
                                albumTitle: album.title,
                                type: 'chapter'
                              });
                            }
                          });
                        }

                        if (album.memories) {
                          album.memories.forEach(mem => {
                            if (mem.imageUrl && !seenUrls.has(mem.imageUrl)) {
                              seenUrls.add(mem.imageUrl);
                              imagesList.push({
                                url: mem.imageUrl,
                                source: language === 'es' ? `Recuerdo: ${mem.caption || 'Sin descripción'}` : `Memory: ${mem.caption || 'No description'}`,
                                albumTitle: album.title,
                                type: 'memory'
                              });
                            }
                          });
                        }
                      });

                      return imagesList;
                    })();

                    if (projectImages.length === 0) {
                      return (
                        <div className="text-center py-16 border border-dashed border-stone-200 rounded-3xl bg-stone-50">
                          <Image className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                          <h3 className="text-stone-800 font-bold font-serif text-sm">{t('settings.imagesEmpty')}</h3>
                          <p className="text-stone-400 text-xs mt-1">{t('settings.imagesEmptyDesc')}</p>
                        </div>
                      );
                    }

                    const handleCopyUrl = (url: string) => {
                      navigator.clipboard.writeText(url);
                      setCopiedUrl(url);
                      setTimeout(() => setCopiedUrl(null), 2000);
                    };

                    return (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {projectImages.map((img, idx) => (
                          <div key={idx} className="bg-white border border-stone-200 rounded-2xl p-4 flex gap-4 hover:shadow-sm hover:border-stone-300 transition-all">
                            {/* Thumbnail */}
                            <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-stone-200 shrink-0 bg-stone-50">
                              <img src={img.url} alt={img.source} className="w-full h-full object-cover" />
                              <span className="absolute bottom-1 right-1 bg-black/75 text-white text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">
                                {img.type === 'cover' ? (language === 'es' ? 'Portada' : 'Cover') : img.type === 'chapter' ? (language === 'es' ? 'Capítulo' : 'Chapter') : (language === 'es' ? 'Foto' : 'Photo')}
                              </span>
                            </div>

                            {/* Details & Actions */}
                            <div className="flex-grow flex flex-col justify-between min-w-0">
                              <div className="space-y-1">
                                <h4 className="font-bold text-stone-900 text-xs truncate" title={img.source}>
                                  {img.source}
                                </h4>
                                <p className="text-[10px] text-stone-500 truncate">
                                  {language === 'es' ? 'Álbum' : 'Album'}: <span className="font-medium text-stone-700">{img.albumTitle}</span>
                                </p>
                              </div>

                              {/* URL and Copy */}
                              <div className="flex gap-1.5 mt-2">
                                <input
                                  type="text"
                                  readOnly
                                  value={img.url}
                                  className="flex-grow bg-stone-50 border border-stone-200 rounded-lg px-2 py-1 text-[9px] font-mono text-stone-500 focus:outline-none focus:ring-1 focus:ring-amber-900 select-all font-mono"
                                />
                                <button
                                  onClick={() => handleCopyUrl(img.url)}
                                  className="bg-amber-900 hover:bg-amber-800 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-1 shrink-0 cursor-pointer"
                                >
                                  {copiedUrl === img.url ? (
                                    <>
                                      <Check className="w-3 h-3" />
                                      {t('settings.copiedBtn')}
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3 h-3" />
                                      {t('settings.copyBtn')}
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })()
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
