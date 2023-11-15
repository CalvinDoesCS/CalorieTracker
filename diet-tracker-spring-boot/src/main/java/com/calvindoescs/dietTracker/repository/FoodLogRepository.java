package com.calvindoescs.dietTracker.repository;

import com.calvindoescs.dietTracker.entity.FoodLog;
import com.calvindoescs.dietTracker.entity.MealType;
import com.calvindoescs.dietTracker.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Date;
import java.util.List;
import java.util.UUID;

    public interface FoodLogRepository extends JpaRepository<FoodLog, Integer> {
        List<FoodLog> findByUserAndMealTypeAndLogDate(User user, MealType mealType, Date logDate);
    }
