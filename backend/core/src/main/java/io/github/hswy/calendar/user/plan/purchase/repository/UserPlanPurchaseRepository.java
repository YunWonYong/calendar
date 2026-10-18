package io.github.hswy.calendar.user.plan.purchase.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.Repository;

import io.github.hswy.calendar.user.plan.purchase.UserPlanPurchaseEntity;

public interface UserPlanPurchaseRepository extends Repository<UserPlanPurchaseEntity, Long> {
    List<UserPlanPurchaseEntity> findAllByUserId(Long userId);    
    Optional<UserPlanPurchaseEntity> findByUserIdAndPurchaseId(Long userId, Long purchaseId);
}
