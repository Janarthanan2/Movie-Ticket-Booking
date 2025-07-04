package com.example.bookyourshow.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.bookyourshow.model.User;
import com.example.bookyourshow.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    // Create
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.addUser(user);
    }

    // Get All
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // Get One
    @GetMapping("/{id}")
    public Optional<User> getUserById(@PathVariable String id) {
        return userService.getUserById(id);
    }

    // Update
    @PutMapping("/{id}")
    public User updateUser(@PathVariable String id, @RequestBody User updatedUser) {
        return userService.updateUser(id, updatedUser);
    }

    // Delete
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
    }
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginData) {
        User user = userService.getUserByEmail(loginData.getEmail());

        if (user != null && user.getPassword().equals(loginData.getPassword())) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }


}
