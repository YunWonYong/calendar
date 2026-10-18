package io.github.hswy.calendar.group.member;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import io.github.hswy.calendar.global.utils.HistoryEntityFieldMapper;

@Mapper(componentModel = "spring")
interface GroupMemberHistoryEntityMapper extends HistoryEntityFieldMapper<GroupMemberEntity, GroupMemberHistoryEntity> {
    
    @Override
    @Mapping (target = "seq", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "reason", ignore = true)
    @Mapping(target = "userId", ignore = true)
    @Mapping(target = "groupId", ignore = true)
    GroupMemberHistoryEntity of(GroupMemberEntity entity);
}
