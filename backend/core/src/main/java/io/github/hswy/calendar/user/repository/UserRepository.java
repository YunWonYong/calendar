package io.github.hswy.calendar.user.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.hswy.calendar.auth.enums.Platform;
import io.github.hswy.calendar.user.model.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    public Optional<UserEntity> findByPlatformAndPlatformId(Platform platform, String platformId);
}
