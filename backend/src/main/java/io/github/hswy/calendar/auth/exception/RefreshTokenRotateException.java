package io.github.hswy.calendar.auth.exception;

import io.github.hswy.calendar.global.exception.ApplicationException;

public class RefreshTokenRotateException extends ApplicationException {
    
    public RefreshTokenRotateException(Long userId, String deviceId, Long result) {
        this(userId, deviceId, result, null);
    }

    public RefreshTokenRotateException(Long userId, String deviceId, Long result, Throwable e) {
        this(
            String.format(
                "Failed to refresh token rotate. key[userId = %d, deviceId = %s] hint[luaScriptResult = %s]",
                userId,
                deviceId,
                result == null
                    ? "null"
                    : result.toString()
            ),
            e
        );
    }

    private RefreshTokenRotateException(String msg, Throwable e) {
        super("FAILED_TO_REFRESH_TOKEN_ROTATE", msg, e);
    }
}
