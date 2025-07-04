import { useEffect, useState } from 'react';
import { Movie } from '../types';

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/movies')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch movies');
        return res.json();
      })
      .then((data: Movie[]) => {
        console.log('Fetched movies:', data);
        setMovies(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { movies, loading, error };
};
