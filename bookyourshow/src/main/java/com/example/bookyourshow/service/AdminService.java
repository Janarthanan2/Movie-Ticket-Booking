package com.example.bookyourshow.service;

import com.example.bookyourshow.model.Admin;
import com.example.bookyourshow.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    public Optional<Admin> getAdminById(String id) {
        return adminRepository.findById(id);
    }

    public Admin addAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    public void deleteAdmin(String id) {
        adminRepository.deleteById(id);
    }

    public Admin updateAdmin(String id, Admin updatedAdmin) {
        Optional<Admin> existingAdmin = adminRepository.findById(id);
        if (existingAdmin.isPresent()) {
            Admin admin = existingAdmin.get();
            admin.setAdminName(updatedAdmin.getAdminName());
            admin.setPassword(updatedAdmin.getPassword());
            return adminRepository.save(admin);
        } else {
            return null;
        }
    }
}
