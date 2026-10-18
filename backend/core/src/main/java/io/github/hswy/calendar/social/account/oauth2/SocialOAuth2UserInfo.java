package io.github.hswy.calendar.social.account.oauth2;

import lombok.Builder;
import lombok.Getter;

import io.github.hswy.calendar.social.model.SocialType;

@Getter
@Builder
public class SocialOAuth2UserInfo {
    final SocialType socialType;
    String socialIdentity;
    String nickname;
    String email;
    String tel;
    String profileImage;
}
