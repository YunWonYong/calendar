package io.github.hswy.calendar.plan.benefit.exception;

import io.github.hswy.calendar.global.exception.ApplicationException;

public class PlanBenefitValueTypeMismatchException extends ApplicationException {
    public PlanBenefitValueTypeMismatchException(String value, String expectedTypeName, String targetName) {
        super(
            "MISMATCH_PLAN_BENEFIT_VALUE_TYPE",
            String.format(
                "plan benefit value type mismatch. key[value = %s, expectedType = %s, targetType = %s]", 
                value,
                expectedTypeName,
                targetName
            )
        );
    }
    
}
