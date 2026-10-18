package io.github.hswy.calendar.users.model;

import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(
    name = "user_profiles"
)
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class UserProfileEntity {

    @Id
    private Long userId;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(
        name = "user_id",
        foreignKey = @ForeignKey(
            name = "user_profiles_user_id_fkey"
        )
    )
    private UserEntity user;

    @Column(
        name = "email",
        nullable = true,
        insertable = true,
        updatable = true
    )
    private String email;

    @Column(
        name = "nickname",
        nullable = false,
        insertable = true,
        updatable = true
    )
    private String nickname;

    @Column(
        name = "tel",
        nullable = true,
        insertable = true,
        updatable = true
    )
    private String tel;

    @Column(
        name = "profile_image_url",
        nullable = true,
        insertable = true,
        updatable = true
    )
    private String profileImageUrl;

    @Column(
        name = "created_at",
        nullable = false,
        insertable = false,
        updatable = false
    )
    private Instant createdAt;

    @Column(
        name = "updated_at",
        nullable = true,
        insertable = false,
        updatable = true
    )
    private Instant updatedAt;
}
