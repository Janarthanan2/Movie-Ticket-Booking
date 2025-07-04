package com.example.bookyourshow.repository;

import com.example.bookyourshow.model.Theatre;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TheatreRepository extends MongoRepository<Theatre, String> {
}
