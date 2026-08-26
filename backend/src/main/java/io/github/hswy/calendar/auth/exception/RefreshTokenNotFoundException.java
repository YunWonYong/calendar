package io.github.hswy.calendar.auth.exception;

import io.github.hswy.calendar.global.exception.model.UnauthorizedException;

public class RefreshTokenNotFoundException extends UnauthorizedException {
    
    public RefreshTokenNotFoundException(Long userId) {
        this(userId, null);
    }

    public RefreshTokenNotFoundException(Long userId, Throwable e) {
        super(
            "NOT_FOUND_REFRESH_TOKEN", 
            String.format(
                "refresh token not found. key[userId = %s]",
                userId.toString()
            ), 
            e
        );
    }
}
