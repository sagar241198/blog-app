package com.er.sagar.BlogAPI.DTO;

import org.springframework.stereotype.Component;

@Component
public class CommentsRequestDto {

    private int user;
    private int post;
    private String comment;

    public CommentsRequestDto() {

    }

    public CommentsRequestDto(int user, int post, String comment) {
        this.user = user;
        this.post = post;
        this.comment = comment;
    }

    public int getUser() {
        return user;
    }

    public void setUser(int user) {
        this.user = user;
    }

    public int getPost() {
        return post;
    }

    public void setPost(int post) {
        this.post = post;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

}
