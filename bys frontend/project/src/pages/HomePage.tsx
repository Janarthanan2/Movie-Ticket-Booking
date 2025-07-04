import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from '../components/MovieCard';

const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    { id: 'action', name: 'Action & Adventure' },
    { id: 'comedy', name: 'Comedy' },
    { id: 'family', name: 'Family' },
    { id: 'thriller', name: 'Thriller & Horror' }
  ];

  useEffect(() => {
    fetch('http://localhost:8080/api/movies')
      .then(async response => {
        if (!response.ok) {
          const text = await response.text();
          throw new Error(`Status ${response.status}: ${text}`);
        }
        return response.json();
      })
      .then(data => {
        setMovies(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching movies:", error);
        setError('Failed to fetch movies.');
        setLoading(false);
      });
  }, []);

  const getMoviesByGenre = (genre: string) => {
    console.log("Filtering by genre:", genre);  // Log the genre to check if it's correct
    return movies.filter(movie => {
      console.log("Movie Genres:", movie.genre);  // Log the movie genres to see the actual data
      return movie.genre?.some((g: string) => g.toLowerCase() === genre.toLowerCase());
    });
  };

  const scrollCategory = (categoryId: string, direction: 'left' | 'right') => {
    const container = document.getElementById(`scroll-${categoryId}`);
    if (container) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (loading) return <div className="text-white p-4">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;
  if (!movies.length) return <div className="text-white p-4">No movies available</div>;

  return (
    <main className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      {movies[0] && (
        <section className="relative h-[80vh] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${movies[0].posterUrl})`,
              filter: 'brightness(0.6)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50"></div>
          </div>

          <div className="relative h-full flex items-end pb-20 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto">
              <div className="max-w-2xl">
                <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4">
                  {movies[0].title}
                </h1>
                <p className="text-lg text-gray-200 mb-6">{movies[0].description}</p>
                <div className="flex space-x-4">
                  <button className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-md transition-colors">
                    Book Now
                  </button>
                  <button className="px-8 py-3 bg-gray-800/80 hover:bg-gray-700/80 text-white font-bold rounded-md transition-colors">
                    Watch Trailer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Movie Categories */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {categories.map(category => {
            const categoryMovies = getMoviesByGenre(category.name.split(' ')[0]);
            if (!categoryMovies.length) return null;

            return (
              <div key={category.id} className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6">{category.name}</h2>
                <div className="relative group">
                  <button
                    onClick={() => scrollCategory(category.id, 'left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronLeft size={24} />
                  </button>

                  <button
                    onClick={() => scrollCategory(category.id, 'right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight size={24} />
                  </button>

                  <div
                    id={`scroll-${category.id}`}
                    className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {categoryMovies.map(movie => (
                      <div key={movie.id} className="flex-none w-64">
                        <MovieCard movie={movie} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};


export default HomePage;
