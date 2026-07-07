package io.github.hswy.calendar.global.security.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import io.github.hswy.calendar.global.properties.frontend.FrontendProperties;
import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class CorsConfig {
    private final FrontendProperties frontendProperties;

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        
        config.setAllowedMethods(getAllowedMethods());
        config.setAllowedHeaders(getAllowedHeaders());
        config.setAllowedOrigins(getOrigins());
        config.setAllowCredentials(true);
        
        // Cache CORS preflight response for 1 hour.
        config.setMaxAge(3600L);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    private List<String> getAllowedMethods() {
        return List.of(
            HttpMethod.GET.toString(),
            HttpMethod.POST.toString(),
            HttpMethod.PUT.toString(),
            HttpMethod.PATCH.toString(),
            HttpMethod.DELETE.toString(),
            HttpMethod.OPTIONS.toString()
        );
    }

    private List<String> getAllowedHeaders() {
        return List.of("*");
    }

    private List<String> getOrigins() {
        return List.of(
            frontendProperties.getBaseUrl()
        );
    }
}
