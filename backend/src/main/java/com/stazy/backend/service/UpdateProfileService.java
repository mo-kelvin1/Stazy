package com.stazy.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stazy.backend.dto.UpdateProfileRequest;
import com.stazy.backend.model.User;
import com.stazy.backend.repository.UserRepository;

@Service
public class UpdateProfileService {

    @Autowired
    private UserRepository userRepository;

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public User updateUserProfile(User user, UpdateProfileRequest request) {
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setAddress(request.getAddress());
        user.setDateOfBirth(request.getDateOfBirth());

        return userRepository.save(user);
    }

}
