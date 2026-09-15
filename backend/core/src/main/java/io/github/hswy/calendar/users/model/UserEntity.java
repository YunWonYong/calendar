package io.github.hswy.calendar.users.model;

import io.github.hswy.calendar.global.common.enums.Platform;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Table(
        name = "users",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_users_platform",
                        columnNames = { "platform", "platform_id" }
                )
        }
)
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(
            name = "user_id",
            updatable = false
    )
    private Long userId;

    @Enumerated(EnumType.STRING)
    @Column(
            name = "platform",
            nullable = false,
            length = 20
    )
    private Platform platform;

    @Column(
            name = "platform_id",
            nullable = false
    )
    private String platformId;

    @Column(
            name = "created_at",
            nullable = false,
            insertable = false,
            updatable = false
    )
    private Instant createdAt;
}
