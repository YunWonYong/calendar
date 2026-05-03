package io.github.hswy.calendar.global.security.oauth2.model;

import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Map;

public class Oauth2KakaoBuilder implements Oauth2Builder {

    @Override
    public void build(Oauth2UserInfo userInfo, OAuth2User oAuth2User) throws Exception {
        String platformId = null;
        Object id = oAuth2User.getAttribute("id");
        if (id instanceof Number) {
            platformId = String.valueOf(id);
        } else if (id instanceof String) {
            platformId = id.toString();
        } else {
            throw new Exception("platform id not found. platform: kakao, attribute key: id");
        }

        Map<String, Object> userAccount = getAsMap(
            oAuth2User.getAttribute("kakao_account"),
            userInfo.platform,
            "kakao_account"
        );

        Object email = userAccount.get("email");
        if (!(email instanceof String)) {
            throw new Exception("email not found. platform: kakao, attribute key: email");
        }


        Map<String, Object> userProfile = getAsMap(
            userAccount.get("profile"),
            userInfo.platform,
            "profile"
        );

        Object nickname = userProfile.get("nickname");
        if (!(nickname instanceof String)) {
            throw new Exception("nickname not found. platform: kakao, attribute key: nickname");
        }

        userInfo.platformId = platformId;
        userInfo.email = (String) email;
        userInfo.nickname = (String) nickname;
    }
}
