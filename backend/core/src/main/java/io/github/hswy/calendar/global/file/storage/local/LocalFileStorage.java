package io.github.hswy.calendar.global.file.storage.local;

import java.io.IOException;
import java.io.UncheckedIOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Locale;
import java.util.UUID;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import io.github.hswy.calendar.global.file.storage.FileTargetType;
import io.github.hswy.calendar.global.properties.file.storage.FileStorageProperties;
import io.github.hswy.calendar.global.properties.file.storage.local.LocalFileStorageProperties;
import io.github.hswy.calendar.global.file.storage.FileStorage;

@Component 
@ConditionalOnProperty(
    prefix = "file.storage",
    name = "type",
    havingValue = "local"
)
public class LocalFileStorage implements FileStorage {
    
    private final LocalFileStorageProperties properties;
    private final Path fileUploadDirectoryPath;

    public LocalFileStorage(FileStorageProperties properties) {
        this.properties = properties.getLocal();
        this.fileUploadDirectoryPath = this.properties.getFileUploadDirectoryPath();
    }

    @Override
    public String upload(FileTargetType path, MultipartFile file) {
        String originalFilename = file.getOriginalFilename();
        String extension = StringUtils.getFilenameExtension(originalFilename);
        String storageKey = UUID.randomUUID().toString();
        if (StringUtils.hasText(extension)) {
            storageKey += "." + extension.toLowerCase(Locale.ROOT);
        }

        Path targetPath = getFilePath(path, storageKey);
        try {
            file.transferTo(targetPath);
        } catch (IOException e) {
            throw new UncheckedIOException("Failed to upload file", e);
        }
    
        return storageKey;
    }

    @Override
    public boolean delete(FileTargetType path, String storageKey) {
        Path targetPath = getFilePath(path, storageKey);
        try {
            Files.delete(targetPath);
        } catch (IOException e) {
            throw new UncheckedIOException("Failed to delete file", e);
        }
        return true;
    }

    @Override
    public String getFileUrl(FileTargetType path, String storageKey) {
        return String.format(
            "%s/%s/%s",
            properties.getBaseUrl(),
            path.getFileDirPath(),
            storageKey
        );
    }

    private Path getFilePath(FileTargetType path, String storageKey) {
        Path uploadDirectoryPath = fileUploadDirectoryPath
            .resolve(path.getFileDirPath())
            .normalize();
            
        Path targetPath = uploadDirectoryPath
            .resolve(storageKey)
            .normalize();

        if (!targetPath.startsWith(fileUploadDirectoryPath)) {
            throw new IllegalArgumentException("Invalid file path.");
        }

        
        try {
            Files.createDirectories(uploadDirectoryPath);
        } catch (IOException e) {
            throw new UncheckedIOException("Failed to create directories", e);
        }

        return targetPath;
    }
}
