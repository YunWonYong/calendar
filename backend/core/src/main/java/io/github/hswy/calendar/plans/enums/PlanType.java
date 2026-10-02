package io.github.hswy.calendar.plans.enums;

public enum PlanType {
    FREE(0),
    BASIC(1),
    PRO(2),
    PREMIUM(3),
    ULTIMATE(4);

    private final long planId;

    PlanType(long planId) {
        this.planId = planId;
    }

    public static PlanType fromPlanId(long planId) {
        for (PlanType value: values()) {
            if (value.planId == planId) {
                return value;
            }
        }

        throw new IllegalArgumentException("Unsupported planId : " + planId);
    }
}
