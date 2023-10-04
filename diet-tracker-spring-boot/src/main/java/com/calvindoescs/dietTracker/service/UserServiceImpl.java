package com.calvindoescs.dietTracker.service;

import com.calvindoescs.dietTracker.dao.UserDAO;
import com.calvindoescs.dietTracker.entity.User;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService{
    private UserDAO userDAO;

    public UserServiceImpl(UserDAO userDAO) {
        this.userDAO = userDAO;
    }
    public List<User> findAllUsers(){
        return userDAO.findAll();
    }
    public User findUserById(UUID id){
        return userDAO.findById(id);
    }
    public void createUser(User user){
        userDAO.createUser(user);
    }
    public User updateUser(User user){
        return userDAO.updateUser(user);
    }
    public void deleteUserById(UUID id){
        userDAO.deleteById(id);
    }


}
