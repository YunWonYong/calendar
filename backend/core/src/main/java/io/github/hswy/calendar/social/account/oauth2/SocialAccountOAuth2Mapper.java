package io.github.hswy.calendar.social.account.oauth2;

import org.springframework.security.oauth2.core.user.OAuth2User;

import io.github.hswy.calendar.global.exception.ApplicationException;
import io.github.hswy.calendar.social.model.SocialType;

interface SocialAccountOAuth2Mapper {
    void map(SocialOAuth2UserInfo userInfo, OAuth2User oAuth2User) throws ApplicationException;
    SocialType getSocialType();
}
