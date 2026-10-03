package io.github.hswy.calendar.user.profile.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.hswy.calendar.user.profile.model.UserProfileEntity;

public interface UserProfileRepository extends JpaRepository<UserProfileEntity, Long> {
}
