package io.github.hswy.calendar.global.security.oauth2.model;

import io.github.hswy.calendar.global.common.enums.Platform;
import lombok.Getter;
import org.springframework.security.oauth2.core.user.OAuth2User;

@Getter
public class Oauth2UserInfo {
    final Platform platform;
    String platformId;
    String nickname;
    String email;

    public Oauth2UserInfo(Platform platform) {
        this.platform = platform;
    }

    public Oauth2UserInfo(Platform platform, String platformId) {
        this.platform = platform;
        this.platformId = platformId;
    }

    public void sync(OAuth2User oAuth2User) throws Exception {
        Oauth2Builder builder = switch (this.platform) {
            case GOOGLE -> new Oauth2GoogleBuilder();
            case KAKAO -> new Oauth2KakaoBuilder();
            case NAVER -> new Oauth2NaverBuilder();
        };

        builder.build(this, oAuth2User);
    }
}
