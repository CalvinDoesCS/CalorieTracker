package com.calvindoescs.dietTracker.service;

import com.calvindoescs.dietTracker.entity.User;
import com.calvindoescs.dietTracker.repository.UserDAO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {
    private final UserDAO userDAO;

    public UserServiceImpl(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    public List<User> findAllUsers() {
        return userDAO.findAll();
    }

    public User findUserById(UUID id) {
        return userDAO.findById(id);
    }


    public User findUserByEmail(String email) {
        return userDAO.findByEmail(email);

    }

    public void createUser(User user) {
        userDAO.createUser(user);
    }

    public User updateUser(User user) {
        return userDAO.updateUser(user);
    }

    public void deleteUserById(UUID id) {
        userDAO.deleteById(id);
    }


}
