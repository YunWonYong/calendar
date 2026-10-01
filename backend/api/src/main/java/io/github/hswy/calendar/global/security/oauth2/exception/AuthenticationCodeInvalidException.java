package io.github.hswy.calendar.global.security.oauth2.exception;

import io.github.hswy.calendar.global.exception.ApplicationException;

public class AuthenticationCodeInvalidException extends ApplicationException {
    public AuthenticationCodeInvalidException(String authCode) {
        this(
            String.format(
                "invalid auth code. key[code = %s]",
                authCode
            ),
            null
        );
    }

    public AuthenticationCodeInvalidException(String authCode, String value, Throwable cause) {
        this(
            String.format(
                "invalid auth code. key[code = %s, value = %s]",
                authCode,
                value
            ),
            cause
        );
    }
    
    private AuthenticationCodeInvalidException(String msg, Throwable cause) {
        super(
            "AUTH_CODE_INVALID", 
            msg, 
            cause
        );
    }
}
