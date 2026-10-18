package io.github.hswy.calendar.plan.benefit;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Component;

import io.github.hswy.calendar.global.utils.CaseFormat;
import io.github.hswy.calendar.plan.benefit.exception.PlanBenefitNotFoundException;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor 
public class PlanBenefitProcessor {
    private final PlanBenefitRepository repo;

    @Cacheable(
        cacheNames = "PLAN:BENEFIT",
        key = "#planId"
    )
    public Map<String, PlanBenefitDTO<?>> getPlanBenefitDTOs(Long planId) {
        List<PlanBenefitEntity> entities = repo.getLastVersionPlanBenefits(planId);
        if (entities.isEmpty()) {
            throw new PlanBenefitNotFoundException(planId);
        }

        return toPlanBenefitDTOs(entities);
    }

    public List<PlanBenefitMetadataDTO> getPlanBenefitMetadata() {
        List<PlanBenefitMetadataDTO> nameDTOs = new ArrayList<>();

        for (PlanBenefitNames name: PlanBenefitNames.values()) {
            String benefitName = name.name();
            nameDTOs.add(
                new PlanBenefitMetadataDTO(
                    benefitName,
                    CaseFormat.toLowerCamelCase(benefitName),
                    name.getValueType().name()
                )
            );
        }

        return nameDTOs;
    }

    private Map<String, PlanBenefitDTO<?>> toPlanBenefitDTOs(List<PlanBenefitEntity> entities) {
        return entities
            .stream()
            .collect(
                Collectors.toUnmodifiableMap(
                    entity -> CaseFormat.toLowerCamelCase(entity.getPk().getBenefitName().name()),
                    entity -> toPlanBenefitDTO(entity)
                )
            );
    }

    private <T> PlanBenefitDTO<T> toPlanBenefitDTO(PlanBenefitEntity entity) {
        T parsedValue = null;
        Long version = null;
        if (entity != null) {
            String value = entity.getBenefitValue();
            PlanBenefitNames benefitName = entity.getPk().getBenefitName();
            if (checkValue(value)) {
                parsedValue = benefitName.parse(value);
                version = entity.getPk().getVersionNo();
            }
        }

        return new PlanBenefitDTO<T>(
            version,
            parsedValue
        );
    }

    private boolean checkValue(String value) {
        return value != null && !value.isBlank();
    }
}
