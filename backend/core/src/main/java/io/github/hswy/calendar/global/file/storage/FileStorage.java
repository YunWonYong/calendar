package io.github.hswy.calendar.global.file.storage;

import org.springframework.web.multipart.MultipartFile;

public interface FileStorage {
    String upload(FileTargetType path, MultipartFile file);
    boolean delete(FileTargetType path, String storageKey);
    String getFileUrl(FileTargetType path, String storageKey);
}
