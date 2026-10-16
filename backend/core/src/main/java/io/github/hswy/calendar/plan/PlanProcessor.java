package io.github.hswy.calendar.plan;

import java.util.List;
import java.util.Optional;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component 
@RequiredArgsConstructor 
public class PlanProcessor {
    private final PlanRepository repo;

    @Cacheable(
        cacheNames = "PLANS"
    )
    public List<PlanDTO> getPlanDatas() {
        List<PlanEntity> entities = repo.findAllByOrderByPlanIdAsc();
        if (entities.isEmpty()) {
            // [TODO] throw exception
        }
        return entities
            .stream()
            .map(this::toPlanDTO)
            .toList();
    }

    @Cacheable(
        cacheNames = "PLAN",
        key = "#planId"
    )
    public PlanDTO getPlanData(Long planId) {
        Optional<PlanEntity> entityOpt = repo.findById(planId);
        if (entityOpt.isEmpty()) {
            // [TODO] throw exception
        }
        return toPlanDTO(entityOpt.get());
    }

    private PlanDTO toPlanDTO(PlanEntity entity) {
        return new PlanDTO(
            entity.getPlanId(), 
            entity.getPlanType(), 
            entity.getPlanPrice()
        );
    }
}
