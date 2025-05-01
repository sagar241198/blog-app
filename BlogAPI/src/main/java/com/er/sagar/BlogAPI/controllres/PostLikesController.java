package com.er.sagar.BlogAPI.controllres;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.er.sagar.BlogAPI.DTO.PostLikesDto;
import com.er.sagar.BlogAPI.services.PostLikeService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api")
public class PostLikesController {

    @Autowired
    private PostLikeService likesService;

    @GetMapping("/like-post")
    public List<PostLikesDto> addLikes() {
        return likesService.getAllPostsLike();
    }

    @PostMapping("/like-post")
    public PostLikesDto addLikes(@RequestBody PostLikesDto listInfo) {
        return likesService.addLikes(listInfo);
    }

}
