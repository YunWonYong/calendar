package io.github.hswy.calendar.auth.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record RefreshAuthRequestBody(
    @NotNull Long id,
    @NotBlank String deviceId,
    @NotBlank String deviceType,
    @NotBlank String refreshToken
) {}