package io.github.hswy.calendar.global.security.oauth2.service;

import org.springframework.stereotype.Service;

import io.github.hswy.calendar.social.account.oauth2.SocialOAuth2UserInfo;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class OAuth2UserService {
    
    public boolean checkNewUser(SocialOAuth2UserInfo info) {
        return true;
    }

    public Long getUserId(SocialOAuth2UserInfo info) {
        return 1L;
    }

    @Transactional
    public Long createUserId(SocialOAuth2UserInfo info) {
        return 1L;
    }
}
