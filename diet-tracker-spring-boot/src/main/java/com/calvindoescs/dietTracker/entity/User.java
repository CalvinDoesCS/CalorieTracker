package com.calvindoescs.dietTracker.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.sql.Timestamp;
import java.util.UUID;
import java.util.stream.Collectors;

@Entity
@Table(name="user")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "user_id")
    private UUID userId;
    @Column(name = "password")
    private String password;
    @Column(name = "email")
    private String email;

    @Column(name = "enabled")
    private short enabled = 1;

    @CreationTimestamp
    @Column(name = "registration_date")
    private Timestamp regDate;

    @OneToOne(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    @JoinColumn(name="user_detail_id")
    private UserDetail userDetail;

    @ManyToMany(fetch=FetchType.EAGER, cascade=CascadeType.ALL)
    @JoinTable(name = "user_role" ,joinColumns =
    @JoinColumn ( name = " user_id" ), inverseJoinColumns =
    @JoinColumn(name = "role_id"))
    @JsonManagedReference
    private List <Role> roles;

    @OneToMany(mappedBy = "user")
    private List<RefreshToken> refreshTokens;
    public User() {
    }

    public User(String email, String password) {
        this.password = password;
        this.email = email;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    @Override
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority(role.getRole())) // Assuming Role implements GrantedAuthority
                .collect(Collectors.toList());

    }
    @Override
    @JsonIgnore
    public String getPassword() {
        return password;
    }

    @Override
    @JsonIgnore
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
            return enabled == 1;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public short getEnabled() {
        return enabled;
    }

    public void setEnabled(short enabled) {
        this.enabled = enabled;
    }

    public Timestamp getRegDate() {
        return regDate;
    }

    public void setRegDate(Timestamp regDate) {
        this.regDate = regDate;
    }

    public UserDetail getUserDetail() {
        return userDetail;
    }

    public void setUserDetail(UserDetail userDetail) {
        this.userDetail = userDetail;
    }
    public void addRole(Role role){
        if(roles == null){
            roles = new ArrayList<>();
        }
        role.addUser(this);
        roles.add(role);
    }
    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }

    public void addRefreshToken(RefreshToken refreshToken){
        if(refreshTokens == null){
            refreshTokens = new ArrayList<>();
            refreshTokens.add(refreshToken);
        }
    }

    public List<RefreshToken> getRefreshTokens() {
        return refreshTokens;
    }

    public void setRefreshTokens(List<RefreshToken> refreshTokens) {
        this.refreshTokens = refreshTokens;
    }

    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", enabled=" + enabled +
                ", regDate=" + regDate +
                ", userDetail=" + userDetail +
                ", roles=" + roles +
                '}';
    }
}
