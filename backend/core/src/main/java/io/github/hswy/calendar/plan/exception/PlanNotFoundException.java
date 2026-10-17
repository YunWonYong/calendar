package io.github.hswy.calendar.plan.exception;

import io.github.hswy.calendar.global.exception.ApplicationException;

public class PlanNotFoundException extends ApplicationException {

    public PlanNotFoundException(Long planId) {
        super(
            "NOT_FOUND_PLAN_ENTITY",
            String.format(
                "not found plan entity. key[planId = %s]", 
                planId
            )
        );
    }
    
}
