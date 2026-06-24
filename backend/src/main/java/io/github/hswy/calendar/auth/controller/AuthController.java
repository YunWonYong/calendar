package io.github.hswy.calendar.auth.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.hswy.calendar.auth.model.LoginRequestBody;
import io.github.hswy.calendar.auth.model.LoginResponseBody;
import io.github.hswy.calendar.auth.service.AuthService;
import io.github.hswy.calendar.global.common.model.ApiResponseBody;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping
    public ApiResponseBody<LoginResponseBody> postAuth(@RequestBody LoginRequestBody requestBody) {
        return ApiResponseBody.success(authService.login(requestBody.authCode()));
    }
}
