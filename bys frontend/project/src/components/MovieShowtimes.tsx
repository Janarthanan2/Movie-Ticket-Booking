import React, { useEffect, useState } from 'react';
import { Theater, Showtime } from '../types';
import axios from 'axios';

interface MovieShowtimesProps {
  selectedMovieId: string; // To filter showtimes for selected movie
  onSelectShowtime: (showtime: Showtime) => void;
}

const MovieShowtimes: React.FC<MovieShowtimesProps> = ({ selectedMovieId, onSelectShowtime }) => {
  const [theatersWithShowtimes, setTheatersWithShowtimes] = useState<
    { theater: Theater; showtimes: Showtime[] }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch theaters
        const theaterRes = await axios.get<Theater[]>('http://localhost:8080/api/theatres');

        // Fetch showtimes (assuming you have an endpoint)
        const showtimeRes = await axios.get<Showtime[]>('http://localhost:8080/api/showtimes');

        // Combine theaters with their respective showtimes
        const combined = theaterRes.data.map(theater => {
          const showtimes = showtimeRes.data.filter(
            st => st.theaterId === theater.theatreId && st.movieId === selectedMovieId
          );
          return { theater, showtimes };
        });

        // Set state
        setTheatersWithShowtimes(combined.filter(t => t.showtimes.length > 0));
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, [selectedMovieId]);

  return (
    <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {theatersWithShowtimes.map(({ theater, showtimes }) => (
        <div key={theater.theatreId} className="bg-white rounded-lg shadow-lg p-4">
          <h3 className="text-xl font-semibold">{theater.name || theater.theatreId}</h3>
          <p className="text-sm text-gray-600">{theater.location}</p>
          <div className="mt-4">
            {showtimes.map(showtime => (
              <button
                key={showtime.id}
                onClick={() => onSelectShowtime(showtime)}
                className="block w-full text-left py-2 px-4 mb-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors"
              >
                {new Date(`1970-01-01T${showtime.time}`).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieShowtimes;
