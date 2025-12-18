import { useState, useEffect } from 'react';

function MovieDetail({ movieId, onBack }) {
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    // Use the same API_BASE logic
    const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000/api';

    useEffect(() => {
        if (movieId) {
            fetchMovie();
        }
    }, [movieId]);

    const fetchMovie = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${API_BASE}/movies/${movieId}`);
            if (!res.ok) throw new Error('Movie not found');
            const data = await res.json();
            setMovie(data);
        } catch (error) {
            console.error("Error fetching movie:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="text-center py-20 text-orange-400">Loading details...</div>;
    if (!movie) return <div className="text-center py-20 text-red-500">Movie not found.</div>;

    return (
        <div className="min-h-screen bg-dark/50 text-orange-950 font-sans selection:bg-primary selection:text-white p-8">
            <button onClick={onBack} className="inline-block mb-8 text-orange-600 hover:text-orange-800 font-bold text-lg cursor-pointer">&larr; Back to Movies</button>

            <div className="max-w-4xl mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl border border-orange-200 flex flex-col md:flex-row">
                <div className="md:w-1/2 relative h-96 md:h-auto">
                    <img src={movie.image} alt={movie.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-8 md:w-1/2 flex flex-col justify-center">
                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-bold border border-orange-200">
                            📅 {movie.year}
                        </span>
                        <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-bold border border-orange-200">
                            ⏱️ {movie.duration}
                        </span>
                        <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-bold border border-orange-200">
                            ⭐ {movie.rating}/10
                        </span>
                    </div>
                    <h1 className="text-4xl font-black mb-4 text-orange-950 leading-tight">{movie.title}</h1>
                    <p className="text-lg text-gray-700 leading-relaxed">{movie.description}</p>
                </div>
            </div>
        </div>
    );
}

export default MovieDetail;
