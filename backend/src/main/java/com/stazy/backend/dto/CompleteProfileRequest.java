package com.stazy.backend.dto;

import lombok.Data;

@Data
public class CompleteProfileRequest {
    private String firstName;
    private String lastName;
    private String phoneNumber;

    public String getFirstname() {
        return firstName;
    }

    public String getLastname() {
        return lastName;
    }

    public String getPhonenumber() {
        return phoneNumber;
    }
}