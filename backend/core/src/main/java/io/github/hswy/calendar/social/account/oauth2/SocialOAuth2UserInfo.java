package io.github.hswy.calendar.social.account.oauth2;

import lombok.Builder;
import lombok.Getter;

import org.springframework.security.oauth2.core.user.OAuth2User;

import io.github.hswy.calendar.social.model.SocialType;

@Getter
@Builder
public class SocialOAuth2UserInfo {
    final SocialType socialType;
    String socialIdentity;
    String nickname;
    String email;
    String tel;
    String profileImageUrl;

    public void sync(OAuth2User oAuth2User) throws Exception {
        SocialAccountOAuth2Mapper builder = switch (this.socialType) {
            case GOOGLE -> new GoogleSocialAccountOAuth2Mapper();
            case KAKAO -> new KakaoSocialAccountOAuth2Mapper();
            case NAVER -> new NaverSocialAccountOAuth2Mapper();
        };

        builder.map(this, oAuth2User);
    }
}
