package io.github.hswy.calendar.plan.benefit.exception;

import io.github.hswy.calendar.global.exception.ApplicationException;

public class PlanBenefitNotFoundException extends ApplicationException {

    public PlanBenefitNotFoundException(Long planId) {
        super(
            "NOT_FOUND_PLAN_BENEFIT_ENTITY",
            String.format(
                "not found plan benefit entity. key[planId = %s]", 
                planId
            )
        );
    }
    
}
