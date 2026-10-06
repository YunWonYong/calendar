package io.github.hswy.calendar.user.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.hswy.calendar.social.account.SocialAccountEntity;
import io.github.hswy.calendar.social.account.SocialAccountProcessor;
import io.github.hswy.calendar.social.account.oauth2.SocialOAuth2UserInfo;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final SocialAccountProcessor socialAccountProcessor;

    public boolean isNewUser(SocialOAuth2UserInfo info) {
        SocialAccountEntity entity = socialAccountProcessor.getSocialAccountEntity(
            info.getSocialType(), 
            info.getSocialIdentity()
        );
        return entity == null;
    }

    public Long getUserId(SocialOAuth2UserInfo info) {
        return 1L;
    }

    @Transactional 
    public Long createNewUser(SocialOAuth2UserInfo info) {
        SocialAccountEntity socialAccountEntity = socialAccountProcessor.createNewSocialAccount(
            info.getSocialType(), 
            info.getSocialIdentity()
        );

        return 1L;
    }
}

