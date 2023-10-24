package com.calvindoescs.dietTracker.dao;

import com.calvindoescs.dietTracker.entity.User;
import com.calvindoescs.dietTracker.entity.UserDetail;

import java.util.List;
import java.util.UUID;

public interface UserDAO {
    User findById(UUID id);
    User findByEmail(String email);
    List<User> findAll();
    void createUser(User user);
    User updateUser(User user);
    UserDetail updateUser(UserDetail user);
    void deleteById(UUID id);
}
