package com.er.sagar.BlogAPI.controllres;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.er.sagar.BlogAPI.DTO.CommentsLikeDto;
import com.er.sagar.BlogAPI.services.CommentsLikeService;

@RestController
@RequestMapping("/api")
public class CommentsLikeController {

    @Autowired
    private CommentsLikeService commentsLikeService;

    @GetMapping("/like-comment")
    public List<CommentsLikeDto> getAllCommentsLike() {
        return commentsLikeService.getAllCommentsLike();
    }

    @PostMapping("/like-comment")
    public CommentsLikeDto addLikes(@RequestBody CommentsLikeDto listInfo) {
        return commentsLikeService.addLikes(listInfo);
    }

}
