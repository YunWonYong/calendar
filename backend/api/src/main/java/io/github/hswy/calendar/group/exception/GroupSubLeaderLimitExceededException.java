package io.github.hswy.calendar.group.exception;

import io.github.hswy.calendar.global.exception.ApplicationException;

public class GroupSubLeaderLimitExceededException extends ApplicationException {
    public GroupSubLeaderLimitExceededException(Long userPlanId, Long requiredPlanId) {
        super(
            "LIMITED_USER_PLAN_SUB_LEADER_BENEFIT_VALUE",
            String.format(
                "User plan does not satisfy the required sub-leader benefit plan. key[userPlanId = %s, requiredPlanId = %s]",
                userPlanId,
                requiredPlanId
            )
        );
    }
}
