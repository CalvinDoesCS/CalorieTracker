package com.calvindoescs.dietTracker.repository;

import com.calvindoescs.dietTracker.entity.RefreshToken;
import com.calvindoescs.dietTracker.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Integer> {
    Optional<RefreshToken> findByToken(String token);

    @Modifying
    int deleteByUser(User user);

    @Modifying
    @Query("DELETE FROM RefreshToken r WHERE r.token = :token")
    int deleteByToken(@Param("token") String token);
}
