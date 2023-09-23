package com.calvindoescs.dietTracker.controller;

import com.calvindoescs.dietTracker.dao.UserDAO;
import com.calvindoescs.dietTracker.entity.User;
import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
public class DietTrackerController {
    private UserDAO userDAO;

    @Autowired
    public DietTrackerController(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    @GetMapping("/user")
    public List<User> getAllUser() {
        return userDAO.findAll();
    }

    @GetMapping("/user/{id}")
    public User getUser(@PathVariable("id") UUID id) {
        return userDAO.findById(id);
    }

    @PostMapping(value = "/user",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public void newUser(@RequestBody User user) {
        userDAO.save(user);
    }

    @DeleteMapping("/user/{id}")
    public void deleteUser(@PathVariable("id") UUID id) {
        userDAO.deleteById(id);
    }

}
