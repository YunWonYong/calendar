package io.github.hswy.calendar.auth.provider;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Map;

import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import io.github.hswy.calendar.global.properties.frontend.FrontendProperties;
import io.jsonwebtoken.Claims;

@SpringBootTest(
    classes = {
        FrontendProperties.class,
        JWTProvider.class,
    }
)
@EnableConfigurationProperties
@Tag("local")
@ActiveProfiles("local")
public class JWTProviderTest {
    
    @Autowired
    private JWTProvider jwtProvider;

    @Test
    public void testInitJWTProvider() {
        assertThat(jwtProvider).isNotNull();
    }

    @Test
    public void testMakeJWT() {
        Long userId = -1L;
        String jwt = jwtProvider.generate(userId.toString(), null);
        assertThat(jwt).isNotBlank();
        Claims claims = jwtProvider.parseJWT(jwt);
        Object sub = claims.getSubject();
        Object iss = claims.getIssuer();
        assertThat(iss).isEqualTo("our-calendar");
        assertThat(sub).isEqualTo(userId.toString());
        assertThat(claims.getIssuedAt()).isNotNull();
        assertThat(claims.getExpiration()).isAfter(claims.getIssuedAt());
    }

    @Test
    public void testMakeJWTWithClaims() {
        Long userId = -1L;
        String jwt = jwtProvider.generate(
            userId.toString(),
            Map.of(
                "test", "test1",
                "test2", "test3"
            )
        );
        
        Claims claims = jwtProvider.parseJWT(jwt);
        Object sub = claims.getSubject();
        Object iss = claims.getIssuer();
        Object test = claims.get("test");
        Object test2 = claims.get("test2");
        assertThat(iss).isEqualTo("our-calendar");
        assertThat(sub).isEqualTo(userId.toString());
        assertThat(test).isEqualTo("test1");
        assertThat(test2).isEqualTo("test3");
        assertThat(claims.getIssuedAt()).isNotNull();
        assertThat(claims.getExpiration()).isAfter(claims.getIssuedAt());
    }
}
