package io.github.hswy.calendar.group.member;

import java.util.List;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Component;

import io.github.hswy.calendar.global.annotations.RequireTransaction;
import io.github.hswy.calendar.group.GroupEntity;
import io.github.hswy.calendar.user.UserEntity;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class GroupMemberProcessor {
    private final EntityManager em;
    private final GroupMemberRepository repo;
    private final GroupMemberHistoryEntityMapper mapper;

    @RequireTransaction 
    public GroupMemberEntity createGroupMember(GroupEntity groupEntity, UserEntity userEntity) {
        GroupMemberEntity memberEntity = getGroupMemberEntity(
            groupEntity,
            userEntity
        );
        repo.save(memberEntity);

        insertHistory(
            memberEntity,
            GroupMemberHistoryReason.CREATE
        );
        return memberEntity;
    }

    @RequireTransaction 
    public List<GroupMemberEntity> createGroupMembers(GroupEntity groupEntity, List<UserEntity> userEntities) {
        List<GroupMemberEntity> memberEntities = userEntities
            .stream()
            .map(userEntity ->  
                getGroupMemberEntity(
                    groupEntity,
                    userEntity
                )
            )
            .toList();

        repo.saveAll(memberEntities);

        insertHistoryAll(
            memberEntities,
            GroupMemberHistoryReason.CREATE
        );
        return memberEntities;
    }

    @Cacheable(
        cacheNames = "GROUP:MEMBERS",
        key = "#groupId"
    )
    public List<GroupMemberEntity> getMembers(Long groupId) {
        return this.repo.getMembers(groupId);
    }
    
    private GroupMemberEntity getGroupMemberEntity(GroupEntity groupEntity, UserEntity userEntity) {
        return getGroupMemberEntity(
            groupEntity,
            userEntity,
            null
        );
    }

    private GroupMemberEntity getGroupMemberEntity(GroupEntity groupEntity, UserEntity userEntity, GroupMemberStatus status) {
        GroupMemberEntity.GroupMemberEntityBuilder builder = GroupMemberEntity
            .builder()
                .pk(
                    getGroupMemberPK(
                        groupEntity.getGroupId(),
                        userEntity.getUserId()
                    )
                )
                .user(userEntity)
                .group(groupEntity);
        if (status != null) {
            builder.memberStatus(status);
        }

        GroupMemberEntity entity = builder.build();

        entity.setupOrderNo();
        return entity;
    }

    private GroupMemberPK getGroupMemberPK(Long groupId, Long userId) {
        return GroupMemberPK
            .builder()
                .userId(userId)
                .groupId(groupId)
            .build();
    }

    private void insertHistory(GroupMemberEntity groupMemberEntity, GroupMemberHistoryReason reason) {
        insertHistoryAll(
            List.of(groupMemberEntity),
            reason
        );
    }

    private void insertHistoryAll(List<GroupMemberEntity> groupMemberEntities, GroupMemberHistoryReason reason) {
        groupMemberEntities
            .forEach(groupMemberEntity -> {
                GroupMemberHistoryEntity historyEntity = mapper.of(groupMemberEntity);
                historyEntity.setReason(reason);
                historyEntity.setUserId(groupMemberEntity.getPk().getUserId());
                historyEntity.setGroupId(groupMemberEntity.getPk().getGroupId());
                em.persist(historyEntity);
            });
    }
}
