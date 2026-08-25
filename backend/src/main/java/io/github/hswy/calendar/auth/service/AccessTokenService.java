package io.github.hswy.calendar.auth.service;

import java.util.Map;

import org.springframework.stereotype.Service;

import io.github.hswy.calendar.auth.model.AccessTokenInfoDTO;
import io.github.hswy.calendar.auth.model.LoginRequestBody;
import io.github.hswy.calendar.auth.model.RefreshAuthRequestBody;
import io.github.hswy.calendar.auth.model.RefreshTokenInfoDTO;
import io.github.hswy.calendar.auth.provider.JWTProvider;
import io.github.hswy.calendar.auth.provider.RefreshTokenProvider;
import io.github.hswy.calendar.users.model.UserInfoDTO;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AccessTokenService {
    private final JWTProvider jwtProvider;
    private final RefreshTokenProvider refreshTokenProvider;

    public AccessTokenInfoDTO generateAccessTokenInfo(UserInfoDTO dto, LoginRequestBody body) {
        Long userId = dto.getId();
        String deviceId = body.deviceId();
        String refreshToken = refreshTokenProvider.generate(userId, deviceId);
        
        String jwt = jwtProvider.generate(
            userId.toString(),
            Map.of(
                "deviceId", deviceId,
                "deviceType", body.deviceType()
            )
        );
        return AccessTokenInfoDTO
            .builder()
                .jwt(jwt)
                .refreshToken(refreshToken)
            .build();
    }

    public AccessTokenInfoDTO refreshAccessToken(RefreshAuthRequestBody body) {
        Long userId = body.id();
        String refreshToken = body.refreshToken();
        String deviceId = body.deviceId();
        RefreshTokenInfoDTO dto = refreshTokenProvider.getRefreshTokenInfo(userId, refreshToken, deviceId);
        if (dto.shouldRotate()) {
            refreshToken = refreshTokenProvider.rotate(refreshToken, userId, deviceId);
        }

        String jwt = jwtProvider.generate(
            dto.userIdStr(),
            Map.of(
                "deviceId", deviceId,
                "deviceType", body.deviceType()
            )
        );
        return AccessTokenInfoDTO
            .builder()
                .jwt(jwt)
                .refreshToken(refreshToken)
            .build();
    }
}
