package com.er.sagar.BlogAPI.DTO;

import org.springframework.stereotype.Component;

import com.er.sagar.BlogAPI.entities.Post;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;

@Component
public class PostResponseDto {

    private int id;
    private String image;
    private String title;
    private String description;
    private int userId;
    private String postedBy;

    public PostResponseDto() {
    }

    public PostResponseDto(Post post) {
        this.id = post.getId();
        this.title = post.getTitle();
        this.description = post.getDescription();
        this.image = post.getImage();
        this.userId = post.getUser().getId();
        this.postedBy = post.getUser().getName();

    }

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getPostedBy() {
        return postedBy;
    }

    public void setUser(String postedBy) {
        this.postedBy = postedBy;
    }
}
