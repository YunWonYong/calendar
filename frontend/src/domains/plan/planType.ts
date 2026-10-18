export const PLANS = {
    FREE: 0,
    BASIC: 1,
    PRO: 2,
    PREMIUM: 3,
    ULTIMATE: 4,
} as const;

export type PlanTypes = keyof typeof PLANS;
export type PlanTypeIds = typeof PLANS[keyof typeof PLANS];

export const PLAN_BENEFITS = {
    MAX_CREATED_GROUPS: "maxCreatedGroups",
    MAX_SUB_LEADERS: "maxSubLeaders",
    MAX_JOINED_GROUPS: "maxJoinedGroups",
    MAX_OWNED_GROUP_MEMBERS: "maxOwnedGroupMembers",
    ENABLE_PERSONAL_ALARMS: "enablePersonalAlarms",
    ENABLE_GROUP_ALARMS: "enableGroupAlarms",
    MAX_ALARM_GROUPS: "maxAlarmGroups",
} as const;

export type PlanBenefitTypes = keyof typeof PLAN_BENEFITS;
export type PlanBenefitProperties = typeof PLAN_BENEFITS[keyof typeof PLAN_BENEFITS];

export const PLAN_BENEFIT_VALUE_PARSERS = {
    INTEGER: (value: unknown) => value as number,
    BOOLEAN: (value: unknown) => value as boolean,
} as const;

type PlanBenefitValueTypeMap = {
    [K in keyof typeof PLAN_BENEFIT_VALUE_PARSERS]:
        ReturnType<typeof PLAN_BENEFIT_VALUE_PARSERS[K]>;
};

type PlanBenefitValueType = keyof PlanBenefitValueTypeMap;

type MetadataPlanBenefit = {
    [T in PlanBenefitValueType]: {
        benefitName: PlanBenefitTypes;
        benefitPropertyName: PlanBenefitProperties;
        valueType: T;
    };
}[PlanBenefitValueType];

type MetadataPlan = {
    planId: PlanTypeIds;
    planType: PlanTypes;
};

type Metadata = {
    plans: MetadataPlan[];
    benefits: MetadataPlanBenefit[];
};

type PlanBenefitResponseData = {
    [key in PlanBenefitProperties]?: {
        version: number;
        value: PlanBenefitValueTypeMap[PlanBenefitValueType];
    };
};

type PlanData = {
    [key in PlanTypes]: {
        id: number;
        price: number;
        benefits: PlanBenefitResponseData;
    };
};

export type PlansResponseBody = {
    metadata: Metadata;
    plans: PlanData;
};

export type PlanContextType = {
    orderedPlanTypes: PlanTypes[];
    orderedPlanBenfitProperties: PlanBenefitProperties[];
    plans: PlanData;
};

export const DEFAULT_METADATA: Metadata = {
    benefits: [],
    plans: [],
};

export const DEFAULT_PLANS: PlanData = {
    FREE: {
        id: 0,
        price: 0,
        benefits: {}
    },
    BASIC: {
        id: 0,
        price: 0,
        benefits: {}
    },
    PRO: {
        id: 0,
        price: 0,
        benefits: {}
    },
    PREMIUM: {
        id: 0,
        price: 0,
        benefits: {}
    },
    ULTIMATE: {
        id: 0,
        price: 0,
        benefits: {}
    }
};

export const DEFAULT_PLAN_RESPONSE_BODY_DATA: PlansResponseBody = {
    metadata: DEFAULT_METADATA,
    plans: DEFAULT_PLANS,
};