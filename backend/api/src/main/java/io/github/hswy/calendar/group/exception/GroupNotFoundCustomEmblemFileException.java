package io.github.hswy.calendar.group.exception;

import io.github.hswy.calendar.global.exception.ApplicationException;

public class GroupNotFoundCustomEmblemFileException extends ApplicationException {
    public GroupNotFoundCustomEmblemFileException() {
        super(
            "NOT_FOUND_CUSTOM_EMBLEM_IMAGE_FILE",
            "not found custom emblem image file."
        );
    }
}
