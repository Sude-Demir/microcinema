import { useState, useEffect } from 'react';
import { MOVIES } from './moviesData';

function Home({ onMovieSelect }) {
    const [movies, setMovies] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading
        setTimeout(() => {
            setMovies(MOVIES);
            const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
            setWishlist(savedWishlist);
            setLoading(false);
        }, 500);
    }, []);

    const addToWishlist = (movieId) => {
        const newWishlist = [...wishlist, movieId];
        setWishlist(newWishlist);
        localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    };

    const removeFromWishlist = (movieId) => {
        const newWishlist = wishlist.filter(id => id !== movieId);
        setWishlist(newWishlist);
        localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    };

    const isInWishlist = (id) => wishlist.includes(id);

    return (
        <div className="min-h-screen bg-dark/50 text-orange-950 font-sans selection:bg-primary selection:text-white">
            <header className="pt-16 pb-12 text-center relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10"></div>
                <h1 className="text-6xl md:text-7xl font-black mb-6 tracking-tighter hover:scale-105 transition-transform duration-500 cursor-default">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 via-amber-500 to-purple-600 animate-gradient-x drop-shadow-sm">
                        MicroCinema
                    </span>
                </h1>
                <div className="flex items-center justify-center gap-4 text-sm font-bold text-orange-950">
                    <span className="px-5 py-2 bg-white rounded-full border-2 border-orange-300 shadow-lg shadow-orange-900/10 transform hover:-translate-y-1 transition-transform cursor-default">
                        🎬 4K Ultra HD
                    </span>
                    <span className="px-5 py-2 bg-white rounded-full border-2 border-orange-300 shadow-lg shadow-orange-900/10 transform hover:-translate-y-1 transition-transform cursor-default">
                        🍿 Dolby Atmos
                    </span>
                </div>            </header>

            <div className="p-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                    {/* Movie Grid */}
                    <div className="lg:col-span-3">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <span className="text-primary">●</span> Now Showing
                        </h2>

                        {loading ? (
                            <div className="text-center py-20 text-orange-400 animate-pulse">Loading movies via Gateway...</div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {movies.map((movie) => (
                                    <div key={movie.id} className="bg-white rounded-2xl overflow-hidden shadow-2xl shadow-orange-900/20 hover:scale-[1.02] transition-all duration-300 border border-orange-200 group relative z-10">
                                        <div onClick={() => onMovieSelect(movie.id)} className="block aspect-[4/3] w-full bg-gray-200 relative overflow-hidden cursor-pointer">
                                            <img
                                                src={movie.image}
                                                alt={movie.title}
                                                className="w-full h-full object-cover shadow-sm transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <span className="absolute top-3 right-3 text-xs font-bold bg-orange-500 text-white px-2 py-1 rounded-md shadow-md">
                                                {movie.year}
                                            </span>
                                        </div>
                                        <div className="p-5">
                                            {/* Link title as well */}
                                            <div onClick={() => onMovieSelect(movie.id)} className="cursor-pointer">
                                                <h3 className="text-2xl font-black mb-3 text-orange-950 leading-tight hover:text-primary transition-colors">{movie.title}</h3>
                                            </div>
                                            <p className="text-base text-gray-800 font-medium mb-6 leading-relaxed bg-orange-50/50 p-3 rounded-lg border border-orange-100">{movie.description}</p>
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
                        {/* Keep wishlist sidebar logic same */}
                        <div className="bg-white rounded-2xl p-6 border border-orange-200 shadow-2xl shadow-orange-900/20 sticky top-8 z-10">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-orange-900">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                                My Wishlist
                                <span className="bg-orange-100 text-xs px-2 py-1 rounded-full text-orange-700 border border-orange-200">{wishlist.length}</span>
                            </h2>

                            {wishlist.length === 0 ? (
                                <div className="text-orange-900/40 text-center py-8 text-sm">
                                    Your wishlist is empty.
                                    <br />Start adding movies!
                                </div>
                            ) : (
                                <ul className="space-y-4">
                                    {wishlist.map(id => {
                                        const movie = movies.find(m => m.id === id);
                                        if (!movie) return null;
                                        return (
                                            <li key={id} className="flex items-start gap-4 p-3 rounded-lg bg-orange-50/50 hover:bg-orange-50 transition-colors group border border-orange-100">
                                                <img src={movie.image} alt={movie.title} className="w-12 h-16 object-cover rounded bg-orange-200 shadow-sm" />
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-semibold text-sm truncate text-orange-900">{movie.title}</h4>
                                                    <p className="text-xs text-orange-800/60">{movie.year}</p>
                                                    <button
                                                        onClick={() => removeFromWishlist(id)}
                                                        className="text-xs text-red-500 hover:text-red-700 mt-2 opacity-0 group-hover:opacity-100 transition-opacity font-medium"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </li>
                                        )
                                    })}
                                </ul>
                            )}
                            <div className="mt-8 pt-6 border-t border-orange-100">
                                <div className="text-xs text-orange-900/50">
                                    <span className="block font-semibold mb-1 text-orange-900/70">Microservice Status:</span>
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

export default Home;
