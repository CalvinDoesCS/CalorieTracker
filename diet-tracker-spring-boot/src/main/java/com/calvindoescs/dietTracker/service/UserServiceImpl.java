package com.calvindoescs.dietTracker.service;

import com.calvindoescs.dietTracker.entity.Role;
import com.calvindoescs.dietTracker.entity.User;
import com.calvindoescs.dietTracker.entity.UserDetail;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
@Service
public class UserDAOImpl implements UserDAO {
    private com.calvindoescs.dietTracker.dao.UserDAO userDAO;

    public UserDAOImpl(com.calvindoescs.dietTracker.dao.UserDAO userDAO) {
        this.userDAO = userDAO;
    }
    public List<User> findAllUsers(){
        return userDAO.findAll();
    }
    public User findUserById(UUID id){
        return userDAO.findById(id);
    }
    public User findUserByEmail(String email) {
        return userDAO.findByEmail(email);
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
