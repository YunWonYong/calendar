package io.github.hswy.calendar.global.security.oauth2.handler;

import io.github.hswy.calendar.global.properties.frontend.FrontendProperties;
import io.github.hswy.calendar.global.security.oauth2.model.CustomUserDetails;
import io.github.hswy.calendar.global.security.oauth2.model.Oauth2UserInfo;
import io.github.hswy.calendar.global.security.oauth2.service.OAuth2AuthCodeService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class Oauth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final FrontendProperties frontendProperties;
    private final OAuth2AuthCodeService authCodeService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        Oauth2UserInfo info = userDetails.getUserInfo();

        String platform = info.getPlatform();
        String platformId = info.getPlatformId();
        // [TODO] check platform, platformId mapping user.

        UriComponents uri = null;
        try {
            String authCode = authCodeService.generateAuthCode(info);
            uri = UriComponentsBuilder
                .fromUriString(
                    frontendProperties.getOauth2SuccessUrl()
                )
                .queryParam("code", authCode)
                .build();
        } catch(Exception e) {
            // [TODO] error logging
            uri = UriComponentsBuilder
                .fromUriString(
                        frontendProperties.getOauth2FailureUrl()
                )
                .queryParam("error", "server_error")
                .build();
        }

        getRedirectStrategy().sendRedirect(request, response, uri.toString());
    }
}
