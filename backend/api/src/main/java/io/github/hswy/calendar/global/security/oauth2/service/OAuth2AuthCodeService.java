package io.github.hswy.calendar.global.security.oauth2.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import io.github.hswy.calendar.global.security.oauth2.exception.AuthenticationCodeInvalidException;

import java.time.Duration;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OAuth2AuthCodeService {
    private final StringRedisTemplate redisTemplate;
    private final Duration expireSeconds = Duration.ofSeconds(60);

    public String generateAuthCode(Long userId) {
        String authCode = UUID.randomUUID().toString();
        String authCodeRedisKey = getAuthCodeRedisKey(authCode);

        redisTemplate.opsForValue().set(
            authCodeRedisKey,
            userId.toString(),
            expireSeconds
        );

        return authCode;
    }

    public Long getUserIdByAuthenticationCode(String authCode) {
        if (authCode == null || authCode.isEmpty()) {
            throw new AuthenticationCodeInvalidException(authCode);
        }

        return getUserIdByAuthCode(authCode);
    }

    private Long getUserIdByAuthCode(String authCode) {
        String codeRedisKey = getAuthCodeRedisKey(authCode);
        String value = redisTemplate.opsForValue().getAndDelete(codeRedisKey);
        if (value == null || value.isEmpty()) {
            throw new AuthenticationCodeInvalidException(authCode, value, null);
        }

        try {
            return Long.parseLong(value);
        } catch(NumberFormatException e) {
            throw new AuthenticationCodeInvalidException(authCode, value, e);
        }
    }

    private String getAuthCodeRedisKey(String code) {
        return String.format("AUTH:CODE:%s", code);
    }
}
