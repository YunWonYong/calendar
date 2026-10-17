package io.github.hswy.calendar.plan;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Component;

import io.github.hswy.calendar.plan.exception.PlanNotFoundException;
import lombok.RequiredArgsConstructor;

@Component 
@RequiredArgsConstructor 
public class PlanProcessor {
    private final PlanRepository repo;

    public List<PlanMetadataDTO> getPlanMetadata() {
        List<PlanMetadataDTO> metadata = new ArrayList<>();
        for (PlanType type: PlanType.values()) {
            metadata.add(
                new PlanMetadataDTO(
                    type.getPlanId(),
                    type.name()
                )
            );
        }

        return metadata;
    }

    @Cacheable(
        cacheNames = "PLAN",
        key = "#planId"
    )
    public PlanDTO getPlanDTO(Long planId) {
        Optional<PlanEntity> entityOpt = repo.findById(planId);
        if (entityOpt.isEmpty()) {
            throw new PlanNotFoundException(planId);
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
