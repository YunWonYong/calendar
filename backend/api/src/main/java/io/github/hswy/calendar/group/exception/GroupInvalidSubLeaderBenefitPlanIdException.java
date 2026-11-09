package io.github.hswy.calendar.group.exception;

import io.github.hswy.calendar.global.exception.ApplicationException;

public class GroupInvalidSubLeaderBenefitPlanIdException extends ApplicationException {
    public GroupInvalidSubLeaderBenefitPlanIdException(Long userPlanId, Long requiredPlanId) {
        super(
            "INVALID_SUB_LEADER_BENEFIT_PLAN_ID",
            String.format(
                "User requested a sub-leader benefit plan higher than their current plan. key[userPlanId = %s, requiredPlanId = %s]",
                userPlanId,
                requiredPlanId
            )
        );
    }
}
