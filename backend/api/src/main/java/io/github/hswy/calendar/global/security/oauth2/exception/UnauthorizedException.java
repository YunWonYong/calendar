package io.github.hswy.calendar.global.security.oauth2.exception;

import org.springframework.http.HttpStatus;

import io.github.hswy.calendar.global.exception.ApplicationException;

public class UnauthorizedException extends ApplicationException {
    public UnauthorizedException(String code, String msg) {
        this(code, msg, null);
    }
    
    public UnauthorizedException(String code, String msg, Throwable e) {
        super(code, msg, HttpStatus.UNAUTHORIZED, e);
    }
}
