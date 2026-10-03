package io.github.hswy.calendar.payment.cards.model;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import io.github.hswy.calendar.global.model.CreatedAtEntity;
import io.github.hswy.calendar.global.model.HistoryEntityFormInterface;
import io.github.hswy.calendar.payment.cards.enums.UserPaymentCardStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity 
@Table(
    name = "user_payment_card_history"
)
@Getter 
@NoArgsConstructor()
@AllArgsConstructor 
@Builder
public class UserPaymentCardHistoryEntity extends CreatedAtEntity implements HistoryEntityFormInterface<UserPaymentCardEntity, UserPaymentCardHistoryEntity> {

    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(
        name = "seq",
        nullable = false,
        updatable = false,
        insertable = false
    )
    private Long seq;

    @Column(
        name = "card_id",
        nullable = false,
        updatable = false
    )
    private Long cardId;
    
    @Column(
        name="user_id",
        nullable = false,
        updatable = false
    )
    private Long userId;

    @Column(
        name="payment_method_token",
        nullable = false,
        updatable = false
    )
    private String paymentMethodToken;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(
        name="card_status",
        nullable = false
    )
    @Setter
    private UserPaymentCardStatus cardStatus;

    @Column(
        name="card_brand",
        nullable = false,
        length = 30
    )
    private String cardBrand;

    @Column(
        name="card_last_4",
        nullable = false,
        length = 4
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

    @Override
    public UserPaymentCardHistoryEntity form(UserPaymentCardEntity entity) {
        return new UserPaymentCardHistoryEntityBuilder()
            .cardId(entity.getCardId())
            .userId(entity.getUserId())
            .paymentMethodToken(entity.getPaymentMethodToken())
            .cardStatus(entity.getCardStatus())
            .cardBrand(entity.getCardBrand())
            .cardLast4(entity.getCardLast4())
            .cardExpMonth(entity.getCardExpMonth())
            .cardExpYear(entity.getCardExpYear())
            .cardNickname(entity.getCardNickname())
            .build();
    }

    
}
