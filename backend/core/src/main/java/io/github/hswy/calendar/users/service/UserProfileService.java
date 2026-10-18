package io.github.hswy.calendar.users.service;

import java.util.Optional;

import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import io.github.hswy.calendar.global.security.oauth2.model.OAuth2UserInfo;
import io.github.hswy.calendar.users.exception.UserProfileNotFoundException;
import io.github.hswy.calendar.users.model.UserEntity;
import io.github.hswy.calendar.users.model.UserInfoDTO;
import io.github.hswy.calendar.users.model.UserProfileEntity;
import io.github.hswy.calendar.users.repository.UserProfileRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserProfileService {
    private final UserProfileRepository userProfileRepository;

    @Cacheable(
        value = "user_profiles",
        key = "#userId"
    )
    public UserProfileEntity getUserProfileById(Long userId) {
        Optional<UserProfileEntity> userProfileOpt = userProfileRepository.findById(userId);
        return userProfileOpt.orElseThrow(() -> new UserProfileNotFoundException(userId));
    }

    @CachePut(
        value = "user_profiles", 
        key = "#user.userId"
    )
    public UserProfileEntity createNewUserProfile(UserEntity user, OAuth2UserInfo info) {
        return userProfileRepository.save(
            makeUserProfileEntity(user, info)
        );
    }

    public UserInfoDTO getUserInfoDTO(Long userId) {
        return UserInfoDTO.from(getUserProfileById(userId));
    }

    private UserProfileEntity makeUserProfileEntity(UserEntity user, OAuth2UserInfo info) {
        return UserProfileEntity.builder()
            .user(user)
            .nickname(info.getNickname())
            .email(info.getEmail())
            .tel(info.getTel())
            .profileImageUrl(info.getProfileImageUrl())
            .build();
    }
}
