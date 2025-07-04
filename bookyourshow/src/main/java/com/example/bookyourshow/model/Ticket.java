package com.example.bookyourshow.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.web.bind.annotation.CrossOrigin;

@Document(collection = "tickets")
@CrossOrigin
public class Ticket {
    @Id
    private String id;

    private String userId;
    private String showtimeId;
    private String seatSelected;

    // getters and setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getShowtimeId() { return showtimeId; }
    public void setShowtimeId(String showtimeId) { this.showtimeId = showtimeId; }

    public String getSeatSelected() { return seatSelected; }
    public void setSeatSelected(String seatSelected) { this.seatSelected = seatSelected; }
}
