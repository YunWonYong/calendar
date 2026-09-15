package io.github.hswy.calendar.auth.provider;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.spy;
import static org.mockito.ArgumentMatchers.any;

import java.time.Duration;
import java.util.List;
import java.util.UUID;

import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.SessionCallback;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.util.ReflectionTestUtils;

import io.github.hswy.calendar.auth.exception.RefreshTokenExpiredException;
import io.github.hswy.calendar.auth.exception.RefreshTokenGenerateException;
import io.github.hswy.calendar.auth.exception.RefreshTokenMismatchException;
import io.github.hswy.calendar.auth.exception.RefreshTokenNotFoundException;
import io.github.hswy.calendar.auth.model.RefreshTokenInfoDTO;
import io.github.hswy.calendar.global.properties.frontend.FrontendProperties;


@SpringBootTest()
@Tag("local")
@ActiveProfiles("local")
public class RefreshTokenProviderTest {

    @Autowired
    private StringRedisTemplate redisTemplate;
    
    @Autowired
    private RefreshTokenProvider refreshTokenProvider;

    @Autowired
    private FrontendProperties frontendProperties;
 
    private final Long userId = 1L;
    private final String deviceId = "123";

    @Test
    public void testInitRefreshTokenProvider() {
        assertThat(refreshTokenProvider).isNotNull();
    }

    @Test
    public void shouldGenerateRefreshToken() {
        String refreshToken = refreshTokenProvider.generate(userId, deviceId);
        assertThat(refreshToken).isNotBlank();

        refreshTokenProvider.delete(refreshToken, userId, deviceId);
    }

    @Test
    public void shouldGenerateAndValidateRefreshToken() {
        String refreshToken = refreshTokenProvider.generate(userId, deviceId);
        assertThat(refreshToken).isNotBlank();
        
        RefreshTokenInfoDTO dto = refreshTokenProvider.getUserIdByRefreshTokenInfo(refreshToken, deviceId);
        assertEquals(userId, dto.userId());
        assertFalse(dto.shouldRotate());

        refreshTokenProvider.delete(refreshToken, userId, deviceId);
    }

    @Test
    public void shouldThrowRefreshTokenGenerateException() {
        StringRedisTemplate spyRedisTemplate = spy(redisTemplate);
        List<Object> mockInvalidResult = List.of(true, true); 
        
        doReturn(mockInvalidResult).when(spyRedisTemplate).execute(any(SessionCallback.class));

        ReflectionTestUtils.setField(refreshTokenProvider, "redisTemplate", spyRedisTemplate);
        
        assertThatThrownBy(() -> {
            refreshTokenProvider.generate(userId, deviceId);
        }).isInstanceOf(RefreshTokenGenerateException.class)
        .hasMessageContaining(
            String.format("Failed to refresh token generate. key[userId = %d, deviceId = %s] hint[redisTxResult = %d]", userId, deviceId, mockInvalidResult.size())
        );

        ReflectionTestUtils.setField(refreshTokenProvider, "redisTemplate", redisTemplate);
    }
    
    @Test()
    public void shouldThrowRefreshTokenNotFoundException() {
        String refreshToken = UUID.randomUUID().toString();
        assertThatThrownBy(() -> {
            refreshTokenProvider.getUserIdByRefreshTokenInfo(refreshToken, deviceId);
        }).isInstanceOf(RefreshTokenNotFoundException.class);
    }
    
    @Test()
    public void shouldThrowRefreshTokenMismatchException() {
        String refreshToken = refreshTokenProvider.generate(userId, deviceId);
        assertThat(refreshToken).isNotBlank();
        try {  
            assertThatThrownBy(() -> {
                refreshTokenProvider.getUserIdByRefreshTokenInfo(
                    refreshToken, 
                    "device-id"
                );
            }).isInstanceOf(RefreshTokenMismatchException.class);
        } finally {
            refreshTokenProvider.delete(refreshToken, userId, deviceId);
        }
    }
    
    @Test()
    public void shouldThrowRefreshTokenExpiredException() {
        String refreshToken = refreshTokenProvider.generate(userId, deviceId);
        assertThat(refreshToken).isNotBlank();
        try {
            String refreshTokenRedisKey = "REFRESH:TOKEN:" + refreshToken;
            redisTemplate.persist(refreshTokenRedisKey);
            assertThatThrownBy(() -> {
                refreshTokenProvider.getUserIdByRefreshTokenInfo(
                    refreshToken,
                    deviceId
                );
            }).isInstanceOf(RefreshTokenExpiredException.class);
        } finally {
            refreshTokenProvider.delete(refreshToken, userId, deviceId);
        }
    }

    @Test()
    public void shouldRotateRefreshToken() {
        try {
            String refreshToken = refreshTokenProvider.generate(userId, deviceId);
            assertThat(refreshToken).isNotBlank();
            String rotateRefreshToken = refreshTokenProvider.rotate(refreshToken, userId, deviceId);
            assertThat(rotateRefreshToken).isNotBlank();
            assertThat(refreshToken).isNotEqualTo(rotateRefreshToken);
        } finally {
            refreshTokenProvider.deleteAll(userId);
        }
    }

    @Test()
    public void shouldRotateRefreshTokenWhenNearExpiration() {
        try {
            String refreshToken = refreshTokenProvider.generate(userId, deviceId);
            assertThat(refreshToken).isNotBlank();
            String refreshTokenRedisKey = "REFRESH:TOKEN:" + refreshToken;
    
            int rotationSeconds = frontendProperties.getAccessToken().getRefreshRotationSeconds();
            redisTemplate.expire(
                refreshTokenRedisKey,
                Duration.ofSeconds(rotationSeconds - 1)
            );
    
            RefreshTokenInfoDTO dto = refreshTokenProvider.getUserIdByRefreshTokenInfo(
                refreshToken, 
                deviceId
            );
            assertThat(dto.userId()).isEqualTo(userId);
            assertThat(dto.shouldRotate()).isTrue();
    
            String rotateRefreshToken = refreshTokenProvider.rotate(
                refreshToken,
                userId, 
                deviceId
            );
            assertThat(rotateRefreshToken).isNotEqualTo(refreshToken);
            assertThatThrownBy(() -> {
                refreshTokenProvider.getUserIdByRefreshTokenInfo(
                    refreshToken,
                    deviceId
                );
            }).isInstanceOf(RefreshTokenNotFoundException.class);
    
            dto = refreshTokenProvider.getUserIdByRefreshTokenInfo(
                rotateRefreshToken, 
                deviceId
            );
            assertThat(dto.userId()).isEqualTo(userId);
        } finally {
            refreshTokenProvider.deleteAll(userId);
        }
    }
}
