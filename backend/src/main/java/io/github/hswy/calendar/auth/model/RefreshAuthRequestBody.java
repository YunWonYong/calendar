package io.github.hswy.calendar.auth.model;

public record RefreshAuthRequestBody(
    Long id,
    String deviceId,
    String deviceType,
    String refreshToken
) {}