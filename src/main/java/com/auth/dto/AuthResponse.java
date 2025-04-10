package com.auth.dto;

import java.util.List;

public class AuthResponse {
    private String username;
    private String message;
    private List<String> roles;

    public AuthResponse(String username, String message, List<String> roles) {
        this.username = username;
        this.message = message;
        this.roles = roles;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }
}

