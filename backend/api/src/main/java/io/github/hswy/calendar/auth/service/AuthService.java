package io.github.hswy.calendar.auth.service;

import org.springframework.stereotype.Service;

import io.github.hswy.calendar.auth.model.AuthTokenInfoDTO;
import io.github.hswy.calendar.auth.model.AutoLoginAuthDTO;
import io.github.hswy.calendar.auth.model.AutoLoginRequestBody;
import io.github.hswy.calendar.auth.model.LoginRequestBody;
import io.github.hswy.calendar.auth.model.LoginResponseBody;
import io.github.hswy.calendar.auth.model.RefreshAuthRequestBody;
import io.github.hswy.calendar.auth.model.RefreshAuthResponseBody;
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
        AuthTokenInfoDTO accessTokenInfoDTO = accessTokenService.generateAuthTokenInfo(userInfoDTO, body);
        return new LoginResponseBody(userInfoDTO, accessTokenInfoDTO);
    }

    public LoginResponseBody autoLogin(AutoLoginRequestBody body) {
        AutoLoginAuthDTO autoLoginAuthDTO = accessTokenService.authenticateWithRefreshToken(
            body.refreshToken(),
            body.deviceId(),
            body.deviceType()
        );
        
        UserInfoDTO userInfoDTO = userProfileService.getUserInfoDTO(
            autoLoginAuthDTO.getUserId()
        );
        return new LoginResponseBody(
            userInfoDTO,
            autoLoginAuthDTO.getAuthTokenInfoDTO()
        );
    }

    public RefreshAuthResponseBody refresh(RefreshAuthRequestBody body) {
        return new RefreshAuthResponseBody(
            accessTokenService.refreshAccessToken(body)
        );
    }
}
