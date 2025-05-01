package com.er.sagar.BlogAPI.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.er.sagar.BlogAPI.DTO.CommentsLikeDto;
import com.er.sagar.BlogAPI.DTO.PostLikesDto;
import com.er.sagar.BlogAPI.entities.CommentsLike;
import com.er.sagar.BlogAPI.entities.Post;
import com.er.sagar.BlogAPI.entities.PostComments;
import com.er.sagar.BlogAPI.entities.PostLike;
import com.er.sagar.BlogAPI.entities.User;
import com.er.sagar.BlogAPI.repositories.PostCommentRepo;
import com.er.sagar.BlogAPI.repositories.PostLikesRepo;
import com.er.sagar.BlogAPI.repositories.PostRepo;
import com.er.sagar.BlogAPI.repositories.UserRepo;

@Service
public class PostLikeService {

    @Autowired
    private PostLikesRepo postLikeRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PostRepo postRepo;

    public List<PostLikesDto> getAllPostsLike() {
        List<PostLike> commentsList = postLikeRepo.findAll();
        return commentsList.stream().map(PostLikesDto::new).collect(Collectors.toList());
    }

    public PostLikesDto addLikes(PostLikesDto listInfo) {

        User user = userRepo.findById(listInfo.getUserId()).orElse(null);
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        Post post = postRepo.findById(listInfo.getPostId()).orElse(null);

        PostLike postLike = new PostLike(post, user);

        PostLike savedLike = postLikeRepo.save(postLike);

        // Convert back to DTO to return (optional, or just return the saved entity ID)
        PostLikesDto response = new PostLikesDto(savedLike);

        return response;
    }

}
