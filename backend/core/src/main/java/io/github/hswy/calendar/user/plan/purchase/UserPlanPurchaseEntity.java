package io.github.hswy.calendar.user.plan.purchase;

import java.time.Instant;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import io.github.hswy.calendar.global.model.CreatedAtUpdatedAtEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(
    name = "user_plan_purchases"
)
@Getter 
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder 
public class UserPlanPurchaseEntity extends CreatedAtUpdatedAtEntity {

    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (
        name = "purchase_id",
        nullable = false,
        insertable = false,
        updatable = false
    )
    private Long purchaseId;

    @Column (
        name = "user_id",
        nullable = false,
        insertable = true,
        updatable = false
    )
    private Long userId;

    @Column (
        name = "card_id",
        nullable = false,
        insertable = true,
        updatable = false
    )
    private Long cardId;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(
        name = "purchase_status",
        nullable = false,
        updatable = true,
        insertable = true
    )
    private UserPlanPurchaseStatus purchaseStatus;

    @Column(
        name = "purchase_currency",
        nullable = false,
        updatable = true,
        insertable = true,
        length = 10
    )
    private String purchaseCurrency;
    
    @Column(
        name = "purchase_price",
        nullable = false,
        updatable = true,
        insertable = true
    )
    private Long purchasePrice;
    
    @Column(
        name = "purchase_decimals",
        nullable = false,
        updatable = true,
        insertable = true
    )
    @Builder.Default
    private short purchaseDecimals = 0;
    
    @Column(
        name = "period_start_at",
        nullable = false,
        updatable = true,
        insertable = true
    )
    private Instant periodStartAt;
    
    @Column(
        name = "period_end_at",
        nullable = false,
        updatable = true,
        insertable = true
    )
    private Instant periodEndAt;
    
    @Column(
        name = "is_auto_purchase",
        nullable = false,
        updatable = true
    )
    @Builder.Default
    private boolean autoPurchase = false;

    void changeAutoPurchase(boolean autoPurchase) {
        this.autoPurchase = autoPurchase;
        this.purchaseStatus = getNextPurchaseStatus(autoPurchase);
    }

    private UserPlanPurchaseStatus getNextPurchaseStatus(boolean autoPurchase) {
        if (
            this.purchaseStatus == UserPlanPurchaseStatus.FREE_TRIAL || 
            this.purchaseStatus == UserPlanPurchaseStatus.FREE_TRIAL_PENDING || 
            this.purchaseStatus == UserPlanPurchaseStatus.ACTIVE || 
            this.purchaseStatus == UserPlanPurchaseStatus.ACTIVE_PENDING
        ) {
            if (autoPurchase) {
                return this.purchaseStatus == UserPlanPurchaseStatus.FREE_TRIAL_PENDING
                    ?   UserPlanPurchaseStatus.FREE_TRIAL
                    :   UserPlanPurchaseStatus.ACTIVE;
            }

            return this.purchaseStatus == UserPlanPurchaseStatus.FREE_TRIAL
                ?   UserPlanPurchaseStatus.FREE_TRIAL_PENDING
                :   UserPlanPurchaseStatus.ACTIVE_PENDING;
        }

        return this.purchaseStatus;
    }

    void changePeriodDates(Instant periodStartAt, Instant periodEndAt) {
        this.periodStartAt = periodStartAt;
        this.periodEndAt = periodEndAt;
    }

    void changePurchaseStatus(UserPlanPurchaseStatus status) {
        if (this.purchaseStatus == status) {
            return;
        }

        this.purchaseStatus = status;
    }
}
