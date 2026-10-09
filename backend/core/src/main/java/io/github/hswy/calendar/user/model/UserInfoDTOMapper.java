package io.github.hswy.calendar.user.model;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import io.github.hswy.calendar.plan.enums.PlanType;
import io.github.hswy.calendar.user.plan.UserPlanEntity;
import io.github.hswy.calendar.user.profile.UserProfileEntity;

@Mapper(componentModel = "spring")
public interface UserInfoDTOMapper {
    
    @Mapping(target = "id", source = "profileEntity.userId")
    @Mapping(target = "planId", source = "planEntity.planId")
    @Mapping(target = "planType", source = "planEntity.planId", qualifiedByName = "toPlanType")
    UserInfoDTO  toDTO(
        UserProfileEntity profileEntity,
        UserPlanEntity planEntity
    );

    @Named("toPlanType")
    default PlanType toPlanType(long planId) {
        return PlanType.fromPlanId(planId);
    }
}