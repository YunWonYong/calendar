package io.github.hswy.calendar.user.social.account.exception;

import io.github.hswy.calendar.global.exception.ApplicationException;

public class UserSocialAccountAlreadyConnectedToAnotherUserException extends ApplicationException {
    public UserSocialAccountAlreadyConnectedToAnotherUserException(Long userId, Long socialAccountId) {
        super(
            "ALREADY_USER_SOCIAL_ACCOUNT_CONNECTED_TO_ANOTHER_USER",
            String.format(
                "already connected social account to another user. key[userId = %s, socialAccountId = %s]", 
                userId,
                socialAccountId
            )
        );
    }
    
}
