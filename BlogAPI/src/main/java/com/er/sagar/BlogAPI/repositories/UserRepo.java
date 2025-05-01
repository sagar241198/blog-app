package com.er.sagar.BlogAPI.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.er.sagar.BlogAPI.entities.User;

@Repository
public interface UserRepo extends JpaRepository<User, Integer> {

    User findUserByEmail(String email);

}
