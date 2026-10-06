package io.github.hswy.calendar.social.account.oauth2;

import org.springframework.security.oauth2.core.user.OAuth2User;

import io.github.hswy.calendar.global.exception.ApplicationException;
import io.github.hswy.calendar.social.account.exception.NotFoundSocialIdentityException;
import io.github.hswy.calendar.social.account.exception.NotFoundSocialRequiredAttributeException;

public class GoogleSocialAccountOAuth2Mapper implements SocialAccountOAuth2Mapper {
    @Override
    public void map(SocialOAuth2UserInfo userInfo, OAuth2User oAuth2User) throws ApplicationException {
        String sub = oAuth2User.getAttribute("sub");
        if (sub == null || sub.isBlank()) {
            throw new NotFoundSocialIdentityException(userInfo.socialType, "sub");
        }

        String email = oAuth2User.getAttribute("email");
        if (email == null || email.isBlank()) {
            throw new NotFoundSocialRequiredAttributeException(userInfo.socialType, "email");
        }

        userInfo.socialIdentity = sub;
        userInfo.email = email;
        // TODO 추후 nickname 설정.
        userInfo.nickname = "qwdbnoqwdnoqwd";
    }
}
