package com.calvindoescs.dietTracker.service;

import com.calvindoescs.dietTracker.entity.RefreshToken;
import com.calvindoescs.dietTracker.exception.TokenRefreshException;
import com.calvindoescs.dietTracker.repository.RefreshTokenRepository;
import com.calvindoescs.dietTracker.repository.UserRepository;
import com.calvindoescs.dietTracker.security.JwtService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.util.WebUtils;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
public class RefreshTokenService {
    @Value("${myapp.refresh_token.expiration.seconds}")
    private Long refreshTokenDurationInSeconds;

    private RefreshTokenRepository refreshTokenRepository;
    private UserRepository userRepository;
    private final JwtService jwtService;

    public RefreshTokenService(RefreshTokenRepository refreshTokenRepository, UserRepository userRepository, JwtService jwtService) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    public RefreshToken createRefreshToken(UUID userId) {
        RefreshToken refreshToken = new RefreshToken();

        refreshToken.setUser(userRepository.findById(userId));
        refreshToken.setExpiryDate(Instant.now().plusMillis(refreshTokenDurationInSeconds));
        refreshToken.setToken(UUID.randomUUID().toString());

        refreshToken = refreshTokenRepository.save(refreshToken);
        return refreshToken;
    }
    public RefreshToken createRefreshToken(String email) {
        RefreshToken refreshToken = new RefreshToken();

        refreshToken.setUser(userRepository.findByEmail(email));
        refreshToken.setExpiryDate(Instant.now().plusSeconds(refreshTokenDurationInSeconds));
        refreshToken.setToken(UUID.randomUUID().toString());

        refreshToken = refreshTokenRepository.save(refreshToken);
        return refreshToken;
    }

    public RefreshToken verifyExpiration(RefreshToken token) {
        if (token.getExpiryDate().compareTo(Instant.now()) < 0) {
            refreshTokenRepository.delete(token);
            throw new TokenRefreshException(token.getToken(), "Refresh token was expired. Please make a new signin request");
        }

        return token;
    }

    @Transactional
    public int deleteByUserId(UUID userId) {
        return refreshTokenRepository.deleteByUser(userRepository.findById(userId));
    }
    @Transactional
    public int deleteByToken(String token) {
        return refreshTokenRepository.deleteByToken(token);
    }

    public Cookie createRefreshCookie(String email){

        //Create the RefreshToken UUID
        RefreshToken refreshToken = createRefreshToken(email);
        ResponseCookie responseCookie = generateRefreshCookie(refreshToken.getToken());

        //Create the Cookie
        Cookie cookie = new Cookie(responseCookie.getName(), responseCookie.getValue());
        cookie.setSecure(responseCookie.isSecure());
        cookie.setPath(responseCookie.getPath());
        cookie.setHttpOnly(responseCookie.isHttpOnly());
        cookie.setDomain(responseCookie.getDomain());
        cookie.setMaxAge((int) responseCookie.getMaxAge().getSeconds());

        //Return a cookie
        return cookie;
    }
    public ResponseCookie generateRefreshCookie(String refreshToken) {
        return generateCookie("refreshToken", refreshToken, "/api/auth");
    }
    private ResponseCookie generateCookie(String name, String value, String path) {
        return ResponseCookie.from(name, value).path(path).maxAge(refreshTokenDurationInSeconds).httpOnly(true).secure(true).build();
    }
    private String getCookieValueByName(HttpServletRequest request, String name) {
        Cookie cookie = WebUtils.getCookie(request, name);
        if (cookie != null) {
            return cookie.getValue();
        } else {
            return null;
        }
    }
    public String generateAccessToken(RefreshToken refreshToken){
        return jwtService.generateToken(refreshToken.getUser());
    }

}
