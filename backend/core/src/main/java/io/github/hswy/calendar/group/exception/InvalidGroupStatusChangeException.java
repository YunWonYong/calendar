package io.github.hswy.calendar.group.exception;

import io.github.hswy.calendar.global.exception.ApplicationException;
import io.github.hswy.calendar.group.GroupStatus;

public class InvalidGroupStatusChangeException extends ApplicationException {

    public InvalidGroupStatusChangeException(Long groupId, Long groupLeaderId, GroupStatus oldStatus, GroupStatus newStatus) {
        this(
            String.format(
                "failed group status change. key[groupId = %s, groupLeaderId = %s, oldStatus = %s, newStatus = %s]",
                groupId,
                groupLeaderId,
                oldStatus,
                newStatus
            )
        );
    }

    private InvalidGroupStatusChangeException(String msg) {
        super("FAILED_GROUP_STATUS_CHANGE", msg);
    }
    
}
