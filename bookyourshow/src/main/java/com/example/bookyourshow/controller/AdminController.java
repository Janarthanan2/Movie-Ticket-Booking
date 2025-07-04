package com.example.bookyourshow.controller;

import com.example.bookyourshow.model.Admin;
import com.example.bookyourshow.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admins")
@CrossOrigin(origins = "*") // allow React frontend
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping
    public List<Admin> getAllAdmins() {
        return adminService.getAllAdmins();
    }

    @GetMapping("/{id}")
    public Optional<Admin> getAdminById(@PathVariable String id) {
        return adminService.getAdminById(id);
    }

    @PostMapping
    public Admin addAdmin(@RequestBody Admin admin) {
        return adminService.addAdmin(admin);
    }

    @PutMapping("/{id}")
    public Admin updateAdmin(@PathVariable String id, @RequestBody Admin updatedAdmin) {
        return adminService.updateAdmin(id, updatedAdmin);
    }

    @DeleteMapping("/{id}")
    public void deleteAdmin(@PathVariable String id) {
        adminService.deleteAdmin(id);
    }
}
