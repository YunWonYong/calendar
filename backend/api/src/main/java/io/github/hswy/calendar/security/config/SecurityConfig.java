package io.github.hswy.calendar.security.config;

import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.ObjectProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import io.github.hswy.calendar.global.env.Env;
import io.github.hswy.calendar.security.filter.TestUserInfoTokenFilter;
import io.github.hswy.calendar.security.handler.OAuth2FailureHandler;
import io.github.hswy.calendar.security.handler.OAuth2SuccessHandler;
import io.github.hswy.calendar.security.service.CustomOAuth2UserService;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final Env env;
    private final CustomOAuth2UserService customOauth2UserService;
    private final OAuth2SuccessHandler oAuth2SuccessHandler;
    private final OAuth2FailureHandler oAuth2FailureHandler;


    private final ObjectProvider<TestUserInfoTokenFilter> testUserInfoTokenFilterProvider;

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
                        getPublicRequestUrls()
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

    private String[] getPublicRequestUrls() {
        List<String> urls = new ArrayList<>(
            List.of(
                "/oauth2/**",
                "/login/**",
                "/auth",
                "/auth/**",
                "/plans",
                "/plans/**"
            )
        );

        if (env.isLocal()) {
            urls.add("/test/oauth/**");
        }

        if (!env.isProd()) {
            urls.add("/v3/api-docs/**");
            urls.add("/swagger-ui/**");
            urls.add("/swagger-ui.html");
        }

        String[] urlArr = new String[urls.size()];
        int i = 0;
        
        StringBuffer sb = new StringBuffer();
        sb.append("==== public urls ====").append("\n");
        for (String url : urls) {
            urlArr[i++] = url;
            sb.append("  ").append(url).append("\n");
        }
        
        sb.append("=====================");
        if (env.isLocal()) {
            System.out.println(sb);
        }
        return urlArr;
    }

    private void setupFilters(HttpSecurity http) {
        testUserInfoTokenFilterProvider.ifAvailable(filter -> {
            http.addFilterBefore(
                filter,
                UsernamePasswordAuthenticationFilter.class
            );
        });
    }
}
