package io.github.hswy.calendar.global.exception.handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import io.github.hswy.calendar.global.common.model.ApiResponseBody;
import io.github.hswy.calendar.global.exception.model.ApplicationException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ApplicationException.class)
    public ResponseEntity<ApiResponseBody<Void>> handleApplicationException(ApplicationException e, HttpServletRequest request) {
        log.error(
            "GlobalExceptionHandler type: {}, method: {}, url: {}, errorCode: {}, errorMessage: {}", 
            "custom",
            request.getMethod(),
            request.getRequestURI(),
            e.getCode(),
            e.getMessage(),
            e
        );
        
        return ResponseEntity
            .status(e.getStatus())
            .body(ApiResponseBody.fail(e.getCode()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponseBody<Void>> handleException(Exception e, HttpServletRequest request) {
        log.error(
            "GlobalExceptionHandler type: {}, method: {}, url: {}, errorMessage: {}", 
            "unexpected",
            request.getMethod(),
            request.getRequestURI(),
            e.getMessage(),
            e
        );

        return ResponseEntity
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(ApiResponseBody.fail("INTERNAL_SERVER_ERROR"));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponseBody<Void>> handleValidationException(MethodArgumentNotValidException e, HttpServletRequest request) {
        log.error(
            "GlobalExceptionHandler type: {}, method: {}, url: {}, errorMessage: {}",
            "validation",
            request.getMethod(),
            request.getRequestURI(),
            e.getMessage()
        );

        return ResponseEntity
            .badRequest()
            .body(ApiResponseBody.fail("INVALID_REQUEST"));
    }
}