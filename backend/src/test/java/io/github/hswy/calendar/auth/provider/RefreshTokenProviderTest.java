package io.github.hswy.calendar.auth.provider;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.spy;

import java.util.List;

import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.SessionCallback;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.util.ReflectionTestUtils;

import io.github.hswy.calendar.auth.exception.RefreshTokenGenerateException;
import io.github.hswy.calendar.auth.exception.RefreshTokenRotateException;


@SpringBootTest()
@Tag("local")
@ActiveProfiles("local")
public class RefreshTokenProviderTest {

    @Autowired
    private StringRedisTemplate redisTemplate;
    
    @Autowired
    private RefreshTokenProvider refreshTokenProvider;

    @Test
    public void testInitRefreshTokenProvider() {
        assertThat(refreshTokenProvider).isNotNull();
    }

    @Test
    public void testGenerateRefreshToken() {
        Long userId = 1L;
        String deviceId = "123";
        String refreshToken = refreshTokenProvider.generate(userId, deviceId);
        assertThat(refreshToken).isNotBlank();

        boolean isValid = refreshTokenProvider.isValid(refreshToken, userId, deviceId);
        assertThat(isValid).isTrue();

        refreshTokenProvider.delete(refreshToken, userId, deviceId);

        isValid = refreshTokenProvider.isValid(refreshToken, userId, deviceId);
        assertThat(isValid).isFalse();
    }

    @SuppressWarnings("unchecked")
    @Test
    public void testGenerateRefreshTokenException() {
        StringRedisTemplate spyRedisTemplate = spy(redisTemplate);
        List<Object> mockInvalidResult = List.of(true, true); 
        
        doReturn(mockInvalidResult).when(spyRedisTemplate).execute(any(SessionCallback.class));

        ReflectionTestUtils.setField(refreshTokenProvider, "redisTemplate", spyRedisTemplate);
        
        assertThatThrownBy(() -> {
            refreshTokenProvider.generate(1L, "123");
        }).isInstanceOf(RefreshTokenGenerateException.class)
        .hasMessageContaining(
            String.format("Failed to refresh token generate. key[userId = %d, deviceId = %s] hint[redisTxResult = %d]", 1L, "123", mockInvalidResult.size())
        );

        ReflectionTestUtils.setField(refreshTokenProvider, "redisTemplate", redisTemplate);
    }

    @Test
    public void testRotateRefreshToken() {
        Long userId = 1L;
        String deviceId = "123";

        String firstRefreshToken = refreshTokenProvider.generate(userId, deviceId);
        assertThat(firstRefreshToken).isNotBlank();

        boolean isValidFirstRefreshToken = refreshTokenProvider.isValid(firstRefreshToken, userId, deviceId);
        assertThat(isValidFirstRefreshToken).isTrue();
        
        String secondRefreshToken = refreshTokenProvider.rotate(firstRefreshToken, userId, deviceId);
        assertThat(secondRefreshToken).isNotBlank();

        boolean isValidSecondRefreshToken = refreshTokenProvider.isValid(secondRefreshToken, userId, deviceId);
        assertThat(isValidSecondRefreshToken).isTrue();

        isValidFirstRefreshToken = refreshTokenProvider.isValid(firstRefreshToken, userId, deviceId);
        assertThat(isValidFirstRefreshToken).isFalse();

        refreshTokenProvider.delete(secondRefreshToken, userId, deviceId);
    }

    @Test
    public void testRotateRefreshTokenException() {
        Long userId = 1L;
        String deviceId = "123";
        String failedDeviceId = "456";

        String firstRefreshToken = refreshTokenProvider.generate(userId, deviceId);
        assertThat(firstRefreshToken).isNotBlank();

        boolean isValidFirstRefreshToken = refreshTokenProvider.isValid(firstRefreshToken, userId, deviceId);
        assertThat(isValidFirstRefreshToken).isTrue();
        assertThatThrownBy(() -> {
            refreshTokenProvider.rotate(firstRefreshToken, userId, failedDeviceId);
        })
        .isInstanceOf(RefreshTokenRotateException.class)
        .hasMessageContaining(
            String.format("Failed to refresh token rotate. key[userId = %d, deviceId = %s]", userId, failedDeviceId)
        );
    }

    @Test
    public void testDeleteALL() {
        Long userId = 1L;
        String deviceId_1 = "123";
        String deviceId_2 = "456";
        String deviceId_3 = "789";

        String refreshToken_1 = refreshTokenProvider.generate(userId, deviceId_1);
        assertThat(refreshToken_1).isNotBlank();

        String refreshToken_2 = refreshTokenProvider.generate(userId, deviceId_2);
        assertThat(refreshToken_2).isNotBlank();

        String refreshToken_3 = refreshTokenProvider.generate(userId, deviceId_3);
        assertThat(refreshToken_3).isNotBlank();

        boolean isValidRefreshToken_1 = refreshTokenProvider.isValid(refreshToken_1, userId, deviceId_1);
        boolean isValidRefreshToken_2 = refreshTokenProvider.isValid(refreshToken_2, userId, deviceId_2);
        boolean isValidRefreshToken_3 = refreshTokenProvider.isValid(refreshToken_3, userId, deviceId_3);
        assertThat(isValidRefreshToken_1).isTrue();
        assertThat(isValidRefreshToken_2).isTrue();
        assertThat(isValidRefreshToken_3).isTrue();

        Long deleteRefreshTokenCount = refreshTokenProvider.deleteAll(userId);
        assertThat(deleteRefreshTokenCount).isEqualByComparingTo(3L);

        isValidRefreshToken_1 = refreshTokenProvider.isValid(refreshToken_1, userId, deviceId_1);
        isValidRefreshToken_2 = refreshTokenProvider.isValid(refreshToken_2, userId, deviceId_2);
        isValidRefreshToken_3 = refreshTokenProvider.isValid(refreshToken_3, userId, deviceId_3);
        assertThat(isValidRefreshToken_1).isFalse();
        assertThat(isValidRefreshToken_2).isFalse();
        assertThat(isValidRefreshToken_3).isFalse();
    }
}
