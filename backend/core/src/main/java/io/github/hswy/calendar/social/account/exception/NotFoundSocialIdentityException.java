package io.github.hswy.calendar.social.account.exception;

import io.github.hswy.calendar.global.exception.ApplicationException;
import io.github.hswy.calendar.social.model.SocialType;

public class NotFoundSocialIdentityException extends ApplicationException {
    public NotFoundSocialIdentityException(SocialType socialType, String key) {
        super(
            "NOT_FOUND_SOCIAL_IDENTITY",
            String.format(
                "not found social identity data. key[socialType = %s, dataKey = %s]", 
                socialType,
                key
            )
        );
    }
}
