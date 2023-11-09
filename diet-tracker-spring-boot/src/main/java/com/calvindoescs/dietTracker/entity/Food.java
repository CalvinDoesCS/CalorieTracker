package com.calvindoescs.dietTracker.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
@Entity
@Data
@NoArgsConstructor
@Table(name="food")
public class Food {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;
    @Column(name="name")
    private String name;
    @Column(name="category")
    private String category;
    @Column(name="calories")
    private double calories;
    @Column(name="protein")
    private double protein;
    @Column(name="carbohydrate")
    private double carbohydrate ;
    @Column(name="fat")
    private double fat;

    @OneToMany(mappedBy="food")
    private List<FoodLog> foodLogs;

    public Food(String name, String category, double calories, double protein, double carbohydrate, double fat) {
        this.name = name;
        this.category = category;
        this.calories = calories;
        this.protein = protein;
        this.carbohydrate = carbohydrate;
        this.fat = fat;
    }

    public void addFoodLog(FoodLog foodLog){
        if (foodLogs == null) {
            foodLogs = new ArrayList<>();
        }
        foodLog.setFood(this);
        foodLogs.add(foodLog);
    }
}
