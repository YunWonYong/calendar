package io.github.hswy.calendar.auth.provider;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;
import java.util.Map;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import io.github.hswy.calendar.global.properties.frontend.AccessTokenProperties;
import io.github.hswy.calendar.global.properties.frontend.FrontendProperties;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JWTProvider {
    private final AccessTokenProperties accessTokenProperties;
    private final SecretKey secretKey; 

    public JWTProvider(@Autowired FrontendProperties frontendProperties) {
        this.accessTokenProperties = frontendProperties.getAccessToken();
        this.secretKey = Keys.hmacShaKeyFor(
            this.accessTokenProperties
                .getJwtSecret()
                .getBytes(StandardCharsets.UTF_8)
        );
    }

    public String generate(String subject, Map<String, Object> claims) {
        JwtBuilder jwtBuilder = makeJwtBuilder(subject);
        if (claims != null && !claims.isEmpty()) {
            jwtBuilder = jwtBuilder
                .claims()
                .add(claims)
                .and();
        }

        return jwtBuilder.compact();
    }

    public Claims parseJWT(String jwt) {
        return Jwts.parser()
            .verifyWith(secretKey)
            .build()
            .parseSignedClaims(jwt)
            .getPayload();
    }

    private JwtBuilder makeJwtBuilder(String subject) {
        Instant now = Instant.now();
        return Jwts
            .builder()
            .issuer("our-calendar")
            .subject(subject)
            .issuedAt(Date.from(now))
            .expiration(
                Date.from(
                    now.plusSeconds(
                        accessTokenProperties.getJwtExpiredSeconds()
                    )
                )
            )
            .signWith(
                secretKey
            );
    }
}
