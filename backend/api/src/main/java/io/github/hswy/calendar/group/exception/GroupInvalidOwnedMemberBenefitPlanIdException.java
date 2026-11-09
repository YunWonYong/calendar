package io.github.hswy.calendar.group.exception;

import io.github.hswy.calendar.global.exception.ApplicationException;

public class GroupInvalidOwnedMemberBenefitPlanIdException extends ApplicationException {
    public GroupInvalidOwnedMemberBenefitPlanIdException(Long userPlanId, Long requiredPlanId) {
        super(
            "INVALID_OWNED_MEMBER_BENEFIT_PLAN_ID",
            String.format(
                "User requested an owned-member benefit plan higher than their current plan. key[userPlanId = %s, requiredPlanId = %s]",
                userPlanId,
                requiredPlanId
            )
        );
    }
}
