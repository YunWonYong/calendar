package io.github.hswy.calendar.user.plan;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import jakarta.persistence.LockModeType;

interface UserPlanRepository extends JpaRepository<UserPlanEntity, Long> {
    
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query(
"""
SELECT  up
  FROM  UserPlanEntity up
 WHERE  up.userId = :userId
"""
    )
    Optional<UserPlanEntity> findUserPlanIdForUpdate(
        @Param("userId") Long userId
    );
}
