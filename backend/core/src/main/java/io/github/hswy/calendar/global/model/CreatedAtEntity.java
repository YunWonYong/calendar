package io.github.hswy.calendar.global.model;

import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;

@Getter 
@MappedSuperclass 
public abstract class CreatedAtEntity {
    @Column(
        name = "created_at",
        nullable = false,
        insertable = false,
        updatable = false
    )
    private Instant createdAt;
}
