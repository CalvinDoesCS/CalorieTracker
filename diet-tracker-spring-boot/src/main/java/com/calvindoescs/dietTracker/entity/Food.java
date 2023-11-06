package com.calvindoescs.dietTracker.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Table(name="food")
public class Food {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @Column(name="name")
    @NonNull
    private String name;
    @Column(name="category")
    @NonNull
    private String category;
    @Column(name="calories")
    @NonNull
    private double calories;
    @Column(name="protein")
    @NonNull
    private double protein;
    @Column(name="carbohydrate")
    @NonNull
    private double carbohydrate ;
    @Column(name="fat")
    @NonNull
    private double fat;

}
