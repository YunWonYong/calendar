package io.github.hswy.calendar.auth.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class AuthTokenInfoDTO {
    private final String accessToken;
    private final String refreshToken;
}
