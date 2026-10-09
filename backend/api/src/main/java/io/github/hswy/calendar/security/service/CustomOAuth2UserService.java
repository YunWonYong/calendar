package io.github.hswy.calendar.security.service;

import io.github.hswy.calendar.security.model.CustomUserDetails;
import io.github.hswy.calendar.social.account.oauth2.SocialAccountOAuth2MapperResolver;
import io.github.hswy.calendar.social.account.oauth2.SocialOAuth2UserInfo;
import io.github.hswy.calendar.social.model.SocialType;
import lombok.RequiredArgsConstructor;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor 
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
    private final SocialAccountOAuth2MapperResolver mapperResolver;
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        try {
            SocialType socialType = SocialType.fromRegistrationId(registrationId);
            SocialOAuth2UserInfo userInfo = SocialOAuth2UserInfo.builder().socialType(socialType).build();
            mapperResolver.map(userInfo, oAuth2User);
            return new CustomUserDetails(userInfo, oAuth2User.getAttributes());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
