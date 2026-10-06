package io.github.hswy.calendar.user.service;

import java.util.Optional;

import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import io.github.hswy.calendar.social.account.oauth2.SocialOAuth2UserInfo;
import io.github.hswy.calendar.user.UserEntity;
import io.github.hswy.calendar.user.exception.UserProfileNotFoundException;
import io.github.hswy.calendar.user.model.UserInfoDTO;
import io.github.hswy.calendar.user.profile.model.UserProfileEntity;
import io.github.hswy.calendar.user.profile.repository.UserProfileRepository;
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
    public UserProfileEntity createNewUserProfile(UserEntity user, SocialOAuth2UserInfo info) {
        return userProfileRepository.save(
            makeUserProfileEntity(user, info)
        );
    }

    public UserInfoDTO getUserInfoDTO(Long userId) {
        return UserInfoDTO.from(getUserProfileById(userId));
    }

    private UserProfileEntity makeUserProfileEntity(UserEntity user, SocialOAuth2UserInfo info) {
        return UserProfileEntity.builder()
            .nickname(info.getNickname())
            .email(info.getEmail())
            .tel(info.getTel())
            .profileImageUrl(info.getProfileImageUrl())
            .build();
    }
}
