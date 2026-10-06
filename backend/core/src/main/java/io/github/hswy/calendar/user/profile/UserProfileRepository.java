package io.github.hswy.calendar.user.profile;

import org.springframework.data.jpa.repository.JpaRepository;

interface UserProfileRepository extends JpaRepository<UserProfileEntity, Long> {
}
