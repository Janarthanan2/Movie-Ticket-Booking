package com.example.bookyourshow.service;

import com.example.bookyourshow.model.Movie;
import com.example.bookyourshow.repository.MovieRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MovieService {

    private final MovieRepository movieRepository;

    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    public Optional<Movie> getMovieById(String id) {
        return movieRepository.findById(id);
    }

    public Movie addMovie(Movie movie) {
        return movieRepository.save(movie);
    }

    public void deleteMovie(String id) {
        movieRepository.deleteById(id);
    }

    public Movie updateMovie(String id, Movie updatedMovie) {
        return movieRepository.findById(id)
                .map(movie -> {
                    movie.setTitle(updatedMovie.getTitle());
                    movie.setDescription(updatedMovie.getDescription());
                    movie.setGenre(updatedMovie.getGenre());
                    movie.setLanguage(updatedMovie.getLanguage());  // Added this field
                    movie.setDuration(updatedMovie.getDuration());  // Duration as string
                    movie.setReleaseDate(updatedMovie.getReleaseDate());  // Added this field
                    movie.setCertificate(updatedMovie.getCertificate());  // Added this field
                    movie.setFeatured(updatedMovie.isFeatured());  // Updated featured field
                    return movieRepository.save(movie);
                })
                .orElse(null);
    }
}
