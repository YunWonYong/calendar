package io.github.hswy.calendar.social.account.exception;

import io.github.hswy.calendar.global.exception.ApplicationException;
import io.github.hswy.calendar.social.model.SocialType;

public class NotFoundSocialRequiredAttributeException extends ApplicationException {
    public NotFoundSocialRequiredAttributeException(SocialType socialType, String key) {
        super(
            "NOT_FOUND_SOCIAL_REQUIRED_ATTRIBUTE",
            String.format(
                "not found required social attribute. key[socialType = %s, attributeKey = %s]", 
                socialType,
                key
            )
        );
    }
}
