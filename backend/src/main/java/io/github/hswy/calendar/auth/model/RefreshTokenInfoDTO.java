package io.github.hswy.calendar.auth.model;

public record RefreshTokenInfoDTO (String userIdStr, boolean shouldRotate) {}
