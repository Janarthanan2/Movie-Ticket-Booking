package com.example.bookyourshow.service;

import com.example.bookyourshow.model.User;
import com.example.bookyourshow.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User addUser(User user) {
        Optional<User> existing = Optional.ofNullable(userRepository.findByEmail(user.getEmail()));
        if (existing.isPresent()) {
            throw new RuntimeException("User already exists");
        }
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(String id) {
        return userRepository.findById(id);
    }

    public User updateUser(String id, User updatedUser) {
        updatedUser.setId(id);
        return userRepository.save(updatedUser);
    }

    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }

    public boolean loginUser(String email, String password) {
        Optional<User> user = Optional.ofNullable(userRepository.findByEmail(email));
        return user.isPresent() && user.get().getPassword().equals(password);
    }

    // New method to get a user by email
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
