package io.github.hswy.calendar.global.security.oauth2.model;

import io.github.hswy.calendar.global.common.utils.MapCaster;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Map;

public interface Oauth2Builder extends MapCaster {
    void build(Oauth2UserInfo userInfo, OAuth2User oAuth2User) throws Exception;

    default Map<String, Object> getAsMap(Object obj, String platform, String key) throws Exception {
        try {
            return castToMap(obj);
        } catch (Exception e) {
            throw new Exception(String.format("%s platform: %s, attribute key: %s", e.getMessage(), platform, key));
        }
    }
}
