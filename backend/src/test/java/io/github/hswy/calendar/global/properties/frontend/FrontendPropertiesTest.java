package io.github.hswy.calendar.global.properties.frontend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public abstract class FrontendPropertiesTest {
    @Autowired
    private FrontendProperties frontendProperties;

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
}
