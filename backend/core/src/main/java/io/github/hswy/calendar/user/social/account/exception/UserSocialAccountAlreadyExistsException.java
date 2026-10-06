package io.github.hswy.calendar.user.social.account.exception;

import io.github.hswy.calendar.global.exception.ApplicationException;

public class UserSocialAccountAlreadyExistsException extends ApplicationException {
    public UserSocialAccountAlreadyExistsException(Long userId, Long socialAccountId) {
        super(
            "ALREADY_USER_SOCIAL_ACCOUNT",
            String.format(
                "already exists user social account. key[userId = %s, socialAccountId = %s]",
                userId,
                socialAccountId
            )
        );
    }
}
