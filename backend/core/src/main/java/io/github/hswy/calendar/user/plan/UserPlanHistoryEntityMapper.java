package io.github.hswy.calendar.user.plan;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import io.github.hswy.calendar.global.utils.HistoryEntityFieldMapper;

@Mapper(componentModel = "spring")
interface UserPlanHistoryEntityMapper extends HistoryEntityFieldMapper<UserPlanEntity, UserPlanHistoryEntity> {
    
    @Override
    @Mapping(target = "seq", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "reason", ignore = true)
    UserPlanHistoryEntity of(UserPlanEntity entity);
}
