package com.calvindoescs.dietTracker.controller;

import com.calvindoescs.dietTracker.entity.User;
import com.calvindoescs.dietTracker.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(value="/api",produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
public class DietTrackerController {
    private UserServiceImpl userServiceImpl;

    @Autowired
    public DietTrackerController(UserServiceImpl userServiceImpl) {
        this.userServiceImpl = userServiceImpl;
    }

    @GetMapping(value = "/user", consumes = MediaType.ALL_VALUE)
    public List<User> getAllUser() {
        return userServiceImpl.findAllUsers();
    }


    @GetMapping(value="/user/{id}", consumes = MediaType.ALL_VALUE)
    public User getUser(@PathVariable("id") UUID id) {
        return userServiceImpl.findUserById(id);
    }

    @PostMapping(value = "/user")
    public void newUser(@RequestBody User user) {
        userServiceImpl.createUser(user);
    }

    @PutMapping(value="/user")
    public User updateUser(@RequestBody User user){
        return userServiceImpl.updateUser(user);
    }

    @DeleteMapping(value="/user/{id}")
    public void deleteUser(@PathVariable("id") UUID id) {
        userServiceImpl.deleteUserById(id);
    }

}
