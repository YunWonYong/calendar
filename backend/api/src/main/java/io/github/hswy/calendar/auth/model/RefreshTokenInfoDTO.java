package io.github.hswy.calendar.auth.model;

public record RefreshTokenInfoDTO (Long userId, String userIdStr, boolean shouldRotate) {}
