import React from 'react';
import { Movie } from '../types';

interface MovieGridProps {
  movies: Movie[];
  title: string;
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, title }) => {
  return (
    <div>
      <h2>{title}</h2>
      <div className="grid grid-cols-3 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="border p-4 rounded-lg">
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-full h-auto mb-4 rounded"
            />
            <h3 className="text-xl font-bold">{movie.title}</h3>
            <p className="text-gray-500">{movie.genre.join(', ')}</p>
            <p className="text-gray-500">{movie.language.join(', ')}</p>
            <p className="text-gray-700">{movie.duration}</p>
            <p className="text-gray-600">{movie.releaseDate}</p>
            <p className="text-gray-600">{movie.certificate}</p>
            <p className="text-yellow-600">Rating: {movie.rating}</p>
            {movie.description && <p className="text-gray-700">{movie.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieGrid;
