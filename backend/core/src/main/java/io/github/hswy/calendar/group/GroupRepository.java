package io.github.hswy.calendar.group;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import jakarta.persistence.LockModeType;

interface GroupRepository extends JpaRepository<GroupEntity, Long> {

    @Lock(LockModeType.READ)
    @Query(
"""
SELECT  COUNT(g)
  FROM  GroupEntity g
 WHERE  g.groupLeaderId = :groupLeaderId
   AND  g.groupStatus = 'ACTIVE'
"""
    )
    long countByGroupLeaderIdAndActiveGroupStatus(
        @Param("groupLeaderId") Long groupLeaderId
    );

    long countByGroupLeaderIdAndGroupStatus(
        Long groupLeaderId,
        GroupStatus groupStatus
    );
}
