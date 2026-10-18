package io.github.hswy.calendar.user.social.account;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import io.github.hswy.calendar.social.model.SocialType;

interface UserSocialAccountRepository extends JpaRepository<UserSocialAccountEntity, UserSocialAccountId> {
    @Query(
"""
SELECT  A.user.userId
  FROM  UserSocialAccountEntity  A
 WHERE  A.id.socialAccountId  = :socialAccountId
   AND  A.userSocialStatus = :status
"""
    )
    List<Long> findUserIdBySocialAccountIdAndUserSocialStatus(
        @Param("socialAccountId") Long socialAccountId, 
        @Param("status") UserSocialAccountStatus status
    );

    @Query(
"""
SELECT  A
  FROM  UserSocialAccountEntity A
 WHERE  A.socialAccount.socialIdentity = :socialIdentity
   AND  A.socialAccount.socialType = :socialType
   AND  A.userSocialStatus = :status
"""
    )
    UserSocialAccountEntity findBySocialIdentityAndSocialTypeAndUserSocialStatus(
        @Param("socialIdentity") String socialIdentity,
        @Param("socialType") SocialType socialType,
        @Param("status") UserSocialAccountStatus status
    );
}
