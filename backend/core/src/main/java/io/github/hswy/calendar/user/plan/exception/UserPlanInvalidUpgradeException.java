package io.github.hswy.calendar.user.plan.exception;

import io.github.hswy.calendar.global.exception.ApplicationException;

public class UserPlanInvalidUpgradeException extends ApplicationException {
    public UserPlanInvalidUpgradeException(Long userId, Long oldPlanId, Long newPlanId) {
        super(
            "FAILED_UPGRADE_PLAN", 
            String.format(
                "failed plan upgrade. key[userId = %s, oldPlanId = %s, newPlanId = %s]",
                userId,
                oldPlanId,
                newPlanId
            )
        );
    }
    
}
