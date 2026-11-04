package io.github.hswy.calendar.security.config;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.ObjectProvider;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import io.github.hswy.calendar.security.filter.AccessTokenAuthenticationFilter;
import io.github.hswy.calendar.security.filter.TestUserInfoTokenFilter;
import io.github.hswy.calendar.security.handler.OAuth2FailureHandler;
import io.github.hswy.calendar.security.handler.OAuth2SuccessHandler;
import io.github.hswy.calendar.security.service.CustomOAuth2UserService;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final CustomOAuth2UserService customOauth2UserService;
    private final OAuth2SuccessHandler oAuth2SuccessHandler;
    private final OAuth2FailureHandler oAuth2FailureHandler;


    private final AccessTokenAuthenticationFilter accessTokenAuthenticationFilter;
    private final ObjectProvider<TestUserInfoTokenFilter> testUserInfoTokenFilterProvider;

    @Bean
    public FilterRegistrationBean<AccessTokenAuthenticationFilter> accessTokenFilterRegistration(AccessTokenAuthenticationFilter filter) {
        FilterRegistrationBean<AccessTokenAuthenticationFilter> registration = new FilterRegistrationBean<>(filter);
        registration.setEnabled(false);
        return registration;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .cors(Customizer.withDefaults())
            .formLogin(AbstractHttpConfigurer::disable)
            .httpBasic(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(auth ->
                auth
                    .requestMatchers(
                        accessTokenAuthenticationFilter.getPublicRequestUrls()
                    )
                    .permitAll()
                    .anyRequest()
                    .authenticated()
            )
            .oauth2Login(oauth2 ->
                oauth2
                    .userInfoEndpoint(
                        userInfo -> userInfo.userService(customOauth2UserService)
                    )
                    .successHandler(oAuth2SuccessHandler)
                    .failureHandler(oAuth2FailureHandler)
            );
        
        setupFilters(http);
        return http.build();
    }

    private void setupFilters(HttpSecurity http) {
        http.addFilterBefore(
            accessTokenAuthenticationFilter,
            UsernamePasswordAuthenticationFilter.class

        );
        testUserInfoTokenFilterProvider.ifAvailable(filter -> {
            http.addFilterBefore(
                filter,
                AccessTokenAuthenticationFilter.class
            );
        });
    }
}
