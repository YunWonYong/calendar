package io.github.hswy.calendar.global.properties.frontend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

import java.nio.charset.StandardCharsets;

import org.junit.jupiter.api.Test;

@SpringBootTest(
    classes = FrontendProperties.class
)
@EnableConfigurationProperties
public abstract class FrontendPropertiesTest {
    @Autowired
    private FrontendProperties frontendProperties;

    @Test
    public void TestInitProperties() {
        assertThat(frontendProperties).isNotNull();
        System.out.println(frontendProperties);
    }
    
    protected abstract void baseUrlTest();
    protected void baseUrlTest(String baseUrl) {
        assertThat(frontendProperties).isNotNull();
        assertThat(frontendProperties.getBaseUrl()).isEqualTo(baseUrl);
    }

    protected abstract void oauth2UrlsTest();
    protected void oauth2UrlsTest(String successUrl, String failureUrl) {
        assertThat(frontendProperties).isNotNull();
        assertThat(frontendProperties.getOauth2SuccessUrl()).isEqualTo(successUrl);
        assertThat(frontendProperties.getOauth2FailureUrl()).isEqualTo(failureUrl);
    }

    protected abstract void accessTokenTest();
    protected void accessTokenTest(boolean skipFlag) {
        if (skipFlag) {
            return;
        }
        assertThat(frontendProperties).isNotNull();

        AccessTokenProperties accessTokenProperties = frontendProperties.getAccessToken();
        assertThat(accessTokenProperties).isNotNull();

        String secret = accessTokenProperties.getJwtSecret();
        assertThat(secret).isNotEmpty();
        byte[] bytes = secret.getBytes(StandardCharsets.UTF_8);
        assertThat(bytes.length).isGreaterThanOrEqualTo(32);
        
        assertThat(accessTokenProperties.getJwtExpiredSeconds()).isNotZero();
        assertThat(accessTokenProperties.getRefreshExpiredSeconds()).isNotZero();
    }
}
