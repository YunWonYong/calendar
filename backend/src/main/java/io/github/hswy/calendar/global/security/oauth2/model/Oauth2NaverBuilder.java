package io.github.hswy.calendar.global.security.oauth2.model;

import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Map;

public class Oauth2NaverBuilder implements Oauth2Builder {

    @Override
    public void build(Oauth2UserInfo userInfo, OAuth2User oAuth2User) throws Exception {
        System.out.println(oAuth2User);
        Map<String, Object> response = getAsMap(
            oAuth2User.getAttribute("response"),
            userInfo.platform,
            "response"
        );
        System.out.println(response);

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
        String name = (String) response.get("name");


        // TODO Naver login optional datas
        Object phoneNumberObj = response.get("mobile");
        Object ageObj = response.get("age");
        Object genderObj = response.get("gender");
        Object profileImageObj = response.get("profile_image");
        Object birthdayObj = response.get("birthday");
        Object birthyearObj = response.get("birthyear");
        System.out.println("===Naver Login===");
        System.out.println(name);
        System.out.println(phoneNumberObj);
        System.out.println(ageObj);
        System.out.println(genderObj);
        System.out.println(profileImageObj);
        System.out.println(birthdayObj);
        System.out.println(birthyearObj);
    }
}
