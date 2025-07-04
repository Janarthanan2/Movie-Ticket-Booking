import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Calendar, Star, Share2, Heart } from 'lucide-react';
import { theaters, showtimes } from '../data/theaters';
import { Movie, Theater, Showtime } from '../types';
import MovieShowtimes from '../components/MovieShowtimes';
import { useAuth } from '../context/AuthContext';

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [theatersWithShowtimes, setTheatersWithShowtimes] = useState<{
    theater: Theater;
    showtimes: Showtime[];
  }[]>([]);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (!id) return;

    // Fetch movie from backend
    fetch(`http://localhost:8080/api/movies/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Movie not found');
        return res.json();
      })
      .then((data: Movie) => {
        setMovie(data);
        document.title = `${data.title} - CinemaBook`;
        setLoading(false);

        // Find all showtimes for this movie
        const movieShowtimes = showtimes.filter(st => st.movieId === id);

        // Group showtimes by theater
        const theaterMap = new Map<string, Showtime[]>();
        movieShowtimes.forEach(st => {
          if (!theaterMap.has(st.theaterId)) {
            theaterMap.set(st.theaterId, []);
          }
          theaterMap.get(st.theaterId)?.push(st);
        });

        const theaterShowtimes = Array.from(theaterMap.entries()).map(([theaterId, sts]) => {
          const theater = theaters.find(t => t.id === theaterId);
          return {
            theater: theater!,
            showtimes: sts
          };
        });

        setTheatersWithShowtimes(theaterShowtimes);
      })
      .catch(err => {
        console.error(err);
        setError('Movie not found');
        setLoading(false);
        navigate('/not-found');
      });
  }, [id, navigate]);

  const handleShowtimeSelect = (showtime: Showtime) => {
    if (!isAuthenticated) {
      navigate(`/login?redirect=/movie/${id}&showtime=${showtime.id}`);
      return;
    }
    navigate(`/booking/${id}?showtime=${showtime.id}&theater=${showtime.theaterId}`);
  };

  const handleShareClick = () => {
    if (navigator.share) {
      navigator
        .share({
          title: movie?.title,
          text: `Check out ${movie?.title} on CinemaBook`,
          url: window.location.href,
        })
        .catch((error) => console.log('Error sharing:', error));
    } else {
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Link copied to clipboard!'))
        .catch(err => console.error('Could not copy text: ', err));
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-lg text-gray-600">Loading movie details...</p>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-lg text-red-600">Movie not found.</p>
      </div>
    );
  }

  return (
    <main>
      <section 
        className="relative py-16 lg:py-24 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${movie.posterUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-80"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="w-64 h-96 rounded-lg overflow-hidden shadow-2xl flex-shrink-0">
              <img src={movie.posterUrl} alt={movie.title} className="w-full h-full object-cover" />
            </div>
            
            <div className="text-white flex-1">
              <div className="flex items-center space-x-2 mb-3">
                <span className="bg-red-600 text-white px-2 py-1 rounded text-sm font-medium">
                  {movie.certificate}
                </span>
                <span className="text-sm bg-gray-700 px-2 py-1 rounded">
                  {movie.releaseDate}
                </span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">{movie.title}</h1>
              
              <div className="flex items-center mb-6 space-x-4">
                <div className="flex items-center">
                  <Star className="text-yellow-400 mr-1" size={20} />
                  <span className="font-medium">{movie.rating}/5</span>
                </div>
                <div className="flex items-center">
                  <Clock className="text-gray-400 mr-1" size={18} />
                  <span>{movie.duration}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="text-gray-400 mr-1" size={18} />
                  <span>{movie.releaseDate}</span>
                </div>
              </div>
              
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">About the movie</h2>
                <p className="text-gray-300">
                  {movie.description || "No description available for this movie."}
                </p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Cast & Crew</h3>
                <div className="flex flex-wrap gap-2">
                  {["Director", "Producer", "Lead Actor", "Lead Actress", "Screenwriter"].map((role, index) => (
                    <span key={index} className="bg-gray-700 rounded-full px-3 py-1 text-sm">
                      {role}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <button 
                  onClick={handleShareClick}
                  className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 rounded-full px-4 py-2 transition-colors"
                >
                  <Share2 size={18} />
                  <span>Share</span>
                </button>
                <button 
                  onClick={() => setLiked(!liked)}
                  className={`flex items-center space-x-2 rounded-full px-4 py-2 transition-colors ${
                    liked ? "bg-red-600 hover:bg-red-700" : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  <Heart size={18} fill={liked ? "white" : "none"} />
                  <span>{liked ? "Liked" : "Like"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Showtimes & Tickets</h2>
          
          <MovieShowtimes 
            theatersWithShowtimes={theatersWithShowtimes}
            onSelectShowtime={handleShowtimeSelect}
          />
        </div>
      </section>
    </main>
  );
};

export default MovieDetailsPage;
