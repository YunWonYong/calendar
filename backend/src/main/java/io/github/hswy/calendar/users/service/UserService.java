package io.github.hswy.calendar.users.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import io.github.hswy.calendar.global.common.enums.Platform;
import io.github.hswy.calendar.global.security.oauth2.model.OAuth2UserInfo;
import io.github.hswy.calendar.users.exception.UserNotFoundException;
import io.github.hswy.calendar.users.model.UserEntity;
import io.github.hswy.calendar.users.repository.UserRepository;
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

    public UserEntity createNewUser(OAuth2UserInfo info) {
        return userRepository.save(
            makeUserEntityByPlatformAndPlatformId(
                info.getPlatform(),
                info.getPlatformId()
            )
        );
    }

    private UserEntity makeUserEntityByPlatformAndPlatformId(Platform platform, String platformId) {
        return UserEntity.builder()
            .platform(platform)
            .platformId(platformId)
            .build();
    }
}

