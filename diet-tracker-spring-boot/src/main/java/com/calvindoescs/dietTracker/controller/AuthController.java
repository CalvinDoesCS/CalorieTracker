package com.calvindoescs.dietTracker.controller;

import com.calvindoescs.dietTracker.entity.User;
import com.calvindoescs.dietTracker.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private UserServiceImpl userService;

    @Autowired
    public AuthController(UserServiceImpl userServiceImpl) {
        this.userService = userServiceImpl;
    }

    @PostMapping("/signin")
    public String signin(){
        return "Sucessfully SignUp";
    }
    @PostMapping("/signup")
    public String signup(@RequestBody User user){
        System.out.println("Creating User");
        System.out.println(user);
        userService.createUser(user);
        return "Sucessfully SignUp";
    }
}
