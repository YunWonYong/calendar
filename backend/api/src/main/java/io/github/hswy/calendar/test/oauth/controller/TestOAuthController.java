package io.github.hswy.calendar.test.oauth.controller;

import java.net.URI;
import java.util.Map;

import org.springframework.context.annotation.Profile;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

@RestController 
@RequestMapping("/test/oauth")
@Profile("local")
public class TestOAuthController {
    
    @GetMapping("/authorize")
    public ResponseEntity<Void> authorize(@RequestParam String redirect_uri, @RequestParam String state) {
        URI redirectUri = UriComponentsBuilder
            .fromUriString(redirect_uri)
            .queryParam("code", "test-code")
            .queryParam("state", state)
            .build()
            .toUri();

        return ResponseEntity
            .status(302)
            .location(redirectUri)
            .build();
    }

    @PostMapping("/token")
    public Map<String, Object> postToken() {
        return Map.of(
            "access_token", "test-access-token",
            "token_type", "Bearer",
            "expires_in", 3600
        );
    }

    @GetMapping("/userinfo")
    public Map<String, Object> userInfo() {
        return Map.of(
            "response", Map.of(
                "id", "test-user-001",
                "nickname", "Test User",
                "email", "test@example.com"
            )
        );
    }
}
