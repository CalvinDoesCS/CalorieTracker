package com.calvindoescs.dietTracker.service;

import com.calvindoescs.dietTracker.dao.UserDAO;
import com.calvindoescs.dietTracker.entity.User;

import java.util.List;
import java.util.UUID;

public interface UserService {
    public List<User> findAllUsers();
    public User findUserById(UUID id);
    public void createUser(User user);
    public User updateUser(User user);
    public void deleteUserById(UUID id);

}
