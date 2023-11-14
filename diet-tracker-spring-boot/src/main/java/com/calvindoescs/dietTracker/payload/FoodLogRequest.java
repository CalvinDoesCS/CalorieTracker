package com.calvindoescs.dietTracker.payload;


import com.calvindoescs.dietTracker.entity.MealType;

import java.sql.Date;

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

    public int getFoodId() {
        return foodId;
    }

    public void setFoodId(int foodId) {
        this.foodId = foodId;
    }

    public Date getLogDate() {
        return logDate;
    }

    public void setLogDate(Date logDate) {
        this.logDate = logDate;
    }

    public String getMealType() {
        return mealType;
    }

    public void setMealType(String mealType) {
        this.mealType = mealType;
    }
}
