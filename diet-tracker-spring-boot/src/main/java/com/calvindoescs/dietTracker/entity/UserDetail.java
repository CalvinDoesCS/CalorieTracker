package com.calvindoescs.dietTracker.entity;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name="user_detail")
public class UserDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_detail_id")
    private int user_detail_id;
    @Column(name="first_name")
    private String first_name;
    @Column(name="last_name")
    private String last_name;
    @Column(name="gender")
    private String gender;
    @Column(name="phone_number")
    private String phone_number;
    @Column(name="weight")
    private double weight;
    @Column(name="activity_level")
    private String activityLevel;
    @Column(name="dietary_preferences")
    private String dietaryPreferences;

    public UserDetail() {
    }

    public UserDetail(String first_name, String last_name, String gender, String phone_number, double weight, String activityLevel, String dietaryPreferences) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.gender = gender;
        this.phone_number = phone_number;
        this.weight = weight;
        this.activityLevel = activityLevel;
        this.dietaryPreferences = dietaryPreferences;
    }

    public int getUser_detail_id() {
        return user_detail_id;
    }

    public void setUser_detail_id(int user_detail_id) {
        this.user_detail_id = user_detail_id;
    }
    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getPhone_number() {
        return phone_number;
    }

    public void setPhone_number(String phone_number) {
        this.phone_number = phone_number;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public String getActivityLevel() {
        return activityLevel;
    }

    public void setActivityLevel(String activityLevel) {
        this.activityLevel = activityLevel;
    }

    public String getDietaryPreferences() {
        return dietaryPreferences;
    }

    public void setDietaryPreferences(String dietaryPreferences) {
        this.dietaryPreferences = dietaryPreferences;
    }


    @Override
    public String toString() {
        return "UserDetail{" +
                "user_detail_id=" + user_detail_id +
                ", first_name='" + first_name + '\'' +
                ", last_name='" + last_name + '\'' +
                ", gender='" + gender + '\'' +
                ", phone_number='" + phone_number + '\'' +
                ", weight=" + weight +
                ", activityLevel='" + activityLevel + '\'' +
                ", dietaryPreferences='" + dietaryPreferences + '\'' +
                '}';
    }
}
