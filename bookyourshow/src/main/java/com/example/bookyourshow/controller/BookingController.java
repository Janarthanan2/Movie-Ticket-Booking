package com.example.bookyourshow.controller;

import com.example.bookyourshow.model.Booking;
import com.example.bookyourshow.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:5173")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping
    public ResponseEntity<Booking> saveBooking(@RequestBody Booking booking) {
        Booking saved = bookingService.saveBooking(booking);
        return ResponseEntity.ok(saved);
    }

}
