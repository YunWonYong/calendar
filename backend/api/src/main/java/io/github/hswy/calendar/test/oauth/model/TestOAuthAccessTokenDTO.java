package io.github.hswy.calendar.test.oauth.model;

import java.time.Duration;

import org.springframework.context.annotation.Profile;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.extern.jackson.Jacksonized;

@Getter
@Builder
@Jacksonized
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Profile("local")
public class TestOAuthAccessTokenDTO {
    @JsonProperty("access_token")
    private final String accessToken;
    
    @JsonProperty("token_type")
    private final String tokenType;

    @JsonFormat(shape = JsonFormat.Shape.NUMBER_INT)
    @JsonProperty("expires_in")
    private final Duration expiresIn;

}
