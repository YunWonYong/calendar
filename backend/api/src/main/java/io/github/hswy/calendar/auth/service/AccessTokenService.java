package io.github.hswy.calendar.auth.service;

import java.util.List;
import java.util.Map;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import io.github.hswy.calendar.auth.exception.AccessTokenInvalidException;
import io.github.hswy.calendar.auth.model.AuthTokenInfoDTO;
import io.github.hswy.calendar.auth.model.AutoLoginAuthDTO;
import io.github.hswy.calendar.auth.model.LoginRequestBody;
import io.github.hswy.calendar.auth.model.RefreshAuthRequestBody;
import io.github.hswy.calendar.auth.model.RefreshTokenInfoDTO;
import io.github.hswy.calendar.auth.provider.JWTProvider;
import io.github.hswy.calendar.auth.provider.RefreshTokenProvider;
import io.github.hswy.calendar.user.model.UserInfoDTO;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
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

    public Authentication validation(String authorization) throws AccessTokenInvalidException {
        if (authorization == null || authorization.isBlank()) {
            throw new AccessTokenInvalidException(
                "authorization header is missing. key[authorization = null]"
            );
        }

        String[] tokens = authorization.split("\\s+");
        if (tokens == null || tokens.length != 2) {
            throw new AccessTokenInvalidException(
                String.format(
                    "authorization header format is invalid. key[authorizationPartCount = %d]",
                    tokens.length
                )
            );
        }

        String authType = tokens[0];
        if (!"Bearer".equals(authType)) {
            throw new AccessTokenInvalidException(
                String.format(
                    "auth type invalid. key[authType = %s]",
                    authType
                )
            );
        }

        try {
            Claims claims = jwtProvider.parseJWT(tokens[1]);
            return makeAuthentication(claims);
        } catch(JwtException | IllegalArgumentException e) {
            throw new AccessTokenInvalidException(
                "failed to validate access token.",
                e
            );
        }
    }

    private Authentication makeAuthentication(Claims claims) {
        String userIdStr = claims.getSubject();
        if (userIdStr == null || userIdStr.isBlank()) {
            throw new AccessTokenInvalidException(
                "user id is empty. key[claimsSubject = null or blank]"
            );
        }

        try {
            Long userId = Long.parseLong(userIdStr);
            return new UsernamePasswordAuthenticationToken(
                userId,
                null,
                List.of(new SimpleGrantedAuthority("ROLE_USER"))
            );
        } catch(NumberFormatException e) {
            throw new AccessTokenInvalidException(
                String.format(
                    "failed to parse user id. key[reason = %s]",
                    e.getClass().getSimpleName()
                ),
                e
            );
        }
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
