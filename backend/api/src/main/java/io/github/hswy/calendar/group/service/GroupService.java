package io.github.hswy.calendar.group.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.hswy.calendar.group.GroupEntity;
import io.github.hswy.calendar.group.GroupProcessor;
import io.github.hswy.calendar.group.exception.GroupCreationLimitExceededException;
import io.github.hswy.calendar.group.exception.GroupInvalidOwnedMemberBenefitPlanIdException;
import io.github.hswy.calendar.group.exception.GroupInvalidSubLeaderBenefitPlanIdException;
import io.github.hswy.calendar.group.model.GroupBasicRequestBody;
import io.github.hswy.calendar.group.model.GroupCreateResponseBody;
import io.github.hswy.calendar.group.model.GroupCreationAvailabilityDTO;
import io.github.hswy.calendar.group.model.GroupCreationPlanBenefitsDTO;
import io.github.hswy.calendar.group.model.GroupEmblemRequestBody;
import io.github.hswy.calendar.plan.benefit.PlanBenefitDTO;
import io.github.hswy.calendar.plan.benefit.PlanBenefitNames;
import io.github.hswy.calendar.plan.benefit.PlanBenefitProcessor;
import io.github.hswy.calendar.user.plan.UserPlanProcessor;
import lombok.RequiredArgsConstructor;

@Service 
@RequiredArgsConstructor 
public class GroupService {
    private final GroupProcessor groupProcessor;
    private final UserPlanProcessor userPlanProcessor;
    private final PlanBenefitProcessor planBenefitProcessor;

    @Transactional
    public GroupCreateResponseBody createGroup(Long groupLeaderUserId, GroupBasicRequestBody basic, GroupEmblemRequestBody emblem) {
        Long userPlanId = userPlanProcessor.getUserPlanIdForUpdate(groupLeaderUserId);
        GroupCreationAvailabilityDTO availabilityDTO = getGroupCreationAvailability(
            groupLeaderUserId,
            userPlanId
        );
        if (!availabilityDTO.available()) {
            throw new GroupCreationLimitExceededException(
                userPlanId,
                availabilityDTO.userActiveGroupCount(),
                availabilityDTO.maxCreateGroups()
            );
        }

        GroupCreationPlanBenefitsDTO planBenefitDTO = getGroupCreationPlanBenefits(
            userPlanId,
            basic
        );

        GroupEntity entity = groupProcessor.createGroup(
            GroupEntity
                .builder()
                    .groupLeaderId(groupLeaderUserId)
                    .groupFullName(basic.getFullName())
                    .groupShortName(basic.getShortName())
                    .subLeaderLimitCount(planBenefitDTO.maxSubLeaders())
                    .memberLimitCount(planBenefitDTO.maxOwnedGroupMember())
                    .groupVisibility(basic.getVisibilityType())
                    .groupEmblemType(emblem.getType())
                    .groupEmblemId(emblem.getId())
                .build()
        );

        return new GroupCreateResponseBody(entity.getGroupId());
    }

    private GroupCreationAvailabilityDTO  getGroupCreationAvailability(Long userId, Long userPlanId) {
        Long userActiveGroupCount = groupProcessor.getActiveGroupCountByUserId(userId);
        PlanBenefitDTO<Integer> maxCreateGroupsBenefitDTO = planBenefitProcessor.getPlanBenefit(
            userPlanId, 
            PlanBenefitNames.MAX_CREATED_GROUPS
        );

        Integer maxCreateGroups = maxCreateGroupsBenefitDTO.value();
        return new GroupCreationAvailabilityDTO(
            userActiveGroupCount,
            maxCreateGroups,
            userActiveGroupCount < maxCreateGroups
        );
    }

    private GroupCreationPlanBenefitsDTO getGroupCreationPlanBenefits(Long userPlanId, GroupBasicRequestBody basic) {
        if (basic.getMaxSubLeaderPlanId().getPlanId() > userPlanId) {
            throw new GroupInvalidSubLeaderBenefitPlanIdException(
                userPlanId,
                basic.getMaxSubLeaderPlanId().getPlanId()
            );
        }

        if (basic.getMaxOwnedGroupMemberPlanId().getPlanId() > userPlanId) {
            throw new GroupInvalidOwnedMemberBenefitPlanIdException(
                userPlanId,
                basic.getMaxOwnedGroupMemberPlanId().getPlanId()
            );
        }

        PlanBenefitDTO<Integer> maxSubLeaders = planBenefitProcessor.getPlanBenefit(
            basic.getMaxSubLeaderPlanId().getPlanId(),
            PlanBenefitNames.MAX_SUB_LEADERS
        );
        
        PlanBenefitDTO<Integer> maxOwnedGroupMember = planBenefitProcessor.getPlanBenefit(
            basic.getMaxOwnedGroupMemberPlanId().getPlanId(),
            PlanBenefitNames.MAX_OWNED_GROUP_MEMBERS
        );
        return new GroupCreationPlanBenefitsDTO(
            maxSubLeaders.value(),
            maxOwnedGroupMember.value()
        );
    }
}
