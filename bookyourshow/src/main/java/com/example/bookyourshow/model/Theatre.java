package com.example.bookyourshow.model;

import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "theaters")  // collection name in MongoDB
public class Theatre {

    @Id
    private String id;  // MongoDB unique _id

    @Setter
    private String theatreId;        // your custom theatre_id
    @Setter
    private int seatingCapacity;
    @Setter
    private String location;

    // Constructors
    public Theatre() {}

    public Theatre(String theatreId, int seatingCapacity, String location) {
        this.theatreId = theatreId;
        this.seatingCapacity = seatingCapacity;
        this.location = location;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public String getTheatreId() {
        return theatreId;
    }

    public int getSeatingCapacity() {
        return seatingCapacity;
    }

    public String getLocation() {
        return location;
    }

}
