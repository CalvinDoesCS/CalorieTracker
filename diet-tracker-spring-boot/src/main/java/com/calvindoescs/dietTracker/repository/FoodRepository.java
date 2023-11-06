package com.calvindoescs.dietTracker.repository;

import com.calvindoescs.dietTracker.entity.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FoodRepository extends JpaRepository<Food, Integer> {
    Optional<Food> findByName(String name);
    @Modifying
    int deleteByName(String name);
}