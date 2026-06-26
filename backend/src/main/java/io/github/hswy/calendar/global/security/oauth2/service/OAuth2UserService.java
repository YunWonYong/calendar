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
    
    public Long getOrCreateUserId(OAuth2UserInfo info) {
        Optional<UserEntity> user = userService.findByPlatformAndPlatformId(
            info.getPlatform(),
            info.getPlatformId()
        );

        if (user.isEmpty()) {
            return createNewUser(info); 
        }

        return user.get().getUserId();
    }
    
    @Transactional
    public Long createNewUser(OAuth2UserInfo info) {
        UserEntity newUser = userService.createNewUser(info);
        UserProfileEntity newUserProfile = userProfileService.createNewUserProfile(newUser, info);
        return newUserProfile.getUserId();
    }
}
