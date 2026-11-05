package io.github.hswy.calendar.global.properties.file.storage.local;

import java.nio.file.Path;
import java.nio.file.Paths;

import lombok.Getter;
import lombok.Setter;

@Getter 
@Setter 
public class LocalFileStorageProperties {
    private String basePath;
    private String baseUrl;

    public Path getFileUploadDirectoryPath() {
        return Paths
            .get(this.basePath)
            .toAbsolutePath()
            .normalize();
    }
}
