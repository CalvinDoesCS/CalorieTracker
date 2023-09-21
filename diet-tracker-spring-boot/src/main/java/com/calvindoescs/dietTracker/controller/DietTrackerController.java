package com.calvindoescs.dietTracker.controller;

import com.calvindoescs.dietTracker.dao.UserDAO;
import com.calvindoescs.dietTracker.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController
public class DietTrackerController {
    private UserDAO userDAO;

    @Autowired
    public DietTrackerController(UserDAO userDAO) {
        this.userDAO = userDAO;
    }
    @GetMapping("/api")
    public @ResponseBody String hello(){
        return "Hello World";
    }
    @GetMapping("/getAll")
    public List<User> getAll(){
        return userDAO.getAllUsers();
    }
}
