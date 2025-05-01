package com.er.sagar.BlogAPI.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.er.sagar.BlogAPI.DTO.LoginRequest;
import com.er.sagar.BlogAPI.entities.User;
import com.er.sagar.BlogAPI.exceptions.UserNotFoundException;
import com.er.sagar.BlogAPI.repositories.UserRepo;
import com.er.sagar.BlogAPI.utils.SignatureMethod;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private SignatureMethod signatureMethod;

    private PasswordEncoder encoder = new BCryptPasswordEncoder();

    public String registerUser(User userData) {

        User userByEmail = userRepo.findUserByEmail(userData.getEmail());
        if (userByEmail != null) {
            return "User Already exist with same email Adderess!";
        } else {
            userData.setPassword(encoder.encode(userData.getPassword()));
            userRepo.save(userData);
            return " User saved successfully!";

        }
    }

    public List<User> userList() {
        return userRepo.findAll();
    }

    public User validateUserLogin(LoginRequest loginRequest) {

        User userByEmail = userRepo.findUserByEmail(loginRequest.getEmail());
        if (userByEmail == null) {
            throw new UserNotFoundException("User does not exist with this email :" + loginRequest.getEmail());
        } else {
            Boolean isPasswordMatch = encoder.matches(loginRequest.getPassword(), userByEmail.getPassword());
            if (!isPasswordMatch) {
                throw new UserNotFoundException("Please Enter correct credentials!");
            }

            String token = signatureMethod.getGeneratedToken(loginRequest.getEmail());
            userByEmail.setToken(token);
            return userRepo.save(userByEmail);
        }

    }

}
