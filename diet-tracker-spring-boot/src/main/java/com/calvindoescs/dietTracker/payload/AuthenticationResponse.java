package com.calvindoescs.dietTracker.payload;

public class AuthenticationResponse {
    private String access_token;
    private String email;

    public AuthenticationResponse() {
    }

    public AuthenticationResponse(String access_token,String email) {
        this.access_token = access_token;
        this.email = email;
    }

    public String getAccess_token() {
        return access_token;
    }

    public void setAccess_token(String access_token) {
        this.access_token = access_token;
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "AuthenticationResponse{" +
                "access_token='" + access_token + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
