package io.github.hswy.calendar.global.security.oauth2.model;

import org.springframework.security.oauth2.core.user.OAuth2User;

public class Oauth2GoogleBuilder implements Oauth2Builder {
    @Override
    public void build(Oauth2UserInfo userInfo, OAuth2User oAuth2User) throws Exception {
        String email = oAuth2User.getAttribute("email");
        String sub = oAuth2User.getAttribute("sub");
        if (sub == null || sub.isEmpty()) {
            throw new Exception("platform id not found. platform: google, attribute key: sub");
        }

//        key[sub] value[102242448434371801704]
//        key[name] value[윤원용]
//        key[given_name] value[원용]
//        key[family_name] value[윤]
//        key[picture] value[https://lh3.googleusercontent.com/a/ACg8ocJroMkdI-KgniK0DUlLW7bVez-b40jketCns7l3m_sLQJVxtKE=s96-c]
//        key[email] value[wonyong.yun@playlinks.com]
//        key[email_verified] value[true]
//        key[hd] value[playlinks.com]

//        Map<String, Object> a = oAuth2User.getAttributes();
//        Iterator<String> keys = a.keySet().iterator();
//        while (keys.hasNext()) {
//            String key = keys.next();
//            System.out.printf("key[%s] value[%s]\n", key, a.get(key).toString());
//        }

        userInfo.platformId = sub;
        userInfo.email = email;
        // [TODO] 추후 nickname 설정.
        userInfo.nickname = "qwdbnoqwdnoqwd";
    }
}
