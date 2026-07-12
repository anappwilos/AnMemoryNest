import { useState } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { LandingPage } from './components/LandingPage';

export default function App() {
  const [currentView, setCurrentView] = useState('landing');

  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage onStart={() => setCurrentView('dashboard')} />;
      case 'dashboard':
        return <Dashboard />;
      case 'create':
        return <div className="p-8 text-center text-stone-600">Crear nuevo recuerdo (Próximamente)</div>;
      default:
        return <LandingPage onStart={() => setCurrentView('dashboard')} />;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {currentView !== 'landing' && <Header onViewChange={setCurrentView} />}
      {renderView()}
    </div>
  );
}
