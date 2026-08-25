package io.github.hswy.calendar.auth.exception;

import io.github.hswy.calendar.global.exception.model.UnauthorizedException;

public class RefreshTokenExpiredException extends UnauthorizedException {
    public RefreshTokenExpiredException(Long userId, Long ttl) {
        this(userId, ttl, null);
    }

    public RefreshTokenExpiredException(Long userId, Long ttl, Throwable e) {
        this(
            String.format(
                "invalid refresh token. key[userId = %d, ttl = %s]",
                userId,
                ttl == null? "null": ttl.toString()
            ),
            e
        );
    }

    private RefreshTokenExpiredException(String msg, Throwable e) {
        super("INVALID_REFRESH_TOKEN", msg, e);
    }
}
