package com.er.sagar.BlogAPI.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.er.sagar.BlogAPI.DTO.PostRequestDto;
import com.er.sagar.BlogAPI.DTO.PostResponseDto;
import com.er.sagar.BlogAPI.entities.Post;
import com.er.sagar.BlogAPI.entities.User;
import com.er.sagar.BlogAPI.exceptions.UserNotFoundException;
import com.er.sagar.BlogAPI.repositories.PostRepo;
import com.er.sagar.BlogAPI.repositories.UserRepo;

@Service
public class PostService {

    @Autowired
    private PostRepo postRepo;

    @Autowired
    private UserRepo userRepo;

    public List<PostResponseDto> getAllPost() {
        List<Post> posts = postRepo.findAll();
        return posts.stream().map(PostResponseDto::new).collect(Collectors.toList()); // needs to check this  method

    }

    public List<Post> getAllPostByUser(int userId) {
        Optional<User> optionlUser = userRepo.findById(userId);
        if (optionlUser.isPresent()) {
            return postRepo.findByUser(optionlUser.get());
        } else {
            throw new RuntimeException("User not found with id: " + userId);

        }
    }

    public Post addPost(PostRequestDto postDto) {
        Optional<User> optionalUser = userRepo.findById(postDto.getUser());
        Post postObj = new Post();
        if (optionalUser.isPresent()) {
            postObj.setUser(optionalUser.get()); // set actual User
            postObj.setTitle(postDto.getTitle());
            postObj.setImage(postDto.getImage());
            postObj.setDescription(postDto.getDescription());
            return postRepo.save(postObj);
        } else {
            throw new UserNotFoundException("User not found with id: " + postDto.getUser());
        }
    }

}
