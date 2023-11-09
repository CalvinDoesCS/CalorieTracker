package com.calvindoescs.dietTracker.payload;


import com.calvindoescs.dietTracker.entity.MealType;

import java.sql.Date;

public class FoodLogRequest {
    int foodId;
    private Date logDate;
    private MealType mealType;

    public FoodLogRequest() {
    }

    public FoodLogRequest(int foodId, Date logDate, MealType mealType) {
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

    public MealType getMealType() {
        return mealType;
    }

    public void setMealType(MealType mealType) {
        this.mealType = mealType;
    }
}
