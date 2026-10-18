package io.github.hswy.calendar.auth.exception;

import io.github.hswy.calendar.global.exception.ApplicationException;

public class RefreshTokenGenerateException extends ApplicationException {
    
    public RefreshTokenGenerateException(Long userId, String deviceId, int result) {
        this(userId, deviceId, result, null);
    }

    public RefreshTokenGenerateException(Long userId, String deviceId, int result, Throwable e) {
        this(
            String.format(
                "Failed to refresh token generate. key[userId = %d, deviceId = %s] hint[redisTxResult = %d]",
                userId,
                deviceId,
                result
            ),
            e
        );
    }

    private RefreshTokenGenerateException(String msg, Throwable e) {
        super("FAILED_TO_REFRESH_TOKEN_GENERATE", msg, e);
    }
}
