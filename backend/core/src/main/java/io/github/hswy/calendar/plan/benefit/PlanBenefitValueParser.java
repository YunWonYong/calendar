package io.github.hswy.calendar.plan.benefit;

public interface PlanBenefitValueParser<T> {
    T parse(String value);
}
