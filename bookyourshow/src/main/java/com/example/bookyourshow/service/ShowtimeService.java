package com.example.bookyourshow.service;

import com.example.bookyourshow.model.Showtime;
import com.example.bookyourshow.repository.ShowtimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ShowtimeService {

    @Autowired
    private ShowtimeRepository showtimeRepository;


    public Showtime createShowtime(Showtime showtime) {
        return showtimeRepository.save(showtime);
    }

    public List<Showtime> getAllShowtimes() {
        return showtimeRepository.findAll();
    }

    public Optional<Showtime> getShowtimeById(String id) {
        return showtimeRepository.findById(id);
    }

    public Showtime updateShowtime(String id, Showtime updatedShowtime) {
        updatedShowtime.setId(id);
        return showtimeRepository.save(updatedShowtime);
    }

    public void deleteShowtime(String id) {
        showtimeRepository.deleteById(id);
    }
}
