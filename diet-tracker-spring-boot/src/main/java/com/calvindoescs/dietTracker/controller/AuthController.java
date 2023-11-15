package com.calvindoescs.dietTracker.controller;

import com.calvindoescs.dietTracker.entity.FoodLog;
import com.calvindoescs.dietTracker.entity.MealType;
import com.calvindoescs.dietTracker.entity.RefreshToken;
import com.calvindoescs.dietTracker.entity.User;
import com.calvindoescs.dietTracker.exception.TokenRefreshException;
import com.calvindoescs.dietTracker.payload.*;
import com.calvindoescs.dietTracker.service.AuthenticationService;
import com.calvindoescs.dietTracker.service.RefreshTokenService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;


@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthenticationService authenticationService;
    private final RefreshTokenService refreshTokenService;

    @Autowired
    public AuthController(AuthenticationService authenticationService, RefreshTokenService refreshTokenService) {
        this.authenticationService = authenticationService;
        this.refreshTokenService = refreshTokenService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            // If the registration is successful, return a success response
            AuthenticationResponse response = authenticationService.register(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            // If an error occurs during registration, return duplicated user error
            String errorMessage = "Registration failed: " + "Email Already Exist"; // Customize the error message as needed
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
        }
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> signin(HttpServletResponse response, @RequestBody AuthenticationRequest request) {
        AuthenticationResponse authenticationResponse = authenticationService.authenticate(request);
        if(authenticationResponse.getAccessToken() == null){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Bad Credentials");
        }
        response.addCookie(refreshTokenService.createRefreshCookie(request.getEmail()));

        return ResponseEntity.ok(authenticationResponse);

    }

    @PostMapping("/refreshToken")
    public ResponseEntity<?> refreshToken(HttpServletRequest request, HttpServletResponse response, @CookieValue(name = "refreshToken") String token) {
        try {
            //Find the RefreshToken
            RefreshToken refreshToken = refreshTokenService.findByToken(token)
                    .orElseThrow(() -> new NoSuchElementException("Cookie not found"));
            //Verify the RefreshToken is not expired
            refreshTokenService.verifyExpiration(refreshToken);
            //Create a new pair of access and Refresh token
            RefreshTokenResponse tokenResponse = refreshTokenService.generateAccessToken(refreshToken);

            //delete the old refreshToken and create refresh cookie
            refreshTokenService.deleteByToken(token);
            response.addCookie(refreshTokenService.createRefreshCookie(refreshToken.getUser().getEmail()));

            return ResponseEntity.ok(tokenResponse);
        } catch (TokenRefreshException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
    @PostMapping("/validateAccessToken")
    public ResponseEntity<String> validateAToken(@RequestHeader("Authorization") String authHeader){
        if (authHeader == null || !authHeader.startsWith("Bearer")) {
            return new ResponseEntity<>("Invalid Header", HttpStatus.BAD_REQUEST);
        }
        String jwtToken = authHeader.substring(7);
        if(authenticationService.validateToken(jwtToken)){
            return new ResponseEntity<>("Token is Valid", HttpStatus.OK);
        }
            return new ResponseEntity<>("Token is invalid", HttpStatus.NOT_FOUND);

    }
    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response, @CookieValue(name = "refreshToken") String token) {
        System.out.println(token);
        try {
            int numDeleted = refreshTokenService.deleteByToken(token);
            //Delele Refrsh Cookie
            Cookie[] cookies = request.getCookies();

            if (cookies != null) {
                for (Cookie cookie : cookies) {
                    if ("refreshToken".equals(cookie.getName())) {
                        Cookie newCookie = new Cookie("refreshToken", "");
                        // Set the maxAge to 0 to delete the cookie
                        newCookie.setMaxAge(0);
                        // Set the same path and domain as the original cookie
                        newCookie.setPath(cookie.getPath());
                        newCookie.setDomain(cookie.getDomain());
                        // Add the new cookie to the response to delete the original cookie
                        response.addCookie(newCookie);
                    }
                }
            }
        } catch (TokenRefreshException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
        return ResponseEntity.ok("Sign Out Successfully");
    }
}
