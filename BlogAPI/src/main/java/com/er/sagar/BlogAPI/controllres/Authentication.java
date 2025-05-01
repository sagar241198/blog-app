package com.er.sagar.BlogAPI.controllres;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.er.sagar.BlogAPI.DTO.LoginRequest;
import com.er.sagar.BlogAPI.DTO.LoginResponse;
import com.er.sagar.BlogAPI.entities.User;
import com.er.sagar.BlogAPI.exceptions.UserNotFoundException;
import com.er.sagar.BlogAPI.services.UserService;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class Authentication {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public String register(@RequestBody User user) {

        String msg = userService.registerUser(user);
        return msg;

    }

    @GetMapping("/users")
    public List<User> listAllUsers() {
        return userService.userList();
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest loginData) {

        User validatedUser = userService.validateUserLogin(loginData);
        return new LoginResponse(validatedUser);
    }

}
