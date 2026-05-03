package io.github.hswy.calendar.global.security.oauth2.model;

import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Map;

public class Oauth2NaverBuilder implements Oauth2Builder {

    @Override
    public void build(Oauth2UserInfo userInfo, OAuth2User oAuth2User) throws Exception {
        Map<String, Object> response = getAsMap(
            oAuth2User.getAttribute("response"),
            userInfo.platform,
            "response"
        );

        String platformId = null;
        Object id = response.get("id");
        if (id instanceof Number) {
            platformId = String.valueOf(id);
        } else if (id instanceof String) {
            platformId = id.toString();
        } else {
            throw new Exception("platform id not found. platform: naver, attribute key: id");
        }

        Object email = response.get("email");
        if (!(email instanceof String) || ((String) email).isEmpty()) {
            throw new Exception("email not found. platform: naver, attribute key: email");
        }

        Object nickname = response.get("nickname");

        userInfo.platformId = platformId;
        userInfo.email = (String) email;
        userInfo.nickname = (String) nickname;
    }
}
