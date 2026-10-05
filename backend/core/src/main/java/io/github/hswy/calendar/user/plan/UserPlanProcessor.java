package io.github.hswy.calendar.user.plan;

import org.springframework.stereotype.Component;

import io.github.hswy.calendar.global.annotations.RequireTransaction;
import io.github.hswy.calendar.plan.enums.PlanType;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;

@Component 
@RequiredArgsConstructor 
public class UserPlanProcessor {
    
    private final EntityManager em;
    private final UserPlanHistoryEntityMapper historyEntityMapper;

    @RequireTransaction 
    public UserPlanEntity createNewUserPlan(Long userId) {
        UserPlanEntity entity = new UserPlanEntity();
        entity.setupUserPlan(userId);
        em.persist(entity);
        insertHistory(entity, UserPlanHistoryReason.CREATED);
        return entity;
    }
    
    @RequireTransaction 
    public UserPlanEntity changePurchaseId(UserPlanEntity entity, Long purchaseId) {
        if (entity.changePurchaseId(purchaseId)) {
            insertHistory(entity, UserPlanHistoryReason.CHANGE_PURCHASE_ID);
        }
        return entity;
    }

    @RequireTransaction 
    public UserPlanEntity upgradeUserPlan(UserPlanEntity entity, PlanType planType, Long purchaseId) {
        entity.upgradePlan(planType, purchaseId);
        insertHistory(entity, UserPlanHistoryReason.PLAN_UPGRADE);
        return entity;
    }

    @RequireTransaction 
    public UserPlanEntity downgradeUserPlan(UserPlanEntity entity, PlanType planType, Long purchaseId) {
        entity.downgradePlan(planType, purchaseId);
        insertHistory(entity, UserPlanHistoryReason.PLAN_DOWNGRADE);
        return entity;
    }
    
    @RequireTransaction 
    public UserPlanEntity setFreePlan(UserPlanEntity entity) {
        entity.downgradePlan(PlanType.FREE, null);
        insertHistory(entity, UserPlanHistoryReason.PLAN_RESET);
        return entity;
    }

    private void insertHistory(UserPlanEntity entity,  UserPlanHistoryReason reason) {
        UserPlanHistoryEntity historyEntity = historyEntityMapper.of(entity);
        historyEntity.setReason(reason.name());
        em.persist(historyEntity);
    }
}
