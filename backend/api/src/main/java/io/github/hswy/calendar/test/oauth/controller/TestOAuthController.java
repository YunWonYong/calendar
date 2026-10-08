package io.github.hswy.calendar.test.oauth.controller;

import java.io.IOException;
import java.util.Map;

import org.springframework.context.annotation.Profile;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import io.github.hswy.calendar.test.oauth.model.TestOAuthDTO;
import io.github.hswy.calendar.test.oauth.service.TestOAuthService;
import lombok.RequiredArgsConstructor;

@RestController 
@RequestMapping("/test/oauth")
@Profile("local")
@RequiredArgsConstructor 
public class TestOAuthController {
    private final TestOAuthService service;

    @GetMapping("/authorize")
    public ResponseEntity<String> authorize(@RequestParam(value = "redirect_uri") String redirectUri, @RequestParam(value = "state") String state) throws IOException {
        return ResponseEntity
            .ok()
            .contentType(MediaType.TEXT_HTML)
            .body(service.getLoginHtml(redirectUri, state));
    }

    @PostMapping(value = "/login")
    public ResponseEntity<Void> login(@RequestParam("identity") String userIdentity, @RequestParam("code") String code) throws Exception {
        TestOAuthDTO dto = service.login(code, userIdentity);
        return ResponseEntity
            .status(302)
            .location(
                UriComponentsBuilder
                    .fromUriString(dto.getRedirectUri())
                    .queryParam("code", code)
                    .queryParam("state", dto.getState())
                    .build()
                    .toUri()
            )
            .build();
    }

    @PostMapping(
        value = "/token",
        consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE
    )
    public Map<String, Object> postToken(@RequestParam("code") String code) throws Exception {
        return service.generateAccessToken(code);
    }

    @GetMapping("/userinfo")
    public Map<String, Object> userInfo(@AuthenticationPrincipal String accessToken) {
        System.out.println(accessToken);
        return Map.of(
            "response", Map.of(
                "id", "test-user-001",
                "nickname", "Test User",
                "email", "test@example.com"
            )
        );
    }
}
