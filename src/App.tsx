import { useState, useEffect } from 'react';
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
import { DigitalLegacy } from './components/DigitalLegacy';
import { NewMemoryModal } from './components/NewMemoryModal';
import { BottomNavigation } from './components/BottomNavigation';
import { Settings } from './components/Settings';

// Static / State Data
import { Album, AISuggestion } from './types';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './lib/firebase';
import { useAlbums, useCreateAlbum, useUpdateAlbum } from './hooks/useAlbums';
import { PROJECT_IMAGES } from './lib/images';

export default function App() {
  const [mockUser, setMockUser] = useState<any | null>(() => {
    const saved = localStorage.getItem('memorynest_mock_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  
  const [currentView, setCurrentView] = useState('landing');
  const [currentTab, setCurrentTab] = useState('Home');
  const [aiSuggestions, setAiSuggestions] = useState<AISuggestion[]>([]);
  const [activeAlbumId, setActiveAlbumId] = useState<string | null>(null);
  const [newMemoryModalOpen, setNewMemoryModalOpen] = useState(false);
  const [demoAlbumsCreated, setDemoAlbumsCreated] = useState(false);

  const user = mockUser || firebaseUser;
  const isDemoSession = user?.email === ((import.meta as any).env.VITE_DEMO_EMAIL || 'root@root.com');

  const albumsQuery = useAlbums(isDemoSession ? undefined : user?.uid);
  const createAlbumMutation = useCreateAlbum();
  const updateAlbumMutation = useUpdateAlbum();

  const [localAlbums, setLocalAlbums] = useState<Album[]>(() => {
    const saved = localStorage.getItem('memorynest_demo_albums');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const needsRegeneration = parsed.some((a: Album) => !a.memories || a.memories.length < 5);
        if (!needsRegeneration) {
          return parsed;
        }
      } catch (e) {
        // ignore parsing error
      }
    }
    return [];
  });

  const albums = isDemoSession ? localAlbums : (albumsQuery.data || []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setFirebaseUser(currentUser);
      if (!mockUser) {
        setAuthLoading(false);
      }
      if (currentUser && !mockUser) {
        if (currentView === 'landing' || currentView === 'login' || currentView === 'register') {
          setCurrentView('dashboard');
        }
      } else if (!currentUser && !mockUser) {
        if (currentView !== 'landing' && currentView !== 'login' && currentView !== 'register') {
          setCurrentView('landing');
        }
      }
    });
    return unsubscribe;
  }, [currentView, mockUser]);

  useEffect(() => {
    if (mockUser) {
      setAuthLoading(false);
      if (currentView === 'landing' || currentView === 'login' || currentView === 'register') {
        setCurrentView('dashboard');
      }
    }
  }, [mockUser, currentView]);

  useEffect(() => {
    if (user && !authLoading) {
      if (isDemoSession) {
        if (localAlbums.length === 0 && !demoAlbumsCreated) {
          setDemoAlbumsCreated(true);
          createDefaultAlbums(user);
        }
      } else {
        if (!albumsQuery.isLoading && albums.length === 0 && !demoAlbumsCreated) {
          setDemoAlbumsCreated(true);
          createDefaultAlbums(user);
        }
      }
    }
  }, [user, authLoading, albums, albumsQuery.isLoading, demoAlbumsCreated, isDemoSession, localAlbums.length]);

  useEffect(() => {
    if (albums.length > 0 && aiSuggestions.length === 0) {
      const travelAlbum = albums.find(a => a.category === 'travel' || a.title.toLowerCase().includes('viaje') || a.title.toLowerCase().includes('interrail'));
      const familyAlbum = albums.find(a => a.category === 'family' || a.title.toLowerCase().includes('familia'));
      
      const initialSuggestions: AISuggestion[] = [
        {
          id: 'sug_1',
          type: 'face',
          title: '¿Identificar rostro?',
          description: 'Hemos detectado a una persona frecuente en varias fotos de este álbum. ¿Es tu hermano Carlos?',
          targetAlbum: travelAlbum?.id || albums[0].id,
          targetImage: PROJECT_IMAGES.TRAVEL.SUMMER_DRINKS, // This is a real photo in the travel album
        },
        {
          id: 'sug_2',
          type: 'date',
          title: 'Completar fecha sugerida',
          description: 'La foto de la cena familiar parece haber sido tomada durante el año nuevo de 2026. ¿Quieres asignarle la fecha correcta?',
          targetAlbum: familyAlbum?.id || albums[0].id,
          targetImage: PROJECT_IMAGES.FAMILY.DINNER, // Exact match with the family dinner image
        },
        {
          id: 'sug_3',
          type: 'duplicate',
          title: 'Limpieza de fotos duplicadas',
          description: 'Se encontraron dos imágenes casi idénticas de "La puesta de sol". Te sugerimos conservar la de mayor resolución.',
          targetAlbum: travelAlbum?.id || albums[0].id,
          targetImage: `${PROJECT_IMAGES.TRAVEL.SUNSET}&dup=1`, // Perfect match for the duplicate memory URL
        }
      ];
      setAiSuggestions(initialSuggestions);
    }
  }, [albums, aiSuggestions.length]);

  const createDefaultAlbums = async (user: any) => {
    const demos = [
      {
        title: 'Viaje Interrail 2026',
        category: 'travel',
        date: '2026-06-01',
        location: 'Europa',
        memories: [
          { id: 'm_tr_1', imageUrl: PROJECT_IMAGES.TRAVEL.SUNSET, caption: 'Puesta de sol espectacular desde las costas del sur de Europa.', date: '2026-06-02' },
          { id: 'm_tr_1_dup', imageUrl: `${PROJECT_IMAGES.TRAVEL.SUNSET}&dup=1`, caption: 'Puesta de sol espectacular desde las costas (Copia de menor resolución).', date: '2026-06-02' },
          { id: 'm_tr_2', imageUrl: PROJECT_IMAGES.TRAVEL.ROAD_TRIP, caption: 'Nuestra aventura por carreteras infinitas y parajes espectaculares.', date: '2026-06-05' },
          { id: 'm_tr_3', imageUrl: PROJECT_IMAGES.TRAVEL.TRAIN_STATION, caption: 'Planeando la siguiente parada en la estación del tren.', date: '2026-06-10' },
          { id: 'm_tr_4', imageUrl: PROJECT_IMAGES.TRAVEL.PLANE_VIEW, caption: 'El amanecer desde las nubes en nuestro primer vuelo juntos.', date: '2026-06-12' },
          { id: 'm_tr_5', imageUrl: PROJECT_IMAGES.TRAVEL.SUMMER_DRINKS, caption: 'Las risas infinitas y brindis que marcaron este verano europeo.', date: '2026-06-15' }
        ],
        members: [
          { name: user.displayName || 'Creador', role: 'Creador del álbum', avatar: user.photoURL || PROJECT_IMAGES.AVATARS.MAMA_MARIA, online: true },
          // Carlos Ruiz is recognized in the album, so we let suggestion 1 dynamically add him when accepted!
          { name: 'Santi Martínez', role: 'Fotógrafo oficial', avatar: PROJECT_IMAGES.AVATARS.SANTI, online: false },
          { name: 'Laura Gómez', role: 'Organizadora de rutas', avatar: PROJECT_IMAGES.AVATARS.LAURA, online: true }
        ]
      },
      {
        title: `Familia ${user.displayName || ''}`,
        category: 'family',
        date: '2026-01-01',
        location: 'Casa',
        memories: [
          // Dinner has "Sin fecha" initially to allow the suggestion to dynamically fix it!
          { id: 'm_fa_1', imageUrl: PROJECT_IMAGES.FAMILY.DINNER, caption: 'Cena de Año Nuevo reuniendo a tres generaciones de la familia.', date: 'Sin fecha' },
          { id: 'm_fa_2', imageUrl: PROJECT_IMAGES.FAMILY.SUNDAY_LUNCH, caption: 'Un almuerzo dominical de risas y anécdotas compartidas en casa.', date: '2026-01-05' },
          { id: 'm_fa_3', imageUrl: PROJECT_IMAGES.FAMILY.HUG, caption: 'Momentos dulces y abrazos llenos de amor incondicional.', date: '2026-01-10' },
          { id: 'm_fa_4', imageUrl: PROJECT_IMAGES.FAMILY.GRANDPA_GAMES, caption: 'Abuelo enseñando con paciencia los juegos clásicos de su infancia.', date: '2026-01-15' },
          { id: 'm_fa_5', imageUrl: PROJECT_IMAGES.FAMILY.BIRTHDAY, caption: 'Celebrando con globos, pasteles y alegría el cumpleaños familiar.', date: '2026-01-20' }
        ],
        members: [
          { name: user.displayName || 'Creador', role: 'Creador del álbum', avatar: user.photoURL || PROJECT_IMAGES.AVATARS.MAMA_MARIA, online: true },
          { name: 'Abuela Carmen', role: 'Matriarca', avatar: PROJECT_IMAGES.AVATARS.ABUELA_CARMEN, online: true },
          { name: 'Mamá (María)', role: 'Co-organizadora', avatar: PROJECT_IMAGES.AVATARS.MAMA_MARIA, online: true },
          { name: 'Abuelo Manuel', role: 'Legado Familiar', avatar: PROJECT_IMAGES.AVATARS.ABUELO_MANUEL, online: false },
          { name: 'Papá (Roberto)', role: 'Asador principal', avatar: PROJECT_IMAGES.AVATARS.PAPA_ROBERTO, online: true }
        ]
      }
    ];

    const createdDemoAlbums: Album[] = [];

    for (const demo of demos) {
      const defaultCover = demo.category === 'travel' 
        ? PROJECT_IMAGES.COVERS.TRAVEL_SUNSET
        : PROJECT_IMAGES.COVERS.FAMILY_DINNER;

      const newAlbumData: Partial<Album> = {
        id: `album_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        title: demo.title,
        date: demo.date,
        location: demo.location,
        coverImage: defaultCover,
        description: `Álbum de ${demo.category} creado automáticamente`,
        imagesCount: demo.memories.length,
        videosCount: 0,
        companions: [demo.category === 'travel' ? 'Amigos' : 'Familia'],
        members: demo.members,
        chapters: [
          {
            id: `ch_${Date.now()}_${demo.title}`,
            chapterNum: 'Capítulo I',
            title: 'Un nuevo amanecer para nuestras historias',
            text: 'Comenzamos esta cápsula colectiva de recuerdos hoy.',
            image: defaultCover,
            imageSide: 'right'
          }
        ],
        memories: demo.memories,
        conversation: []
      };

      if (isDemoSession) {
        createdDemoAlbums.push(newAlbumData as Album);
      } else {
        await createAlbumMutation.mutateAsync({ data: newAlbumData, userId: user.uid });
      }
    }

    if (isDemoSession) {
      setLocalAlbums(createdDemoAlbums);
      localStorage.setItem('memorynest_demo_albums', JSON.stringify(createdDemoAlbums));
    }
  };

  // Handle adding custom album
  const handleCreateAlbum = async (title: string, category: string, date: string, location: string) => {
    if (!user) return;
    
    const defaultCover = category === 'travel' 
      ? 'https://images.unsplash.com/photo-150752428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800'
      : 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=800';

    const newAlbumData: Partial<Album> = {
      id: `album_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
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

    if (isDemoSession) {
      const updated = [...localAlbums, newAlbumData as Album];
      setLocalAlbums(updated);
      localStorage.setItem('memorynest_demo_albums', JSON.stringify(updated));
    } else {
      await createAlbumMutation.mutateAsync({ data: newAlbumData, userId: user.uid });
    }
    
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

    if (isDemoSession) {
      const updated = localAlbums.map(a => a.id === albumId ? { ...a, ...updatedData } : a);
      setLocalAlbums(updated);
      localStorage.setItem('memorynest_demo_albums', JSON.stringify(updated));
    } else {
      await updateAlbumMutation.mutateAsync({ albumId, data: updatedData });
    }
  };

  // Handle accepting AI suggestions
  const handleAcceptSuggestion = async (suggestionId: string, customData?: any) => {
    const suggestion = aiSuggestions.find(s => s.id === suggestionId);
    if (!suggestion) return;

    const album = albums.find(a => a.id === suggestion.targetAlbum);
    if (!album) return;

    let updatedAlbum = { ...album };

    if (suggestion.type === 'face') {
      const name = customData?.name || 'Familiar Identificado';
      // Add member if not already exists
      if (!updatedAlbum.members.some(m => m.name.toLowerCase() === name.toLowerCase())) {
        updatedAlbum.members = [
          ...updatedAlbum.members,
          {
            name,
            role: 'Familiar',
            avatar: suggestion.targetImage || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100',
            online: false
          }
        ];
      }
    } else if (suggestion.type === 'date') {
      // Find the family dinner or target photo in memories and update date
      updatedAlbum.memories = updatedAlbum.memories.map(m => {
        if (m.imageUrl === suggestion.targetImage) {
          return { ...m, date: '2026-01-01' };
        }
        return m;
      });
    } else if (suggestion.type === 'duplicate') {
      // Remove duplicate memory from album
      updatedAlbum.memories = updatedAlbum.memories.filter(m => m.imageUrl !== suggestion.targetImage);
      updatedAlbum.imagesCount = Math.max(0, updatedAlbum.imagesCount - 1);
    }

    // Save album changes
    if (isDemoSession) {
      const updated = localAlbums.map(a => a.id === album.id ? updatedAlbum : a);
      setLocalAlbums(updated);
      localStorage.setItem('memorynest_demo_albums', JSON.stringify(updated));
    } else {
      await updateAlbumMutation.mutateAsync({ albumId: album.id, data: updatedAlbum });
    }

    // Remove suggestion
    setAiSuggestions(prev => prev.filter(s => s.id !== suggestionId));
  };

  const handleIgnoreSuggestion = (suggestionId: string) => {
    setAiSuggestions(prev => prev.filter(s => s.id !== suggestionId));
  };

  const handleUpdateAlbum = async (updatedAlbum: Album) => {
    if (isDemoSession) {
      const updated = localAlbums.map(a => a.id === updatedAlbum.id ? updatedAlbum : a);
      setLocalAlbums(updated);
      localStorage.setItem('memorynest_demo_albums', JSON.stringify(updated));
    } else {
      await updateAlbumMutation.mutateAsync({ albumId: updatedAlbum.id, data: updatedAlbum });
    }
  };

  const handleLogout = () => {
    if (mockUser) {
      setMockUser(null);
      localStorage.removeItem('memorynest_mock_user');
      localStorage.removeItem('memorynest_demo_albums');
      setLocalAlbums([]);
      setDemoAlbumsCreated(false);
      setCurrentView('landing');
    } else {
      auth.signOut();
    }
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
        return (
          <Login 
            onNavigateToRegister={() => setCurrentView('register')} 
            onLoginSuccess={(customUser?: any) => {
              if (customUser) {
                setMockUser(customUser);
                localStorage.setItem('memorynest_mock_user', JSON.stringify(customUser));
              }
              setCurrentView('dashboard');
            }} 
          />
        );
      case 'register':
        return <Register onNavigateToLogin={() => setCurrentView('login')} />;
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
            albums={albums}
            suggestions={aiSuggestions.filter(s => s.targetAlbum === activeAlbum.id)}
            onAcceptSuggestion={handleAcceptSuggestion}
            onIgnoreSuggestion={handleIgnoreSuggestion}
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
          case 'Assistant':
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
          case 'Settings':
            return (
              <Settings 
                user={user}
                albums={albums}
                suggestions={aiSuggestions}
                onAcceptSuggestion={handleAcceptSuggestion}
                onIgnoreSuggestion={handleIgnoreSuggestion}
                onUpdateUser={(updated) => {
                  if (mockUser) {
                    const newUser = { ...mockUser, ...updated };
                    setMockUser(newUser);
                    localStorage.setItem('memorynest_mock_user', JSON.stringify(newUser));
                  }
                }}
              />
            );
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
