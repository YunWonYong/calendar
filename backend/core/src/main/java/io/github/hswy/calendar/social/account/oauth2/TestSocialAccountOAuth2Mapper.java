package io.github.hswy.calendar.social.account.oauth2;

import java.util.Map;

import org.springframework.security.oauth2.core.user.OAuth2User;

import io.github.hswy.calendar.user.profile.provider.UserProfileNicknameGenerator;
import io.github.hswy.calendar.global.exception.ApplicationException;
import io.github.hswy.calendar.social.account.exception.SocialIdentityNotFoundException;
import io.github.hswy.calendar.social.account.exception.SocialRequiredAttributeNotFoundException;

public class TestSocialAccountOAuth2Mapper implements SocialAccountOAuth2Mapper {
    @Override
    public void map(SocialOAuth2UserInfo userInfo, OAuth2User oAuth2User) throws ApplicationException {
        Map<String, Object> response = SocialAccountMapCaster.getAsRequiredMap(
            oAuth2User.getAttribute("response"),
            userInfo.socialType,
            "response"
        );

        String socialIdentity = null;
        Object id = response.get("id");

        if (id instanceof Number) {
            socialIdentity = String.valueOf(id);
        } else if (id instanceof String) {
            socialIdentity = id.toString();
        }

        if (socialIdentity == null) {
            throw new SocialIdentityNotFoundException(userInfo.socialType, "response->id");
        }

        Object email = response.get("email");
        if (!(email instanceof String value && !value.isBlank())) {
            throw new SocialRequiredAttributeNotFoundException(userInfo.socialType, "response->email");
        }

        userInfo.socialIdentity = socialIdentity;
        userInfo.email = value;
        userInfo.nickname = UserProfileNicknameGenerator.getRandomNickname();
    }
}
