package io.github.hswy.calendar.plan.benefit.exception;

import io.github.hswy.calendar.global.exception.ApplicationException;

public class PlanBenefitValueInvalidException extends ApplicationException {
    public PlanBenefitValueInvalidException(String value, String expectedTypeName) {
        this(value, expectedTypeName, null);
    }

    public PlanBenefitValueInvalidException(String value, String expectedTypeName, Throwable e) {
        super(
            "INVALID_PLAN_BENEFIT_VALUE",
            String.format(
                "invalid plan benefit value. key[value = %s, expectedType = %s]", 
                value,
                expectedTypeName
            ),
            e
        );
    }
}
