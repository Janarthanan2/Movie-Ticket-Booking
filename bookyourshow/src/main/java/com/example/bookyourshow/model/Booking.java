package com.example.bookyourshow.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "bookings")
public class Booking {

    @Id
    private String id;

    private String movieTitle;
    private String theatreName;
    private String showtime;
    private List<String> seats;
    private int totalPrice;

    public Booking() {
    }

    public Booking(String movieTitle, String theatreName, String showtime, List<String> seats, int totalPrice) {
        this.movieTitle = movieTitle;
        this.theatreName = theatreName;
        this.showtime = showtime;
        this.seats = seats;
        this.totalPrice = totalPrice;
    }

    // Getters and Setters

    public String getId() {
        return id;
    }

    public String getMovieTitle() {
        return movieTitle;
    }

    public void setMovieTitle(String movieTitle) {
        this.movieTitle = movieTitle;
    }

    public String getTheatreName() {
        return theatreName;
    }

    public void setTheatreName(String theatreName) {
        this.theatreName = theatreName;
    }

    public String getShowtime() {
        return showtime;
    }

    public void setShowtime(String showtime) {
        this.showtime = showtime;
    }

    public List<String> getSeats() {
        return seats;
    }

    public void setSeats(List<String> seats) {
        this.seats = seats;
    }

    public int getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(int totalPrice) {
        this.totalPrice = totalPrice;
    }
}
