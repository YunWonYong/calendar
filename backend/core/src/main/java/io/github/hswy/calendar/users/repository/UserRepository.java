package io.github.hswy.calendar.users.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.hswy.calendar.global.common.enums.Platform;
import io.github.hswy.calendar.users.model.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    public Optional<UserEntity> findByPlatformAndPlatformId(Platform platform, String PlatformId);
}
