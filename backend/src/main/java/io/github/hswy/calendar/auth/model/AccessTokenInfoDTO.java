package io.github.hswy.calendar.auth.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class AccessTokenInfoDTO {
    private final String jwt;
    private final String refreshToken;
}
