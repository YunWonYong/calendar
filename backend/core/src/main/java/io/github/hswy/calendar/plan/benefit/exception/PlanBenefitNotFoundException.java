package io.github.hswy.calendar.plan.benefit.exception;

import io.github.hswy.calendar.global.exception.ApplicationException;
import io.github.hswy.calendar.plan.benefit.PlanBenefitNames;

public class PlanBenefitNotFoundException extends ApplicationException {

    public PlanBenefitNotFoundException(Long planId, PlanBenefitNames benefitName) {
        super(
            "NOT_FOUND_PLAN_BENEFIT",
            String.format(
                "not found plan benefit. key[planId = %s, benefitName = %s]", 
                planId,
                benefitName.name()
            )
        );
    }
    
}
