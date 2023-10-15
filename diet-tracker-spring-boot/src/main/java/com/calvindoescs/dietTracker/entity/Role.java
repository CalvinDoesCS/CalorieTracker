package com.calvindoescs.dietTracker.entity;

import jakarta.persistence.*;

@Entity
@Table(name="role")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="role_id")
    private int roleId;

    @Column(name="role")
    private String role;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="email", referencedColumnName = "email")
    private User user;

    public Role() {
    }

    public Role(String role) {
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "Roles{" +
                "roleId=" + roleId +
                ", role='" + role + '\'' +
                ", users=" + user +
                '}';
    }
}

