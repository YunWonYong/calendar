package io.github.hswy.calendar.group.exception;

import io.github.hswy.calendar.global.exception.ApplicationException;

public class GroupOwnedMemberLimitExceededException extends ApplicationException {
    public GroupOwnedMemberLimitExceededException(Long userPlanId, Long requiredPlanId) {
        super(
            "LIMITED_USER_PLAN_OWNED_MEMBER_BENEFIT_VALUE",
            String.format(
                "User plan does not satisfy the required owned-member benefit plan. key[userPlanId = %s, requiredPlanId = %s]",
                userPlanId,
                requiredPlanId
            )
        );
    }
}
