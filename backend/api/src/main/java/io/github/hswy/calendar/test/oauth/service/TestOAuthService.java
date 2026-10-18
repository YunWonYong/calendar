package io.github.hswy.calendar.test.oauth.service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.Map;
import java.util.UUID;

import org.springframework.context.annotation.Profile;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import io.github.hswy.calendar.test.oauth.model.TestOAuthAccessTokenDTO;
import io.github.hswy.calendar.test.oauth.model.TestOAuthDTO;
import lombok.RequiredArgsConstructor;

@Service 
@RequiredArgsConstructor 
@Profile("local")
public class TestOAuthService {
    private final StringRedisTemplate redisTemplate;
    private final String AUTHORIZE_CODE_REDIS_KEY = "AUTHORIZE:TEST:CODE";
    private final String AUTHORIZE_ACCESS_TOKEN_REDIS_KEY = "AUTHORIZE:TEST:ACCESSTOKEN";

    public String getLoginHtml(String redirectUri, String state) throws IOException { 
        Resource resource = new ClassPathResource("test/oauth/test-login.html");

        String htmlContent =  new String(resource.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
        String code = generateAuthorizeCode(redirectUri, state);
        return htmlContent.replace("{{code}}", code);
    }

    public TestOAuthDTO login(String code, String identity) throws Exception {
        if (identity == null || identity.isBlank()) {
            throw new Exception("invalid identity data.");
        }

        String redisKey = getAuthCodeRedisKey(code);
        if (!checkDuplicateRedisKey(redisKey)) {
            throw new Exception("not found auth data.");
        }

        Map<Object, Object> authData = redisTemplate.opsForHash().entries(redisKey);
        
        TestOAuthDTO oldDto = new ObjectMapper().convertValue(authData, TestOAuthDTO.class);
        invalidRequiredData(oldDto);

        setAuthorizeCodeData(
            redisKey,
            makeTestOAuthDTO(
                oldDto.getRedirectUri(),
                oldDto.getState(),
                identity
            )
        );
        return oldDto;
    }

    public boolean invalidAccessToken(String accessToken) {
        String accessTokenRedisKey = getAccessTokenRedisKey(accessToken);
        return checkDuplicateRedisKey(accessTokenRedisKey);
    }

    public TestOAuthDTO getTestOAuthDTO(String accessToken) throws Exception {
        String redisKey = getAccessTokenRedisKey(accessToken);
        if (!checkDuplicateRedisKey(redisKey)) {
            throw new Exception("not found auth data.");
        }

        Map<Object, Object> authData = redisTemplate.opsForHash().entries(redisKey);
        TestOAuthDTO dto = new ObjectMapper().convertValue(authData, TestOAuthDTO.class);
        invalidAllData(dto);
        redisTemplate.delete(redisKey);
        return dto;
    }

    public Map<String, Object> generateAccessToken(String code) throws Exception {
        String codeRedisKey = getAuthCodeRedisKey(code);
        TestOAuthDTO dto = getTestOAuthDTOByCode(code);
        while(true) {
            String accessToken = UUID.randomUUID().toString() + dto.getIdentity();
            String accessTokenRedisKey = getAccessTokenRedisKey(accessToken);
            if (checkDuplicateRedisKey(accessTokenRedisKey)) {
                continue;
            }
            
            TestOAuthAccessTokenDTO accessTokenDTO = TestOAuthAccessTokenDTO
                .builder()
                    .accessToken(accessToken)
                    .tokenType("Bearer")
                    .expiresIn(Duration.ofMinutes(15))
                .build();
            redisTemplate.delete(codeRedisKey);
            redisTemplate.opsForHash()
                .putAll(
                    accessTokenRedisKey,
                    new ObjectMapper().convertValue(dto, Map.class)
                );
            redisTemplate.expire(accessTokenRedisKey, accessTokenDTO.getExpiresIn());
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.registerModule(new JavaTimeModule());
            return objectMapper.convertValue(
                accessTokenDTO, 
                objectMapper
                    .getTypeFactory()
                    .constructMapType(
                        Map.class, 
                        String.class,
                        Object.class
                    )
            );
        }
    }

    private TestOAuthDTO getTestOAuthDTOByCode(String code) throws Exception {
        String redisKey = getAuthCodeRedisKey(code);
        if (!checkDuplicateRedisKey(redisKey)) {
            throw new Exception("not found auth data.");
        }

        Map<Object, Object> authData = redisTemplate.opsForHash().entries(redisKey);
        
        TestOAuthDTO dto = new ObjectMapper().convertValue(authData, TestOAuthDTO.class);
        invalidAllData(dto);
        return dto;
    }

    private String generateAuthorizeCode(String redirectUri, String state) {
        while(true) {
            String uuid = UUID.randomUUID().toString();
            String redisKey = getAuthCodeRedisKey(uuid);
            if (checkDuplicateRedisKey(redisKey)) {
                continue;
            }

            setAuthorizeCodeData(
                redisKey,
                makeTestOAuthDTO(redirectUri, state)
            );
            return uuid;
        }
    }

    private void setAuthorizeCodeData(String redisKey, TestOAuthDTO dto) {
        redisTemplate.opsForHash()
            .putAll(
                redisKey, 
                new ObjectMapper().convertValue(dto, Map.class)
            );
        redisTemplate.expire(redisKey, Duration.ofDays(1));
    }

    private void invalidAllData(TestOAuthDTO dto) throws Exception {
        invalidRequiredData(dto);

        String identity = dto.getIdentity();
        if (identity == null || identity.isBlank()) {
            throw new Exception("invalid identity value.");
        }
    }

    private void invalidRequiredData(TestOAuthDTO dto) throws Exception {
        String redirectUri = dto.getRedirectUri();
        if (redirectUri == null || redirectUri.isBlank()) {
            throw new Exception("invalid redirect_uri value.");
        }

        String state = dto.getState();
        if (state == null || state.isBlank()) {
            throw new Exception("invalid state value.");
        }
    }

    private TestOAuthDTO makeTestOAuthDTO(String redirectUri, String state) {
        return makeTestOAuthDTO(redirectUri, state, null);
    }

    private TestOAuthDTO makeTestOAuthDTO(String redirectUri, String state, String identity) {
        return TestOAuthDTO
            .builder()
                .redirectUri(redirectUri)
                .identity(identity)
                .state(state)
            .build();
    }

    private boolean checkDuplicateRedisKey(String redisKey) {
        return redisTemplate.hasKey(redisKey);
    }

    private String getAuthCodeRedisKey(String code) {
        return AUTHORIZE_CODE_REDIS_KEY + code;
    }

    private String getAccessTokenRedisKey(String accessToken) {
        return AUTHORIZE_ACCESS_TOKEN_REDIS_KEY + accessToken;
    }
}
