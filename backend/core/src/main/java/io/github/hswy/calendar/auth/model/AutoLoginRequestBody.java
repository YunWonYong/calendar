package io.github.hswy.calendar.auth.model;

import jakarta.validation.constraints.NotBlank;

public record AutoLoginRequestBody(
    @NotBlank String refreshToken, 
    @NotBlank String deviceId, 
    @NotBlank String deviceType
) {}