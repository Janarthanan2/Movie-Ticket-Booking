package com.example.bookyourshow.repository;

import com.example.bookyourshow.model.Showtime;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ShowtimeRepository extends MongoRepository<Showtime, String> {
}
