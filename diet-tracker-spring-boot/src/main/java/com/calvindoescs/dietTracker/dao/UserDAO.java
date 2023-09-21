package com.calvindoescs.dietTracker.dao;

import com.calvindoescs.dietTracker.entity.User;
import java.util.List;
public interface UserDAO {
    User getUserById(int id);
    List<User> getAllUsers();
}
