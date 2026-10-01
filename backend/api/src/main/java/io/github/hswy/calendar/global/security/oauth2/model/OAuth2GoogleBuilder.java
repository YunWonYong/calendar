package io.github.hswy.calendar.global.security.oauth2.model;

import org.springframework.security.oauth2.core.user.OAuth2User;

public class OAuth2GoogleBuilder implements OAuth2Builder {
    @Override
    public void build(OAuth2UserInfo userInfo, OAuth2User oAuth2User) throws Exception {
        String email = oAuth2User.getAttribute("email");
        String sub = oAuth2User.getAttribute("sub");
        if (sub == null || sub.isEmpty()) {
            throw new Exception("platform id not found. platform: google, attribute key: sub");
        }

        userInfo.platformId = sub;
        userInfo.email = email;
        // TODO 추후 nickname 설정.
        userInfo.nickname = "qwdbnoqwdnoqwd";
    }
}
