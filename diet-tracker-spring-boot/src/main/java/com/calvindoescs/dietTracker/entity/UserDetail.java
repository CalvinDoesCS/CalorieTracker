package com.calvindoescs.dietTracker.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "user_detail")
public class UserDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_detail_id")
    private int userDetailId;
    @Column(name = "first_name")
    private String firstName;
    @Column(name = "last_name")
    private String lastName;
    @Column(name = "gender")
    private String gender;
    @Column(name = "phone_number")
    private String phoneNumber;
    @Column(name = "weight")
    private double weight;
    @Column(name = "activity_level")
    private String activityLevel;

    public UserDetail() {
        this.firstName = "";
        this.lastName = "";
        this.gender = "";
        this.phoneNumber = "";
        this.weight = -1;
        this.activityLevel = "";
    }

    public UserDetail(String firstName, String lastName, String gender, String phoneNumber, double weight, String activityLevel, String dietaryPreferences) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.phoneNumber = phoneNumber;
        this.weight = weight;
        this.activityLevel = activityLevel;
    }

    public int getUserDetailId() {
        return userDetailId;
    }

    public void setUserDetailId(int userDetailId) {
        this.userDetailId = userDetailId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
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


    @Override
    public String toString() {
        return "UserDetail{" +
                "user_detail_id=" + userDetailId +
                ", first_name='" + firstName + '\'' +
                ", last_name='" + lastName + '\'' +
                ", gender='" + gender + '\'' +
                ", phone_number='" + phoneNumber + '\'' +
                ", weight=" + weight +
                ", activityLevel='" + activityLevel + '\'' +
                '}';
    }
}
