package io.github.hswy.calendar.plan.enums;

public enum PlanType {
    FREE(0),
    BASIC(1),
    PRO(2),
    PREMIUM(3),
    ULTIMATE(4);
    
    private static final long MIN_PLAN_ID = PlanType.FREE.getPlanId();
    private static final long MAX_PLAN_ID = PlanType.ULTIMATE.getPlanId();

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

    public static boolean validationPlanId(Long planId) {
        return planId >= MIN_PLAN_ID && planId <= MAX_PLAN_ID;
    }

    public Long getPlanId() {
        return this.planId;
    }

    public PlanChangeType getChangeType(PlanType planType) {
        return getChangeType(planType.planId);
    }

    public PlanChangeType getChangeType(long planId) {
        if (this.planId < planId) {
            return PlanChangeType.UPGRADE;
        }
        return this.planId > planId
            ?   PlanChangeType.DOWNGRADE
            :   PlanChangeType.SAME;
    }
}
