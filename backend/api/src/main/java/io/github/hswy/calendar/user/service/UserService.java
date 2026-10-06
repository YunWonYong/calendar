package io.github.hswy.calendar.user.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import io.github.hswy.calendar.auth.enums.Platform;
import io.github.hswy.calendar.social.account.oauth2.SocialOAuth2UserInfo;
import io.github.hswy.calendar.user.exception.UserNotFoundException;
import io.github.hswy.calendar.user.model.UserEntity;
import io.github.hswy.calendar.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public UserEntity getByPlatformAndPlatformId(Platform platform, String platformId) {
        Optional<UserEntity> user = findByPlatformAndPlatformId(platform, platformId);
        if (user.isEmpty()) {
            throw new UserNotFoundException(platform, platformId);
        }

        return user.get();
    }

    public Optional<UserEntity> findByPlatformAndPlatformId(Platform platform, String platformId) {
        return userRepository.findByPlatformAndPlatformId(platform, platformId);
    }

    public UserEntity getById(Long userId) {
        Optional<UserEntity> user = findById(userId);
        if (user.isEmpty()) {
            throw new UserNotFoundException(userId);
        }

        return user.get();
    }

    public Optional<UserEntity> findById(Long userId) {
        return userRepository.findById(userId);
    }

    public UserEntity createNewUser(SocialOAuth2UserInfo info) {
        return null;
    }
}

