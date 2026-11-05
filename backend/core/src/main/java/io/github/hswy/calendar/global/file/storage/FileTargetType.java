package io.github.hswy.calendar.global.file.storage;

import lombok.Getter;

@Getter 
public enum FileTargetType {
    USER_PROFILE("user/profile"),
    GROUP_EMBLEM("group/emblem");

    private final String fileDirPath;

    FileTargetType(final String fileDirPath) {
        this.fileDirPath = fileDirPath;
    }
}
