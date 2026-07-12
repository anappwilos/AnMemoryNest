import { useState } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { LandingPage } from './components/LandingPage';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { CreateAlbum } from './components/CreateAlbum';
import { AlbumDetail } from './components/AlbumDetail';
import { Footer } from './components/Footer';

// Subcomponents
import { MemoryAssistant } from './components/MemoryAssistant';
import { PeopleManager } from './components/PeopleManager';
import { TimelineView } from './components/TimelineView';
import { DigitalLegacy } from './components/DigitalLegacy';
import { NewMemoryModal } from './components/NewMemoryModal';

// Static / State Data
import { INITIAL_ALBUMS, INITIAL_SUGGESTIONS } from './data';
import { Album, AISuggestion } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [currentTab, setCurrentTab] = useState('Home');
  const [albums, setAlbums] = useState<Album[]>(INITIAL_ALBUMS);
  const [aiSuggestions, setAiSuggestions] = useState<AISuggestion[]>(INITIAL_SUGGESTIONS);
  const [activeAlbumId, setActiveAlbumId] = useState<string | null>(null);
  const [newMemoryModalOpen, setNewMemoryModalOpen] = useState(false);

  // Handle adding custom album
  const handleCreateAlbum = (title: string, category: string) => {
    const defaultCover = category === 'travel' 
      ? 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800'
      : 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=800';

    const newAlbum: Album = {
      id: `album_${Date.now()}`,
      title,
      date: 'Fecha de hoy',
      location: 'Ubicación por definir',
      coverImage: defaultCover,
      description: `Álbum de ${category} creado con cariño`,
      imagesCount: 0,
      videosCount: 0,
      companions: [category === 'travel' ? 'Amigos' : 'Familia'],
      members: [
        { name: 'Maria Garcia', role: 'Creadora del álbum', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100', online: true }
      ],
      chapters: [
        {
          id: 'ch1',
          chapterNum: 'Capítulo I',
          title: 'Un nuevo amanecer para nuestras historias',
          text: 'Comenzamos esta cápsula colectiva de recuerdos hoy. Añade fotografías, graba testimonios de voz de tus familiares y preserva la historia familiar para siempre.',
          image: defaultCover,
          imageSide: 'right'
        }
      ],
      memories: [],
      conversation: []
    };

    setAlbums([newAlbum, ...albums]);
    setCurrentView('dashboard');
    setCurrentTab('Home');
  };

  // Handle saving a custom memory
  const handleSaveMemory = (albumId: string, memory: {
    imageUrl: string;
    caption: string;
    date: string;
    location: string;
    voiceDuration?: string;
  }) => {
    setAlbums(prevAlbums => prevAlbums.map(album => {
      if (album.id === albumId) {
        const newMemory = {
          id: `m_${Date.now()}`,
          imageUrl: memory.imageUrl,
          caption: memory.caption,
          date: memory.date
        };

        const newConversationMessage = {
          id: `c_${Date.now()}`,
          author: 'Yo (Ana)',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100',
          message: memory.caption,
          image: memory.imageUrl,
          date: `Hoy · ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
        };

        const conversationWithAudio = memory.voiceDuration ? [
          ...album.conversation,
          {
            id: `c_audio_${Date.now()}`,
            author: 'Yo (Ana)',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100',
            date: `Hoy · ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
            isAudio: true,
            audioUrl: '#',
            audioDuration: memory.voiceDuration,
            message: 'HISTORIA ACTIVA - GRABACIÓN DE VOZ'
          },
          newConversationMessage
        ] : [...album.conversation, newConversationMessage];

        return {
          ...album,
          imagesCount: album.imagesCount + 1,
          location: memory.location || album.location,
          memories: [newMemory, ...album.memories],
          conversation: conversationWithAudio
        };
      }
      return album;
    }));
  };

  // Handle accepting AI suggestions
  const handleAcceptSuggestion = (suggestionId: string, customData?: any) => {
    const suggestion = aiSuggestions.find(s => s.id === suggestionId);
    if (suggestion) {
      // If identifying a face, we can add a member or update companions
      if (suggestion.type === 'face' && customData?.name) {
        setAlbums(prevAlbums => prevAlbums.map(album => {
          if (album.id === suggestion.targetAlbum) {
            return {
              ...album,
              members: [
                ...album.members,
                {
                  name: customData.name,
                  role: 'Familiar Identificado',
                  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100'
                }
              ]
            };
          }
          return album;
        }));
      } else if (suggestion.type === 'date') {
        setAlbums(prevAlbums => prevAlbums.map(album => {
          if (album.id === suggestion.targetAlbum) {
            return { ...album, date: '18 de Julio de 2026' };
          }
          return album;
        }));
      }
    }
    setAiSuggestions(prev => prev.filter(s => s.id !== suggestionId));
  };

  const handleIgnoreSuggestion = (suggestionId: string) => {
    setAiSuggestions(prev => prev.filter(s => s.id !== suggestionId));
  };

  const handleUpdateAlbum = (updatedAlbum: Album) => {
    setAlbums(prev => prev.map(a => a.id === updatedAlbum.id ? updatedAlbum : a));
  };

  const activeAlbum = albums.find(a => a.id === activeAlbumId);

  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage onStart={() => setCurrentView('login')} />;
      case 'login':
        return <Login onNavigateToRegister={() => setCurrentView('register')} onLoginSuccess={() => setCurrentView('create-album')} />;
      case 'register':
        return <Register onNavigateToLogin={() => setCurrentView('login')} />;
      case 'create-album':
        return (
          <CreateAlbum 
            onAlbumCreated={(title, category) => {
              handleCreateAlbum(title, category);
            }} 
          />
        );
      case 'album-detail':
        return activeAlbum ? (
          <AlbumDetail 
            album={activeAlbum} 
            onBack={() => {
              setCurrentView('dashboard');
              setCurrentTab('Home');
            }}
            onAddMemoryClick={() => setNewMemoryModalOpen(true)}
            onUpdateAlbum={handleUpdateAlbum}
          />
        ) : (
          <div className="p-8 text-center text-stone-600">Álbum no encontrado</div>
        );
      case 'dashboard':
        // Handle tab subviews
        switch (currentTab) {
          case 'Timeline':
            return (
              <TimelineView 
                albums={albums} 
                onAlbumClick={(id) => {
                  setActiveAlbumId(id);
                  setCurrentView('album-detail');
                }} 
              />
            );
          case 'People':
            return <PeopleManager />;
          case 'AI-Assistant':
            return (
              <MemoryAssistant 
                suggestions={aiSuggestions} 
                albums={albums} 
                onAccept={handleAcceptSuggestion}
                onIgnore={handleIgnoreSuggestion}
              />
            );
          case 'Legacy':
            return <DigitalLegacy />;
          case 'Home':
          default:
            return (
              <Dashboard 
                albums={albums}
                onAlbumClick={(id) => {
                  setActiveAlbumId(id);
                  setCurrentView('album-detail');
                }}
                onAddMemoryClick={() => setNewMemoryModalOpen(true)}
                onNavigateToTab={(tab) => {
                  setCurrentTab(tab);
                  setCurrentView('dashboard');
                }}
              />
            );
        }
      default:
        return <LandingPage onStart={() => setCurrentView('login')} />;
    }
  };

  const showShell = currentView !== 'landing' && currentView !== 'login' && currentView !== 'register' && currentView !== 'create-album';

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col text-stone-900 font-sans selection:bg-amber-900/10 selection:text-amber-900">
      
      {showShell && (
        <Header 
          currentTab={currentTab} 
          onTabChange={(tab) => {
            setCurrentTab(tab);
            setCurrentView('dashboard');
          }} 
          onAddMemoryClick={() => setNewMemoryModalOpen(true)}
          onLogout={() => {
            setCurrentView('landing');
            setCurrentTab('Home');
          }}
        />
      )}

      <div className="flex-grow">
        {renderView()}
      </div>

      {showShell && <Footer />}

      {/* Global New Memory Modal */}
      {newMemoryModalOpen && (
        <NewMemoryModal 
          albums={albums} 
          onClose={() => setNewMemoryModalOpen(false)} 
          onSave={handleSaveMemory}
          defaultAlbumId={activeAlbumId || undefined}
        />
      )}

    </div>
  );
}
