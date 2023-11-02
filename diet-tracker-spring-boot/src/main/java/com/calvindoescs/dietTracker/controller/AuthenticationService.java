package com.calvindoescs.dietTracker.controller;

import com.calvindoescs.dietTracker.entity.Role;
import com.calvindoescs.dietTracker.entity.User;
import com.calvindoescs.dietTracker.entity.UserDetail;
import com.calvindoescs.dietTracker.payload.AuthenticationRequest;
import com.calvindoescs.dietTracker.payload.AuthenticationResponse;
import com.calvindoescs.dietTracker.payload.RegisterRequest;
import com.calvindoescs.dietTracker.repository.UserRepository;
import com.calvindoescs.dietTracker.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Autowired
    public AuthenticationService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    public AuthenticationResponse register(RegisterRequest request) {
        User user = new User(request.getEmail(), passwordEncoder.encode(request.getPassword()));
        user.addRole(new Role("ROLE_USER"));
        if (user.getUserDetail() == null) {
            user.setUserDetail(new UserDetail());
        }
        userRepository.createUser(user);
        var jwtToken = jwtService.generateToken(user);

        return new AuthenticationResponse(jwtToken, user.getEmail(), jwtService.getExpirationInSeconds());
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new AuthenticationResponse(null,"",0);
        }
        var user = userRepository.findByEmail(request.getEmail());

        var jwtToken = jwtService.generateToken(user);

        return new AuthenticationResponse(jwtToken, user.getEmail(), jwtService.getExpirationInSeconds());
    }
}
