package io.github.hswy.calendar.plan.benefit;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor 
public class PlanBenefitProcessor {
    private final PlanBenefitRepository repo;

    @Cacheable(
        cacheNames = "PLAN:BENEFIT",
        key = "#planId"
    )
    public PlanBenefitDTO getPlanBenefits(Long planId) {
        List<PlanBenefitEntity> entities = repo.getLastVersionPlanBenefits(planId);
        if (entities.isEmpty()) {
            // [TODO] throw exception
        }

        return toPlanBenefitDTO(entities);
    }

    private PlanBenefitDTO toPlanBenefitDTO(List<PlanBenefitEntity> entities) {
        Map<PlanBenefitNames, String> info = entities.stream()
            .collect(Collectors.toUnmodifiableMap(
                entity -> entity.getPk().getBenefitName(),
                PlanBenefitEntity::getBenefitValue
            ));

        return new PlanBenefitDTO(
            parseIfPresent(info, PlanBenefitNames.MAX_CREATED_GROUPS),
            parseIfPresent(info, PlanBenefitNames.MAX_SUB_LEADERS),
            parseIfPresent(info, PlanBenefitNames.MAX_JOINED_GROUPS),
            parseIfPresent(info, PlanBenefitNames.MAX_OWNED_GROUP_MEMBERS),
            parseIfPresent(info, PlanBenefitNames.MAX_ALARM_GROUPS),
            parseIfPresent(info, PlanBenefitNames.ENABLE_PERSONAL_ALARMS),
            parseIfPresent(info, PlanBenefitNames.ENABLE_GROUP_ALARMS)
        );
    }

    private <T> T parseIfPresent(Map<PlanBenefitNames, String> info, PlanBenefitNames name) {
        String value = info.get(name);

        if (!checkValue(value)) {
            return null;
        }

        return name.parse(value);
    }

    private boolean checkValue(String value) {
        return value != null && !value.isBlank();
    }
}
