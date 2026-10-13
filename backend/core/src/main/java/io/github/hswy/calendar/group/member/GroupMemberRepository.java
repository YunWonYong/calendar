package io.github.hswy.calendar.group.member;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

interface GroupMemberRepository extends JpaRepository<GroupMemberEntity, GroupMemberPK> {
    
    @Query(
"""
SELECT  A
  FROM  GroupMemberEntity A
 WHERE  A.pk.groupId = :groupId
 ORDER  BY A.orderNo ASC
"""
    )
    List<GroupMemberEntity> getMembers(
        @Param("groupId") Long groupId
    );

    @Query(
"""
SELECT  A
  FROM  GroupMemberEntity A
 WHERE  A.pk.userId = :pk.userId
   AND  A.pk.groupId = :pk.groupId
"""
    )
    Optional<GroupMemberEntity> getMember(
        @Param("pk") GroupMemberPK pk
    );

}
