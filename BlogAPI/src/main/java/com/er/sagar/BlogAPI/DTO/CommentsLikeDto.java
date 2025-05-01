package com.er.sagar.BlogAPI.DTO;

import com.er.sagar.BlogAPI.entities.CommentsLike;

public class CommentsLikeDto {

    private int id;
    private int userId;
    private String likedBy;
    private int commentId;

    public CommentsLikeDto() {

    }

    public CommentsLikeDto(CommentsLike commentsLike) {
        this.id = commentsLike.getId();
        this.userId = commentsLike.getUser().getId();
        this.likedBy = commentsLike.getUser().getName();
        this.commentId = commentsLike.getPostComments().getId();
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

    public int getCommentId() {
        return commentId;
    }

    public void setCommentId(int commentId) {
        this.commentId = commentId;
    }
}
