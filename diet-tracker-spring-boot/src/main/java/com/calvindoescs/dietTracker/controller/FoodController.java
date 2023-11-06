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
    @DeleteMapping("/foods/{name}")
    public ResponseEntity<String> deleteFoodByName(@PathVariable String name) {
        int deletedId = -1;
        // Delete the food item by name
        try{
            deletedId = foodService.deleteFoodByName(name);
        }catch(Exception e){
            return new ResponseEntity<>("Name doesn't exist",HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>("Id Deleted: " + deletedId, HttpStatus.OK);
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
}