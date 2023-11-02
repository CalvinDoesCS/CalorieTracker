package com.calvindoescs.dietTracker.service;

import com.calvindoescs.dietTracker.entity.Food;
import com.calvindoescs.dietTracker.repository.FoodRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodService {
    private final FoodRepository foodRepository;

    public FoodService(FoodRepository foodRepository) {
        this.foodRepository = foodRepository;
    }

    public Food createFood(Food food) {
        return foodRepository.save(food);
    }

    public Food getFoodById(int id) {
        return foodRepository.findById(id).orElse(null);
    }

    public List<Food> getAllFoods() {
        return foodRepository.findAll();
    }

    public Food updateFood(Food food) {
        return foodRepository.save(food);
    }

    public void deleteFood(int id) {
        foodRepository.deleteById(id);
    }
}
