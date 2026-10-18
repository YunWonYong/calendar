package io.github.hswy.calendar.auth.exception;

import io.github.hswy.calendar.global.exception.model.UnauthorizedException;

public class RefreshTokenMismatchException extends UnauthorizedException {
    
    public RefreshTokenMismatchException(Long userId, String deviceId) {
        this(userId, deviceId, null);
    }

    public RefreshTokenMismatchException(Long userId, String deviceId, Throwable e) {
        this(
            String.format(
                "mismatched refresh token. key[userId = %d, deviceId = %s]",
                userId,
                deviceId
            ),
            e
        );
    }

    private RefreshTokenMismatchException(String msg, Throwable e) {
        super("MISMATCHED_REFRESH_TOKEN", msg, e);
    }
}
