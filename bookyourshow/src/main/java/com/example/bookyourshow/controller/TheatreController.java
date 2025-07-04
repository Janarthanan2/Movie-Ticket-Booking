package com.example.bookyourshow.controller;

import com.example.bookyourshow.model.Theatre;
import com.example.bookyourshow.repository.TheatreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/theatres")
@CrossOrigin("*")
public class TheatreController {

    @Autowired
    private TheatreRepository theatreRepository;

    @PostMapping
    public Theatre createTheatre(@RequestBody Theatre theatre) {
        return theatreRepository.save(theatre);
    }

    @GetMapping
    public List<Theatre> getAllTheatres() {
        return theatreRepository.findAll();
    }
}
