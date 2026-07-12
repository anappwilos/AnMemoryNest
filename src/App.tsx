import { useState } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { LandingPage } from './components/LandingPage';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { CreateAlbum } from './components/CreateAlbum';
import { AlbumDetail } from './components/AlbumDetail';
import { Footer } from './components/Footer';

export default function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [viewedAlbum, setViewedAlbum] = useState<string | null>(null);

  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage onStart={() => setCurrentView('login')} />;
      case 'login':
        return <Login onNavigateToRegister={() => setCurrentView('register')} onLoginSuccess={() => setCurrentView('create-album')} />;
      case 'register':
        return <Register onNavigateToLogin={() => setCurrentView('login')} />;
      case 'create-album':
        return <CreateAlbum onAlbumCreated={() => setCurrentView('dashboard')} />;
      case 'album-detail':
        return <AlbumDetail />;
      case 'dashboard':
        return <Dashboard onAlbumClick={() => setCurrentView('album-detail')} />;
      case 'create':
        return <div className="p-8 text-center text-stone-600">Crear nuevo recuerdo (Próximamente)</div>;
      default:
        return <LandingPage onStart={() => setCurrentView('login')} />;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      {(currentView !== 'landing' && currentView !== 'login' && currentView !== 'register' && currentView !== 'create-album') && <Header onViewChange={setCurrentView} />}
      <div className="flex-grow">
        {renderView()}
      </div>
      {(currentView !== 'landing' && currentView !== 'login' && currentView !== 'register' && currentView !== 'create-album') && <Footer />}
    </div>
  );
}
