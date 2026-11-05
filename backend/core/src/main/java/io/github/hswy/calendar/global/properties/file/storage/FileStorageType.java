package io.github.hswy.calendar.global.properties.file.storage;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor 
@Getter 
public enum FileStorageType {
    LOCAL("local"),
    AWS("aws"),
    GCP("gcp");

    private final String type;

}
