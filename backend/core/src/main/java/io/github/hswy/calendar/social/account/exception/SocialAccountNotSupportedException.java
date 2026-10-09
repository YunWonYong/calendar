package io.github.hswy.calendar.social.account.exception;

import io.github.hswy.calendar.global.exception.ApplicationException;
import io.github.hswy.calendar.social.model.SocialType;

public class SocialAccountNotSupportedException extends ApplicationException {
    public SocialAccountNotSupportedException(SocialType socialType, String socialIdentity) {
        super(
            "NOT_SUPPORTED_SOCIAL_TYPE",
            String.format(
                "not supported social type. key[socialType = %s, socialIdentity = %s]", 
                socialType,
                socialIdentity
            )
        );
    }
    
}
