package com.stazy.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserProfileResponse {
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String address;
    private String dateOfBirth;

    public UserProfileResponse(String firstName, String lastName, String email, String phoneNumber, String address,
            String dateOfBirth) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.dateOfBirth = dateOfBirth;
    }
}