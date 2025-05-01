package com.er.sagar.BlogAPI.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.er.sagar.BlogAPI.DTO.CommentsRequestDto;
import com.er.sagar.BlogAPI.DTO.PostCommentsDto;
import com.er.sagar.BlogAPI.entities.Post;
import com.er.sagar.BlogAPI.entities.PostComments;
import com.er.sagar.BlogAPI.entities.User;
import com.er.sagar.BlogAPI.repositories.PostCommentRepo;
import com.er.sagar.BlogAPI.repositories.PostRepo;
import com.er.sagar.BlogAPI.repositories.UserRepo;

@Service
public class CommentService {

    @Autowired
    private PostCommentRepo postCommentRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PostRepo postRepo;

    public List<PostCommentsDto> listComments() {

        List<PostComments> postComments = postCommentRepo.findAll();
        return postComments.stream().map(PostCommentsDto::new).collect(Collectors.toList());

    }

    public PostCommentsDto addComment(CommentsRequestDto postComment) {

        Optional<User> user = userRepo.findById(postComment.getUser());
        Optional<Post> post = postRepo.findById(postComment.getPost());
        PostComments postCommentsData = new PostComments(postComment.getComment(), user.get(), post.get());
        PostComments postComments = postCommentRepo.save(postCommentsData);
        return new PostCommentsDto(postComments);

    }

    public List<PostCommentsDto> getCommentByPostId(int postId) {
        Optional<Post> post = postRepo.findById(postId);
        return postCommentRepo.findPostCommentsByPost(post.get());

    }

}
