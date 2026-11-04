package io.github.hswy.calendar.security.filter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import io.github.hswy.calendar.auth.exception.AccessTokenInvalidException;
import io.github.hswy.calendar.auth.service.AccessTokenService;
import io.github.hswy.calendar.global.env.Env;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Component 
@Slf4j
public class AccessTokenAuthenticationFilter extends OncePerRequestFilter {
    private final Env env;
    private final AccessTokenService accessTokenService;
    private final List<String> publicRequestUrls;

    private final AntPathMatcher pathMatcher;

    public AccessTokenAuthenticationFilter(Env env, AccessTokenService accessTokenService) {
        this.env = env;
        this.accessTokenService = accessTokenService;
        publicRequestUrls = getPublicRequestUrlList();
        pathMatcher = new AntPathMatcher();
    }

    public String[] getPublicRequestUrls() {
        return publicRequestUrls.toArray(String[]::new);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path = request.getServletPath();
        // request.getRequestURI();  /api/plans
        // request.getContextPath(); /api
        // request.getServletPath(); /plans
        return publicRequestUrls
            .stream()
            .anyMatch(pattern -> pathMatcher.match(pattern, path));
    }


    @Override 
    protected void doFilterInternal(
        HttpServletRequest request,
        HttpServletResponse response,
        FilterChain filterChain
    ) throws ServletException, IOException {
        log.debug("AccessTokenAuthenticationFilter executed: {}", request.getRequestURI());
        String authorization = request.getHeader("Authorization");

        try {
            Authentication authentication = accessTokenService.validation(authorization);
            log.debug(
                "Validated authentication: type={}, authenticated={}",
                authentication.getClass().getName(),
                authentication.isAuthenticated()
            );
            SecurityContext context = SecurityContextHolder.createEmptyContext();
            context.setAuthentication(authentication);
            SecurityContextHolder.setContext(context);

            log.debug(
                "SecurityContext authentication: {}",
                SecurityContextHolder.getContext().getAuthentication()
            );
            filterChain.doFilter(request, response);
        } catch(AccessTokenInvalidException e) {
            log.error(
                "Access token authentication failed. uri={}, message={}",
                request.getRequestURI(),
                e.getMessage()
            );

            response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
        }
    }

    private List<String> getPublicRequestUrlList() {
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

        if (env.isLocal()) {
            log.debug("Public request URLs: {}", urls);
        }

        return urls;
    }

}
