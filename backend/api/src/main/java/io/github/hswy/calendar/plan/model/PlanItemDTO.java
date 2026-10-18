package io.github.hswy.calendar.plan.model;

import java.util.Map;

import io.github.hswy.calendar.plan.benefit.PlanBenefitDTO;

public record PlanItemDTO (
    Long id,
    Long price,
    Map<String, PlanBenefitDTO<?>> benefits
) {}
