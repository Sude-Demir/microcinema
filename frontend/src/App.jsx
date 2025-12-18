import { useState, useEffect } from 'react';

function App() {
  const [movies, setMovies] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // Gateway URL - Use environment variable for production, localhost for dev
  const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000/api';

  useEffect(() => {
    fetchMovies();
    fetchWishlist();
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await fetch(`${API_BASE}/movies`);
      const data = await res.json();
      setMovies(data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchWishlist = async () => {
    try {
      const res = await fetch(`${API_BASE}/wishlist`);
      const data = await res.json();
      setWishlist(data);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  const addToWishlist = async (movieId) => {
    try {
      const res = await fetch(`${API_BASE}/wishlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ movieId }),
      });
      const data = await res.json();
      if (data.success) {
        setWishlist(data.wishlist);
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  const removeFromWishlist = async (movieId) => {
    try {
      const res = await fetch(`${API_BASE}/wishlist/${movieId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setWishlist(data.wishlist);
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  const isInWishlist = (id) => wishlist.includes(id);

  return (
    <div className="min-h-screen bg-dark text-slate-100 font-sans selection:bg-primary selection:text-white">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-dark to-dark -z-10"></div>

      <header className="pt-16 pb-12 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10"></div>
        <h1 className="text-6xl md:text-7xl font-black mb-6 tracking-tighter hover:scale-105 transition-transform duration-500 cursor-default">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-400 to-secondary animate-gradient-x">
            Micro
          </span>
          <span className="text-white drop-shadow-2xl">Cinema</span>
        </h1>
        <div className="flex items-center justify-center gap-4 text-sm font-medium text-slate-400">
          <span className="px-3 py-1 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm">🎬 4K Ultra HD</span>
          <span className="px-3 py-1 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm">🍿 Dolby Atmos</span>
        </div>
      </header>

      <div className="p-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

          {/* Movie Grid */}
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-primary">●</span> Now Showing
            </h2>

            {loading ? (
              <div className="text-center py-20 text-slate-500 animate-pulse">Loading movies via Gateway...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {movies.map((movie) => (
                  <div key={movie.id} className="bg-card rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border border-slate-700/50 group">
                    <div className="h-48 bg-slate-700 relative overflow-hidden">
                      <img
                        src={movie.image}
                        alt={movie.title}
                        className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent"></div>
                      <span className="absolute bottom-2 left-4 text-xs font-bold bg-white/10 backdrop-blur-md px-2 py-1 rounded text-white">
                        {movie.year}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-slate-100">{movie.title}</h3>
                      <p className="text-sm text-slate-400 mb-6">{movie.description}</p>
                      <button
                        onClick={() => isInWishlist(movie.id) ? removeFromWishlist(movie.id) : addToWishlist(movie.id)}
                        className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${isInWishlist(movie.id)
                          ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                          : 'bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 shadow-lg shadow-primary/25'
                          }`}
                      >
                        {isInWishlist(movie.id) ? (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                            In Wishlist
                          </>
                        ) : (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
                            Add to Wishlist
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Wishlist Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 sticky top-8">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                My Wishlist
                <span className="bg-slate-700 text-xs px-2 py-1 rounded-full text-slate-300">{wishlist.length}</span>
              </h2>

              {wishlist.length === 0 ? (
                <div className="text-slate-500 text-center py-8 text-sm">
                  Your wishlist is empty.
                  <br />Start adding movies!
                </div>
              ) : (
                <ul className="space-y-4">
                  {wishlist.map(id => {
                    const movie = movies.find(m => m.id === id);
                    if (!movie) return null;
                    return (
                      <li key={id} className="flex items-start gap-4 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors group">
                        <img src={movie.image} alt={movie.title} className="w-12 h-16 object-cover rounded bg-slate-700" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm truncate text-slate-200">{movie.title}</h4>
                          <p className="text-xs text-slate-500">{movie.year}</p>
                          <button
                            onClick={() => removeFromWishlist(id)}
                            className="text-xs text-red-400 hover:text-red-300 mt-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            Remove
                          </button>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              )}
              <div className="mt-8 pt-6 border-t border-slate-700">
                <div className="text-xs text-slate-500">
                  <span className="block font-semibold mb-1 text-slate-400">Microservice Status:</span>
                  <div className="flex items-center gap-2 mb-1"><div className="w-2 h-2 rounded-full bg-green-500"></div>Gateway (3000)</div>
                  <div className="flex items-center gap-2 mb-1"><div className="w-2 h-2 rounded-full bg-green-500"></div>Movie (3001)</div>
                  <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500"></div>Wishlist (3002)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
