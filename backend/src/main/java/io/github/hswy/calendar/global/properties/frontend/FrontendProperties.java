package io.github.hswy.calendar.global.properties.frontend;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Setter
@Configuration
@ConfigurationProperties(prefix = "front-end")
@ToString
public class FrontendProperties {
    @Getter
    private String baseUrl;
    @Getter(AccessLevel.PROTECTED)
    private PathProperties paths;
    @Getter
    private AccessTokenProperties accessToken;

    public String getOauth2SuccessUrl() {
        return this.makeUrl(paths.getOauth2().getSuccessPath());
    }

    public String getOauth2FailureUrl() {
        return this.makeUrl(paths.getOauth2().getFailurePath());
    }

    private String makeUrl(String path) {
        String baseUrl = this.getBaseUrl();
        if (baseUrl.endsWith("/")) {
            baseUrl = baseUrl.substring(0, baseUrl.length() - 1);
        }
        return baseUrl + (path.startsWith("/")? path: "/" + path);
    }
}
