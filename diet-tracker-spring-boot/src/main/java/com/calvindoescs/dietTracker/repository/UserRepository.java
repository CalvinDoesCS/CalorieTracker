package com.calvindoescs.dietTracker.repository;

import com.calvindoescs.dietTracker.entity.User;
import com.calvindoescs.dietTracker.entity.UserDetail;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Repository
public class UserDAOImpl implements UserDAO{

    EntityManager entityManager;

    @Autowired
    public UserDAOImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public User findById(UUID id) {
        return entityManager.find(User.class, id);
    }

    @Override
    public User findByEmail(String email) throws UsernameNotFoundException {
        return entityManager
                .createQuery("SELECT u FROM User u WHERE u.email =:data", User.class)
                .setParameter("data",email)
                .getSingleResult();

    }

    @Override
    public List<User> findAll() {
        TypedQuery<User> users = entityManager.createQuery("SELECT u FROM User u " +
                                                              "JOIN FETCH u.userDetail ud " +
                                                              "LEFT JOIN FETCH u.roles r",User.class);
        return users.getResultList();
    }

    @Override
    @Transactional
    public void createUser(User user) {
        entityManager.persist(user);
    }
    @Override
    @Transactional
    public User updateUser(User user) {
        return entityManager.merge(user);
    }
    @Override
    @Transactional
    public UserDetail updateUser(UserDetail user) {
        return entityManager.merge(user);
    }
    @Override
    @Transactional
    public void deleteById(UUID id){
        entityManager.remove(findById(id));
    }

}
