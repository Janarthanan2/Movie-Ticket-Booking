package com.example.bookyourshow.model;

import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "showtime")  // collection name in MongoDB
public class Showtime {

    @Id
    private String id;  // MongoDB unique _id

    @Setter
    private String theaterId;
    @Setter
    private String movieId;
    @Setter
    private String time;
    @Setter
    private String date;
    @Setter
    private double price;

    // Constructors
    public Showtime() {}

    public Showtime(String theaterId, String movieId, String time, String date, double price) {
        this.theaterId = theaterId;
        this.movieId = movieId;
        this.time = time;
        this.date = date;
        this.price = price;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public String getTheaterId() {
        return theaterId;
    }

    public String getMovieId() {
        return movieId;
    }

    public String getTime() {
        return time;
    }

    public String getDate() {
        return date;
    }

    public double getPrice() {
        return price;
    }

    public void setId(String id) {
        this.id = id;
    }
}
