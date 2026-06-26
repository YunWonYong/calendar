package io.github.hswy.calendar.users.exception;

import io.github.hswy.calendar.global.common.enums.Platform;
import io.github.hswy.calendar.global.exception.ApplicationException;

public class UserNotFoundException extends ApplicationException {
    public UserNotFoundException(Long userId) {
        this(
            String.format("not found user data from db. key[userId = %d]", userId),
            null
        );
    }

    public UserNotFoundException(Platform platform, String platformId) {
        this(platform, platformId, null);
    }

    public UserNotFoundException(Platform platform, String platformId, Throwable cause) {
        this(
            String.format(
                "not found user data from db. key[platform = %s, platformId = %s]", 
                platform.name(), 
                platformId
            ),
            cause
        );
    }

    private UserNotFoundException(String msg, Throwable cause) {
        super(
            "USER_NOT_FOUND",
            msg,
            cause
        );
    }
}
