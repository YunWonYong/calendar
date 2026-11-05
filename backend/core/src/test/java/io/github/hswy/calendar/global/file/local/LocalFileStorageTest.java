package io.github.hswy.calendar.global.file.local;

import static org.assertj.core.api.Assertions.assertThat;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;
import org.springframework.mock.web.MockMultipartFile;

import io.github.hswy.calendar.global.file.storage.FileTargetType;
import io.github.hswy.calendar.global.file.storage.local.LocalFileStorage;
import io.github.hswy.calendar.global.properties.file.storage.FileStorageProperties;
import io.github.hswy.calendar.global.properties.file.storage.local.LocalFileStorageProperties;

class LocalFileStorageTest {

    @TempDir
    Path tempDir;

    private LocalFileStorage localFileStorage;
    private Path fileUploadDirectoryPath;

    private byte[] content;
    private MockMultipartFile file;

    @BeforeEach
    void setUp() {
        LocalFileStorageProperties properties = new LocalFileStorageProperties();
        properties.setBasePath(tempDir.toString());
        properties.setBaseUrl("http://localhost:8080");

        FileStorageProperties fileProperties = new FileStorageProperties();
        fileProperties.setLocal(properties);

        fileUploadDirectoryPath = properties.getFileUploadDirectoryPath();
        localFileStorage = new LocalFileStorage(fileProperties);

        content = "test profile image".getBytes(StandardCharsets.UTF_8);

        file = new MockMultipartFile(
            "file",
            "profile.PNG",
            "image/png",
            content
        );
    }

    @Test
    void uploadUserProfile() throws Exception {
        assertFileUpload(FileTargetType.USER_PROFILE);
    }

    @Test
    void uploadGroupEmblem() throws Exception {
        assertFileUpload(FileTargetType.GROUP_EMBLEM);
    }

    private void assertFileUpload(FileTargetType type) throws Exception {
        String storageKey = localFileStorage.upload(type, file);

        assertThat(storageKey).matches("[0-9a-f-]{36}\\.png");

        Path savedFilePath = fileUploadDirectoryPath
            .resolve(type.getFileDirPath())
            .resolve(storageKey);

        assertThat(Files.exists(savedFilePath)).isTrue();
        assertThat(Files.readAllBytes(savedFilePath)).isEqualTo(content);

        assertThat(localFileStorage.getFileUrl(type, storageKey)).isEqualTo(
            String.format(
                "http://localhost:8080/%s/%s",
                type.getFileDirPath(),
                storageKey
            )
        );
    }

    @Test
    void deleteFile() throws Exception {
        String storageKey = localFileStorage.upload(
            FileTargetType.USER_PROFILE,
            file
        );

        Path savedFilePath = fileUploadDirectoryPath
            .resolve(FileTargetType.USER_PROFILE.getFileDirPath())
            .resolve(storageKey);

        assertThat(Files.exists(savedFilePath)).isTrue();

        localFileStorage.delete(
            FileTargetType.USER_PROFILE,
            storageKey
        );

        assertThat(Files.exists(savedFilePath)).isFalse();
    }
}
