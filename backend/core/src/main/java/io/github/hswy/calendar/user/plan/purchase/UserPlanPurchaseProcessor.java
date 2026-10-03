package io.github.hswy.calendar.user.plan.purchase;

import java.time.Instant;

import org.springframework.stereotype.Component;

import io.github.hswy.calendar.global.annotations.RequireTransaction;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor 
public class UserPlanPurchaseProcessor {
    private final EntityManager em;
    private final UserPlanPurchaseHistoryEntityMapper historyEntityMapper;

    @RequireTransaction
    public UserPlanPurchaseEntity createUserPlanPurchase(UserPlanPurchaseEntity entity) {
        em.persist(entity);
        insertHistory(entity);
        return entity;
    }

    @RequireTransaction
    public UserPlanPurchaseEntity changeAutoPurchase(UserPlanPurchaseEntity entity, boolean isAutoPurchase) {
        entity.changeAutoPurchase(isAutoPurchase);
        insertHistory(entity);
        return entity;
    }

    @RequireTransaction
    public UserPlanPurchaseEntity changePeriodDates(UserPlanPurchaseEntity entity, Instant periodStartAt, Instant periodEndAt) {
        entity.changePeriodDates(periodStartAt, periodEndAt);
        insertHistory(entity);
        return entity;
    }

    @RequireTransaction
    public UserPlanPurchaseEntity changePurchaseStatus(UserPlanPurchaseEntity entity, UserPlanPurchaseStatus status) {
        entity.changePurchaseStatus(status);
        insertHistory(entity);
        return entity;
    }

    private void insertHistory(UserPlanPurchaseEntity entity) {
        em.persist(historyEntityMapper.of(entity));
    }

}
