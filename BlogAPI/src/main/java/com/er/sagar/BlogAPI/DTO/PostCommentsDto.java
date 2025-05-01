package com.er.sagar.BlogAPI.DTO;

import org.springframework.stereotype.Component;

import com.er.sagar.BlogAPI.entities.PostComments;

@Component
public class PostCommentsDto {

    private int id;
    private String comment;
    private String commentedBy;
    private int post;
    private int user;

    public PostCommentsDto() {

    }

    public PostCommentsDto(PostComments postComments) {
        this.id = postComments.getId();
        this.comment = postComments.getComment();
        this.commentedBy = postComments.getUser().getName();
        this.user = postComments.getUser().getId();
        this.post = postComments.getPost().getId();

    }

    public int getId() {
        return id;
    }

    public void getId(int id) {
        this.id = id;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getCommentedBy() {
        return commentedBy;
    }

    public void setCommentedBy(String commentedBy) {
        this.commentedBy = commentedBy;
    }

    public int getPost() {
        return post;
    }

    public void setPostId(int post) {
        this.post = post;
    }

    public int getUser() {
        return user;
    }

    public void setUser(int user) {
        this.user = user;
    }

}
