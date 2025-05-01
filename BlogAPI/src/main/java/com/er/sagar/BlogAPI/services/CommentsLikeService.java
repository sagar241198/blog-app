package com.er.sagar.BlogAPI.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.er.sagar.BlogAPI.DTO.CommentsLikeDto;
import com.er.sagar.BlogAPI.DTO.PostCommentsDto;
import com.er.sagar.BlogAPI.entities.CommentsLike;
import com.er.sagar.BlogAPI.entities.PostComments;
import com.er.sagar.BlogAPI.entities.User;
import com.er.sagar.BlogAPI.repositories.CommentsLikeRepo;
import com.er.sagar.BlogAPI.repositories.PostCommentRepo;
import com.er.sagar.BlogAPI.repositories.UserRepo;

@Service
public class CommentsLikeService {

    @Autowired
    private CommentsLikeRepo commentsLikeRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PostCommentRepo postCommentRepo;

    public CommentsLikeDto addLikes(CommentsLikeDto listInfo) {

        User user = userRepo.findById(listInfo.getUserId()).orElse(null);
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        PostComments postComments = postCommentRepo.findById(listInfo.getCommentId()).orElse(null);

        CommentsLike commentsLike = new CommentsLike(postComments, user);

        CommentsLike savedLike = commentsLikeRepo.save(commentsLike);

        // Convert back to DTO to return (optional, or just return the saved entity ID)
        CommentsLikeDto response = new CommentsLikeDto(savedLike);

        return response;
    }

    public List<CommentsLikeDto> getAllCommentsLike() {

        List<CommentsLike> commentsList = commentsLikeRepo.findAll();
        return commentsList.stream().map(CommentsLikeDto::new).collect(Collectors.toList());
    }

}
