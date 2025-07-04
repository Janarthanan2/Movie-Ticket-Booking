// src/components/MoviesList.tsx
import React, { useState, useEffect } from 'react';
import {
  getAllMovies,
  addMovie,
  deleteMovie,
  Movie,
} from '../services/MovieService';

const MoviesList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [newMovie, setNewMovie] = useState<Movie>({
    title: '',
    description: '',
    genre: [],
    duration: 0,
    posterUrl: '',
    featured: false,
  });

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movies = await getAllMovies();
        setMovies(movies);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'duration') {
      setNewMovie({ ...newMovie, [name]: Number(value) });
    } else {
      setNewMovie({ ...newMovie, [name]: value });
    }
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const genres = e.target.value.split(',').map((g) => g.trim());
    setNewMovie({ ...newMovie, genre: genres });
  };

  const handleAddMovie = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addMovie(newMovie);
      setNewMovie({
        title: '',
        description: '',
        genre: [],
        duration: 0,
        posterUrl: '',
        featured: false,
      });
      const updatedMovies = await getAllMovies();
      setMovies(updatedMovies);
    } catch (error) {
      console.error('Failed to add movie:', error);
    }
  };

  const handleDeleteMovie = async (id: string) => {
    try {
      await deleteMovie(id);
      const updatedMovies = await getAllMovies();
      setMovies(updatedMovies);
    } catch (error) {
      console.error('Failed to delete movie:', error);
    }
  };

  return (
    <div>
      <h1>Movies List</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <strong>{movie.title}</strong> - {movie.duration} mins
            <br />
            <em>{movie.genre.join(', ')}</em>
            <br />
            {movie.posterUrl && <img src={movie.posterUrl} alt={movie.title} width={100} />}
            <br />
            <button onClick={() => handleDeleteMovie(movie.id!)}>Delete</button>
          </li>
        ))}
      </ul>

      <h2>Add New Movie</h2>
      <form onSubmit={handleAddMovie}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newMovie.title}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newMovie.description}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="genre"
          placeholder="Genres (comma separated)"
          onChange={handleGenreChange}
        />
        <input
          type="number"
          name="duration"
          placeholder="Duration (minutes)"
          value={newMovie.duration}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="posterUrl"
          placeholder="Poster URL"
          value={newMovie.posterUrl}
          onChange={handleInputChange}
        />
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
};

export default MoviesList;
