package io.github.hswy.calendar.global.security.oauth2.handler;

import io.github.hswy.calendar.global.properties.frontend.FrontendProperties;
import io.github.hswy.calendar.global.security.oauth2.model.CustomUserDetails;
import io.github.hswy.calendar.global.security.oauth2.model.Oauth2UserInfo;
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
public class Oauth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private FrontendProperties frontendProperties;
//    private final TempTokenStore tempTokenStore.
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        Oauth2UserInfo info = userDetails.getUserInfo();

        String platformId = info.getPlatformId();
        // [TODO] platformId check.

        String targetUrl = UriComponentsBuilder.fromUriString(frontendProperties.getOauth2SuccessUrl())
                .queryParam("code", "123")
                .build().toUriString();

        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }
}
