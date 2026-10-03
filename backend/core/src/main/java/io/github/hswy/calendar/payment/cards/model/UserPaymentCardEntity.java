package io.github.hswy.calendar.payment.cards.model;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import io.github.hswy.calendar.global.model.CreatedAtUpdatedAtEntity;
import io.github.hswy.calendar.payment.cards.enums.UserPaymentCardStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity 
@Table (
    name = "user_payment_cards",
    uniqueConstraints = {
        @UniqueConstraint(
            name = "uk_user_payment_cards_user_token",
            columnNames = { "user_id", "payment_method_token" }
        ),
        @UniqueConstraint(
            name = "uk_user_payment_cards_user_card",
            columnNames = { "user_id", "card_id" }
        )
    }
)
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor 
@Builder
public class UserPaymentCardEntity extends CreatedAtUpdatedAtEntity {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(
        name = "card_id",
        updatable = false
    )
    private Long cardId;
    
    @Column(
        name="user_id",
        updatable = false,
        nullable = false
    )
    private Long userId;

    @Column(
        name="payment_method_token",
        updatable = false,
        nullable = false
    )
    private String paymentMethodToken;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(
        name="card_status",
        nullable = false
    )
    @Builder.Default
    private UserPaymentCardStatus cardStatus = UserPaymentCardStatus.ACTIVE;

    @Column(
        name="card_brand",
        length = 30,
        nullable = false
    )
    private String cardBrand;

    @Column(
        name="card_last_4",
        length = 4,
        nullable = false
    )
    private String cardLast4;

    @Column(
        name="card_exp_month",
        nullable = false
    )
    private short cardExpMonth;

    @Column(
        name="card_exp_year",
        nullable = false
    )
    private short cardExpYear;
    
    @Column(
        name="card_nickname",
        length = 60
    )
    private String cardNickname;
}
