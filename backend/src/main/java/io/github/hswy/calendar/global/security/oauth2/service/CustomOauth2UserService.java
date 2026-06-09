package io.github.hswy.calendar.global.security.oauth2.service;

import io.github.hswy.calendar.global.common.enums.Platform;
import io.github.hswy.calendar.global.security.oauth2.model.CustomUserDetails;
import io.github.hswy.calendar.global.security.oauth2.model.Oauth2UserInfo;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
public class CustomOauth2UserService extends DefaultOAuth2UserService {

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        try {
            Platform platform = Platform.fromRegistrationId(registrationId);
            Oauth2UserInfo userInfo = new Oauth2UserInfo(platform);
            userInfo.sync(oAuth2User);
            return new CustomUserDetails(userInfo, oAuth2User.getAttributes());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
