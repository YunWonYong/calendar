package io.github.hswy.calendar.global.security.oauth2.service;

import io.github.hswy.calendar.global.common.enums.Platform;
import io.github.hswy.calendar.global.security.oauth2.model.Oauth2UserInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisOperations;
import org.springframework.data.redis.core.SessionCallback;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.time.Duration;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OAuth2AuthCodeService {
    private final StringRedisTemplate redisTemplate;
    private final Duration expireSeconds = Duration.ofSeconds(60);

    public String generateAuthCode(Oauth2UserInfo info) {
        Platform platform = info.getPlatform();
        String platformRedisKey = getAuthPlatformIdRedisKey(
            platform,
            info.getPlatformId()
        );

        String authCode = UUID.randomUUID().toString();
        String authCodeRedisKey = getAuthCodeRedisKey(authCode);
        String value = String.format("%s:%s", platform.name(), info.getPlatformId());

        List<Object> results = redisTemplate.execute(new SessionCallback<List<Object>>() {
            @Override
            @SuppressWarnings({ "unchecked", "rawtypes" }) // 제네릭 캐스팅 경고 방지
            public List<Object> execute(@NonNull RedisOperations operations) {
                operations.multi();
                operations.opsForValue().set(platformRedisKey, authCode, expireSeconds);
                operations.opsForValue().set(authCodeRedisKey, value, expireSeconds);
                return operations.exec();
            }
        });

        if (results.isEmpty()) {
            throw new RuntimeException("Redis transaction failed to execute.");
        }

        return authCode;
    }

    public Oauth2UserInfo getPlatformDataByAuthenticationCode(String authCode) throws Exception {
        if (authCode == null || authCode.isEmpty()) {
            throw new IllegalArgumentException("Invalid authCode.");
        }

        Oauth2UserInfo info = getOauth2UserInfoByAuthCode(authCode);

        redisTemplate.execute(new SessionCallback<List<Object>>() {
            @Override
            @SuppressWarnings({ "unchecked", "rawtypes" }) // 제네릭 캐스팅 경고 방지
            public List<Object> execute(@NonNull RedisOperations operations) {
                operations.multi();
                operations.delete(getAuthCodeRedisKey(authCode));
                operations.delete(getAuthPlatformIdRedisKey(info.getPlatform(), info.getPlatformId()));
                return operations.exec();
            }
        });

        return info;
    }

    private Oauth2UserInfo getOauth2UserInfoByAuthCode(String authCode) {
        String codeRedisKey = getAuthCodeRedisKey(authCode);
        String value = redisTemplate.opsForValue().get(codeRedisKey);
        if (value == null || value.isEmpty()) {
            throw new IllegalArgumentException("Invalid or expired authCode.");
        }

        String[] values = value.split(":");
        Assert.isTrue(values.length == 2, "Invalid value format in Redis");

        try {
            Platform platform = Platform.valueOf(values[0]);
            return new Oauth2UserInfo(platform, values[1]);
        } catch (Exception e) {
            // TODO error logging
            throw new IllegalArgumentException("Invalid platform: " + values[0]);
        }
    }

    private String getAuthCodeRedisKey(String code) {
        return String.format("AUTH:CODE:%s", code);
    }

    private String getAuthPlatformIdRedisKey(Platform platform, String platformId) {
        return String.format("AUTH:CODE:PLATFORM:%s:%s", platform.name(), platformId);
    }
}
