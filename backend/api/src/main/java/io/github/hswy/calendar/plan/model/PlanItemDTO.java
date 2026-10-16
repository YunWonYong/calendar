package io.github.hswy.calendar.plan.model;

import io.github.hswy.calendar.plan.PlanType;
import io.github.hswy.calendar.plan.benefit.PlanBenefitDTO;

public record PlanItemDTO (
    Long id,
    PlanType type,
    Long price,
    PlanBenefitDTO benefit
) {}
