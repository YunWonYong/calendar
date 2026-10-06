package io.github.hswy.calendar.user.profile;

import io.github.hswy.calendar.global.model.CreatedAtUpdatedAtEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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

    @Enumerated(EnumType.STRING)
    @Column(
        name = "profile_image_type",
        nullable = false,
        insertable = true,
        updatable = true
    )
    private UserProfileImageType profileImageType;

    @Column(
        name = "profile_image",
        nullable = false,
        insertable = true,
        updatable = true
    )
    private String profileImage;

    void setNickname(String nickname) {
        if (nickname != null && !nickname.isBlank()) {
            this.nickname = nickname;
            return;
        }

        // [TODO] 임의의 닉네임 값구하기.
        this.nickname = "qadws12d12d";
    }

    void setProfileImage(String profileImage) {
        if (profileImage != null && !profileImage.isBlank()) {
            this.profileImageType = UserProfileImageType.URL;
            this.profileImage = profileImage;
            return;
        }

        this.profileImageType = UserProfileImageType.ID;
        this.profileImage = "DEFAULT_USER_PROFILE_IMAGE";
    }

    String changeEmail(String email) {
        String oldEmail = this.email;
        this.email = email;
        return oldEmail;
    }
    
    String changeTel(String tel) {
        String oldTel = this.tel;
        this.tel = tel;
        return oldTel;
    }

}
