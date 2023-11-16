package com.calvindoescs.dietTracker.controller;

import com.calvindoescs.dietTracker.entity.FoodLog;
import com.calvindoescs.dietTracker.entity.MealType;
import com.calvindoescs.dietTracker.entity.User;
import com.calvindoescs.dietTracker.payload.FoodLogRequest;
import com.calvindoescs.dietTracker.payload.FoodLogResponse;
import com.calvindoescs.dietTracker.service.FoodLogService;
import com.calvindoescs.dietTracker.service.JwtService;
import com.calvindoescs.dietTracker.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping(value="/api", produces = { "application/json" })
public class FoodLogController {
    private FoodLogService foodLogService;
    private JwtService jwtService;
    private UserService userService;
    @Autowired
    public FoodLogController(FoodLogService foodLogService, JwtService jwtService, UserService userService) {
        this.foodLogService = foodLogService;
        this.jwtService = jwtService;
        this.userService = userService;
    }
    @PostMapping("/foodlogs")
    public ResponseEntity<?> createFoodLog(@RequestBody FoodLogRequest foodLogRequest, @RequestHeader("Authorization") String authHeader){
        if (authHeader == null || !authHeader.startsWith("Bearer")) {
            return new ResponseEntity<>("Invalid Header", HttpStatus.BAD_REQUEST);
        }
        String jwtToken = authHeader.substring(7);
        try{
            String email = jwtService.extractUsername(jwtToken);
            User user = userService.findUserByEmail(email);
            foodLogService.createFoodLog(user.getUserId(),foodLogRequest.getFood().getId(), Date.valueOf(foodLogRequest.getLogDate()),  MealType.fromString(foodLogRequest.getMealType()));
        }catch(Exception e){
            return new ResponseEntity<>("Token is invalid or cannot find user", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>("Created Food Log", HttpStatus.OK);
    }
    @GetMapping("/foodlogs")
    public ResponseEntity<?> getFoodLog(@RequestParam(required = false, name="mealType") String meal_type,@RequestParam(required = false, name="logDate") String log_date, @RequestHeader("Authorization") String authHeader){
        if (authHeader == null || !authHeader.startsWith("Bearer")) {
            return new ResponseEntity<>("Invalid Header", HttpStatus.BAD_REQUEST);
        }
        String jwtToken = authHeader.substring(7);
        try{
            String email = jwtService.extractUsername(jwtToken);
            User user = userService.findUserByEmail(email);
            List<FoodLog> foodLogList = foodLogService.findByUserAndMealTypeAndLogDate(user,MealType.fromString(meal_type),Date.valueOf(log_date));
            List<FoodLogResponse> foodLogResponseList = new ArrayList<FoodLogResponse>();
            for(FoodLog foodLog : foodLogList){
                foodLogResponseList.add(new FoodLogResponse(foodLog.getId(), foodLog.getFood(), foodLog.getLogDate().toString(), foodLog.getMealType()));
            }
            return new ResponseEntity<>(foodLogResponseList, HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>("Token is invalid or cannot find user", HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping("/foodlogs/{id}")
    public ResponseEntity<String> deleteFoodById(@PathVariable(name="id") int id) {
        // Delete the food item by name
        try{
            foodLogService.deleteFood(id);
        }catch(Exception e){
            return new ResponseEntity<>("Id doesn't exist",HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>("Id Deleted: " + id, HttpStatus.OK);
    }
}
