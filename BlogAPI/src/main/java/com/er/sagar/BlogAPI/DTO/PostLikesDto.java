package com.er.sagar.BlogAPI.DTO;

import org.springframework.stereotype.Component;

import com.er.sagar.BlogAPI.entities.PostLike;

@Component
public class PostLikesDto {

    private int id;
    private int userId;
    private String likedBy;
    private int postId;

    public PostLikesDto() {

    }

    public PostLikesDto(PostLike postLike) {
        this.id = postLike.getId();
        this.likedBy = postLike.getUser().getName();
        this.postId = postLike.getPost().getId();
        this.userId = postLike.getUser().getId();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getLikedBy() {
        return likedBy;
    }

    public void setLikedBy(String likedBy) {
        this.likedBy = likedBy;
    }

    public int getPostId() {
        return postId;
    }

    public void setPostId(int postId) {
        this.postId = postId;
    }

}
