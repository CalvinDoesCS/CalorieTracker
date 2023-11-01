package com.calvindoescs.dietTracker.payload;

import com.fasterxml.jackson.annotation.JsonProperty;

public class RefreshTokenResponse {
    @JsonProperty("access_token")
    private String accessToken;

    @JsonProperty("token_type")
    private String tokenType = "Bearer";;
    private String email;
    @JsonProperty("expires_in")
    private int expiresIn;

    public RefreshTokenResponse() {
    }

    public RefreshTokenResponse(String accessToken, String tokenType, String email, int expiresIn) {
        this.accessToken = accessToken;
        this.tokenType = tokenType;
        this.email = email;
        this.expiresIn = expiresIn;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getExpiresIn() {
        return expiresIn;
    }

    public void setExpiresIn(int expiresIn) {
        this.expiresIn = expiresIn;
    }

    @Override
    public String toString() {
        return "RefreshTokenResponse{" +
                "accessToken='" + accessToken + '\'' +
                ", tokenType='" + tokenType + '\'' +
                ", email='" + email + '\'' +
                ", expiresIn=" + expiresIn +
                '}';
    }
}
