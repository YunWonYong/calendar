package io.github.hswy.calendar.user.plan.purchase;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import io.github.hswy.calendar.global.utils.HistoryEntityFieldMapper;

@Mapper(componentModel = "spring")
interface UserPlanPurchaseHistoryEntityMapper extends HistoryEntityFieldMapper<UserPlanPurchaseEntity, UserPlanPurchaseHistoryEntity> {
    
    @Override
    @Mapping(target = "seq", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    UserPlanPurchaseHistoryEntity of(UserPlanPurchaseEntity entity);
}
