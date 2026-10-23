import { PLAN_BENEFITS, PLANS } from "./planType";

import type { PlanBenefitPropertyNameTypes, PlanBenefitTypes, PlanBenefitValueDataTypeMap, PlanBenefitValueTypes, PlanTypeIds, PlanTypes } from "./planType";

export type PlanMetadata = {
    planId: PlanTypeIds;
    planType: PlanTypes;
};

export type PlanBenefitDataType<T extends PlanBenefitValueTypes> = {
    version: number;
    value: PlanBenefitValueDataTypeMap[T];
};

export type PlanBenefitType = {
    [PLAN_BENEFITS.MAX_CREATED_GROUPS]: PlanBenefitDataType<"INTEGER">;
    [PLAN_BENEFITS.MAX_SUB_LEADERS]:  PlanBenefitDataType<"INTEGER">;
    [PLAN_BENEFITS.MAX_JOINED_GROUPS]:  PlanBenefitDataType<"INTEGER">;
    [PLAN_BENEFITS.MAX_OWNED_GROUP_MEMBERS]:  PlanBenefitDataType<"INTEGER">;
    [PLAN_BENEFITS.ENABLE_PERSONAL_ALARMS]:  PlanBenefitDataType<"BOOLEAN">;
    [PLAN_BENEFITS.ENABLE_GROUP_ALARMS]:  PlanBenefitDataType<"BOOLEAN">;
    [PLAN_BENEFITS.MAX_ALARM_GROUPS]:  PlanBenefitDataType<"INTEGER">;
};

export type PlanData = {
    planId: PlanTypeIds;
    price: number;
    benefits: PlanBenefitType;
};

export type PlansType = Record<PlanTypes, PlanData>;

export type PlanContextType = {
    planMetadataList: PlanMetadata[];
    planBenefitMetadataList: {
        benefitName: PlanBenefitTypes;
        benefitPropertyName: PlanBenefitPropertyNameTypes;
        valueType: "INTEGER" | "DECIMAL" | "BOOLEAN" | "STRING";
    }[];
    plans: PlansType;
};

export const DEFAULT_PLAN_BENEFIT_DATA: PlanBenefitType = {
    [PLAN_BENEFITS.MAX_CREATED_GROUPS]: {
        version: 0,
        value: 0,
    },
    [PLAN_BENEFITS.MAX_SUB_LEADERS]: {
        version: 0,
        value: 0,
    },
    [PLAN_BENEFITS.MAX_JOINED_GROUPS]: {
        version: 0,
        value: 0,
    },
    [PLAN_BENEFITS.MAX_OWNED_GROUP_MEMBERS]: {
        version: 0,
        value: 0,
    },
    [PLAN_BENEFITS.ENABLE_PERSONAL_ALARMS]: {
        version: 0,
        value: false,
    },
    [PLAN_BENEFITS.ENABLE_GROUP_ALARMS]: {
        version: 0,
        value: false,
    },
    [PLAN_BENEFITS.MAX_ALARM_GROUPS]: {
        version: 0,
        value: 0,
    },
} as const;

export const DEFAULT_PLAN_DATA: PlansType = {
    FREE: {
        planId: PLANS.FREE,
        price: 0,
        benefits: DEFAULT_PLAN_BENEFIT_DATA
    },
    BASIC: {
        planId: PLANS.BASIC,
        price: 0,
        benefits: DEFAULT_PLAN_BENEFIT_DATA
    },
    PRO: {
        planId: PLANS.PRO,
        price: 0,
        benefits: DEFAULT_PLAN_BENEFIT_DATA
    },
    PREMIUM: {
        planId: PLANS.PREMIUM,
        price: 0,
        benefits: DEFAULT_PLAN_BENEFIT_DATA
    },
    ULTIMATE: {
        planId: PLANS.ULTIMATE,
        price: 0,
        benefits: DEFAULT_PLAN_BENEFIT_DATA
    },
} as const;