package com.calvindoescs.dietTracker.payload;

import com.calvindoescs.dietTracker.entity.Food;
import com.calvindoescs.dietTracker.entity.MealType;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Date;


@Data
@AllArgsConstructor
public class FoodLogResponse {

    private int id;
    private Food food;
    private String logDate;
    private MealType mealType;


    private String formatToString(Date logDate){
        System.out.println(logDate.toString());
        return logDate.toString();
    }
    @Override
    public String toString() {
        return "FoodLogResponse{" +
                "id=" + id +
                ", food=" + food +
                ", logDate='" + logDate + '\'' +
                ", mealType='" + mealType.getDisplayName() + '\'' +
                '}';
    }
}
