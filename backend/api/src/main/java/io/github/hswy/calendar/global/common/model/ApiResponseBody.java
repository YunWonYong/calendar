package io.github.hswy.calendar.global.common.model;

import lombok.Getter;

@Getter
public class ApiResponseBody<T> {
    private final boolean ok;
    private final T data;
    private final String errorCode;

    private ApiResponseBody(T data) {
        this.ok = true;
        this.data = data;
        this.errorCode = null;
    }

    private ApiResponseBody(String errorCode) {
        this.ok = false;
        this.data = null;
        this.errorCode = errorCode;
    }

    public static <T> ApiResponseBody<T> success(T data) {
        return new ApiResponseBody<T>(data);
    }

    public static <T> ApiResponseBody<T> fail(String errorCode) {
        return new ApiResponseBody<T>(errorCode);
    }
}
