package io.github.hswy.calendar.global.security.oauth2.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import io.github.hswy.calendar.global.security.oauth2.model.OAuth2UserInfo;
import io.github.hswy.calendar.users.model.UserEntity;
import io.github.hswy.calendar.users.model.UserProfileEntity;
import io.github.hswy.calendar.users.service.UserProfileService;
import io.github.hswy.calendar.users.service.UserService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class OAuth2UserService {
    private final UserService userService;
    private final UserProfileService userProfileService;
    
    public boolean checkNewUser(OAuth2UserInfo info) {
        Optional<UserEntity> user = userService.findByPlatformAndPlatformId(
            info.getPlatform(),
            info.getPlatformId()
        );

        return user.isEmpty();
    }

    public Long getUserId(OAuth2UserInfo info) {
        UserEntity user = userService.getByPlatformAndPlatformId(
            info.getPlatform(), 
            info.getPlatformId()
        );

        Long userId = user.getUserId();
        userProfileService.getUserProfileById(userId);
        return userId;
    }

    @Transactional
    public Long createUserId(OAuth2UserInfo info) {
        // TODO Exception check.
        UserEntity newUser = userService.createNewUser(info);
        UserProfileEntity newUserProfile = userProfileService.createNewUserProfile(newUser, info);
        return newUserProfile.getUserId();
    }
}
