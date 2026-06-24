package io.github.hswy.calendar.global.exception;

import lombok.Getter;

@Getter
public abstract class ApplicationException extends RuntimeException {
    private final String code;

    public ApplicationException(String code, String msg) {
        this(code, msg, null);
    }

    public ApplicationException(String code, String msg, Throwable e) {
        super(msg, e);
        this.code = code;
    }
}

