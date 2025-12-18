import { useState } from 'react';
import Home from './Home';
import MovieDetail from './MovieDetail';

function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' or 'detail'
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const handleMovieSelect = (id) => {
    setSelectedMovieId(id);
    setCurrentView('detail');
  };

  const handleBack = () => {
    setSelectedMovieId(null);
    setCurrentView('home');
  };

  return (
    <div className="relative min-h-screen">
      {/* User Name Tag */}
      <div className="absolute top-6 right-6 z-50 bg-white/90 backdrop-blur-md py-2 px-6 rounded-full border border-orange-200 shadow-lg shadow-orange-900/5">
        <span className="text-lg font-black text-orange-950 tracking-wide">Sude</span>
      </div>
      {currentView === 'home' && <Home onMovieSelect={handleMovieSelect} />}
      {currentView === 'detail' && <MovieDetail movieId={selectedMovieId} onBack={handleBack} />}
    </div>
  );
}

export default App;
