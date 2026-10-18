package io.github.hswy.calendar.user.exception;

import io.github.hswy.calendar.global.exception.ApplicationException;

public class UserNotFoundException extends ApplicationException {
    public UserNotFoundException(Long userId) {
        super(
            "NOT_FOUND_USER",
            String.format(
                "not found user entity. key[userId = %s]", 
                userId
            )
        );
    }
}
