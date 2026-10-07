package io.github.hswy.calendar.user.social.account;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable 
@Getter 
@Setter 
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@EqualsAndHashCode
@Builder
public class UserSocialAccountId implements Serializable {

    @Column(
        name = "user_id",
        nullable = false
    )
    private Long userId;

    @Column(
        name = "social_account_id",
        nullable = false
    )
    private Long socialAccountId;
    
}
