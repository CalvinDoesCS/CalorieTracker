package com.calvindoescs.dietTracker.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    @Column(name="carbohydrates")
    private double carbohydrates;
    @Column(name="fat")
    private double fat;

}
