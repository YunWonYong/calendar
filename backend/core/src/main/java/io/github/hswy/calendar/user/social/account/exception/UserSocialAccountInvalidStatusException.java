package io.github.hswy.calendar.user.social.account.exception;

import io.github.hswy.calendar.global.exception.ApplicationException;
import io.github.hswy.calendar.user.social.account.UserSocialAccountStatus;

public class UserSocialAccountInvalidStatusException extends ApplicationException {
    public UserSocialAccountInvalidStatusException(Long userId, Long socialAccountId, UserSocialAccountStatus oldStatus, UserSocialAccountStatus newStatus) {
        super(
            "FAILED_USER_SOCIAL_ACCOUNT_STATUS_CHANGE",
            String.format(
                "failed user social account status change. key[userId = %s, socialAccountId = %s, oldStatus = %s, newStatus = %s]", 
                userId,
                socialAccountId,
                oldStatus,
                newStatus
            )
        );
    }
}
