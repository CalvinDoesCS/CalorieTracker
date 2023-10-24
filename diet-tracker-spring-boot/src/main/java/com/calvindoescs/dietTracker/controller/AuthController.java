package com.calvindoescs.dietTracker.controller;

import com.calvindoescs.dietTracker.entity.RefreshToken;
import com.calvindoescs.dietTracker.payload.AuthenticationRequest;
import com.calvindoescs.dietTracker.payload.AuthenticationResponse;
import com.calvindoescs.dietTracker.payload.TokenRefreshRequest;
import com.calvindoescs.dietTracker.service.RefreshTokenService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthenticationService authenticationService;

    @Autowired
    public AuthController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request){
        return ResponseEntity.ok(authenticationService.register(request));
    }
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> signin (HttpServletResponse response, @RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(authenticationService.authenticate(response,request));
     }
    @PostMapping("/refreshtoken")
    public ResponseEntity<?> refreshtoken(HttpServletRequest request, @RequestHeader("acesss_token") TokenRefreshRequest authorizationHeader) {
        return ResponseEntity.ok(request.getCookies());
    }
    @PostMapping("/signout")
    public String signout(){

        return "Successfully Logged out";
    }
}
