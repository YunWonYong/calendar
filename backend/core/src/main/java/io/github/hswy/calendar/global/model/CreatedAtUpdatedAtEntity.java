package io.github.hswy.calendar.global.model;

import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;

@Getter 
@MappedSuperclass 
public abstract class CreatedAtUpdatedAtEntity extends CreatedAtEntity {
    @Column (
        name = "updated_at",
        nullable = true,
        insertable = false,
        updatable = true
    )
    private Instant updatedAt;
}