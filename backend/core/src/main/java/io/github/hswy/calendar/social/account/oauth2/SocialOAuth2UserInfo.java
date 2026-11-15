package io.github.hswy.calendar.social.account.oauth2;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import io.github.hswy.calendar.social.model.SocialType;

@Getter
@Setter(AccessLevel.PACKAGE)
@Builder
public class SocialOAuth2UserInfo {
    final SocialType socialType;
    String socialIdentity;
    String nickname;
    String email;
    String tel;
    String profileImage;
}
