package com.calvindoescs.dietTracker.controller;

import com.calvindoescs.dietTracker.entity.MealType;
import com.calvindoescs.dietTracker.entity.User;
import com.calvindoescs.dietTracker.payload.FoodLogRequest;
import com.calvindoescs.dietTracker.service.FoodLogService;
import com.calvindoescs.dietTracker.service.JwtService;
import com.calvindoescs.dietTracker.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    @PostMapping("/foodlog")
    public ResponseEntity<?> createFoodLog(@RequestBody FoodLogRequest foodLogRequest, @RequestHeader("Authorization") String authHeader){

        if (authHeader == null || !authHeader.startsWith("Bearer")) {
            return new ResponseEntity<>("Invalid Header", HttpStatus.BAD_REQUEST);
        }
        String jwtToken = authHeader.substring(7);
        try{
            String email = jwtService.extractUsername(jwtToken);
            User user = userService.findUserByEmail(email);
            foodLogService.createFoodLog(user.getUserId(),foodLogRequest.getFoodId(), foodLogRequest.getLogDate(),  MealType.fromString(foodLogRequest.getMealType()));
        }catch(Exception e){
            return new ResponseEntity<>("Token is invalid or cannot find user", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>("Created Food Log", HttpStatus.OK);
    }
    @GetMapping("/foodlog")
    public ResponseEntity<?> getFoodLog(@RequestParam(required = false) String meal_type, @RequestHeader("Authorization") String authHeader){
//        if (authHeader == null || !authHeader.startsWith("Bearer")) {
//            return new ResponseEntity<>("Invalid Header", HttpStatus.BAD_REQUEST);
//        }
//        String jwtToken = authHeader.substring(7);
//        try{
//            String email = jwtService.extractUsername(jwtToken);
//            User user = userService.findUserByEmail(email);
//            System.out.println("Meal Type" + foodLogRequest.getMealType());
//            foodLogService.createFoodLog(user.getUserId(),foodLogRequest.getFoodId(), foodLogRequest.getLogDate(), foodLogRequest.getMealType());
//        }catch(Exception e){
//            return new ResponseEntity<>("Token is invalid or cannot find user", HttpStatus.NOT_FOUND);
//        }
        return new ResponseEntity<>("Something",HttpStatus.OK);
    }
}
