package io.github.hswy.calendar.auth.model;

public record LoginRequestBody(String authCode, String deviceId, String deviceName) {}
