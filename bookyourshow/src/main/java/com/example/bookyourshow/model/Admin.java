package com.example.bookyourshow.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "admins")
public class Admin {

    @Id
    private String id;

    private String adminName;
    private String password;

    public Admin() {
    }

    public Admin(String adminName, String password) {
        this.adminName = adminName;
        this.password = password;  // Ensure password is hashed when setting it
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public String getAdminName() {
        return adminName;
    }

    public String getPassword() {
        return password;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setAdminName(String adminName) {
        this.adminName = adminName;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
