package com.calvindoescs.dietTracker.dao;

import com.calvindoescs.dietTracker.entity.User;
import com.calvindoescs.dietTracker.entity.UserDetail;

import java.util.List;
import java.util.UUID;

public interface UserDAO {
    User findById(UUID id);
    List<User> findAll();
    User save(User user);
    UserDetail save(UserDetail user);
    void deleteById(UUID id);
}
