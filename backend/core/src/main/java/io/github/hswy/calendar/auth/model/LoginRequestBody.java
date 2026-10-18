package io.github.hswy.calendar.auth.model;

import jakarta.validation.constraints.NotBlank;

public record LoginRequestBody(
    @NotBlank String authCode,
    @NotBlank String deviceId,
    @NotBlank String deviceType
) {}