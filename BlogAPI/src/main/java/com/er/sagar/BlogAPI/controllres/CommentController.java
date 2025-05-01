package com.er.sagar.BlogAPI.controllres;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.er.sagar.BlogAPI.DTO.CommentsRequestDto;
import com.er.sagar.BlogAPI.DTO.PostCommentsDto;
import com.er.sagar.BlogAPI.services.CommentService;

@RestController
@RequestMapping("api")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @GetMapping("/comments")
    public List<PostCommentsDto> listAllCommenst() {
        return commentService.listComments();
    }

    @PostMapping("/comments")
    public PostCommentsDto addComment(@RequestBody CommentsRequestDto postComment) {
        return commentService.addComment(postComment);
    }

    @GetMapping("/comments-by-post/{postId}")
    public List<PostCommentsDto> getCommenstByPost(@PathVariable int postId) {
        return commentService.getCommentByPostId(postId);

    }

}
