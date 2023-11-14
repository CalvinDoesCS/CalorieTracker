package com.calvindoescs.dietTracker.service;

import com.calvindoescs.dietTracker.entity.Food;
import com.calvindoescs.dietTracker.entity.FoodLog;
import com.calvindoescs.dietTracker.entity.MealType;
import com.calvindoescs.dietTracker.entity.User;
import com.calvindoescs.dietTracker.repository.FoodLogRepository;
import com.calvindoescs.dietTracker.repository.FoodRepository;
import com.calvindoescs.dietTracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.sql.Date;
import java.util.Optional;
import java.util.UUID;

@Service
public class FoodLogService {

    private final FoodLogRepository foodLogRepository;
    private final UserRepository userRepository;
    private final FoodRepository foodRepository;

    @Autowired
    public FoodLogService(
            FoodLogRepository foodLogRepository,
            UserRepository userRepository,
            FoodRepository foodRepository) {
        this.foodLogRepository = foodLogRepository;
        this.userRepository = userRepository;
        this.foodRepository = foodRepository;
    }

    @Transactional
    public FoodLog createFoodLog(UUID userId, int foodId, Date logDate, MealType mealType) {
        //Optional.ofNullable is here because userRepository was defined myself didn't make use of Optional return
        Optional<User> userOptional = Optional.ofNullable(userRepository.findById(userId));
        Optional<Food> foodOptional = foodRepository.findById(foodId);

        if (userOptional.isPresent() && foodOptional.isPresent()) {
            User user = userOptional.get();
            Food food = foodOptional.get();

            FoodLog foodLog = new FoodLog();
            foodLog.setUser(user);
            foodLog.setFood(food);
            foodLog.setLogDate(logDate);
            foodLog.setMealType(mealType);

            return foodLogRepository.save(foodLog);
        } else {
            // Handle case when user or food is not found
            return null;
        }
    }
    public List<FoodLog> getAllFoodLogs() {
        return foodLogRepository.findAll();
    }
    public List<FoodLog> findByUserAndMealType(User user, MealType mealType) {
        return foodLogRepository.findByUserAndMealType(user, mealType);
    }
}

