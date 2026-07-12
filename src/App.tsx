import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { LandingPage } from './components/LandingPage';
import { Login } from './components/Login';
import { CreateAlbum } from './components/CreateAlbum';
import { AlbumDetail } from './components/AlbumDetail';
import { Footer } from './components/Footer';

// Subcomponents
import { MemoryAssistant } from './components/MemoryAssistant';
import { PeopleManager } from './components/PeopleManager';
import { TimelineView } from './components/TimelineView';
import { DigitalLegacy } from './components/DigitalLegacy';
import { NewMemoryModal } from './components/NewMemoryModal';
import { BottomNavigation } from './components/BottomNavigation';

// Static / State Data
import { Album, AISuggestion } from './types';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './lib/firebase';
import { useAlbums, useCreateAlbum, useUpdateAlbum } from './hooks/useAlbums';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  
  const [currentView, setCurrentView] = useState('landing');
  const [currentTab, setCurrentTab] = useState('Home');
  const [aiSuggestions, setAiSuggestions] = useState<AISuggestion[]>([]);
  const [activeAlbumId, setActiveAlbumId] = useState<string | null>(null);
  const [newMemoryModalOpen, setNewMemoryModalOpen] = useState(false);

  const albumsQuery = useAlbums(user?.uid);
  const createAlbumMutation = useCreateAlbum();
  const updateAlbumMutation = useUpdateAlbum();

  const albums = albumsQuery.data || [];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
      if (currentUser) {
        if (currentView === 'landing' || currentView === 'login' || currentView === 'register') {
          setCurrentView('dashboard');
        }
      } else {
        if (currentView !== 'landing' && currentView !== 'login') {
          setCurrentView('landing');
        }
      }
    });
    return unsubscribe;
  }, [currentView]);

  // Handle adding custom album
  const handleCreateAlbum = async (title: string, category: string, date: string, location: string) => {
    if (!user) return;
    
    const defaultCover = category === 'travel' 
      ? 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800'
      : 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=800';

    const newAlbumData: Partial<Album> = {
      title,
      date: date,
      location: location,
      coverImage: defaultCover,
      description: `Álbum de ${category} creado con cariño`,
      imagesCount: 0,
      videosCount: 0,
      companions: [category === 'travel' ? 'Amigos' : 'Familia'],
      members: [
        { name: user.displayName || 'Creador', role: 'Creador del álbum', avatar: user.photoURL || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100', online: true }
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

    await createAlbumMutation.mutateAsync({ data: newAlbumData, userId: user.uid });
    
    setCurrentView('dashboard');
    setCurrentTab('Home');
  };

  // Handle saving a custom memory
  const handleSaveMemory = async (albumId: string, memory: {
    imageUrl: string;
    caption: string;
    date: string;
    location: string;
    voiceDuration?: string;
  }) => {
    const album = albums.find(a => a.id === albumId);
    if (!album) return;

    const newMemory = {
      id: `m_${Date.now()}`,
      imageUrl: memory.imageUrl,
      caption: memory.caption,
      date: memory.date
    };

    const newConversationMessage = {
      id: `c_${Date.now()}`,
      author: user?.displayName || 'Yo',
      avatar: user?.photoURL || 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100',
      message: memory.caption,
      image: memory.imageUrl,
      date: `Hoy · ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    };

    const conversationWithAudio = memory.voiceDuration ? [
      ...album.conversation,
      {
        id: `c_audio_${Date.now()}`,
        author: user?.displayName || 'Yo',
        avatar: user?.photoURL || 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100',
        date: `Hoy · ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
        isAudio: true,
        audioUrl: '#',
        audioDuration: memory.voiceDuration,
        message: 'HISTORIA ACTIVA - GRABACIÓN DE VOZ'
      },
      newConversationMessage
    ] : [...album.conversation, newConversationMessage];

    const updatedData = {
      imagesCount: (album.imagesCount || 0) + 1,
      location: memory.location || album.location,
      memories: [newMemory, ...(album.memories || [])],
      conversation: conversationWithAudio
    };

    await updateAlbumMutation.mutateAsync({ albumId, data: updatedData });
  };

  // Handle accepting AI suggestions
  const handleAcceptSuggestion = (suggestionId: string, customData?: any) => {
    // Left empty for now as requested by the AI feature flags logic
  };

  const handleIgnoreSuggestion = (suggestionId: string) => {
    setAiSuggestions(prev => prev.filter(s => s.id !== suggestionId));
  };

  const handleUpdateAlbum = async (updatedAlbum: Album) => {
    await updateAlbumMutation.mutateAsync({ albumId: updatedAlbum.id, data: updatedAlbum });
  };

  const activeAlbum = albums.find(a => a.id === activeAlbumId);

  if (authLoading) {
    return <div className="min-h-screen bg-stone-50 flex items-center justify-center">Cargando...</div>;
  }

  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage onStart={() => setCurrentView('login')} />;
      case 'login':
      case 'register':
        return <Login onNavigateToRegister={() => setCurrentView('login')} onLoginSuccess={() => setCurrentView('dashboard')} />;
      case 'create-album':
        return (
          <CreateAlbum 
            onAlbumCreated={(title, category, date, location) => {
              handleCreateAlbum(title, category, date, location);
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
                userName={user?.displayName || undefined}
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
          onLogout={() => auth.signOut()}
        />
      )}

      <div className={`flex-grow ${showShell ? 'pb-16 md:pb-0' : ''}`}>
        {renderView()}
      </div>

      {showShell && <Footer />}
      {showShell && (
        <BottomNavigation 
          currentTab={currentTab} 
          onTabChange={(tab) => {
            setCurrentTab(tab);
            setCurrentView('dashboard');
          }} 
        />
      )}

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
