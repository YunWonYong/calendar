package io.github.hswy.calendar.auth.service;

import org.springframework.stereotype.Service;

import io.github.hswy.calendar.auth.model.AccessTokenInfoDTO;
import io.github.hswy.calendar.auth.model.LoginRequestBody;
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
    private final AccessTokenService accessTokenService;

    public LoginResponseBody login(LoginRequestBody body) {
        Long userId = oAuth2AuthCodeService.getUserIdByAuthenticationCode(body.authCode());
        UserInfoDTO userInfoDTO = userProfileService.getUserInfoDTO(userId);
        AccessTokenInfoDTO accessTokenInfoDTO = accessTokenService.generateAccessTokenInfo(userInfoDTO, body);
        return LoginResponseBody
            .builder()
                .user(userInfoDTO)
                .accessToken(accessTokenInfoDTO)
            .build();
    }
}
