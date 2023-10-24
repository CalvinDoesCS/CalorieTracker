package com.calvindoescs.dietTracker.controller;

import com.calvindoescs.dietTracker.entity.RefreshToken;
import com.calvindoescs.dietTracker.payload.AuthenticationRequest;
import com.calvindoescs.dietTracker.payload.AuthenticationResponse;
import com.calvindoescs.dietTracker.repository.UserDAO;
import com.calvindoescs.dietTracker.entity.Role;
import com.calvindoescs.dietTracker.entity.UserDetail;
import com.calvindoescs.dietTracker.security.JwtService;
import com.calvindoescs.dietTracker.entity.User;
import com.calvindoescs.dietTracker.service.RefreshTokenService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class AuthenticationService {

    private final UserDAO userDAO;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;

    @Autowired
    public AuthenticationService(UserDAO userDAO, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtService jwtService, RefreshTokenService refreshTokenService) {
        this.userDAO = userDAO;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.refreshTokenService = refreshTokenService;
    }

    public AuthenticationResponse register(RegisterRequest request){
        User user = new User(request.getEmail(), passwordEncoder.encode(request.getPassword()));
        user.addRole(new Role("ROLE_USER"));
        if(user.getUserDetail() == null) {
            user.setUserDetail(new UserDetail());
        }
        userDAO.createUser(user);
        var jwtToken = jwtService.generateToken(user);

        return new AuthenticationResponse(jwtToken,user.getEmail());
    }

    public AuthenticationResponse authenticate(HttpServletResponse response, AuthenticationRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(),request.getPassword()));

        var user = userDAO.findByEmail(request.getEmail());
        var jwtToken = jwtService.generateToken(user);

        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user.getUserId());
        ResponseCookie cookieResponse = refreshTokenService.generateRefreshCookie(refreshToken.getToken());
        Cookie cookie = new Cookie(cookieResponse.getName(), cookieResponse.getValue());
        cookie.setHttpOnly(cookieResponse.isHttpOnly());
        cookie.setMaxAge((int) cookieResponse.getMaxAge().getSeconds());
        cookie.setPath(cookieResponse.getPath());
        cookie.setSecure(cookieResponse.isSecure());
        response.addCookie(cookie);

        return new AuthenticationResponse(jwtToken,user.getEmail());
    }
    public String signout(){
        authenticationManager.
    }
}
