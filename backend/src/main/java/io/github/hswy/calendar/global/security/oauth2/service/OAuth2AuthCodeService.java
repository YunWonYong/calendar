package io.github.hswy.calendar.global.security.oauth2.service;

import io.github.hswy.calendar.global.security.oauth2.model.Oauth2UserInfo;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class OAuth2AuthCodeService {

    public String generateAuthCode(String platform, String platformId) {
        String platformRedisKey = getAuthPlatformIdRedisKey(platform, platformId);
        String uuid = UUID.randomUUID().toString();
        String codeRedisKey = getAuthCodeRedisKey(uuid);
        // Redis save
        return uuid;
    }

    public Oauth2UserInfo getPlatformDataByAuthenticationCode(String code) {
        String codeRedisKey = getAuthCodeRedisKey(code);
        // Redis get platform, platformId
        // Redis del platformRedisKey, codeRedisKey
        return null;
    }

    private String getAuthCodeRedisKey(String code) {
        return String.format("AUTH:CODE:%s", code);
    }

    private String getAuthPlatformIdRedisKey(String platform, String platformId) {
        return String.format("AUTH:CODE:PLATFORM:%s:%s", platform.toUpperCase(), platformId);
    }
}
