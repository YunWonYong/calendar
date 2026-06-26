package io.github.hswy.calendar.global.properties.frontend;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class AccessTokenProperties {
    private String jwtSecret;
    private int jwtExpiredSeconds;
    private int refreshExpiredSeconds;
}
