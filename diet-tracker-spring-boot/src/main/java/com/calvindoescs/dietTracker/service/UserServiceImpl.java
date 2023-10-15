package com.calvindoescs.dietTracker.service;

import com.calvindoescs.dietTracker.dao.UserDAO;
import com.calvindoescs.dietTracker.entity.Role;
import com.calvindoescs.dietTracker.entity.User;
import com.calvindoescs.dietTracker.entity.UserDetail;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
        if(user.getUserDetail() == null) {
            user.setUserDetail(new UserDetail());
        }
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        String hash_pass = bCryptPasswordEncoder.encode(user.getPassword());
        user.setPassword("{bcrypt}" + hash_pass);
        Role role = new Role("ROLE_USER");
        user.addRole(role);
        userDAO.createUser(user);


    }
    public User updateUser(User user){
        return userDAO.updateUser(user);
    }
    public void deleteUserById(UUID id){
        userDAO.deleteById(id);
    }


}
