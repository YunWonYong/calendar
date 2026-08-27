package io.github.hswy.calendar.auth.service;

import java.util.Map;

import org.springframework.stereotype.Service;

import io.github.hswy.calendar.auth.model.AuthTokenInfoDTO;
import io.github.hswy.calendar.auth.model.AutoLoginAuthDTO;
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

    public AuthTokenInfoDTO generateAuthTokenInfo(UserInfoDTO dto, LoginRequestBody body) {
        Long userId = dto.getId();
        String deviceId = body.deviceId();
        String refreshToken = refreshTokenProvider.generate(userId, deviceId);
        return AuthTokenInfoDTO
            .builder()
                .accessToken(
                    generateJWT(
                        userId.toString(),
                        deviceId,
                        body.deviceType()
                    ))
                .refreshToken(refreshToken)
            .build();
    }

    public AuthTokenInfoDTO refreshAccessToken(RefreshAuthRequestBody body) {
        Long userId = body.id();
        String refreshToken = body.refreshToken();
        String deviceId = body.deviceId();
        RefreshTokenInfoDTO dto = refreshTokenProvider.getRefreshTokenInfo(userId, refreshToken, deviceId);
        if (dto.shouldRotate()) {
            refreshToken = refreshTokenProvider.rotate(refreshToken, userId, deviceId);
        }

        return AuthTokenInfoDTO
            .builder()
                .accessToken(
                    generateJWT(
                        dto.userIdStr(),
                        deviceId,
                        body.deviceType()
                    )
                )
                .refreshToken(refreshToken)
            .build();
    }

    public AutoLoginAuthDTO authenticateWithRefreshToken(String refreshToken, String deviceId, String deviceType) {
        RefreshTokenInfoDTO dto = refreshTokenProvider.getUserIdByRefreshTokenInfo(
            refreshToken,
            deviceId
        );
        
        Long userId = dto.userId();
        if (dto.shouldRotate()) {
            refreshToken = refreshTokenProvider.rotate(refreshToken, userId, deviceId);
        }
        return new AutoLoginAuthDTO(
            userId,
            AuthTokenInfoDTO
                .builder()
                    .accessToken(
                        generateJWT(
                            dto.userIdStr(),
                            deviceId,
                            deviceType
                        )
                    )
                    .refreshToken(refreshToken)
                .build()
        );
    }


    private String generateJWT(String userId, String deviceId, String deviceType) {
        return jwtProvider.generate(
            userId,
            Map.of(
                "deviceId", deviceId,
                "deviceType", deviceType
            )
        );
    }
}
