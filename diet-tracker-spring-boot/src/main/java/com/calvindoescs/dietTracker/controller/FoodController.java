package com.calvindoescs.dietTracker.controller;

import com.calvindoescs.dietTracker.entity.Food;
import com.calvindoescs.dietTracker.payload.FoodRequest;
import com.calvindoescs.dietTracker.service.FoodService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value="/api", produces = { "application/json" })
public class FoodController {

    FoodService foodService;

    public FoodController(FoodService foodService) {
        this.foodService = foodService;
    }

    @GetMapping("/foods")
    public ResponseEntity<List<Food>> getAllFoods() {
        // Logic to fetch a list of foods, e.g., from a database
        List<Food> foods = foodService.getAllFoods();
        // Return the list of foods in the response with a 200 OK status
        return new ResponseEntity<>(foods, HttpStatus.OK);
    }

    @DeleteMapping("/foods/{id}")
    public ResponseEntity<String> deleteFoodById(@PathVariable(name="id") int id) {
        // Delete the food item by name
        try{
            foodService.deleteFood(id);
        }catch(Exception e){
            return new ResponseEntity<>("Name doesn't exist",HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>("Id Deleted: " + id, HttpStatus.OK);
    }
    @PostMapping("/foods")
    public ResponseEntity<String> addFood(@RequestBody FoodRequest foodRequest){
        Food food = new Food(foodRequest.getName(),foodRequest.getCategory(),foodRequest.getCalories(),foodRequest.getProtein(),foodRequest.getCarbohydrate(),foodRequest.getFat());
        try {
            foodService.createFood(food);
        }catch (Exception e){
            return new ResponseEntity<>("Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>("Food Created", HttpStatus.CREATED);
    }
    @PutMapping("/foods/{id}")
    public ResponseEntity<Food> updateFood(
            @PathVariable(name="id") int foodId,
            @RequestBody FoodRequest foodRequest
    ) {
        Food updateFood = new Food(foodRequest.getName(),foodRequest.getCategory(),foodRequest.getCalories(),foodRequest.getProtein(),foodRequest.getCarbohydrate(),foodRequest.getFat());
        // Set the ID of the updatedFood to match the path variable
        updateFood.setId(foodId);

        // Update the food item
        Food updatedFoodItem = foodService.updateFood(updateFood);
        return ResponseEntity.ok(updatedFoodItem);
    }
}
