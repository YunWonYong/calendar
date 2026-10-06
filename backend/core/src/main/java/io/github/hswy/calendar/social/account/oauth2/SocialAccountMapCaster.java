package io.github.hswy.calendar.social.account.oauth2;

import java.util.Map;

import io.github.hswy.calendar.global.utils.MapCaster;
import io.github.hswy.calendar.social.account.exception.NotFoundSocialRequiredAttributeException;
import io.github.hswy.calendar.social.model.SocialType;

final class SocialAccountMapCaster {
    static Map<String, Object> getAsRequiredMap(Object obj, SocialType socialType, String key) throws NotFoundSocialRequiredAttributeException {
        Map<String, Object> castedMap = MapCaster.castToMap(obj);
        if (castedMap == null) {
            // [TODO] error logging
            throw new NotFoundSocialRequiredAttributeException(socialType, key);
        }
        return castedMap;
    }
}
