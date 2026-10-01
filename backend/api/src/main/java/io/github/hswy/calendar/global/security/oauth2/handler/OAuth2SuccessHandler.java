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
import lombok.extern.slf4j.Slf4j;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;

@Slf4j
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
            boolean isNewUser = oAuth2UserService.checkNewUser(info);
            Long userId = -1L;
            if (isNewUser) {
                userId = oAuth2UserService.createUserId(info);
            } else {
                userId = oAuth2UserService.getUserId(info);
            }
            
            String authCode = authCodeService.generateAuthCode(userId);
            redirectUrl = makeRedirectUrl(
                frontendProperties.getOauth2SuccessUrl(),
                "code",
                authCode
            );
        } catch(ApplicationException e) {
            log.error(
                "Failed to login. platform: {}, platformId: {} errCode: {} errMsg: {}", 
                info.getPlatform().name(), 
                info.getPlatformId(), 
                e.getCode(),
                e.getMessage()
            );
            redirectUrl = makeErrorRedirectUrl(e.getCode());
        } catch(Exception e) {
            log.error(
                "Failed to login. platform: {}, platformId: {} errMsg: {}", 
                info.getPlatform().name(), 
                info.getPlatformId(), 
                e.getMessage()
            );
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
