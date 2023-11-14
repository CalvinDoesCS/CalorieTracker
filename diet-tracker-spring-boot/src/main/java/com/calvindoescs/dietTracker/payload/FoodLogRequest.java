package com.calvindoescs.dietTracker.payload;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
@Getter
@Setter
public class FoodLogRequest {
    int foodId;
    private Date logDate;
    private String mealType;

    public FoodLogRequest() {
    }

    public FoodLogRequest(int foodId, Date logDate, String mealType) {
        this.foodId = foodId;
        this.logDate = logDate;
        this.mealType = mealType;
    }
}
