package com.er.sagar.BlogAPI.controllres;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.er.sagar.BlogAPI.DTO.PostRequestDto;
import com.er.sagar.BlogAPI.DTO.PostResponseDto;
import com.er.sagar.BlogAPI.entities.Post;
import com.er.sagar.BlogAPI.services.PostService;

@RestController
@RequestMapping("/api")
public class PostController {

    @Autowired
    private PostService postService;

    @GetMapping("/posts")
    public List<PostResponseDto> getAllPost() {
        return postService.getAllPost();
    }

    @GetMapping("/posts/{userId}")
    public List<Post> getAllPostByUser(@PathVariable int userId) {
        return postService.getAllPostByUser(userId);
    }

    @PostMapping("/add-post")
    public Post getAllPostByUser(@RequestBody PostRequestDto post) {
        return postService.addPost(post);
    }

}
