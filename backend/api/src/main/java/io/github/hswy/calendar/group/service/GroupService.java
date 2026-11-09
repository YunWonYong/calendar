package io.github.hswy.calendar.group.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.hswy.calendar.group.GroupEntity;
import io.github.hswy.calendar.group.GroupProcessor;
import io.github.hswy.calendar.group.exception.GroupOwnedMemberLimitExceededException;
import io.github.hswy.calendar.group.exception.GroupSubLeaderLimitExceededException;
import io.github.hswy.calendar.group.model.GroupBasicRequestBody;
import io.github.hswy.calendar.group.model.GroupCreateResponseBody;
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

        if (basic.getMaxSubLeaderPlanId().getPlanId() > userPlanId) {
            throw new GroupSubLeaderLimitExceededException(
                userPlanId,
                basic.getMaxOwnedGroupMemberPlanId().getPlanId()
            );
        }

        if (basic.getMaxOwnedGroupMemberPlanId().getPlanId() > userPlanId) {
            throw new GroupOwnedMemberLimitExceededException(
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

        GroupEntity entity = GroupEntity.builder()
            .groupLeaderId(groupLeaderUserId)
            .groupFullName(basic.getFullName())
            .groupShortName(basic.getShortName())
            .subLeaderLimitCount(maxSubLeaders.value())
            .memberLimitCount(maxOwnedGroupMember.value())
            .groupVisibility(basic.getVisibilityType())
            .groupEmblemType(emblem.getType())
            .groupEmblemId(emblem.getId())
        .build();

        entity = groupProcessor.createGroup(entity);

        return new GroupCreateResponseBody(entity.getGroupId());
    }
}
