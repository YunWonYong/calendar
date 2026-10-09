package io.github.hswy.calendar.auth.service;

import org.springframework.stereotype.Service;

import io.github.hswy.calendar.auth.model.AuthTokenInfoDTO;
import io.github.hswy.calendar.auth.model.AutoLoginAuthDTO;
import io.github.hswy.calendar.auth.model.AutoLoginRequestBody;
import io.github.hswy.calendar.auth.model.LoginRequestBody;
import io.github.hswy.calendar.auth.model.LoginResponseBody;
import io.github.hswy.calendar.auth.model.RefreshAuthRequestBody;
import io.github.hswy.calendar.auth.model.RefreshAuthResponseBody;
import io.github.hswy.calendar.auth.provider.AuthCodeProvider;
import io.github.hswy.calendar.user.service.UserInfoService;
import io.github.hswy.calendar.user.model.UserInfoDTO;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AuthService {
    private final UserInfoService userInfoService;
    private final AuthCodeProvider authCodeProvider;
    private final AccessTokenService accessTokenService;

    public LoginResponseBody login(LoginRequestBody body) {
        Long userId = authCodeProvider.getUserIdByAuthenticationCode(body.authCode());
        UserInfoDTO userInfoDTO = userInfoService.getUserInfo(userId);

        AuthTokenInfoDTO accessTokenInfoDTO = accessTokenService.generateAuthTokenInfo(userInfoDTO, body);
        return new LoginResponseBody(userInfoDTO, accessTokenInfoDTO);
    }

    public LoginResponseBody autoLogin(AutoLoginRequestBody body) {
        AutoLoginAuthDTO autoLoginAuthDTO = accessTokenService.authenticateWithRefreshToken(
            body.refreshToken(),
            body.deviceId(),
            body.deviceType()
        );
        
        UserInfoDTO userInfoDTO = userInfoService.getUserInfo(
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
