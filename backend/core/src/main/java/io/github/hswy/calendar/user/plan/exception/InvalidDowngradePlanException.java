package io.github.hswy.calendar.user.plan.exception;

import io.github.hswy.calendar.global.exception.ApplicationException;

public class InvalidDowngradePlanException extends ApplicationException {
    public InvalidDowngradePlanException(Long oldPlanId, Long newPlanId) {
        super(
            "FAILED_DOWNGRADE_PLAN", 
            String.format(
                "failed plan downgrade. key[oldPlanId = %s, newPlanId = %s]",
                oldPlanId,
                newPlanId
            )
        );
    }
    
}
