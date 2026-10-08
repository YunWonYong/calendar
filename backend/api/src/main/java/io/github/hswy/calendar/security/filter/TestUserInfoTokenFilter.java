package io.github.hswy.calendar.security.filter;

import java.io.IOException;
import java.util.List;

import org.springframework.context.annotation.Profile;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.github.hswy.calendar.test.oauth.service.TestOAuthService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component 
@RequiredArgsConstructor 
@Profile("local")
public class TestUserInfoTokenFilter extends OncePerRequestFilter {
    private final TestOAuthService service;

    @Override 
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        return !"/test/oauth/userinfo".equals(request.getRequestURI());
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            service.invalidAccessToken(token);
            SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken(
                    token, 
                    null, 
                    List.of(
                        new SimpleGrantedAuthority("ROLE_USER")
                    )
                )
            );
        }

        filterChain.doFilter(request, response);
    }
}
