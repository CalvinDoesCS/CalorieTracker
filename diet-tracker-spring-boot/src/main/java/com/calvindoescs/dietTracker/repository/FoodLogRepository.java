package com.calvindoescs.dietTracker.repository;

import com.calvindoescs.dietTracker.entity.FoodLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodLogRepository extends JpaRepository<FoodLog, Integer> {
}
