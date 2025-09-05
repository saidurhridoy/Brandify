import React, { useState, useCallback } from 'react';
import HomePage from './pages/HomePage';
import MagazineProfilePage from './pages/MagazineProfilePage';
import BookingPage from './pages/BookingPage';
import Header from './components/Header';
import Footer from './components/Footer';
import { Magazine, BookingData } from './types';
import { MAGAZINES } from './constants';

type View = 'home' | 'magazine' | 'booking';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedMagazine, setSelectedMagazine] = useState<Magazine | null>(null);

  const navigateToHome = useCallback(() => {
    setCurrentView('home');
    setSelectedMagazine(null);
  }, []);

  const navigateToMagazineProfile = useCallback((magazineId: string) => {
    const magazine = MAGAZINES.find(m => m.id === magazineId) || null;
    setSelectedMagazine(magazine);
    setCurrentView('magazine');
  }, []);

  const navigateToBooking = useCallback((magazine?: Magazine) => {
    if (magazine) {
      setSelectedMagazine(magazine);
    }
    setCurrentView('booking');
  }, []);
  
  const handleBookingComplete = useCallback((data: BookingData) => {
    console.log('Booking submitted:', data);
    const packageNames = data.adPackages.map(p => p.name).join(', ');
    const totalCost = data.adPackages.reduce((sum, pkg) => sum + pkg.price, 0);
    alert(`Thank you, ${data.fullName}! Your submission for ${packageNames} in ${data.magazine?.name} (Total: $${totalCost}) has been received.`);
    navigateToHome();
  }, [navigateToHome]);


  const renderContent = () => {
    switch (currentView) {
      case 'magazine':
        return selectedMagazine ? (
          <MagazineProfilePage
            magazine={selectedMagazine}
            onBookAd={navigateToBooking}
            onBack={navigateToHome}
          />
        ) : (
          <HomePage onSelectMagazine={navigateToMagazineProfile} onStartBooking={navigateToBooking} />
        );
      case 'booking':
        return <BookingPage initialMagazine={selectedMagazine} onBookingComplete={handleBookingComplete} onCancel={navigateToHome} />;
      case 'home':
      default:
        return <HomePage onSelectMagazine={navigateToMagazineProfile} onStartBooking={navigateToBooking} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-brand-dark">
      <Header onLogoClick={navigateToHome} />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
