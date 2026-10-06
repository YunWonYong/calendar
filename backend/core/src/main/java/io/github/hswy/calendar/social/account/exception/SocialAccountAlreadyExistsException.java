package io.github.hswy.calendar.social.account.exception;

import io.github.hswy.calendar.global.exception.ApplicationException;
import io.github.hswy.calendar.social.model.SocialType;

public class SocialAccountAlreadyExistsException extends ApplicationException {
    public SocialAccountAlreadyExistsException(SocialType socialType, String socialIdentity) {
        super(
            "NOT_FOUND_SOCIAL_REQUIRED_ATTRIBUTE",
            String.format(
                "already social acount entity. key[socialType = %s, socialIdentity = %s]", 
                socialType,
                socialIdentity
            )
        );
    }
    
}
