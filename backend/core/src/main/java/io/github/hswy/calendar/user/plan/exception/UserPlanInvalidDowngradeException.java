package io.github.hswy.calendar.user.plan.exception;

import io.github.hswy.calendar.global.exception.ApplicationException;

public class UserPlanInvalidDowngradeException extends ApplicationException {
    public UserPlanInvalidDowngradeException(Long userId, Long oldPlanId, Long newPlanId) {
        super(
            "FAILED_DOWNGRADE_PLAN", 
            String.format(
                "failed plan downgrade. key[userId = %s, oldPlanId = %s, newPlanId = %s]",
                userId,
                oldPlanId,
                newPlanId
            )
        );
    }
    
}
