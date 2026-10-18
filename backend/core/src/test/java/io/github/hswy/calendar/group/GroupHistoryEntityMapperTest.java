package io.github.hswy.calendar.group;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;



class GroupHistoryEntityMapperTest {
    private final GroupHistoryEntityMapper mapper =
        Mappers.getMapper(GroupHistoryEntityMapper.class);

    @Test
    void entityToHistory() {
        GroupEntity entity = GroupEntity.builder()
            .groupId(1L)
            .groupLeaderId(1L)
            .groupStatus(GroupStatus.ACTIVE)
            .groupFullName("test-group")
            .groupShortName("tg")
            .groupEmblemType(GroupEmblemType.NORMAL)
            .groupEmblemId("2#5")
            .memberLimitCount(50)
            .assistantLimitCount(5)
            .build();

        GroupHistoryEntity historyEntity = mapper.of(entity);

        assertNull(historyEntity.getSeq(), "seq");

        assertEquals(entity.getGroupId(), historyEntity.getGroupId(), "groupId");
        assertEquals(entity.getGroupLeaderId(), historyEntity.getGroupLeaderId(), "groupLeaderId");
        assertEquals(entity.getGroupStatus(), historyEntity.getGroupStatus(), "groupStatus");
        assertEquals(entity.getGroupFullName(), historyEntity.getGroupFullName(), "groupFullName");
        assertEquals(entity.getGroupShortName(), historyEntity.getGroupShortName(), "groupShortName");
        assertEquals(entity.getGroupEmblemType(), historyEntity.getGroupEmblemType(), "groupEmblemType");
        assertEquals(entity.getGroupEmblemId(), historyEntity.getGroupEmblemId(), "groupEmblemId");
        assertEquals(entity.getMemberLimitCount(), historyEntity.getMemberLimitCount(), "memberLimitCount");
        assertEquals(entity.getAssistantLimitCount(), historyEntity.getAssistantLimitCount(), "assistantLimitCount");
    }
}
