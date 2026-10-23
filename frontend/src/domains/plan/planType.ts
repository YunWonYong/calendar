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
export type PlanBenefitPropertyNameTypes = typeof PLAN_BENEFITS[keyof typeof PLAN_BENEFITS];

export const PLAN_BENEFIT_VALUE_TYPE = {
    INTEGER: "INTEGER",
    DECIMAL: "DECIMAL",
    BOOLEAN: "BOOLEAN",
    STRING: "STRING",
};
export type PlanBenefitValueTypes = keyof typeof PLAN_BENEFIT_VALUE_TYPE;

export type PlanBenefitValueTypeMap = {
    [PLAN_BENEFITS.MAX_CREATED_GROUPS]: "INTEGER";
    [PLAN_BENEFITS.MAX_SUB_LEADERS]: "INTEGER";
    [PLAN_BENEFITS.MAX_JOINED_GROUPS]: "INTEGER";
    [PLAN_BENEFITS.MAX_OWNED_GROUP_MEMBERS]: "INTEGER";
    [PLAN_BENEFITS.ENABLE_PERSONAL_ALARMS]: "BOOLEAN";
    [PLAN_BENEFITS.ENABLE_GROUP_ALARMS]: "BOOLEAN";
    [PLAN_BENEFITS.MAX_ALARM_GROUPS]: "INTEGER";
}

export type PlanBenefitValueDataTypeMap = {
    INTEGER: number;
    DECIMAL: number;
    BOOLEAN: boolean;
    STRING: string;
};