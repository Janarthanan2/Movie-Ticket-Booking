package com.example.bookyourshow.controller;

import com.example.bookyourshow.model.Ticket;
import com.example.bookyourshow.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")  // All endpoints will start with /api/tickets
public class TicketController {

    @Autowired
    private TicketRepository ticketRepository;

    // Create a new ticket (save)
    @PostMapping
    public Ticket saveTicket(@RequestBody Ticket ticket) {
        return ticketRepository.save(ticket);
    }

    // Get all tickets
    @GetMapping
    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }
}
