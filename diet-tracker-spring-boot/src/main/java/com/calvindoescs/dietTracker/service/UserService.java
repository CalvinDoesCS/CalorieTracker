package com.calvindoescs.dietTracker.service;

import com.calvindoescs.dietTracker.entity.User;

import java.util.List;
import java.util.UUID;

public interface UserService {
    List<User> findAllUsers();

    User findUserById(UUID id);

    User findUserByEmail(String email);

    void createUser(User user);

    User updateUser(User user);

    void deleteUserById(UUID id);
}
