package com.calvindoescs.dietTracker.payload;

import jakarta.persistence.Column;

public class FoodRequest {
    private String name;
    private String category;
    private double calories;
    private double protein;
    private double carbohydrate ;
    private double fat;

    public FoodRequest() {
    }

    public FoodRequest(String name, String category, double calories, double protein, double carbohydrate, double fat) {
        this.name = name;
        this.category = category;
        this.calories = calories;
        this.protein = protein;
        this.carbohydrate = carbohydrate;
        this.fat = fat;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public double getCalories() {
        return calories;
    }

    public void setCalories(double calories) {
        this.calories = calories;
    }

    public double getProtein() {
        return protein;
    }

    public void setProtein(double protein) {
        this.protein = protein;
    }

    public double getCarbohydrate() {
        return carbohydrate;
    }

    public void setCarbohydrate(double carbohydrate) {
        this.carbohydrate = carbohydrate;
    }

    public double getFat() {
        return fat;
    }

    public void setFat(double fat) {
        this.fat = fat;
    }

    @Override
    public String toString() {
        return "FoodRequest{" +
                "name='" + name + '\'' +
                ", category='" + category + '\'' +
                ", calories=" + calories +
                ", protein=" + protein +
                ", carbohydrate=" + carbohydrate +
                ", fat=" + fat +
                '}';
    }
}
