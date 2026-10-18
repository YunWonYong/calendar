package io.github.hswy.calendar.global.exception.model;

import org.springframework.http.HttpStatus;

import lombok.Getter;

@Getter
public abstract class ApplicationException extends RuntimeException {
    private final String code;
    private final HttpStatus status;

    public ApplicationException(String code, String msg) {
        this(code, msg, null);
    }

    public ApplicationException(String code, String msg, Throwable e) {
        this(code, msg, HttpStatus.INTERNAL_SERVER_ERROR, e);
    }
    
    public ApplicationException(String code, String msg, HttpStatus status, Throwable e) {
        super(msg, e);
        this.code = code;
        this.status = status;
    }
}

