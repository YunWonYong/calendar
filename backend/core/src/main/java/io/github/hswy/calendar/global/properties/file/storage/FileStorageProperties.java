package io.github.hswy.calendar.global.properties.file.storage;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import io.github.hswy.calendar.global.properties.file.storage.aws.AwsFileStorageProperties;
import io.github.hswy.calendar.global.properties.file.storage.local.LocalFileStorageProperties;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Configuration 
@ConfigurationProperties(prefix = "file.storage")
@Setter 
@Getter 
@ToString 
public class FileStorageProperties {
    private FileStorageType type;
    private LocalFileStorageProperties local;
    private AwsFileStorageProperties aws;
}
