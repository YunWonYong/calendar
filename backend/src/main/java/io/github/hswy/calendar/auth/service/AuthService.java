package io.github.hswy.calendar.auth.service;

import org.springframework.stereotype.Service;

import io.github.hswy.calendar.auth.model.LoginResponseBody;
import io.github.hswy.calendar.global.security.oauth2.service.OAuth2AuthCodeService;
import io.github.hswy.calendar.users.model.UserInfoDTO;
import io.github.hswy.calendar.users.service.UserProfileService;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AuthService {
    private final OAuth2AuthCodeService oAuth2AuthCodeService;
    private final UserProfileService userProfileService;
    
    public LoginResponseBody login(String authCode) {
        Long userId = oAuth2AuthCodeService.getUserIdByAuthenticationCode(authCode);
        UserInfoDTO userInfoDTO = userProfileService.getUserInfoDTO(userId);
        return LoginResponseBody
            .builder()
            .user(userInfoDTO)
            .build();
    }
}
