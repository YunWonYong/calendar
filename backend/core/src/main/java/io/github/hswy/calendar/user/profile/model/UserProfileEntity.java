package io.github.hswy.calendar.user.profile.model;

import io.github.hswy.calendar.global.model.CreatedAtUpdatedAtEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(
    name = "user_profile"
)
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class UserProfileEntity extends CreatedAtUpdatedAtEntity {

    @Id
    private Long userId;

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
}
