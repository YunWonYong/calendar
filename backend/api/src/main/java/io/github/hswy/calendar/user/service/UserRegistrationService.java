package io.github.hswy.calendar.user.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.hswy.calendar.social.account.SocialAccountEntity;
import io.github.hswy.calendar.social.account.SocialAccountProcessor;
import io.github.hswy.calendar.social.account.oauth2.SocialOAuth2UserInfo;
import io.github.hswy.calendar.user.UserEntity;
import io.github.hswy.calendar.user.UserProcessor;
import io.github.hswy.calendar.user.plan.UserPlanProcessor;
import io.github.hswy.calendar.user.profile.UserProfileProcessor;
import io.github.hswy.calendar.user.social.account.UserSocialAccountProcessor;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserRegistrationService {
    private final SocialAccountProcessor socialAccountProcessor;
    private final UserProcessor userProcessor;
    private final UserProfileProcessor userProfileProcessor;
    private final UserSocialAccountProcessor userSocialAccountProcessor;
    private final UserPlanProcessor userPlanProcessor;

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

        UserEntity userEntity = userProcessor.createNewUser();
        Long userId = userEntity.getUserId();
        
        userProfileProcessor.createNewUserProfile(
            userId, 
            info
        );

        userSocialAccountProcessor.createNewUserSocialAccount(
            userEntity,
            socialAccountEntity
        );

        userPlanProcessor.createNewUserPlan(userId);

        return userId;
    }
}

