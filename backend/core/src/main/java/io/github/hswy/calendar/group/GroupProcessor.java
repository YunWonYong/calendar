package io.github.hswy.calendar.group;

import org.springframework.stereotype.Component;

import io.github.hswy.calendar.global.annotations.RequireTransaction;
import io.github.hswy.calendar.group.exception.InvalidGroupStatusChangeException;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;

@Component 
@RequiredArgsConstructor 
public class GroupProcessor {
    private final EntityManager em;
    private final GroupHistoryEntityMapper historyEntityMapper;

    @RequireTransaction 
    public GroupEntity createGroup(GroupEntity entity) {
        em.persist(entity);
        insertHistory(entity);
        return entity;
    }

    @RequireTransaction
    public GroupEntity changeNames(GroupEntity entity, String groupFullName, String groupShortName) {
        entity.changeNames(groupFullName, groupShortName);
        insertHistory(entity, GroupStatus.CHANGED_DATA);
        return entity;
    }

    @RequireTransaction
    public GroupEntity changeEmblem(GroupEntity entity, GroupEmblemType emblemType,String emblemId) {
        entity.changeEmblem(emblemType, emblemId);
        insertHistory(entity, GroupStatus.CHANGED_DATA);
        return entity;
    }

    @RequireTransaction
    public GroupEntity changeMemberLimitCounts(GroupEntity entity, int memberLimitCount, int assistantLimitCount) {
        entity.changeMemberLimits(memberLimitCount, assistantLimitCount);
        insertHistory(entity, GroupStatus.CHANGED_DATA);
        return entity;
    }

    @RequireTransaction
    public GroupEntity changeStatus(GroupEntity entity, GroupStatus status) {
        boolean changed = entity.changeStatus(status);
        if (!changed) {
            throw new InvalidGroupStatusChangeException(
                entity.getGroupId(),
                entity.getGroupLeaderId(),
                entity.getGroupStatus(),
                status
            );
        }
        insertHistory(entity);
        return entity;
    }

    @RequireTransaction
    public GroupEntity changeLeaderId(GroupEntity entity, Long groupLeaderId) {
        entity.changeLeaderId(groupLeaderId);
        insertHistory(entity, GroupStatus.CHANGED_LEADER_ID);
        return entity;
    }

    private void insertHistory(GroupEntity entity) {
        insertHistory(entity, entity.getGroupStatus());
    }

    private void insertHistory(GroupEntity entity, GroupStatus status) {
        GroupHistoryEntity historyEntity = historyEntityMapper.of(entity);
        historyEntity.setGroupStatus(status);
        em.persist(historyEntity);
    }
}
