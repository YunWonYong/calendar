package io.github.hswy.calendar.auth.provider;

import java.time.Duration;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisOperations;
import org.springframework.data.redis.core.SessionCallback;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.script.DefaultRedisScript;
import org.springframework.stereotype.Component;

import io.github.hswy.calendar.auth.exception.RefreshTokenGenerateException;
import io.github.hswy.calendar.auth.exception.RefreshTokenRotateException;
import io.github.hswy.calendar.global.exception.ApplicationException;
import io.github.hswy.calendar.global.properties.frontend.FrontendProperties;

@Component
public class RefreshTokenProvider {
    private final StringRedisTemplate redisTemplate;
    private final Duration expireSeconds;
    private final String REFRESH_TOKEN_REDIS_KEY_PREFIX = "REFRESH:TOKEN:";
    private final DefaultRedisScript<Long> rotateLuaScript;
    private final DefaultRedisScript<Long> deleteAllLuaScript;
    
    public RefreshTokenProvider(StringRedisTemplate redisTemplate, @Autowired FrontendProperties frontendProperties) {
        this.redisTemplate = redisTemplate;
        this.expireSeconds = Duration.ofSeconds(
            frontendProperties.getAccessToken()
                .getRefreshExpiredSeconds()
        );

        this.rotateLuaScript = new DefaultRedisScript<>(
            getRotateLuaScript(), 
            Long.class
        );

        this.deleteAllLuaScript = new DefaultRedisScript<>(
            getDeleteAllLuaScript(), 
            Long.class
        );
    }

    public String generate(Long userId, String deviceId) {
        List<Object> results = null;
        try {
            String refreshToken = UUID.randomUUID().toString();
            results = redisTemplate.execute(new SessionCallback<List<Object>>() {
                @SuppressWarnings("unchecked")
                @Override
                public <K, V> List<Object> execute(RedisOperations<K, V> operations) {
                    operations.multi();
                    K stringSaveKey = (K) getRefreshRedisKey(refreshToken);
                    K hashSaveKey = (K) getUserRefreshRedisKey(userId);
                    operations.opsForValue().set(stringSaveKey, (V) userId.toString(), expireSeconds);
                    operations.opsForHash().put(hashSaveKey, deviceId, refreshToken);
                    operations.expire(hashSaveKey, expireSeconds);
                    return operations.exec();
                }
            });


            if (results == null || results.size() != 3) {
                throw new RefreshTokenGenerateException(userId, deviceId, results == null? 0: results.size());
            }
            
            Object refreshTokenSaveFlag = results.get(0);
            if (Boolean.FALSE.equals(refreshTokenSaveFlag)) {
                throw new RefreshTokenGenerateException(userId, deviceId, results.size());
            }
            return refreshToken;
        } catch(Exception e) {
            if (e instanceof ApplicationException) {
                throw e;
            }
            
            throw new RefreshTokenGenerateException(userId, deviceId, results == null? 0: results.size(), e);
        }
    }

    public boolean isValid(String refreshToken, Long userId, String deviceId) {
        String refreshTokenRedisKey = getRefreshRedisKey(refreshToken);
        Object userIdObj = redisTemplate.opsForValue().get(refreshTokenRedisKey);
        if (userIdObj == null) {
            return false;
        }

        if (!userIdObj.toString().equals(userId.toString())) {
            return false;
        }

        String refreshTokenRedisKeyByUserId = getUserRefreshRedisKey(userId);
        Object refreshTokenObj = redisTemplate.opsForHash().get(refreshTokenRedisKeyByUserId, deviceId);
        if (refreshTokenObj == null) {
            return false;
        }

        return refreshTokenObj.equals(refreshToken);
    }

    public String rotate(String refreshToken, Long userId, String deviceId) {
        Long result = null;
        try {
            String newRefreshToken = UUID.randomUUID().toString();
            result = redisTemplate.execute(
                rotateLuaScript,
                List.of(
                    getRefreshRedisKey(refreshToken),
                    getUserRefreshRedisKey(userId),
                    getRefreshRedisKey(newRefreshToken)
                ),
                userId.toString(),
                deviceId,
                refreshToken,
                newRefreshToken,
                String.valueOf(expireSeconds.getSeconds())
            );
            if (result == null || result == 0) {
                throw new RefreshTokenRotateException(userId, deviceId, result);
            }

            return newRefreshToken;
        } catch(Exception e) {
            if (e instanceof ApplicationException) {
                throw e;
            }
            throw new RefreshTokenRotateException(userId, deviceId, result, e);
        } 
    }

    public void delete(String refreshToken, Long userId, String deviceId) {
        redisTemplate.execute(new SessionCallback<List<Object>>() {
            @SuppressWarnings("unchecked")
            @Override
            public <K, V> List<Object> execute(RedisOperations<K, V> operations) {
                operations.multi();
                K stringSaveKey = (K) getRefreshRedisKey(refreshToken);
                K hashSaveKey = (K) getUserRefreshRedisKey(userId);
                operations.delete(stringSaveKey);
                operations.opsForHash().delete(hashSaveKey, deviceId);
                return operations.exec();
            }
        });
    }


    public Long deleteAll(Long userId) {
        return redisTemplate.execute(
            deleteAllLuaScript,
            List.of(
                getUserRefreshRedisKey(userId),
                REFRESH_TOKEN_REDIS_KEY_PREFIX
            )
        );
    }

    private String getRefreshRedisKey(String refreshToken) {
        return String.format("%s%s", REFRESH_TOKEN_REDIS_KEY_PREFIX, refreshToken);
    }

    private String  getUserRefreshRedisKey(Long userId) {
        return String.format("USER:REFRESH:%s", userId.toString());
    }


    private String getRotateLuaScript() {
        return """
local oldRefreshTokenRedisKey = KEYS[1]
local refreshTokenRedisKeyByUserId = KEYS[2]
local newRefreshTokenRedisKey = KEYS[3]

local userId = ARGV[1]
local deviceId = ARGV[2]
local oldRefreshToken = ARGV[3]
local newRefreshToken = ARGV[4]
local expireSeconds = ARGV[5]

local hgetRefreshToken = redis.call("HGET", refreshTokenRedisKeyByUserId, deviceId)
if not hgetRefreshToken or hgetRefreshToken ~= oldRefreshToken then 
    return 0
end

local getUserId = redis.call("GET", oldRefreshTokenRedisKey)
if not getUserId or userId ~= getUserId then
    return 0
end

redis.call("DEL", oldRefreshTokenRedisKey)
redis.call("SET", newRefreshTokenRedisKey, userId, "EX", expireSeconds)
redis.call("HSET", refreshTokenRedisKeyByUserId, deviceId, newRefreshToken)
redis.call("EXPIRE", refreshTokenRedisKeyByUserId, expireSeconds)
return 1
""";
    }

    private String getDeleteAllLuaScript() {
        return """
local refreshTokenRedisKeyByUserId = KEYS[1]
local refreshTokenRedisKeyPrefix = KEYS[2]

local refreshTokens = redis.call("HGETALL", refreshTokenRedisKeyByUserId)

local deleteCount = 0;

for i = 2, #refreshTokens, 2 do
    local refreshToken = refreshTokens[i]
    local key = refreshTokenRedisKeyPrefix .. refreshToken
    redis.call("DEL", key)
    deleteCount = deleteCount + 1
end

redis.call("DEL", refreshTokenRedisKeyByUserId)

return deleteCount
""";
    }
}
