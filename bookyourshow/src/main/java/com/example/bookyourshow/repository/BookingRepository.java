package com.example.bookyourshow.repository;

import com.example.bookyourshow.model.Booking;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingRepository extends MongoRepository<Booking, String> {
    // You can add custom query methods if needed
}
