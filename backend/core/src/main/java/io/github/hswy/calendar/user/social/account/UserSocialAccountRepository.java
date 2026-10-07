package io.github.hswy.calendar.user.social.account;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

interface UserSocialAccountRepository extends JpaRepository<UserSocialAccountEntity, UserSocialAccountId> {
    List<UserSocialAccountEntity> findByUser_UserId(Long userId);

    @Query(
"""
SELECT  A.user.userId
  FROM  UserSocialAccountEntity  A
 WHERE  A.id.socialAccountId  = :socialAccountId
   AND  A.userSocialStatus = CAST(:status AS user_social_status)
"""
    )
    Optional<Long> findUserIdBySocialAccountIdAndUserSocialStatus(
        @Param("socialAccountId") Long socialAccountId, 
        @Param("status") UserSocialAccountStatus status
    );
}
