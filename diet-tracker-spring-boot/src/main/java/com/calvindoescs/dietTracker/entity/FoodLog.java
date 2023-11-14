package com.calvindoescs.dietTracker.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.ArrayList;
import java.sql.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@Table(name="food_log")
public class FoodLog {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "food_id")
    private Food food;


    @Temporal(TemporalType.DATE)
    @Column(name="log_date")
    private Date logDate;

    @Enumerated(EnumType.STRING)
    @Column(name="meal_type")
    private MealType mealType;

    public FoodLog(Date logDate, MealType mealType) {
        this.logDate = logDate;
        this.mealType = mealType;
    }

    @Override
    public String toString() {
        return "FoodLog{" +
                "id=" + id +
                ", user=" + user +
                ", food=" + food +
                ", logDate=" + logDate +
                ", mealType=" + mealType.getDisplayName() +
                '}';
    }
}
