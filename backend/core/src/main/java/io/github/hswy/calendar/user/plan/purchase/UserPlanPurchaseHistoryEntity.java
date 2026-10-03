package io.github.hswy.calendar.user.plan.purchase;

import java.time.Instant;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import io.github.hswy.calendar.global.model.CreatedAtEntity;
import io.github.hswy.calendar.global.model.HistoryEntityFormInterface;
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

@Entity
@Table(
    name = "user_plan_purchase_history"
)
@Getter 
@NoArgsConstructor()
@AllArgsConstructor
@Builder 
class UserPlanPurchaseHistoryEntity extends CreatedAtEntity implements HistoryEntityFormInterface<UserPlanPurchaseEntity, UserPlanPurchaseHistoryEntity> {

    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (
        name = "seq",
        nullable = false,
        insertable = false,
        updatable = false
    )
    private Long seq;

    @Column (
        name = "purchase_id",
        nullable = false,
        insertable = true
    )
    private Long purchaseId;

    @Column (
        name = "user_id",
        nullable = false,
        insertable = true
    )
    private Long userId;

    @Column (
        name = "card_id",
        nullable = true,
        insertable = true
    )
    private Long cardId;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(
        name = "purchase_status",
        nullable = false,
        insertable = true
    )
    private UserPlanPurchaseStatus purchaseStatus;

    @Column(
        name = "purchase_currency",
        nullable = false,
        insertable = true,
        length = 10
    )
    private String purchaseCurrency;
    
    @Column(
        name = "purchase_price",
        nullable = false,
        insertable = true
    )
    private Long purchasePrice;
    
    @Column(
        name = "purchase_decimals",
        nullable = false,
        insertable = true
    )
    @Builder.Default
    private short purchaseDecimals = 0;
    
    @Column(
        name = "period_start_at",
        nullable = false,
        insertable = true
    )
    private Instant periodStartAt;
    
    @Column(
        name = "period_end_at",
        nullable = false,
        insertable = true
    )
    private Instant periodEndAt;
    
    @Column(
        name = "is_auto_purchase",
        nullable = false,
        insertable = true
    )
    @Builder.Default
    private boolean isAutoPurchase = false;

    @Override
    public UserPlanPurchaseHistoryEntity form(UserPlanPurchaseEntity entity) {
        return new UserPlanPurchaseHistoryEntityBuilder()
            .purchaseId(entity.getPurchaseId())
            .userId(entity.getUserId())
            .cardId(entity.getCardId())
            .purchaseStatus(entity.getPurchaseStatus())
            .purchaseCurrency(entity.getPurchaseCurrency())
            .purchasePrice(entity.getPurchasePrice())
            .purchaseDecimals(entity.getPurchaseDecimals())
            .periodStartAt(entity.getPeriodStartAt())
            .periodEndAt(entity.getPeriodEndAt())
            .isAutoPurchase(entity.isAutoPurchase())
            .build();
    }
}
