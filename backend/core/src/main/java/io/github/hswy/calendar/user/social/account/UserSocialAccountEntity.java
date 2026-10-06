package io.github.hswy.calendar.user.social.account;

import io.github.hswy.calendar.global.model.CreatedAtUpdatedAtEntity;
import io.github.hswy.calendar.social.account.SocialAccountEntity;
import io.github.hswy.calendar.user.UserEntity;
import io.github.hswy.calendar.user.social.account.exception.UserSocialAccountInvalidStatusException;
import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import jakarta.persistence.ForeignKey;

@Entity
@Table(
    name = "user_social_accounts"
)
@NoArgsConstructor 
@AllArgsConstructor 
@Builder 
public class UserSocialAccountEntity extends CreatedAtUpdatedAtEntity {

    @EmbeddedId
    private UserSocialAccountId id;

    @Enumerated(EnumType.STRING)
    @Column(
        name = "user_social_status",
        nullable = false,
        insertable = false
    )
    @Builder.Default
    private UserSocialAccountStatus userSocialStatus = UserSocialAccountStatus.CONNECTED;

    @MapsId("userId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
        name = "user_id",
        nullable = false,
        foreignKey = @ForeignKey(
            name = "fk_user_social_accounts_users"
        )
    )
    private UserEntity user;

    @MapsId("socialAccountId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
        name = "social_account_id",
        nullable = false,
        foreignKey = @ForeignKey(
            name = "fk_user_social_accounts_accounts"
        )
    )
    private SocialAccountEntity socialAccount;

    UserSocialAccountStatus changeStatus(UserSocialAccountStatus status) {
        UserSocialAccountStatus oldStatus = this.userSocialStatus;
        if (oldStatus == UserSocialAccountStatus.CONNECTED) {
            if (status == UserSocialAccountStatus.DISCONNECTED) {
                this.userSocialStatus = status;
                return oldStatus;
            }
        }

        if (oldStatus == UserSocialAccountStatus.DISCONNECTED) {
            if (
                status == UserSocialAccountStatus.CONNECTED ||
                status == UserSocialAccountStatus.PENDING_DELETE
            ) {
                this.userSocialStatus = status;
                return oldStatus;
            }
        }

        if (oldStatus == UserSocialAccountStatus.PENDING_DELETE) {
            if (status == UserSocialAccountStatus.DELETED) {
                this.userSocialStatus = status;
                return oldStatus;
            }
        }
        
        throw new UserSocialAccountInvalidStatusException(
            this.id.getUserId(),
            this.id.getSocialAccountId(),
            this.userSocialStatus,
            status
        );
    }
}
