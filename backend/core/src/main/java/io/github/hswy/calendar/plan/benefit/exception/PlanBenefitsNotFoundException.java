package io.github.hswy.calendar.plan.benefit.exception;

import io.github.hswy.calendar.global.exception.ApplicationException;

public class PlanBenefitsNotFoundException extends ApplicationException {

    public PlanBenefitsNotFoundException(Long planId) {
        super(
            "NOT_FOUND_PLAN_BENEFIT_ENTITY",
            String.format(
                "not found plan benefit entity. key[planId = %s]", 
                planId
            )
        );
    }
    
}
