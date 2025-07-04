package com.example.bookyourshow.repository;

import com.example.bookyourshow.model.Admin;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AdminRepository extends MongoRepository<Admin, String> {
    Admin findByAdminName(String adminName);
}
