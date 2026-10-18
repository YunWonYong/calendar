package io.github.hswy.calendar.user.social.account.exception;

import io.github.hswy.calendar.global.exception.ApplicationException;

public class UserSocialAccountNotFoundException extends ApplicationException {
    public UserSocialAccountNotFoundException(Long userId, Long socialAccountId) {
        super(
            "NOT_FOUND_USER_SOCIAL_ACCOUNT",
            String.format(
                "not found user social account entity. key[userId = %s, socialAccountId = %s]", 
                userId,
                socialAccountId
            )
        );
    }
}
