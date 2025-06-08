package com.stazy.backend.dto;

// 2. LoginResponse.java - DTO for login response

public class LoginResponse {

    private boolean success;
    private String message;
    private String token;
    private UserDto user;

    // Constructors
    public LoginResponse() {
    }

    public LoginResponse(boolean success, String message, String token, UserDto user) {
        this.success = success;
        this.message = message;
        this.token = token;
        this.user = user;
    }

    // Static factory methods
    public static LoginResponse success(String token, UserDto user) {
        return new LoginResponse(true, "Login successful", token, user);
    }

    public static LoginResponse failure(String message) {
        return new LoginResponse(false, message, null, null);
    }

    // Getters and Setters
    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public UserDto getUser() {
        return user;
    }

    public void setUser(UserDto user) {
        this.user = user;
    }
}