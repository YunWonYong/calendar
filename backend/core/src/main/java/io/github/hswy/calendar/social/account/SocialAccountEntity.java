package io.github.hswy.calendar.social.account;

import io.github.hswy.calendar.global.model.CreatedAtEntity;
import io.github.hswy.calendar.social.model.SocialType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Builder;
import lombok.Getter;

@Entity 
@Table(
    name = "social_accounts",
    uniqueConstraints = {
        @UniqueConstraint(
            name = "uk_social_type_identity",
            columnNames = { "social_type", "social_identity" }
        )
    }
)
@Getter
@Builder
public class SocialAccountEntity extends CreatedAtEntity {
    
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(
        name = "social_account_id",
        nullable = false,
        insertable = false,
        updatable = false
    )
    private Long socialAccountId;

    @Enumerated(EnumType.STRING)
    @Column(
        name = "social_type",
        nullable = false,
        insertable = true,
        updatable = false,
        length = 20
    )
    private SocialType socialType;

    @Column(
        name = "social_identity",
        nullable = false,
        insertable = true,
        updatable = false
    )
    private String socialIdentity;
}
