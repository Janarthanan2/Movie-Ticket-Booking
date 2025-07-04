package com.example.bookyourshow.repository;

import com.example.bookyourshow.model.Ticket;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TicketRepository extends MongoRepository<Ticket, String> {
}
