package io.github.hswy.calendar.group;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import io.github.hswy.calendar.global.utils.HistoryEntityFieldMapper;

@Mapper(componentModel = "spring")
interface GroupHistoryEntityMapper extends HistoryEntityFieldMapper<GroupEntity, GroupHistoryEntity> {
    
    @Override
    @Mapping(target = "seq", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    GroupHistoryEntity of(GroupEntity entity);
}
