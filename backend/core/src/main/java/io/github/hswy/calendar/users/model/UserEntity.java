package io.github.hswy.calendar.users.model;

import io.github.hswy.calendar.auth.enums.Platform;
import io.github.hswy.calendar.users.enums.UserStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

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
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(
        name = "user_status",
        nullable = false
    )
    @Builder.Default
    private UserStatus userStatus = UserStatus.ACTIVE;

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
