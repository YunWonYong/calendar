package io.github.hswy.calendar.auth.exception;

import io.github.hswy.calendar.common.exception.UnauthorizedException;

public class AccessTokenInvalidException extends UnauthorizedException {
    public AccessTokenInvalidException(String msg) {
        this(msg, null);
    }

    public AccessTokenInvalidException(String msg, Throwable e) {
        super(
            "UNAUTHORIZED",
            msg,
            e
        );
    }
}
