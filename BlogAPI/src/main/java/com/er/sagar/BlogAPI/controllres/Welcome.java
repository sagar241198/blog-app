package com.er.sagar.BlogAPI.controllres;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Welcome {

    @GetMapping("/")
    public String welcome() {
        return "Welocm to My Blog Api !";
    }

}
