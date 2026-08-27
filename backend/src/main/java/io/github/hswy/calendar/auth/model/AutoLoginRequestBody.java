package io.github.hswy.calendar.auth.model;

public record AutoLoginRequestBody(
    String refreshToken, 
    String deviceId, 
    String deviceType
) {}