// src/services/MovieService.ts
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/movies';

export interface Movie {
  id?: string;
  title: string;
  description: string;
  posterUrl?: string;
  genre: string[]; // genres as array
  featured?: boolean;
  duration: number;
}

// Get all movies
export const getAllMovies = async (): Promise<Movie[]> => {
  const response = await axios.get<Movie[]>(API_URL);
  return response.data;
};

// Add a new movie
export const addMovie = async (movie: Movie): Promise<Movie> => {
  const response = await axios.post<Movie>(API_URL, movie);
  return response.data;
};

// Delete a movie by ID
export const deleteMovie = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

// Update a movie
export const updateMovie = async (id: string, movie: Movie): Promise<Movie> => {
  const response = await axios.put(`${API_URL}/${id}`, movie);
  return response.data;
};
