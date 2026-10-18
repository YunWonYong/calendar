package io.github.hswy.calendar.plan.benefit.exception;

import io.github.hswy.calendar.global.exception.ApplicationException;

public class PlanBenefitValueEmptyException extends ApplicationException {

    public PlanBenefitValueEmptyException(String expectedTypeName) {
        super(
            "EMPTY_PLAN_BENEFIT_VALUE",
            String.format(
                "plan benefit value empty. key[expectedType = %s]", 
                expectedTypeName
            )
        );
    }
}
