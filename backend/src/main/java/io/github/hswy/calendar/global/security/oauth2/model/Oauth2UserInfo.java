package io.github.hswy.calendar.global.security.oauth2.model;

import lombok.Getter;
import org.springframework.security.oauth2.core.user.OAuth2User;

@Getter
public class Oauth2UserInfo {
    final String platform;
    String platformId;
    String nickname;
    String email;

    public Oauth2UserInfo(String platform) {
        this.platform = platform;
    }

    public void sync(OAuth2User oAuth2User) throws Exception {
        Oauth2Builder builder = switch (this.platform) {
            case "google" -> new Oauth2GoogleBuilder();
            case "kakao" -> new Oauth2KakaoBuilder();
            case "naver" -> new Oauth2NaverBuilder();
            default -> throw new Exception("지원하지 않는 플렛폼 입니다.");
        };

        builder.build(this, oAuth2User);
    }
}
