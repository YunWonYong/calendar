package io.github.hswy.calendar.plan.benefit;

import io.github.hswy.calendar.plan.benefit.exception.PlanBenefitValueCastingException;

public enum PlanBenefitNames {
    MAX_CREATED_GROUPS(PlanBenefitValueTypes.INTEGER),
    MAX_SUB_LEADERS(PlanBenefitValueTypes.INTEGER),
    MAX_JOINED_GROUPS(PlanBenefitValueTypes.INTEGER),
    MAX_OWNED_GROUP_MEMBERS(PlanBenefitValueTypes.INTEGER),
    ENABLE_PERSONAL_ALARMS(PlanBenefitValueTypes.BOOLEAN),
    ENABLE_GROUP_ALARMS(PlanBenefitValueTypes.BOOLEAN),
    MAX_ALARM_GROUPS(PlanBenefitValueTypes.INTEGER);

    private final PlanBenefitValueTypes benefitValueType;

    PlanBenefitNames(PlanBenefitValueTypes type) {
        this.benefitValueType = type;
    }

    @SuppressWarnings("unchecked")
    public <T> T parse(String value) {
        try {
            return (T) this.benefitValueType.parse(
                value,
                this.benefitValueType.getValueTypeClass()  
            );
        } catch(Exception e) {
            throw new PlanBenefitValueCastingException(
                this.name(),
                e
            );
        }
    }
}
