package io.github.hswy.calendar.users.exception;

import io.github.hswy.calendar.global.common.enums.Platform;
import io.github.hswy.calendar.global.exception.ApplicationException;

public class UserProfileNotFoundException extends ApplicationException {
    public UserProfileNotFoundException(Long userId) {
        this(
            String.format("not found user profile data from db. key[userId = %d]", userId),
            null
        );
    }
    
    public UserProfileNotFoundException(Platform platform, String platformId) {
        this(
            String.format("not found user profile data from db. key[platform = %s, platformId = %s]", platform.name(), platformId),
            null
        );
    }

    private UserProfileNotFoundException(String msg, Throwable cause) {
        super(
            "USER_PROFILE_NOT_FOUND",
            msg,
            cause
        );
    }
}
