package io.github.hswy.calendar.global.exception.model;

import org.springframework.http.HttpStatus;

public class UnauthorizedException extends ApplicationException {
    public UnauthorizedException(String code, String msg) {
        this(code, msg, null);
    }
    
    public UnauthorizedException(String code, String msg, Throwable e) {
        super(code, msg, HttpStatus.UNAUTHORIZED, e);
    }
}
