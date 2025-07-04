import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';
import MovieGrid from '../components/MovieGrid';
import { Movie } from '../types';

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch movies from the backend when the component mounts
  useEffect(() => {
    fetch('http://localhost:8080/api/movies') // Assuming this is your Spring Boot endpoint
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch movies');
        return res.json();
      })
      .then((data: Movie[]) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Handle search query and filter movies
  useEffect(() => {
    if (searchQuery) {
      const normalizedQuery = searchQuery.toLowerCase();
      const results = movies.filter(movie => {
        return (
          movie.title.toLowerCase().includes(normalizedQuery) ||
          movie.genre.some(g => g.toLowerCase().includes(normalizedQuery)) ||
          movie.language.some(l => l.toLowerCase().includes(normalizedQuery))
        );
      });
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, movies]);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Search Results for "{searchQuery}"
          </h1>
          <div className="flex max-w-lg">
            <div className="relative flex-1">
              <input
                type="text"
                defaultValue={searchQuery}
                className="w-full py-3 px-4 pr-12 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Search for movies, events, plays, sports..."
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <SearchIcon size={20} className="text-gray-500" />
              </div>
            </div>
            <button className="ml-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md transition-colors">
              Search
            </button>
          </div>
        </div>
        
        {/* Search Results */}
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
          </div>
        ) : error ? (
          <div className="text-center py-16 text-red-600">{error}</div>
        ) : searchResults.length > 0 ? (
          <MovieGrid 
            movies={searchResults} 
            title={`Found ${searchResults.length} results`}
          />
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-md">
            <div className="text-5xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No results found</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              We couldn't find any matches for "{searchQuery}". 
              Try different keywords or browse our movie listings.
            </p>
            <button 
              onClick={() => history.back()}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md transition-colors"
            >
              Go Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
