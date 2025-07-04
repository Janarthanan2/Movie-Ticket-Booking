package com.example.bookyourshow.controller;

import com.example.bookyourshow.model.Showtime;
import com.example.bookyourshow.service.ShowtimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/showtimes")
@CrossOrigin("*")
public class ShowtimeController {

    @Autowired
    private ShowtimeService showtimeService;

    @PostMapping
    public Showtime createShowtime(@RequestBody Showtime showtime) {
        return showtimeService.createShowtime(showtime);
    }

    @GetMapping
    public List<Showtime> getAllShowtimes() {
        return showtimeService.getAllShowtimes();
    }


    @GetMapping("/{id}")
    public Optional<Showtime> getShowtimeById(@PathVariable String id) {
        return showtimeService.getShowtimeById(id);
    }

    @PutMapping("/{id}")
    public Showtime updateShowtime(@PathVariable String id, @RequestBody Showtime showtime) {
        return showtimeService.updateShowtime(id, showtime);
    }

    @DeleteMapping("/{id}")
    public void deleteShowtime(@PathVariable String id) {
        showtimeService.deleteShowtime(id);
    }
}
