package com.calvindoescs.dietTracker.payload;

import com.calvindoescs.dietTracker.entity.Food;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
@Getter
@Setter
public class FoodLogRequest {
    private Food food;
    private String logDate;
    private String mealType;

    public FoodLogRequest() {
    }

    public FoodLogRequest(Food food, String logDate, String mealType) {
        this.food = food;
        this.logDate = logDate;
        this.mealType = mealType;
    }
}
