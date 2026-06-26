package io.github.hswy.calendar.global.security.oauth2.model;

import io.github.hswy.calendar.global.common.enums.Platform;
import lombok.Builder;
import lombok.Getter;

import org.springframework.security.oauth2.core.user.OAuth2User;

@Getter
@Builder
public class OAuth2UserInfo {
    final Platform platform;
    String platformId;
    String nickname;
    String email;
    String tel;
    String profileImageUrl;

    public void sync(OAuth2User oAuth2User) throws Exception {
        OAuth2Builder builder = switch (this.platform) {
            case GOOGLE -> new OAuth2GoogleBuilder();
            case KAKAO -> new OAuth2KakaoBuilder();
            case NAVER -> new OAuth2NaverBuilder();
        };

        builder.build(this, oAuth2User);
    }
}
