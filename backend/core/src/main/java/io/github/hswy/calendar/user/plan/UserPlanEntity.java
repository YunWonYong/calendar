package io.github.hswy.calendar.user.plan;

import io.github.hswy.calendar.global.model.CreatedAtUpdatedAtEntity;
import io.github.hswy.calendar.plan.enums.PlanChangeType;
import io.github.hswy.calendar.plan.enums.PlanType;
import io.github.hswy.calendar.user.plan.exception.InvalidDowngradePlanException;
import io.github.hswy.calendar.user.plan.exception.InvalidUpgradePlanException;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table (
    name = "user_plan"
)
@AllArgsConstructor
@NoArgsConstructor
@Getter 
@Builder 
public class UserPlanEntity extends CreatedAtUpdatedAtEntity {

    @Id
    @Column(
        name = "user_id",
        nullable = false,
        insertable = true,
        updatable = false
    )
    private Long userId;

    @Column(
        name = "plan_id",
        nullable = false,
        insertable = true,
        updatable = true
    )
    private Long planId;

    @Column(
        name = "purchase_id",
        nullable = true,
        insertable = true,
        updatable = true
    )
    private Long purchaseId;

    void setupUserPlan(Long userId) {
        this.userId = userId;
        this.planId = PlanType.FREE.getPlanId();
        this.purchaseId = null;
    }

    boolean changePurchaseId(Long purchaseId) {
        // plan 구독 유지 시 결제 카드만 변경될 수 있음.
        Long oldPurchaseId = this.purchaseId;
        this.purchaseId = purchaseId;
        return oldPurchaseId == null
            ?   purchaseId != null
            :   !oldPurchaseId.equals(purchaseId);
    }

    void downgradePlan(PlanType planType, Long purchaseId) {
        Long changePlanId = planType.getPlanId();
        if (isInvalidPlanChange(changePlanId, PlanChangeType.DOWNGRADE)) {
            throw new InvalidDowngradePlanException(this.planId, changePlanId);
        }

        updatePlan(changePlanId, purchaseId);
    }
    
    void upgradePlan(PlanType planType, Long purchaseId) {
        Long changePlanId = planType.getPlanId();
        if (isInvalidPlanChange(changePlanId, PlanChangeType.UPGRADE)) {
            throw new InvalidUpgradePlanException(this.planId, changePlanId);
        }

        updatePlan(changePlanId, purchaseId);
    }

    private boolean isInvalidPlanChange(Long checkPlanId, PlanChangeType targetPlanChangeType) {
        PlanChangeType planChangeType = PlanType.fromPlanId(this.planId).getChangeType(checkPlanId);
        return planChangeType != targetPlanChangeType;
    }
    
    private void updatePlan(Long planId, Long purchaseId) {
        // plan upgrade할 때 purchaseId도 새롭게 생김.
        this.planId = planId;
        changePurchaseId(purchaseId);
    }
}
