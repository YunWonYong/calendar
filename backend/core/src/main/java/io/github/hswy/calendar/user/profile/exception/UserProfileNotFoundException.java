package io.github.hswy.calendar.user.profile.exception;

import io.github.hswy.calendar.global.exception.ApplicationException;

public class UserProfileNotFoundException extends ApplicationException {
    public UserProfileNotFoundException(Long userId) {
        super(
            "NOT_FOUND_USER_PROFILE",
            String.format(
                "not found user profile entity. key[userId = %s]", 
                userId
            )
        );
    }
}
