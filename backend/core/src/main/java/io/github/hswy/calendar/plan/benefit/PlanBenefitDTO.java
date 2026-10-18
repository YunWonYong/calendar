package io.github.hswy.calendar.plan.benefit;

public record PlanBenefitDTO<T>(
    Long version,
    T value
){}
