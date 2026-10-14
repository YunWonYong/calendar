package io.github.hswy.calendar.plan.benefit.exception;

import io.github.hswy.calendar.global.exception.ApplicationException;

public class PlanBenefitValueCastingException extends ApplicationException {

    public PlanBenefitValueCastingException(String benefitName, Throwable e) {
        super(
            "FAILED_PLAN_BENEFIT_VALUE_CASTING",
            String.format(
                "failed plan benefit value casting. key[name = %s]", 
                benefitName
            )
        );
    }
    
}
