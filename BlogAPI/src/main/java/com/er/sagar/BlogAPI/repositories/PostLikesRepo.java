package com.er.sagar.BlogAPI.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.er.sagar.BlogAPI.entities.PostLike;

@Repository
public interface PostLikesRepo extends JpaRepository<PostLike, Integer> {

}
