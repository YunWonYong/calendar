package io.github.hswy.calendar.test.oauth.model;

import org.springframework.context.annotation.Profile;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.jackson.Jacksonized;

@Getter 
@Builder 
@Jacksonized
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Profile("local")
public class TestOAuthDTO {
    private final String redirectUri;
    private final String state;

    @Setter
    private String identity;
}
