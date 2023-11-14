package com.calvindoescs.dietTracker.entity;


import lombok.Getter;

@Getter
public enum MealType {
    BREAKFAST("Breakfast"),
    LUNCH("Lunch"),
    DINNER("Dinner");

    private final String displayName;

    MealType(String displayName) {
        this.displayName = displayName;
    }

    public static MealType fromString(String value) {
        for (MealType mealType : MealType.values()) {
            if (mealType.displayName.equalsIgnoreCase(value)) {
                return mealType;
            }
        }
        throw new IllegalArgumentException("No constant with value " + value + " found in enum MealType");
    }
}

