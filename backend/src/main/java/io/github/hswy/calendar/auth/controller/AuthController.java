package io.github.hswy.calendar.auth.controller;

import io.github.hswy.calendar.auth.model.AuthRequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @PostMapping
    public String auth(@RequestBody AuthRequestBody authRequestBody) {
        System.out.println(authRequestBody.getAuthCode());
        return "ok";
    }
}
