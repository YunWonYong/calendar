package io.github.hswy.calendar.user.social.account;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

interface UserSocialAccountRepository extends JpaRepository<UserSocialAccountEntity, UserSocialAccountId> {
    List<UserSocialAccountEntity> findByUser_UserId(Long userId);
    Optional<Long> findUser_UserIdById_SocialAccountIdAndUserSocialStatus(Long socialAccountId, UserSocialAccountStatus status);
    boolean existsById_SocialAccountIdAndId_UserIdNotAndUserSocialStatus(Long socialAccountId, Long userId, UserSocialAccountStatus status);
}
