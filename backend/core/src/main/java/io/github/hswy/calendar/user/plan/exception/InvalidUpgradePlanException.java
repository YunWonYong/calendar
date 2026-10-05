package io.github.hswy.calendar.user.plan.exception;

import io.github.hswy.calendar.global.exception.ApplicationException;

public class InvalidUpgradePlanException extends ApplicationException {
    public InvalidUpgradePlanException(Long oldPlanId, Long newPlanId) {
        super(
            "FAILED_UPGRADE_PLAN", 
            String.format(
                "failed plan upgrade. key[oldPlanId = %s, newPlanId = %s]",
                oldPlanId,
                newPlanId
            )
        );
    }
    
}
