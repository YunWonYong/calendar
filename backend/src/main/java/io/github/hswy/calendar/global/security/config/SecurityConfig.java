package io.github.hswy.calendar.global.security.config;

import io.github.hswy.calendar.global.security.oauth2.handler.Oauth2FailureHandler;
import io.github.hswy.calendar.global.security.oauth2.handler.Oauth2SuccessHandler;
import io.github.hswy.calendar.global.security.oauth2.service.CustomOauth2UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final CustomOauth2UserService customOauth2UserService;
    private final Oauth2SuccessHandler oAuth2SuccessHandler;
    private final Oauth2FailureHandler oAuth2FailureHandler;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable)
                .httpBasic(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth ->
                    auth.requestMatchers(
                            "/login/**",
                            "/v3/api-docs/**",
                            "/swagger-ui/**",
                            "/swagger-ui.html"
                        )
                        .permitAll()
                        .anyRequest()
                        .authenticated()
                )
                .oauth2Login(oauth2 ->
                    oauth2.userInfoEndpoint(
                            userInfo -> userInfo.userService(customOauth2UserService)
                    )
                    .successHandler(oAuth2SuccessHandler)
                    .failureHandler(oAuth2FailureHandler)
                );
        return http.build();
    }
}
