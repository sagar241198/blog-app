package com.er.sagar.BlogAPI.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.er.sagar.BlogAPI.entities.Post;
import com.er.sagar.BlogAPI.entities.User;

@Repository
public interface PostRepo extends JpaRepository<Post, Integer> {

    List<Post> findByUser(User user);
}
