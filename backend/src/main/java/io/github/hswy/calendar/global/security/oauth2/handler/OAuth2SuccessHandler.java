package io.github.hswy.calendar.global.security.oauth2.handler;

import io.github.hswy.calendar.global.exception.ApplicationException;
import io.github.hswy.calendar.global.properties.frontend.FrontendProperties;
import io.github.hswy.calendar.global.security.oauth2.model.CustomUserDetails;
import io.github.hswy.calendar.global.security.oauth2.model.OAuth2UserInfo;
import io.github.hswy.calendar.global.security.oauth2.service.OAuth2AuthCodeService;
import io.github.hswy.calendar.global.security.oauth2.service.OAuth2UserService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final FrontendProperties frontendProperties;
    private final OAuth2UserService oAuth2UserService;
    private final OAuth2AuthCodeService authCodeService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        OAuth2UserInfo info = userDetails.getUserInfo();
        String redirectUrl = "";
        try {
            
            Long userId = oAuth2UserService.getOrCreateUserId(info);
            String authCode = authCodeService.generateAuthCode(userId);
            redirectUrl = makeRedirectUrl(
                frontendProperties.getOauth2SuccessUrl(),
                "code",
                authCode
            );
        } catch(ApplicationException e) {
            // TODO error logging
            redirectUrl = makeErrorRedirectUrl(e.getCode());
        } catch(Exception e) {
            // TODO error logging
            redirectUrl = makeErrorRedirectUrl("server_error");
        }

        getRedirectStrategy()
        .sendRedirect(
            request, 
            response, 
            redirectUrl
        );
    }

    private String makeErrorRedirectUrl(String errorCode) {
        return makeRedirectUrl(frontendProperties.getOauth2FailureUrl(), "error_code", errorCode);
    }

    private String makeRedirectUrl(String url, String paramName, String paramValue) {
        return UriComponentsBuilder
            .fromUriString(url)
            .queryParam(paramName, paramValue)
            .build()
            .toString();
    }
}
