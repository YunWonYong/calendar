package io.github.hswy.calendar.group.exception;

import io.github.hswy.calendar.global.exception.ApplicationException;

public class GroupCreationLimitExceededException extends ApplicationException {
    public GroupCreationLimitExceededException(Long userPlanId, Long userGroupCount, Integer maxCreateGroups) {
        super(
            "LIMIT_EXCEEDED_GROUP_CREATION",
            String.format(
                "User exceeded the maximum number of groups allowed by the plan. key[userPlanId = %s, userGroupCount = %s, maxCreateGroups = %s]",
                userPlanId,
                userGroupCount,
                maxCreateGroups
            )
        );
    }
}
