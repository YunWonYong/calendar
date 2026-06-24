package io.github.hswy.calendar.users.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.hswy.calendar.users.model.UserProfileEntity;

public interface UserProfileRepository extends JpaRepository<UserProfileEntity, Long> {
}
