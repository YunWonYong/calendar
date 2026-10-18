package io.github.hswy.calendar.user.plan.exception;

import io.github.hswy.calendar.global.exception.ApplicationException;

public class UserPlanNotFoundException  extends ApplicationException {
    public UserPlanNotFoundException(Long userId) {
        super(
            "NOT_FOUND_USER_PLAN", 
            String.format(
                "not found user plan. key[userId = %s]",
                userId
            )
        );
    }
    
}
