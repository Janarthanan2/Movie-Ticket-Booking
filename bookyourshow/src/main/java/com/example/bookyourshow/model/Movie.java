package com.example.bookyourshow.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "movies")
public class Movie {

    @Id
    private String id;
    private String title;
    private String posterUrl;
    private int rating;
    private List<String> genre;
    private List<String> language;
    private String duration;
    private String releaseDate;
    private String certificate;
    private String description;
    private boolean featured;

    // Constructors
    public Movie() {
    }

    public Movie(String id, String title, String posterUrl, int rating, List<String> genre,
                 List<String> language, String duration, String releaseDate,
                 String certificate, String description, boolean featured) {
        this.id = id;
        this.title = title;
        this.posterUrl = posterUrl;
        this.rating = rating;
        this.genre = genre;
        this.language = language;
        this.duration = duration;
        this.releaseDate = releaseDate;
        this.certificate = certificate;
        this.description = description;
        this.featured = featured;
    }

    // Getters and setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPosterUrl() {
        return posterUrl;
    }

    public void setPosterUrl(String posterUrl) {
        this.posterUrl = posterUrl;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public List<String> getGenre() {
        return genre;
    }

    public void setGenre(List<String> genre) {
        this.genre = genre;
    }

    public List<String> getLanguage() {
        return language;
    }

    public void setLanguage(List<String> language) {
        this.language = language;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(String releaseDate) {
        this.releaseDate = releaseDate;
    }

    public String getCertificate() {
        return certificate;
    }

    public void setCertificate(String certificate) {
        this.certificate = certificate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isFeatured() {
        return featured;
    }

    public void setFeatured(boolean featured) {
        this.featured = featured;
    }
}
