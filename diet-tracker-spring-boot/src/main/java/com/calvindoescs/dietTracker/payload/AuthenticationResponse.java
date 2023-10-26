package com.calvindoescs.dietTracker.payload;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.beans.factory.annotation.Value;

public class AuthenticationResponse {
    @JsonProperty("access_token")
    private String accessToken;

    @JsonProperty("token_type")
    private String tokenType = "Bearer";;
    private String email;
    @JsonProperty("expires_in")
    private int expiresIn;
    public AuthenticationResponse() {
    }

    public AuthenticationResponse(String accessToken, String email, int expiresIn) {
        this.accessToken = accessToken;
        this.email = email;
        this.expiresIn = expiresIn;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }

    public int getExpiresIn() {
        return expiresIn;
    }

    public void setExpiresIn(int expiresIn) {
        this.expiresIn = expiresIn;
    }

    @Override
    public String toString() {
        return "AuthenticationResponse{" +
                "accessToken='" + accessToken + '\'' +
                ", tokenType='" + tokenType + '\'' +
                ", email='" + email + '\'' +
                ", expiresIn=" + expiresIn +
                '}';
    }
}
