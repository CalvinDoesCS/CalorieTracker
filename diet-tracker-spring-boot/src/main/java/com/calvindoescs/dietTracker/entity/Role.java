package com.calvindoescs.dietTracker.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name="roles")
public class Roles {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="role_id")
    private int roleId;

    @Column(name="email")
    private String email;

    @Column(name="role")
    private String role;

    @ManyToMany(mappedBy = "roles")
    private List<User> users;

    public Roles(String email, String role) {
        this.email = email;
        this.role = role;
    }

    public int getRoleId() {
        return roleId;
    }

    public void setRoleId(int roleId) {
        this.roleId = roleId;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    @Override
    public String toString() {
        return "Roles{" +
                "roleId=" + roleId +
                ", email='" + email + '\'' +
                ", role='" + role + '\'' +
                ", users=" + users +
                '}';
    }
}

